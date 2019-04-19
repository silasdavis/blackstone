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

  /** *************
   * Users
   ************** */

  /**
   * @api {get} /users Read Users
   * @apiName ReadUsers
   * @apiGroup Users
   *
   * @apiDescription Retrieves user information. The `organization` query
   * parameter is optional. It can be used to filter users belonging to a
   * specific organization or retrieving users not belonging to an
   * organization, yet (via `?organization=null`).
   *
   * Note: The organization address is returned as
   * "0000000000000000000000000000000000000000" for user that do not
   * belong to an organization.
   *
   * @apiQueryParameter organization If the optional parameter is given
   * filters users accordingly. May give the API the following options
   * `<orgAddress>|null|notnull`
   *
   * @apiExample {curl} Simple:
   *     curl -i /users
   *
   * @apiSuccess {String} address Users's Controller Contract
   * @apiSuccess {String} username  Users's machine readable ID
   * @apiSuccess {String} organization Organization's Controller Contract
   * @apiSuccess {String} organizationId Organization's machine readable ID
   * @apiSuccess {String} organizationName Organization's human readable name
   * @apiSuccessExample {json} Success Objects Array
   [{
     "address": "9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E",
     "username": "j.smith",
     "organization": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
     "organizationId": "acmecorp92",
     "organizationName": "ACME Corp"
   }]
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  */
  app.get('/users', middleware, getUsers, sendResponse);

  /**
   * @api {get} /users/profile Read User Profile of currently logged in user
   * @apiName ReadUserProfile
   * @apiGroup Users
   *
   * @apiDescription Retrieves a single users profile identified by the access token.
   *
   * @apiExample {curl} Simple:
   *     curl -i /users/profile
   *
   * @apiSuccess {String} address Users's Controller Contract
   * @apiSuccess {String} username  Users's human readable ID
   * @apiSuccess {String} email  Users's email address
   * @apiSuccess {String} organization Organization's Controller Contract
   * @apiSuccess {String} organizationId Organization's machine readable ID
   * @apiSuccess {String} organizationName Organization's human readable name
   * @apiSuccess {String} firstName User's first name
   * @apiSuccess {String} lastName User's last name
   * @apiSuccess {String} country User's country code
   * @apiSuccess {String} region Contract address of user's region
   * @apiSuccess {Boolean} isProducer Boolean representing whether user account is producer type (as opposed to consumer type)
   * @apiSuccess {Boolean} onboarding Boolean representing whether user prefers to see onboarding screens
   * @apiSuccess {String} createdAt Timestamp of user account creation
   * @apiSuccessExample {json} Success Object
   {
     "address": "9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E",
     "username": "j.smith",
     "email": "jsmith@company.io",
     "organization": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
     "organizationId": "acmecorp92",
     "organizationName": "ACME Corp",
     "firstName": "Joe",
     "lastName": "Smith",
     "country": "CA",
     "region": "1232SDFF3EC680332BEFDDC3CA12CBBD",
     "isProducer": false,
     "onboarding": true,
     "createdAt": ""
   }
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   */
  app.get('/users/profile', middleware, getProfile, sendResponse);

  /**
   * @api {put} /users/profile Update User Profile of currently logged in user
   * @apiName EditUserProfile
   * @apiGroup Users
   *
   * @apiDescription Updates a single users profile identified by the access token.
   * @apiBodyParameter {String} firstName User's first name (optional)
   * @apiBodyParameter {String} lastName User's last name (optional)
   * @apiBodyParameter {String} country User's country code (optional)
   * @apiBodyParameter {String} region Address of user's region (optional)
   * @apiBodyParameter {String} currentPassword User's current password (optional if new password not being set)
   * @apiBodyParameter {String} newPassword (optional)
   * @apiBodyParameter {Boolean} isProducer Set account type to producer or consumer(optional)
   * @apiBodyParameter {Boolean} onboarding Set user preference for viewing onboarding screens (optional)
   * @apiBodyParameterExample {json} Param Object
    {
      "firstName": "Joe",
      "lastName": "Smith",
      "country": "CA",
      "region": "1232SDFF3EC680332BEFDDC3CA12CBBD",
      "currentPassword": "badpassword",
      "newPassword": "beTTERpa$$W0Rd932",
      "isProducer": true,
      "onboarding": false
    }
   * @apiExample {curl} Simple:
   *     curl -iX PUT /users/profile
   *
   * @apiSuccess {String} address Users's Controller Contract
   * @apiSuccessExample {json} Success Object
    {
      "address": "605401BB8B9E597CC40C35D1F0185DE94DBCE533",
    }
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   */
  app.put('/users/profile', middleware, editProfile, sendResponse);

  /**
   * @api {post} /users Create a New User
   * @apiName RegisterUser
   * @apiGroup Users
   *
   * @apiDescription Creating a new user
   *
   * @apiBodyParameter {String} user The user's userName
   * @apiBodyParameter {String} email The user's email address
   * @apiBodyParameter {String} password The user's password
   * @apiBodyParameter {Boolean} isProducer Set to true to create a producer account instead of a consumer account (optional)
   * @apiBodyParameter {json} Param Object
     {
       "username": "username_id-123",
       "email": "myemail@mycompany.com",
       "password": "superhardtoguess",
       "isProducer": false
     }
   *
   * @apiExample {curl} Simple:
   *     curl -iX POST /users
   *
   * @apiSuccess {Object} userData The "address" and "username" of the User
   * @apiSuccessExample {json} Success Object
     {
       "address": "605401BB8B9E597CC40C35D1F0185DE94DBCE533",
       "username": "johnsmith"
     }
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   *
   */
  app.post('/users', registrationHandler, sendResponse);

  /**
   * @api {post} /users/login Log in as a User
   * @apiName UserLogin
   * @apiGroup Users
   *
   * @apiBodyParameter {String} user The user's userName
   * @apiBodyParameter {String} password The user's password
   * @apiBodyParameter {json} Param Object
    {
      "username": "username",
      "password": "superhardtoguess"
    }
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /users/login
   *
   * @apiSuccess {String} address The address of the user
   * @apiSuccess {String} username The username of the user
   * @apiSuccess {String} A timestamp of the account creation
   * @apiSuccessExample {json} Success Object
    {
      "address": "41D6BC9143DF87A07F65FCAF642FB89E16D26548",
      "username": "jsmith",
      "createdAt": "2018-06-25T13:44:26.925Z"
    }
   *
   */
  app.put('/users/login', login, sendResponse);

  /**
   * @api {post} /users/logout Log out a User
   * @apiName Logout
   * @apiGroup Users
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /users/logout
   *
   */
  app.put('/users/logout', logout, sendResponse);

  /**
   * @api {get} /users/token/validate Validate user token
   * @apiName ValidateToken
   * @apiGroup Users
   *
   * @apiDescription This route validates the JWT `access_token`
   * which should be set as cookie in the request
   *
   * @apiExample {curl} Simple:
   *     curl -iX GET /users/token/validate
   *
   * @apiSuccessExample {json} Success Object
    {
      "address": "41D6BC9143DF87A07F65FCAF642FB89E16D26548",
      "username": "jsmith",
    }
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   *
   */
  app.get('/users/token/validate', middleware, validateToken, sendResponse);

  /**
   * @api {post} /users/password-recovery Request password reset for a user account
   * @apiName PasswordRecovery
   * @apiGroup Users
   *
   * @apiDescription
   * Sends an email with a password recovery code to the given email address
   *
   * @apiBodyParameter {String} email The user's email address
   * @apiBodyParameter {json} Param Object
    {
      "email": "hello@company.io",
    }
   *
   * @apiExample {curl} Simple:
   *     curl -iX POST /users/password-recovery
   */
  app.post('/users/password-recovery', createRecoveryCode, sendResponse);

  /**
   * @api {get} /users/password-recovery/:recoveryCode Validates the given password recovery code
   * @apiName ValidatePasswordRecoveryCode
   * @apiGroup Users
   *
   * @apiDescription
   * Checks if the given password recovery code is valid
   *
   * @apiExample {curl} Simple:
   *     curl -iX GET /users/password-recovery/vdk7bd2esdf3234...
   */
  app.get('/users/password-recovery/:recoveryCode', validateRecoveryCode, sendResponse);

  /**
   * @api {put} /users/password-recovery/:recoveryCode Reset password for user account
   * @apiName ResetPassword
   * @apiGroup Users
   *
   * @apiDescription
   * Resets the user's password with the given password, if the recovery code is valid
   *
   * @apiURLParameter recoveryCode The password recovery code
   * @apiBodyParameter {json} Param Object
    {
      "password": "newpassword",
    }
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /users/password-recovery/vdk7bd2esdf3234...
   */
  app.put('/users/password-recovery/:recoveryCode', resetPassword, sendResponse);

  /**
   * @api {get} /users/activate/:activationCode Activate user account
   * @apiName ActivateUser
   * @apiGroup Users
   *
   * @apiDescription
   * Activates the user account
   *
   * @apiURLParameter activationCode The activation code
   *
   * @apiExample {curl} Simple:
   *     curl -iX GET /users/activate/vdk7bd2esdf3234...
   */
  app.get('/users/activate/:activationCode', activateUser, sendResponse);
};
