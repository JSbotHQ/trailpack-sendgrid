const joi = require('joi')

module.exports = joi.object().keys({
  from: joi.string().email().required(),
  to: [joi.string().email().required()],
  subject: joi.string(),
  text: joi.string(),
  html: joi.string(),
  content_type: joi.string()
})
