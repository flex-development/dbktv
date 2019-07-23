// Packages
import { h, Component } from 'preact'

// Components
import { Container, Heading } from '../atoms'

/**
 * Class representing an error page.
 *
 * @todo Check props with getDerivedStateFromProps and render error from
 * Component state instead of props
 *
 * @class ErrorScreen
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class ErrorScreen extends Component {
  /**
   * Sets the error name as the document title.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { error, info } = this.props
    document.title = `${error.name}: ${error.message}`
  }

  /**
   * Renders a <main> element representing an error. The page will display @see
   * @param props.error.message and @see @param props.info .
   *
   * @param {object} props - Component properties
   * @property {FeathersError} props.error - Current error
   * @property {object} props.info - Error info
   * @param {object} state - Component state
   * @returns {HTMLElement} <main> element
   */
  render(props, state) {
    const { className, error, id, info } = props
    const style = (`adp-error ${error.className} ${className || ''}`).trim()

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
