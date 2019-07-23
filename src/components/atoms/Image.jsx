// Packages
import { h, Component } from 'preact'

// Logos
import full_light from '../../assets/images/diamondback-tv-logo-light.png'
import mini_light from '../../assets/images/dbk-tv-logo-light.png'

/**
 * Component representing an <img> element.
 *
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Image extends Component {
  /**
   * Renders an <img> element with the base class 'ada-image'.
   *
   * @param {object} props - Component properties
   * @param {string} props.alt - Image description
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {object} props.events - Event functions
   * @param {string} props.id - Element id
   * @param {string} props.src - Image url
   * @param {object | undefined} state - Component state
   * @param {object | undefined} context - Component context
   * @returns {HTMLImageElement}
   */
  render(props, state, context) {
    const { alt, className, events, id, src } = props
    const style = (`ada-image ${className || ''}`).trim()

    return <img id={id} className={style} src={src} alt={alt} {...events} />
  }
}
