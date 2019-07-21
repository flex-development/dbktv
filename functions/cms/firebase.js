// Packages
const admin = require('firebase-admin')

// Config
const config = require('../config/default.json')
const credentials = require('../config/credentials.firebase.json')

/**
 * @file Firebase configuration
 * @module cms/firebase
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

module.exports = admin.initializeApp({
  credential: admin.credential.cert(credentials), ...config.firebase
})
