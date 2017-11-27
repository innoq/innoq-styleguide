---
title: INNOQ Styleguide
---

## Installation

Using npm:

    npm install innoq-styleguide

Using yarn:

    yarn add innoq-styleguide

## Using JavaScript components

Our JS components are written in ES2015 and are based on JavaScript Custom Elements.
We don't bundle any polyfill for `customElements`, use
[document-register-element](https://github.com/WebReflection/document-register-element)
if needed.
