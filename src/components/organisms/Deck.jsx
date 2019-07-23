// Packages
import { h, Component } from 'preact'
import Router, { route } from 'preact-router'
import AsyncRoute from 'preact-async-route'

// Components
import { LoadingIcon, Redirect } from '../atoms'
import { Loading } from '../molecules'
import { Articles, Multimedia, News } from '../templates'

/**
 * Class representing a slide deck.
 *
 * @class Deck
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Deck extends Component {
  /**
   * Creates a new slide deck.
   *
   * @param {object} props - Component properties
   * @param {object} props.deck - Deck info and slides
   * @param {object} props.deck.count - Total # of slides in deck
   * @param {number} props.deck.duration - Deck duration in ms
   * @param {object[]} props.deck.slides - Deck slide objects
   * @returns {App}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Component state
     * @param {object} state.curr - Current slide
     */
    this.state = { curr: props.deck.slides[0] }
  }

  /**
   * If an error is caught, the component the error will be handed off to the
   * @see @class App component.
   *
   * @param {FeathersError} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    return this.props.catch(error, info)
  }

  /**
   * Logs that the deck has mounted.
   *
   * @async
   * @returns {undefined}
   */
  componentDidMount() {
    const { curr } = this.state

    console.info('Deck mounted. Current slide ->', curr)
    document.title = curr.title
  }

  /**
   * Creates a deck slide. After @see @param duration ms, the current deck slide
   * will be updated.
   *
   * @param {number} duration - Slide duration in ms
   * @param {string} next - URL of next slide
   * @returns {undefined}
   */
  create_slide = (duration, next) => {
    const { slides } = this.props.deck
    // duration = duration < 60000 ? 60000 : duration

    return setTimeout(() => this.setState({ curr: slides[next] }), duration)
  }

  get_template = () => {
    const { loading } = this.props
    const { curr } = this.state

    const props = {
      ...curr, catch: this.props.catch, loading, slide: this.create_slide
    }

    let template

    switch (curr.component) {
      case 'Articles':
        template = <Articles {...props} />
        break
      case 'Multimedia':
        template = <Multimedia {...props} />
        break
      default:
        template = <News {...props} />
    }

    return template
  }

  /**
   * Returns the slide deck component with the base class 'ado-deck'.
   *
   * If an error is caught, the component the error will be handed off to the
   * @see @class App component.
   *
   * @todo Implement slide rendering
   *
   * @param {object} props - Component properties
   * @param {Function} props.catch - Error handling function
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {object} props.deck - Deck info and slides
   * @param {object} props.deck.count - Total # of slides in deck
   * @param {number} props.deck.duration - Deck duration in ms
   * @param {object[]} props.deck.slides - Deck slide objects
   * @param {string} props.id - Element id
   * @param {object} state - Component state
   * @param {object} state.curr - Current slide
   * @returns {HTMLDivElement} Slide deck
   */
  render(props, state, context) {
    const { className, id } = props

    return (
      <main id={id} className={(`ado-deck ${className || ''}`).trim()}>
        {this.get_template()}
      </main>
    )
  }
}
