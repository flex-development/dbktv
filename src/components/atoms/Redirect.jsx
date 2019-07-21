// Packages
import { Component } from 'preact'
import { route } from 'preact-router'

/**
 * Preact component representing a redirect.
 *
 * @class Redirect
 * @extends Component
 * @exports Redirect
 * @see {@link https://www.npmjs.com/package/preact-router#redirects}
 */
export default class Redirect extends Component {
  /**
   * Redirects from this.props.from to this.props.to.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { from, to } = this.props

    console.info(`Redirecting from ${from} to ${to}...`)
    route(to, true)
  }

  /**
   * Renders null to properly perform the redirect.
   *
   * @param {object} props - Component properties
   * @param {string} props.from - Starting path
   * @param {string} props.to - Path to redirect to
   * @param {object | undefined} state - Component state
   * @param {object | undefined} context - Component context
   * @returns {null}
   */
  render(props, state, context) {
    return null
  }
}
