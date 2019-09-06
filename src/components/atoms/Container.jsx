// Packages
import React from 'react'

/**
 * @file Component representing a container.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Renders a <div> element with the base class 'ada-container'.
 *
 * @returns {HTMLDivElement}
 */
const Container = props => {
  const { children, className, id } = props
  const style = (`ada-container ${className || ''}`).trim()

  return <div id={id} className={style}>{children}</div>
}

export default Container
