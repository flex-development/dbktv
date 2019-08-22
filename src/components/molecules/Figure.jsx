// Packages
import { h, Component } from 'preact'

// Components
import {
  Author, Category, Container, Image, Headline, Related, Video
} from '../atoms'

/**
 * Component representing a <figure> element.
 *
 * @todo Update documentation
 *
 * @class Figure
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Figure extends Component {
  /**
   * If an error is caught, the component the error will be handed off to the
   * @see @class App component.
   *
   * @param {FeathersError | Error} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) { return this.props.catch(error, info) }

  render(props, state) {
    const { className, content, id } = props

    const { category, credit, media, related } = content
    if (media.video) media.type = 'video/mp4'

    return (
      <figure id={id} className={`adm-figure ${className || ''}`.trim()}>
        {media.video ? <Video autoplay {...media} /> : <Image {...media} />}
        <figcaption className='ada-figcaption'>
          <Container>
            <div className='caption-header'>
              <Category category={category} />
              <Author author={credit} />
            </div>
            <Headline href={media.src} text={media.caption} />
            {related ? <Related {...related} target='_blank' /> : null}
          </Container>
        </figcaption>
      </figure>
    )
  }
}
