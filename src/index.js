// Packages
import React from 'react'
import ReactDOM from 'react-dom'
import Pusher from 'pusher-js'
import axios from 'axios'

// React application
import App from './components/App'

// Service worker
import * as sw from './serviceWorker'

// Compiled Sass stylesheet
import './sass/app.sass'

/**
 * @file Application entry point
 *
 * @todo Clean codebase
 * @todo Add Socket.io for realtime listening
 * @author Lexus Drumgold <lex@flexdevelopment.llc>
 */

const {
  NODE_ENV, REACT_APP_PUSHER_KEY, REACT_APP_PUSHER_CLUSTER, REACT_APP_PUSHER_FORCE_TLS
} = process.env

// Configure Axios

axios.defaults.baseURL = NODE_ENV === 'development'
  ? 'http://localhost:9000/.netlify/functions'
  : 'https://dbktv.netlify.com/.netlify/functions'

axios.interceptors.response.use(response => {
  if (response.status >= 400) throw response
  return response.data
}, error => { throw error })

// Configure Pusher

if (NODE_ENV !== 'production') Pusher.logToConsole = true

const pusher = new Pusher(REACT_APP_PUSHER_KEY, {
  cluster: REACT_APP_PUSHER_CLUSTER,
  forceTLS: REACT_APP_PUSHER_FORCE_TLS
})

// Render connected application into <div id="root"></div>
const container = document.getElementById('root')
ReactDOM.render(<App api={axios} pusher={pusher} />, container, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.info('Rendered application.')
  }
})

/**
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * @see {@link https://bit.ly/CRA-PWA}
 */
sw.unregister()
