// Packages
import React, { Component } from 'react'
import $ from 'jquery'

// Components
import Article from './Article'

/**
 * Component representing the "Top News" template.
 * This template should be used to display a feature article.
 *
 * @class News
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class News extends Component {
  /**
   * After the component has mounted, the document title and deck background
   * image will be updated and the @see @class Deck timer will be started.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { content, time } = this.props
    const { headline, image } = content

    document.title = `Top News: ${headline.text}`
    $('.ado-deck').css('background-image', `url(${image.src})`)
    time()
  }

  /**
   * Before the component unmounts, the deck background image will be removed
   * and the @see @class Deck timer will be stopped.
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    const { time } = this.props

    $('.ado-deck').css('background-image', 'none')
    time(false)
  }

  /**
   * Renders a <section> element representing the "Top News" template.
   *
   * @todo Update documentation
   * @returns {HTMLElement} <section> element
   */
  render() {
    const { className, content, id } = this.props

    return (
      <div id={id} className={`adt-news ${className || ''}`.trim()}>
        <Article category='top news' {...content} feature />
      </div>
    )
  }
}
