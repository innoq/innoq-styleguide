const path = require('path')

const config = {
  manifest: {
    file: './public/assets/static.json',
    value: filepath => {
      let filename = path.basename(filepath)
      return `${process.env.BASE_URI || ''}/assets/static/${filename}`
    }
  },
  static: [
    {
      source: './lib/images',
      target: './public/assets/static'
    }
  ],
  sass: [
    {
      source: './lib/styles/index.scss',
      target: './public/assets/stylesheets/bundle.css'
    },
    {
      source: './node_modules/normalize.css/normalize.css',
      target: './public/assets/stylesheets/normalize.css'
    }
  ],
  js: [
    {
      source: './lib/scripts/index.js',
      target: './public/assets/javascripts/bundle.js'
    },
    {
      source: './node_modules/document-register-element/build/document-register-element.js',
      target: './public/assets/javascripts/document-register-element.js'
    }
  ]
}

module.exports = config
