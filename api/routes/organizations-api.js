const {
  getOrganizations,
  getOrganization,
  createOrganization,
  createOrganizationUserAssociations,
  deleteOrganizationUserAssociation,
  addApproversToOrganization,
  removeApproverFromOrganization,
  createDepartment,
  removeDepartment,
  addDepartmentUsers,
  removeDepartmentUser,
} = require(`${global.__controllers}/participants-controller`);
const { ensureAuth } = require(`${global.__common}/middleware`);
const { sendResponse } = require(`${global.__common}/controller-dependencies`);

// APIs defined according to specification found here -> http://apidocjs.com
module.exports = (app, customMiddleware) => {
  // Use custom middleware if passed, otherwise use plain old middleware
  const middleware = customMiddleware || ensureAuth;

  /** *************
   * Organizations
   ************** */

  /**
   * @apiDefine NotLoggedIn
   *
   * @apiError NotLoggedIn The user making the request does not have a proper authentication token.
   */
  /**
   * @apiDefine AuthTokenRequired
   *
   * @apiParam {String{20}} Cookie `access_token` containing the JsonWebToken is required, cookie is set upon successful login
   */

  /**
   * @api {get} /organizations Read Organizations
   * @apiName ReadOrganizations
   * @apiGroup Organizations
   *
   * @apiQueryParameter approver If the optional query parameter is given
   * causes a JOIN query to retrieve only organizations where the specified user is an approver.
   * Value of 'true' will do the above for the authenticated user.
   *
   * @apiExample {curl} Simple:
   *     curl -i /organizations
   *
   * @apiSuccess {String} address Organization's Controller Contract
   * @apiSuccess {String} id  Organization's machine readable ID
   * @apiSuccess {String} name  Organization's human readable name
   * @apiSuccessExample {json} Success Objects Array
    [{
      "address": "DAE988ADED111E6AE82DBFD9AE4FFFE97ADBC23D",
      "approvers": [
        "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1",
        "F5C84B3CC6317023F1E9914BDC86FC0E339E8110",
        "F9EAB43B627645C48F6FDB424F9AD3D760907C25"
      ],
      "name": "orgone"
    }]
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   *
   */
  app.get('/organizations', middleware, getOrganizations, sendResponse);

  /**
   * @api {get} /organizations/:address Read a Single Organization
   * @apiName ReadSingleOrganization
   * @apiGroup Organizations
   *
   * @apiExample {curl} Simple:
   *     curl -i /organizations/9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E
   *
   * @apiSuccess {String} address Organization's Controller Contract
   * @apiSuccess {String} organizationKey Hashed address (keccak256)
   * @apiSuccess {String} name  Organization's human readable name
   * @apiSuccessExample {json} Success Object
    {
      "address": "DAE988ADED111E6AE82DBFD9AE4FFFE97ADBC23D",
      "organizationKey": "55D40E05C91F484E0F4104774F528D131DFC0990A7A18124DA5666E1F5EA2EAA",
      "name": "orgone",
      "approvers": [{
          "address": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1",
          "username": "joesmith"
        },
        {
          "address": "F5C84B3CC6317023F1E9914BDC86FC0E339E8110",
          "username": "sarasmith"
        },
        {
          "address": "F9EAB43B627645C48F6FDB424F9AD3D760907C25",
          "username": "ogsmith"
        }
      ],
      "users": [{
          "address": "889A3EEBAC57E0F14D5BAB7AA87A4E69C432ECCD",
          "username": "patmorgan"
          "departments": [
            "acct"
          ],
        },
        {
          "address": "F5C84B3CC6317023F1E9914BDC86FC0E339E8110",
          "username": "sarasmith"
          "departments": [
            "acct"
          ],
        },
        {
          "address": "F9EAB43B627645C48F6FDB424F9AD3D760907C25",
          "username": "ogsmith"
          "departments": [
            "acct"
          ],
        }
      ],
      "departments": [{
        "id": "acct",
        "name": "Accounting",
        "users": [
          "889A3EEBAC57E0F14D5BAB7AA87A4E69C432ECCD",
          "F5C84B3CC6317023F1E9914BDC86FC0E339E8110",
          "F9EAB43B627645C48F6FDB424F9AD3D760907C25"
        ]
      }]
    }
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   *
   */
  app.get('/organizations/:address', middleware, getOrganization, sendResponse);

  /**
  * @api {post} /organizations Create a New Organization
  * @apiName CreateOrganizations
  * @apiGroup Organizations
  *
  * @apiDescription
  * Creating a new organization also established the primary administrators for that organization
  * If no approvers are provided for the organization,
  * then the currently logged-in user will be registered as an approver.
  *
  * @apiBodyParameter {String} id Organization's machine readable ID
  * @apiBodyParameter {String} name Organization's human readable name
  * @apiBodyParameter {String[]} approvers Organization's approvers are the adminsistrators of that organization
  *    and may approve the addition of new users into the organization, set the roles of users within the
  *    organization, as well as remove users from the organization. This array is optional.
  *    If no approvers are passed, the currently logged-in user's address is used as the single
  *    approver of for the new organization.
  * @apiBodyParameterExample {json} Param Object
    {
      "name": "ACME Corp",
      "approvers": ["9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E", "9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E"]
    }
  * @apiExample {curl} Simple:
  *     curl -iX POST /organizations
  *
  * @apiSuccess {json} The address of the created Organization
  * @apiSuccessExample {json} Success-Response:
  {
  "address": "6EDC6101F0B64156ED867BAE925F6CD240635656",
  "name": "ACME Corp"
  }
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.post('/organizations', middleware, createOrganization, sendResponse);

  /**
   * @api {put} /organizations/:orgId/users/:userAddress Adds users to Organization
   * @apiName AddUsers
   * @apiGroup Organizations
   *
   * @apiBodyParameterExample {json} Param Object
    {
      "users": ["10DA7307DA7E74BC54D1E829764E2DE7AD0D8DBB4"]
    }
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /organizations/9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E/users
   *
   * @apiSuccess (200) Success
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   *
   */
  app.put(
    '/organizations/:address/users', middleware,
    createOrganizationUserAssociations,
    sendResponse,
  );

  /**
   * @api {delete} /organizations/:orgId/users/:userAddress Removes a user from Organization
   * @apiName RemoveUser
   * @apiGroup Organizations
   *
   * @apiExample {curl} Simple:
   *     curl -iX DELETE /organizations/9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E/users/10DA7307DA7E74BC54D1E829764E2DE7AD0D8DBB4
   *
   * @apiSuccess (200) Success
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   *
   */
  app.delete(
    '/organizations/:address/users/:userAddress', middleware,
    deleteOrganizationUserAssociation,
    sendResponse,
  );
  /**
   * @api {put} /organizations/:orgId/approvers/:userAddress Adds approvers to Organization
   * @apiName AddApprovers
   * @apiGroup Organizations
   *
   * @apiBodyParameterExample {json} Param Object
    {
      "users": ["10DA7307DA7E74BC54D1E829764E2DE7AD0D8DBB4"]
    }
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /organizations/9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E/approvers
   *
   * @apiSuccess (200) Success
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   *
   */
  app.put(
    '/organizations/:address/approvers', middleware,
    addApproversToOrganization,
    sendResponse,
  );

  /**
   * @api {delete} /organizations/:orgId/approvers/:userAddress Removes an approver from Organization
   * @apiName RemoveApprover
   * @apiGroup Organizations
   *
   * @apiExample {curl} Simple:
   *     curl -iX DELETE /organizations/9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E/approvers/10DA7307DA7E74BC54D1E829764E2DE7AD0D8DBB4
   *
   * @apiSuccess (200) Success
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   *
   */
  app.delete(
    '/organizations/:address/approvers/:userAddress', middleware,
    removeApproverFromOrganization,
    sendResponse,
  );

  /**
   * @api {put} /organizations/:address/departments Create a New Department in an Organization
   * @apiName CreateDepartment
   * @apiGroup Organizations
   *
   * @apiDescription
   * Creating a new department within an organization and add members to it
   *
   * @apiBodyParameter {String} name Department's human readable name
   * @apiBodyParameter {String[] Optional} users Addresses of the members to add to the Department
   * If not given, department will be created with no members and members can be added later
   * @apiBodyParameterExample {json} Param Object
    {
      "name": "Accounting",
      "users": ["9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E"]
    }
   * @apiExample {curl} Simple:
   *     curl -iX PUT /organizations/6EDC6101F0B64156ED867BAE925F6CD240635656/departments
   *
   * @apiSuccess {json} The address of the Organization, the id and name of the department, and the users belonging to the department
   * @apiSuccessExample {json} Success-Response:
    {
      "id": "accounting",
      "name": "Accounting",
      "users": ["9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E"]
    }
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   *
   */
  app.put('/organizations/:address/departments', middleware, createDepartment, sendResponse);

  /**
   * @api {delete} /organizations/:address/departments/:id Remove a Department
   * @apiName RemoveDepartment
   * @apiGroup Organizations
   *
   * @apiDescription
   * Removing a department within an organization
   *
   * @apiExample {curl} Simple:
   *     curl -iX DELETE /organizations/6EDC6101F0B64156ED867BAE925F6CD240635656/departments/accounting
   *
   * @apiSuccess (200) Success
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   *
   */
  app.delete('/organizations/:address/departments/:id', middleware, removeDepartment, sendResponse);

  /**
   * @api {put} /organizations/:address/departments/:departmentId/users Add Users to a Department
   * @apiName AddDepartmentUsers
   * @apiGroup Organizations
   *
   * @apiDescription
   * Add users to a department
   *
   * @apiBodyParameter {String[]} users Addresses of the members to add to the Department.
   * @apiBodyParameterExample {json} Param Object
      {
        "users": ["9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E"]
      }
   * @apiExample {curl} Simple:
   *     curl -iX PUT /organizations/6EDC6101F0B64156ED867BAE925F6CD240635656/departments/accounting/users
   *
   * @apiSuccess (200) Success
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   *
   */
  app.put('/organizations/:address/departments/:id/users', middleware, addDepartmentUsers, sendResponse);

  /**
   * @api {delete} /organizations/:address/departments/:departmentId/users/:userAddress Remove User from a Department
   * @apiName RemoveDepartmentUser
   * @apiGroup Organizations
   *
   * @apiDescription
   * Remove a user from a department
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /organizations/6EDC6101F0B64156ED867BAE925F6CD240635656/departments/accounting/users/9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E
   *
   * @apiSuccess (200) Success
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   *
   */
  app.delete('/organizations/:address/departments/:id/users/:userAddress', middleware, removeDepartmentUser, sendResponse);
};
