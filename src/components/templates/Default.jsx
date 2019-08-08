// Packages
import { h, Component } from 'preact'
import $ from 'jquery'

// Components
import { Container } from '../atoms'
import { Logo } from '../molecules'

/**
 * Class representing the default slide.
 *
 * @class Default
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Default extends Component {
  /**
   * If an error is caught, the component the error will be handed off to the
   * @see @class App component.
   *
   * @param {FeathersError | Error} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) { return this.props.catch(error, info) }

  /**
   * Hides the header.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { duration, next, slide } = this.props

    $('.ado-header').css('display', 'none')
    setTimeout(() => slide(next), duration)
  }

  /**
   * Shows the header.
   *
   * @returns {undefined}
   */
  componentWillUnmount() { $('.ado-header').css('display', 'flex') }

  /**
   * Renders a <section> element representing the default slide.
   *
   * The default slide displays the DiamondbackTV logo and 'Continue reading
   * on dbknews.com' beneath the logo.
   *
   * @param {object} props - Component properties
   * @param {Function} props.catch - <App> error state handler
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {number} props.duration - Slide duration in ms
   * @param {string} props.id - Slide ID
   * @param {Function} props.loading - <App> loading state handler
   * @param {number} props.next - ID of next slide
   * @param {string} props.path - Slide URL
   * @param {Function} props.slide - <Deck> current slide state handler
   * @param {string} props.title - Slide title
   * @param {object} state - Component state
   * @param {number} state.duration - Slide duration in ms. Default = 15000
   * @param {number} state.next - ID of next slide. Default = 0
   * @param {string} state.title - Slide title
   * @returns {HTMLElement} <section> element
   */
  render(props, state) {
    const { className, id } = props

    return (
      <section id={id} className={`adt-default ${className || ''}`.trim()}>
        <Container>
          <Logo plug />
        </Container>
      </section>
    )
  }
}
