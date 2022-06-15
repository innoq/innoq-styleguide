/* eslint-env node */
const config = {
  manifest: {
    key: 'short',
    webRoot: './public',
    target: './public/assets/manifest.json'
  },
  watchDirs: ['./lib', './components'],

  static: [
    {
      source: './lib/images',
      target: './public/assets'
    }
  ],
  sass: [
    {
      source: './lib/styles/index.scss',
      target: './public/assets/bundle.css'
    },
    {
      source: './lib/styles/styleguide-theme.scss',
      target: './public/assets/styleguide-theme.css'
    },
    {
      source: './node_modules/normalize.css/normalize.css',
      target: './public/assets/normalize.css'
    }
  ],
  js: [
    {
      source: './lib/scripts/index.js',
      target: './public/assets/bundle.js'
    }
  ]
}

module.exports = config
