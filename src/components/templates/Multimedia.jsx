// Packages
import React, { Component } from 'react'
import $ from 'jquery'

// Components
import { Figure } from '../molecules'

/**
 * Class representing the Multimedia template.
 * This template should be used to display an image or video.
 *
 * @class Multimedia
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Multimedia extends Component {
  /**
   * After the component has mounted, the document title and ui will be updated.
   * The footer will have a border applied.
   *
   * The @see @class Deck timer will be also started.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { content, time } = this.props
    const { media } = content

    document.title = `Gallery: ${media.video ? media.caption : media.alt}`

    $('.ado-deck').css('height', '92.5%')
    $('.ado-footer').addClass('multimedia-border')
    // $('.ado-nav').addClass('ui-hide')

    time()
  }

  /**
   * Before the component unmounts, the ui will be reset to its default state.
   * The footer border will be removed and the @see @class Deck timer will be
   * stopped.
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    const { time } = this.props

    $('.ado-deck').css('height', 'inherit')
    $('.ado-footer').removeClass('multimedia-border')
    // $('.ado-nav').removeClass('ui-hide')

    time(false)
  }

  /**
   * Renders a <section> element representing the "Multimedia" template.
   *
   * @todo Update documentation
   * @returns {HTMLElement} <section> element
   */
  render() {
    const { className, content, id } = this.props

    return (
      <div id={id} className={`adt-multimedia ${className || ''}`.trim()}>
        <Figure content={content} />
      </div>
    )
  }
}
