// Packages
import React from 'react'

// Components
import {
  Author, Category, Container, Image, Headline, Related, Video
} from '../atoms'

/**
 * @file Component representing a <figure> element.
 * @todo Update documentation
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Renders a <figure> element with the base class 'adm-figcaption'.
 *
 * @param {object} props
 * @returns {HTMLElement}
 */
const Figure = props => {
  const { className, content, id } = props

  const { category, credit, media, related } = content

  return (
    <figure id={id} className={`adm-figure ${className || ''}`.trim()}>
      {media.video ? <Video autoplay {...media} /> : <Image {...media} />}
      <figcaption className='ada-figcaption'>
        <Container>
          <div className='caption-header'>
            <Category category={category} />
            <Author author={credit} />
          </div>
          <Headline href={media.src} text={media.alt} />
          {related ? <Related {...related} target='_blank' /> : null}
        </Container>
      </figcaption>
    </figure>
  )
}

export default Figure
