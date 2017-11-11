'use strict'

const Trailpack = require('trailpack')
const sendGrid = require('sendgrid')
const lib = require('./lib')
const _ = require('lodash')

module.exports = class SendgridTrailpack extends Trailpack {

  /**
   * validate spp configuration
   */
  validate () {
    if (!this.app.config.sendgrid) {
      return Promise.reject(new Error('There not config.sendgrid !'))
    }

    if (!_.isFunction(this.app.config.sendgrid)) {
      return Promise.reject(new Error('config.sendgrid is not a function !'))
    }

    if (!this.app.config.sendgrid.apiKey){
      return Promise.reject(new Error('config.sendgrid apikey is not available !'))
    }

    return Promise.resolve()
  }

  /**
   * configure sendgrid document method
   */
  configure () {

    console.log('My Trailpack is configured')
    this.app.config.sendgrid = sendGrid(this.app.config.sendgrid.apiKey)
  }

  /**
   * initialize sendgrid
   */
  initialize () {

    this.app.log.info('My Trailpack is initialized')
    return Promise.resolve()
  }

  /**
   * Send Mail
   */
  sendMail (message){
    return Promise.all([
      lib.Mail.validateMail(message), // validate email
      lib.Mail.sendMail(this.app,message) // send email
    ])
  }

  constructor (app) {
    console.log('constructor called trailpack-sendgrid',app)
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

