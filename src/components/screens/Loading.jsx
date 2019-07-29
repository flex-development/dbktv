// Packages
import { h, Component } from 'preact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

// Components
import { Container, Heading } from '../atoms'
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
  componentDidMount() {
    document.title = 'DiamondbackTV is loading...'
  }

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
