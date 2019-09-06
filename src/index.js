// Packages
import React from 'react'
import ReactDOM from 'react-dom'

// Firebase
import { database } from './api'

// Service worker
import * as sw from './config/sw.config'

// Application
import App from './components/App'

// Utility functions
import utils from './utils'

// Compiled Sass stylesheet
import './sass/app.sass'

/**
 * @file Application entry point
 *
 * @todo Slide HOC
 *
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

// Application will be rendered inside of <div id="root"></div>
// with the Firebase database interface and utility functions passed as props
ReactDOM.render(
  <App database={database} utils={utils} />,
  document.getElementById('root')
)

/**
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * @see {@link https://bit.ly/CRA-PWA}
 */
sw.unregister()
