'use client'

import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const
const RED = '#FF3B30'

const metrics = [
  {
    value: '7+',
    label: 'Creative experience',
    body: 'Years building identities, visual systems and creative experiences.',
  },
  {
    value: '8+',
    label: 'Years in technology',
    body: 'Technology, infrastructure and digital products supporting real businesses.',
  },
  {
    value: '4+',
    label: 'Years in development',
    body: 'Building websites, platforms and digital experiences from idea to production.',
  },
  {
    value: '2',
    label: 'Co-founders',
    body: 'Design and engineering working together from strategy through execution.',
  },
]

function RollingMetric({
  value,
  index,
}: {
  value: string
  index: number
}) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{
          y: 70,
          opacity: 0,
          filter: 'blur(8px)',
        }}
        whileInView={{
          y: [70, -32, 22, -10, 0],
          opacity: [0, 1, 1, 1, 1],
          filter: [
            'blur(8px)',
            'blur(3px)',
            'blur(2px)',
            'blur(1px)',
            'blur(0px)',
          ],
        }}
        viewport={{
          once: true,
          margin: '-80px',
        }}
        transition={{
          duration: 1.3,
          delay: index * 0.12,
          ease,
          times: [0, 0.35, 0.6, 0.82, 1],
        }}
        className="
          text-[58px]
          font-semibold
          leading-none
          tracking-[-0.07em]
          md:text-[72px]
          lg:text-[84px]
        "
      >
        {value}
      </motion.div>
    </div>
  )
}

export function NumbersSection() {
  return (
    <section
            className="
              mx-auto
              w-full
              max-w-[1440px]
              px-6
              py-20
              md:px-10
              md:py-28
            "
          >
    
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease }}
              className="mb-12 md:mb-16"
            >
    
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#0A0A0A]/5
                  px-3 py-2
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                "
              >
                <span
                  className="h-1.5 w-1.5"
                  style={{ backgroundColor: RED }}
                />
    
                By the numbers
              </div>
    
            </motion.div>
    
            <div className="grid grid-cols-2 gap-x-7 gap-y-14 md:grid-cols-4">
    
              {metrics.map((metric, index) => (
    
                <motion.div
                  key={metric.label}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: '-80px',
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                    ease,
                  }}
                >
    
                  <RollingMetric
                    value={metric.value}
                    index={index}
                  />
    
                  <div className="mt-3 border-t border-dashed border-[#0A0A0A]/60 pt-4">
    
                    <h3
                      className="
                        text-[15px]
                        font-semibold
                        tracking-[-0.02em]
                        md:text-base
                      "
                    >
                      {metric.label}
                    </h3>
    
                    <p
                      className="
                        mt-2
                        max-w-[250px]
                        text-[11px]
                        leading-[1.55]
                        text-[#0A0A0A]/60
                        md:text-xs
                      "
                    >
                      {metric.body}
                    </p>
    
                  </div>
    
                </motion.div>
    
              ))}
    
            </div>
    
          </section>
  )
}
