'use strict'

/*
* Require the path module
*/
const path = require('path')

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create()

const complateAdapter = require('complate-fractal')({
  bundlePath: path.join(__dirname, 'dist', 'bundle.js')
})

/*
 * Give your project a title.
 */
fractal.set('project.title', 'innoQ Styleguide')

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'))
fractal.components.engine(complateAdapter)
fractal.components.set('ext', '.jsx')

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'))

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'))
