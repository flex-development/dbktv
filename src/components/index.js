// Packages
import { h, Component, Fragment } from 'preact'
import { BadRequest } from '@feathersjs/errors'
import $ from 'jquery'

// Components
import { SquareIcon } from './atoms'
import { Logo } from './molecules'
import { AutoScroll, Header, Deck, Navigation, Footer } from './organisms'
import { Articles, Default, Multimedia, News } from './templates'
import { Error, Loading } from './screens'

// Styles
import '../style/app.sass'

// Mock data
import mock_deck from '../../tests/__mocks__/Deck.mock.json'
import mock_scroll from '../../tests/__mocks__/Autoscroll.mock.json'

/**
 * Class representing the web application.
 *
 * @todo Move template slide functionality to @see @class Deck
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
     * @property {object | null} state.curr - Current slide
     * @property {object | undefined} state.curr.content - Slide content
     * @property {number} state.curr.duration - Slide duration in ms
     * @property {string} state.curr.id - Slide ID
     * @property {number} state.curr.next - ID of next slide
     * @property {string} state.curr.path - Slide URL
     * @property {string} state.curr.title - Slide title
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
      curr: null,
      deck: null,
      error: null,
      info: null,
      loading: true,
      mobile: false
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

    // Update mobile state and attach window listener to update mobile state
    this.setState({ mobile: this.mobile() })
    $(window).resize(this.resize())

    try {
      // Get initial data
      const { deck, scroll } = await this.get_data()
      this.setState({ curr: deck.slides[0], deck, scroll })
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
    this.setState({ loading: true }, () =>
      console.warn('TODO: Request deck and footer data from API.')
    )

    try {
      // TODO: Request data from API
      return { deck: mock_deck, scroll: mock_scroll }
    } catch (err) {
      throw new BadRequest('Unable to get deck ->', err.message)
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
   * Updates @see state.curr .
   *
   * @param {number} next - ID of next slide
   * @returns {undefined}
   */
  handle_slide = next => {
    const { deck } = this.state

    console.warn('Changing slides. Next slide:', deck.slides[next].title)

    return this.setState({
      curr: deck.slides[next]
    }, () => console.info('Current slide ->', deck.slides[next].title))
  }

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
   * @returns {<Fragment/>} <Header> and <Deck> components
   */
  render(props, state) {
    const { curr, deck, error, info, loading, mobile, scroll } = state

    // Handle error state
    if (error) return <Error error={error} info={info} />

    // Handle loading state
    if (loading) return <Loading />

    // Handle successful API response

    // Get template props
    const dispatch = {
      ...curr,
      catch: this.handle_error,
      loading: this.handle_loading,
      slide: this.handle_slide
    }

    // Get template to render

    let template

    switch (curr.component) {
      case 'News':
        template = <News {...dispatch} />
        break
      case 'Articles':
        template = <Articles {...dispatch} />
        break
      case 'Multimedia':
        template = <Multimedia {...dispatch} />
        break
      default:
        template = <Default {...dispatch} />
    }

    // Get position of active slide
    const active = pos => deck.slides.find((s, i) => {
      return pos === i && curr.next === s.next
    })

    return (
      <Fragment>
        <Header container>
          <Logo />
        </Header>
        <Navigation mobile={mobile} catch={dispatch.catch}>
          {deck.slides.map((slide, i) => {
            return <SquareIcon className={active(i) ? 'active' : ''} />
          })}
        </Navigation>
        <Deck
          catch={this.handle_error}
          curr={curr}
          loading={this.handle_loading}
          slide={this.handle_slide}
          template={template}
        >
          <Footer>
            <Logo mini />
            <AutoScroll scroll={scroll} />
          </Footer>
        </Deck>
      </Fragment>
    )
  }

  /**
   * Updates the internal mobile state.
   *
   * @returns {undefined}
   */
  resize = () => this.setState({ mobile: this.mobile() })
}
