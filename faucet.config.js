const config = {
  static: {
    manifest: {
      file: 'public/static.json',
      baseURI: (bundlePath, baseName) => `${process.env.BASE_URI || ''}/static/${baseName}`
    },
    bundles: [
      {
        source: 'lib/images',
        target: 'public/static'
      }
    ]
  },
  sass: {
    manifest: false,
    assets: [
      'public/static.json'
    ],
    bundles: [
      {
        entryPoint: 'lib/styles/index.scss',
        target: 'public/css/bundle.css'
      },
      {
        entryPoint: 'node_modules/normalize.css/normalize.css',
        target: 'public/css/normalize.css'
      }
    ]
  },
  js: {
    manifest: false,
    bundles: [
      {
        entryPoint: 'lib/scripts/index.js',
        target: 'public/js/bundle.js'
      },
      {
        entryPoint: 'node_modules/document-register-element/build/document-register-element.js',
        target: 'public/js/document-register-element.js'
      }
    ]
  }
}

module.exports = config
