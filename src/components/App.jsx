// Packages
import React, { Component, Fragment } from 'react'
import { BadRequest } from '@feathersjs/errors'
import $ from 'jquery'

// Components
import { SquareIcon } from './atoms'
import { Logo } from './molecules'
import { AutoScroll, Header, Footer, Navigation } from './organisms'
import { Articles, Default, Multimedia, News } from './templates'
import { Error, Loading } from './screens'

// Mock data
import mock from '../config/test.json'

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
   * @param {object} props.deck - Deck info and slides
   * @param {number} props.deck.count - Total # of slides in deck
   * @param {number} props.deck.duration - Deck duration in ms
   * @param {object[]} props.deck.slides - Slide content
   * @param {FeathersError | null} props.error - Current error
   * @param {boolean} props.fetching - True if fetching content
   * @param {object | string | null} props.info - Error info or stack
   * @param {object} props.links - Autoscroll content
   * @param {object[]} props.links.items - Autoscroll content objects
   * @param {boolean} props.mobile - True if viewport width <= 768px
   * @param {number} props.position - ID of current slide
   * @returns {App}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Internal component state
     * @property {object} props.deck - Deck info and slides
     * @property {number} props.deck.count - Total # of slides in deck
     * @property {number} props.deck.duration - Deck duration in ms
     * @property {object[]} props.deck.slides - Slide content
     * @property {FeathersError | null} props.error - Current error
     * @property {boolean} props.fetching - True if fetching content
     * @property {object | string | null} props.info - Error info or stack
     * @property {object} props.links - Autoscroll content
     * @property {object[]} props.links.items - Autoscroll content objects
     * @property {boolean} props.mobile - True if viewport width <= 768px
     * @property {number} props.position - ID of current slide. Defaults to -1
     * @instance
     */
    this.state = {
      deck: null,
      error: null,
      fetching: true,
      info: null,
      links: null,
      mobile: false,
      position: -1
    }
  }

  /**
   * Retreives the initial slide deck content.
   *
   * @todo Replace mock with API call
   *
   * @async
   * @returns {object}
   */
  static async fetch() {
    console.warn('Fetching initial slide deck data...')

    let fetch = { deck: null, links: null }

    try {
      fetch = await mock
    } catch (err) {
      throw new BadRequest('FETCH ERR  ->', err.message)
    }

    console.info('Retreived slide deck data ->', fetch)
    return fetch
  }

  /**
   * In a 'test' Node environment, this method will return an object to update
   * the initial internal state for debugging / testing purposes. Otherwise,
   * this method will return null.
   *
   * @param {object} props - @see @class App#constructor
   * @param {object} state - @see @class App#constructor
   * @returns {object | null}
   */
  static getDerivedStateFromProps(props, state) {
    if (process.env.NODE_ENV !== 'test') return null

    const { deck, error, fetching, info, links, mobile, position } = props
    return { deck, error, fetching, info, links, mobile, position }
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
    return this.setState({ error, info }, () =>
      console.error('!TV-ERR =>', error)
    )
  }

  /**
   * Fetches the initial slide deck data and then subscribes to new data
   * changes. When the slide deck has children added, removed, or rearranged,
   * the internal state will be updated.
   *
   * @todo Subscribe to data changes from the API
   *
   * @async
   * @returns {undefined}
   */
  async componentDidMount() {
    console.info('Application mounted.')

    try {
      const fetch = await App.fetch()
      const update = { ...fetch, fetching: false, position: 0 }

      // TODO: Remove loading delay
      setTimeout(() => this.setState(update), 1250)
    } catch (err) {
      this.handle_error(err)
    }

    // TODO: Subscribe to data changes

    // Update mobile state and attach window listener to update mobile state
    this.resize()
    $(window).resize(this.resize())
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
   * Returns the web application.
   * If an error is caught, the Application will push to an error screen.
   *
   * @returns {<Fragment/>} <Deck> and <Navigation> components
   */
  render() {
    const { deck, error, fetching, info, links, mobile, position } = this.state

    // Handle error and loading states
    if (error) return <Error error={error} info={info} />
    if (fetching) return <Loading />

    // Handle successful API response
    const curr = deck.slides[position]

    let template = null
    const dispatch = {
      ...curr, catch: this.handle_error, slide: this.slide
    }

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
      const curr = deck.slides[position]
      return pos === i && curr.next === s.next
    })

    return (
      <Fragment>
        <Header container>
          <Logo />
        </Header>
        <Navigation mobile={mobile} catch={this.handle_error}>
          {deck.slides.map((slide, i) => {
            return (
              <SquareIcon
                className={active(i) ? 'active' : ''} key={`si-${i}`}
              />
            )
          })}
        </Navigation>
        <main id='deck' className='ado-deck'>
          {template}
          <Footer>
            <Logo mini />
            <AutoScroll content={links} />
          </Footer>
        </main>
      </Fragment>
    )
  }

  /**
   * Updates the internal mobile state.
   *
   * @returns {undefined}
   */
  resize = () => this.setState({ mobile: $(window).width() <= 768 })

  /**
   * Updates the current deck slide.
   *
   * @param {number} next - ID of next slide
   * @returns {undefined}
   */
  slide = () => {
    const { deck, position } = this.state
    const { slides } = deck

    // Slide currently being viewed
    const curr = slides[position]
    const next = slides[curr.next]

    console.warn('CHG ->', next.title)

    return this.setState({ position: curr.next }, () =>
      console.info('CURR ->', next.title)
    )
  }
}
