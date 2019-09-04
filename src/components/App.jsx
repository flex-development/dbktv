// Packages
import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactGA from 'react-ga'
import { GeneralError, NotFound } from '@feathersjs/errors'

// Components
import { Logo } from './molecules'
import { Header, Deck, Footer, Ticker } from './organisms'
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
   * @param {object} props - Component properties
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
     * @property {object} state - Internal component state
     * @property {boolean} state.analytics - True if Google Analytics was
     * initialized; this value will be updated in a production Node environment
     * @property {string | null} state.deck - Id of current deck
     * @property {FeathersError | null} state.error - Current error
     * @property {object} state.info - Error information
     * @property {boolean} state.loading - True if fetching content
     * @property {object[] | null} state.slides - Slide content
     * @property {object[] | null} state.ticker - Ticker content
     * @instance
     */
    this.state = {
      analytics: false,
      deck: null,
      error: null,
      info: null,
      loading: true,
      slides: null,
      ticker: null
    }

    /**
     * @property {object} subscriptions - Database subscriptions
     * @property {firebase.database.Reference | null} subscriptions.deck - Ref
     * to deck to watch for changes
     * @property {firebase.database.Reference} subscriptions.id - Ref to id of
     * deck to watch for changes
     * @instance
     */
    this.subscriptions = {
      current: null,
      data: id => props.database.decks.ref(id),
      id: props.database.core.ref('current')
    }
  }

  /**
   * In a 'development' Node environment where @see @param props.test is true,
   * or in a 'test' Node environment, the internal component state can be set
   * via @see @param props .
   *
   * @todo Update documentation
   *
   * @param {object} props - Incoming props
   * @param {object} state - Component state
   * @returns {object | null} Object to update the state, or null to update
   * nothing
   */
  static getDerivedStateFromProps(props, state) {
    const {
      database, deck, error, info, loading, mobile, slides, test, ticker
    } = props

    const { NODE_ENV } = process.env

    if ((NODE_ENV === 'development' && test) || NODE_ENV === 'test') {
      return {
        database, deck, error, info, loading, mobile, slides, test, ticker
      }
    }

    return null
  }

  /**
   * If an error is caught, the component's internal error state will be
   * updated. Afterwards, the error will be logged with the prefix '!TV-ERR =>'.
   *
   * @param {Error | FeathersError} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    this.error(error, info)
  }

  /**
   * Retreieves the id of the current deck and updates the internal state. The
   * application will subscribes to changes at the database node 'current'. The
   * value of this node contains the id name of the current deck.
   *
   * In a 'production' Node environment, Google Analytics and Pageview tracking
   * will be initialized.
   *
   * @async
   * @returns {undefined}
   * @throws {GeneralError | NotFound}
   */
  async componentDidMount() {
    if (window.location.pathname !== '/slides/1') {
      window.location.pathname = '/slides/1'
    }

    console.info('Application mounted.')

    // Get the current deck id and subscribe to data changes
    await this.sync()
    this.subscribe()

    // Google Analytics and Pageview tracking
    this.tracking()
  }

  /**
   * Before the component unmounts, our deck subscriptions will be removed.
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    const { current, id } = this.subscriptions
    const subscriptions = [current, id]

    subscriptions.forEach(s => { if (s) s.off() })
  }

  /**
   * Returns the web application.
   *
   * If an error is caught, the Error screen component will be rendered,
   * displaying the error name, message, and stack information.
   *
   * While the application is loading, the Loading screen component will be
   * rendered, displaying the DiamondbackTV logo with 'Continuing reading on
   * dbknews.com' below it.
   *
   * After the application has finished loading, the Header, Deck, Footer, and
   * child components will be rendered.
   *
   * @returns {<Router/>}
   */
  render() {
    const { deck, error, info, loading, slides, ticker } = this.state

    // Handle error and loading states
    if (error) return <Error error={error} info={info} />
    if (loading) return <Loading />

    return (
      <Router>
        <Header container>
          <Logo />
        </Header>
        <Deck
          error={this.error} fetch={this.fetch} id={deck} slides={slides}
        />
        <Footer>
          <Logo mini />
          <Ticker items={ticker} />
        </Footer>
      </Router>
    )
  }

  // HELPERS

  /**
   * Logs the error and updates the internal error state.
   *
   * @param {FeathersError | Error} error - Exception that was thrown
   * @param {object} info - Error infomation
   * @returns {undefined}
   */
  error = (error, info = null) => {
    info = (error.stack || info) || null

    console.error(error.message, info)
    return this.setState({ error, info })
  }

  /**
   * Updates the internal loading state.
   *
   * @param {boolean} loading - True if fetching content, false otherwise
   * @returns {boolean} @see @param loading
   */
  fetch = loading => this.setState({ loading }, () => loading)

  /**
   * If @see @param deck_id is defined, the method will update the internal
   * state with new slide and ticker data when changes are detected in the
   * dbktv-decks database.
   *
   * If undefined, the method will update the internal state the new deck id.
   * The method will then call @see @method App#sync to fetch the new slide and
   * ticker data and update the internal state.
   *
   * @param {string} deck_id - Id of deck to watch for changes
   * @returns {object | string} New deck data or deck id
   */
  subscribe = deck_id => {
    const { data, id } = this.subscriptions

    try {
      const subscription = deck_id ? data(deck_id) : id
      subscription.on('value', snapshot => {
        snapshot = snapshot.val()

        if (deck_id) {
          const { slides, ticker } = snapshot

          return this.setState({ slides, ticker }, () => {
            console.info('SUBSCRIPTION - NEW DATA DETECTED ->', snapshot)
            return snapshot
          })
        } else {
          const { deck } = this.state

          return this.setState({ deck: snapshot }, async () => {
            if (deck && deck !== snapshot) {
              console.info('SUBSCRIPTION - NEW ID DETECTED ->', deck, snapshot)
              return this.sync()
            }
          })
        }
      })
    } catch (err) {
      this.error(new GeneralError(`SUBSCRIPTION ERR -> ${err.message}`))
    }
  }

  /**
   * Updates the internal state with id of the current deck, slide data, and
   * ticker data.
   *
   * @async
   * @returns {Promise<object>} Id of the current deck, slides, and ticker data
   */
  sync = async () => {
    this.fetch(true)
    console.warn('SYNC - STARTING')

    let deck = null

    /*
     * Retreive the id of the current deck data.
     * A GeneralError will be thrown if we can't get the id from Firebase.
     * A NotFound error will be thrown if the deck id doesn't exist.
     */

    try {
      deck = (await this.subscriptions.id.once('value')).val()
      if (!deck) throw new NotFound('SYNC ERR - DECK ID DOES NOT EXIST')
    } catch (err) {
      if (err.name === 'NotFound') this.error(err)
      err.message = `SYNC ERR - CANNOT GET DECK ID -> ${err.message}`
      this.error(new GeneralError(err))
    }

    console.info('SYNC - RETREIVED DECK ID ->', deck)

    /*
     * Retreive the deck data from the decks database.
     * A GeneralError will be thrown if we're unable to get the data.
     */

    try {
      const { data } = this.subscriptions
      let { slides, ticker } = (await data(deck).once('value')).val()

      this.setState({ deck, loading: false, slides, ticker }, () => {
        console.info('SYNC - RETREIVED DECK DATA ->', { slides, ticker })
        return { deck, slides, ticker }
      })
    } catch (err) {
      err.message = `SYNC ERR - CANNOT GET DECK DATA -> ${err.message}`
      this.error(new GeneralError(err))
    }
  }

  /**
   * Prepares @see @param slides to be parsed as dual slide and route objects.
   *
   * @param {object[]} slides - Array to slides to sanitize
   * @returns {object[]} - Routified slide objects
   */
  routing = slides => {
    const patherize = text => text.toLowerCase().replace(/ /g, '-').replace(/[-]+/g, '-').replace(/[^\w-]+/g, '')

    return slides.map((slide, i) => {
      const { component, content } = slide

      slide.next = { id: i === slides.length - 1 ? 0 : i + 1 }

      switch (component) {
        case 'Articles':
          const { articles } = content
          slide.path = `/articles/${patherize(articles[0].headline.text)}`
          break
        case 'Multimedia':
          const { alt, caption, video } = content.media
          slide.path = `/multimedia/${patherize(video ? caption : alt)}`
          break
        case 'News':
          const { headline } = content
          slide.path = `/news/${patherize(headline.text)}`
          break
        default:
          slide.path = `/default`
      }

      return slide
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
