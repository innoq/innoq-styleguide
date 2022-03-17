# INNOQ Styleguide and Component Library

[![Build Status](https://github.com/innoq/innoq-styleguide/workflows/Build%20and%20Release/badge.svg)](https://github.com/innoq/innoq-styleguide/actions)

## Before you start
We use git-lfs. So please install https://git-lfs.github.com/ before you clone this repo.

## How to install
### Without Docker

Install:

    yarn install

This starts a local development server complete with asset pipeline:

    yarn start

Export a static site to `./dist/site`

    yarn run site

### With Docker & Docker-Compose

    docker-compose up

You need to prefix all maintenance commands from above like `yarn …` with

    docker-compose run --rm web …

## Deployment

Each new relese gets deployed automatically to https://innoq.style/.

See `.github/workflow/build.yml` for more info.

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

GitHub Actions deals with npm publishing.

### Patch level version (auto increment)

    $ yarn release

### Minor

    $ yarn release minor

### Major

    $ yarn release major
