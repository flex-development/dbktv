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
 * Component that connects the Feathers application to our React application.
 *
 * Until a client side Feathers app is initialized, we will pass the mock data
 * as a component property. Our utility functions will also be passed as
 * component properties.
 *
 * @todo Replace api prop with Feathers application
 * @returns {<App/>}
 */
const FeathersApp = () => <App api={{ deck, ticker }} utils={utils} />

// Render connected Feathers application into <div id="root"></div>
ReactDOM.render(<FeathersApp />, document.getElementById('root'))

/**
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * @see {@link https://bit.ly/CRA-PWA}
 */
sw.unregister()
