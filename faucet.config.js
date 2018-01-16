const config = {
  static: {
    manifest: {
      file: 'public/assets/static.json',
      baseURI: (bundlePath, baseName) => `${process.env.BASE_URI || ''}/assets/static/${baseName}`
    },
    bundles: [
      {
        source: 'lib/images',
        target: 'public/assets/static'
      }
    ]
  },
  sass: {
    manifest: false,
    assets: [
      'public/assets/static.json'
    ],
    bundles: [
      {
        entryPoint: 'lib/styles/index.scss',
        target: 'public/assets/stylesheets/bundle.css'
      },
      {
        entryPoint: 'node_modules/normalize.css/normalize.css',
        target: 'public/assets/stylesheets/normalize.css'
      }
    ]
  },
  js: {
    manifest: false,
    bundles: [
      {
        entryPoint: 'lib/scripts/index.js',
        target: 'public/assets/javascripts/bundle.js'
      },
      {
        entryPoint: 'node_modules/document-register-element/build/document-register-element.js',
        target: 'public/assets/javascripts/document-register-element.js'
      }
    ]
  }
}

module.exports = config
