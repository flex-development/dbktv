// Packages
import { createContext } from 'preact'

/**
 * @file UI context configuration
 * @module context/ui
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * @namsespace InitialUIState - Initial user interface state
 * @property {boolean} mobile - True if viewport width <= 768px
 */
const InitialUIState = { mobile: false }

const UIContext = createContext(InitialUIState)

export { InitialUIState, UIContext }
