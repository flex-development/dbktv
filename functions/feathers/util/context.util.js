// Packages
const { BadRequest } = require('@feathersjs/errors')

/**
 * @file Feathers Context utilities
 * @module utilities/context
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

module.exports = {
  /**
   * This function logs the provided message if the current Node environment is
   * development or test.
   *
   * @param {feathers.Context} context - Feathers context object
   * @param {string} message - Message to log based on Node environment
   * @returns {feathers.Context}
   */
  log_based_on_env: (context, message) => {
    const { data, id, params, result } = context

    if (!['staging, production'].includes(process.env.NODE_ENV)) {
      console.info(message, result || { data, id, params })
    }

    return context
  },

  /**
   * Logs a new service method request.
   *
   * @async
   * @param {Feathers.Context} context - Feathers context object
   * @returns {Feathers.Context} Feathers context object
   * @throws {BadRequest}
   */
  log_request: async context => {
    if (!context) throw new BadRequest('Feathers context is required.')

    const { data, id, params, path, method } = context

    console.info(`New ${method} request on path /${path} ->`, {
      data: data || null, id: id || null, query: params.query || null
    })
  },

  /**
   * Logs a new service method success.
   *
   * @async
   * @param {Feathers.Context} context - Feathers context object
   * @param {Function} report - If defined, report will attempted to be sent
   * @returns {Feathers.Context} Feathers context object
   * @throws {BadRequest}
   */
  log_success: async (context, report) => {
    if (!context) throw new BadRequest('Feathers context is required.')

    const { path, method, result } = context

    console.info(`New ${method} success on path /${path} ->`, result)

    try {
      if (report) await report()
      return context
    } catch (err) {
      console.error('Reporting error ->', err)
    }
  }
}
