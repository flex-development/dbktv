// Packages
import React, { Component } from 'react'

// Components
import { Heading, Image, Link } from '../atoms'

/**
 * Class representing the Diamondback TV logo.
 *
 * @class Logo
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Logo extends Component {
  /**
   * Creates a new Logo component.
   *
   * @param {object} props - Component properties
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {string} props.id - Element id
   * @param {boolean} props.mini - If true, returns DBKTV logo instead of the
   * DiamondbackTV logo
   * @param {boolean} props.plug - If true, display 'Continue reading on
   * dbknews.com' beneath the logo (only if @see @param props.mini is false)
   * @returns {Logo}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Component state
     * @property {object | null} state.current - Current logo image properties
     * @property {string | undefined} state.current.alt - Logo description
     * @property {string | undefined} state.current.src - Logo source url
     * @property {object} state.logos - Full / mini logo image objects
     * @property {object} state.logos.full - Full size logo image properties
     * @property {object} state.logos.mini - Mini logo image properties
     * @property {boolean} state.plug - @see props.mini = F, @see props.plug = T
     */
    this.state = {
      current: null,
      logos: {
        full: {
          alt: 'DiamondbackTV logo full white',
          src: '/assets/dbktv-logo-full-white.svg'
        },
        mini: {
          alt: 'DiamondbackTV logo mini white',
          src: '/assets/dbktv-logo-mini-white.svg'
        }
      },
      plug: false
    }
  }

  /**
   * getDerivedStateFromProps is invoked right before calling the render method,
   * both on the initial mount and on subsequent updates. It should return an
   * object to update the state, or null to update nothing.
   *
   * This functions determines if the DiamondbackTV logo or the DBKTV logo
   * should be rendered. If rendering the DiamondbackTV logo, 'Continue reading
   * on dbknews.com' can be rendered underneath the logo as well.
   *
   * @param {object} props - @see Logo#constructor
   * @param {object} state - @see Logo#constructor
   * @returns {object} Object to update component state
   */
  static getDerivedStateFromProps(props, state) {
    const { mini, plug } = props

    state.plug = !mini && plug
    state.current = mini ? state.logos.mini : state.logos.full

    return state
  }

  /**
   * Renders the DiamondbackTV logo or the DBKTV logo.
   * If rendering the DiamondbackTV logo, 'Continue reading on dbknews.com' can
   * be rendered underneath the logo as well.
   *
   * @returns {HTMLDivElement}
   */
  render() {
    const { className, id, mini } = this.props
    const { current, plug } = this.state
    const style = `adm-logo ${mini ? 'mini' : 'full'} ${className || ''}`

    return (
      <div id={id} className={style.trim()}>
        <Image {...current} />
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
