// Packages
import React from 'react'
import { Converter } from 'showdown'

// Components
import { Author, Blurb, Category, Headline } from '../atoms'

/**
 * @file Component representing an <article> element.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Renders an article with the base class 'adt-article'.
 *
 * @param {object} props - Component properties
 * @param {object} state - Component state
 * @param {object} context - Component context
 * @returns {HTMLElement} <article> element
 */
const Article = props => {
  const { author, blurb, category, className, headline, feature, id } = props
  const style = `adt-article ${className || ''} ${feature ? ' feature' : ''}`

  const convert = text => (new Converter()).makeHtml(text)

  return (
    <article id={id} className={style.trim()}>
      <div className='article-header'>
        <Category category={category} />
        <Author author={author} />
      </div>
      <Headline feature={feature} {...headline} />
      <Blurb blurb={convert(blurb)} />
    </article>
  )
}

export default Article
