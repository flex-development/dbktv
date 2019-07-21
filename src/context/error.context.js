// Packages
import { createContext } from 'preact'

/**
 * @file Error context configuration
 * @module context/error
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * @namsespace InitialErrorState - Initial async request state
 * @property {FeathersError | null} error - Current error
 * @property {object | null} info - Error info
 */
const InitialErrorState = { error: null, info: null }

const ErrorContext = createContext(InitialErrorState)

export { ErrorContext, InitialErrorState }
