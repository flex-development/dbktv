// Packages
import { GeneralError } from '@feathersjs/errors'
import $ from 'jquery'

/**
 * @file UI utility functions
 * @module utilities/ui
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

export default {
  /**
   * Checks if an element is in the viewport.
   *
   * @param {string} selector - A string containing a selector expression
   * @returns {object} A set of booleans for each side of the element
   * @throws {GeneralError}
   */
  in_viewport: selector => {
    if (!selector) throw new GeneralError('Missing selector.')

    // Get coordinates of the bounding box
    let element = $(selector)
    const bounds = element.offset()

    // Boumds for comparison
    const comparison = {
      height: window.innerHeight || document.documentElement.clientHeight,
      width: window.innerWidth || document.documentElement.clientWidth
    }

    // Build a set of booleans for each side of the original element
    element = {}

    element.top = bounds.top < 0
    element.left = bounds.left < 0
    element.bottom = bounds.bottom > comparison.height
    element.right = bounds.right > comparison.width

    element.any = element.top || element.left || element.bottom || element.right
    element.all = element.top && element.left && element.bottom && element.right

    return element
  },

  /**
   * Returns true if the user has scrolled the page.
   *
   * If @see @param selector is defined, and @see @param value is defined as a
   * value between 0 and 1, the function will return true if the user has
   * scrolled past @param value percentage of the height of the element
   * associated with @param selector .
   *
   * @param selector must be a valid non-empty string and @param value must be
   * between 0 and 1, inclusive, otherwise the function will check if the user
   * has scrolled the page in general.
   *
   * @see @param target defaults to the global window object.
   *
   * @param {string} selector - String matching element with class to check if
   * header has scrolled past @see @param value
   * @param {number} value - If defined as a value between 0 and 1, the function
   * will return true if the user has scrolled past @param value of the element
   * associated with @param selector
   * @param {string} target - Element to get scroll to top value from
   * @returns {boolean}
   */
  is_scrolled: (selector, value, target = window) => {
    const no_selector = !selector || (selector && !selector.length)
    const no_value = !value || (value && (value < 0 || value > 1))

    if (no_selector || no_value) return $(target).scrollTop() > 0

    return $(target).scrollTop() >= $(selector).outerHeight() * value
  },

  /**
   * Smooth scrolls to the top of @see @param target .
   *
   * @see @param target defaults to 'body', @see @param speed defaults to 750.
   *
   * @param {Event} event - onClick event
   * @param {string} target - Element to scroll to the top of
   * @param {number} speed - Animation speed in milliseconds
   * @returns {undefined}
   */
  smooth_scroll: (event, target = 'body', speed = 500) => {
    $('html, body').animate({ scrollTop: $(target).offset().top }, speed)
    if (process.env.NODE_ENV !== 'production') console.info('Smooth scrolled.')
    event.preventDefault()
  }
}
