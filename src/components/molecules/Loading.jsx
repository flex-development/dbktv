// Packages
import React from 'react'

// Components
import { LoadingIcon } from '../atoms'
import Logo from './Logo'

/**
 * @file Component representing a loading section.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Renders a <div> element representing a loading section.
 *
 * @param {object} props - Component properties
 * @param {object} state - Component state
 * @returns {HTMLDivElement} <main> element
 */
const Loading = props => {
  const { className, id } = props

  return (
    <div id={id} className={(`adm-loading ${className || ''}`).trim()}>
      <Logo plug />
      <LoadingIcon spin />
    </div>
  )
}

export default Loading
