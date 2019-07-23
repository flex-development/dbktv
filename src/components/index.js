// Packages
import { h, Component, Fragment } from 'preact'
import { BadRequest } from '@feathersjs/errors'
import $ from 'jquery'


// Components
import { LoadingIcon } from './atoms'
import { Loading } from './molecules'
import { Deck } from './organisms'
import { ErrorScreen, Landing } from './pages'

// Mock data
import mock from '../../tests/__mocks__/Deck.mock.json'

// Styles
import '../style/app.sass'

// Utilities
import utils from '../utils'

/**
 * Class representing the web application.
 *
 * @todo Implement state handlers
 * @todo Implement data fetching
 * @todo Implement real time data streaming
 *
 * @class App
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class App extends Component {
  /**
   * Creates a new application.
   *
   * @param {object} props - Component properties
   * @returns {App}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Component state
     * @property {object} state.deck - Deck info and slides
     * @property {object} state.deck.count - Total # of slides in deck
     * @property {number} state.deck.duration - Deck duration in ms
     * @property {object[]} state.deck.slides - Slide content
     * @property {FeathersError | null} state.error - Current error
     * @property {object | string | null} state.info - Error info or stack
     * @property {boolean} state.loading - True if fetching content
     * @property {boolean} state.mobile - True if viewport width <= 768px
     * @instance
     */
    this.state = {
      deck: null, error: null, info: null, loading: true, mobile: false
    }
  }

  /**
   * If an error is caught, the deck @see state.error and @see state.info will
   * be updated.
   *
   * @param {FeathersError} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    console.error('Error caught by App component ->', error)
    this.setState({ error, info })
  }

  /**
   * Fetches the initial slide deck data and then subscribes to new data
   * changes.
   *
   * @async
   * @returns {undefined}
   */
  async componentDidMount() {
    console.info('Application mounted.')
    document.title = 'DiamondbackTV 📺'

    // Update mobile state and attach window listener to update mobile state
    this.setState({ mobile: $(window).width() <= 768 })
    this.resize()

    try {
      // Get initial data
      this.setState({ deck: await this.get_data() })
    } catch (err) {
      this.handle_error(err)
    }

    // TODO: Subscribe to data changes

    setTimeout(() => this.setState({ loading: false }), 1200)
  }


  /**
   * Remove window listeners and unsubscribes from data changes.
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    // Unsubscribe from data changes

    // Remove resize window listener
    $(window).off('resize')
  }

  /**
   * Creates a deck slide. After @see @param duration ms, the window location
   * will be set to @see @param next .
   * 
   * @param {number} duration - Slide duration in ms
   * @param {string} next - URL of next slide
   * @returns {undefined}
   */
  slide = (duration, next) => {
    duration = duration < 60000 ? 60000 : duration
    return setTimeout(() => route(next || '/'), duration)
  }

  get_data = async () => {
    // Update loading state
    this.setState({ loading: true }, () => console.warn('Getting slide deck.'))

    try {
      // TODO: Request data from API
      const deck = mock

      deck.slides = deck.slides.map(slide => {
        // const component = slide.component
        // const templates = { Articles, Multimedia, News }

        // Reflect.deleteProperty(slide, 'component')
        // slide.component = templates[component]

        return slide
      })

      console.info('Retreived slide deck ->', deck)
      return deck
    } catch (err) {
      throw new BadRequest(`Error getting slide deck -> ${err.message}`)
    }
  }


  handle_error = (error, info = null) => {
    return this.setState({ error, info: (error.stack || info) || null })
  }

  handle_loading = (loading = true) => this.setState({ loading })

  /**
   * Returns the slide deck application.
   * If an error is caught, the deck will push to an error screen.
   *
   * @todo Implement routing
   *
   * @param {object} props - Component properties
   * @param {object} state - Component state
   * @param {object} state.deck - Deck info and slides
   * @param {object} state.deck.count - Total # of slides in deck
   * @param {number} state.deck.duration - Deck duration in ms
   * @param {object[]} state.deck.slides - Slide content
   * @param {FeathersError | null} state.error - Current error
   * @param {object | string | null} state.info - Error info or stack
   * @param {boolean} state.loading - True if fetching content
   * @param {boolean} state.mobile - True if viewport width <= 768px
   * @returns {<Deck/>} Slide deck component
   */
  render(props, state) {
    const { deck, error, info, loading, mobile } = state

    // Handle error state
    if (error) return <ErrorScreen error={error} info={info} />

    // Handle loading state
    if (loading) return <Landing path='/' />

    // Handle successful API response
    return (
      <Deck
        deck={deck}
        loading={this.handle_loading}
        catch={this.handle_error}
      />
    )
  }

  /**
   * Updates the @see state.mobile when the window is resized.
   * 
   * @returns {undefined}
   */
  resize = () => {
    $(window).resize(() => this.setState({ mobile: $(window).width() <= 768 }))
  }
}
