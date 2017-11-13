'use strict'

const Trailpack = require('trailpack')
const sendGrid = require('sendgrid')
const lib = require('./lib')
const _ = require('lodash')

module.exports = class Sendgrid extends Trailpack {

  /**
   * validate spp configuration
   */
  validate() {
    if (!this.app.config.sendgrid) {
      return Promise.reject(new Error('There not config.sendgrid !'))
    }

    if (_.isFunction(this.app.config.sendgrid)) {
      return Promise.reject(new Error('config.sendgrid is not a function !'))
    }

    if (!this.app.config.sendgrid.apiKey) {
      return Promise.reject(new Error('config.sendgrid apikey is not available !'))
    }

    return Promise.resolve()
  }

  /*/**
   * configure sendgrid document method
   */
  configure() {

    console.log('My Trailpack is configured')
    this.sendgrid = sendGrid(this.app.config.sendgrid.apiKey)
    this.app.sendgrid = this
    return Promise.resolve()
  }

  /**Send Mail
   *
   * @param message
   * @returns {Promise.<*[]>}
   */
  sendMail(message) {
    if (_.isEmpty(message))
      return Promise.reject(new Error('Invalid message, parameter missing!'))

   // validate email
   return lib.Mail
     .validateMail(message)
      .then(msg=>{

        // send email
        return lib.Mail
          .sendMail(this.app, msg)
          .then(email=>{
            return Promise.resolve(email)
          })
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  }

  /**
   * initialize sendgrid
   */
  initialize() {
    return Promise.resolve()
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

