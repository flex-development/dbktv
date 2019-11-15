// Packages
import React, { Component } from 'react'
import { MemoryRouter } from 'react-router'
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
 * @class App
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class App extends Component {
  /**
   * Creates a new Diamondback TV web application.
   *
   * @todo Update documentation
   * @param {object} props - Component properties
   * @param {object} props.api - Mock API data
   * @param {object} props.api.deck - Mock Deck
   * @param {object} props.api.ticker - Mock Ticker
   * @param {object} props.utils - Utility functions
   * @returns {App}
   */
  constructor(props) {
    super(props)

    const { NODE_ENV } = process.env

    /**
     * @todo Get tracking id
     *
     * @property {*[]} analytics - Google Analytics configuration options
     * @property {string} analytics[0] - Google Analytics tracking id
     * @property {object} analytics[1] - Additional config options
     * @instance
     */
    this.analytics = ['', { debug: ['development', 'test'].includes(NODE_ENV) }]

    /**
     * @property {string} env - development | test | staging | production
     * @instance
     */
    this.env = NODE_ENV

    /**
     * @property {boolean} logging - For general messages, logging should be
     * enabled if the Node environment is 'development' or 'test'
     * @instance
     */
    this.logging = ['development', 'test'].includes(NODE_ENV)

    /**
     * @property {object} state - Internal component state
     * @property {boolean} state.analytics - True if Google Analytics was
     * initialized; this value will be updated in a production Node environment
     * @property {object} state.deck - Slide deck
     * @property {object[]} state.deck.slides - Slide content
     * @property {FeathersError | null} state.error - Current error
     * @property {object} state.info - Error information
     * @property {boolean} state.loading - True if fetching content
     * @property {boolean} state.mobile - True if viewport width <= 768px
     * @property {object} state.ticker - Ticker content
     * @property {object[]} state.ticker.items - Ticker items (links)
     * @instance
     */
    this.state = {
      analytics: false,
      deck: null,
      error: null,
      info: null,
      loading: true,
      mobile: $(window).width() <= 768,
      ticker: null
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
   * When the component mounts, the following will happen:
   *
   * - A  window listener to update the internal mobile state will be added
   * - In a 'production' Node environment, Google Analytics and Pageview
   *   tracking will be initialized.
   *
   * @returns {undefined}
   */
  async componentDidMount() {
    if (this.logging) console.info('Application mounted.')

    // Attach window listener to update internal mobile state
    this.resize()
    $(window).resize(() => this.resize())

    // Google Analytics and Pageview tracking
    this.tracking()

    // Update loading state
    this.fetch(false)
  }

  /**
   * Before the component unmounts, the window listener to update the mobile
   * state will be removed.
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    // Remove window listener
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
   * @returns {<MemoryRouter/>}
   */
  render() {
    const { error, id, info, loading, mobile } = this.state
    const { api, utils } = this.props

    // Handle error and loading states
    if (error) return <Error error={error} info={info} transform={this.error} />
    if (loading) return <Loading />

    // Gather Deck component properties
    const routes = this.routes(api.deck.slides)
    const deck = { error: this.error, fetch: this.fetch, slides: routes, utils }

    // Render application
    return (
      <MemoryRouter initialEntries={routes} initialIndex={0}>
        <MobileContext.Provider value={{ mobile }}>
          <Header container>
            <Logo />
          </Header>
          <DeckNavigation active={id} slides={routes} />
          <Deck {...deck} />
          <Footer>
            <Logo mini={mobile} />
            <Ticker items={api.ticker.items} />
          </Footer>
        </MobileContext.Provider>
      </MemoryRouter>
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

  /**
   * Updates the internal slide id state.
   *
   * @param {number} id - Index of current slide
   * @returns {number} @see @param id
   */
  id = id => this.setState({ id }, () => id)

  /**
   * Updates the internal mobile state.
   *
   * @returns {undefined}
   */
  resize = () => this.setState({ mobile: $(window).width() <= 768 })

  /**
   * Transforms an array of slide objects into an array of route objects.
   * This is necessary for our MemoryRouter.
   *
   * If @param slides is undefined, the internal error state will be updated
   * with a NotFound error and the method will return undefined.
   *
   * @todo slide.pathname = slide.slug
   *
   * @param {object[]} slides - Array of slide objects
   * @returns {object[]} Array of route objects
   * @throws {NotFound}
   */
  routes = slides => {
    if (this.logging) console.warn('ROUTING -> Getting routes...')

    if (!slides) {
      const { error } = this.props.utils
      return this.setState({
        error: error.feathers('ROUTING ERR -> Slides not found.', null, 404)
      })
    }

    // Turn slide object into route objects
    return slides.map((slide, i) => {
      slide.position = i
      slide.mobile = this.state.mobile
      // TODO: slide.pathname = slide.slug
      return { pathname: `/slides/${i + 1}`, pos: this.id, state: { slide } }
    })
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
