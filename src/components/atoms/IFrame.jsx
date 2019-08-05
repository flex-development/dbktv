// Packages
import { h, Component } from 'preact'

/**
 * Component representing an <iframe> element.
 *
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class IFrame extends Component {
  /**
   * Renders an <iframe> element with the base class 'ada-iframe'.
   *
   * @param {object} props - Component properties
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {string} props.id - Element id
   * @param {string} props.src - Address of the external file to embed
   * @param {string} props.type - Media type of the embedded content
   * @param {object} state - Component state
   * @returns {HTMLIFrameElement}
   */
  render(props, state) {
    const { className, id, src, type } = props
    const style = (`ada-iframe ${className || ''}`).trim()

    return (
      <iframe
        id={id} className={style} src={src} type={type} frameBorder='0'
      />
    )
  }
}
