// Packages
import React from 'react'
import ReactDOM from 'react-dom'

// Firebase
import { deck, ticker } from './api'

// Utility functions
import utils from './utils'

// React application
import App from './components/App'

// Service worker
import * as sw from './config/sw.config'

// Compiled Sass stylesheet
import './sass/app.sass'

/**
 * @file Application entry point
 *
 * @todo Feathers client application
 * @todo Slack reporting
 *
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * Component that renders DBKTV with mock Firebase data.
 *
 * This is needed after shutting down the Firebase project following other
 * updates made by an outside lab team.
 *
 * @returns {<App/>}
 */
const MockApp = props => {
  return <App {...props} api={{ deck, ticker }} utils={utils} />
}

// Render connected Feathers application into <div id="root"></div>
ReactDOM.render(<MockApp />, document.getElementById('root'))

/**
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * @see {@link https://bit.ly/CRA-PWA}
 */
sw.unregister()
