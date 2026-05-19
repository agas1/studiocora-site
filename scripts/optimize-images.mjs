// One-off: compress heavy source PNGs to lean WebP.
// Run: node scripts/optimize-images.mjs
import sharp from 'sharp'
import { stat } from 'node:fs/promises'

const jobs = [
  { in: 'public/amanda.png', out: 'public/amanda.webp', w: 640, q: 82 },
  { in: 'public/agatha.png', out: 'public/agatha.webp', w: 640, q: 82 },
  { in: 'public/image.png', out: 'public/office.webp', w: 1600, q: 78 },
]

for (const j of jobs) {
  const before = (await stat(j.in)).size
  await sharp(j.in)
    .resize({ width: j.w, withoutEnlargement: true })
    .webp({ quality: j.q })
    .toFile(j.out)
  const after = (await stat(j.out)).size
  const pct = (100 - (after / before) * 100).toFixed(1)
  console.log(
    `${j.in} ${(before / 1024).toFixed(0)}KB -> ${j.out} ${(after / 1024).toFixed(0)}KB (-${pct}%)`
  )
}
