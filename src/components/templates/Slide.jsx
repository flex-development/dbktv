// Packages
import React, { Component } from 'react'

// Components
import { Articles, Default, Multimedia, News } from '.'

/**
 * @file Component representing a deck slide.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Slide extends Component {
  /**
   * Creates a new deck slide.
   *
   * @param {object} props - Component properties
   * @returns {slide}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Internal component state
     * @property {object | null} state.data - Slide data
     * @property {Component | null} state.template - Template component
     * @property {string | null} state.type - Name of template in lowercase
     * @instance
     */
    this.state = { data: null, template: null, type: null }

    /**
     * @property {string} timer - Interval id of current slide timer
     * @instance
     */
    this.timer = ''
  }

  /**
   * getDerivedStateFromProps is invoked right before calling the render method,
   * both on the initial mount and on subsequent updates. It should return an
   * object to update the state, or null to update nothing.
   *
   * Based on @see @param props.location, the internal slide state will be
   * updated.
   *
   * The internal mobile state will also be updated.
   *
   * @todo Update documentation
   *
   * @param {object} props - Incoming component properties
   * @param {object} state - Incoming component state
   * @returns {object | null}
   */
  static getDerivedStateFromProps(props, state) {
    const { next, slide } = props.location.state
    const { component, content, duration } = slide

    let template = null

    if (component === 'Articles') {
      template = <Articles content={content} />
    } else if (component === 'Multimedia') {
      template = <Multimedia content={content} />
    } else if (component === 'News') {
      template = <News content={content} />
    } else {
      template = <Default />
    }

    return { content, duration, next, template, type: component.toLowerCase() }
  }

  /**
   * After the component has mounted, the internal state will be updated with
   * the name of the current template component, the template to render, and the
   * data associated with it.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { pos, state } = this.props.location
    pos(state.slide.position)
    // this.start(true)
  }

  /**
   * Clears the slide timer
   */
  componentWillUnmount() {
    // this.start(false)
  }

  /**
   * Renders <section> element with the base class 'adt-slide'.
   *
   * @todo Update documentation
   * @returns {HTMLElement}
   */
  render() {
    const { className, id } = this.props
    const { template, type } = this.state
    const style = `adt-slide ${type} ${className || ''}`

    if (type) style.replace('adt-slide', `adt-slide ${type}`)

    return (
      <section id={id} className={style.trim()}>
        {template}
      </section>
    )
  }

  // Helpers

  /**
   * Based on the current component properties, the method updates the internal
   * state with the name of the component in lowercase and the template
   * component to be rendered.
   *
   * @returns {string} Name of component in lowercase
   */
  choose = () => {
    const { className, component, id, ...data } = this.props

    let template = null

    if (component === 'Articles') {
      template = <Articles {...data} />
    } else if (component === 'Multimedia') {
      template = <Multimedia {...data} />
    } else if (component === 'News') {
      template = <News {...data} />
    } else {
      template = <Default />
    }

    const state = { data, template, type: component.toLowerCase() }
    return this.setState(state, () => state.type)
  }

  /**
   * Starts the slide timer if @see @param start is true. Otherwise, the
   * interval will be cleared.
   *
   * @param {boolean} start - True to start timer. False to clear interval
   * @returns {string | undefined}
   */
  start = start => {
    const { duration } = this.state

    if (start) {
      this.timer = setTimeout(() => {
        this.props.history.goForward()
      }, process.env.NODE_ENV === 'development' ? 5000 : duration)
    } else {
      return clearInterval(this.timer)
    }
  }
}
