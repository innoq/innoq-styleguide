const config = {
  static: {
    manifest: {
      file: 'public/manifests/static.json',
      baseURI: (bundlePath, baseName) => `/static/${baseName}`
    },
    bundles: [
      {
        source: 'assets/images',
        target: 'public/static'
      }
    ]
  },
  sass: {
    manifest: {
      file: 'public/css.json',
      baseURI: (bundlePath, baseName) => `/css/${baseName}`
    },
    // assets: [
    //   'public/manifests/static.json'
    // ],
    prefixes: {
      browsers: [ 'last 2 versions' ]
    },
    bundles: [
      {
        entryPoint: 'lib/styles/index.scss',
        target: 'public/css/bundle.css'
      },
      {
        entryPoint: 'node_modules/normalize.css/normalize.css',
        target: 'public/css/normalize.css'
      },
      {
        entryPoint: 'lib/styles/index.scss',
        target: 'dist/css/bundle.css'
      },
      {
        entryPoint: 'node_modules/normalize.css/normalize.css',
        target: 'dist/css/normalize.css'
      }
    ]
  },
  js: {
    manifest: false,
    bundles: [{
      entryPoint: 'lib/scripts/index.js',
      target: 'dist/js/bundle.js'
    }]
  }
}

module.exports = config
