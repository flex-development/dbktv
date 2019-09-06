// Packages
import React from 'react'

// Components
import { Container } from '../atoms'

/**
 * @file Component representing a <footer> element.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Renders a <footer> element with the base class 'ado-footer'.
 *
 * If props.container is defined, props.children will be wrapped in a
 * container element with the base class 'ada-container'.
 *
 * Pass an empty object for the default container, or defined
 * props.container.id and/or props.container.classes for greater control.
 *
 * @param {object} props - Component properties
 * @param {*} props.children - Footer elements
 * @param {string} props.className - Space delimitted list of extra classes
 * @param {object} props.container - If defined, wrap children in container
 * @param {string} props.container.id - Container element id
 * @param {string} props.container.classes - Extra container classes
 * @param {string} props.id - Element id
 * @param {object} state - Component state
 * @returns {HTMLElement} HTML <footer> element.
 */
const Footer = props => {
  const { children, container, className, id } = props

  const c_props = typeof container === 'boolean'
    ? { children } : { ...container, children }

  return (
    <footer id={id} className={(`ado-footer ${className || ''}`).trim()}>
      {
        container
          ? <Container {...c_props} />
          : children
      }
    </footer>
  )
}

export default Footer
