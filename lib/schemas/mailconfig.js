const Joi = require('joi')

module.exports = Joi.object().keys({
  from: Joi.string().email().required(),
  to: [Joi.string().email().required()],
  subject: Joi.string(),
  text: Joi.string(),
  html: Joi.string(),
  content_type: Joi.string()
})
