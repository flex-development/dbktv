// Packages
import React from 'react'
import ReactDOM from 'react-dom'

// Firebase
import { deck } from './api'

// Utility functions
import utils from './utils'

// React application
import App from './components/App'

// Service worker
import * as sw from './config/sw.config'

// Axios
import axios from './config/axios'

// Compiled Sass stylesheet
import './sass/app.sass'

/**
 * @file Application entry point
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

// Render connected application into <div id="root"></div>
ReactDOM.render(
  <App api={axios} mock={deck} utils={utils} />,
  document.getElementById('root')
)

/**
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * @see {@link https://bit.ly/CRA-PWA}
 */
sw.unregister()
