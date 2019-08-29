// Packages
import React, { Component, Fragment } from 'react'
import { GeneralError, NotFound } from '@feathersjs/errors'

// Components
import { Logo } from './molecules'
import { Header, Deck } from './organisms'
import { Error, Loading } from './screens'

/**
 * Class representing the web application.
 *
 * @todo Move template slide functionality to @see @class Slide (HOC)
 * @todo Implement data fetching and real time data streaming
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

    /**
     * @property {string} env - development | test | staging | production
     * @instance
     */
    this.env = process.env.NODE_ENV

    /**
     * @property {object} state - Internal component state
     * @property {string | null} state.current - Id of current deck
     * @property {object | null} state.deck - Deck data
     * @property {FeathersError | null} state.error - Current error
     * @property {object} state.info - Error information
     * @property {boolean} state.loading - True if fetching content
     * @property {object | null} state.urls - Data download urls
     * @instance
     */
    this.state = {
      current: null,
      deck: null,
      error: null,
      info: null,
      loading: true
    }

    /**
     * @property {firebase.database.Reference} subscription - Reference to
     * database location to watch for changes
     * @instance
     */
    this.subscription = props.database.core.ref('current')
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
      current, database, deck, error, info, loading, mobile, position, storage, test, urls
    } = props

    const { NODE_ENV } = process.env

    if ((NODE_ENV === 'development' && test) || NODE_ENV === 'test') {
      return {
        current, database, deck, error, info, loading, mobile, position, storage, urls
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
   * @async
   * @returns {undefined}
   * @throws {GeneralError | NotFound}
   */
  async componentDidMount() {
    console.info('Application mounted.')

    document.title = 'DiamondbackTV'

    // Get the current deck id and subscribe to data changes
    await this.sync()
    this.subscribe()

    this.setState({ loading: false })
  }

  /**
   * Unsubscribes from data changes.
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    this.subscription.off()
  }

  /**
   * Returns the web application.
   * If an error is caught, the Application will push to an error screen.
   *
   * @returns {<Fragment/>} <Deck> and <Navigation> components
   */
  render() {
    const { current, deck, error, loading, info } = this.state

    // Handle error and loading states
    if (error) return <Error error={error} info={info} />
    if (loading) return <Loading />

    return (
      <Fragment>
        <Header container>
          <Logo />
        </Header>
        <Deck error={this.error} fetch={this.fetch} id={current} deck={deck} />
      </Fragment>
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
   * Subscribes to changes at the database node 'current'. The value of this
   * node contains the folder name of the current deck data.
   *
   * @returns {Promise<object>} Object containing the deck download URLs
   */
  subscribe = () => {
    const { current } = this.state

    try {
      this.subscription.on('value', snapshot => {
        const id = snapshot.val()

        this.setState({ current: id }, async () => {
          if (current && current !== id) {
            console.info('SUBSCRIPTION - DECK CHANGE DETECTED ->', current, id)
            return this.sync()
          }
        })
      })
    } catch (err) {
      this.error(new GeneralError(`SUBSCRIPTION ERR -> ${err.message}`))
    }
  }

  /**
   * Retreives the id of the current deck and updates the internal state with
   * the current id and data.
   *
   * @async
   * @returns {Promise<string>} Name of current deck
   */
  sync = async () => {
    this.fetch(true)
    console.warn('Fetching current deck...')

    let id = null

    try {
      // Get the id (folder name) of the current deck data
      id = (await this.subscription.once('value')).val()
    } catch (err) {
      err.message = `SYNC ERR - CANNOT GET ID -> ${err.message}`
      this.error(new GeneralError(err))
    }

    if (!id) {
      this.error(new NotFound('SYNC ERR - ID DOES NOT EXIST', {
        errors: { exists: false }
      }))
    } else {
      this.setState({ current: id }, () => {
        console.info('SYNC - RETREIVED DECK ID ->', id)
      })
    }

    let deck = null

    try {
      const ref = this.props.database.decks.ref(id)
      deck = (await ref.once('value')).val()

      return this.setState({ deck }, () => {
        console.info('SYNC - RETREIVED DECK DATA ->', deck)
        return id
      })
    } catch (err) {
      err.message = `SYNC ERR - CANNOT GET DECK DATA -> ${err.message}`
      this.error(new GeneralError(err))
    }
  }
}
