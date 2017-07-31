const config = {
  js: {
    manifest: false,
    bundles: [{
      entryPoint: './components/index.cjs',
      format: 'cjs',
      moduleName: 'createElement',
      transpiler: {
        features: ['es2015', 'jsx'],
        jsx: {
          'pragma': 'createElement'
        }
      },
      target: './components/index.js'
    }]
  },
  sass: {
    manifest: {
      file: './dist/public/css.json',
      baseURI: '/'
    },
    assets: [],
    bundles: [{
      entryPoint: './sass/bundle.scss',
      target: './dist/public/css/bundle.css'
    }]
  }
}

module.exports = config
