// Packages
import envVars from 'preact-cli-plugin-env-vars'

/**
 * @file Preact configuration
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

const Preact = {
  babel: {
    plugins: [
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-throw-expressions'
    ],
    presets: [
      [
        'preact-cli/babel',
        {
          'modules': 'commonjs'
        }
      ]
    ]
  },
  template: './public/index.html'
}

/**
 * Function that mutates the original webpack config.
 * Supports asynchronous changes when a promise is returned (or it's an async
 * function).
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to the CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers for
 * working with the webpack config.
 */
export default function (config, env, helpers) {
  config.node.process = 'mock'

  // Initialize environment variables for the application
  // Application environment variables are prefixed with PREACT_APP_
  envVars(config, env, helpers)

  // Update Babel configuration
  const { rule } = helpers.getLoadersByName(config, 'babel-loader')[0]

  const { plugins, presets } = Preact.babel

  plugins.forEach(plugin => rule.options.plugins.push(plugin))
  presets.forEach(preset => rule.options.presets.push(preset))

  // Set HTML template
  helpers.setHtmlTemplate(config, Preact.template)
}
