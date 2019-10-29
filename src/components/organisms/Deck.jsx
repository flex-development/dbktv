// Packages
import React, { Component } from 'react'

// Context
import { MobileContext } from '../context'

// Components
import { Preview, Slide } from '../templates'

/**
 * Component representing the slide deck
 *
 * @class Deck
 * @extends Component
 * @author Lexus Drumgold <lex@flexdevelopment.llc>
 */
export default class Deck extends Component {
  /**
   * Creates a new slide deck.
   *
   * @param {object} props - Component properties
   * @param {object} props.curr - Current slide position and content
   * @param {object} props.curr.data - Current slide data
   * @param {number} props.curr.position - Index of current slide
   * @param {boolean} props.debug - True if non-production Node environment
   * @param {object[]} props.slides - Slide content
   * @param {Function} props.sync - Function to update internal current slide
   * position state in @see @class App
   * @returns {Deck}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Internal component state
     * @property {number} state.count - Total # of slides in deck
     * @property {object} state.curr - Current slide position and content
     * @property {object | null} state.curr.data - Current slide data
     * @property {number} state.curr.position - Index of current slide
     * @property {number} state.duration - Total deck duration in ms
     * @property {object[]} state.slides - Slide content
     * @instance
     */
    this.state = {
      count: 0,
      curr: { data: null, position: -1 },
      duration: 0,
      slides: []
    }
  }

  /**
   * Returns an object containing the number of slides in the deck, as well as
   * the total duration.
   *
   * @param {object} props - Incoming props
   * @param {object} state - Component state
   * @returns {object | null} Object to update the state, or null to update
   * nothing
   */
  static getDerivedStateFromProps(props, state) {
    const { slides } = props

    const durations = slides.map(slide => slide.content.duration)

    return {
      count: slides.length,
      duration: durations.reduce((total, value) => total + value),
      slides
    }
  }

  /**
   * In a 'development' or 'test' Node environment, this method will log that
   * the component has mounted.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { debug, slides } = this.props

    if (debug) console.info('Deck component mounted.')

    this.sync({ data: slides[0], position: 0 })
  }

  /**
   * Clears the current slide timer.
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  /**
   * Renders a <main> element with the id 'deck' and the class name 'ado-deck'.
   *
   * On large devices, the deck slides will be rendered inside of the container,
   * and only the current slide will be visible.
   *
   * On mobile devices, a list of deck slides will be displayed instead.
   *
   * @returns {HTMLElement} <main id="deck" class="ado-deck">
   */
  render() {
    const { slides, sync } = this.props
    const { curr } = this.state

    if (!curr.data) return null

    return (
      <main id='deck' className='ado-deck'>
        <MobileContext.Consumer>
          {({ mobile }) => mobile
            ? slides.map((slide, i) => <Preview data={slide} key={i} />)
            : <Slide data={curr.data} context={slides} sync={sync} />}
        </MobileContext.Consumer>
      </main>
    )
  }

  // HELPERS

  /**
   * Updates the current slide position and data.
   *
   * @param {object} curr - Current slide
   * @param {object} curr.data - Current slide data
   * @param {number} curr.position - Index of the current slide
   * @returns {number} @see @param curr.position
   */
  sync = ({ data, position }) => {
    const { slides } = this.state

    this.props.sync({ data, position })

    return this.setState({ curr: { data, position } }, () => {
      this.timer = setTimeout(() => {
        this.sync({ data: slides[data.next], position: data.next })
      }, process.env.NODE_ENV === 'development' ? 5000 : data.content.duration)
    })
  }
}
