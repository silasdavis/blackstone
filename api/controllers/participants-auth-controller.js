const sendgrid = require('@sendgrid/mail');
const crypto = require('crypto');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const boom = require('boom');

const { asyncMiddleware, prependHttps } = require(`${global.__common}/controller-dependencies`);
const logger = require(`${global.__common}/logger`);
const log = logger.getLogger('CONTROLLERS.auth');
const { app_db_pool } = require(`${global.__common}/postgres-db`);

const login = (req, res, next) => {
  if ((!req.body.username && !req.body.email) || !req.body.password) {
    return next(boom.badRequest('Username or password not supplied'));
  }
  const strategy = req.body.username ? 'username-login' : 'email-login';
  return passport.authenticate(strategy, { session: false }, (err, user, info) => {
    if (err) return next(boom.badImplementation(`Failed to login user ${req.body.username || req.body.email}: ${err}`));
    if (!user || !user.address) {
      log.error(info ? info.message || '' : '');
      return next(boom.unauthorized('Failed to login - invalid credentials'));
    }
    const userData = {
      address: user.address,
      username: user.username,
      createdAt: user.createdAt,
    };
    log.info(`${user.username} logged in successfully`);
    return res
      .cookie(global.__settings.cookie.name, user.token, {
        secure: global.__settings.cookie.secure,
        maxAge: global.__settings.cookie.maxAge,
        httpOnly: global.__settings.cookie.httpOnly,
      })
      .status(200)
      .json(userData);
  })(req, res);
};

const validateToken = asyncMiddleware(async (req, res) => {
  if (req.user) return res.status(200).json(req.user);
  throw boom.unauthorized('Unauthorized - no logged in user');
});

const logout = (req, res) => {
  req.logout();
  res
    .clearCookie('access_token')
    .status(200)
    .json({ message: 'User logged out' });
};

const createRecoveryCode = asyncMiddleware(async (req, res) => {
  const client = await app_db_pool.connect();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query({
      text: 'SELECT id FROM users WHERE LOWER(email) = LOWER($1)',
      values: [req.body.email],
    });
    let msg;
    const webAppName = process.env.WEBAPP_NAME;
    const webAppURL = prependHttps(process.env.WEBAPP_URL);
    const webAppEmail = process.env.WEBAPP_EMAIL;
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    if (rows[0]) {
      const hash = crypto.createHash('sha256');
      const recoveryCode = crypto.randomBytes(32).toString('hex');
      hash.update(recoveryCode);
      await client.query({
        text: 'DELETE FROM password_change_requests WHERE user_id = $1',
        values: [rows[0].id],
      });
      await client.query({
        text: 'INSERT INTO password_change_requests (user_id, recovery_code_digest) VALUES($1, $2);',
        values: [rows[0].id, hash.digest('hex')],
      });
      msg = {
        to: req.body.email,
        from: `${webAppEmail}`,
        subject: `Your Password Recovery Link for the ${webAppName}`,
        text: `Please visit ${webAppURL}/recover-password/${recoveryCode} to reset your password. This link will expire in 15 minutes. If you did not make this request, no action is required.`,
        html: `Please visit <a href="${webAppURL}/recover-password/${recoveryCode}">here</a> to reset your password. <strong>This link will expire in 15 minutes.</strong></br>If you did not make this request, no action is required.`,
      };
    } else {
      msg = {
        to: req.body.email,
        from: `${webAppEmail}`,
        subject: `Password Recovery Request for the ${webAppName}`,
        text: `Someone has requested to reset your password on the ${webAppName}, but we did not find an account registered under this email address. If you would like to create an account, please visit us at ${webAppURL}/register. If you did not make this request, no action is required.`,
        html: `Someone has requested to reset your password on the ${webAppName}, but we did not find an account registered under this email address. If you would like to create an account, please <a href="${webAppURL}/register">sign up here.</a></br>If you did not make this request, no action is required.`,
      };
    }
    log.debug('Transaction successful. Committing, releasing client, and sending response.');
    await client.query('COMMIT');
    await sendgrid.send(msg);
    log.info(`Recovery code created for user with email ${req.body.email}`);
    client.release();
    res.status(200).send();
  } catch (err) {
    await client.query('ROLLBACK');
    client.release();
    throw boom.badImplementation(`Failed to create recovery code: ${err}`);
  }
});

const validateRecoveryCode = asyncMiddleware(async (req, res) => {
  const hash = crypto.createHash('sha256');
  hash.update(req.params.recoveryCode);
  const { rows } = await app_db_pool.query({
    text:
      "SELECT * FROM password_change_requests WHERE created_at > now() - time '00:15' AND recovery_code_digest = $1",
    values: [hash.digest('hex')],
  });
  if (rows[0]) {
    log.info('Recovery code validated');
    return res.sendStatus(200);
  }
  throw boom.badRequest('Valid recovery code not found.');
});

const resetPassword = asyncMiddleware(async (req, res) => {
  const client = await app_db_pool.connect();
  try {
    const codeHash = crypto.createHash('sha256');
    codeHash.update(req.params.recoveryCode);
    const { rows } = await client.query({
      text:
          "SELECT user_id FROM password_change_requests WHERE created_at > now() - time '00:15' AND recovery_code_digest = $1",
      values: [codeHash.digest('hex')],
    });
    if (rows[0]) {
      log.info(`Receiving password reset request from user id ${rows[0].user_id}`);
      const salt = await bcrypt.genSalt(10);
      const passwordDigest = await bcrypt.hash(req.body.password, salt);
      await client.query({
        text: 'UPDATE users SET password_digest = $1 WHERE id = $2',
        values: [passwordDigest, rows[0].user_id],
      });
      await client.query({
        text: 'DELETE FROM password_change_requests WHERE user_id = $1',
        values: [rows[0].user_id],
      });
      client.release();
      log.info(`Password successfully updated for user id ${rows[0].user_id} and recovery code deleted`);
      return res.status(200).send();
    }
    throw boom.badRequest('Valid recovery code not found.');
  } catch (err) {
    client.release();
    if (err.isBoom) throw err;
    throw boom.badImplementation(`Failed to fulfill password reset request: ${JSON.stringify(err)}`);
  }
});

module.exports = {
  login,
  logout,
  validateToken,
  createRecoveryCode,
  validateRecoveryCode,
  resetPassword,
};
