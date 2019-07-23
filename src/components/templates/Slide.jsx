// Packages
import { h, Component } from 'preact'
import { route } from 'preact-router'

/**
 * Class representing a deck slide.
 *
 * @todo Validate props.duration
 *
 * @class Slide
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Slide extends Component {
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Component state
     * @property {number} state.duration - Slide duration in ms
     * @property {string} state.next - URL of next slide
     */
    this.state = { duration: props.duration || 1000, next: props.next || '/' }
  }

  /**
   * getDerivedStateFromProps is invoked right before calling the render method,
   * both on the initial mount and on subsequent updates. It should return an
   * object to update the state, or null to update nothing.
   *
   * @param {object} props - Incoming props
   * @param {number} props.duration - Slide duration in ms
   * @param {string} props.next - URL of next slide
   * @param {object[]} props.deck.slides - Slide content
   * @param {object} state - Current component state
   * @param {number} state.duration - @see props.duration
   * @param {string} state.next - @see props.next
   * @returns {object} Sanitized object to update state
   */
  static getDerivedStateFromProps(props, state) {
    const { duration, next } = props
    return { duration: duration < 0 ? 0 : duration, next: next || '/' }
  }

  componentDidMount() {
    const { title } = this.props
    const { duration, next } = this.state

    console.info(`Slide mounted ->`, title)
    setTimeout(() => route(next), duration)
  }

  /**
   * Renders a <section> element representing a deck slide.
   *
   * @param {object} props - Component properties
   * @param {object} state - Component state
   * @returns {HTMLElement} <section>
   */
  render(props, state) {
    const { className, children, id } = props

    return (
      <section id={id} className={(`adt-slide ${className || ''}`).trim()}>
        {children}
      </section>
    )
  }
}
