// Packages
import { h, Component } from 'preact'

// Components
import {
  Author, Category, Container, Image, Headline, Link, Embed
} from '../atoms'

export default class Multimedia extends Component {
  /**
   * If an error is caught, the component the error will be handed off to the
   * @see @class App component.
   *
   * @param {FeathersError | Error} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    return this.props.catch(error, info)
  }

  /**
   * Updates the document title.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const { title } = this.props
    document.title = title || 'Multimedia'
  }

  render(props, state) {
    const { className, content, id } = props

    const { category, credit, media, related } = content

    return (
      <section id={id} className={`adt-multimedia ${className || ''}`.trim()}>
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
