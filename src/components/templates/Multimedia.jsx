// Packages
import { h, Component } from 'preact'
import $ from 'jquery'

// Components
import { Figure } from '../molecules'

/**
 * Class representing the Multimedia template.
 *
 * @todo Update documentation
 *
 * @class Multimedia
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Multimedia extends Component {
  /**
   * If an error is caught, the component the error will be handed off to the
   * @see @class App component.
   *
   * @param {FeathersError | Error} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) { return this.props.catch(error, info) }

  /**
   * Updates the document title and adds a top border to the footer.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { duration, next, slide, title } = this.props

    document.title = `Gallery: ${title}`
    $('.ado-footer').addClass('multimedia-border')
    setTimeout(() => slide(next), duration)
  }

  /**
   * Removes the footer border.
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    $('.ado-footer').removeClass('multimedia-border')
  }

  /**
   * Renders a <section> element representing the "Multimedia" template.
   *
   * @param {object} props - Component properties
   * @param {object} state - Component state
   * @returns {HTMLElement} <section> element
   */
  render(props, state) {
    const { className, content, id } = props

    return (
      <section id={id} className={`adt-multimedia ${className || ''}`.trim()}>
        <Figure content={content} />
      </section>
    )
  }
}
