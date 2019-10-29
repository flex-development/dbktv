// Packages
import React, { Component } from 'react'

// Components
import { Articles, Default, Multimedia, News } from '.'

/**
 * Component representing a deck slide.
 *
 * @todo Update documentation
 *
 * @class Slide
 * @extends Component
 * @author Lexus Drumgold <lex@flexdevelopment.llc>
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
     * @instance
     */
    this.state = { duration: 0, next: -1, template: null, type: '' }

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
   * Based on @see @param props.data, the internal slide state will be
   * updated.
   *
   * @todo Update documentation
   *
   * @param {object} props - Incoming component properties
   * @param {object} state - Incoming component state
   * @returns {object | null}
   */
  static getDerivedStateFromProps(props, state) {
    const { component, content, next, position } = props.data
    const { duration } = content

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

    return {
      duration,
      next,
      position,
      template,
      type: component.toLowerCase()
    }
  }

  /**
   * Once the component has mounted, the current slide position and data will
   * be synced with the @see @class Deck component. Afterwards, a slide timer
   * will be set to push to the next slide.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    // const { context, sync } = this.props
    // const { duration, next, position } = this.state

    // sync({ data: context[position], position })

    // this.timer = setTimeout(() => {
    //   sync({ data: context[next], position: next })
    // }, process.env.NODE_ENV === 'development' ? 5000 : duration)
  }

  /**
   * Clears the current slide timer.
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    // clearInterval(this.timer)
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
}
