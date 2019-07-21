/**
 * @file Global service hooks
 *
 * @todo Add documentation
 *
 * @module hooks/app
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

module.exports = {
  before: {
    all: context => context.app.get('utilities').context.log_request(context)
  },
  after: {
    all: async context => {
      return context.app.get('utilities').context.log_success(context)
    }
  },
  error: {
    all: async context => {
      return context.app.get('utilities').error.service_error(context)
    }
  }
}
