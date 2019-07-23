// Packages
import { h, Component } from 'preact'
import $ from 'jquery'

// Components
import Article from './Article'

/**
 * Class representing the "Top News" template.
 *
 * @class News
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class News extends Component {
  /**
   * If an error is caught, the component the error will be handed off to the
   * @see @class App component.
   *
   * @param {FeathersError} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    return this.props.catch(error, info)
  }

  componentDidMount() {
    const { duration, next, content, slide } = this.props
    $('.ado-deck').css('background-image', `url(${content.image.src})`)
    slide(30000, next)
  }

  componentWillUnmount() {
    $('.ado-deck').css('background-image', 'none')
  }

  /**
   * Renders a <section> element representing the "Top News" template.
   *
   * @param {object} props - Component properties
   * @param {object} state - Component state
   * @returns {HTMLElement} <section> element
   */
  render(props, state) {
    const { className, content, id } = props
    const style = (`adt-news ${className || ''}`).trim()

    return (
      <section id={id} className={style}>
        <Article category='top news' {...content} feature />
      </section>
    )
  }
}
