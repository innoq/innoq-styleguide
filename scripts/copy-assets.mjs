// Copies static assets into public/assets, replacing Faucet's `static` task.
// - lib/images/**            -> public/assets/**
// - normalize.css (npm pkg)  -> public/assets/normalize.css
import { cpSync, mkdirSync } from 'node:fs'

const OUT = 'public/assets'

mkdirSync(OUT, { recursive: true })

// Mirror lib/images into public/assets (merges with compiled CSS/JS already there).
cpSync('lib/images', OUT, {
  recursive: true,
  filter: (src) => !src.endsWith('.DS_Store'),
})

cpSync('node_modules/normalize.css/normalize.css', `${OUT}/normalize.css`)

console.log('[copy-assets] static assets copied to public/assets')
