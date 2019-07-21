// Packages
const functions = require('firebase-functions')

// Server
const Feathers = require('../feathers')

/**
 * @file HTTPS triggers
 * @module functions/https
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

module.exports = {
  /**
   * Serves the DiamondbackTV cloud services.
   *
   * Users can retreive the API documentation, slide decks, as well as
   * individual slide content.
   *
   * @property {functions.HttpsFunction} cloud - Cloud services function
   */
  cloud: functions.https.onRequest(Feathers)
}
