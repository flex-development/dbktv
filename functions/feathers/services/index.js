// Services
const Documentation = require('./documentation.service.js')

/**
 * @file Cloud services
 * @module services
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

module.exports = function (app) {
  const services = [Documentation]
  services.forEach(service => app.configure(service))
}
