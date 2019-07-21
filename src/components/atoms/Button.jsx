// Packages
import { h, Component } from 'preact'
import { BadRequest } from '@feathersjs/errors'

// Utilities
import utilities from '../../utils'

/**
 * Component representing a basic button.
 *
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Button extends Component {
  /**
   * Renders a button with the base class 'ada-button'.
   *
   * @param {object} props - Component properties
   * @param {*} props.children - Child elements to render
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {boolean} props.disabled - True if button is disabled
   * @param {object} props.events - Object containing event functions
   * @param {string} props.id - Element id
   * @param {object | undefined} state - Component state
   * @param {object | undefined} context - Component context
   * @returns {HTMLButtonElement}
   */
  render(props, state, context) {
    const { className, children, disabled, events, id } = props
    const style = (`ada-button ${className || ''}`).trim()

    return (
      <button id={id} className={style} disabled={disabled} {...events}>
        {children}
      </button>
    )
  }
}

/**
 * Component representing a button that when clicked, scrolls to the top
 * of an element. By default, the button will scroll to the top of window.
 *
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export class SmoothScrollButton extends Component {
  /**
   * @property {object} state Component state
   * @property {number} state.speed - Animation speed in milliseconds
   * @property {string} state.target - Element to scroll to the top of
   * @instance
   */
  state = { speed: 625, target: 'body' }

  /**
   * Updates the state based on the incoming props.
   *
   * @param {object} props - Incoming props
   * @param {number} props.speed - Animation speed in milliseconds
   * @param {string} props.target - Element to scroll to the top of
   * @param {object} state - Current state
   * @param {number} state.speed - @see @param props.speed
   * @param {string} state.target - @see @param props.target
   * @returns {object} Object to update state with
   * @throws {BadRequest} If @see @param props.target is an empty string
   */
  static getDerivedStateFromProps(props, state) {
    if (props.target && !props.target.length) {
      throw new BadRequest('An element to scroll to is required.')
    }

    const { target, speed } = props
    return { speed: speed && speed >= 0 ? speed : state.speed, target: target }
  }

  /**
   * Renders a button that when clicked, smooth scrolls to the top of
   * this.props.target. The button will have the class 'scroll-to-top-btn'.
   *
   * @param {object} props - Component properties
   * @param {boolean} props.disabled - If button is disabled or not
   * @param {*} props.children - Inner children
   * @param {string} props.class - Space delimitted list of extra classes
   * @param {number} props.speed - Animation speed in milliseconds
   * @param {string} props.target - Element to scroll to the top of
   * @param {object} state - Component state
   * @param {number} state.speed - @see @param props.speed
   * @param {string} state.target - @see @param props.target
   * @param {object | undefined} context - Component context
   * @returns {HTMLButtonElement}
   */
  render(props, state, context) {
    const { className, children, disabled } = props
    const { target, speed } = state

    const style = (`smooth-scroll-btn ${className || ''}`).trim()

    return (
      <Button
        disabled={disabled} class={style}
        events={{ onClick: e => utilities.ui.smooth_scroll(e, target, speed) }}
      >
        {children}
      </Button>
    )
  }
}
