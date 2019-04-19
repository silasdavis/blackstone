const {
  getModels,
  getModelDiagram,
  getApplications,
  getDefinitions,
  getDefinition,
  createModelFromBpmn,
} = require(`${global.__controllers}/bpm-controller`);
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
   * BPM Model
   ************** */

  /**
   * @api {get} /bpm/process-models Read Process Models
   * @apiName ReadProcessModels
   * @apiGroup BPMModel
   *
   * @apiExample {curl} Simple:
   *     curl -iX GET /bpm/process-models
   *
   * @apiSuccess {String} modelAddress
   * @apiSuccess {String} id
   * @apiSuccess {String} name
   * @apiSuccess {Number} versionMajor
   * @apiSuccess {Number} versionMinor
   * @apiSuccess {Number} versionPatch
   * @apiSuccess {Boolean} active
   * @apiSuccessExample {json} Success Object Array
    [{
      "modelAddress": "912A82D4C72847EF1EC76426544EAA992993EE20",
      "id": "0000000000000000000000000000000000000000000000000000000000000000",
      "name": "0000000000000000000000000000000000000000000000000000000000000000",
      "versionMajor": 0,
      "versionMinor": 0,
      "versionPatch": 0,
      "active": true
    }]
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  */
  app.get('/bpm/process-models', middleware, getModels, sendResponse);

  /**
   * @api {get} /bpm/process-models/:address/diagram Read Diagram of Process Model
   * @apiName ReadProcessModelDiagram
   * @apiGroup BPMModel
   * @apiDescription Reads the diagram of the specified process model in the requested MIME type.
   * The 'Accept' header in the request should be set to either 'application/xml' or 'application/json'.
   *
   * @apiParam {String} address The address of the process model
   *
   * @apiExample {curl} Simple:
   *     curl -i -H "Accept: application/json" /bpm/process-models/912A82D4C72847EF1EC76426544EAA992993EE20/diagram
   *
   * @apiSuccess {Object} Object with details of the model and processes belonging to it
   * @apiSuccessExample {json} Success Object
   *
      {
        "model": {
          "name": "Collaboration_1bqszqk",
          "id": "1534895680958_ommi",
          "version": [
            1,
            0,
            0
          ],
          "private": false,
          "dataStores": [{
              "dataStorage": "PROCESS_INSTANCE",
              "dataPath": "agreement",
              "parameterType": 7
            },
            {
              "dataStorage": "agreement",
              "dataPath": "Assignee",
              "parameterType": 8
            }
          ],
        },
        "processes": [{
          "id": "Process_1rywjij",
          "name": "Process Name",
          "interface": "Agreement Formation",
          "participants": [{
            "id": "Lane_1mjalez",
            "name": "Assignee",
            "tasks": [
              "Task Name"
            ],
            "conditionalPerformer": true,
            "dataStorageId": "agreement",
            "dataPath": "Assignee"
          }],
          "tasks": [],
          "userTasks": [{
            "id": "Task Name",
            "name": "Task Name",
            "assignee": "Lane_1mjalez",
            "activityType": 0,
            "taskType": 1,
            "behavior": 1,
            "multiInstance": false,
            "application": "",
            "subProcessModelId": "",
            "subProcessDefinitionId": ""
          }],
          "sendTasks": [],
          "receiveTasks": [],
          "serviceTasks": [],
          "subProcesses": [],
          "transitions": []
        }]
      }
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.get('/bpm/process-models/:address/diagram', middleware, getModelDiagram, sendResponse);

  /**
   * @api {post} /bpm/process-models Parse BPMN XML and from it create a process model and definition
   * @apiName CreateBpmModel
   * @apiGroup BPMModel
   *
   * @apiDescription BPMN XML needs to be passed in the request body as plain text or application/xml
   *
   * @apiExample {curl} Simple:
   *     curl -i /bpm/process-models
   *     curl -i /bpm/process-models?format=bpmn
   *
   * @apiParam {String} [format] Optional parameter to denote format of process model.
   * Defaults to `bpmn` which is also the only format that is supported at this time.
   *
   * @apiSuccess {Object} Model details, process details, and parsed diagram (JSON)
   * @apiSuccessExample {json} Success Object
   {
     "model": {
       "id": "1535053136633_ommi",
       "address": "CDEBECF4D78F2DCF94DFAB12215D018CF1F3F11F"
     },
     "processes": [{
       "address": "43548D6C7894C0E5A7DA1ED08143E1AF4E9DD67E",
       "processDefinitionId": "Process_104nkeu",
       "interfaceId": "Agreement Formation",
       "processName": "Process Name",
       "modelAddress": "CDEBECF4D78F2DCF94DFAB12215D018CF1F3F11F",
       "private": false,
       "author": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1"
     }],
     "parsedDiagram": {
       "model": {
         "dataStores": [{
             "id": "PROCESS_INSTANCE",
             "name": "Process Instance",
             "parameters": [{
               "name": "agreement",
               "parameterType": 7
             }]
           },
           {
             "id": "agreement",
             "name": "Agreement",
             "parameters": [{
               "name": "Assignee",
               "parameterType": 8
             }]
           }
         ],
         "name": "Collaboration_1bqszqk",
         "id": "1535053136633_ommi",
         "version": [1, 0, 0],
         "private": false,
         "author": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1"
       },
       "processes": [{
         "id": "Process_104nkeu",
         "name": "Process Name",
         "interface": "Agreement Formation",
         "participants": [{
             "id": "Lane_18i4kvj",
             "name": "Agreement Parties (Signatories)",
             "tasks": ["Task_0ky8n9d"],
             "conditionalPerformer": true,
             "dataStorageId": "agreement",
             "dataPath": "AGREEMENT_PARTIES"
           },
           {
             "id": "Lane_1qvrgtf",
             "name": "Assignee",
             "tasks": ["Task_1jrtitw"],
             "conditionalPerformer": true,
             "dataStorageId": "agreement",
             "dataPath": "Assignee"
           }
         ],
         "tasks": [],
         "userTasks": [{
             "id": "Task_0ky8n9d",
             "name": "Signing Task",
             "assignee": "Lane_18i4kvj",
             "activityType": 0,
             "taskType": 1,
             "behavior": 1,
             "multiInstance": true,
             "dataMappings": [{
               "id": "agreement",
               "direction": 0,
               "dataPath": "agreement",
               "dataStorageId": ""
             }],
             "application": "AgreementSignatureCheck",
             "subProcessModelId": "",
             "subProcessDefinitionId": ""
           },
           {
             "id": "Task_1jrtitw",
             "name": "User Task",
             "assignee": "Lane_1qvrgtf",
             "activityType": 0,
             "taskType": 1,
             "behavior": 1,
             "multiInstance": false,
             "application": "",
             "subProcessModelId": "",
             "subProcessDefinitionId": ""
           }
         ],
         "sendTasks": [],
         "serviceTasks": [],
         "subProcesses": [],
         "transitions": [{
           "id": "SequenceFlow_0twrlls",
           "source": "Task_0ky8n9d",
           "target": "Task_1jrtitw"
         }],
         "activityMap": {
           "Task_0ky8n9d": "Signing Task",
           "Task_1jrtitw": "User Task"
         }
       }]
     }
   }
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.post('/bpm/process-models', middleware, createModelFromBpmn, sendResponse);


  /**
   * @api {get} /bpm/applications Read Applications
   * @apiName ReadApplications
   * @apiGroup BPMModel
   *
   * @apiExample {curl} Simple:
   *     curl -iX GET /bpm/applications
   *
   * @apiSuccessExample {Object[]} Success Object Array
      [{
          "id": "AgreementSignatureCheck",
          "applicationType": 2,
          "location": "FFA3BB89E3B0DC63C0CE9BF0E2278B56CE5991F4",
          "webForm": "SigningWebFormWithSignatureCheck",
          "accessPoints": [{
            "accessPointId": "agreement",
            "direction": 0,
            "dataType": 59
          }]
        },
        {
          "id": "WebAppApprovalForm",
          "applicationType": 2,
          "location": "0000000000000000000000000000000000000000",
          "webForm": "TaskApprovalForm",
          "accessPoints": []
        }
      ]
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.get('/bpm/applications', middleware, getApplications, sendResponse);

  /**
   * @api {get} /bpm/process-definitions Read All Process Definitions
   * @apiName ReadAllProcessDefinitions
   * @apiGroup BPMModel
   *
   * @apiParam {String} [interfaceId] Optional query parameter `interfaceId` can be used to filter by interface
   * @apiParam {String} [processDefinitionId] Optional query parameter `processDefinitionId` can be used to filter by processDefinitionId
   * @apiParam {String} [modelId] Optional query parameter `modelId` can be used to filter by modelId
   *
   * @apiExample {curl} Simple:
   *     curl -i /bpm/process-definitions
   *     curl -i /bpm/process-definitions?interfaceId=Agreement%20Execution
   *
   * @apiSuccess {Object[]} object Process Definition object
   * @apiSuccessExample {json} Success Objects Array
    [{
      "processDefinitionId": "Process_00pj23z",
      "address": "65BF0FB03BA5C140B1584A290B157F8907B8FEBE",
      "modelAddress": "6025AF7E4FBB2FCCCFBB855E68025CF20038E142",
      "interfaceId": "Agreement Execution",
      "modelFileReference": "eyJTcG...iVmVyc2lvbiI6MH0=",
      "isPrivate": false,
      "author": "DAE988ADED111E6AE82DBFD9AE4FFFE97ADBC23D",
      "modelId": "INC_EXEC_2018",
      "processName": "Inc Exec Process"
    }]
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.get('/bpm/process-definitions', middleware, getDefinitions, sendResponse);

  /**
   * @api {get} /bpm/process-definitions/:address Read Single Process Definition
   * @apiName ReadProcessDefinition
   * @apiGroup BPMModel
   *
   * @apiParam {String} address The address of the process definition
   *
   * @apiExample {curl} Simple:
   *     curl -i /bpm/process-definitions/81A817870C6C6A209150FA26BC52D835CA6E17D2
   *
   * @apiSuccess {String} processDefinitionId Id of the process definition
   * @apiSuccess {String} address Address of the process definition
   * @apiSuccess {String} modelAddress Address of the model the process definition was created under
   * @apiSuccess {String} interfaceId 'Agreement Formation' or 'Agreement Execution'
   * @apiSuccess {String} modelFileReference Hoard grant for the xml file representing the process
   * @apiSuccess {String} isPrivate Whether model is private
   * @apiSuccess {String} author Address of the model author
   * @apiSuccess {String} modelId Id of the process model
   * @apiSuccess {String} processName Human-readable name of the process definition
   * @apiSuccessExample {json} Success Object
    {
      "processDefinitionId": "Process_00pj23z",
      "address": "65BF0FB03BA5C140B1584A290B157F8907B8FEBE",
      "modelAddress": "6025AF7E4FBB2FCCCFBB855E68025CF20038E142",
      "interfaceId": "Agreement Execution",
      "modelFileReference": "eyJTcG...iVmVyc2lvbiI6MH0=",
      "isPrivate": false,
      "author": "DAE988ADED111E6AE82DBFD9AE4FFFE97ADBC23D",
      "modelId": "INC_EXEC_2018",
      "processName": "Inc Exec Process"
    }
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.get('/bpm/process-definitions/:address', middleware, getDefinition, sendResponse);
};
