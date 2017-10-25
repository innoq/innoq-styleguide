const config = {
  sass: {
    manifest: {
      file: './public/css.json',
      baseURI: '/'
    },
    assets: [],
    bundles: [
      {
        entryPoint: './lib/styles/index.scss',
        target: './public/css/bundle.css'
      },
      {
        entryPoint: './node_modules/normalize.css/normalize.css',
        target: './public/css/normalize.css'
      },
      {
        entryPoint: './lib/styles/index.scss',
        target: './dist/css/bundle.css'
      },
      {
        entryPoint: './node_modules/normalize.css/normalize.css',
        target: './dist/css/normalize.css'
      }
    ]
  }
}

module.exports = config
