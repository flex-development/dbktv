/**
 * @file Project Wide Babel Configuration
 * @see {@link https://babeljs.io/docs/en/config-files}
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */

module.exports = api => {
  api.cache(true)

  return {
    ignore: [
      '**/node_modules/**',
      './build/*',
      './design/*',
      './src/assets/*'
    ],
    plugins: [
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-throw-expressions'
    ],
    presets: [
      [
        'preact-cli/babel',
        {
          modules: 'commonjs'
        }
      ]
    ]
  }
}
