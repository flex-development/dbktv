// Packages
import { h, Component } from 'preact'
import { DFPSlotsProvider, AdSlot } from 'react-dfp'

// Components
import { Container, Subheading } from '../atoms'
import { Article } from '../templates'

export default class Articles extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    const { cms, matches } = this.props
    const { id } = matches

    document.title = 'Continue Reading on DBKNews'

    let group_id = -1

    if (id === '0' || id === '1') group_id = 0
    if (id === '2') group_id = 1

    if (!cms.articles[group_id]) window.location.href = '/404'

    const articles = cms.articles[group_id]

    if (process.env.NODE_ENV !== 'development') {
      for (const article in articles) {
        const replace = 'https://dbknews.com'
        article.headline.href = article.headline.href.replace(replace, '')
      }
    }

    this.setState({ ...articles })
  }

  render(props, state) {
    const { adUnit, article1, article2 } = state

    const articles = article1 && article2 ? [article1, article2] : null

    return (
      <main className='adp-articles'>
        <Container>
          <div className='left-rail'>
            <Subheading heading='Continue Reading on DBKNews' />
            <div className='ado-articles'>
              {/* TODO: Render Loading icon instead of null */}
              {articles
                ? articles.map(article => {
                  article.headline = { text: article.text, href: article.href }
                  return <Article class='group' {...article} />
                })
                : null
              }
            </div>

            <div className='ado-social'>
              {/* TODO: Get icon license */}
            </div>
          </div>
          <div className='right-rail'>
            {
              adUnit
                ? (
                  <div id={`ad-${adUnit}`} class='ada-advertisement'>
                    {/* <DFPSlotsProvider dfpNetworkId={'123934970'} >
                      <AdSlot adUnit={adUnit} sizes={[300, 600]} />
                    </DFPSlotsProvider> */}
                  </div>
                )
                : null
            }
          </div>
        </Container>

      </main>
    )
  }
}
