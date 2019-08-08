// Packages
import { h, Component } from 'preact'

// Components
import { Container, Heading } from '../atoms'

/**
 * Class representing an error screen.
 *
 * @todo Transforms all errors to FeathersError via getDerivedStateFromProps
 *
 * @class Error
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Error extends Component {
  /**
   * Sets the error name as the document title.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { error } = this.props
    document.title = `${error.name}: ${error.message}`
  }

  /**
   * Renders a <main> element representing an error screen.
   *
   * The page will display the error name, message, and info, if it is defined.
   *
   * @param {object} props - Component properties
   * @property {FeathersError} props.error - Current error
   * @property {string} props.error.message - Current error message
   * @property {object} props.info - Error info
   * @param {object} state - Component state
   * @returns {HTMLElement} <main> element
   */
  render(props, state) {
    const { className, error, id, info } = props
    const style = (`ads-error ${error.className} ${className || ''}`).trim()

    return (
      <main id={id} className={style}>
        <Container>
          <Heading>Sorry, there was an error.</Heading>
          <code><span>{error.name}</span>&nbsp;{error.message}</code>
          <code>{info}</code>
        </Container>
      </main>
    )
  }
}
