'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo } from '../Logo'

const ease = [0.16, 1, 0.3, 1] as const
const RED = '#FF3B30'

export function Header() {
  const [pagesMenuOpen, setPagesMenuOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const menuItems = [
    {
      label: 'Studio',
      href: '/sobre',
      preview: '/hero1.jpg',
    },
    {
      label: 'Projetos',
      href: '/portfolio',
      preview: '/hero2.jpg',
    },
    {
      label: 'Contato',
      href: '/contato',
      preview: '/hero1.jpg',
    },
  ]

  const serviceItems = [
    {
      label: 'Gestão de Redes Sociais',
      href: '/gestao-de-redes-sociais',
      preview: '/hero1.jpg',
    },
    {
      label: 'Branding',
      href: '/branding',
      preview: '/hero2.jpg',
    },
    {
      label: 'Identidade Visual',
      href: '/identidade-visual',
      preview: '/hero1.jpg',
    },
    {
      label: 'Direção Criativa',
      href: '/direcao-criativa',
      preview: '/hero2.jpg',
    },
    {
      label: 'Landing Pages',
      href: '/landing-pages',
      preview: '/hero1.jpg',
    },
    {
      label: 'Desenvolvimento Web',
      href: '/desenvolvimento-web',
      preview: '/hero2.jpg',
    },
  ]

  const contentItems = [
    {
      label: 'Insights',
      href: '/blog',
      preview: '/hero2.jpg',
    },
    {
      label: 'Cases',
      href: '/portfolio',
      preview: '/hero1.jpg',
    },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      onMouseLeave={() => {
        setPagesMenuOpen(false)
        setPreview(null)
      }}
      className="relative z-50 flex items-center justify-between"
    >
      <Link
        href="/"
        aria-label="Studio Cora"
        className="shrink-0"
      >
        <Logo
          studioColor="#FFFFFF"
          className="h-9 w-auto md:h-11"
        />
      </Link>

      <nav
        className="
          hidden
          items-center
          gap-9
          text-[14px]
          font-semibold
          tracking-[-0.025em]
          lg:flex
          xl:gap-11
          xl:text-[15px]
        "
      >
        <Link
          href="/"
          className="transition-colors duration-200 hover:text-[#FF3B30]"
        >
          Início
        </Link>

        <Link
          href="/sobre"
          className="transition-colors duration-200 hover:text-[#FF3B30]"
        >
          Estúdio
        </Link>

        <Link
          href="/portfolio"
          className="transition-colors duration-200 hover:text-[#FF3B30]"
        >
          Projetos
        </Link>

        <div
          className="relative"
          onMouseEnter={() => setPagesMenuOpen(true)}
        >
          <button
            type="button"
            onClick={() => setPagesMenuOpen((current) => !current)}
            className="
              group
              flex
              items-center
              gap-2
              transition-colors
              duration-200
              hover:text-[#FF3B30]
            "
          >
            Páginas

            <motion.span
              animate={{
                rotate: pagesMenuOpen ? 180 : 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="text-[17px] font-normal"
            >
              ⌄
            </motion.span>
          </button>
        </div>

        <Link
          href="/blog"
          className="transition-colors duration-200 hover:text-[#FF3B30]"
        >
          Insights
        </Link>

        <Link
          href="/contato"
          className="transition-colors duration-200 hover:text-[#FF3B30]"
        >
          Contato
        </Link>
      </nav>

      <Link
        href="/contato"
        className="
          group
          flex
          items-center
          gap-3
          rounded-full
          bg-white
          px-4 py-2.5
          text-[12px]
          font-semibold
          text-black
          transition-transform
          duration-300
          hover:-translate-y-0.5
          md:px-5
          md:py-3
          md:text-[14px]
        "
      >
        <span className="hidden sm:inline">
          Agende uma conversa
        </span>

        <span
          className="
            text-base
            transition-transform
            duration-300
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
          "
        >
          ↗
        </span>
      </Link>

      <AnimatePresence>
        {pagesMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -12,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.99,
            }}
            transition={{
              duration: 0.3,
              ease,
            }}
            onMouseEnter={() => setPagesMenuOpen(true)}
            className="
              absolute
              left-0
              right-0
              top-[calc(100%+20px)]
              hidden
              overflow-hidden
              rounded-[22px]
              border border-white/10
              bg-[#070707]
              p-8
              text-white
              shadow-2xl
              lg:block
            "
          >
            <div className="relative grid grid-cols-12 gap-x-10">

              <div className="col-span-3">
                <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">
                  Studio
                </p>

                <div className="flex flex-col gap-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onMouseEnter={() => setPreview(item.preview)}
                      onMouseLeave={() => setPreview(null)}
                      className="
                        text-[17px]
                        font-semibold
                        tracking-[-0.03em]
                        transition-colors
                        hover:text-[#FF3B30]
                      "
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="col-span-5">
                <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">
                  Serviços
                </p>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onMouseEnter={() => setPreview(item.preview)}
                      onMouseLeave={() => setPreview(null)}
                      className="
                        text-[17px]
                        font-semibold
                        tracking-[-0.03em]
                        transition-colors
                        hover:text-[#FF3B30]
                      "
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="col-span-2">
                <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">
                  Conteúdo
                </p>

                <div className="flex flex-col gap-4">
                  {contentItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onMouseEnter={() => setPreview(item.preview)}
                      onMouseLeave={() => setPreview(null)}
                      className="
                        text-[17px]
                        font-semibold
                        tracking-[-0.03em]
                        transition-colors
                        hover:text-[#FF3B30]
                      "
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="col-span-2">
                <AnimatePresence mode="wait">
                  {preview && (
                    <motion.div
                      key={preview}
                      initial={{
                        opacity: 0,
                        scale: 0.94,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.96,
                        y: 5,
                      }}
                      transition={{
                        duration: 0.22,
                        ease,
                      }}
                      className="
                        relative
                        aspect-[4/3]
                        w-full
                        overflow-hidden
                        rounded-[12px]
                      "
                    >
                      <Image
                        src={preview}
                        alt="Preview da página"
                        fill
                        sizes="220px"
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
