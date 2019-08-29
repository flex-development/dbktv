// Packages
import * as firebase from 'firebase/app'

// Firebase Modules
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

/**
 * @file Firebase configuration
 * @module api/firebase
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 * @see {@link https://firebase.google.com/docs/web/setup}
 */

/**
 * @property {object} config - Firebase web config
 * @property {string} config.apiKey - API key
 * @property {string} config.authDomain - Auth domain
 * @property {string} config.databaseURL - Default database url
 * @property {string} config.projectId - Project id
 * @property {string} config.storageBucket - Storage bucket url
 * @property {string} config.messagingSenderId - Messaging id
 * @property {string} config.appId - App id
 */
const config = {
  apiKey: 'AIzaSyBOkrT_f_WhtkHQ2LfNk4zgerClCdP1SJQ',
  authDomain: 'thedbktv.firebaseapp.com',
  databaseURL: 'https://thedbktv.firebaseio.com',
  projectId: 'thedbktv',
  storageBucket: 'thedbktv.appspot.com',
  messagingSenderId: '700606859987',
  appId: '1:700606859987:web:91b3c2635f9bb934'
}

const backend = {
  core: firebase.initializeApp(config),
  decks: firebase.initializeApp({
    ...config, databaseURL: 'https://dbktv-decks.firebaseio.com'
  }, 'decks')
}

const database = {
  core: firebase.database(),
  decks: firebase.database(backend.decks)
}

const storage = firebase.storage()

export { backend, database, storage }
