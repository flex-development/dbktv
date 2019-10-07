// Packages
import React, { Component } from 'react'

// Components
import { Articles, Default, Multimedia, News, Preview } from '.'

/**
 * @file Component representing a deck slide.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Slide extends Component {
  /**
   * Creates a new deck slide component
   *
   * @param {object} props - Component properties
   * @returns {Slide}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Internal component state
     * @property {object | null} state.content - Slide data
     * @property {Component | null} state.template - Template component
     * @property {string | null} state.type - Name of template in lowercase
     * @instance
     */
    this.state = { content: null, next: null, template: null, type: null }

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
    const { content, filepath, mobile, next } = props.location.state
    const { duration } = content

    let template = null
    let component

    if (mobile) {
      template = <Preview data={{ component, content }} />
    } else {
      if (filepath.includes('/content/slides/group')) {
        component = 'Articles'
        template = <Articles content={content} />
      } else if (filepath.includes('/content/slides/multimedia')) {
        component = 'Multimedia'
        template = <Multimedia content={content} />
      } else if (filepath.includes('/content/slides/news')) {
        component = 'News'
        template = <News content={content} />
      } else {
        component = 'Default'
        template = <Default />
      }
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
    const { pos, position } = this.props.location.state
    pos(position)
    this.start(true)
  }

  /**
   * Clears the slide timer
   */
  componentWillUnmount() {
    this.start(false)
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
   * Starts the slide timer if @see @param start is true. Otherwise, the
   * interval will be cleared.
   *
   * @param {boolean} start - True to start timer. False to clear interval
   * @returns {string | undefined}
   */
  start = start => {
    const { duration, next } = this.state

    if (start) {
      const { content, path } = next

      this.timer = setTimeout(() => {
        this.props.history.push(path, content.state)
      }, process.env.NODE_ENV === 'development' ? 7500 : duration)
    } else {
      return clearInterval(this.timer)
    }
  }
}
