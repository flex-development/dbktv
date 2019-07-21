// Packages
import { h, Component } from 'preact'

/**
 * Component representing a container element.
 *
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Container extends Component {
  /**
   * Renders a <div> element with the base class 'ada-container'.
   *
   * @param {object} props - Component properties
   * @param {*} props.children - Child elements to render
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {string} props.id - Element id
   * @param {*} props.children - Container elements
   * @param {object | undefined} state - Component state
   * @param {object | undefined} context - Component context
   * @returns {HTMLDivElement}
   */
  render(props, state, context) {
    const { children, className, id } = props
    const style = (`ada-container ${className || ''}`).trim()

    return <div id={id} className={style}>{children}</div>
  }
}
