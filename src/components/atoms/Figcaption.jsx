// Packages
import React from 'react'

/**
 * @file Component representing a <figcaption> element.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Renders a <figcaption> element with the base class 'ada-figcaption'.
 *
 * @param {object} props - Component properties
 * @param {string} props.caption - Caption
 * @param {string} props.children - Inner HTML
 * @param {string} props.className - Space delimitted list of extra classes
 * @param {string} props.id - Element id
 * @param {object | undefined} state - Component state
 * @param {object | undefined} context - Component context
 * @returns {HTMLElement} <figcaption> element
 */
const Figcaption = props => {
  const { className, id, children } = props
  const style = (`ada-figcaption ${className || ''}`).trim()

  return (
    <figcaption
      id={id} className={style} dangerouslySetInnerHTML={{
        __html: (children || '').replace('\n', '<br/><br/>')
      }}
    />
  )
}

export default Figcaption
