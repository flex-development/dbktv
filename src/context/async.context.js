// Packages
import { createContext } from 'preact'

/**
 * @file Async context configuration
 * @module context/async
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * @namespace InitialAsyncState - Initial async request state
 * @property {object | null} data - Async data
 * @property {boolean} loading - True if fetching content
 * @property {number} progress - Loading progress, [0,100]
 */
const InitialAsyncState = { data: null, loading: true, progress: 0 }

const AsyncContext = createContext(InitialAsyncState)

export { AsyncContext, InitialAsyncState }
