// Packages
import { h, Component } from 'preact'

/**
 * Component representing a <video> element.
 *
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Video extends Component {
  /**
   * Renders an <video> element with the base class 'ada-video'.
   *
   * @param {object} props - Component properties
   * @param {string} props.controls - True if controls should be displayed
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {object} props.events - Event functions
   * @param {string} props.id - Element id
   * @param {string} props.src - Video source URL
   * @param {string} props.type - Video source type
   * @param {object} state - Component state
   * @param {object | undefined} context - Component context
   * @returns {HTMLVideoElement}
   */
  render(props, state) {
    const { autoplay, controls, className, events, id, src, type } = props
    const style = (`ada-video ${className || ''}`).trim()

    return (
      <video
        id={id} className={style} autoPlay={autoplay}
        controls={controls || false} {...events}
      >
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
    )
  }
}
