const config = {
  manifest: false,
  bundles: [{
    entryPoint: './components/index.js',
    format: 'cjs',
    moduleName: 'createElement',
    transpiler: {
      features: ['es2015', 'jsx'],
      jsx: {
        'pragma': 'createElement'
      }
    },
    target: './dist/bundle.js'
  }]
}

module.exports = {
  js: config
}
