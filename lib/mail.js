'use strict'

const joi = require('joi')
const schemas = require('./schemas')
const _ = require('lodash')

module.exports = {

  /**Validate email options using joi
   *
   * @param options
   * @returns {Promise}
   */
  validateMail(options) {

    let keys = ['from', 'to','name', 'subject', 'text', 'html', 'content_type','template_id','dynamic_template_data']
    return new Promise((resolve, reject) => {

      options = _.omitBy(options, (val, key) => {
        return !_.includes(keys, key)
      });

      if (!options.text && !options.html)
        return reject(new TypeError('config.mail: ' + ' text or html is missing'))

      joi.validate(options, schemas.mailConfig, (err, value) => {
        if (err) return reject(new TypeError('config.mail: ' + err))

        return resolve(value)
      })
    })
  },

  /**
   * Send Mail using sendGrid service
   * @param app
   * @param message
   * @returns {Promise.<TResult>}
   */
  sendMail(app, message) {
    let { 'sendgrid': sg } = app.sendgrid
    let personalization = {
      to: message.to,
      subject: message.subject
    }

    let from = {
      email: message.from
    }

    if(message.name) from.name = message.name

    let body = {
      from,
      content: [
        {
          type: message.content_type || 'text/plain',
          value: message.text || message.html
        }
      ]
    }

    if(message.template_id){
      body.template_id = message.template_id

      if(message.dynamic_template_data){
        personalization.dynamic_template_data = message.dynamic_template_data
      }
    }
    body.personalizations=[personalization]

    // make email request
    let request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body
    })

    // With promise
    return sg.API(request)
      .then(function (response) {
        //console.log(response)
        return Promise.resolve(response)
      })
      .catch(function (error) {
        return Promise.reject(error)
      });
  }
}
