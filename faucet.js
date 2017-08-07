const config = {
  js: {
    manifest: false,
    bundles: [{
      entryPoint: './lib/views.jsx',
      format: 'cjs',
      moduleName: 'createElement',
      transpiler: {
        features: ['es2015', 'jsx'],
        jsx: {
          'pragma': 'createElement'
        }
      },
      target: './dist/views.js'
    }]
  },
  sass: {
    manifest: {
      file: './public/css.json',
      baseURI: '/'
    },
    assets: [],
    bundles: [{
      entryPoint: './components/index.scss',
      target: './public/css/bundle.css'
    }]
  }
}

module.exports = config
