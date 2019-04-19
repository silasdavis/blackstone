const {
  getActivityInstances,
  getActivityInstance,
  getDataMappings,
  setDataMappings,
  getTasksForUser,
  completeActivity,
  signAndCompleteActivity,
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
   * BPM Runtime
   ************** */
  /**
   * @api {get} /activity-instances Read Activities of a process instance
   * @apiName ReadProcessInstanceActivities
   * @apiGroup BPMRuntime
   *
   * @apiDescription Read all activities of a process instance
   * @apiParam {String} [processInstance] Optional Address of process instance to filter by
   * @apiParam {String} [agreementAddress] Optional Address of process instance to filter by
   *
   * @apiExample {curl} Simple:
   *     curl -i /activity-instances?processInstance=150D431B160790B2462D8CC683C87FEA2F1C3C61
   *
   * @apiSuccessExample {json} Success Objects Array
    [{
      "processAddress": "A65B3111789E4355EA03E0F109FBDD0042133307",
      "activityInstanceId": "A2A9736AEEC9B1DCAA274DEBF76248EA57ABA0727BDE343C2CDE663FC48E2BF4",
      "activityId": "Task_0X7REW5",
      "created": 1533736147000,
      "completed": 0,
      "performer": "5860AF129980B0E932F3509432A0C43DEAB77B0B",
      "completedBy": "0000000000000000000000000000000000000000",
      "state": 4,
      "agreementAddress": "391F69095A291E21079A78F0F67EE167D7628AE2",
      "agreementName": "Agreement Name"
      "processDefinitionAddress": "0506903B34830785168D840BB70D7D48D31A5C1F",
      "processName": "Ship"
    }]
  *
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.get('/bpm/activity-instances', middleware, getActivityInstances, sendResponse);

  /**
   * @api {get} /activity-instances/:id Read activity instance
   * @apiName ReadActivityInstance
   * @apiGroup BPMRuntime
   *
   * @apiDescription Retrieve details of the specified activity instance
   *
   * @apiExample {curl} Simple:
   *     curl -i /activity-instances/41ED431B140790B2462D8CC683C87FEA2F1DE321
   *
   * @apiSuccess {Object} object Activity instance object
   * @apiSuccessExample {json} Success Object
    {
      "state": 4,
      "processAddress": "A65B3111789E4355EA03E0F109FBDD0042133307",
      "activityInstanceId": "A2A9736AEEC9B1DCAA274DEBF76248EA57ABA0727BDE343C2CDE663FC48E2BF4",
      "activityId": "Sign_Signing Task",
      "created": 1533678582000,
      "performer": "5860AF129980B0E932F3509432A0C43DEAB77B0B",
      "completed": 0,
      "taskType": 1,
      "application": "AgreementSignatureCheck",
      "applicationType": 2,
      "webForm": "DefaultSignAndCompleteForm",
      "processName": "Lease Formation",
      "processDefinitionAddress": "833E7452A7D1B02655889AC52F745FD1D5C50AAC",
      "agreementAddress": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1",
      "modelAuthor": "5860AF129980B0E932F3509432A0C43DEAB77B0B",
      "private": 0,
      "agreementName": "Drone Lease Agreement",
      "attachmentsFileReference": "eyJTcG...iVmVyc2lvbiI6MH0=",
      "maxNumberOfAttachments": 10,
      "data": [
        {
          "dataMappingId": "readName",
          "dataPath": "name"
          "dataStorageId": ""
          "value": "John Doe",
          "dataType": 2,
          "parameterType": 1,
          "direction": 0
        },
        {
          "dataMappingId": "readApproved",
          "dataPath": "approved"
          "value": true,
          "dataType": 1,
          "parameterType": 0,
          "direction": 0
        },
        {
          "dataMappingId": "writeName",
          "dataPath": "name"
          "dataStorageId": ""
          "dataType": 2,
          "parameterType": 1,
          "direction": 1
        },
        {
          "dataMappingId": "writeApproved",
          "dataPath": "approved"
          "dataStorageId": ""
          "dataType": 1,
          "parameterType": 0,
          "direction": 1
        }
      ]
    }
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.get('/bpm/activity-instances/:id', middleware, getActivityInstance, sendResponse);

  /**
   * @api {get} /activity-instances/:activityInstanceId/data-mappings Read data mappings of activity instance
   * @apiName ReadActivityInstanceDataMappings
   * @apiGroup BPMRuntime
   *
   * @apiDescription Retrieve details of the data mappings for the specified activity instance
   *
   * @apiExample {curl} Simple:
   *     curl -i /activity-instances/41ED431B140790B2462D8CC683C87FEA2F1DE321/data-mappings
   *
   * @apiSuccess {Object[]} object Array of data mapping objects
   * @apiSuccessExample {json} Success Object
    [{
      "dataMappingId": "readApproved",
      "dataPath": "approved"
      "value": true,
      "dataType": 1,
      "parameterType": 0,
      "direction": 0
    }]
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.get('/bpm/activity-instances/:activityInstanceId/data-mappings', middleware, getDataMappings, sendResponse);

  /**
   * @api {get} /activity-instances/:activityInstanceId/data-mappings/:dataMappingId Read single data mapping of an activity instance
   * @apiName ReadActivityInstanceDataMapping
   * @apiGroup BPMRuntime
   *
   * @apiDescription Retrieve details of the data mapping with the given ID for the specified activity instance
   *
   * @apiExample {curl} Simple:
   *     curl -i /activity-instances/150E9377C388CF1B76E508642646F6DFACA67D53B82A0C3F479C12610FA29BCB/data-mappings/readApproved
   *
   * @apiSuccess {Object} object Data mapping objects
   * @apiSuccessExample {json} Success Object
    {
      "dataMappingId": "readApproved",
      "dataPath": "approved"
      "value": true,
      "dataType": 1,
      "parameterType": 0,
      "direction": 0
    }
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.get('/bpm/activity-instances/:activityInstanceId/data-mappings/:dataMappingId', middleware, getDataMappings, sendResponse);

  /**
   * @api {get} /activity-instances/:activityInstanceId/data-mappings Write data mappings of activity instance
   * @apiName WriteActivityInstanceDataMappings
   * @apiGroup BPMRuntime
   *
   * @apiDescription Write to data mappings for the specified activity instance
   *
   * @apiExample {curl} Simple:
   *     curl -i /activity-instances/150E9377C388CF1B76E508642646F6DFACA67D53B82A0C3F479C12610FA29BCB/data-mappings
   *
   * @apiParamExample {json} Sample request body with data mapping id/value pairs in an array
    [{
        "id": "writeApproved",
        "value": true,
        "dataType": 1
      },
      {
        "id": "writeName",
        "value": "John Doe",
        "dataType": 2
      }
    ]
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.put('/bpm/activity-instances/:activityInstanceId/data-mappings', middleware, setDataMappings, sendResponse);

  /**
   * @api {get} /activity-instances/:activityInstanceId/data-mappings/:dataMappingId Write single data mapping of an activity instance
   * @apiName WriteActivityInstanceDataMapping
   * @apiGroup BPMRuntime
   *
   * @apiDescription Write to the data mapping with the given ID for the specified activity instance
   *
   * @apiExample {curl} Simple:
   *     curl -i /activity-instances/150E9377C388CF1B76E508642646F6DFACA67D53B82A0C3F479C12610FA29BCB/data-mappings/writeApproved
   *
   * @apiParamExample {json} Sample request body with data mapping value
    {
      "value": true,
      "dataType": 1
    }
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.put('/bpm/activity-instances/:activityInstanceId/data-mappings/:dataMappingId', middleware, setDataMappings, sendResponse);

  /**
   * @api {get} /tasks Read Tasks
   * @apiName ReadTasks
   * @apiGroup BPMRuntime
   *
   * @apiDescription Retrieves an array of tasks assigned to the logged in user
   *
   * @apiExample {curl} Simple:
   *     curl -i /tasks
   *
   * @apiSuccess {Object[]} object Array of task objects
   * @apiSuccessExample {json} Success Objects Array
    [{
      "state": 4,
      "processAddress": "A65B3111789E4355EA03E0F109FBDD0042133307",
      "activityInstanceId": "A2A9736AEEC9B1DCAA274DEBF76248EA57ABA0727BDE343C2CDE663FC48E2BF4",
      "activityId": "Task_5ERV12I",
      "created": 1533736147000,
      "performer": "5860AF129980B0E932F3509432A0C43DEAB77B0B",
      "processName": "Process Name",
      "processDefinitionAddress": "833E7452A7D1B02655889AC52F745FD1D5C50AAC",
      "agreementAddress": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1",
      "agreementName": "Drone Purchase Agreement"
    }]
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  *
  */
  app.get('/tasks', middleware, getTasksForUser, sendResponse);

  /**
   * @api {put} /tasks/:activityInstanceId/complete Complete task identified by the activityInstanceId
   * @apiName CompleteTask
   * @apiGroup BPMRuntime
   *
   * @apiDescription Completes the activity identified by the activityInstanceId. Optionally accepts 'data' array to write.
   *
   * @apiParam {String} activityInstanceId The system generated id of the activity instance
   *
   * @apiExample {curl} Simple:
   *     curl -i /task/:activityInstanceId/complete
   *
   * @apiParam {json} Optional request body with out data
    {
      data: [{
        "id": "writeApproved",
        "value": true,
        "dataType": 1,
      }]
    }
  *
  */
  app.put('/tasks/:activityInstanceId/complete', middleware, completeActivity, sendResponse);

  /**
   * @api {put} /tasks/:activityInstanceId/complete/:agreementAddress/sign Sign the agreement and complete the activity
   * @apiName CompleteTask
   * @apiGroup Runtime
   *
   * @apiDescription Signs the agreement at the given address and then completes the activity
   * identified by the activityInstanceId.
   *
   * @apiParam {String} activityInstanceId The system generated id of the activity instance
   * @apiParam {String} agreementAddress The address of the agreement
   *
   * @apiExample {curl} Simple:
   *     curl -i /tasks/:activityInstanceId/complete/:agreementAddress/sign
   *
   */
  app.put('/tasks/:activityInstanceId/complete/:agreementAddress/sign', middleware, signAndCompleteActivity, sendResponse);
};
