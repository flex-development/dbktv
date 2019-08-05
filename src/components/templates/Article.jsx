// Packages
import { h, Component } from 'preact'
import { Converter } from 'showdown'

// Components
import { Author, Blurb, Category, Headline } from '../atoms'

/**
 * Class representing an article.
 *
 * @todo Update documentation
 *
 * @class Article
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Article extends Component {
  /**
   * Renders an article.
   *
   * @param {object} props - Component properties
   * @param {object} state - Component state
   * @param {object} context - Component context
   * @returns {HTMLElement} <article> element
   */
  render(props, state) {
    const { author, blurb, category, className, headline, feature, id } = props
    const style = `adt-article ${className || ''} ${feature ? ' feature' : ''}`

    const convert = text => (new Converter()).makeHtml(text)

    return (
      <article id={id} className={style.trim()}>
        <div className='article-header'>
          <Category category={category} />
          <Author author={author} />
        </div>
        <Headline feature={feature} {...headline} />
        <Blurb blurb={convert(blurb)} />
      </article>
    )
  }
}
