import { existsSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'fs'
import { join } from 'path'
import { optimize as svgoOptimize } from 'svgo'
import sharp from 'sharp'

const IMAGE_MAX_WIDTH = 2400
const IMAGE_QUALITY = 82
const SKIP_DIRS = ['favicons']

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

const rasterFiles = findFiles('public/assets', ['.jpg', '.jpeg', '.webp', '.png'])
for (const file of rasterFiles) {
  if (SKIP_DIRS.some((dir) => file.includes(`/${dir}/`))) continue

  const img = sharp(file)
  const meta = await img.metadata()
  const pipeline = meta.width > IMAGE_MAX_WIDTH ? img.resize(IMAGE_MAX_WIDTH) : img
  const tmp = file + '.tmp'

  if (meta.format === 'png') {
    await pipeline.png({ compressionLevel: 9 }).toFile(tmp)
  } else if (meta.format === 'webp') {
    await pipeline.webp({ quality: IMAGE_QUALITY }).toFile(tmp)
  } else {
    await pipeline.jpeg({ quality: IMAGE_QUALITY, mozjpeg: true }).toFile(tmp)
  }
  renameSync(tmp, file)
}

const svgFiles = findFiles('public/assets', ['.svg'])
for (const file of svgFiles) {
  if (SKIP_DIRS.some((dir) => file.includes(`/${dir}/`))) continue
  const result = svgoOptimize(readFileSync(file, 'utf-8'), { path: file })
  writeFileSync(file, result.data)
}

// Generate JPG fallbacks from WebP files so npm package consumers
// can use <img src> or CSS with .jpg paths if needed.
const webpFiles = findFiles('public/assets/bg-images', ['.webp'])
for (const file of webpFiles) {
  const jpgPath = file.replace(/\.webp$/, '.jpg')
  if (!existsSync(jpgPath)) {
    await sharp(file).jpeg({ quality: IMAGE_QUALITY, mozjpeg: true }).toFile(jpgPath)
  }
}

console.log('[optimize-images] Bilder optimiert')
