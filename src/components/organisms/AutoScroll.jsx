// Packages
import { h, Component, Fragment } from 'preact'

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
  /**
   * If an error is caught, the component the error will be handed off to the
   * @see @class App component.
   *
   * @param {FeathersError | Error} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    return this.props.catch(error, info)
  }

  /**
   * Renders a <div> element with the base class 'ado-autoscroll'.
   *
   * @param {object} props - Component properties
   * @param {object} props.scroll - Autoscroll content
   * @param {number} props.scroll.count - Number of elements to scroll through
   * @param {any[]} props.scroll.items - Scrolling elements
   * @param {object | undefined} state
   */
  render(props, state) {
    const { className, scroll, id } = props

    return (
      <div id={id} className={(`ado-autoscroll ${className || ''}`).trim()}>
        {scroll.items.map((item, i) => {
          if (i === scroll.count - 1) return <Link {...item} />

          return (
            <Fragment>
              <Link {...item} />
              <SquareIcon />
            </Fragment>
          )
        })}
      </div>
    )
  }
}
