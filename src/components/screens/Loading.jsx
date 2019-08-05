// Packages
import { h, Component } from 'preact'

// Components
import { Container } from '../atoms'
import { Loading as LoadingMolecule } from '../molecules'

/**
 * Class representing the loading screen.
 *
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
  componentDidMount() { document.title = 'DiamondbackTV' }

  /**
   * Renders a <main> element representing the loading screen.
   *
   * Displays the DiamondbackTV logo, the dbknews.com plug, and a loading
   * spinner.
   *
   * @param {object} props - Component properties
   * @param {object} state - Component state
   * @returns {HTMLElement} <main> element
   */
  render(props, state) {
    const { className, id } = props

    return (
      <main id={id} className={(`ads-loading ${className || ''}`).trim()}>
        <Container>
          <LoadingMolecule />
        </Container>
      </main>
    )
  }
}
