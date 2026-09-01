'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo } from '../Logo'
import { RollingText } from '@/components/ui/RollingText'
import { getContent, type Locale } from '@/content'
import { whatsappLinkProps } from '@/lib/whatsapp'

const ease = [0.16, 1, 0.3, 1] as const

type MenuItem = {
  label: string
  href: string
  preview: string
}

function MegaMenuLink({
  item,
  active,
  onActivate,
  onDeactivate,
}: {
  item: MenuItem
  active: boolean
  onActivate: () => void
  onDeactivate: () => void
}) {
  return (
    <Link
      href={item.href}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      className="group relative flex min-h-9 w-fit items-center text-[17px] font-semibold tracking-[-0.03em] transition-colors duration-500 ease-out hover:text-[#7473F5] focus-visible:text-[#7473F5]"
    >
      <span>{item.label}</span>
      <AnimatePresence initial={false}>
        {active && (
          <motion.span
            initial={{ opacity: 0, clipPath: 'inset(0 0 0 100%)', scale: 0.96 }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)', scale: 1 }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 0 100%)', scale: 0.98, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[calc(100%+12px)] h-8 w-12 overflow-hidden rounded-[7px] border border-white/10"
            aria-hidden="true"
          >
            <Image src={item.preview} alt="" fill sizes="48px" className="object-cover" />
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  )
}

export function Header({ locale, languageHrefs, variant = 'dark', compactLogo = false }: { locale: Locale; languageHrefs?: { pt: string; en: string }; variant?: 'dark' | 'light'; compactLogo?: boolean }) {
  const [pagesMenuOpen, setPagesMenuOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileDialogRef = useRef<HTMLDivElement>(null)

  const copy = getContent(locale)
  const isPt = locale === 'pt'
  const isLight = variant === 'light'

  const homeHref = isPt ? '/pt' : '/en'
  const studioHref = isPt ? '/pt/sobre' : '/en/studio'
  const workHref = isPt ? '/pt/portfolio' : '/en/work'
  const contactHref = isPt ? '/pt/contato' : '/en/contact'
  const insightsHref = isPt ? '/pt/blog' : '/en/insights'

  const studioItems = isPt
    ? [
        {
          label: 'Estúdio',
          href: '/pt/sobre',
          preview: '/hero1.jpg',
        },
        {
          label: 'Projetos',
          href: '/pt/portfolio',
          preview: '/hero2.jpg',
        },
        {
          label: 'Contato',
          href: '/pt/contato',
          preview: '/hero1.jpg',
        },
      ]
    : [
        {
          label: 'Studio',
          href: '/en/studio',
          preview: '/hero1.jpg',
        },
        {
          label: 'Work',
          href: '/en/work',
          preview: '/hero2.jpg',
        },
        {
          label: 'Contact',
          href: '/en/contact',
          preview: '/hero1.jpg',
        },
      ]

  const serviceItems = isPt
    ? [
        {
          label: 'Gestão de Redes Sociais',
          href: '/pt/servicos/gestao-de-redes-sociais',
          preview: '/hero1.jpg',
        },
        {
          label: 'Branding',
          href: '/pt/servicos/branding',
          preview: '/hero2.jpg',
        },
        {
          label: 'Identidade Visual',
          href: '/pt/servicos/identidade-visual',
          preview: '/hero1.jpg',
        },
        {
          label: 'Landing Pages',
          href: '/pt/servicos/landing-pages',
          preview: '/hero2.jpg',
        },
        {
          label: 'Desenvolvimento Web',
          href: '/pt/servicos/desenvolvimento-web',
          preview: '/hero1.jpg',
        },
      ]
    : [
        {
          label: 'Social Media Management',
          href: '/en/services/social-media-management',
          preview: '/hero1.jpg',
        },
        {
          label: 'Branding',
          href: '/en/services/branding',
          preview: '/hero2.jpg',
        },
        {
          label: 'Visual Identity',
          href: '/en/services/visual-identity',
          preview: '/hero1.jpg',
        },
        {
          label: 'Landing Pages',
          href: '/en/services/landing-pages',
          preview: '/hero2.jpg',
        },
        {
          label: 'Web Development',
          href: '/en/services/web-development',
          preview: '/hero1.jpg',
        },
      ]

  const contentItems = isPt
    ? [
        {
          label: 'Insights',
          href: '/pt/blog',
          preview: '/hero2.jpg',
        },
        {
          label: 'Cases',
          href: '/pt/portfolio',
          preview: '/hero1.jpg',
        },
      ]

    : [
        {
          label: 'Insights',
          href: '/en/insights',
          preview: '/hero2.jpg',
        },
        {
          label: 'Case Studies',
          href: '/en/work',
          preview: '/hero1.jpg',
        },
      ]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPagesMenuOpen(false)
        setMobileMenuOpen(false)
      }
      if (event.key === 'Tab' && mobileMenuOpen && mobileDialogRef.current) {
        const focusable = Array.from(mobileDialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }
    if (!mobileMenuOpen && !pagesMenuOpen) return
    const mobileMenuButton = mobileMenuButtonRef.current
    const previousOverflow = document.body.style.overflow
    if (mobileMenuOpen) document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      if (mobileMenuOpen) mobileMenuButton?.focus()
    }
  }, [mobileMenuOpen, pagesMenuOpen])

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      onMouseLeave={() => {
        setPagesMenuOpen(false)
        setPreview(null)
      }}
      className={isLight ? 'relative z-50 grid grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]' : 'relative z-50 flex items-center justify-between'}
    >
      <Link
        href={homeHref}
        aria-label="Studio Cora"
        className="shrink-0"
      >
        <Logo
          studioColor={isLight ? '#0A0A0A' : '#FFFFFF'}
          className={compactLogo ? 'h-8 w-auto md:h-9' : 'h-9 w-auto md:h-11'}
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
          href={homeHref}
          className="transition-colors duration-200 hover:text-[#7473F5]"
        >
          {copy.header.home}
        </Link>

        <Link
          href={studioHref}
          className="transition-colors duration-200 hover:text-[#7473F5]"
        >
          {copy.header.studio}
        </Link>

        <Link
          href={workHref}
          className="transition-colors duration-200 hover:text-[#7473F5]"
        >
          {copy.header.work}
        </Link>

        <div
          className="relative"
          onMouseEnter={() => setPagesMenuOpen(true)}
          onFocus={() => setPagesMenuOpen(true)}
        >
          <button
            type="button"
            aria-expanded={pagesMenuOpen}
            aria-controls="pages-mega-menu"
            onClick={() => setPagesMenuOpen((current) => !current)}
            className="
              group
              flex
              items-center
              gap-2
              transition-colors
              duration-200
              hover:text-[#7473F5]
            "
          >
            {copy.header.pages}

            <motion.svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              animate={{ rotate: pagesMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="h-4 w-4 shrink-0 origin-center"
            >
              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </button>
        </div>

        <Link
          href={insightsHref}
          className="transition-colors duration-200 hover:text-[#7473F5]"
        >
          {copy.header.insights}
        </Link>

        <Link
          href={contactHref}
          aria-current={isLight ? 'page' : undefined}
          className={isLight ? 'text-[#7473F5]' : 'transition-colors duration-200 hover:text-[#7473F5]'}
        >
          {copy.header.contact}
        </Link>
      </nav>

      <div className={isLight ? 'flex items-center gap-3 justify-self-end' : 'flex items-center gap-3'}>
        <button
          ref={mobileMenuButtonRef}
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isPt ? 'Abrir menu' : 'Open menu'}
          onClick={() => setMobileMenuOpen(true)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm lg:hidden ${isLight ? 'border-black/20' : 'border-white/30'}`}
        >
          ☰
        </button>
        <div className={`hidden items-center gap-2 text-[11px] font-bold lg:flex ${isLight ? 'lg:hidden' : ''}`}>
          <Link
            href={languageHrefs?.pt ?? '/pt'}
            className={
              locale === 'pt' && !isLight
                ? 'text-white'
                : isLight ? 'text-black' : 'text-white/45 transition-colors hover:text-white'
            }
          >
            PT
          </Link>

          <span className="text-white/30">/</span>

          <Link
            href={languageHrefs?.en ?? '/en'}
            className={
              locale === 'en' && !isLight
                ? 'text-white'
                : isLight ? 'text-black' : 'text-white/45 transition-colors hover:text-white'
            }
          >
            EN
          </Link>
        </div>

        <Link
          {...whatsappLinkProps(locale, contactHref)}
          className={`group flex items-center gap-3 rounded-full px-4 py-2.5 text-[12px] font-semibold transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#6966F0] hover:text-white md:px-5 md:py-3 md:text-[14px] ${isLight ? 'bg-[#0A0A0A] text-white' : 'bg-white text-black'}`}
        >
          <span className="hidden sm:inline">
            <RollingText>{copy.header.cta}</RollingText>
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
      </div>

      <AnimatePresence>
        {pagesMenuOpen && (
          <motion.div
            id="pages-mega-menu"
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
                  {isPt ? 'Studio' : 'Studio'}
                </p>

                <div className="flex flex-col gap-4">
                  {studioItems.map((item) => <MegaMenuLink key={item.href} item={item} active={preview === item.href} onActivate={() => setPreview(item.href)} onDeactivate={() => setPreview(null)} />)}
                </div>
              </div>

              <div className="col-span-6">
                <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">
                  {isPt ? 'Serviços' : 'Services'}
                </p>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {serviceItems.map((item) => <MegaMenuLink key={item.href} item={item} active={preview === item.href} onActivate={() => setPreview(item.href)} onDeactivate={() => setPreview(null)} />)}
                </div>
              </div>

              <div className="col-span-3">
                <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">
                  {isPt ? 'Conteúdo' : 'Content'}
                </p>

                <div className="flex flex-col gap-4">
                  {contentItems.map((item) => <MegaMenuLink key={item.href} item={item} active={preview === item.href} onActivate={() => setPreview(item.href)} onDeactivate={() => setPreview(null)} />)}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileDialogRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label={isPt ? 'Navegação principal' : 'Main navigation'}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-3 z-[100] overflow-y-auto rounded-[24px] bg-[#070707] p-6 text-white lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo studioColor="#FFFFFF" className="h-9 w-auto" />
              <button autoFocus type="button" onClick={() => setMobileMenuOpen(false)} aria-label={isPt ? 'Fechar menu' : 'Close menu'} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-xl">×</button>
            </div>
            <nav className="mt-10" aria-label={isPt ? 'Menu mobile' : 'Mobile menu'}>
              <div className="grid gap-3 text-[clamp(2rem,10vw,4rem)] font-semibold leading-none">
                {[{ label: copy.header.home, href: homeHref }, { label: copy.header.studio, href: studioHref }, { label: copy.header.work, href: workHref }, { label: copy.header.insights, href: insightsHref }, { label: copy.header.contact, href: contactHref }].map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>)}
              </div>
              <div className="mt-10 border-t border-white/20 pt-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">{isPt ? 'Serviços' : 'Services'}</p>
                <div className="mt-4 grid gap-3">{serviceItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-lg">{item.label}</Link>)}</div>
              </div>
              <div className="mt-10 flex gap-3 border-t border-white/20 pt-6 text-sm font-bold">
                <Link href={languageHrefs?.pt ?? '/pt'} onClick={() => setMobileMenuOpen(false)} aria-current={locale === 'pt' ? 'page' : undefined} className={locale === 'pt' ? 'text-white' : 'text-white/45'}>PT</Link>
                <span className="text-white/30">/</span>
                <Link href={languageHrefs?.en ?? '/en'} onClick={() => setMobileMenuOpen(false)} aria-current={locale === 'en' ? 'page' : undefined} className={locale === 'en' ? 'text-white' : 'text-white/45'}>EN</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
