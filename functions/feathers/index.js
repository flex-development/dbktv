// Packages
const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const cors = require('cors')
const express = require('@feathersjs/express')
const { GeneralError } = require('@feathersjs/errors')

// Content Management System
const cms = require('../cms')

// Hooks, models, and services
const hooks = require('./hooks/app.hooks')
const models = require('./models')
const services = require('./services')

// Utilities
const utilities = require('./util')

/**
 * @file Feathers and Firebase configuration
 * @module firebase
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

/**
 * @property {feathers.Application} Feathers - Feathers application
 */
let Feathers = express(feathers())

// Load app configuration
Feathers.configure(configuration())

// Set additional configuration constants
Feathers.set('cms', cms)
Feathers.set('models', models)
Feathers.set('utilities', utilities)

// Enable CORS and body parsing
Feathers.use(cors())
Feathers.use(express.json())
Feathers.use(express.urlencoded({ extended: true }))

// Set up Plugins and providers
Feathers.configure(express.rest())

// Configure client services and add global application hooks
Feathers.configure(services)
Feathers.hooks(hooks)

// Configure our error handler
Feathers.use(express.errorHandler((err, req, res, next) => {
  const { code, message, data } = err
  res.status(code).send({ status: code, message, data })
}))

const { NODE_ENV } = process.env

/**
 * Below we setup our Feathers server and then generate a developer friendly
 * ready message when the server has been initialized. Finally, after setup is
 * complete, we export our Feathers and Firebase Admin applications.
 */

const host = Feathers.get('host')
const port = Feathers.get('port')
const production = NODE_ENV === 'production'
const protocal = production ? 's' : ''

const url = `http${protocal}://${production ? host : `${host}:${port}`}`
Feathers.set('url', url)

Feathers = Feathers.setup()
if (!Feathers) throw new GeneralError('Error setting up Feathers.')

let message = `Cloud services started on ${Feathers.get('url')}`
if (!production) message = `Node environment: ${NODE_ENV} -> ${message}`

console.info(message)

module.exports = Feathers
