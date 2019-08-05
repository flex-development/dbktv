// Packages
import { h, Component } from 'preact'

// Components
import { Feature } from '../templates'

export default class News extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { cms, matches, route } = this.props
    const { id } = matches

    document.title = `Top News: ${route.title}`

    let article_id = -1

    if (id === '0' || id === '1') article_id = 0
    if (id === '2') article_id = 1

    if (!cms.features[article_id]) window.location.href = '/404'

    const article = { category: 'top news', ...cms.features[article_id] }

    if (process.env.NODE_ENV !== 'development') {
      const replace = 'https://dbknews.com'
      article.headline.href = article.headline.href.replace(replace, '')
    }

    this.setState({ article })
  }

  render(props, state) {
    const { article } = state

    if (article) {
      return (
        <main className='adp-news'>
          <Feature article={article} />
        </main>
      )
    }

    return null
  }
}
