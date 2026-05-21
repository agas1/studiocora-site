// One-off: cache picsum.photos placeholder images locally so Next can
// optimize them (responsive sizes, AVIF/WebP) and we stop hitting an
// external host on every page load.
//
// Run: node scripts/cache-work-images.mjs
import sharp from 'sharp'
import { mkdir, writeFile, stat } from 'node:fs/promises'

await mkdir('public/work', { recursive: true })

const covers = [
  { seed: 'cora-1', w: 800, h: 1200 },
  { seed: 'cora-2', w: 800, h: 1400 },
  { seed: 'cora-3', w: 900, h: 1600 },
  { seed: 'cora-4', w: 800, h: 1400 },
  { seed: 'cora-5', w: 800, h: 1200 },
]
const extras = covers.flatMap((c, i) =>
  ['a', 'b', 'c'].map((suf) => ({
    seed: `${c.seed}${suf}`,
    w: 300,
    h: 300,
    out: `public/work/${i + 1}${suf}.webp`,
  }))
)

const jobs = [
  ...covers.map((c, i) => ({
    seed: c.seed,
    w: c.w,
    h: c.h,
    out: `public/work/${i + 1}.webp`,
  })),
  ...extras,
]

for (const j of jobs) {
  const url = `https://picsum.photos/seed/${j.seed}/${j.w}/${j.h}?grayscale`
  const r = await fetch(url, { redirect: 'follow' })
  if (!r.ok) {
    console.error('failed', url, r.status)
    continue
  }
  const buf = Buffer.from(await r.arrayBuffer())
  // Save once to tmp for sharp; pipe through webp at q82.
  await sharp(buf).webp({ quality: 82 }).toFile(j.out)
  const size = (await stat(j.out)).size
  console.log(`${j.out} ${(size / 1024).toFixed(0)}KB`)
}
