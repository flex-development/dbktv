// Packages
const proxy = require('http-proxy-middleware')

/**
 * @file Proxy Configuration -- Avoid CORS issue in development
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

module.exports = app => {
  app.use(proxy('/.netlify/functions/', {
    target: 'http://localhost:9000/',
    pathRewrite: { '^/\\.netlify/functions': '' }
  }))
}
