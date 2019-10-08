// Packages
import React, { Component } from 'react'
import { DFPSlotsProvider } from 'react-dfp'

// Components
import { Advertisement, Container, Subheading } from '../atoms'
import Article from './Article'

/**
 * Component representing the "Top News" template.
 * This template should be used to display two articles and an advertisment.
 *
 * @class Articles
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Articles extends Component {
  subheading = 'Continue Reading on <a class="ada-link" href="https://dbknews.com" target="_blank">dbknews.com</a>'

  /**
   * Creates a new Group Articles template component.
   *
   * @param {object} props - Component properties
   * @param {object} props.content - Slide data
   * @param {string} props.content.ad - Ad Unit
   * @param {object} props.content.article1 - Articles to display
   * @param {string} props.content.article1.author - Article author
   * @param {string} props.content.article1.blurb - Article description
   * @param {string} props.content.article1.duration - Slide duration
   * @param {string} props.content.article1.href - Article URL
   * @param {string} props.content.article1.sponsored - True if sponsored
   * @param {object} props.content.article2 - @see props.article1
   * @param {number} props.content.duration - Slide duration
   * @param {object} props.content.last_edited_by - Last person to edit slide
   * @param {string} props.content.title - Slide title
   * @returns {News}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Internal component state
     * @property {object} state.content - Slide data
     * @property {string} state.content.ad - Ad Unit
     * @property {object[]} state.content.articles - Slide data
     * @property {object} state.content.article[] - Slide data
     * @property {string} state.content.blurb - Article description
     * @property {string} state.content.duration - Slide duration
     * @property {object} state.content.headline - Article headline
     * @property {string} state.content.headline.href - Headline URL
     * @property {string} state.content.headline.text - Headline Text
     * @property {object} state.content.image - Background image
     * @property {boolean} state.content.sponsored - Article description
     * @instance
     */
    this.state = { content: { ad: '', articles: [] } }
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
    const { ad, article1, article2 } = props.content
    return { content: { ad: ad || null, articles: [article1, article2] } }
  }

  /**
   * After the component has mounted, the document title will be updated.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    document.title = `Continue reading on dbknews.com`
  }

  /**
   * Renders a <div> element representing the "Articles" template.
   *
   * The "Articles" template displays two article previews in the left rail, and
   * at most 2 300x600 advertisements in the right rail.
   *
   * @returns {HTMLDivElement} <div class="adt-articles">
   */
  render() {
    const { className, id } = this.props
    const { ad, articles } = this.state.content

    if (!articles.length) return null

    const NETWORK_ID = '123934970'
    const advertisment = { adUnit: ad, fetchNow: true, sizes: [[300, 600]] }
    const style = (`adt-articles ${className || ''}`).trim()

    return (
      <div id={id} className={style}>
        <Container>
          <div className='left-rail'>
            <Subheading heading={this.subheading} />
            <div className='articles'>
              {articles.map((article, i) => {
                return <Article {...article} className='group' key={`a-${i}`} />
              })}
            </div>

            <div className='ado-social'>
              {/* TODO: Get icon license */}
            </div>
          </div>
          <div className='right-rail'>
            <DFPSlotsProvider dfpNetworkId={NETWORK_ID}>
              <Advertisement {...advertisment} />
            </DFPSlotsProvider>
          </div>
        </Container>
      </div>
    )
  }
}
