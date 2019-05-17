const {
  createAgreementCollection,
  getAgreementCollections,
  getAgreementCollection,
  addAgreementToCollection,
} = require(`${global.__controllers}/agreements-controller`);
const { ensureAuth } = require(`${global.__common}/middleware`);
const { sendResponse } = require(`${global.__common}/controller-dependencies`);

// APIs defined according to specification found here -> http://apidocjs.com
module.exports = (app, customMiddleware) => {
  // Use custom middleware if passed, otherwise use plain old middleware
  const middleware = customMiddleware || ensureAuth;

  /* *********************
   * Agreement Collections
   ********************* */

  /**
   * @swagger
   *
   * /agreement-collections:
   *   get:
   *     tags:
   *       - "Agreements"
   *     description: >-
   *       Get Active Agreement Collection information where the author is the
   *       authenticated user, or the organization the user is a member of.
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters: []
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             id:
   *               type: string
   *               description: Active Agreement Collection id
   *             name:
   *               type: string
   *               description: Human readable name of the Active Agreement Collection
   *             author:
   *               type: string
   *               description: Address of the creator (user account or org)
   *             collectionType:
   *               type: number
   *               description: Type of collection
   *             packageId:
   *               type: string
   *               description: >-
   *                 The packageId of the archetype package from which the collection
   *                 was created.
   *             agreements:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   name:
   *                     type: string
   *                   address:
   *                     type: string
   *                   archetype:
   *                     type: string
   * 
   */
  app.get('/agreement-collections', middleware, getAgreementCollections, sendResponse);

  /**
   * @swagger
   *
   * /agreement-collections/{id}:
   *   get:
   *     tags:
   *       - "Agreements"
   *     description: >-
   *       Get information for a single Agreement Collection if the author is the
   *       authenticated user or the organization the user is a member of.
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: id
   *         description: agreement id
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
   *               description: Agreement Collection id
   *             name:
   *               type: string
   *               description: Human readable name of the Agreement Collection
   *             author:
   *               type: string
   *               description: Controller contract of the user or organization
   *             collectionType:
   *               type: number
   *               description: Type of collection
   *             packageId:
   *               type: string
   *               description: >-
   *                 The packageId of the archetype package from which the collection
   *                 was created
   *             agreements:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   name:
   *                     type: string
   *                   address:
   *                     type: string
   *                   archetype:
   *                     type: string
   *               description: Array of agreement objects included in the collection
   * 
   */
  app.get('/agreement-collections/:id', middleware, getAgreementCollection, sendResponse);

  /**
   * @swagger
   *
   * /agreement-collections:
   *   get:
   *     tags:
   *       - "Agreements"
   *     description: Get an Active Agreement Collection.
   *     produces:
   *       - application/json
   *     parameters: []
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: Active Agreement Collection name
   *             author:
   *               type: string
   *               description: >-
   *                 Address of the creator (user account or org), logged in user
   *                 address will be used if none supplied
   *             collectionType:
   *               type: number
   *               description: Type of collection
   *             packageId:
   *               type: string
   *               description: >-
   *                 The packageId of the archetype package from which the collection
   *                 was created
   * 
   */
  app.post('/agreement-collections', middleware, createAgreementCollection, sendResponse);

  /**
   * @swagger
   *
   * /agreement-collections:
   *   put:
   *     tags:
   *       - "Agreements"
   *     description: Add an agreement to a collection
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: body
   *         description: Add an agreement to a collection
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             agreement:
   *               type: string
   *               description: Address of the agreement to add
   *             collectionId:
   *               type: string
   *               description: Id of the collection to add to
   *     responses:
   *       '200':
   *         description: Add an agreement to a collection
   *         schema:
   *           type: string
   * 
   */
  app.put('/agreement-collections', middleware, addAgreementToCollection, sendResponse);
};
