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
   * The header will be hidden and the footer will have a border applied.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { content } = this.props
    const { media } = content

    document.title = `Gallery: ${media.video ? media.caption : media.alt}`

    $('.ado-header').addClass('ui-hide')
    $('.ado-footer').addClass('multimedia-border')
  }

  /**
   * Before the component unmounts, the ui will be reset to its default state.
   * The header will reappear and the footer border will be removed.
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    $('.ado-header').removeClass('ui-hide')
    $('.ado-footer').removeClass('multimedia-border')
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
