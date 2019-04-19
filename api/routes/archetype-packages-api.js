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

  /* ***********
    * Archetype Packages
  *********** */

  /**
 * @api {get} /archetypes Read Archetype Packages
 * @apiName ReadArchetypePackages
 * @apiGroup Archetypes
 *
 * @apiDescription Retrieves archetype package information. Within the
 * Agreements Network, Archetype Packages are collections of archetypes that are
 * related in some way.
 * Returns all packages that are either public or authored by the authenticated user
 *
 * @apiExample {curl} Simple:
 *     curl -i /archetype-packages
 *
 * @apiSuccess {String} id Archetype Package id
 * @apiSuccess {String} name Human readable name of the Archetype Pacakge
 * @apiSuccess {String} author Controller contract of the user or organization
 * @apiSuccess {String} description Description of the package
 * @apiSuccess {Boolean} isPrivate Indicates whether the package can be read/used publicly
 * @apiSuccess {Boolean} active Indicates whether the package has been activated and available for creating collections with.
 * that created the package
 * @apiSuccessExample {json} Success Objects Array
  [{
    "id": "7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD",
    "name": "Package1",
    "description": "package description"
    "author": "6EDC6101F0B64156ED867BAE925F6CD240635656",
    "isPrivate": false,
    "active": true
  }]
*/
  app.get('/archetype-packages', middleware, getArchetypePackages, sendResponse);

  /**
 * @api {get} /archetype-packages/:id Read an Archetype Package
 * @apiName ReadArchetypePackage
 * @apiGroup Archetypes
 *
 * @apiDescription Retrieves information for a single archetype package.
 * Returns a `404` if the package is private or not active and the authenticated user is not its author.
 * @apiExample {curl} Simple:
 *     curl -i /archetype-packages/7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD
 *
 * @apiSuccess {String} id Archetype Package id
 * @apiSuccess {String} name Human readable name of the Archetype Package
 * @apiSuccess {String} description Human readable description of the Archetype Package
 * @apiSuccess {String} author Controller contract of the user or organization
 * @apiSuccess {Boolean} isPrivate Indicates whether the package can be read/used publicly
 * @apiSuccess {Boolean} active Indicates whether the package has been activated and available for creating collections with.
 * @apiSuccess {Object[]} archetypes Array of archetypes with name, address, and active keys
 * that are included in the Archetype Package
 * @apiSuccessExample {json} Success Object
  {
    "id": "7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD",
    "name": "Package1",
    "description": "Package Description",
    "author": "6EDC6101F0B64156ED867BAE925F6CD240635656",
    "isPrivate": false,
    "active": true,
    "archetypes": [{
        "name": "Archetype 1",
        "address": "4156ED867BAE4156ED867BAE925F6CD240635656",
        "active": true
      },
      {
        "name": "Archetype 2",
        "address": "406356867BAE4156ED867BAE925F6CD240635656",
        "active": false
      }
    ]
  }
*/
  app.get('/archetype-packages/:id', middleware, getArchetypePackage, sendResponse);

  /**
 * @api {post} /archetypes/packages Create an Archetype Package
 * @apiName CreateArchetypePackage
 * @apiGroup Archetypes
 *
 *
 * @apiExample {curl} Simple:
 *     curl -iX POST /archetype-packages
 *
 * @apiBodyParameter {String} name Human readable name of the Archetype Package
 * @apiBodyParameter {String} description Human readable description of the Archetype Package
 * @apiBodyParameter [String] author Controller contract of the user or organization. Will be set to the authenticated user's address if not provided.
 * that created the Archetype Package
 * @apiBodyParameter {Boolean} isPrivate Human readable description of the Archetype Package
 * @apiBodyParameter {Boolean} active Optional- will default to false
 *
 * @apiBodyParameterExample {json} Success Object
  {
    "name": "Drone Lease Package",
    "description": "Package of archetypes for leasing drones in US-NY",
    "author": "6EDC6101F0B64156ED867BAE925F6CD240635656",
    "isPrivate": false,
    "active": true
  }
*
* @apiSuccess {String} The id of the created Archetype Package
* @apiSuccessExample {json} Success-Response:
  {
    "id": "7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD"
  }
*
* @apiUse NotLoggedIn
* @apiUse AuthTokenRequired
*/
  app.post('/archetype-packages', middleware, createArchetypePackage, sendResponse);

  /**
   * @api {put} /archetype-packages/:id/archetype/:address Add an archetype to a package
   * @apiName AddArchetypeToPackage
   * @apiGroup Archetypes
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /archetype-packages/7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD/archetype/707791D3BBD4FDDE615D0EC4BB0EB3D909F66890
   *
   * @apiURLParameter address Archetype address
   * @apiURLParameter id Package Id
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   */
  app.put('/archetype-packages/:packageId/archetype/:archetypeAddress', middleware, addArchetypeToPackage, sendResponse);

  /**
   * @api {put} /archetype-packages/:id/activate Activate an archetype package
   * @apiName ActivateArchetypePackage
   * @apiGroup Archetypes
   * @apiDescription Activates the archetype package
   * An archetype package can only be activated by its author.
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /archetype-packages/7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD/activate
   *
   * @apiURLParameter address Archetype package id
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   */
  app.put('/archetype-packages/:id/activate', middleware, activateArchetypePackage, sendResponse);

  /**
   * @api {put} /archetype-packages/:id/deactivate deactivate an archetype package
   * @apiName DeactivateArchetypePackage
   * @apiGroup Archetypes
   * @apiDescription Deactivates the archetype package
   * An archetype package can only be deactivated by its author. Once an archetype package is deactivated by
   * its author, it will not be included in `GET /archetype-packges` or `GET /archetype-packages/:id`
   * responses made by users other than the author.
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /archetype-packages/7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD/deactivate
   *
   * @apiURLParameter address Archetype package id
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   */
  app.put('/archetype-packages/:id/deactivate', middleware, deactivateArchetypePackage, sendResponse);
};
