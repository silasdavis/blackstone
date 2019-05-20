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
   * @swagger
   *
   * /activity-instances:
   *   get:
   *     tags:
   *       - "BPM Runtime"
   *     description: Get all activities of a process instance
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: processInstance
   *         description: Optional Address of process instance to filter by
   *         in: query
   *         type: string
   *       - name: agreementAddress
   *         description: Optional Address of process instance to filter by
   *         in: query
   *         type: string
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               processAddress:
   *                 type: string
   *               activityInstanceId:
   *                 type: string
   *               activityId:
   *                 type: string
   *               created:
   *                 type: string
   *               completed:
   *                 type: boolean
   *               performer:
   *                 type: string
   *               completedBy:
   *                 type: string
   *               state:
   *                 type: number
   *               agreementAddress:
   *                 type: string
   *               agreementName:
   *                 type: string
   *               processDefinitionAddress:
   *                 type: string
   *               processName:
   *                 type: string
   * 
   */
  app.get('/bpm/activity-instances', middleware, getActivityInstances, sendResponse);

  /**
   * @swagger
   *
   * /activity-instances/{id}:
   *   get:
   *     tags:
   *       - "BPM Runtime"
   *     description: Get details of the specified activity instance
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: activity instance ID
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Activity instance object
   *         schema:
   *           type: object
   *           properties:
   *             state:
   *               type: number
   *             processAddress:
   *               type: string
   *             activityInstanceId:
   *               type: string
   *             created:
   *               type: string
   *             completed:
   *               type: number
   *             taskType:
   *               type: number
   *             application:
   *               type: string
   *             applicationType:
   *               type: number
   *             webForm:
   *               type: string
   *             processName:
   *               type: string
   *             processDefinitionAddress:
   *               type: string
   *             agreementAddress:
   *               type: string
   *             modelAuthor:
   *               type: string
   *             private:
   *               type: number
   *             agreementName:
   *               type: string
   *             attachmentsFileReference:
   *               type: string
   *             maxNumberOfAttachments:
   *               type: number
   *             data:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   dataMappingId:
   *                     type: string
   *                   dataPath:
   *                     type: string
   *                   dataStorageId:
   *                     type: string
   *                   value:
   *                     type: boolean
   *                   dataType:
   *                     type: number
   *                   parameterType:
   *                     type: number
   *                   direction:
   *                     type: number
   * 
   */
  app.get('/bpm/activity-instances/:id', middleware, getActivityInstance, sendResponse);

  /**
   * @swagger
   *
   * /activity-instances/{activityInstanceId}/data-mappings:
   *   get:
   *     tags:
   *       - "BPM Runtime"
   *     description: Get details of the data mappings for the specified activity instance
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: activityInstanceId
   *         description: activity instance ID
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             object:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   dataMappingId:
   *                     type: string
   *                   dataPath:
   *                     type: string
   *                   dataStorageId:
   *                     type: string
   *                   value:
   *                     type: boolean
   *                   dataType:
   *                     type: number
   *                   parameterType:
   *                     type: number
   *                   direction:
   *                     type: number
   *               description: Array of data mapping objects
   * 
   */
  app.get('/bpm/activity-instances/:activityInstanceId/data-mappings', middleware, getDataMappings, sendResponse);

  /**
   * @swagger
   *
   * /activity-instances/{activityInstanceId}/data-mappings/{dataMappingId}:
   *   get:
   *     tags:
   *       - BPM Runtime
   *     description: >-
   *       Get details of the data mapping with the given ID for the specified activity
   *       instance.
   *     produces:
   *       - application/json
   *       - text/plain
   *     parameters:
   *       - name: activityInstanceId
   *         description: activity instance ID
   *         in: path
   *         required: true
   *         type: string
   *       - name: dataMappingId
   *         description: data mapping ID
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             dataMappingId:
   *               type: string
   *             dataPath:
   *               type: string
   *             dataStorageId:
   *               type: string
   *             value:
   *               type: boolean
   *             dataType:
   *               type: number
   *             parameterType:
   *               type: number
   *             direction:
   *               type: number
   * 
   */
  app.get('/bpm/activity-instances/:activityInstanceId/data-mappings/:dataMappingId', middleware, getDataMappings, sendResponse);

  /**
   * @swagger
   *
   * /activity-instances/{activityInstanceId}/data-mappings:
   *   get:
   *     tags:
   *       - "BPM Runtime"
   *     description: Get data mappings for the specified activity instance.
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: body
   *         description: Update User Profile of currently logged in user
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             id:
   *               type: string
   *             value:
   *               type: boolean
   *             dataType:
   *               type: number
   *       - name: activityInstanceId
   *         description: activity instance ID
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Write data mappings of activity instance
   *         schema:
   *           type: string
   * 
   */
  app.put('/bpm/activity-instances/:activityInstanceId/data-mappings', middleware, setDataMappings, sendResponse);

  /**
   * @swagger
   *
   * /activity-instances/{activityInstanceId}/data-mappings/{dataMappingId}:
   *   get:
   *     tags:
   *       - "BPM Runtime"
   *     description: Get the data mapping with the given ID for the specified activity instance.
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: body
   *         description: Update User Profile of currently logged in user
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             value:
   *               type: boolean
   *             dataType:
   *               type: number
   *       - name: activityInstanceId
   *         description: activity instance ID
   *         in: path
   *         required: true
   *         type: string
   *       - name: dataMappingId
   *         description: data mapping ID
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Write single data mapping of an activity instance
   *         schema:
   *           type: string
   * 
   */
  app.put('/bpm/activity-instances/:activityInstanceId/data-mappings/:dataMappingId', middleware, setDataMappings, sendResponse);

  /**
   * @swagger
   *
   * /tasks:
   *   get:
   *     tags:
   *       - "BPM Runtime"
   *     description: Get an array of tasks assigned to the logged in user.
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
   *               processAddress:
   *                 type: string
   *               activityInstanceId:
   *                 type: string
   *               activityId:
   *                 type: string
   *               created:
   *                 type: string
   *               completed:
   *                 type: boolean
   *               performer:
   *                 type: string
   *               completedBy:
   *                 type: string
   *               state:
   *                 type: number
   *               agreementAddress:
   *                 type: string
   *               agreementName:
   *                 type: string
   *               processDefinitionAddress:
   *                 type: string
   *               processName:
   *                 type: string
   * 
   */
  app.get('/tasks', middleware, getTasksForUser, sendResponse);

  /**
   * @swagger
   *
   * '/tasks/{activityInstanceId}/complete':
   *   put:
   *     tags:
   *       - "BPM Runtime"
   *     description: >-
   *       Completes the activity identified by the activityInstanceId. Optionally accepts
   *       'data' array to write.
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: body
   *         description: Update User Profile of currently logged in user
   *         in: body
   *         required: false
   *         schema:
   *           type: object
   *           properties:
   *             id:
   *               type: string
   *             value:
   *               type: boolean
   *             dataType:
   *               type: number
   *       - name: activityInstanceId
   *         description: The system generated id of the activity instance
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Complete task identified by the activityInstanceId
   *         schema:
   *           type: string
   * 
   */
  app.put('/tasks/:activityInstanceId/complete', middleware, completeActivity, sendResponse);

  /**
   * @swagger
   *
   * /tasks/{activityInstanceId}/complete/{agreementAddress}/sign:
   *   put:
   *     tags:
   *       - "BPM Runtime"
   *     description: |-
   *       Create the agreement at the given address and then completes the activity
   *       identified by the activityInstanceId.
   *     produces:
   *       - text/plain
   *     parameters:
   *       - name: activityInstanceId
   *         description: The system generated id of the activity instance
   *         in: path
   *         required: true
   *         type: string
   *       - name: agreementAddress
   *         description: The address of the agreement
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: Sign the agreement and complete the activity
   *         schema:
   *           type: string
   * 
   */
  app.put('/tasks/:activityInstanceId/complete/:agreementAddress/sign', middleware, signAndCompleteActivity, sendResponse);
};
