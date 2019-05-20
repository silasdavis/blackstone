const {
  getArchetypes,
  getArchetype,
  createArchetype,
  activateArchetype,
  deactivateArchetype,
  setArchetypeSuccessor,
  setArchetypePrice,
} = require(`${global.__controllers}/agreements-controller`);
const { ensureAuth } = require(`${global.__common}/middleware`);
const { sendResponse } = require(`${global.__common}/controller-dependencies`);

// APIs defined according to specification found here -> http://apidocjs.com
module.exports = (app, customMiddleware) => {
  // Use custom middleware if passed, otherwise use plain old middleware
  const middleware = customMiddleware || ensureAuth;

  /* ***********
   * Archetypes
   *********** */

  /**
   * @swagger
   *
   * /archetypes:
   *   get:
   *     tags:
   *       - "Archetypes"
   *     description: >-
   *       archetype information. Within the
   *       Agreements Network, Archetypes are the fundamental, top level
   *       objects. They are holders for a set of information which
   *       allows users to creat Active Agreements within the Platform.
   *       The returned list will include archetypes that are:
   *       a. authored by the authenticated user, or
   *       b. public (ie. `isPrivate` property is `false`) and activated (ie.
   *       `active` property is true)
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
   *               address:
   *                 type: string
   *                 description: Archetype's address
   *               name:
   *                 type: string
   *                 description: Human readable name of the Archetype
   *               author:
   *                 type: string
   *                 description: |-
   *                   Controller contract of the user or organization
   *                   that created the Archetype
   *               description:
   *                 type: string
   *                 description: description of the Archetype
   *               active:
   *                 type: boolean
   *                 description: |-
   *                   Whether the Archetype can be used to create
   *                   new Active Agreements or not
   *               isPrivate:
   *                 type: boolean
   *                 description: |-
   *                   Whether the encryption framework of the Archetype
   *                   is operational or not
   *               numberOfParameters:
   *                 type: number
   *                 description: The number of custom parameters used by the Archetype
   *               numberOfDocuments:
   *                 type: number
   *                 description: The number of documents registered against the Archetype
   *               countries:
   *                 type: array
   *                 items:
   *                   type: string
   *                 description: |-
   *                   The jurisdictions in which the Archetype has been
   *                   registered to be active
   * 
   */
  app.get('/archetypes', middleware, getArchetypes, sendResponse);

  /**
   * @swagger
   *
   * /archetypes/{address}:
   *   get:
   *     tags:
   *       - "Archetypes"
   *     description: >-
   *       Get archetype information for a single Archetype.
   *       This endpoint will return a `404` if:
   *       a. the archetype is not found, or
   *       b. the archetype is private and the authenticated user is not its author.
   *       Note: if the password provided is incorrect or a hoard reference which
   *       does not exist was passed to the posted archetype this get will return a `401`.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: password
   *         description: |-
   *           The password to trigger the decryption key for an
   *           opaque Archetype
   *         in: query
   *         type: string
   *       - name: address
   *         description: Archetype address
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
   *               description: Archetype's address
   *             name:
   *               type: string
   *               description: Human readable name of the Archetype
   *             author:
   *               type: string
   *               description: |-
   *                 Controller contract of the user or organization
   *                 that created the Archetype
   *             description:
   *               type: string
   *               description: Description of the archetype
   *             price:
   *               type: number
   *               description: Price of the archetype
   *             active:
   *               type: boolean
   *               description: |-
   *                 Whether the Archetype can be used to create
   *                 new Active Agreements or not
   *             isPrivate:
   *               type: boolean
   *               description: |-
   *                 Whether the encryption framework of the Archetype
   *                 is operational or not
   *             successor:
   *               type: string
   *               description: Address of the successor archetype
   *             parameters:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   name:
   *                     type: string
   *                   type:
   *                     type: number
   *                   label:
   *                     type: string
   *               description: |-
   *                 The "name" and "type" of all custom parameters used
   *                 by the Archetype
   *             documents:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   name:
   *                     type: string
   *                   grant:
   *                     type: string
   *               description: >-
   *                 The "name", "grant" (if any)
   * 
   *                 sufficient to provide the information regarding the relevant
   *                 documents associated with
   * 
   *                 the Archetype
   *             jurisdictions:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   country:
   *                     type: string
   *                   regions:
   *                     type: array
   *                     items:
   *                       type: string
   *               description: >-
   *                 The "country" and "regions" which the Archetype
   * 
   *                 has been registered as relevant to. The "country" is registered
   *                 as an ISO standard
   * 
   *                 two character string and "regions" is an array of addresses
   *                 relating to the controlling
   * 
   *                 contracts for the region (see [ISO standards manipulation](#)
   *                 section).
   *             packages:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   name:
   *                     type: string
   *               description: >-
   *                 The "id" and "name" of each of the packages that the archetype
   *                 has been added to
   *             governingArchetypes:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   address:
   *                     type: string
   *                   name:
   *                     type: string
   * 
   */
  app.get('/archetypes/:address', middleware, getArchetype, sendResponse);

  /**
   * @swagger
   *
   * /archetypes:
   *   post:
   *     tags:
   *       - "Archetypes"
   *     description: Create an Archetype
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Create an Archetype
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: >-
   *                 Human readable name of the Archetype (limit: 32 ASCII
   *                 characters)
   *             author:
   *               type: string
   *               description: >-
   *                 Controller contract of the user or organization
   * 
   *                 that created the Archetype. Note that currently the author is
   *                 forced to be the logged-in-user's address
   * 
   *                 since we do not yet have a review/approval process for changes
   *                 made to an organization-authored archetype by a user who is part
   *                 of that organization
   *             description:
   *               type: string
   *               description: Short human readable description of the Archetype
   *             price:
   *               type: integer
   *               description: >-
   *                 Price of the archetype, in cents (Optional- this field can be
   *                 edited later through a `PUT` request to
   *                 '/archetypes/:address/price')
   *             isPrivate:
   *               type: boolean
   *               description: |-
   *                 **(Optional)** Whether the encryption framework of
   *                 the Archetype is operational or not
   *             password:
   *               type: string
   *               description: |-
   *                 A secret string which is used to trigger the encryption
   *                 system for the Archetype's documents
   *             parameters:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   type:
   *                     type: string
   *                   name:
   *                     type: string
   *                   signatory:
   *                     type: string
   *               description: >-
   *                 **(Optional)** The "name" (limit: 32 ASCII characters) and
   *                 "type" of all custom parameters used
   * 
   *                 by the Archetype
   *             documents:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   name:
   *                     type: string
   *                   grant:
   *                     type: string
   *               description: >-
   *                 **(Optional)**  The "name" and "grant" (if any)
   * 
   *                 sufficient to provide the information regarding the relevant
   *                 documents associated with
   * 
   *                 the Archetype
   *             jurisdictions:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   country:
   *                     type: string
   *                   regions:
   *                     type: array
   *                     items:
   *                       type: string
   *               description: >-
   *                 The "country" and "regions" which the Archetype
   * 
   *                 has been registered as relevant to. The "country" is registered
   *                 as an ISO standard
   * 
   *                 two character string and "regions" is an array of addresses
   *                 relating to the controlling
   * 
   *                 contracts for the region (see [ISO standards manipulation](#)
   *                 section).
   *             formationProcessDefinition:
   *               type: string
   *               description: |-
   *                 Address of the formation process definition
   *                 controller
   *             executionProcessDefinition:
   *               type: string
   *               description: |-
   *                 Address of the execution process definition
   *                 controller
   *             governingArchetypes:
   *               type: array
   *               items:
   *                 type: string
   *               description: >-
   *                 Array of contract addresses of the archetypes to govern this new
   *                 one
   * 
   *                 of the rights and conditions of the contract
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             address:
   *               type: string
   *               description: address of the created Archetype
   * 
   */
  app.post('/archetypes', middleware, createArchetype, sendResponse);

  /**
   * @swagger
   *
   * /archetypes/{address}/activate:
   *   put:
   *     tags:
   *       - "Archetypes"
   *     description: >-
   *       Set the archetype so that agreements can be created from it. 
   *       An archetype can only be activated by its author. This action will fail if
   *       the archetype has a successor set.
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: address
   *         description: Archetype address
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Activate an archetype
   *         schema:
   *           type: string
   * 
   */
  app.put('/archetypes/:address/activate', middleware, activateArchetype, sendResponse);

  /**
   * @swagger
   *
   * /archetypes/{address}/successor/{successor}:
   *   put:
   *     tags:
   *       - Archetypes
   *     description: >-
   *       Sets the successor of given archetype. This action automatically
   *       makes the archetype inactive. Note that an archetype cannot point to
   *       itself as its successor. It also validates if this action will result in a circular
   *       dependency between two archetypes. A successor may only be set by the author of the
   *       archetype.
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: address
   *         description: Archetype address
   *         in: path
   *         required: true
   *         type: string
   *       - name: successor
   *         description: Successor address
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Set successor for an archetype
   *         schema:
   *           type: string
   * 
   */
  app.put('/archetypes/:address/successor/:successor', middleware, setArchetypeSuccessor, sendResponse);

  /**
   * @swagger
   *
   * /archetypes/{address}/price:
   *   put:
   *     tags:
   *       - "Archetypes"
   *     description: Sets the price of given archetype
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: body
   *         description: Set price of an archetype
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             price:
   *               type: number
   *               description: Price of the archetype
   *       - name: address
   *         description: Archetype address
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Set price of an archetype
   *         schema:
   *           type: string
   * 
   */
  app.put('/archetypes/:address/price', middleware, setArchetypePrice, sendResponse);

  /**
   * @swagger
   *
   * /archetypes/{address}/deactivate:
   *   put:
   *     tags:
   *       - "Archetypes"
   *     description: >-
   *       Set the archetype so that agreements cannot be created from it.
   *       An archetype can only be deactivated by its author. Once an archetype is
   *       deactivated by its author, it will not be included in `GET /archetypes`
   *       responses made by users other than the author.
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: address
   *         description: Archetype address
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Deactivate an archetype
   *         schema:
   *           type: string
   * 
   */
  app.put('/archetypes/:address/deactivate', middleware, deactivateArchetype, sendResponse);
};
