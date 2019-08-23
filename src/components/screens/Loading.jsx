// Packages
import React, { Component } from 'react'

// Components
import { Container } from '../atoms'
import { Loading as LoadingMolecule } from '../molecules'

/**
 * Class representing the loading screen.
 *
 * @todo Update documentation
 *
 * @class Loading
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Loading extends Component {
  /**
   * Updates the document title.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    document.title = 'Loading DiamondbackTV'
  }

  /**
   * Renders a <main> element representing the loading screen. Displays the
   * DiamondbackTV logo, the dbknews.com plug, and a loading spinner.
   *
   * @param {object} props - Component properties
   * @param {object} state - Component state
   * @returns {HTMLElement} <main> element
   */
  render() {
    const { className, id } = this.props

    return (
      <main id={id} className={(`ads-loading ${className || ''}`).trim()}>
        <Container>
          <LoadingMolecule />
        </Container>
      </main>
    )
  }
}
