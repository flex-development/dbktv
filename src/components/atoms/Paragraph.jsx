// Packages
import { h, Component } from 'preact'

/**
 * Component representing an <p> element.
 *
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Paragraph extends Component {
  /**
   * Renders a paragraph element with the base class 'ada-paragraph'.
   *
   * @param {object} props - Component properties
   * @param {*} props.children - Child elements to render
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {string} props.id - Element id
   * @param {object | undefined} state - Component state
   * @param {object | undefined} context - Component context
   * @returns {HTMLParagraphElement}
   */
  render(props, state, context) {
    const { className, id, paragraph } = props
    const style = (`ada-paragraph ${className || ''}`).trim()

    return (
      <p id={id} className={style} dangerouslySetInnerHTML={{
        __html: (paragraph || '').replace('\n', '<br/><br/>')
      }} />
    )
  }
}

/**
 * Component representing an article author.
 *
 * @param {object} param0 - Component properties
 * @param {string} param0.author - Article author
 * @returns {<Paragraph>}
 */
const Author = ({ author }) => (
  <Paragraph className='author'>{author}</Paragraph>
)

/**
 * Component representing an article blurb.
 *
 * @param {object} param0 - Component properties
 * @param {string} param0.blurb - Article blurb
 * @returns {<Paragraph>}
 */
const Blurb = ({ blurb }) => (
  <Paragraph className='blurb'>{blurb}</Paragraph>
)

/**
 * Component representing an article category.
 *
 * @param {object} param0 - Component properties
 * @param {string} param0.category - Article category
 * @returns {<Paragraph>}
 */
const Category = ({ category }) => (
  <Paragraph className='category'>{category}</Paragraph>
)

/**
 * Component representing a subheading.
 *
 * @param {object} param0 - Component properties
 * @param {string} param0.headline - Subheading
 * @returns {<Paragraph>}
 */
const Subheading = ({ heading }) => (
  <Paragraph className='subheading'>{heading}</Paragraph>
)

export { Author, Blurb, Category, Subheading }
