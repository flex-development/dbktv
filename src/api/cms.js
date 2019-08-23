// Packages
import flamelink from 'flamelink/app'

// Firebase
import firebase from './firebase'

// Flamelink modules
import 'flamelink/content'
import 'flamelink/navigation'

/**
 * @file Flamelink configuration
 * @module api/cms
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

export default flamelink({ firebaseApp: firebase })
