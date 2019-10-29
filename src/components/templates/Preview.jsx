// Packages
import React, { Component, Fragment } from 'react'

// Components
import {
  Category, Headline, PhotoVideoIcon, NewspaperIcon, StarIcon
} from '../atoms'

/**
 * @file Component representing a deck slide preview.
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Preview extends Component {
  /**
   * Creates a new deck slide preview.
   *
   * @param {object} props - Component properties
   * @returns {SlidePreview}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Internal component state
     * @property {object | null} state.category - Template name
     * @property {object[] | null} state.headlines - Array of preview headlines
     * @property {Component | null} state.icon - Icon component
     * @property {string | null} state.type - Name of template in lowercase
     * @instance
     */
    this.state = { category: null, headlines: null, icon: null, type: null }
  }

  /**
   * getDerivedStateFromProps is invoked right before calling the render method,
   * both on the initial mount and on subsequent updates. It should return an
   * object to update the state, or null to update nothing.
   *
   * Based on @see @param props.location, the internal slide state will be
   * updated.
   *
   * The internal mobile state will also be updated.
   *
   * @todo Update documentation
   *
   * @param {object} props - Incoming component properties
   * @param {object} state - Incoming component state
   * @returns {object | null}
   */
  static getDerivedStateFromProps(props, state) {
    const { component, content } = props.data

    let category = component
    let headlines = []
    let icon = null

    if (component === 'Articles') {
      const { article1, article2 } = content
      headlines = [article1, article2].map(article => article.headline)
      icon = <NewspaperIcon />
    } else if (component === 'Multimedia') {
      const { alt, src, video } = content.media
      headlines.push({ href: src, text: alt })
      category = `Multimedia (${video ? 'Video' : 'Image'})`
      icon = <PhotoVideoIcon />
    } else if (component === 'News') {
      const { href, title } = content
      headlines.push({ href, text: title })
      icon = <StarIcon />
    } else {
      category = 'From the Diamondback Staff'
      headlines.push({
        href: 'https://dbknews.com',
        text: 'Continue reading on dbknews.com'
      })
    }

    return { category, headlines, icon }
  }

  /**
   * Renders <div> element representing a slide preview.
   * It will have the base class 'adt-preview'.
   *
   * @todo Update documentation
   * @returns {HTMLElement}
   */
  render() {
    const { className, id } = this.props
    const { category, headlines, icon, type } = this.state

    return (
      <div id={id} className={`adt-preview ${type} ${className || ''}`.trim()}>
        <div className='preview-header'>
          {icon}<Category category={category} />
        </div>
        <div className='headlines'>
          {headlines.map((headline, i) => {
            headline.className = 'preview-headline'

            if (headlines.length > 1 && i === 0) {
              return (
                <Fragment key={`ph-${i}`}>
                  <Headline {...headline} key={`ph-${i}`} />
                  <br /><br />
                </Fragment>
              )
            }
            return <Headline {...headline} key={`ph-${i}`} />
          })}
        </div>
      </div>
    )
  }
}
