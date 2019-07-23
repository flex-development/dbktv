// Packages
import { h, Component } from 'preact'
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
   * @param {FeathersError} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    return this.props.catch(error, info)
  }

  componentDidMount() {
    const { duration, next, slide } = this.props
    slide(30000, next)
  }

  /**
   * Renders a <section> element representing the "Articles" template.
   *
   * @param {object} props - Component properties
   * @param {object} state - Component state
   * @returns {HTMLElement} <section> element
   */
  render(props, state) {
    const { className, content, id } = props
    const style = (`adt-articles ${className || ''}`).trim()

    return (
      <section id={id} className={style}>
        <Container>
          <div className='left-rail'>
            <Subheading heading='Continue Reading on <a class="ada-link" href="https://dbknews.com" target="_blank">dbknews.com</a>' />
            <div className='articles'>
              {content.articles.map(article => {
                return <Article class='group' {...article} />
              })}
            </div>

            <div className='ado-social'>
              {/* TODO: Get icon license */}
            </div>
          </div>
          <div className='right-rail'>
            {
              content.ads[0]
                ? (
                  <div id={`ad-${content.ads[0]}`} className='ada-advertisement'>
                    {/* <DFPSlotsProvider dfpNetworkId={'123934970'} >
                      <AdSlot adUnit={adUnit} sizes={[300, 600]} />
                    </DFPSlotsProvider> */}
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
