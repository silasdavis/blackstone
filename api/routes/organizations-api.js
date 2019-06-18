const {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
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

  /* **************
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
   * @swagger
   *
   * /organizations:
   *   get:
   *     tags:
   *       - "Organizations"
   *     description: Read Organizations
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: approver
   *         description: >-
   *           If the optional query parameter is given causes a JOIN query
   *           to retrieve only organizations where the specified
   *           user is an approver. Value of 'true' will do the above for the authenticated user.
   *         in: query
   *         type: boolean
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             address:
   *               type: string
   *               description: Organization's Controller Contract
   *             approvers:
   *               type: array
   *               description: Organization's machine readable ID
   *               items:
   *                 type: string
   *             name:
   *               type: string
   *               description: Organization's human readable name
   *
   */
  app.get('/organizations', middleware, getOrganizations, sendResponse);

  /**
   * @swagger
   *
   * /organizations/{address}:
   *   get:
   *     tags:
   *       - "Organizations"
   *     description: Read a Single Organization
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: address
   *         description: Organization address
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             address:
   *               type: string
   *               description: Organization's Controller Contract
   *             organizationKey:
   *               type: string
   *               description: Hashed address (keccak256)
   *             name:
   *               type: string
   *               description: Organization's human readable name
   *             approvers:
   *               type: array
   *               description: Organization's machine readable ID
   *               items:
   *                 type: object
   *                 properties:
   *                   address:
   *                     type: string
   *                   username:
   *                     type: string
   *             users:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   address:
   *                     type: string
   *                   username:
   *                     type: string
   *                   departments:
   *                     type: array
   *                     items:
   *                       type: string
   *             departments:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   name:
   *                     type: string
   *                   users:
   *                     type: array
   *                     items:
   *                       type: string
   *
   */
  app.get('/organizations/:address', middleware, getOrganization, sendResponse);

  /**
   * @swagger
   *
   * /organizations:
   *   post:
   *     tags:
   *       - "Organizations"
   *     description: >-
   *       Create a new organization also established the primary administrators for that
   *       organization. If no approvers are provided for the organization,
   *       then the currently logged-in user will be registered as an approver.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Create a New Organization
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             id:
   *               type: string
   *               description: Organization's machine readable ID
   *             name:
   *               type: string
   *               description: Organization's human readable name
   *             approvers:
   *               type: array
   *               items:
   *                 type: string
   *               description: >-
   *                 Organization's approvers are the adminsistrators of that
   *                 organization
   *
   *                 and may approve the addition of new users into the organization,
   *                 set the roles of users within the
   *
   *                 organization, as well as remove users from the organization.
   *                 This array is optional.
   *
   *                 If no approvers are passed, the currently logged-in user's
   *                 address is used as the single
   *
   *                 approver of for the new organization.
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             address:
   *               type: string
   *               description: address of the created Organization
   *             name:
   *               type: string
   *
   */
  app.post('/organizations', middleware, createOrganization, sendResponse);

  /**
   * @swagger
   *
   * /organizations/{address}:
   *   put:
   *     tags:
   *       - "Organizations"
   *     description: >-
   *       Updates an existing organization. Accepts a new name. Authorizes organization approvers.
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: address
   *         description: Organization's contract address
   *         in: path
   *         required: true
   *         type: string
   *       - name: body
   *         description: New organization details
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: Organization's human readable name
   *     responses:
   *       '200':
   *         description: Updates organization details
   *         schema:
   *           type: string
   *
   */
  app.put('/organizations/:address', middleware, updateOrganization, sendResponse);

  /**
   * @swagger
   *
   * /organizations/{orgId}/users/{userAddress}:
   *   put:
   *     tags:
   *       - "Organizations"
   *     description: Adds users to Organization
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: body
   *         description: body
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             users:
   *               type: array
   *               items:
   *                 type: string
   *       - name: orgId
   *         description: organization's ID
   *         in: path
   *         required: true
   *         type: string
   *       - name: userAddress
   *         description: user's address
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Adds users to Organization
   *         schema:
   *           type: string
   *
   */
  app.put(
    '/organizations/:address/users', middleware,
    createOrganizationUserAssociations,
    sendResponse,
  );

  /**
   * @swagger
   *
   * /organizations/{orgId}/users/{userAddress}:
   *   delete:
   *     tags:
   *       - "Organizations"
   *     description: Removes a user from Organization
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: orgId
   *         description: organization's ID
   *         in: path
   *         required: true
   *         type: string
   *       - name: userAddress
   *         description: user's address
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Removes a user from Organization
   *         schema:
   *           type: string
   *
   */
  app.delete(
    '/organizations/:address/users/:userAddress', middleware,
    deleteOrganizationUserAssociation,
    sendResponse,
  );

  /**
   * @swagger
   *
   * /organizations/{orgId}/approvers/{userAddress}:
   *   put:
   *     tags:
   *       - "Organizations"
   *     description: Adds approvers to Organization
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: body
   *         description: body
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             users:
   *               type: array
   *               items:
   *                 type: string
   *       - name: orgId
   *         description: organization's ID
   *         in: path
   *         required: true
   *         type: string
   *       - name: userAddress
   *         description: user's address
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Adds approvers to Organization
   *         schema:
   *           type: string
   *
   */
  app.put(
    '/organizations/:address/approvers', middleware,
    addApproversToOrganization,
    sendResponse,
  );

  /**
   * @swagger
   *
   * /organizations/{orgId}/approvers/{userAddress}:
   *   delete:
   *     tags:
   *       - "Organizations"
   *     description: Removes an approver from Organization
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: orgId
   *         description: organization's ID
   *         in: path
   *         required: true
   *         type: string
   *       - name: userAddress
   *         description: user's address
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Removes an approver from Organization
   *         schema:
   *           type: string
   *
   */
  app.delete(
    '/organizations/:address/approvers/:userAddress', middleware,
    removeApproverFromOrganization,
    sendResponse,
  );

  /**
   * @swagger
   *
   * /organizations/{address}/departments:
   *   put:
   *     tags:
   *       - "Organizations"
   *     description: a new department within an organization and add members to it
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: body
   *         description: Create a New Department in an Organization
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: Department's human readable name
   *             users:
   *               type: array
   *               items:
   *                 type: string
   *               description: >-
   *                 Addresses of the members to add to the Department
   *
   *                 If not given, department will be created with no members and
   *                 members can be added later
   *       - name: address
   *         description: organization's address
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: >-
   *             address of the Organization, the id and name of the department,
   *             and the users belonging to the department
   *         schema:
   *           type: object
   *           properties:
   *             id:
   *               type: string
   *             name:
   *               type: string
   *             users:
   *               type: array
   *               items:
   *                 type: string
   *
   */
  app.put('/organizations/:address/departments', middleware, createDepartment, sendResponse);

  /**
   * @swagger
   *
   * /organizations/{address}/departments/{id}:
   *   delete:
   *     tags:
   *       - "Organizations"
   *     description: a department within an organization
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: id
   *         description: department's ID
   *         in: path
   *         required: true
   *         type: string
   *       - name: address
   *         description: organization's address
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Remove a Department
   *         schema:
   *           type: string
   *
   */
  app.delete('/organizations/:address/departments/:id', middleware, removeDepartment, sendResponse);

  /**
   * @swagger
   *
   * '/organizations/{address}/departments/{departmentId}/users':
   *   put:
   *     tags:
   *       - "Organizations"
   *     description: users to a department
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: body
   *         description: Add Users to a Department
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             users:
   *               type: array
   *               items:
   *                 type: string
   *               description: Addresses of the members to add to the Department.
   *       - name: departmentId
   *         description: department's ID
   *         in: path
   *         required: true
   *         type: string
   *       - name: address
   *         description: organization's address
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Add Users to a Department
   *         schema:
   *           type: string
   *
   */
  app.put('/organizations/:address/departments/:id/users', middleware, addDepartmentUsers, sendResponse);

  /**
   * @swagger
   *
   * /organizations/{address}/departments/{departmentId}/users/{userAddress}:
   *   delete:
   *     tags:
   *       - "Organizations"
   *     description: a user from a department
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: departmentId
   *         description: department's ID
   *         in: path
   *         required: true
   *         type: string
   *       - name: address
   *         description: organization's address
   *         in: path
   *         required: true
   *         type: string
   *       - name: userAddress
   *         description: user's address
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Remove User from a Department
   *         schema:
   *           type: string
   *
   */
  app.delete('/organizations/:address/departments/:id/users/:userAddress', middleware, removeDepartmentUser, sendResponse);
};
