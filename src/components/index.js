// Packages
import { h, Component } from 'preact'
import { BadRequest } from '@feathersjs/errors'
import $ from 'jquery'

// Components
import { Deck } from './organisms'
import { Error, Loading } from './screens'

// Mock data
import mock from '../../tests/__mocks__/Deck.mock.json'

// Styles
import '../style/app.sass'

/**
 * Class representing the web application.
 *
 * @todo Implement data fetching
 * @todo Implement real time data streaming
 *
 * @class App
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class App extends Component {
  /**
   * Creates a new Diamondback TV web application.
   *
   * @param {object} props - Component properties
   * @returns {<App/>}
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
     * @property {boolean} state.loading - True if fetching slide deck
     * @property {boolean} state.mobile - True if window width <= 768px
     * @instance
     */
    this.state = {
      deck: null, error: null, info: null, loading: true, mobile: false
    }
  }

  /**
   * If an error is caught, the app's internal error state, @see state.error,
   * and it's associated info, @see state.info will be updated.
   *
   * @param {FeathersError} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    return this.setState({ error, info }, () => console.error('!ERR:', error))
  }

  /**
   * Fetches the initial slide deck data and then subscribes to new data
   * changes.
   *
   * @todo Subscribe to data changes from the API
   *
   * @async
   * @returns {undefined}
   */
  async componentDidMount() {
    console.info('Application mounted.')
    document.title = 'DiamondbackTV 📺'

    // Update mobile state and attach window listener to update mobile state
    this.setState({ mobile: this.mobile() })
    $(window).resize(this.resize())

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
   * @todo Unsubscribe from data changes
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    // TODO: Unsubscribe from data changes

    // Remove resize window listener
    $(window).off('resize')
  }

  /**
   * Retreives the current slide deck from the DBKTV API.
   *
   * @todo Replace mock data with server call after MVP Demo
   *
   * @async
   * @returns {Promise<object>} Promise containing a Deck resource
   */
  get_data = async () => {
    // Update loading state
    this.setState({ loading: true }, () => console.warn('Getting slide deck.'))

    try {
      // TODO: Request data from API
      const deck = mock
      console.info('Retreived slide deck ->', deck)
      return deck
    } catch (err) {
      throw new BadRequest(`Error getting slide deck -> ${err.message}`)
    }
  }

  /**
   * Updates @see state.error and @see state.info .
   *
   * @param {FeathersError | Error} error - Exception that was thrown
   * @param {object} info - Error infomation+
   * @returns {undefined}
   */
  handle_error = (error, info = null) => {
    return this.setState({ error, info: (error.stack || info) || null })
  }

  /**
   * Updates the internal loading state.
   *
   * @param {boolean} loading - True if fetching content. Defaults to true
   * @returns {undefined}
   */
  handle_loading = (loading = true) => this.setState({ loading })

  /**
   * Returns true if the window width is less than or equal to 768.
   *
   * @returns {boolean} True if viewport width <= 768px
   */
  mobile = () => $(window).width() <= 768

  /**
   * Returns the web application.
   * If an error is caught, the Application will push to an error screen.
   *
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
    if (error) return <Error error={error} info={info} />

    // Handle loading state
    if (loading) return <Loading />

    // Handle successful API response
    return (
      <Deck
        deck={deck}
        loading={this.handle_loading}
        mobile={mobile}
        catch={this.handle_error}
      />
    )
  }

  /**
   * Updates the internal mobile state.
   *
   * @returns {undefined}
   */
  resize = () => this.setState({ mobile: this.mobile() })
}
