// Packages
const flamelink = require('flamelink/app')

// Firebase
const Firebase = require('./firebase')

// Import individual Flamelink modules
require('flamelink/content')
require('flamelink/navigation')

/**
 * @file Flamelink configuration
 * @module cms/flamelink
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

module.exports = flamelink({ firebaseApp: Firebase, isAdminApp: true })
