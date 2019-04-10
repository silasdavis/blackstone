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
 * @api {get} /archetypes Read Archetypes
 * @apiName ReadArchetypes
 * @apiGroup Archetypes
 *
 * @apiDescription Retrieves archetype information. Within the
 * Agreements Network, Archetypes are the fundamental, top level
 * objects. They are holders for a set of information which
 * allows users to creat Active Agreements within the Platform.
 * The returned list will include archetypes that are:
 *    a. authored by the authenticated user, or
 *    b. public (ie. `isPrivate` property is `false`) and activated (ie. `active` property is true)
 *
 * @apiExample {curl} Simple:
 *     curl -i /archetypes
 *
 * @apiSuccess {String} address Archetype's address
 * @apiSuccess {String} name Human readable name of the Archetype
 * @apiSuccess {String} author Controller contract of the user or organization
 * that created the Archetype
 * @apiSuccess {String} description description of the Archetype
 * @apiSuccess {Boolean} active Whether the Archetype can be used to create
 * new Active Agreements or not
 * @apiSuccess {Boolean} isPrivate Whether the encryption framework of the Archetype
 * is operational or not
 * @apiSuccess {Number} numberOfParameters The number of custom parameters used by the Archetype
 * @apiSuccess {Number} numberOfDocuments The number of documents registered against the Archetype
 * @apiSuccess {String[]} countries The jurisdictions in which the Archetype has been
 * registered to be active
 * @apiSuccessExample {json} Success Objects Array
  [{
    "address": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
    "name": "TestType1",
    "author": "6EDC6101F0B64156ED867BAE925F6CD240635656",
    "description": "This archetype is for testing purposes.",
    "active": false,
    "isPrivate": false,
    "numberOfParameters": 2,
    "numberOfDocuments": 1,
    "countries": ["US", "CA"]
  }]
*/
  app.get('/archetypes', middleware, getArchetypes, sendResponse);

  /**
 * @api {get} /archetypes/:address Read an Archetype
 * @apiName ReadArchetype
 * @apiGroup Archetypes
 *
 * @apiDescription Retrieves archetype information for a single Archetype.
 * This endpoint will return a `404` if:
 *    a. the archetype is not found, or
 *    b. the archetype is private and the authenticated user is not its author.
 * Note: if the password provided is incorrect or a hoard reference which
 * does not exist was passed to the posted archetype this get will return a `401`.
 *
 * @apiExample {curl} Simple:
 *     curl -i /archetypes/707791D3BBD4FDDE615D0EC4BB0EB3D909F66890
 *
 * @apiQueryParameter password The password to trigger the decryption key for an
 * opaque Archetype
 *
 * @apiSuccess {String} address Archetype's address
 * @apiSuccess {String} name Human readable name of the Archetype
 * @apiSuccess {String} author Controller contract of the user or organization
 * that created the Archetype
 * @apiSuccess {String} description Description of the archetype
 * @apiSuccess {Number} price Price of the archetype
 * @apiSuccess {Boolean} active Whether the Archetype can be used to create
 * new Active Agreements or not
 * @apiSuccess {Boolean} isPrivate Whether the encryption framework of the Archetype
 * is operational or not
 * @apiSuccess {String} successor Address of the successor archetype
 * @apiSuccess {Object[]} parameters The "name" and "type" of all custom parameters used
 * by the Archetype
 * @apiSuccess {Object[]} documents The "name", "grant" (if any)
 * sufficient to provide the information regarding the relevant documents associated with
 * the Archetype
 * @apiSuccess {Object[]} jurisdictions The "country" and "regions" which the Archetype
 * has been registered as relevant to. The "country" is registered as an ISO standard
 * two character string and "regions" is an array of addresses relating to the controlling
 * contracts for the region (see [ISO standards manipulation](#) section).
 * @apiSuccess {Object[]} packages The "id" and "name" of each of the packages that the archetype has been added to
 * @apiSuccessExample {json} Success Object
  {
    "address": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
    "name": "TestType1",
    "author": "6EDC6101F0B64156ED867BAE925F6CD240635656",
    "description": "rental archetype",
    "price": 10,
    "active": false,
    "isPrivate": false,
    "successor": "ED867101F0B64156ED867BAE925F6CD2406350B6",
    "parameters": [{
        "name": "NumberOfTeenageDaughters",
        "type": 2,
        "label": "Number"
      },
      {
        "name": "ExitClause",
        "type": 1,
        "label": "String"
      }
    ],
    "documents": [{
      "name": "Dok1",
      "grant": "eyJTcG...iVmVyc2lvbiI6MH0="
    }],
    "jurisdictions": [{
        "country": "US",
        "regions": ["0304CA03C4E9DD0F9676A4463D42BCB686331A5361570D9BF7BC211C1BCA9F1E", "04E01B41ABD856ECAE38A06FB81005A911271B4BF483C10F31C539031C399101"]
      },
      {
        "country": "CA",
        "regions": ["0000000000000000000000000000000000000000000000000000000000000000"]
      }
    ],
    "packages": [{
      "id": "86401D45D372B3E036F91F7DDC87006E069AFCB96B3708B2FBA722D0672DDA7C",
      "name": "Drone Lease Package"
    }],
    "governingArchetypes": [{
      "address": "4EF5DAB8CE089AD7F2CE7A04A7CB5DB1C58DB707",
      "name": "NDA Archetype"
    }]
  }
*/
  app.get('/archetypes/:address', middleware, getArchetype, sendResponse);

  /**
 * @api {post} /archetypes Create an Archetype
 * @apiName CreateArchetype
 * @apiGroup Archetypes
 *
 *
 * @apiExample {curl} Simple:
 *     curl -iX POST /archetypes
 *
 * @apiBodyParameter {String} name Human readable name of the Archetype (limit: 32 ASCII characters)
 * @apiBodyParameter {String} author Controller contract of the user or organization
 * that created the Archetype. Note that currently the author is forced to be the logged-in-user's address
 * since we do not yet have a review/approval process for changes made to an organization-authored archetype by a user who is part of that organization
 * @apiBodyParameter {String} description Short human readable description of the Archetype
 * @apiBodyParameter {Integer} price Price of the archetype, in cents (Optional- this field can be edited later through a `PUT` request to '/archetypes/:address/price')
 * @apiBodyParameter {Boolean} isPrivate **(Optional)** Whether the encryption framework of
 * the Archetype is operational or not
 * @apiBodyParameter {String} password A secret string which is used to trigger the encryption
 * system for the Archetype's documents
 * @apiBodyParameter {Object[]} parameters **(Optional)** The "name" (limit: 32 ASCII characters) and "type" of all custom parameters used
 * by the Archetype
 * @apiBodyParameter {Object[]} documents **(Optional)**  The "name" and "grant" (if any)
 * sufficient to provide the information regarding the relevant documents associated with
 * the Archetype
 * @apiBodyParameter {Object[]} jurisdictions The "country" and "regions" which the Archetype
 * has been registered as relevant to. The "country" is registered as an ISO standard
 * two character string and "regions" is an array of addresses relating to the controlling
 * contracts for the region (see [ISO standards manipulation](#) section).
 * @apiBodyParameter {String} formationProcessDefinition Address of the formation process definition
 * controller
 * @apiBodyParameter {String} executionProcessDefinition Address of the execution process definition
 * controller
 * @apiBodyParameter {String[]} governingArchetypes Array of contract addresses of the archetypes to govern this new one
 * of the rights and conditions of the contract
 * @apiBodyParameterExample {json} Success Object
{
  "name": "Archetype 2",
  "description": "Test Archetype",
  "price": "19.55",
  "isPrivate": 0,
  "password": "A Secret String",
  "parameters": [{
      "type": 8,
      "name": "Assignee",
      "signatory": true
    },
    {
      "type": 2,
      "name": "NumberOfTeenageDaughters"
    },
    {
      "type": 1,
      "name": "Exit Clause"
    }
  ],
  "documents": [{
      "name": "test&stuff.pdf",
      "grant": "eyJTcG...iVmVyc2lvbiI6MH0="
    },
    {
      "name": "Untitled document.docx",
      "grant": "b9SMcG...iVmVyc2lvbiI6MH0="
    }
  ],
  "jurisdictions": [{
    "country": "US",
    "regions": [
      "281BAF100FF362D83EB90B4C84F978390AA0B063080858DBCA94546629974832",
      "C45A6B6C560B1DD579D17FC80B8E320E9A400AE3CB7EF61EC0EA95A69302767F"
    ]
  }],
  "formationProcessDefinition": "1671227FBC248B809F74D9BA29B4731F130BCD93",
  "executionProcessDefinition": "E6534E45E2B26AF4FBB64E42CE7FC66688696483",
  "governingArchetypes": ["ADB20020CE08E2DF5ABB3818590C3E2BA2035202"]
}

*
* @apiSuccess {String} The address of the created Archetype
* @apiSuccessExample {json} Success-Response:
{
  "address": "6EDC6101F0B64156ED867BAE925F6CD240635656"
}
*
* @apiUse NotLoggedIn
* @apiUse AuthTokenRequired
*/
  app.post('/archetypes', middleware, createArchetype, sendResponse);

  /**
   * @api {put} /archetypes/:address/activate Activate an archetype
   * @apiName ActivateArchetype
   * @apiGroup Archetypes
   * @apiDescription Activates the archetype so that agreements can be created from it.
   * An archetype can only be activated by its author. This action will fail if the archetype
   * has a successor set.
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /archetypes/6EDC6101F0B64156ED867BAE925F6CD240635656/activate
   *
   * @apiURLParameter address Archetype address
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   */
  app.put('/archetypes/:address/activate', middleware, activateArchetype, sendResponse);

  /**
   * @api {put} /archetypes/:address/successor/:successor Set successor for an archetype
   * @apiName SetArchetypeSuccessor
   * @apiGroup Archetypes
   * @apiDescription Sets the successor of given archetype. This action automatically
   * makes the archetype inactive. Note that an archetype cannot point to itself as its
   * successor. It also validates if this action will result in a circular dependency
   * between two archetypes. A succcessor may only be set by the author of the archetype.
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /archetypes/6EDC6101F0B64156ED867BAE925F6CD240635656/successor/ED867101F0B64156ED867BAE925F6CD2406350B6
   *
   * @apiURLParameter address Archetype address
   * @apiURLParameter address Successor address
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   */
  app.put('/archetypes/:address/successor/:successor', middleware, setArchetypeSuccessor, sendResponse);

  /**
   * @api {put} /archetypes/:address/price Set price of an archetype
   * @apiName SetArchetypePrice
   * @apiGroup Archetypes
   * @apiDescription Sets the price of given archetype
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /archetypes/6EDC6101F0B64156ED867BAE925F6CD240635656/price
   *
   * @apiURLParameter address Archetype address
   * @apiBodyParameter {Number} price Price of the archetype
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   */
  app.put('/archetypes/:address/price', middleware, setArchetypePrice, sendResponse);

  /**
   * @api {put} /archetypes/:address/deactivate Deactivate an archetype
   * @apiName DeactivateArchetype
   * @apiGroup Archetypes
   * @apiDescription Deactivates the archetype so that agreements cannot be created from it.
   * An archetype can only be deactivated by its author. Once an archetype is deactivated by
   * its author, it will not be included in `GET /archetypes`
   * responses made by users other than the author.
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /archetypes/6EDC6101F0B64156ED867BAE925F6CD240635656/activate
   *
   * @apiURLParameter address Archetype address
   *
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   */
  app.put('/archetypes/:address/deactivate', middleware, deactivateArchetype, sendResponse);
};
