// Packages
import React from 'react'

// Utility functions
import utils from '../utils'

/**
 * @file Context components
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const MobileContext = React.createContext({ mobile: utils.ui.is_mobile() })

export { MobileContext }
