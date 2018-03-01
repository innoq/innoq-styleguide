const path = require('path')

const webRoot = './public'

const config = {
  manifest: {
    file: './public/assets/manifest.json',
    value: filepath => {
      filepath = path.relative(webRoot, filepath)
      return `${process.env.BASE_URI || ''}/${filepath}`
    }
  },
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
    },
    {
      source: './node_modules/document-register-element/build/document-register-element.js',
      target: './public/assets/document-register-element.js'
    }
  ]
}

module.exports = config
