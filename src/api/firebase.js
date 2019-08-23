// Packages
import { firebase as backend } from 'firebase/app'

// Config
import config from '.../config/default.json'

// Firebase Modules
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

/**
 * @file Firebase configuration
 *
 * @todo Update documentation
 *
 * @module api/firebase
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const firebase = backend.initializeApp(config.firebase)
const database = backend.database()
const storage = backend.storage()

export default { firebase, database, storage }
