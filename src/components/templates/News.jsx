// Packages
import React, { Component } from 'react'
import $ from 'jquery'

// Components
import Article from './Article'

/**
 * Component representing the "Top News" template.
 * This template should be used to display a feature article.
 *
 * @class News
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class News extends Component {
  /**
   * Creates a new Top News template component.
   *
   * @param {object} props - Component properties
   * @param {object} props.content - Slide data
   * @param {string | undefinde} props.content.ad - Ad Unit
   * @param {string} props.content.author - Article author
   * @param {string} props.content.blurb - Article description
   * @param {number} props.content.duration - Slide duration
   * @param {string} props.content.href - Article URL
   * @param {string} props.content.last_edited_by - Person to edit slide
   * @param {object} props.content.image - Background image
   * @param {boolean} props.content.sponsored - True if sponsored article
   * @param {string} props.content.title - Article title
   * @returns {News}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Internal component state
     * @property {object} state.content - Slide data
     * @property {string} state.content.author - Article author
     * @property {string} state.content.blurb - Article description
     * @property {object} state.content.headline - Article headline
     * @property {string} state.content.headline.href - Headline URL
     * @property {string} state.content.headline.text - Headline Text
     * @property {object} state.content.image - Background image
     * @property {boolean} state.content.sponsored - True if sponsored article
     * @instance
     */
    this.state = {
      content: {
        author: '',
        blurb: '',
        headline: { href: '', text: '' },
        image: { alt: '', src: '' },
        sponsored: false
      }
    }
  }

  /**
   * getDerivedStateFromProps is invoked right before calling the render method,
   * both on the initial mount and on subsequent updates. It should return an
   * object to update the state, or null to update nothing.
   *
   * @todo Update documentation
   *
   * @param {object} props - Incoming component properties
   * @param {object} state - Incoming component state
   * @returns {object | null}
   */
  static getDerivedStateFromProps(props, state) {
    const { href, title, ...rest } = props.content

    const content = rest

    delete content.duration
    delete content.href
    delete content.last_edited_by
    delete content.title

    return { content: { ...content, headline: { href, text: title } } }
  }

  /**
   * After the component has mounted, the document title and deck background
   * image will be updated.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { headline, image } = this.state.content

    if (headline.text.length) {
      document.title = `Top News: ${headline.text}`
      $('.ado-deck').css('background-image', `url(${image.src})`)
    }
  }

  /**
   * Before the component unmounts, the deck background image will be removed
   * and the @see @class Deck timer will be stopped.
   *
   * @returns {undefined}
   */
  componentWillUnmount() {
    $('.ado-deck').css('background-image', 'none')
  }

  /**
   * Renders a <section> element representing the "Top News" template.
   *
   * @todo Update documentation
   * @returns {HTMLElement} <section> element
   */
  render() {
    const { className, id } = this.props
    const { content } = this.state

    if (!content.headline.text.length) return null

    return (
      <div id={id} className={`adt-news ${className || ''}`.trim()}>
        <Article category='top news' {...content} feature />
      </div>
    )
  }
}
