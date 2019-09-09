const {
  getCountries,
  getAlpha2Countries,
  getAlpha2CountryRegions,
  getCurrencies,
  getAlpha3Currencies,
  getParameterType,
  getParameterTypes,
  getCollectionTypes,
} = require(`${global.__controllers}/static-data-controller`);
const { ensureAuth } = require(`${global.__common}/middleware`);
const { sendResponse } = require(`${global.__common}/controller-dependencies`);

// APIs defined according to specification found here -> http://apidocjs.com
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

module.exports = (app, customMiddleware) => {
  // Use custom middleware if passed, otherwise use plain old middleware
  const middleware = customMiddleware || ensureAuth;

  /* **************
   * Jurisdictions
   ************** */

  /**
   * @swagger
   *
   * /static-data/iso/countries:
   *   get:
   *     tags:
   *       - "StaticData"
   *     description: Read Countries
   *     produces:
   *       - application/json
   *     parameters: []
   *     responses:
   *       '200':
   *         description: An array of countries objects
   *         schema:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               country:
   *                 type: string
   *               alpha2:
   *                 type: string
   *               alpha3:
   *                 type: string
   *               m49:
   *                 type: string
   *               name:
   *                 type: string
   * 
   */
  app.get('/static-data/iso/countries', middleware, getCountries, sendResponse);

  /**
   * @swagger
   *
   * /static-data/iso/countries/{alpha2}:
   *   get:
   *     tags:
   *       - "StaticData"
   *     description: Get the country whose `alpha2` code matches the one passed as parameter.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: alpha2
   *         description: code
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: A single countries objects
   *         schema:
   *           type: object   
   *           properties:
   *             country:
   *               type: string
   *             alpha2:
   *               type: string
   *             alpha3:
   *               type: string
   *             m49:
   *               type: string
   *             name:
   *               type: string
   * 
   */
  app.get('/static-data/iso/countries/:alpha2', middleware, getAlpha2Countries, sendResponse);

  /**
   * @swagger
   *
   * '/static-data/iso/countries/{alpha2}/regions':
   *   get:
   *     tags:
   *       - "StaticData"
   *     description: |-
   *       Get an array of regions belonging to the country
   *       whose `alpha2` code matches the one passed as parameter. Note that a
   *       region may have its `code2` OR `code3` property populated, NOT both.
   *       Thus to represent regions in the UI dropdown, we can use
   *       `<alpha2>-<code2 or code3>` followed by the name.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: alpha2
   *         description: code
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: An array of regions objects
   *         schema:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               country:
   *                 type: string
   *               region:
   *                 type: string
   *               alpha2:
   *                 type: string
   *               code2:
   *                 type: string
   *               code3:
   *                 type: string
   *               name:
   *                 type: string
   * 
   */
  app.get('/static-data/iso/countries/:alpha2/regions', middleware, getAlpha2CountryRegions, sendResponse);

  /** **********
   * Currencies
   *********** */

  /**
   * @swagger
   *
   * /static-data/iso/currencies:
   *   get:
   *     tags:
   *       - "StaticData"
   *     description: Read Currencies
   *     produces:
   *       - application/json
   *     parameters: []
   *     responses:
   *       '200':
   *         description: An array of regions objects
   *         schema:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               currency:
   *                 type: string
   *               alpha3:
   *                 type: string
   *               m49:
   *                 type: string
   *               name:
   *                 type: string
   * 
   */
  app.get('/static-data/iso/currencies', middleware, getCurrencies, sendResponse);

  /**
   * @swagger
   *
   * /static-data/iso/currencies/{alpha3}:
   *   get:
   *     tags:
   *       - "StaticData"
   *     description: |-
   *       Get the currency whose `alpha3` code matches
   *       the one passed as parameter.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: alpha3
   *         description: code
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: A single countries objects
   *         schema:
   *           type: object
   *           properties:
   *             currency:
   *               type: string
   *             alpha3:
   *               type: string
   *             m49:
   *               type: string
   *             name:
   *               type: string
   * 
   */
  app.get('/static-data/iso/currencies/:alpha3', middleware, getAlpha3Currencies, sendResponse);

  /**
   * @swagger
   *
   * /static-data/parameter-types:
   *   get:
   *     tags:
   *       - "StaticData"
   *     description: Read Parameter Types
   *     produces:
   *       - application/json
   *     parameters: []
   *     responses:
   *       '200':
   *         description: object array
   *         schema:
   *           type: array
   *           items:
   *              type: object
   *              properties:
   *                 parameterType:
   *                   type: integer
   *                 label:
   *                   type: boolean
   * 
   */
  app.get('/static-data/parameter-types', middleware, getParameterTypes, sendResponse);

  /**
   * @swagger
   *
   * /static-data/parameter-types/{id}:
   *   get:
   *     tags:
   *       - "StaticData"
   *     description: Read Single Parameter Type
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: id
   *         description: code
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Read Single Parameter Type
   *         schema:
   *           type: string
   * 
   */
  app.get('/static-data/parameter-types/:id', middleware, getParameterType, sendResponse);


  /**
   * @swagger
   *
   * /static-data/collection-types:
   *   get:
   *     tags:
   *       - "StaticData"
   *     description: Read Collection Types
   *     produces:
   *       - application/json
   *     parameters: []
   *     responses:
   *       '200':
   *         description: object array
   *         schema:
   *           type: array
   *           items:
   *              type: object
   *              properties:
   *                 collectionType:
   *                   type: integer
   *                 label:
   *                   type: string
   * 
   */
  app.get('/static-data/collection-types', middleware, getCollectionTypes, sendResponse);
};
