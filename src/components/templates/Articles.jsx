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
    const { className, content, id } = this.props
    const { ads, articles } = content
    const style = (`adt-articles ${className || ''}`).trim()

    const NETWORK_ID = '123934970'
    const ad = { adUnit: ads[0], fetchNow: true, sizes: [[300, 600]] }

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
              <Advertisement {...ad} />
            </DFPSlotsProvider>
          </div>
        </Container>
      </div>
    )
  }
}
