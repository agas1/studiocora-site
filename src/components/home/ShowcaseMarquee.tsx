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
  const duplicated = [...SHOWCASE_IMAGES, ...SHOWCASE_IMAGES]

  return (
    <section className="w-full overflow-hidden py-6 md:py-10">
      <motion.div
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: 26,
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
              h-[310px]
              w-[230px]
              shrink-0
              overflow-hidden
              rounded-[18px]
              sm:h-[380px]
              sm:w-[285px]
              md:h-[430px]
              md:w-[330px]
            "
          >
            <Image
              src={src}
              alt={`Studio Cora showcase ${index + 1}`}
              fill
              sizes="(max-width: 768px) 230px, 330px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/5" />
          </div>
        ))}
      </motion.div>
    </section>
  )
}
