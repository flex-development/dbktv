// Packages
import { h, Component } from 'preact'

// Components
import { Articles, Default, Multimedia, News } from '../templates'

// Mock data
import mock from '../../../tests/__mocks__/Deck.mock.json'

/**
 * Class representing a slide deck.
 *
 * @class Deck
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class Deck extends Component {
  /**
   * Creates a new slide deck.
   *
   * @param {object} props - Component properties
   * @param {Function} props.catch - Error handling function
   * @param {string} props.className - Space delimitted list of extra classes
   * @param {string} props.id - Slide ID
   * @param {object} props.deck - Deck info and slides
   * @param {object} props.deck.count - Total # of slides in deck
   * @param {number} props.deck.duration - Deck duration in ms
   * @param {object[]} props.deck.slides - Deck slide objects
   * @param {Function} props.loading - <App> loading state handler
   * @returns {App}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Component state
     * @property {object} state.curr - Current slide
     * @property {number} state.curr.duration - Slide duration in ms
     * @property {string} state.curr.id - Slide ID
     * @property {number} state.curr.next - ID of next slide
     * @property {string} state.curr.path - Slide URL
     * @property {string} state.curr.title - Slide title
     * @property {object} state.deck - Deck info and slides
     * @property {object} state.deck.count - Total # of slides in deck
     * @property {number} state.deck.duration - Deck duration in ms
     * @property {object[]} state.deck.slides - Deck slide objects
     * @property {<Component> | null} state.template - Current slide component
     */
    this.state = {
      curr: {
        component: 'Default',
        duration: 15000,
        id: 'default1',
        next: 1,
        path: '/default/1',
        title: 'DiamondbackTV'
      },
      deck: mock,
      template: null
    }
  }

  /**
   * getDerivedStateFromProps is invoked right before calling the render method,
   * both on the initial mount and on subsequent updates. It should return an
   * object to update the state, or null to update nothing.
   *
   * This method exists for rare use cases where the state depends on changes in
   * props over time. For example, it might be handy for implementing a
   * <Transition> component that compares its previous and next children to
   * decide which of them to animate in and out.
   *
   * The current slide deck and deck data will be updated.
   *
   * @param {object} props - @see Deck#constructor
   * @param {object} state - @see Deck#state
   * @returns {object}
   */
  static getDerivedStateFromProps(props, state) {
    const { deck, loading } = props
    const curr = deck ? deck.slide[0] : state.curr

    const dispatch = { ...curr, catch: props.catch, loading }

    let template

    switch (curr.component) {
      case 'News':
        template = <News {...dispatch} />
        break
      case 'Articles':
        template = <Articles {...dispatch} />
        break
      case 'Multimedia':
        template = <Multimedia {...dispatch} />
        break
      default:
        template = <Default {...dispatch} />
    }

    return { curr, deck: deck || state.deck, template }
  }

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
   * Logs that the deck has mounted and starts the slide deck.
   *
   * @returns {undefined}
   */
  componentDidMount() {
    console.info('Deck mounted.')

    const { curr, deck } = this.state
    let { component, duration, next, title } = curr

    if (component !== 'Default') title = `${component}: ${curr.title}`

    return setTimeout(() => this.setState({
      curr: deck.slides[next]
    }, () => console.info('Current slide ->', title)), duration)
  }

  /**
   * Returns the slide deck component with the base class 'ado-deck'.
   *
   * @param {object} props - @see Deck#constructor
   * @param {object} state - @see Deck#state
   * @returns {HTMLDivElement} Slide deck
   */
  render(props, state, context) {
    const { className, id } = props
    const { template } = this.state

    return (
      <main id={id} className={(`ado-deck ${className || ''}`).trim()}>
        {template}
      </main>
    )
  }
}
