// Packages
import dotenv from 'dotenv'
import axios from 'axios'
import Pusher from 'pusher'

// Utilities
import { intercept } from '../utils/error.util'

/**
 * @file "Deploy Succeeded" Serverless Function
 * @todo Update documentation
 * @author Lexus Drumgold <lex@flexdevelopment.llc>
 */

// Configure environment variables
dotenv.config()

const { appId, secret, REACT_APP_key } = process.env

// Configure Pusher
const pusher = new Pusher({
  appId, key: REACT_APP_key, secret, cluster: 'mt1', useTLS: true
})

// Configure Axios
axios.interceptors.response.use(response => {
  if (response.status >= 400) throw response
  return response.data
}, error => intercept(error))

// Utility functions
const fetch = async (type, url) => {
  try {
    return await axios.get(url)
  } catch (err) {
    err.message = `Error getting ${type} -> ${err.message}`
    throw err
  }
}

const handle_error = err => {
  console.error(err)
  const error = err.type === 'FeathersError' ? err : err.message
  return respond(err.code || 500, error)
}

const respond = (status = 200, resp) => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    statusCode: status,
    body: JSON.stringify(resp)
  }
}

// Serverless function
exports.handler = async (event, context) => {
  // ! Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') return respond(200, true)

  let settings = 'https://dbktv.netlify.com/api/pages/settings.json'

  console.warn('Fetching TV settings...')

  try {
    settings = await fetch('DBKTV settings', settings)
  } catch (err) {
    throw handle_error(err)
  }

  let deck
  let slides = []

  console.info('Retreived TV settings.')
  console.warn('Fetching slide deck...')

  try {
    deck = await fetch('slide deck', settings.deck)

    deck.slides.forEach(obj => {
      if (!obj.slide.includes('/api/content/tickers')) slides.push(obj.slide)
    })

    deck.slides = await Promise.all(slides.map(async (slide, i) => {
      const filepath = slide.replace('https://dbktv.netlify.com', '')
      let slug = filepath.replace('/api', '').replace('.json', '')
      let component

      if (filepath.includes('/content/slides/group')) {
        component = 'Articles'
        slug = slug.replace('/content/slides/group/', '')
      } else if (filepath.includes('/content/slides/multimedia')) {
        component = 'Multimedia'
        slug = slug.replace('/content/slides/multimedia/', '')
      } else if (filepath.includes('/content/slides/news')) {
        component = 'News'
        slug = slug.replace('/content/slides/news/', '')
      } else {
        component = 'Default'
        slug = slug.replace('/content/slides/default/', '')
      }

      return {
        component,
        content: await fetch('slide', slide),
        filepath,
        next: i === slides.length - 1 ? 0 : i + 1,
        id: `slide${i}`,
        position: i,
        slug,
        url: slide
      }
    }))
  } catch (err) {
    throw handle_error(err)
  }

  let ticker

  console.info('Retreived slide deck.')
  console.warn('Fetching ticker...')

  try {
    ticker = await fetch('ticker', settings.ticker)
  } catch (err) {
    throw handle_error(err)
  }

  ticker.items = ticker.items.map(item => item.item)

  console.info('Retreived ticker')
  const update = { deck, settings, ticker }

  pusher.trigger('deployments', 'deploy-succeeded', update, null, () => {
    console.info('deployments/deploy-succeeded channel ->', update)
  })

  return respond(200, update)
}
