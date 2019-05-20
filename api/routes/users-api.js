const {
  getUsers,
  getProfile,
  editProfile,
  registrationHandler,
  activateUser,
} = require(`${global.__controllers}/participants-controller`);
const {
  login,
  logout,
  validateToken,
  createRecoveryCode,
  validateRecoveryCode,
  resetPassword,
} = require(`${global.__controllers}/participants-auth-controller`);
const { ensureAuth } = require(`${global.__common}/middleware`);
const { sendResponse } = require(`${global.__common}/controller-dependencies`);

// APIs defined according to specification found here -> http://apidocjs.com
module.exports = (app, customMiddleware) => {
  // Use custom middleware if passed, otherwise use plain old middleware
  const middleware = customMiddleware || ensureAuth;

  /* **************
   * Users
   ************** */

  /**
   * @swagger
   *
   * /users:
   *   get:
   *     tags:
   *       - "Users"
   *     description: |-
   *       Get user information. The `organization` query
   *       parameter is optional. It can be used to filter users belonging to a
   *       specific organization or retrieving users not belonging to an
   *       organization, yet (via `?organization=null`).
   * 
   *       Note: The organization address is returned as
   *       "0000000000000000000000000000000000000000" for user that do not
   *       belong to an organization.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: organization
   *         description: |-
   *           If the optional parameter is given
   *           filters users accordingly. May give the API the following options
   *           `<orgAddress>|null|notnull`
   *         in: query
   *         type: string
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             address:
   *               type: string
   *               description: Users's Controller Contract
   *             username:
   *               type: string
   *               description: Users's machine readable ID
   *             organization:
   *               type: string
   *               description: Organization's Controller Contract
   *             organizationId:
   *               type: string
   *               description: Organization's machine readable ID
   *             organizationName:
   *               type: string
   *               description: Organization's human readable name
   * 
   */
  app.get('/users', middleware, getUsers, sendResponse);

  /**
   * @swagger
   *
   * /users/profile:
   *   get:
   *     tags:
   *       - "Users"
   *     description: Get a single users profile identified by the access token.
   *     produces:
   *       - application/json
   *     parameters: []
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             address:
   *               type: string
   *               description: Users's Controller Contract
   *             username:
   *               type: string
   *               description: Users's human readable ID
   *             email:
   *               type: string
   *               description: Users's email address
   *             organization:
   *               type: string
   *               description: Organization's Controller Contract
   *             organizationId:
   *               type: string
   *               description: Organization's machine readable ID
   *             organizationName:
   *               type: string
   *               description: Organization's human readable name
   *             firstName:
   *               type: string
   *               description: User's first name
   *             lastName:
   *               type: string
   *               description: User's last name
   *             country:
   *               type: string
   *               description: User's country code
   *             region:
   *               type: string
   *               description: Contract address of user's region
   *             isProducer:
   *               type: boolean
   *               description: >-
   *                 Boolean representing whether user account is producer type (as
   *                 opposed to consumer type)
   *             onboarding:
   *               type: boolean
   *               description: >-
   *                 Boolean representing whether user prefers to see onboarding
   *                 screens
   *             createdAt:
   *               type: string
   *               description: Timestamp of user account creation
   * 
   */
  app.get('/users/profile', middleware, getProfile, sendResponse);

  /**
   * @swagger
   *
   * /users/profile:
   *   put:
   *     tags:
   *       - "Users"
   *     description: Update a single users profile identified by the access token.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Update User Profile of currently logged in user
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             firstName:
   *               type: string
   *               description: User's first name (optional)
   *             lastName:
   *               type: string
   *               description: User's last name (optional)
   *             country:
   *               type: string
   *               description: User's country code (optional)
   *             region:
   *               type: string
   *               description: Address of user's region (optional)
   *             currentPassword:
   *               type: string
   *               description: User's current password (optional if new password not being set)
   *             newPassword:
   *               type: string
   *               description: (optional)
   *             isProducer:
   *               type: boolean
   *               description: Set account type to producer or consumer(optional)
   *             onboarding:
   *               type: boolean
   *               description: Set user preference for viewing onboarding screens (optional)
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             address:
   *               type: string
   *               description: Users's Controller Contract
   * 
   */
  app.put('/users/profile', middleware, editProfile, sendResponse);

  /**
   * @swagger
   *
   * /users:
   *   post:
   *     tags:
   *       - "Users"
   *     description: Create a new user.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             user:
   *               type: string
   *               description: The user's userName
   *             email:
   *               type: string
   *               description: The user's email address
   *             password:
   *               type: string
   *               description: The user's password
   *             isProducer:
   *               type: boolean
   *               description: >-
   *                 Set to true to create a producer account instead of a consumer
   *                 account (optional)
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             address:
   *               type: string
   *               description: User's address
   *             username:
   *               type: string
   *               description: User's name
   * 
   */
  app.post('/users', registrationHandler, sendResponse);

  /**
   * @swagger
   *
   * /users/login:
   *   post:
   *     tags:
   *       - "Users"
   *     description: Log in as a User
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Log in as a User
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             user:
   *               type: string
   *               description: The user's username
   *             password:
   *               type: string
   *               description: The user's password
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             address:
   *               type: string
   *               description: The address of the user
   *             username:
   *               type: string
   *               description: The username of the user
   *             createdAt:
   *               type: string
   *               description: timestamp of the account creation
   * 
   */
  app.put('/users/login', login, sendResponse);

  /**
   * @swagger
   *
   * /users/logout:
   *   post:
   *     tags:
   *       - "Users"
   *     description: Log out a User
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters: []
   *     responses:
   *       '200':
   *         description: Log out a User
   *         schema:
   *           type: string
   * 
   */
  app.put('/users/logout', logout, sendResponse);

  /**
   * @swagger
   *
   * /users/token/validate:
   *   get:
   *     tags:
   *       - "Users"
   *     description: |-
   *       Validates the JWT `access_token` which should be set as cookie in the request.
   *     produces:
   *       - application/json
   *     parameters: []
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             address:
   *               type: string
   *               description: User's address
   *             username:
   *               type: string
   *               description: User's name
   * 
   */
  app.get('/users/token/validate', middleware, validateToken, sendResponse);

  /**
   * @swagger
   *
   * /users/password-recovery:
   *   post:
   *     tags:
   *       - "Users"
   *     description: Send an email with a password recovery code to the given email address.
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: body
   *         description: Request password reset for a user account
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             email:
   *               type: string
   *               description: The user's email address
   *     responses:
   *       '200':
   *         description: Request password reset for a user account
   *         schema:
   *           type: string
   * 
   */
  app.post('/users/password-recovery', createRecoveryCode, sendResponse);

  /**
   * @swagger
   *
   * /users/password-recovery/{recoveryCode}:
   *   get:
   *     tags:
   *       - "Users"
   *     description: if the given password recovery code is valid
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: recoveryCode
   *         description: The password recovery code
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Validates the given password recovery code
   *         schema:
   *           type: string
   * 
   */
  app.get('/users/password-recovery/:recoveryCode', validateRecoveryCode, sendResponse);

  /**
   * @swagger
   *
   * /users/password-recovery/{recoveryCode}:
   *   put:
   *     tags:
   *       - "Users"
   *     description: Reset the users password with the given password, if the recovery code is valid.
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: recoveryCode
   *         description: The password recovery code
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Reset password for user account
   *         schema:
   *           type: string
   * 
   */
  app.put('/users/password-recovery/:recoveryCode', resetPassword, sendResponse);

  /**
   * @swagger
   *
   * /users/activate/{activationCode}:
   *   get:
   *     tags:
   *       - "Users"
   *     description: Activate the user account.
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: activationCode
   *         description: The activation code
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Activate user account
   *         schema:
   *           type: string
   * 
   */
  app.get('/users/activate/:activationCode', activateUser, sendResponse);
};
