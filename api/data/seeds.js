const pool = require(__common + '/postgres-db');
const contracts = require(__controllers + '/contracts-controller');
const bcrypt = require('bcryptjs');
const { getSHA256Hash } = require(__common + '/controller-dependencies');

module.exports = {
  users: (req, res, next, log) => {
    const users = [
      {
        email: 'demo.user.1@monax.io',
        password: 'demouser1',
        organization: 'Monax',
      },
      {
        email: 'demo.user.2@monax.io',
        password: 'demouser2',
        organization: 'Monax',
      },
      {
        email: 'demo.user.3@monax.io',
        password: 'demouser3',
        organization: 'Monax',
      },
      {
        email: 'demo.user.4@demoorganization.com',
        password: 'demouser4',
        organization: 'Demo Company',
      },
      {
        email: 'demo.user.5@demoorganization.com',
        password: 'demouser5',
        organization: 'Demo Company',
      },
      {
        email: 'demo.user.6@noorganization.com',
        password: 'demouser6',
      },
    ];

    const organizations = [
      {
        id: 'Monax',
        name: 'Monax',
      },
      {
        id: 'Demo Company',
        name: 'Demo Company',
      },
    ];

    const organizationPromises = organizations.map(async ({ id, name }) => {
      const address = await contracts.createOrganization({ id, name });
      return {
        id,
        name,
        address,
      };
    });

    const userPromises = users.map(async ({ email, password, organization }) => {
      const address = await contracts.createUser({ id: getSHA256Hash(email) });
      const client = await pool.connect();
      await client.query({
        text: 'DELETE FROM users WHERE email = $1',
        values: [email],
      });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      await client.query({
        text: 'INSERT INTO users(address, email, password_digest) VALUES($1, $2, $3)',
        values: [address, email, hash],
      });
      return {
        email,
        password,
        organization,
        address,
      };
    });

    const associationPromises = (savedOrganizations, savedUsers) => {
      return savedUsers
        .filter((user) => user.organization)
        .map(async ({ address: userAddress, organization: userOrg }) => {
          const organization = savedOrganizations.find((org) => org.id === userOrg);
          log.info('Adding demo user', userAddress, 'to demo organization', userOrg);
          return await contracts.addUserToOrganization(userAddress, organization.address);
        });
    };

    Promise.all(organizationPromises)
      .then((savedOrganizations) => {
        log.info('Added demo organizations: ', JSON.stringify(savedOrganizations));
        Promise.all(userPromises).then((savedUsers) => {
          log.info('Added demo users: ', JSON.stringify(savedUsers));
          Promise.all(associationPromises(savedOrganizations, savedUsers)).then(() => {
            res.status(200).send();
            return next();
          });
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
