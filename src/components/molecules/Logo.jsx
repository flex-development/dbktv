// Packages
import { h, Component } from 'preact'

// Components
import { Image } from '../atoms'

// Assets
import diamondback from '../../assets/images/diamondback-tv-logo-light.svg'
import dbk from '../../assets/images/dbk-tv-logo-light.svg'

/**
 * Class representing a slide deck.
 *
 *
 * @class Logo
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Logo extends Component {
  /**
   * Renders the DiamondbackTV logo.
   *
   * @param {object} props - Component properties
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {string} props.id - Element id
   * @param {boolean} props.mini - If true, returns DBKTV logo instead of the
   * DiamondbackTV logo
   * @param {object} state - Component state
   * @returns {HTMLImageElement}
   */
  render(props, state) {
    const { className, id, mini } = props

    return (
      <div className={(`adm-logo ${className || ''}`).trim()}>
        <Image src={mini ? dbk : diamondback} alt='Diamondback TV logo' />
      </div>
    )
  }
}
