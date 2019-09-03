// Packages
import React from 'react'

// Components
import { Container } from '../atoms'
import { Logo } from '../molecules'

/**
 * @file Component representing the default slide.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Renders a <section> element representing the default slide.
 *
 * The default slide displays the DiamondbackTV logo and 'Continue reading
 * on dbknews.com' beneath the logo.
 *
 * @param {object} props - Component properties
 * @param {string} props.className - Space delimitted list of extra classes
 * @param {string} props.id - Slide ID
 * @returns {HTMLElement} <section class='adt-default'>
 */
const Default = props => {
  const { className, id } = props

  return (
    <section id={id} className={`adt-default ${className || ''}`.trim()}>
      <Container>
        <Logo plug />
      </Container>
    </section>
  )
}

export default Default
