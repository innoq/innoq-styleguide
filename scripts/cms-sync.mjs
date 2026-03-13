import { cpSync, mkdirSync, readdirSync } from 'fs'
import { join, basename } from 'path'

function findFiles(dir, extensions) {
  const results = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findFiles(full, extensions))
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(full)
    }
  }
  return results
}

mkdirSync('dist/assets', { recursive: true })
mkdirSync('dist/sass', { recursive: true })
mkdirSync('dist/js/components', { recursive: true })

cpSync('public/assets', 'dist/assets', { recursive: true })
cpSync('lib/styles', 'dist/sass', { recursive: true })

for (const file of findFiles('components', ['.js'])) {
  cpSync(file, join('dist/js/components', basename(file)))
}

console.log('[cms-sync] dist/ aktualisiert')
