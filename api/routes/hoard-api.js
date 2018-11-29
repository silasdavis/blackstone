const multer = require('multer');
const upload = multer();
const { createHoard, getHoard } = require(`${global.__controllers}/hoard-controller`);

const { ensureAuth } = require(`${global.__common}/middleware`);

// APIs defined according to specification found here -> http://apidocjs.com
module.exports = (app) => {
  /* **************
   * Content
   ************** */

  /**
  * @api {get} /hoard Read Content Object
  * @apiName ReadContent
  * @apiGroup Content
  *
  * @apiExample {curl} Simple:
  *     curl -i /hoard
  *
  */
  app.get('/hoard', getHoard);

  /**
  * @api {post} /hoard Read Content Object
  * @apiName ReadContent
  * @apiGroup Content
  *
  * @apiExample {curl} Simple:
  *     curl -iX POST /hoard
  *
  * @apiUse NotLoggedIn
  * @apiUse AuthTokenRequired
  */
  app.post('/hoard', ensureAuth, upload.any(), createHoard);
};
