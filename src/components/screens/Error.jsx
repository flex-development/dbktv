// Packages
import React, { Component } from 'react'

// Components
import { Container, Heading } from '../atoms'

/**
 * Class representing an error screen.
 *
 * @todo Transform all errors to FeathersError via getDerivedStateFromProps
 *
 * @class Error
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Error extends Component {
  /**
   * Creates a new Error screen component.
   *
   * @param {object} props - Component properties
   * @param {FeathersError} props.error - Current error
   * @param {string} props.error.message - Current error message
   * @param {object} props.info - Error info
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Internal component state
     * @property {boolean} state.analytics - True if Google Analytics was
     * initialized; this value will be updated in a production Node environment
     * @property {string | null} state.deck - Id of current deck
     * @property {FeathersError | null} state.error - Current error
     * @property {object} state.info - Error information
     * @property {boolean} state.loading - True if fetching content
     * @property {boolean} state.mobile - True if viewport width <= 768px
     * @property {object[] | null} state.slides - Slide content
     * @property {object[] | null} state.ticker - Ticker content
     * @instance
     */
    this.state = {
      error: null,
      info: null
    }
  }

  /**
   * getDerivedStateFromProps is invoked right before calling the render method,
   * both on the initial mount and on subsequent updates. It should return an
   * object to update the state, or null to update nothing.
   *
   * Until a client side Feathers application is set up, component will update
   * the internal state deck data based on the incoming props.
   *
   * The internal mobile state will also be updated.
   *
   * @param {object} props - Incoming component properties
   * @param {object} state - Incoming component state
   * @returns {object | null}
   */
  static getDerivedStateFromProps(props, state) {
    const { error, info, transform } = props
    return { error: transform(error), info: info || error.stack }
  }

  /**
   * Sets the error name as the document title. Afterwards, an error report may
   * be sent to a dedicated Slack channel.
   *
   * @async
   * @returns {undefined}
   */
  async componentDidMount() {
    const { error } = this.state
    const { transform } = this.props

    document.title = `${error.name}: ${error.message}`

    try {
      // Determine if an error report should be sent
      await this.report()
    } catch (err) {
      this.setState({ error: transform(err), info: err.stack })
    }
  }

  /**
   * Renders a <main> element representing an error screen.
   * The page will display the error name, message, and stack information.
   *
   * @returns {HTMLElement} <main> element
   */
  render() {
    const { className, error, id, info } = this.props
    const style = (`ads-error ${error.className} ${className || ''}`).trim()

    return (
      <main id={id} className={style}>
        <Container>
          <Heading>Sorry, there was an error.</Heading>
          <code><span>{error.name}</span>&nbsp;{error.message}</code>
          <code>{error.data}</code>
          <code>{info}</code>
        </Container>
      </main>
    )
  }

  // Helpers

  /**
   * Based on the current error state, the method will determine if an error
   * report needs to be sent to the dbktv-errors Slack channel.
   *
   * @todo Determine if error needs to be sent
   * @returns {FeathersError} Current error
   */
  report = async () => {
    const { error } = this.state

    // TODO: Determine if error needs to be sent

    return error
  }
}
