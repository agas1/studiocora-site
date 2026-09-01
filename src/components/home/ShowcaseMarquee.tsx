'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const SHOWCASE_IMAGES = [
  '/hero1.jpg',
  '/hero2.jpg',
  '/hero1.jpg',
  '/hero2.jpg',
] as const

export function ShowcaseMarquee() {
  const duplicated = [...SHOWCASE_IMAGES, ...SHOWCASE_IMAGES, ...SHOWCASE_IMAGES]

  return (
    <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="w-full overflow-hidden py-6 md:py-10">
      <motion.div
        animate={{
          x: ['0%', '-33.3333%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex w-max gap-3 md:gap-4"
      >
        {duplicated.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="
              relative
              h-[340px]
              w-[250px]
              shrink-0
              overflow-hidden
              rounded-[18px]
              sm:h-[410px]
              sm:w-[310px]
              md:h-[500px]
              md:w-[380px]
            "
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 250px, (max-width: 768px) 310px, 380px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/5" />
          </div>
        ))}
      </motion.div>
    </motion.section>
  )
}
