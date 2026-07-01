// Autoprefixer runs after dart-sass, matching what faucet-pipeline-sass did.
// Target browsers are read from .browserslistrc.
module.exports = {
  plugins: [require('autoprefixer')],
}
