// Packages
import { h, Component } from 'preact'

// Components
import {
  Author, Category, Container, Image, Headline, Link, Video
} from '../atoms'

export default class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { cms, matches, route } = this.props
    const { id } = matches

    document.title = `Gallery: ${route.title}`

    let media_id = -1

    if (id === '0' || id === '1') media_id = 0
    if (id === '2') media_id = 1

    const media = cms.multimedia[media_id]

    if (!media) window.location.href = '/404'

    this.setState({ media, is_video: media.media.type !== undefined })
  }

  render(props, state) {
    const { media, is_video } = state

    if (!media) return null

    const { category, credit, related } = media
    const { caption, src, type } = media.media
    const figure = is_video ? { src, type } : { src, alt: caption }

    return (
      <main className='adp-gallery'>
        <figure className='adm-figure'>
          {figure.alt ? <Image {...figure} /> : <Video {...figure} />}
          <figcaption className='ada-figcaption'>
            <Container>
              <div className='caption-header'>
                <Category category={category} />
                <Author author={credit} />
              </div>
              <Headline href={figure.src} text={caption} />
              {related ? <Link {...related} target='_blank' /> : null}
            </Container>
          </figcaption>
        </figure>
      </main>
    )
  }
}
