// Packages
import axios from 'axios'

// Utilities
import utils from '../utils'

/**
 * @file Global Axios Configuration
 * @module config/axios
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const { NODE_ENV } = process.env

axios.defaults.baseURL = NODE_ENV === 'development'
  ? 'http://localhost:3000/api/' : 'https://dbktv.netlify.com/api/'

axios.interceptors.response.use(response => {
  if (response.status >= 400) throw response
  if (NODE_ENV !== 'production') console.info('Axios Response ->', response)
  return response.data
}, error => {
  const { config, message, request, response } = error
  const { feathers } = utils.error
  let err = null

  if (response) {
    const { config, data, status } = response
    err = feathers(message, { status, errors: { config, data } }, status)
  } else if (request) {
    err = feathers(message, { errors: { request } })
  } else {
    err = feathers(message, { config })
  }

  if (NODE_ENV !== 'production') console.error(err)
  throw err
})

export default axios
