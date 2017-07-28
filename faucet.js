const config = {
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
}

module.exports = {
  js: config
}
