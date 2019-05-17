const {
  createArchetypePackage,
  getArchetypePackages,
  getArchetypePackage,
  addArchetypeToPackage,
  activateArchetypePackage,
  deactivateArchetypePackage,
} = require(`${global.__controllers}/agreements-controller`);
const { ensureAuth } = require(`${global.__common}/middleware`);
const { sendResponse } = require(`${global.__common}/controller-dependencies`);

// APIs defined according to specification found here -> http://apidocjs.com
module.exports = (app, customMiddleware) => {
  // Use custom middleware if passed, otherwise use plain old middleware
  const middleware = customMiddleware || ensureAuth;

  /* ******************
   * Archetype Packages
   ****************** */

  /**
   * @swagger
   *
   * /archetypes:
   *   get:
   *     tags:
   *       - "Archetypes"
   *     description: >-
   *       Get archetype package information. Within the Agreements Network, Archetype Packages are collections of archetypes that
   *       are related in some way. Returns all packages that are either public or authored by the authenticated user
   *     produces:
   *       - application/json
   *     parameters: []
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               id:
   *                 type: string
   *                 description: Archetype Package id
   *               name:
   *                 type: string
   *                 description: Human readable name of the Archetype Pacakge
   *               author:
   *                 type: string
   *                 description: Controller contract of the user or organization
   *               description:
   *                 type: string
   *                 description: Description of the package
   *               isPrivate:
   *                 type: boolean
   *                 description: Indicates whether the package can be read/used publicly
   *               active:
   *                 type: boolean
   *                 description: >-
   *                   Indicates whether the package has been activated and available
   *                   for creating collections with that created the package
   * 
   */
  app.get('/archetype-packages', middleware, getArchetypePackages, sendResponse);

  /**
   * @swagger
   *
   * /archetype-packages/{id}:
   *   get:
   *     tags:
   *       - "Archetypes"
   *     description: >-
   *       Gets information for a single archetype package.
   *       Returns a `404` if the package is private or not active and the
   *       authenticated user is not its author.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: archetype package id
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             id:
   *               type: string
   *               description: Archetype Package id
   *             name:
   *               type: string
   *               description: Human readable name of the Archetype Package
   *             description:
   *               type: string
   *               description: Human readable description of the Archetype Package
   *             author:
   *               type: string
   *               description: Controller contract of the user or organization
   *             isPrivate:
   *               type: boolean
   *               description: Indicates whether the package can be read/used publicly
   *             active:
   *               type: boolean
   *               description: >-
   *                 Indicates whether the package has been activated and available
   *                 for creating collections with.
   *             archetypes:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   name:
   *                     type: string
   *                   address:
   *                     type: string
   *                   active:
   *                     type: boolean
   *               description: |-
   *                 Array of archetypes with name, address, and active keys
   *                 that are included in the Archetype Package
   * 
   */
  app.get('/archetype-packages/:id', middleware, getArchetypePackage, sendResponse);

  /**
   * @swagger
   *
   * /archetypes/packages:
   *   post:
   *     tags:
   *       - "Archetypes"
   *     description: Create an Archetype Package
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Create an Archetype Package
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: Human readable name of the Archetype Package
   *             description:
   *               type: string
   *               description: Human readable description of the Archetype Package
   *             String:
   *               type: string
   *               description: >-
   *                 author Controller contract of the user or organization. Will be
   *                 set to the authenticated user's address if not provided.
   * 
   *                 that created the Archetype Package
   *             isPrivate:
   *               type: boolean
   *               description: Human readable description of the Archetype Package
   *             active:
   *               type: boolean
   *               description: Optional- will default to false
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             id:
   *               type: string
   *               description: id of the created Archetype Package
   * 
   */
  app.post('/archetype-packages', middleware, createArchetypePackage, sendResponse);

  /**
   * @swagger
   *
   * /archetype-packages/{id}/archetype/{address}:
   *   put:
   *     tags:
   *       - "Archetypes"
   *     description: Add an archetype to a package
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: address
   *         description: Archetype address
   *         in: path
   *         required: true
   *         type: string
   *       - name: id
   *         description: Package Id
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Add an archetype to a package
   *         schema:
   *           type: string
   * 
   */
  app.put('/archetype-packages/:packageId/archetype/:archetypeAddress', middleware, addArchetypeToPackage, sendResponse);

  /**
   * @swagger
   *
   * /archetype-packages/{id}/activate:
   *   put:
   *     tags:
   *       - "Archetypes"
   *     description: |-
   *       Activate the archetype package.
   *       An archetype package can only be activated by its author.
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: id
   *         description: Archetype package id
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Activate an archetype package
   *         schema:
   *           type: string
   * 
   */
  app.put('/archetype-packages/:id/activate', middleware, activateArchetypePackage, sendResponse);

  /**
   * @swagger
   *
   * /archetype-packages/{id}/deactivate:
   *   put:
   *     tags:
   *       - "Archetypes"
   *     description: >-
   *       Deactivate the archetype package.
   *       An archetype package can only be deactivated by its author. Once an
   *       archetype package is deactivated by its author, it will not be included 
   *       in `GET /archetype-packges` or `GET /archetype-packages/:id` responses 
   *       made by users other than the author.
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: id
   *         description: Archetype package id
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: deactivate an archetype package
   *         schema:
   *           type: string
   * 
   */
  app.put('/archetype-packages/:id/deactivate', middleware, deactivateArchetypePackage, sendResponse);
};
