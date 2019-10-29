// Packages
import React, { Component } from 'react'
import ReactGA from 'react-ga'
import $ from 'jquery'

// Context
import { MobileContext } from './context'

// Components
import { Logo } from './molecules'
import { Deck, DeckNavigation, Footer, Header, Ticker } from './organisms'
import { Error, Loading } from './screens'

/**
 * Class representing the web application.
 *
 * @todo Get Analytics tracking id
 * @todo Update documentation
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
   * @param {AxiosInstance} props.api - Configured HTTP Client
   * @param {Pusher} props.pusher - Configured Pusher client
   * @returns {App}
   */
  constructor(props) {
    super(props)

    const debug = ['development', 'test'].includes(process.env.NODE_ENV)

    /**
     * @property {*[]} analytics - Google Analytics configuration options
     * @property {string} analytics[0] - Google Analytics tracking id
     * @property {object} analytics[1] - Additional config options
     * @instance
     */
    this.analytics = ['', { debug }]

    /**
     * @property {boolean} debug - For general messages, logging should be
     * enabled if the Node environment is 'development' or 'test'
     * @instance
     */
    this.debug = debug

    /**
     * @property {object} state - Internal component state
     * @property {boolean} state.analytics - True if Google Analytics was
     * initialized; this value will be updated in a production Node environment
     * @property {object} state.curr - Current slide position and content
     * @property {object} state.curr.data - Current slide data
     * @property {number} state.curr.position - Index of current slide
     * @property {object} state.deck - Deck data
     * @property {string} state.deck.last_edited_by - Person to last edit
     * @property {object[]} state.deck.slides - Slide objects
     * @property {string} state.deck.title - Name of deck
     * @property {FeathersError | null} state.error - Current error
     * @property {object | null} state.info - Error information
     * @property {boolean} state.loading - True if fetching content
     * @property {boolean} state.mobile - True if viewport width <= 768px
     * @property {object} state.settings - DBKTV settings
     * @property {string} state.settings.deck - Current deck URL
     * @property {string} state.settings.ticker - Current ticker URL
     * @property {object} state.ticker - Ticker content
     * @property {object[]} state.ticker.items - Ticker links
     * @property {string} state.ticker.last_edited_by - Person to last edit
     * @property {string} state.ticker.title - Name of ticker
     * @instance
     */
    this.state = {
      analytics: false,
      curr: { data: null, position: -1 },
      deck: { last_edited_by: '', slides: [], title: '' },
      error: null,
      info: null,
      loading: true,
      mobile: false,
      settings: { deck: '', ticker: '' },
      ticker: { items: [], last_edited_by: '', title: '' }
    }
  }

  /**
   * Invoked after an error has been thrown by a descendant component.
   *
   * The error will transformed into a FeathersError if it isn't already of that
   * type. Afterwards, the internal error state will be updated.
   *
   * @param {FeathersError | Error} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    // Transform error and update internal state
    this.setState({ error: this.error(error), info })
  }

  /**
   * Subscribes to deck data changes and attaches a window listener to update
   * the internal mobile state. In a 'production' Node environment, Google
   * Analytics and Pageview tracking will be initialized.
   *
   * @async
   * @returns {undefined}
   * @throws {GeneralError | NotFound}
   */
  async componentDidMount() {
    if (this.logging) console.info('Application mounted.')

    // Get initial data
    await this.initialize()

    // Subscribe to updates
    this.subscribe()

    // Attach window listener to update internal mobile state
    this.resize()
    $(window).resize(() => this.resize())

    // Google Analytics and Pageview tracking
    // this.tracking()

    // Update loading state
    this.fetch(false)
  }

  /**
   * Removes the mobile window listener.
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    $(window).off('resize')
  }

  /**
   * Returns the web application.
   *
   * If an error is caught, the Error screen component will be rendered,
   * displaying the error name, message, and additional error information.
   *
   * While the application is loading, the Loading screen component will be
   * rendered, displaying the DiamondbackTV logo with 'Continuing reading on
   * dbknews.com' below it.
   *
   * After the application has finished loading, the Header, Deck, Footer, and
   * child components will be rendered.
   *
   * On mobile devices, a list of the deck slides will be displayed.
   *
   * @returns {<MobileContext.Provider/>}
   */
  render() {
    const { curr, deck, error, info, loading, mobile, ticker } = this.state

    // Handle error and loading states
    if (error) return <Error error={error} info={info} transform={this.error} />
    if (loading) return <Loading />

    // Render application
    const { position } = curr
    const { slides } = deck

    return (
      <MobileContext.Provider value={{ mobile }}>
        <Header container>
          <Logo />
        </Header>
        <DeckNavigation active={position} slides={slides} />
        <Deck debug={this.debug} slides={slides} sync={this.sync} />
        <Footer>
          <Logo mini={mobile} />
          <Ticker items={ticker.items} />
        </Footer>
      </MobileContext.Provider>
    )
  }

  // HELPERS

  /**
   * Transform the incoming error into a FeathersError.
   *
   * @param {FeathersError | Error} error - Exception that was thrown
   * @param {object} info - Error infomation
   * @returns {FeathersError}
   * @see {@link https://docs.feathersjs.com/api/errors.html#feathers-errors}
   */
  error = error => {
    const { name } = error

    const feathers_errors = [
      'BadGateway', 'BadRequest', 'Conflict', 'Forbidden', 'GeneralError', 'LengthRequired', 'NotAuthenticated', 'NotFound', 'NotImplemented', 'PaymentError', 'MethodNotAllowed', 'NotAcceptable', 'Timeout', 'TooManyRequests', 'Unavailable', 'Unprocessable'
    ]

    // Return error already a FeathersError
    if (feathers_errors.includes(name)) return error

    // Return transformed error
    const { utils } = this.props
    return utils.error.feathers(error, { data: { errors: { origin: name } } })
  }

  /**
   * Updates the internal loading state.
   *
   * @param {boolean} loading - True if fetching content, false otherwise
   * @returns {boolean} @see @param loading
   */
  fetch = loading => this.setState({ loading }, () => loading)

  initialize = async () => {
    const { api } = this.props

    console.warn('Initializing DBKTV...')
    let data

    try {
      data = await api.get('/deploy-succeeded')
    } catch (err) {
      return this.setState({ error: this.error(err) })
    }

    console.info('Retreived TV deck, ticker, and settings ->', data)

    this.setState({ ...data, curr: { data: data.deck.slides[0], position: 0 } })

    console.info('Initialized DBKTV.')
  }

  /**
   * Updates the internal mobile state.
   *
   * @returns {undefined}
   */
  resize = () => this.setState({ mobile: $(window).width() <= 768 })

  subscribe = () => {
    console.warn('Subscribing to deployment updates...')

    this.subscription = this.props.pusher.subscribe('deployments')
    this.subscription.bind('deploy-succeeded', data => {
      console.info('SUBSCRIPTION UPDATE ->', data)
      return this.setState({
        ...data, curr: { data: data.deck.slides[0], position: 0 }
      })
    })

    console.info('Subscribed to deployment updates.')
  }

  /**
   * Updates the current slide position and data.
   *
   * @param {object} curr - Current slide
   * @param {object} curr.data - Current slide data
   * @param {number} curr.position - Index of the current slide
   * @returns {number} @see @param curr.position
   */
  sync = ({ data, position }) => {
    return this.setState({ curr: { data, position } }, () => position)
  }

  /**
   * In a production Node environment, Google Analytics and Pageview tracking
   * will be initialized.
   *
   * @returns {boolean} True if production Node environment and Google Analytics
   * was successfully initialized
   */
  tracking = () => {
    let analytics = false

    if (this.logging) {
      console.warn('Google Analytics and Pageview tracking will not be initialized in development or test environments.')
    }

    if (this.env === 'production') {
      const { pathname, search } = window.location

      // Initialize Google Analytics and pageview tracking
      ReactGA.initialize(...this.analytics)
      ReactGA.pageview(pathname + search)

      analytics = true
    }

    return this.setState({ analytics }, () => analytics)
  }
}
