// Packages
import React from 'react'

/**
 * @file Component representing an <a> element.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Renders an anchor element with the base class 'ada-link'.
 *
 * @param {object} props - Component properties
 * @param {*} props.children - Child elements to render
 * @param {string} props.className - Space delimitted list of extra classes
 * @param {string} props.id - Element id
 * @param {string} props.href - URL to navigate to
 * @param {string} props.target - Where to open the url
 * @param {string} props.text - Link text
 * @param {object | undefined} state - Component state
 * @param {object | undefined} context - Component context
 * @returns {HTMLAnchorElement}
 */
const Link = props => {
  const { children, className, id, href, target, text } = props
  const style = (`ada-link ${className || ''}`).trim()

  return (
    <a id={id} className={style} href={href} target={target}>
      {text || children}
    </a>
  )
}

/**
 * Component representing an article headline.
 *
 * @param {object} param0 - Component properties
 * @param {string} param0.text - Article headline
 * @param {string} param0.href - Article link
 * @returns {<Headline>}
 */
const Headline = ({ text, href, feature }) => {
  const style = `headline ${feature ? 'feature' : ''}`

  return (
    <Link className={style} href={href} target='_blank'>
      {text}
    </Link>
  )
}

/**
 * Component representing a related article link.
 *
 * @param {object} param0 - Component properties
 * @param {string} param0.text - Article headline
 * @param {string} param0.href - Article link
 * @returns {<Headline>}
 */
const Related = ({ text, href }) => (
  <Link className='related-article' href={href} target='_blank'>{text}</Link>
)

export { Link as default, Headline, Related }
