const config = {
  targetDir: 'dist',
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
    target: './bundle.js'
  }]
}

module.exports = {
  js: config
}
