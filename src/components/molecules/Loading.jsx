// Packages
import { h, Component } from 'preact'

// Components
import { LoadingIcon } from '../atoms'
import Logo from './Logo'

/**
 * Class representing a loading section.
 *
 *
 * @class Loading
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Loading extends Component {
  /**
   * Updates the document title.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    document.title = 'Loading DiamondbackTV...'
  }

  /**
   * Renders a <div> element representing a loading section.
   *
   *
   * @param {object} props - Component properties
   * @param {object} state - Component state
   * @returns {HTMLDivElement} <main> element
   */
  render(props, state) {
    const { className, id } = props

    return (
      <div id={id} className={(`adm-loading ${className || ''}`).trim()}>
        
      </div>
    )
  }
}
