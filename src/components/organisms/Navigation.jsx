// Packages
import { h, Component } from 'preact'

// Components
import { Container } from '../atoms'

/**
 * Class representing the navigation.
 *
 * @class Navigation
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Navigation extends Component {
  /**
   * If an error is caught, the component the error will be handed off to the
   * @see @class App component.
   *
   * @param {FeathersError | Error} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    return this.props.catch(error, info)
  }

  /**
   * Renders a <nav> element with the base class 'ado-nav'.
   *
   * If props.container is defined, props.children will be wrapped in a
   * container element with the base class 'ada-container'.
   *
   * Pass an empty object for the default container, or defined
   * props.container.id and/or props.container.classes for greater control.
   *
   * @param {object} props - Component properties
   * @param {*} props.children - Header elements
   * @param {string} props.class - Space delimitted list of extra classes
   * @param {object} props.container - If defined, wrap children in container
   * @param {string} props.container.id - Container element id
   * @param {string} props.container.classes - Extra container classes
   * @param {string} props.id - Element id
   * @param {object} state - Component state
   * @returns {HTMLElement} HTML <nav> element
   */
  render(props, state) {
    const { id, children, container } = props

    const c_props = typeof container === 'boolean'
      ? { children } : { ...container, children }

    return (
      <nav id={id} className={(`ado-nav ${props.class || ''}`).trim()}>
        {container ? <Container {...c_props} /> : children}
      </nav>
    )
  }
}
