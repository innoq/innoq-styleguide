const config = {
  js: {
    manifest: false,
    bundles: [{
      entryPoint: './lib/js/index.js',
      format: 'cjs',
      moduleName: 'createElement',
      transpiler: {
        features: ['es2015', 'jsx'],
        jsx: {
          'pragma': 'createElement'
        }
      },
      target: './dist/index.js'
    }]
  },
  sass: {
    manifest: {
      file: './public/css.json',
      baseURI: '/'
    },
    assets: [],
    bundles: [{
      entryPoint: './lib/styles/index.scss',
      target: './public/css/bundle.css'
    }]
  }
}

module.exports = config
