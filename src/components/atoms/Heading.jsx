// Packages
import { h, Component } from 'preact'

/**
 * Component representing a <h1>, <h2>, <h3>, <h4>, <h5>, or <h6> element.
 *
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Heading extends Component {
  /**
   * Renders a heading element with the base class 'ada-heading'.
   *
   * @param {object} props - Component properties
   * @param {string} props.children - Inner HTML
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {string} props.id - Element id
   * @param {number} props.size - Heading size. Defaults to 1
   * @param {object | undefined} state - Component state
   * @param {object | undefined} context - Component context
   * @returns {HTMLHeadingElement}
   */
  render(props, state, context) {
    const { className, children, id, size } = this.props
    const style = (`ada-heading ${className || ''}`).trim()

    let element

    switch (size) {
      case 2:
        element = <h2 className={style} id={id} dangerouslySetInnerHTML={{
          __html: (children || '').replace('\n', '<br/><br/>')
        }} />
        break
      case 3:
        element = <h3 className={style} id={id} dangerouslySetInnerHTML={{
          __html: (children || '').replace('\n', '<br/><br/>')
        }} />
        break
      case 4:
        element = <h4 className={style} id={id} dangerouslySetInnerHTML={{
          __html: (children || '').replace('\n', '<br/><br/>')
        }} />
        break
      case 5:
        element = <h5 className={style} id={id} dangerouslySetInnerHTML={{
          __html: (children || '').replace('\n', '<br/><br/>')
        }} />
        break
      case 6:
        element = <h6 className={style} id={id} dangerouslySetInnerHTML={{
          __html: (children || '').replace('\n', '<br/><br/>')
        }} />
        break
      default:
        element = <h1 className={style} id={id} dangerouslySetInnerHTML={{
          __html: (children || '').replace('\n', '<br/><br/>')
        }} />
        break
    }

    return element
  }
}
