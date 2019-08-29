// Packages
import React, { Component, Fragment } from 'react'
import axios from 'axios'
import $ from 'jquery'

// Components
import { SquareIcon } from '../atoms'
import { Logo } from '../molecules'
import AutoScroll from './AutoScroll'
import Footer from './Footer'
import Navigation from './Navigation'
import { Articles, Default, Multimedia, News } from '../templates'

// Utilities
import error_utils from '../../utils/error.util'

/**
 * Component representing the slide deck
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
   * @param {Function} props.error - Error handling function
   * @param {Function} props.fetch - Load handling function
   * @param {string} props.id - Id of current deck
   * @returns {Deck}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Internal component state
     * @property {number} state.count - Total # of slides in deck
     * @property {number} state.duration - Deck duration in ms
     * @property {boolean} state.mobile - True if viewport width <= 768px
     * @property {boolean} state.paused - True if deck is paused
     * @property {number} state.position - ID of current slide. Defaults to -1
     * @property {object[]} state.slides - Slide content
     * @property {object[]} state.ticker - Autoscroll content objects
     * @instance
     */
    this.state = {
      count: 0,
      duration: 0,
      mobile: false,
      paused: false,
      position: 0,
      slides: null,
      ticker: null
    }

    // Add Axios interceptor
    axios.interceptors.response.use(response => response, error => {
      const { feathers } = error_utils
      let data = null

      if (error.response) data = error.response.data
      if (error.request) data = error.request

      return feathers(error, data, error.response ? error.response.status : 500)
    })
  }

  /**
   * Sanitizes the incoming deck data.
   *
   * @todo Update documentation
   *
   * @param {object} props - Incoming props
   * @param {object} state - Component state
   * @returns {object | null} Object to update the state, or null to update
   * nothing
   */
  static getDerivedStateFromProps(props, state) {
    const { deck } = props

    const count = deck.slides.length

    return {
      count,
      slides: deck.slides.map((slide, i) => {
        slide.next = i === count - 1 ? 0 : i + 1
        return slide
      }),
      ticker: deck.ticker
    }
  }

  componentDidCatch(error, info) {
    return this.props.error(error, info)
  }

  componentDidMount() {
    console.info('Deck mounted.')

    this.resize()

    // Attach window listeners to update internal paused and mobile state
    $(window).keyup(event => this.pause(event))
    $(window).resize(this.resize())
  }

  /**
   * Renders a <main> element with the id 'deck' and the class name 'ado-deck'.
   * Inside the container, the Navigation and Ticker will be rendered as well.
   *
   * @returns {HTMLElement} <main id='deck' class='ado-deck'>
   */
  render() {
    const { deck } = this.props
    const { mobile, position } = this.state

    // Get current slide
    const curr = deck.slides[position]

    const props = {
      ...curr, catch: this.props.error, slide: this.slide
    }

    let template = null

    switch (curr.component) {
      case 'News':
        template = <News {...props} />
        break
      case 'Articles':
        template = <Articles {...props} />
        break
      case 'Multimedia':
        template = <Multimedia {...props} />
        break
      default:
        template = <Default {...props} />
    }

    // Get position of active slide
    const active = pos => deck.slides.find((s, i) => (
      pos === i && curr.next === s.next
    ))

    return (
      <Fragment>
        <Navigation mobile={mobile}>
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
            <AutoScroll content={deck.ticker} />
          </Footer>
        </main>
      </Fragment>
    )
  }

  // HELPERS

  /**
   * The space key can be pressed to stop and start the deck. The internal pause
   * state will be updated.
   *
   * @param {Event} event - Key event
   * @returns {number} 1 if the state was updated, -1 otherwise
   */
  pause = event => {
    const { code } = event

    let paused = -1

    if (code === 'Space') {
      this.setState(state => ({ paused: state.paused !== true }))
      paused = 1
    }

    return paused
  }

  /**
   * Updates the internal mobile state.
   *
   * @returns {undefined}
   */
  resize = () => this.setState({ mobile: $(window).width() <= 768 })

  /**
   * Updates the current deck slide. If @param id is defined, the internal deck
   * position will be updated. If undefined, the deck will handle slide
   * transitions.
   *
   * @param {number | undefined} id - ID of next slide
   * @returns {undefined}
   */
  slide = id => {
    const { position } = this.state
    const { deck } = this.props
    const { slides } = deck

    let curr = null
    let title = null
    let pos = -1

    if (id) {
      /** Get next slide based on @param id */
      curr = slides[id]
      pos = id
      title = curr.title
    } else {
      /** Get current slide and next slide based on internal state  */
      curr = slides[position]
      pos = curr.next

      const next = slides[pos]
      title = next.title

      /** Update current slide */
      curr = next
    }

    // Log the change
    if (!['staging', 'production'].includes(this.env)) {
      console.warn('CHG ->', title)
    }

    // Update internal state
    this.setState({ position: pos }, () => pos)
  }
}
