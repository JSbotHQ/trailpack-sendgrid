'use strict'

const joi = require('joi')
const schemas = require('./schemas')

module.exports = {

  /**
   * Validate email options using sendGrid
   * @param options
   * @returns {Promise}
   */
  validateMail(options){

    return new Promise((resolve, reject) => {
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
  sendMail(app,message) {
    let sg = app.config.sendgrid

    // make email request
    let request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: {
        personalizations: [
          {
            to: message.to,
            subject: message.subject
          }
        ],
        from: {
          email: message.from
        },
        content: [
          {
            type: message.content_type || 'text/plain',
            value: message.text || message.html
          }
        ]
      }
    })

    // With promise
    return sg.API(request)
      .then(function (response) {
        console.log(response)
        return response
      })
      .catch(function (error) {
        return error
      });
  }
}
