# INNOQ Styleguide and Component Library

[![Build Status](https://travis-ci.org/innoq/innoq-styleguide.svg?branch=master)](https://travis-ci.org/innoq/innoq-styleguide)

## Without Docker

Install:

    yarn install

This starts a local development server complete with asset pipeline:

    yarn start

Export a static site to `./dist/site`

    yarn run site

## With Docker & Docker-Compose

    docker-compose up

You need to prefix all maintenance commands from above like `yarn …` with

    docker-compose run --rm web …

## Deployment

Everything in master gets deployed automatically to
https://innoq.github.io/innoq-styleguide.

See `.travis.yml` for more info.

## Generate assets locally

    yarn run compile

After that, you'll find all the relevant assets in `./dist/`.

## Updating web fonts

We're currently hosting all of our web fonts (including icons) on innoq.com.
To update them:

1. Go to https://gitlab.innoq.com/innoq/innoq.com-cms/app/assets/fonts
2. Replace the font files you need to update
3. Commit + push
4. Wait until the new versions are deployed
5. Update `$cachebuster` for the updated font families in the style guide;
   you can use a random hash for that: `date +%s | md5`

## Release

Just hit `ENTER` all the time to release a new version.

![Just. hit. Enter.](http://www.reactiongifs.com/r/Dz3nk.gif)

Travis deals with npm publishing, no need to answer
with "YES" here.

### Patch level version (auto increment)

    $ yarn release

### Minor

    $ yarn release -- minor

### Major

    $ yarn release -- major
