// Packages
import React, { Component } from 'react'
import { DFPSlotsProvider, AdSlot } from 'react-dfp'

// Components
import { Container, Subheading } from '../atoms'
import Article from './Article'

/**
 * Class representing the "Articles" template.
 *
 * @class Articles
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Articles extends Component {
  /**
   * If an error is caught, the component the error will be handed off to the
   * @see @class App component.
   *
   * @param {FeathersError | Error} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) { return this.props.catch(error, info) }

  /**
   * Updates the document title.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { duration, next, slide } = this.props

    document.title = `Continue reading on dbknews.com`
    setTimeout(() => slide(next), duration)
  }

  /**
   * Renders a <section> element representing the "Articles" template.
   *
   * @returns {HTMLElement} <section> element
   */
  render() {
    const { className, content, id } = this.props
    const style = (`adt-articles ${className || ''}`).trim()

    const NETWORK_ID = '123934970'
    const UNIT = content.ads[0]

    return (
      <section id={id} className={style}>
        <Container>
          <div className='left-rail'>
            <Subheading heading='Continue Reading on <a class="ada-link" href="https://dbknews.com" target="_blank">dbknews.com</a>' />
            <div className='articles'>
              {content.articles.map((article, i) => {
                return <Article {...article} class='group' key={`a-${i}`} />
              })}
            </div>

            <div className='ado-social'>
              {/* TODO: Get icon license */}
            </div>
          </div>
          <div className='right-rail'>
            {
              UNIT
                ? (
                  <div id={`ad-${UNIT}`} className='ada-advertisement'>
                    <DFPSlotsProvider dfpNetworkId={NETWORK_ID} >
                      <AdSlot adUnit={UNIT} sizes={[300, 600]} fetchNow />
                    </DFPSlotsProvider>
                  </div>
                )
                : null
            }
          </div>
        </Container>
      </section>
    )
  }
}
