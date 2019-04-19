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

  /* ***********
   * Agreement Collections
   *********** */
  /**
 * @api {get} /agreement-collections Read Agreement Collections
 * @apiName ReadAgreementCollections
 * @apiGroup Agreements
 *
 * @apiDescription Retrieves Active Agreement Collection information where the author is the authenticated user,
 * or the organization the user is a member of.
 *
 * @apiExample {curl} Simple:
 *     curl -i /agreement-collections
 *
 * @apiSuccess {String} id Active Agreement Collection id
 * @apiSuccess {String} name Human readable name of the Active Agreement Collection
 * @apiSuccess {String} author Address of the creator (user account or org)
 * @apiSuccess {Number} collectionType Type of collection
 * @apiSuccess {String} packageId The packageId of the archetype package from which the collection was created.
 * @apiSuccessExample {json} Success Objects Array
  [{
    "id": "9FBC54D1E8224307DA7E74BC54D1E829764E2DE7AD0D8DF6EBC54D1E82ADBCFF",
    "name": "Agreement Collection 1",
    "author": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
    "collectionType": 2,
    "packageId": "7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD"
  }]
*
* @apiUse NotLoggedIn
* @apiUse AuthTokenRequired
*
*/
  app.get('/agreement-collections', middleware, getAgreementCollections, sendResponse);

  /**
 * @api {get} /agreement-collections/:id Read an Agreement Collection
 * @apiName ReadAgreementCollection
 * @apiGroup Agreements
 *
 * @apiDescription Retrieves information for a single Agreement Collection if the author is the authenticated user
 * or the organization the user is a member of.
 *
 * @apiExample {curl} Simple:
 *     curl -i /agreement-collections/7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD
 *
 * @apiSuccess {String} id Agreement Collection id
 * @apiSuccess {String} name Human readable name of the Agreement Collection
 * @apiSuccess {String} author Controller contract of the user or organization
 * @apiSuccess {Number} collectionType Type of collection
 * @apiSuccess {String} packageId The packageId of the archetype package from which the collection was created
 * @apiSuccess {Object[]} agreements Array of agreement objects included in the collection
 * @apiSuccessExample {json} Success Object
  {
    "id": "7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD",
    "name": "Agreement Collection 1",
    "author": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
    "collectionType": 2,
    "packageId": "9FBC54D1E8224307DA7E74BC54D1E829764E2DE7AD0D8DF6EBC54D1E82ADBCFF",
    "agreements": [{
      "name": "Agreement 1",
      "address": "E615D0EC4BB0EDDE615D0EC4BB0EB3D909F66890",
      "archetype": "42B7AC86A84DD3AA054F567BCF5D27D9622FCD0B"
    }]
  }
*/
  app.get('/agreement-collections/:id', middleware, getAgreementCollection, sendResponse);

  /**
 * @api {get} /agreement-collections Create a Agreement Collection
 * @apiName CreateAgreementCollection
 * @apiGroup Agreements
 *
 * @apiDescription Creates an Active Agreement Collection.
 *
 * @apiExample {curl} Simple:
 *     curl -iX POST /agreement-collections
 *
 * @apiSuccess {String} name Active Agreement Collection name
 * @apiSuccess {String} author Address of the creator (user account or org), logged in user address will be used if none supplied
 * @apiSuccess {Number} collectionType Type of collection
 * @apiSuccess {String} packageId The packageId of the archetype package from which the collection was created
 * @apiBodyParameterExample {json} Success Object
    {
      "name": "Rental Collection",
      "collectionType": 2,
      "packageId": "7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD",
    }
  *
 * @apiSuccessExample {json} Success Object
  {
    "id": "9FBC54D1E8224307DA7E74BC54D1E829764E2DE7AD0D8DF6EBC54D1E82ADBCFF"
  }
*
* @apiUse NotLoggedIn
* @apiUse AuthTokenRequired
*
*/
  app.post('/agreement-collections', middleware, createAgreementCollection, sendResponse);

  /**
   * @api {put} /agreement-collections Add an agreement to a collection
   * @apiName AddAgreementToCollection
   * @apiGroup Agreements
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /agreement-collections/7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD
   *
   * @apiBodyParameter {String} agreement Address of the agreement to add
   * @apiBodyParameter {String} collectionId Id of the collection to add to
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   */
  app.put('/agreement-collections', middleware, addAgreementToCollection, sendResponse);
};
