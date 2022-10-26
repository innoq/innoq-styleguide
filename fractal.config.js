/* eslint-env node */
'use strict'

/*
 * Require the path module
 */
const path = require('path')

/*
 * Require Fractal modules
 */
const fractal = (module.exports = require('fractal-fork').fractal.create())
const fractalTheme = require('fractal-fork').mandelbrot({
  skin: 'black',
  styles: ['default', '/assets/styleguide-theme.css'],
  favicon: '/assets/favicons/edition-02/favicon-apricot/favicon.svg',
})
fractalTheme.addLoadPath(path.join(__dirname, '/theme-overrides'))

fractal.web.theme(fractalTheme)

/*
 * Give your project a title.
 */
fractal.set('project.title', 'INNOQ Styleguide')

const componentsDir = path.join(__dirname, 'components')
fractal.components.set('ext', '.html')
fractal.components.set('path', componentsDir)

fractal.components.set('default.preview', '@preview')

/*
 * Tell Fractal where to look for documentation pages and use HTML as default.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'))
fractal.docs.set('ext', '.html')

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'))

/*
 * Tell Fractal where to export the static site to.
 */
fractal.web.set('builder.dest', path.join(__dirname, 'dist', 'site'))
