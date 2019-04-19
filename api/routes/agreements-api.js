const multer = require('multer');
const upload = multer();
const {
  createAgreement,
  getAgreements,
  getAgreementHandler,
  updateAgreementAttachments,
  signAgreement,
  cancelAgreement,
} = require(`${global.__controllers}/agreements-controller`);
const { ensureAuth } = require(`${global.__common}/middleware`);
const { sendResponse } = require(`${global.__common}/controller-dependencies`);

// APIs defined according to specification found here -> http://apidocjs.com
module.exports = (app, customMiddleware) => {
  // Use custom middleware if passed, otherwise use plain old middleware
  const middleware = customMiddleware || ensureAuth;

  /* ***********
   * Agreements
   *********** */

  /**
 * @api {get} /agreements Read Agreements
 * @apiName ReadAgreements
 * @apiGroup Agreements
 *
 * @apiDescription Retrieves Active Agreement information of agreements that are public, or
 * if the `forCurrentUser` query is set to `true`,
 *    a) are authored by the authenticated user,
 *    b) are authored by an organization to which the authenticated user belongs,
 *    c) include the authenticated user in its signatories, or
 *    d) include an organization to which the authenticated user belongs in its signatories
 *
 * @apiExample {curl} Simple:
 *     curl -i /agreements
 *
 * @apiParam {Boolean} [forCurrentUser]  Optional query string parameter to get all agreements pertaining to the currently logged in user
 * @apiSuccess {String} address Active Agreement's address
 * @apiSuccess {String} name Human readable name of the Active Agreement
 * @apiSuccess {String} archetype Address of the parent Archetype of the Active Agreement
 * @apiSuccess {Boolean} isPrivate Whether the encryption framework of the Active Agreement
 * @apiSuccess {String} attachmentsFileReference Hoard grant needed to access an existing event log if any
 * @apiSuccess {Number} numberOfParties The number of parties agreeing to the Active Agreement
 * @apiSuccessExample {json} Success Objects Array
       [{
         "address": "4AD3C4FA34C8EC5FFBCC4924C2AB16DF72F1EBB8",
         "archetype": "4EF5DAB8CE089AD7F2CE7A04A7CB5DB1C58DB707",
         "name": "Drone Lease",
         "creator": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1",
         "attachmentsFileReference": "eyJTcG...iVmVyc2lvbiI6MH0=",
         "maxNumberOfAttachments": 10,
         "isPrivate": 1,
         "legalState": 1,
         "formationProcessInstance": "038725D6437A809D536B9417047EC74E7FF4D1C0",
         "executionProcessInstance": "0000000000000000000000000000000000000000",
         "numberOfParties": 2
       }]
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.get('/agreements', middleware, getAgreements, sendResponse);

  /**
 * @api {get} /agreements/:address Read an Agreement
 * @apiName ReadAgreement
 * @apiGroup Agreements
 *
 * @apiDescription Retrieves Active Agreement information for a single Agreement.
 * Notes:
 * - If the password provided is incorrect or a hoard reference which
 * does not exist was passed to the posted Active Agreement this get will return a `401`.
 * - If the agreement was not authored by the logged in user or one of their organizations, or
 * if its signatories does not include the logged in user or one of their organizations,
 * this will return a `404`.
 *
 * @apiExample {curl} Simple:
 *     curl -i /agreements/707791D3BBD4FDDE615D0EC4BB0EB3D909F66890
 *
 * @apiQueryParameter password The password to trigger the decryption key for an
 * opaque Agreement
 *
 * @apiSuccess {String} address Active Agreement's address
 * @apiSuccess {String} name Human readable name of the Active Agreement
 * @apiSuccess {String} archetype Address of the parent Archetype of the Active Agreement
 * @apiSuccess {Boolean} isPrivate Whether the encryption framework of the Active Agreement
 * is operational or not
 * @apiSuccess {Number} maxNumberOfAttachments Max number of attachments that can be stored in the attachments
 * @apiSuccess {Number} legalState Legal state of the agreement
 * @apiSuccess {Number} formationProcessInstance Address of the agreement's formation process instance
 * @apiSuccess {Number} executionProcessInstance Address of the agreement's execution process instance
 * @apiSuccess {String} collectionId Id of the collection the agreement belongs to
 * @apiSuccess {Object[]} parties An array of objects with each party member's address,
 * user id or organization name, signature timestamp, and address of the user that has signed for the party
 * @apiSuccess {Object[]} parameters An array of objects with each parameter's name, value, and data type
 * @apiSuccess {Object[]} governingAgreements An array of the governing agreements with the `address`, `name`, and `isPrivate` value of each
 * @apiSuccessExample {json} Success Object
  {
    "address": "9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E",
    "name": "Agreement",
    "archetype": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
    "isPrivate": false,
    "maxNumberOfAttachments": 0,
    "legalState": 1,
    "formationProcessInstance": "413AC7610E6A4E0ACEB29596FFC52D243A2E7CD7",
    "executionProcessInstance": "0000000000000000000000000000000000000000",
    "formationProcessDefinition": "65BF0FB03BA5C140B1584A290B157F8907B8FEBE",
    "executionProcessDefinition": "E6534E45E2B26AF4FBB64E42CE7FC66688696483",
    "collectionId": "9FBC54D1E8224307DA7E74BC54D1E829764E2DE7AD0D8DF6EBC54D1E82ADBCFF",
    "isParty": true,
    "isCreator": true,
    "isAssignedTask": false,
    "parties": [
        {
          "address": "F8C300C2B7A3F69C90BCF97298215BA7792B2EEB",
          "signatureTimestamp": 1539260590000,
          "signedBy": "F8C300C2B7A3F69C90BCF97298215BA7792B2EEB",
          "partyDisplayName": "jsmith",
          "signedByDisplayName": "jsmith"
        }
    ],
    "documents": [
      {
        "name": "Template1.docx",
        "grant": "eyJTcG...iVmVyc2lvbiI6MH0="
      },
      {
        "name": "Template2.md",
        "grant": "b9UTcG...iVmVyc2lvbiI6MH0="
      },
    ],
    "parameters": [
      {
        "name": "Signatory",
        "value": "F8C300C2B7A3F69C90BCF97298215BA7792B2EEB",
        "type": 8
      },
      {
        "name": "User",
        "value": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1",
        "type": 6
      }
    ],
    "governingAgreements": [
      {
        "address": "B3AEAD4717EFF80BDDF5E22110521029A8460FFB",
        "name": "Governing Agreement",
        "isPrivate": false
      }
    ]
  }
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.get('/agreements/:address', middleware, getAgreementHandler, sendResponse);

  /**
 * @api {post} /agreements Create an Agreement
 * @apiName CreateAgreement
 * @apiGroup Agreements
 *
 * @apiExample {curl} Simple:
 *     curl -iX POST /agreements
 *
 * @apiBodyParameter {String} name Human readable name of the Active Agreement (limit: 32 ASCII characters)
 * @apiBodyParameter {String} archetype Address of the parent Archetype of the Active Agreement
 * @apiBodyParameter {Boolean} isPrivate Whether the encryption framework of the Active Agreement
 * is operational or not
 * @apiBodyParameter {String} password A secret string which is used to trigger the encryption
 * system for the Active Agreements's documents
 * @apiBodyParameter {Integer} maxNumberOfAttachments The maximum number of attachments to be logged on the Active Agreement
 * @apiBodyParameter {String[]} parties The addresses of the parties to the Active Agreement
 * @apiBodyParameter {Object[]} parameters The "custom-field-name" and values of the parameters.
 * Note- If a parameter with type 8 (Signing Party) is given, the corresponding value will be added to the agreement's parties.
 * @apiBodyParameter {String[]} governingAgreements If parent archetype has any governing archetypes, agreements for each one must
 * @apiBodyParameter {String} collectionId Id of the collection that the agreement is intended to be part of
 * already exist, and their addresses should be given here.
 * @apiBodyParameterExample {json} Success Object
    {
      "name": "Agreement",
      "archetype": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
      "isPrivate": false,
      "password": "secret password"
      "maxNumberOfAttachments": "10",
      "parties": ["36ADA22D3A4B841EFB73414CD97C35C0A660C1C2"],
      "parameters": [{
          "name": "Buyer",
          "type": 8,
          "value": "BE98345FEDCD465D0EBADB0EB3789F234ECBD"
        },
        {
          "name": "Quantity",
          "value": 10
        }
      ],
      "governingAgreements": ["B3AEAD4717EFF80BDDF5E22110521029A8460FFB"],
      "collectionId": "BD8E2D998A9B829B5A6A10C8D0E47E3A178A214F862F8D79580C0B87F0650F88"
    }
  *
  *
  @apiSuccess {String} The address of the created Agreement *
  @apiSuccessExample {json} Success Object
  {
    "address": "6EDC6101F0B64156ED867BAE925F6CD240635656"
  }
*
*
* @apiUse NotLoggedIn
* @apiUse AuthTokenRequired
*/
  app.post('/agreements', middleware, createAgreement, sendResponse);

  /**
 * @api {put} /agreements/:address/attachments Add an attachment to an Agreement
 * @apiName updateAgreementAttachments
 * @apiGroup Agreements
 * @apiDescription Adds an attachment to the specific agreement.
 * When requested with `Content-Type: multipart/form-data`, the attached file will be uploaded to hoard.
 * The attachment's content will be set to the hoard grant for the file, and the name will be set to the file's name.
 * When requested with  `Content-Type: application/json`, the name and content from the request will be used as the attachment.
 *
 * @apiExample {curl} Simple:
 *     curl -iX POST /agreements/707791D3BBD4FDDE615D0EC4BB0EB3D909F66890/attachments -d '{"name":"name", "content":"content"}'
 *
 * @apiURLParameter address Agreement address
 * @apiBodyParameter name Human readable name of the attachment
 * @apiBodyParameter {String} content Description of the attachment
 * @apiBodyParameterExample {json} Success Object
  {
    "name": "Name of Attachment",
    "content": "Content of attachment",
  }
*
* @apiSuccess {String} attachmentsFileReference The hoard grant of the updated attachments
* @apiSuccess {Object[]} attachments The updated array of attachments
* @apiSuccessExample {json} Success Object
  {
    "attachmentsFileReference": "b9SMcG...iVmVyc2lvbiI6MH0=",
    "attachments": [
      {
        "name": "Name of Attachment",
        "submitter": "36ADA22D3A4B841EFB73414CD97C35C0A660C1C2",
        "timestamp": 1551216868342,
        "content": "Content of attachment",
        "contentType": "plaintext"
      }
    ]
  }
*
* @apiUse NotLoggedIn
* @apiUse AuthTokenRequired
*/
  app.post('/agreements/:address/attachments', middleware, upload.any(), updateAgreementAttachments, sendResponse);

  /**
   * @api {put} /agreements Sign an Agreement
   * @apiName signAgreement
   * @apiGroup Agreements
   * @apiDescription Signs an agreement by the authenticated user
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /agreements/707791D3BBD4FDDE615D0EC4BB0EB3D909F66890/sign
   *
   * @apiURLParameter address Agreement address
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   */
  app.put('/agreements/:address/sign', middleware, signAgreement, sendResponse);

  /**
   * @api {put} /agreements Cancel an Agreement
   * @apiName cancelAgreement
   * @apiGroup Agreements
   * @apiDescription Cancels an agreement if the authenticated user is a member of the agreement parties,
   * or a member of an organization that is an agreement party
   *
   * @apiExample {curl} Simple:
   *     curl -iX PUT /agreements/707791D3BBD4FDDE615D0EC4BB0EB3D909F66890/cancel
   *
   * @apiURLParameter address Agreement address
   * @apiUse NotLoggedIn
   * @apiUse AuthTokenRequired
   */
  app.put('/agreements/:address/cancel', middleware, cancelAgreement, sendResponse);
};
