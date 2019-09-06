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

    this.state = {}
  }

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
          <code>{info}</code>
        </Container>
      </main>
    )
  }
}
