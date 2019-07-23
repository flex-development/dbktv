// Packages
import { h, Component } from 'preact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

// Components
import { Container, Heading } from '../atoms'
import { Loading } from '../molecules'

/**
 * Class representing the landing page.
 *
 *
 * @class Landing
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Landing extends Component {
  /**
   * Updates the document title.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    document.title = 'Loading DiamondbackTV 📺'
  }

  /**
   * Renders a <main> element representing a landing page.
   *
   * Displays the DiamondbackTV logo loading spinner.
   *
   * @param {object} props - Component properties
   * @param {object} state - Component state
   * @returns {HTMLElement} <main> element
   */
  render(props, state) {
    const { className, id } = props
    const style = (`adp-landing ${className || ''}`).trim()

    return (
      <main id={id} className={style}>
        <Container>
          <Loading />
        </Container>
      </main>
    )
  }
}
