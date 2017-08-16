'use strict'

/*
* Require the path module
*/
const path = require('path')

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create()

/*
 * Require the complate adapter for Fractal and configure it
 */
const complateAdapter = require('complate-fractal')({
  bundlePath: path.join(__dirname, 'dist', 'index.js')
})

/*
 * Give your project a title.
 */
fractal.set('project.title', 'innoQ Styleguide')

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'))

/*
 * Register complate adapter.
 */
fractal.components.engine(complateAdapter)
fractal.components.set('ext', '.html')

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'))

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'))

/*
 * Tell Fractal where to export the static site to.
 */
fractal.web.set('builder.dest', path.join(__dirname, 'dist', 'site'))
