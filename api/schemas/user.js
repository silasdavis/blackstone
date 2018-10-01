const Joi = require('joi');

/*

sample user:
{
  username: 'username',
  email: 'myemail@company.com',
  password: 'hello1234',
}
*/

const userSchema = Joi.object().keys({
  username: Joi.string()
    .max(20, 'utf8')
    .lowercase()
    .regex(/^[a-zA-Z0-9-_.]+$/)
    .required(),
  email: Joi.string()
    .email()
    .lowercase()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
  confirmPassword: Joi.string().allow(null),
  isProducer: Joi.boolean().default(false),
});

module.exports = userSchema;
