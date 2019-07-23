// Packages
import { h, Component } from 'preact'

// Components
import {
  Author, Category, Container, Image, Headline, Link, Embed
} from '../atoms'

export default class Multimedia extends Component {
  componentDidMount() {
    const { duration, next, slide } = this.props
    slide(30000, next)
  }

  render(props, state) {
    const { className, content, id } = props
    const style = (`adt-multimedia ${className || ''}`).trim()

    const { category, credit, media, related } = content

    return (
      <section className={style}>
        <figure>
          {media.video ? <Embed {...media} /> : <Image {...media} />}
          <figcaption className='ada-figcaption'>
            <Container>
              <div className='caption-header'>
                <Category category={category} />
                <Author author={credit} />
              </div>
              <Headline href={media.src} text={media.caption} />
              {related ? <Link {...related} target='_blank' /> : null}
            </Container>
          </figcaption>
        </figure>
      </section>
    )
  }
}
