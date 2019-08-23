// Packages
import React, { Component, Fragment } from 'react'
import $ from 'jquery'

// Components
import { Link, SquareIcon } from '../atoms'

/**
 * Class representing an automated scroll content.
 *
 * @todo Refactor
 *
 * @class AutoScroll
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class AutoScroll extends Component {
  /**
   * @property {object} state - Component state
   * @property {number} state.pos - Initial scroll position
   */
  state = { pos: 0 }

  /**
   * If caught, @see @param error will be handed off to @see @class App.
   *
   * @param {FeathersError | Error} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    return this.props.catch(error, info)
  }

  /**
   * When the component mounts, the size of the logo will be adjusted.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { content } = this.props

    // Adjust logo size
    const constrain = `${content.count}rem`
    $('.ado-footer > .adm-logo').css({ maxWidth: constrain, width: constrain })
  }

  /**
   * Gets the new scroll position.
   *
   * @returns {number} New scroll position
   */
  position = () => {
    const { pos } = this.state

    const INTERVAL = 85
    const max = $('.ado-autoscroll')[0].scrollLeftMax
    const new_pos = pos + INTERVAL >= max ? 0 : pos + INTERVAL

    this.setState({ pos: new_pos })
    return new_pos
  }

  /**
   * Renders a <div> element with the base class 'ado-autoscroll'.
   *
   * @param {object} props - Component properties
   * @param {object} props.content - Autoscroll content
   * @param {number} props.content.count - Number of items to scroll through
   * @param {any[]} props.content.items - Scrolling items
   * @param {object | undefined} state
   */
  render() {
    const { className, content, id } = this.props

    // Start scrollbar
    setTimeout(() => {
      const position = this.position()
      $('.ado-autoscroll').animate({ scrollLeft: position }, 600)
    }, 1000)

    return (
      <div id={id} className={(`ado-autoscroll ${className || ''}`).trim()}>
        {content.items.map((item, i) => {
          return (
            <Fragment key={`autoscroll-${i}`}>
              <Link {...item} />&nbsp;<SquareIcon />&nbsp;
            </Fragment>
          )
        })}
      </div>
    )
  }
}
