/**
 * Trailpack Configuration
 *
 * @see {@link http://trailsjs.io/doc/trailpack/config
 */
module.exports = {
  type: 'misc',
  /**
   * Configure the lifecycle of this pack; that is, how it boots up, and which
   * order it loads relative to other trailpacks.
   */
  lifecycle: {
    configure: {
      /**
       * List of events that must be fired before the configure lifecycle
       * method is invoked on this Trailpack
       */
      listen: ['trailpack:router:initialized'],

      /**
       * List of events emitted by the configure lifecycle method
       */
      emit: []
    },
    initialize: {
      listen: [],
      emit: []
    }
  }
}

