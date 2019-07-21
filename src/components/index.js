// Packages
import { h, Component } from 'preact'

// Context
import {
  AsyncContext, ErrorContext, InitialAsyncState, InitialErrorState, InitialUIState, UIContext
} from '../context'

/**
 * Class representing the slide deck.
 *
 * @todo Implement state handlers
 * @todo Implement data fetching
 * @todo Implement routing / slide position
 * @todo Implement real time data streaming
 *
 * @class Deck
 * @extends Component
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default class App extends Component {
  /**
   * Creates a new slide deck application.
   *
   * @param {object} props - Component properties
   * @returns {App}
   */
  constructor(props) {
    super(props)

    /**
     * @property {object} state - Component state
     * @property {object[]} state.data - Slide deck content
     * @property {FeathersError | null} state.error - Current error
     * @property {object | null} state.info - Error info
     * @property {boolean} state.loading - True if fetching content
     * @property {boolean} state.mobile - True if viewport width <= 768px
     * @property {number} state.position - Slide position. -1 if loading
     * @property {number} state.progress - Loading progress, [0,100]
     */
    this.state = {
      ...InitialAsyncState,
      ...InitialErrorState,
      ...InitialUIState,
      position: -1
    }
  }

  /**
   * If an error is caught, the deck @see state.error and @see state.info will
   * be updated.
   *
   * @param {FeathersError} error - Current error
   * @param {object} info - Error information
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    this.setState({ error, info })
  }

  /**
   * Fetches the initial slide data and updates the component state.
   *
   * @async
   * @returns {undefined}
   */
  async componentDidMount() {
    console.info('Deck mounted.')

    // TODO: Fetch initial slide deck content and update state
    // TODO: Subscribe to data changes
  }

  /**
   * Returns the slide deck application.
   * If an error is caught, the deck will push to an error screen.
   *
   * @todo Implement routing
   * @todo Handle error, loading, and data state
   *
   * @param {object} props - Component properties
   * @param {object} state - Component state
   * @param {object[]} state.data - Slide deck content
   * @param {FeathersError | null} state.error - Current error
   * @param {object | null} state.info - Error info
   * @param {boolean} state.loading - True if fetching content
   * @param {boolean} state.mobile - True if viewport width <= 768px
   * @param {number} state.progress - Loading progress, [0,100]
   * @returns {ErrorContext.Consumer} Slide deck application
   */
  render(props, state) {
    const { data, error, info, loading, mobile, progress } = state

    // TODO: Handle error and loading state

    return (
      <ErrorContext.Consumer value={{ error, info }}>
        <UIContext.Consumer value={{ mobile }}>
          <AsyncContext.Consumer value={{ data, loading, progress }}>
            {/* TODO: Implement routing */}
          </AsyncContext.Consumer>
        </UIContext.Consumer>
      </ErrorContext.Consumer>
    )
  }
}
