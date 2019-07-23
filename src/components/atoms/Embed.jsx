// Packages
import { h, Component } from 'preact'

/**
 * Component representing a <embed> element.
 *
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Embed extends Component {
  /**
   * Renders an <embed> element with the base class 'ada-embed'.
   *
   * @param {object} props - Component properties
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {string} props.id - Element id
   * @param {string} props.src - Address of the external file to embed
   * @param {string} props.type - Media type of the embedded content
   * @param {object} state - Component state
   * @returns {HTMLEmbedElement}
   */
  render(props, state) {
    const { className, id, src, type } = props
    const style = (`ada-embed ${className || ''}`).trim()

    return <embed id={id} className={style} src={src} type={type} />
  }
}
