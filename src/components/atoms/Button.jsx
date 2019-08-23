// Packages
import React from 'react'
import $ from 'jquery'

/**
 * @file Components representing a <button> elements.
 * @todo Update documentation
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Creates a new button component.
 *
 * @param {object} props - Component properties
 * @param {*} props.children - Child elements to render
 * @param {string} props.className - Space delimitted list of extra classes
 * @param {boolean} props.disabled - True if button is disabled
 * @param {object} props.events - Object containing event functions
 * @param {string} props.id - Element id
 * @returns {Button}
 */
const Button = props => {
  const { className, children, disabled, events, id } = this.props
  const style = (`ada-button ${className || ''}`).trim()

  return (
    <button id={id} className={style} disabled={disabled} {...events}>
      {children}
    </button>
  )
}

/**
 * Renders a button that when clicked, smooth scrolls to the top of
 * this.props.target. The button will have the class 'scroll-to-top-btn'.
 *
 * @param {object} props - Component properties
 * @param {boolean} props.disabled - If button is disabled or not
 * @param {*} props.children - Inner children
 * @param {string} props.class - Space delimitted list of extra classes
 * @param {number} props.speed - Animation speed in milliseconds
 * @param {string} props.target - Element to scroll to the top of
 * @returns {HTMLButtonElement}
 */
const SmoothScrollButton = props => {
  const { className, children, disabled, speed, target } = props

  const style = (`smooth-scroll-btn ${className || ''}`).trim()

  /**
   * Smooth scrolls to the top of @see @param target .
   *
   * @see @param target defaults to 'body', @see @param speed defaults to 750.
   *
   * @param {Event} event - onClick event
   * @param {string} target - Element to scroll to the top of
   * @param {number} speed - Animation speed in milliseconds
   * @returns {undefined}
   */
  const scroll = (event, target = 'body', speed = 500) => {
    $('html, body').animate({ scrollTop: $(target).offset().top }, speed)
    if (process.env.NODE_ENV !== 'production') console.info('Smooth scrolled.')
    event.preventDefault()
  }

  return (
    <Button
      disabled={disabled} class={style}
      events={{ onClick: e => scroll(e, target, speed) }}
    >
      {children}
    </Button>
  )
}

export { Button as default, SmoothScrollButton }
