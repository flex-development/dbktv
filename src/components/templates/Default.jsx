// Packages
import React, { Component } from 'react'

// Components
import { Container } from '../atoms'
import { Logo } from '../molecules'

/**
 * Component representing the default slide.
 *
 * @class Default
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Default extends Component {
  /**
   * After the component has mounted, the window title will be updated.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    document.title = `Continue reading on dbknews.com`
  }

  /**
   * Renders a <div> element representing the default slide.
   *
   * The default slide displays the DiamondbackTV logo and 'Continue reading
   * on dbknews.com' beneath the logo.
   *
   * @returns {HTMLDivElement} <div class='adt-default'>
   */
  render() {
    const { className, id } = this.props

    return (
      <div id={id} className={`adt-default ${className || ''}`.trim()}>
        <Container>
          <Logo plug />
        </Container>
      </div>
    )
  }
}
