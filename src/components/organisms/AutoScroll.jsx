// Packages
import { h, Component, Fragment } from 'preact'
import $ from 'jquery'

// Components
import { Link, SquareIcon } from '../atoms'

/**
 * Class representing an automated scroll content.
 *
 * @class AutoScroll
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class AutoScroll extends Component {
  state = { pos: 0 }

  /**
   * If caught, @see @param error will be handed off to the @see @class App.
   *
   * @param {FeathersError | Error} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    return this.props.catch(error, info)
  }

  componentDidMount() {
    const { autoscroll } = this.props

    // Adjust logo size
    const constrain = `${autoscroll.count}rem`
    $('.ado-footer > .adm-logo').css({ maxWidth: constrain, width: constrain })
  }

  /**
   * Gets the new scroll position.
   *
   * @returns {number} New scroll position
   */
  position = () => {
    const { pos } = this.state

    const INTERVAL = 85
    const max = $('.ado-autoscroll')[0].scrollLeftMax
    const new_pos = pos + INTERVAL >= max ? 0 : pos + INTERVAL

    this.setState({ pos: new_pos })
    return new_pos
  }

  /**
   * Renders a <div> element with the base class 'ado-autoscroll'.
   *
   * @param {object} props - Component properties
   * @param {object} props.autoscroll - Autoscroll content
   * @param {number} props.autoscroll.count - Number of items to scroll through
   * @param {any[]} props.autoscroll.items - Scrolling items
   * @param {object | undefined} state
   */
  render(props, state) {
    const { autoscroll, className, id } = props

    // Start scrollbar
    setTimeout(() => {
      const position = this.position()
      $('.ado-autoscroll').animate({ scrollLeft: position }, 825)
      console.info('Scrolled', position)
    }, 1000)

    return (
      <div id={id} className={(`ado-autoscroll ${className || ''}`).trim()}>
        {autoscroll.items.map((item, i) => {
          // if (i === autoscroll.count - 1) return <Link {...item} />

          return (
            <Fragment>
              <Link {...item} />&nbsp;<SquareIcon />&nbsp;
            </Fragment>
          )
        })}
      </div>
    )
  }
}
