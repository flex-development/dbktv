// Packages
import { h, Component } from 'preact'

/**
 * Class representing a slide deck.
 *
 * @class Deck
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Deck extends Component {
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
   * Returns the slide deck component with the base class 'ado-deck'.
   *
   * @param {object} props - Component properties
   * @param {Function} props.catch - Error handling function
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {object} props.curr - Current slide
   * @param {object | undefined} props.curr.content - Slide content
   * @param {number} props.curr.duration - Slide duration in ms
   * @param {string} props.curr.id - Slide ID
   * @param {number} props.curr.next - ID of next slide
   * @param {string} props.curr.path - Slide URL
   * @param {string} props.curr.title - Slide title
   * @param {string} props.id - Slide ID
   * @param {object[]} props.deck.slides - Deck slide objects
   * @param {Function} props.loading - <App> loading state handler
   * @param {boolean} props.mobile - True if viewport width <= 768px
   * @param {Function} props.slide - <App> slide data handler
   * @param {<Component> | null} props.template - Current slide component
   * @param {undefined} state
   * @returns {HTMLDivElement} Slide deck
   */
  render(props, state, context) {
    const { className, children, id, template } = props

    return (
      <main id={id} className={(`ado-deck ${className || ''}`).trim()}>
        {template}
        {children}
      </main>
    )
  }
}
