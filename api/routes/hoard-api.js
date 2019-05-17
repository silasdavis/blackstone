const multer = require('multer');
const upload = multer();
const { hoardPutApiHandler, hoardGetApiHandler } = require(`${global.__controllers}/hoard-controller`);

const { ensureAuth } = require(`${global.__common}/middleware`);

// APIs defined according to specification found here -> http://apidocjs.com
module.exports = (app, customMiddleware) => {
  // Use custom middleware if passed, otherwise use plain old ensureAuth
  const middleware = customMiddleware || ensureAuth;

  /* **************
   * Content
   ************** */

  /**
   * @swagger
   *
   * /hoard:
   *   get:
   *     tags:
   *       - "Content"
   *     description: Read Content Object
   *     produces:
   *       - text/plain
   *     parameters: []
   *     responses:
   *       '200':
   *         description: Read Content Object
   *         schema:
   *           type: string
   * 
   */
  app.get('/hoard', hoardGetApiHandler);

  /**
   * @swagger
   *
   * /hoard:
   *   post:
   *     tags:
   *       - "Content"
   *     description: Create Content Object
   *     produces:
   *       - text/plain
   *     parameters: []
   *     responses:
   *       '200':
   *         description: Create Content Object
   *         schema:
   *           type: string
   * 
   */
  app.post('/hoard', middleware, upload.any(), hoardPutApiHandler);
};
