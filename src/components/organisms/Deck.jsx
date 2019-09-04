// Packages
import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
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
      position: 0,
      slides: slides.map((slide, i) => {
        slide.id = `/slides/${i + 1}`
        slide.next = i === count - 1 ? `/slides/1` : `/slides/${i + 2}`
        slide.position = i
        return slide
      })
    }
  }

  componentDidCatch(error, info) {
    return this.props.error(error, info)
  }

  componentDidMount() {
    console.info('Deck mounted.')

    // Update internal mobile state and attach window listener to update it
    this.resize()
    $(window).resize(this.resize())
  }

  /**
   * Renders a <main> element with the id 'deck' and the class name 'ado-deck'.
   * Inside the container, the Navigation and Ticker will be rendered as well.
   *
   * @returns {HTMLElement} <main id='deck' class='ado-deck'>
   */
  render() {
    const { mobile, slides } = this.state

    return (
      <Fragment>
        <Navigation mobile={mobile}>
          {slides.map((slide, i) => {
            return (
              <NavLink
                to={slide.id} key={`nav-btn-${i}`}
                className='ada-link' isActive={() => this.active(i)}
              >
                <SquareIcon />
              </NavLink>
            )
          })}
        </Navigation>
        <main id='deck' className='ado-deck'>
          {slides.map((slide, i) => {
            return (
              <Route
                exact={i === 0} key={slide.id} path={slide.id}
                render={props =>
                  <Slide {...props} {...slide} push={this.push} />}
              />
            )
          })}
        </main>
      </Fragment>
    )
  }

  // HELPERS

  /**
   * Returns true if the window path matches the path of the current slide.
   *
   * @param {number} position - Position of slide
   * @returns {boolean}
   */
  active = position => {
    const { slides } = this.state
    return window.location.pathname === slides[position].id
  }

  /**
   * Returns the data for the current slide.
   *
   * @returns {object | null} - Data for current slide
   */
  current = () => {
    const { position, slides } = this.state
    return slides ? slides[position] : null
  }

  /**
   * Updates the internal deck position state.
   *
   * @param {number} position - Position of current slide
   * @returns {number} @see @param position
   */
  push = position => this.setState({ position }, () => position)

  /**
   * Updates the internal mobile state.
   *
   * @returns {undefined}
   */
  resize = () => this.setState({ mobile: $(window).width() <= 768 })
}
