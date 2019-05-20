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

  /* *********
   * BPM Model
   ********* */

  /**
   * @swagger
   *
   * /bpm/process-models:
   *   get:
   *     tags:
   *       - "BPM Model"
   *     description: Read Process Models
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
   *               modelAddress:
   *                 type: string
   *               id:
   *                 type: string
   *               name:
   *                 type: string
   *               versionMajor:
   *                 type: number
   *               versionMinor:
   *                 type: number
   *               versionPatch:
   *                 type: number
   *               active:
   *                 type: boolean
   * 
   */
  app.get('/bpm/process-models', middleware, getModels, sendResponse);

  /**
   * @swagger
   *
   * /bpm/process-models/{address}/diagram:
   *   get:
   *     tags:
   *       - "BPM Model"
   *     description: >-
   *       the diagram of the specified process model in the requested MIME type.
   * 
   *       The 'Accept' header in the request should be set to either
   *       'application/xml' or 'application/json'.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: address
   *         description: The address of the process model
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             model:
   *               type: object
   *               description: with details of the model and processes belonging to it
   *               properties:
   *                 name:
   *                   type: string
   *                 id:
   *                   type: string
   *                 version:
   *                   type: array
   *                   items:
   *                     type: number
   *                 private:
   *                   type: boolean
   *                 dataStores:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       dataStorage:
   *                         type: string
   *                       dataPath:
   *                         type: string
   *                       parameterType:
   *                         type: number
   *             processes:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   name:
   *                     type: string
   *                   interface:
   *                     type: string
   *                   participants:
   *                     type: array
   *                     items:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: string
   *                         name:
   *                           type: string
   *                         tasks:
   *                           type: array
   *                           items:
   *                             type: string
   *                         conditionalPerformer:
   *                           type: boolean
   *                         dataStorageId:
   *                           type: string
   *                         dataPath:
   *                           type: string
   *                   tasks:
   *                     type: array
   *                     items:
   *                       type: string
   *                   userTasks:
   *                     type: array
   *                     items:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: string
   *                         name:
   *                           type: string
   *                         assignee:
   *                           type: string
   *                         activityType:
   *                           type: number
   *                         taskType:
   *                           type: number
   *                         behavior:
   *                           type: number
   *                         multiInstance:
   *                           type: boolean
   *                         application:
   *                           type: string
   *                         subProcessModelId:
   *                           type: string
   *                         subProcessDefinitionId:
   *                           type: string
   *                   sendTasks:
   *                     type: array
   *                     items:
   *                       type: string
   *                   receiveTasks:
   *                     type: array
   *                     items:
   *                       type: string
   *                   serviceTasks:
   *                     type: array
   *                     items:
   *                       type: string
   *                   transitions:
   *                     type: array
   *                     items:
   *                       type: string
   * 
   */
  app.get('/bpm/process-models/:address/diagram', middleware, getModelDiagram, sendResponse);

  /**
   * @swagger
   *
   * /bpm/process-models:
   *   post:
   *     tags:
   *       - "BPM Model"
   *     description: >-
   *       XML needs to be passed in the request body as plain text or
   *       application/xml
   *     consumes:
   *       - multipart/form-data
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: format
   *         description: >-
   *           Optional parameter to denote format of process model.
   * 
   *           Defaults to `bpmn` which is also the only format that is supported at
   *           this time.
   *         in: query
   *         type: string
   *       - name: upFile
   *         description: XML file
   *         in: formData
   *         type: file
   *     responses:
   *       '200':
   *         description: details, process details, and parsed diagram
   *         schema:
   *           type: object
   *           properties:
   *             model:
   *               type: object
   *               description: with details of the model and processes belonging to it
   *               properties:
   *                 id:
   *                   type: string
   *                 address:
   *                   type: string
   *             processes:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   address:
   *                     type: string
   *                   processDefinitionId:
   *                     type: string
   *                   interfaceId:
   *                     type: string
   *                   processName:
   *                     type: string
   *                   modelAddress:
   *                     type: string
   *                   private:
   *                     type: boolean
   *                   author:
   *                     type: string
   *             parsedDiagram:
   *               type: object
   *               properties:
   *                 model:
   *                   type: object
   *                   properties:
   *                     dataStores:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: string
   *                           name:
   *                             type: string
   *                           parameters:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 name:
   *                                   type: string
   *                                 parameterType:
   *                                   type: number
   *                     name:
   *                       type: string
   *                     id:
   *                       type: string
   *                     version:
   *                       type: array
   *                       items:
   *                         type: number
   *                     private:
   *                       type: boolean
   *                     author:
   *                       type: string
   *                 processes:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: string
   *                       name:
   *                         type: string
   *                       interface:
   *                         type: string
   *                       participants:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             id:
   *                               type: string
   *                             name:
   *                               type: string
   *                             tasks:
   *                               type: array
   *                               items:
   *                                 type: string
   *                             conditionalPerformer:
   *                               type: boolean
   *                             dataStorageId:
   *                               type: string
   *                             dataPath:
   *                               type: string
   *                       tasks:
   *                         type: array
   *                         items:
   *                           type: string
   *                       userTasks:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             id:
   *                               type: string
   *                             name:
   *                               type: string
   *                             assignee:
   *                               type: string
   *                             activityType:
   *                               type: number
   *                             taskType:
   *                               type: number
   *                             behavior:
   *                               type: number
   *                             multiInstance:
   *                               type: boolean
   *                             application:
   *                               type: string
   *                             subProcessModelId:
   *                               type: string
   *                             subProcessDefinitionId:
   *                               type: string
   *                             dataMappings:
   *                               type: array
   *                               items:
   *                                 type: object
   *                                 properties:
   *                                   id:
   *                                     type: string
   *                                   direction:
   *                                     type: number
   *                                   dataPath:
   *                                     type: string
   *                                   dataStorageId:
   *                                     type: string
   *                       sendTasks:
   *                         type: array
   *                         items:
   *                           type: string
   *                       receiveTasks:
   *                         type: array
   *                         items:
   *                           type: string
   *                       serviceTasks:
   *                         type: array
   *                         items:
   *                           type: string
   *                       transitions:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             id:
   *                               type: string
   *                             source:
   *                               type: string
   *                             target:
   *                               type: string
   *                       activityMap:
   *                         type: object
   * 
   */
  app.post('/bpm/process-models', middleware, createModelFromBpmn, sendResponse);

  /**
   * @swagger
   *
   * /bpm/applications:
   *   get:
   *     tags:
   *       - "BPM Model"
   *     description: Read Applications
   *     produces:
   *       - application/json
   *     parameters: []
   *     responses:
   *       '200':
   *         description: object
   *         schema:
   *           type: array
   *           items:
   *             properties:
   *               id:
   *                 type: string
   *               applicationType:
   *                 type: integer
   *               location:
   *                 type: string
   *               webForm:
   *                 type: string
   *               accessPoints:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     accessPoints:
   *                       type: string
   *                     direction:
   *                       type: number
   *                     dataType:
   *                       type: number
   * 
   */
  app.get('/bpm/applications', middleware, getApplications, sendResponse);

  /**
   * @swagger
   *
   * /bpm/process-definitions:
   *   get:
   *     tags:
   *       - "BPM Model"
   *     description: Read All Process Definitions
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: interfaceId
   *         description: >-
   *           Optional query parameter `interfaceId` can be used to filter by
   *           interface
   *         in: query
   *         type: string
   *       - name: processDefinitionId
   *         description: >-
   *           Optional query parameter `processDefinitionId` can be used to filter
   *           by processDefinitionId
   *         in: query
   *         type: string
   *       - name: modelId
   *         description: Optional query parameter `modelId` can be used to filter by modelId
   *         in: query
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
   *                   processDefinitionId:
   *                     type: string
   *                   address:
   *                     type: string
   *                   modelAddress:
   *                     type: string
   *                   interfaceId:
   *                     type: string
   *                   modelFileReference:
   *                     type: string
   *                   isPrivate:
   *                     type: boolean
   *                   author:
   *                     type: string
   *                   modelId:
   *                     type: string
   *                   processName:
   *                     type: string
   *               description: Process Definition object
   * 
   */
  app.get('/bpm/process-definitions', middleware, getDefinitions, sendResponse);

  /**
   * @swagger
   *
   * '/bpm/process-definitions/{address}':
   *   get:
   *     tags:
   *       - BPM Model
   *     description: Read Single Process Definition
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: address
   *         description: The address of the process definition
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         description: json
   *         schema:
   *           type: object
   *           properties:
   *             processDefinitionId:
   *               type: string
   *               description: Id of the process definition
   *             address:
   *               type: string
   *               description: Address of the process definition
   *             modelAddress:
   *               type: string
   *               description: Address of the model the process definition was created under
   *             interfaceId:
   *               type: string
   *               description: '''Agreement Formation'' or ''Agreement Execution'''
   *             modelFileReference:
   *               type: string
   *               description: Hoard grant for the xml file representing the process
   *             isPrivate:
   *               type: string
   *               description: Whether model is private
   *             author:
   *               type: string
   *               description: Address of the model author
   *             modelId:
   *               type: string
   *               description: Id of the process model
   *             processName:
   *               type: string
   *               description: Human-readable name of the process definition
   * 
   */
  app.get('/bpm/process-definitions/:address', middleware, getDefinition, sendResponse);
};
