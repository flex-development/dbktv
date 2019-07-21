// Packages
import { GeneralError } from '@feathersjs/errors'

/**
 * @file Global utility functions
 * @module utilities/app
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

export default {
  /**
   * Every @see @param lap, the function identified by @see @param start will be
   * executed. If @see @param interval is defined, the interval associated with
   * the id will be cleared.
   *
   * @param {Function} start - A function to be executed every @see @param lap
   * milliseconds. The function is not passed any parameters, and no return
   * value is expected.
   * @param {string} interval - If defined, the interval associated with the id
   * will be cleared
   * @param {string} lap - The time, in milliseconds the timer should delay in
   * between executions @see @param start
   * @returns {string | undefined} Interval id if interval was created,
   * undefined if the interval was cleared
   * @throws {GeneralError}
   */
  timer: (start, interval, lap = 1000) => {
    if (start && !(start instanceof Function)) {
      throw new GeneralError('Invalid start function.', { start: start || null })
    } else if (interval && !interval.length) {
      throw new GeneralError('Invalid interval id.', { interval })
    } else if (lap < 0) {
      throw new GeneralError('Invalid lap', { lap })
    }

    if (start) return setInterval(() => start(), lap)
    if (interval) return clearInterval()
  }
}
