// Packages
import {
  BadGateway, BadRequest, Conflict, Forbidden, GeneralError, LengthRequired, NotAuthenticated, NotFound, NotImplemented, PaymentError, MethodNotAllowed, NotAcceptable, Timeout, TooManyRequests, Unavailable, Unprocessable
} from '@feathersjs/errors'

/**
 * @file Error utility functions
 * @todo Update documentation
 * @module utils/error
 */

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
export const feathers = (error, data, status = 500) => {
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
}

export const intercept = error => {
  const { config, message, request, response } = error
  let err = null

  if (response) {
    const { config, data, status } = response
    err = feathers(message, { status, errors: { config, data } }, status)
  } else if (request) {
    err = feathers(message, { errors: { request } })
  } else {
    err = feathers(message, { config })
  }

  throw err
}
