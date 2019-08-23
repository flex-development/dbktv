// Packages
import React, { Component } from 'react'
import $ from 'jquery'

// Components
import Article from './Article'

/**
 * Class representing the "Top News" template.
 *
 * @todo Update documentation
 *
 * @class News
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class News extends Component {
  /**
   * If an error is caught, the component the error will be handed off to the
   * @see @class App component.
   *
   * @param {FeathersError | Error} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    return this.props.catch(error, info)
  }

  /**
   * Updates the document title and deck background image.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { content, duration, next, title, slide } = this.props

    document.title = `Top News: ${title}`
    $('.ado-deck').css('background-image', `url(${content.image.src})`)
    setTimeout(() => slide(next), duration)
  }

  /**
   * Removes the deck background image.
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    $('.ado-deck').css('background-image', 'none')
  }

  /**
   * Renders a <section> element representing the "Top News" template.
   *
   * @returns {HTMLElement} <section> element
   */
  render() {
    const { className, content, id } = this.props

    return (
      <section id={id} className={`adt-news ${className || ''}`.trim()}>
        <Article category='top news' {...content} feature />
      </section>
    )
  }
}
