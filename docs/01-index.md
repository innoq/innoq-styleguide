---
title: INNOQ Styleguide
---

## Updating web fonts

We're currently hosting all of our web fonts (including icons) on innoq.com.
To update them:

1. Go to [https://gitlab.innoq.com/innoq/innoq.com-cms/app/assets/fonts]
2. Replace the font files you need to update
3. Commit + push
4. Wait until the new versions are deployed
5. Increment the cachebuster query parameter in CSS `url()` references in the style guide
