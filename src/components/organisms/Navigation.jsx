// Packages
import React from 'react'
import { NavLink } from 'react-router-dom'

// Components
import { Container, SquareIcon } from '../atoms'

/**
 * @file Component representing a <nav> element.
 * @todo Update documentation
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Renders a <nav> element with the base class 'ado-nav'.
 *
 * If props.container is defined, props.children will be wrapped in a
 * container element with the base class 'ada-container'.
 *
 * Pass an empty object for the default container, or defined
 * props.container.id and/or props.container.classes for greater control.
 *
 * @param {object} props - Component properties
 * @param {*} props.children - Header elements
 * @param {string} props.className - Space delimitted list of extra classes
 * @param {object} props.container - If defined, wrap children in container
 * @param {string} props.container.id - Container element id
 * @param {string} props.container.classes - Extra container classes
 * @param {string} props.id - Element id
 * @param {object} state - Component state
 * @returns {HTMLElement} HTML <nav> element
 */
const Navigation = props => {
  const { id, children, container, mobile } = props

  const style = `ado-nav ${props.className || ''} ${mobile ? 'ui-mobile' : ''}`

  const c_props = typeof container === 'boolean'
    ? { children } : { ...container, children }

  return (
    <nav id={id} className={style.trim()}>
      {container ? <Container {...c_props} /> : children}
    </nav>
  )
}

const DeckNavigation = ({ slides }) => {
  /**
   * Returns true if the window path matches the path of the current slide.
   *
   * @param {number} position - Position of slide
   * @returns {boolean}
   */
  const active = position => {
    const { slides } = this.state
    return window.location.pathname === slides[position].id
  }

  return (
    <Navigation>
      {slides.map((slide, i) => {
        return (
          <NavLink
            to={slide.id} key={`nav-btn-${i}`}
            className='ada-link' isActive={() => active(i)}
          >
            <SquareIcon />
          </NavLink>
        )
      })}
    </Navigation>
  )
}

export { Navigation as default, DeckNavigation }
