// Packages
import React, { Component, Fragment } from 'react'
import $ from 'jquery'

// Components
import Navigation from './Navigation'
import { SquareIcon } from '../atoms'
import { Slide } from '../templates'

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
     * @property {boolean} state.dispatched - True if slide was rendered
     * @property {number} state.duration - Deck duration in ms
     * @property {boolean} state.mobile - True if viewport width <= 768px
     * @property {boolean} state.paused - True if deck is paused
     * @property {number} state.position - ID of current slide. Defaults to -1
     * @property {object[]} state.slides - Slide content
     * @instance
     */
    this.state = {
      count: 0,
      dispatched: false,
      duration: 0,
      mobile: false,
      paused: false,
      position: 0,
      slides: null
    }

    /**
     * @property {string} timer - Interval id
     */
    this.timer = ''
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
    const { slides } = props

    const count = slides.length
    const durations = slides.map(slide => slide.duration)

    return {
      duration: durations.reduce((total, value) => total + value),
      count,
      slides: slides.map((slide, i) => {
        slide.id = `slide-${i}`
        slide.next = i === count - 1 ? 0 : i + 1
        return slide
      })
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

  componentWillUnmount() {
    this.time(false)
  }

  /**
   * Renders a <main> element with the id 'deck' and the class name 'ado-deck'.
   * Inside the container, the Navigation and Ticker will be rendered as well.
   *
   * @returns {HTMLElement} <main id='deck' class='ado-deck'>
   */
  render() {
    const { error } = this.props
    const { mobile, position, slides } = this.state

    // Get current slide
    const curr = slides[position]
    const dispatch = {
      ...curr, catch: error, slide: this.next, time: this.time
    }

    return (
      <Fragment>
        <Navigation mobile={mobile}>
          {slides.map((slide, i) => {
            return (
              <SquareIcon
                className={this.active(i) ? 'active' : ''}
                key={`nav-btn-${i}`}
              />
            )
          })}
        </Navigation>
        <main id='deck' className='ado-deck'>
          <Slide {...dispatch} />
        </main>
      </Fragment>
    )
  }

  // HELPERS

  /**
   * Gets the position of the current slide.
   *
   * @todo Update documentation
   *
   * @returns {boolean}
   */
  active = pos => {
    const { position, slides } = this.state
    const curr = slides[position]

    return slides.find((s, i) => curr.next === s.next && pos === i)
  }

  dispatch = dispatched => this.setState({ dispatched }, () => dispatched)

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
   * Updates the current deck slide. If @param id is defined, the internal deck
   * position will be updated. If undefined, the deck will handle slide
   * transitions.
   *
   * @param {number | undefined} id - ID of next slide
   * @returns {undefined}
   */
  next = id => {
    const { position } = this.state
    const { slides } = this.props

    let curr = null
    let pos = -1

    if (id) {
      /** Get next slide based on @param id */
      curr = slides[id]
      pos = id
    } else {
      /** Get current slide and next slide based on internal state  */
      curr = slides[position]
      pos = curr.next

      const next = slides[pos]

      /** Update current slide */
      curr = next
    }

    // Log the change
    if (!['staging', 'production'].includes(this.env)) {
      console.warn('CHG ->', curr)
    }

    // Update internal state
    this.setState({ position: pos }, () => pos)
  }

  /**
   * Updates the internal mobile state.
   *
   * @returns {undefined}
   */
  resize = () => this.setState({ mobile: $(window).width() <= 768 })

  time = time => {
    if (time) {
      const { duration, next, slide } = this.props
      this.timer = setTimeout(() => slide(next), duration)
    } else {
      clearInterval(this.timer)
    }
  }
}
