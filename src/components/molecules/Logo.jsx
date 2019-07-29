// Packages
import { h, Component } from 'preact'

// Components
import { Heading, Image, Link } from '../atoms'

// Assets
import diamondback from '../../assets/images/diamondback-tv-logo-light.svg'
import dbk from '../../assets/images/dbk-tv-logo-light.svg'

/**
 * Class representing the Diamondback TV logo.
 *
 * @class Logo
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Logo extends Component {
  /**
   * @property {object} state - Component state
   * @property {object} state.image - Default logo
   * @property {object} state.image - Default logo
   * @property {boolean} state.plug - @see props.mini = F, @see props.plug = T
   */
  state = { 
    image: { alt: 'DiamondbackTV logo', src: diamondback }, plug: false 
  }

  /**
   * 
   */
  static getDerivedStateFromProps(props, state) {

  }

  /**
   * Renders the DiamondbackTV logo or the DBKTV logo.
   * If rendering the DiamondbackTV logo, 'Continue reading on dbknews.com' can
   * be rendered underneath the logo as well.
   *
   * @param {object} props - Component properties
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {string} props.id - Element id
   * @param {boolean} props.mini - If true, display 'Continue reading on
   * dbknews.com' beneath the logo
   * @param {boolean} props.plug - If true, returns DBKTV logo instead of the
   * DiamondbackTV logo
   * @param {object} state - Component state
   * @param {boolean} state.plug - @see props.mini = F, @see props.plug = T
   * @returns {HTMLDivElement}
   */
  render(props, state) {
    const { className, id } = props
    const { image, plug } = state

    return (
      <div id={id} className={(`adm-logo ${className || ''}`).trim()}>
        <Image {...image} />
        {
          plug
            ? (
              <Heading size={2}>
                Continue reading on&nbsp;
                <Link href='https://dbknews.com' target='_blank'>
                  dbknews.com
                </Link>
              </Heading>
            )
            : null
        }
      </div>
    )
  }
}
