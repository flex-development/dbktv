// Packages
import {
  BadGateway, BadRequest, Conflict, Forbidden, GeneralError, LengthRequired, NotAuthenticated, NotFound, NotImplemented, PaymentError, MethodNotAllowed, NotAcceptable, Timeout, TooManyRequests, Unavailable, Unprocessable
} from '@feathersjs/errors'

/**
 * @file Error utility functions
 * @module utilities/error
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

export default {
  /**
   * Creates a new Feathers error based on the status argument.
   *
   * @param {Error | string} error - Error to transform or error message
   * @param {object} data - Additional error data
   * @param {object} data.errors - Typically validation errors or if you want to
   * group multiple errors together
   * @param {number} status - Error status code. Defaults to 500
   * @returns {FeathersError} Feathers error based on the status argument
   * @throws {BadRequest} If error is incorrect type
   */
  feathers_error: (error, data, status = 500) => {
    if (!error) {
      throw new BadRequest('Error argument is required.')
    }

    switch (status) {
      case 400:
        return new BadRequest(error, data)
      case 401:
        return new NotAuthenticated(error, data)
      case 402:
        return new PaymentError(error, data)
      case 403:
        return new Forbidden(error, data)
      case 404:
        return new NotFound(error, data)
      case 405:
        return new MethodNotAllowed(error, data)
      case 406:
        return new NotAcceptable(error, data)
      case 408:
        return new Timeout(error, data)
      case 409:
        return new Conflict(error, data)
      case 411:
        return new LengthRequired(error, data)
      case 422:
        return new Unprocessable(error, data)
      case 429:
        return new TooManyRequests(error, data)
      case 501:
        return new NotImplemented(error, data)
      case 502:
        return new BadGateway(error, data)
      case 503:
        return new Unavailable(error, data)
      default:
        return new GeneralError(error, data)
    }
  },

  /**
   * Transform a Joi schema error to a Feathers error.
   *
   * @param {string} message - Error message
   * @param {Error[]} errors - Array of Joi errors
   * @param {boolean} auth - True if error should be type NotAuthenticated
   * @returns {BadRequest | NotAuthenticated}
   */
  get_model_error: (message, errors, auth = false) => {
    const { key, value } = errors[0].context
    const e = {}
    e[key] = value

    if (auth) return new NotAuthenticated(message, { errors: { ...e } })
    return new BadRequest(message, { errors: { ...e } })
  },

  /**
   * Returns an object containing the name of the function, and the arguments
   * passed in. Meant to be used with a Feathers service method.
   *
   * @param {string} name - Function name
   * @param {object} param1 - Service method arguments
   */
  method_preview: (name, { id, data, params }) => {
    return { name, arguments: { id, data, params } }
  },

  /**
   * Handles a service method error.
   *
   * @todo Implement error reporting. If report is true, an error will be thrown
   * @param {Feathers.Context} context - Feathers context object
   * @param {boolean} report - If true, send error report. Defaults to false
   * @returns {Feathers.Context} Feathers context object
   * @throws {BadRequest | NotImplemented} If missing context
   */
  service_error: async (context, report = false) => {
    if (!context) throw new BadRequest('Feathers context is required.')

    if (context.error.name === 'Error') {
      let { message, data, errors } = context.error
      context.error = new BadRequest(message.includes('data object must be provided') ? 'Payload required.' : message, { data, errors })
    }

    const { name, message, code, className, data, errors } = context.error

    console.error(`${name} error on path /${context.path}: ${message} ->`, {
      code, name, message, className, data, errors
    })

    if (report) {
      // TODO: Send error report to error service
      throw new NotImplemented('Error reporting in progress.')
    }

    return context
  }
}
