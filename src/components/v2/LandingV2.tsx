'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Logo } from '../Logo'
import { Art, type ArtVariant } from './ArtTiles'

const ease = [0.16, 1, 0.3, 1] as const

const BLUE = '#4B3FE4'
const RED = '#FF3539'

/* ---------- theme ---------- */

type Palette = {
  bg: string
  panel: string
  card: string
  ink: string
  inkSoft: string
  border: string
  blue: string
}

const light: Palette = {
  bg: '#F1EDE4',
  panel: '#E9E4D8',
  card: '#F1EDE4',
  ink: '#1C1B17',
  inkSoft: 'rgba(28,27,23,0.62)',
  border: 'rgba(28,27,23,0.15)',
  blue: BLUE,
}

const dark: Palette = {
  bg: '#141310',
  panel: '#201E17',
  card: '#201E17',
  ink: '#F1EDE4',
  inkSoft: 'rgba(241,237,228,0.6)',
  border: 'rgba(241,237,228,0.16)',
  blue: '#7A70F2',
}

/* ---------- i18n ---------- */

type Lang = 'en' | 'pt' | 'es'

type Dict = {
  nav: { work: string; studio: string; services: string }
  contactUs: string
  heroA: string
  heroB: string
  studioFor: string
  disc1: string
  disc2: string
  startProject: string
  whatWeDo: string
  whatWeDoDesc: string
  offers: { title: string; desc: string }[]
  aiH1: string
  aiH2: string
  aiNote: string
  aiFoot: string
  m1: string
  mPill: string
  m2: string
  mBlue: string
  promise: string
  theStudio: string
  roles: string[]
  contactT1: string
  contactT2: string
  contactDesc: string
  fName: string
  fEmail: string
  fMsg: string
  send: string
  sending: string
  sent: string
  successMsg: string
  errGeneric: string
  errNetwork: string
  rights: string
}

const DICT: Record<Lang, Dict> = {
  en: {
    nav: { work: 'Work', studio: 'Studio', services: 'Services' },
    contactUs: 'Contact us',
    heroA: 'We build',
    heroB: 'brands that are anything but ordinary',
    studioFor: 'A creative studio for',
    disc1: 'BRANDING · UX',
    disc2: 'WEB · ENGINEERING',
    startProject: 'Start a project',
    whatWeDo: 'What we do',
    whatWeDoDesc:
      'Three ways we help brands connect with people through design, strategy and engineering.',
    offers: [
      {
        title: 'Brand Identity',
        desc: 'Strategy, naming and a visual system that says exactly what you stand for.',
      },
      {
        title: 'Digital Product',
        desc: 'Websites and products engineered to be fast, intuitive and beautiful.',
      },
      {
        title: 'Creative Direction',
        desc: 'From concept to launch — we shape ideas into work with real impact.',
      },
    ],
    aiH1: 'AI learns patterns.',
    aiH2: 'People create ruptures',
    aiNote: 'Patterns repeat. Ruptures are remembered.',
    aiFoot: 'That’s why design is still about human choices.',
    m1: 'One in a million,',
    mPill: 'one in a crowd',
    m2: '— beyond the surface,',
    mBlue: 'anything but ordinary.',
    promise: 'The Studio Cora promise · Est. 2025',
    theStudio: 'The studio',
    roles: ['Founder · Creative Director', 'Co-founder · Engineering'],
    contactT1: 'Let’s create',
    contactT2: 'something great.',
    contactDesc:
      'A short note, an early idea, a deadline you’re unsure about — we’ll get back within two working days.',
    fName: 'Your name',
    fEmail: 'Email',
    fMsg: 'Tell us about your project',
    send: 'Send message',
    sending: 'Sending…',
    sent: 'Sent — thank you',
    successMsg: 'We’ll be in touch shortly.',
    errGeneric: 'Something went wrong. Please try again.',
    errNetwork: 'Network error. Please try again.',
    rights: 'Studio Cora',
  },
  pt: {
    nav: { work: 'Trabalhos', studio: 'Estúdio', services: 'Serviços' },
    contactUs: 'Fale conosco',
    heroA: 'Criamos',
    heroB: 'marcas que são tudo menos comuns',
    studioFor: 'Um estúdio criativo de',
    disc1: 'BRANDING · UX',
    disc2: 'WEB · ENGENHARIA',
    startProject: 'Iniciar projeto',
    whatWeDo: 'O que fazemos',
    whatWeDoDesc:
      'Três formas de ajudar marcas a se conectarem com pessoas através de design, estratégia e engenharia.',
    offers: [
      {
        title: 'Identidade de Marca',
        desc: 'Estratégia, naming e um sistema visual que diz exatamente o que você representa.',
      },
      {
        title: 'Produto Digital',
        desc: 'Sites e produtos construídos para serem rápidos, intuitivos e bonitos.',
      },
      {
        title: 'Direção Criativa',
        desc: 'Do conceito ao lançamento — transformamos ideias em trabalho com impacto real.',
      },
    ],
    aiH1: 'A IA aprende padrões.',
    aiH2: 'Pessoas criam rupturas',
    aiNote: 'Padrões são repetidos. Rupturas são lembradas.',
    aiFoot: 'Por isso, design ainda é sobre escolhas humanas.',
    m1: 'Um em um milhão,',
    mPill: 'um em uma multidão',
    m2: '— além da superfície,',
    mBlue: 'tudo menos comum.',
    promise: 'A promessa do Studio Cora · Desde 2025',
    theStudio: 'O estúdio',
    roles: ['Fundadora · Diretora Criativa', 'Cofundadora · Engenharia'],
    contactT1: 'Vamos criar',
    contactT2: 'algo incrível.',
    contactDesc:
      'Um recado, uma ideia inicial, um prazo que você não tem certeza — respondemos em até dois dias úteis.',
    fName: 'Seu nome',
    fEmail: 'E-mail',
    fMsg: 'Conte sobre seu projeto',
    send: 'Enviar mensagem',
    sending: 'Enviando…',
    sent: 'Enviado — obrigado',
    successMsg: 'Entraremos em contato em breve.',
    errGeneric: 'Algo deu errado. Tente novamente.',
    errNetwork: 'Erro de rede. Tente novamente.',
    rights: 'Studio Cora',
  },
  es: {
    nav: { work: 'Trabajos', studio: 'Estudio', services: 'Servicios' },
    contactUs: 'Contáctanos',
    heroA: 'Creamos',
    heroB: 'marcas que son todo menos ordinarias',
    studioFor: 'Un estudio creativo de',
    disc1: 'BRANDING · UX',
    disc2: 'WEB · INGENIERÍA',
    startProject: 'Iniciar proyecto',
    whatWeDo: 'Qué hacemos',
    whatWeDoDesc:
      'Tres formas de ayudar a las marcas a conectar con las personas a través del diseño, la estrategia y la ingeniería.',
    offers: [
      {
        title: 'Identidad de Marca',
        desc: 'Estrategia, naming y un sistema visual que dice exactamente lo que representas.',
      },
      {
        title: 'Producto Digital',
        desc: 'Sitios y productos creados para ser rápidos, intuitivos y hermosos.',
      },
      {
        title: 'Dirección Creativa',
        desc: 'Del concepto al lanzamiento — convertimos ideas en trabajo con impacto real.',
      },
    ],
    aiH1: 'La IA aprende patrones.',
    aiH2: 'Las personas crean rupturas',
    aiNote: 'Los patrones se repiten. Las rupturas se recuerdan.',
    aiFoot: 'Por eso el diseño sigue siendo decisiones humanas.',
    m1: 'Uno en un millón,',
    mPill: 'uno entre la multitud',
    m2: '— más allá de la superficie,',
    mBlue: 'todo menos ordinario.',
    promise: 'La promesa de Studio Cora · Desde 2025',
    theStudio: 'El estudio',
    roles: ['Fundadora · Directora Creativa', 'Cofundadora · Ingeniería'],
    contactT1: 'Creemos algo',
    contactT2: 'extraordinario.',
    contactDesc:
      'Una nota breve, una idea inicial, un plazo del que no estás seguro — respondemos en dos días hábiles.',
    fName: 'Tu nombre',
    fEmail: 'Correo',
    fMsg: 'Cuéntanos sobre tu proyecto',
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    sent: 'Enviado — gracias',
    successMsg: 'Nos pondremos en contacto pronto.',
    errGeneric: 'Algo salió mal. Inténtalo de nuevo.',
    errNetwork: 'Error de red. Inténtalo de nuevo.',
    rights: 'Studio Cora',
  },
}

/* ---------- decor ---------- */

/** Fixed blue-tinted SVG noise — gives the page a printed/tactile feel. */
function NoiseGrain() {
  // Note: use literal `url(#n)` inside the SVG. `encodeURIComponent` turns the
  // `#` into `%23` in the data URL, which the browser decodes back to `#`
  // before handing the markup to the SVG parser.
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0.29 0 0 0 0 0.25 0 0 0 0 0.89 0 0 0 0.7 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`
  )
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.18] mix-blend-overlay"
      style={{ backgroundImage: `url("data:image/svg+xml;utf8,${svg}")` }}
    />
  )
}

/** Soft blue glow that drifts — atmospheric depth in the hero. */
function Orb({
  className,
  color,
  duration = 22,
  x = [0, 60, 0],
  y = [0, 40, 0],
}: {
  className?: string
  color: string
  duration?: number
  x?: number[]
  y?: number[]
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className ?? ''}`}
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      animate={{ x, y }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function Asterisk({ className, color = BLUE }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 2v20M2 12h20M4.5 4.5l15 15M19.5 4.5l-15 15"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Sparkle({ className, color = RED }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 1c.6 5.6 4.4 9.4 10 10-5.6.6-9.4 4.4-10 10-.6-5.6-4.4-9.4-10-10C7.6 10.4 11.4 6.6 12 1z"
        fill={color}
      />
    </svg>
  )
}

function Burst({ className, color = BLUE }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      <path
        d="M50 0l9 30 22-22-13 28 30-9-30 9 22 22-28-13 9 30-9-30-22 22 13-28-30 9 30-9L9 19l28 13L28 2l9 30 13-32z"
        fill={color}
      />
    </svg>
  )
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowRight({ className, color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 28 16" fill="none" className={className} aria-hidden>
      <path
        d="M2 8h22M18 2l6 6-6 6"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SunMoon({ dark: isDark }: { dark: boolean }) {
  return isDark ? (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <path
        d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ---------- static data ---------- */

// Placeholder portfolio photos cached locally in /public/work/ (originally
// pulled from picsum.photos by scripts/cache-work-images.mjs). Swap each
// `img` for the real design work when the assets are ready.
type Project = {
  title: string
  tag: string
  blurb: string
  extras: string[]
}

const tiles: { img: string; bg: string; project: Project }[] = [
  {
    img: '/Group%2014.png',
    bg: BLUE,
    project: {
      title: 'Studio Cora 2026',
      tag: '2026 · Brand Statement',
      blurb:
        'Visual manifesto for the studio itself — those who lead set the pace. Authorial identity, editorial typography in motion.',
      extras: ['/Group%2014.png', '/Group%2015.png', '/Group%2014.png'],
    },
  },
  {
    img: '/Group%2015.png',
    bg: '#1C1B17',
    project: {
      title: 'Além do Ordinário',
      tag: '2026 · Brand Manifesto',
      blurb:
        'A new Studio Cora chapter — poster-manifesto between paparazzi references and the protagonist. Editorial typography, photographic tension.',
      extras: ['/Group%2015.png', '/Group%2014.png', '/Group%2015.png'],
    },
  },
  {
    img: '/work/1.webp',
    bg: BLUE,
    project: {
      title: 'Forma & Function',
      tag: '2025 · Brand Identity',
      blurb:
        'A visual system that bridges architectural rigour with editorial warmth — from monogram to motion.',
      extras: [
        '/work/1a.webp',
        '/work/1b.webp',
        '/work/1c.webp',
      ],
    },
  },
]

// Heights tied to the visual SLOT (the stagger), per tile in order.
const slotHeights = [
  'md:h-[32rem]',
  'md:h-[42rem]',
  'md:h-[28rem]',
]

/* ---------- editorial theatre stage config ---------- */
// Per-stage signature: each project is a distinct "room" of the exhibition.
// Layout variant rotates the composition (different wordmark/image placement)
// so the three stages don't look like the same template repeated.
type StageVariant = 'topRight' | 'bottomLeft' | 'centerOffset'

type StageSignature = {
  variant: StageVariant
  bg: string
  ink: string
  inkSoft: string
  accent: string
  number: string
  category: string
  manifesto: string
  imgAspect: string
}

const STAGE_SIGNATURES: StageSignature[] = [
  // Studio Cora 2026 — brand blue + cream, red accent
  {
    variant: 'topRight',
    bg: BLUE,
    ink: '#F1EDE4',
    inkSoft: 'rgba(241,237,228,0.62)',
    accent: RED,
    number: '01',
    category: 'Brand Statement',
    manifesto: 'Those who lead — set the pace.',
    imgAspect: 'aspect-[4/5]',
  },
  // Além do Ordinário — deep black + cream, red accent
  {
    variant: 'bottomLeft',
    bg: '#0E0D0A',
    ink: '#F1EDE4',
    inkSoft: 'rgba(241,237,228,0.55)',
    accent: RED,
    number: '02',
    category: 'Brand Manifesto',
    manifesto: 'A new chapter — beyond the ordinary.',
    imgAspect: 'aspect-[3/4]',
  },
  // Forma & Function — cream + dark ink, brand blue accent
  {
    variant: 'centerOffset',
    bg: '#F1EDE4',
    ink: '#1C1B17',
    inkSoft: 'rgba(28,27,23,0.55)',
    accent: BLUE,
    number: '03',
    category: 'Brand Identity',
    manifesto: 'Rigour meets warmth — monogram to motion.',
    imgAspect: 'aspect-square',
  },
]

const offerMeta: { variant: ArtVariant; featured?: boolean }[] = [
  { variant: 'identity' },
  { variant: 'product', featured: true },
  { variant: 'direction' },
]

/* ---------- editorial theatre components ---------- */

// One stage = one full-viewport editorial composition for a project.
// Layout variant rotates wordmark/image placement per stage so the three
// rooms don't feel like the same template.
function Stage({
  tile,
  sig,
  total,
  onOpen,
  parallax,
}: {
  tile: (typeof tiles)[number]
  sig: StageSignature
  total: number
  onOpen: () => void
  parallax: MotionValue<number>
}) {
  // wordmark moves slightly slower than image to create depth on scroll
  const wordmarkY = useTransform(parallax, [-60, 60], [-22, 22])
  const imageY = useTransform(parallax, [-60, 60], [-10, 10])


  // composition variants — each stage has a distinct layout
  const layoutByVariant: Record<
    StageVariant,
    {
      wordmarkClass: string
      imageWrapClass: string
      metaClass: string
      lineClass: string
    }
  > = {
    topRight: {
      wordmarkClass:
        'absolute right-4 top-[10vh] z-10 max-w-[90vw] text-right text-[24vw] md:right-[6vw] md:top-[8vh] md:text-[16vw] lg:text-[14vw]',
      imageWrapClass:
        'absolute left-[4vw] bottom-[10vh] z-20 w-[58vw] md:left-[8vw] md:bottom-[12vh] md:w-[34vw]',
      metaClass:
        'absolute left-[3vw] top-[14vh] z-30 hidden origin-top-left -rotate-90 md:block',
      lineClass:
        'absolute right-4 bottom-[6vh] z-30 max-w-[80vw] text-right md:right-[6vw] md:bottom-[8vh] md:max-w-[34vw]',
    },
    bottomLeft: {
      wordmarkClass:
        'absolute left-4 bottom-[8vh] z-10 max-w-[92vw] text-[24vw] md:left-[5vw] md:bottom-[10vh] md:text-[16vw] lg:text-[15vw]',
      imageWrapClass:
        'absolute right-[4vw] top-[10vh] z-20 w-[60vw] md:right-[8vw] md:top-[10vh] md:w-[32vw]',
      metaClass:
        'absolute right-[3vw] top-[12vh] z-30 hidden origin-top-right rotate-90 md:block',
      lineClass:
        'absolute left-4 top-[6vh] z-30 max-w-[80vw] md:left-[6vw] md:top-[14vh] md:max-w-[30vw]',
    },
    centerOffset: {
      wordmarkClass:
        'absolute left-1/2 top-[12vh] z-10 max-w-[92vw] -translate-x-1/2 text-center text-[22vw] md:top-[14vh] md:text-[14vw] lg:text-[13vw]',
      imageWrapClass:
        'absolute left-1/2 bottom-[12vh] z-20 w-[64vw] -translate-x-1/2 md:bottom-[16vh] md:w-[28vw]',
      metaClass:
        'absolute left-[3vw] top-[16vh] z-30 hidden origin-top-left -rotate-90 md:block',
      lineClass:
        'absolute right-[3vw] bottom-[16vh] z-30 max-w-[80vw] text-right md:right-[6vw] md:bottom-[18vh] md:max-w-[26vw]',
    },
  }
  const L = layoutByVariant[sig.variant]
  // gate the infinite float so it only burns frames when the stage is
  // actually on screen — saves ~2 RAF loops per off-screen stage
  const stageRef = useRef<HTMLDivElement | null>(null)
  const isVisible = useInView(stageRef, { margin: '-15%' })

  return (
    <div
      ref={stageRef}
      className="relative h-screen w-screen shrink-0 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: sig.bg,
        color: sig.ink,
        contain: 'paint',
        willChange: 'transform',
      }}
    >
      {/* WORDMARK GIANT — simple fade-up reveal + parallax. First word italic accent */}
      <motion.h3
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-15%' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-heading)',
          color: sig.ink,
          lineHeight: 0.86,
          y: wordmarkY,
        }}
        className={`pointer-events-none font-extrabold uppercase tracking-[-0.03em] ${L.wordmarkClass}`}
      >
        {(() => {
          const parts = tile.project.title.split(' ')
          return (
            <>
              <span className="italic" style={{ color: sig.accent }}>
                {parts[0]}
              </span>
              {parts.length > 1 ? <br /> : null}
              {parts.slice(1).join(' ')}
            </>
          )
        })()}
      </motion.h3>

      {/* META vertical rotated — small, cold, museum label */}
      <div
        className={L.metaClass}
        style={{ color: sig.inkSoft }}
      >
        <p className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.4em]">
          {sig.number} / {String(total).padStart(2, '0')}  ·  {tile.project.tag.split(' · ')[0]}  ·  {sig.category}
        </p>
      </div>

      {/* IMAGE PIECE — floats free; click opens fullscreen ProjectScreen */}
      <motion.button
        onClick={onOpen}
        aria-label={`Open project ${tile.project.title}`}
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: '-15%' }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: imageY }}
        whileHover={{ scale: 1.03 }}
        className={`group cursor-pointer ${L.imageWrapClass}`}
      >
        <div className={`relative w-full overflow-hidden rounded-[20px] md:rounded-[28px] ${sig.imgAspect}`}>
          {/* continuous organic float — only runs when stage is visible */}
          <motion.div
            animate={
              isVisible
                ? { scale: [1, 1.04, 1], x: [0, 4, 0], y: [0, -3, 0] }
                : { scale: 1, x: 0, y: 0 }
            }
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ willChange: 'transform' }}
            className="relative h-full w-full"
          >
            <Image
              src={tile.img}
              alt={tile.project.title}
              fill
              sizes="(max-width: 768px) 60vw, 35vw"
              className="object-cover transition-all duration-700 group-hover:brightness-110"
            />
          </motion.div>
          {/* hover prompt */}
          <div
            className="pointer-events-none absolute inset-0 flex items-end justify-end p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-5"
          >
            <span
              className="rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] md:text-xs"
              style={{ backgroundColor: sig.accent, color: '#F1EDE4' }}
            >
              View →
            </span>
          </div>
        </div>
      </motion.button>

      {/* MANIFESTO LINE — 1 line, letter-stagger reveal on entry */}
      <p className={L.lineClass}>
        <span
          className="block text-sm md:text-base"
          style={{
            fontFamily: 'var(--font-heading)',
            color: sig.ink,
            fontStyle: 'italic',
          }}
        >
          {sig.manifesto}
        </span>
        <span
          className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.3em] md:text-[11px]"
          style={{ color: sig.inkSoft }}
        >
          {tile.project.tag.split(' · ').slice(1).join(' · ')}
        </span>
      </p>
    </div>
  )
}

function WorkTheatre({ onOpen }: { onOpen: (idx: number) => void }) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const N = tiles.length
  const pinHeight = `${N * 100}vh`

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // translate the inner rail by (N-1) * 100vw as scroll progresses.
  // Stiffer spring = snappier response to scroll, less perceived lag.
  const rawX = useTransform(scrollYProgress, [0.05, 0.95], [0, -(N - 1) * 100])
  const x = useSpring(rawX, { stiffness: 240, damping: 32, mass: 0.4 })
  const railX = useTransform(x, (v) => `${v}vw`)

  // parallax driver — maps to a [-60, 60] swing within each stage's slice
  const parallax = useTransform(scrollYProgress, (v) => {
    const slice = 1 / N
    const localProgress = (v % slice) / slice
    return (localProgress - 0.5) * 120
  })

  // stage indicator
  const currentStage = useTransform(scrollYProgress, (v) =>
    Math.min(N - 1, Math.floor(v * N + 0.0001))
  )
  const [stageNum, setStageNum] = useState(1)
  useEffect(() => {
    const unsub = currentStage.on('change', (n) => setStageNum(n + 1))
    return () => unsub()
  }, [currentStage])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-screen"
      style={{
        height: pinHeight,
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
      }}
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        {/* SECTION EYEBROW — fixed top-left */}
        <div className="pointer-events-none absolute left-4 top-4 z-50 md:left-8 md:top-8">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.4em] md:text-[11px]"
            style={{ color: 'rgba(241,237,228,0.85)', mixBlendMode: 'difference' }}
          >
            Studio Cora — Exhibition
          </p>
        </div>

        {/* PROGRESS INDICATOR — fixed top-right */}
        <div className="pointer-events-none absolute right-4 top-4 z-50 flex items-center gap-3 md:right-8 md:top-8">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.3em] md:text-xs"
            style={{ color: 'rgba(241,237,228,0.85)', mixBlendMode: 'difference' }}
          >
            {String(stageNum).padStart(2, '0')} / {String(N).padStart(2, '0')}
          </span>
          <div
            className="relative h-px w-24 overflow-hidden md:w-40"
            style={{ backgroundColor: 'rgba(255,255,255,0.25)', mixBlendMode: 'difference' }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-white"
              style={{ scaleX: scrollYProgress, transformOrigin: 'left', width: '100%' }}
            />
          </div>
        </div>

        {/* HORIZONTAL RAIL — translates X with scroll */}
        <motion.div style={{ x: railX, willChange: 'transform' }} className="flex h-full">
          {tiles.map((tile, i) => (
            <Stage
              key={i}
              tile={tile}
              sig={STAGE_SIGNATURES[i] ?? STAGE_SIGNATURES[0]}
              total={N}
              onOpen={() => onOpen(i)}
              parallax={parallax}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// MOBILE FALLBACK — same stages stacked vertically (one per viewport)
function WorkTheatreMobile({ onOpen }: { onOpen: (idx: number) => void }) {
  return (
    <section id="work" className="relative">
      {tiles.map((tile, i) => {
        const sig = STAGE_SIGNATURES[i] ?? STAGE_SIGNATURES[0]
        const titleParts = tile.project.title.split(' ')
        return (
          <div
            key={i}
            className="relative flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-12"
            style={{ backgroundColor: sig.bg, color: sig.ink }}
          >
            <div className="flex items-start justify-between text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: sig.inkSoft }}>
              <span>
                {sig.number} / {String(tiles.length).padStart(2, '0')}
              </span>
              <span>{sig.category}</span>
            </div>

            <button
              onClick={() => onOpen(i)}
              className="relative my-auto block w-full"
              aria-label={`Open project ${tile.project.title}`}
            >
              <div className={`relative w-full overflow-hidden rounded-[20px] ${sig.imgAspect}`}>
                <Image
                  src={tile.img}
                  alt={tile.project.title}
                  fill
                  unoptimized
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </button>

            <div>
              <h3
                style={{ fontFamily: 'var(--font-heading)', lineHeight: 0.88 }}
                className="text-[18vw] font-extrabold uppercase tracking-[-0.03em]"
              >
                <span className="italic" style={{ color: sig.accent }}>
                  {titleParts[0]}
                </span>
                {titleParts.length > 1 ? (
                  <>
                    <br />
                    {titleParts.slice(1).join(' ')}
                  </>
                ) : null}
              </h3>
              <p className="mt-3 italic" style={{ fontFamily: 'var(--font-heading)', color: sig.ink }}>
                {sig.manifesto}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: sig.inkSoft }}>
                {tile.project.tag}
              </p>
            </div>
          </div>
        )
      })}
    </section>
  )
}

const team = [
  { name: 'Amanda Maximo', photo: '/amanda.webp' },
  { name: 'Agatha Selbach', photo: '/agatha.webp' },
]

const EMAIL = 'hello@usestudiocora.com'
const SOCIALS = {
  linkedin: 'https://www.linkedin.com/company/studiocora',
  facebook: 'https://www.facebook.com/studiocora',
  instagram: 'https://www.instagram.com/usestudiocora',
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21h-4z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* ---------- contact form ---------- */

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

function ContactForm({ t, p }: { t: Dict; p: Palette }) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [values, setValues] = useState({ name: '', email: '', message: '' })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status.kind === 'submitting') return
    setStatus({ kind: 'submitting' })

    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
      company: String(fd.get('company') ?? ''),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }
      if (!res.ok || !data.ok) {
        setStatus({ kind: 'error', message: data.error ?? t.errGeneric })
        return
      }
      setStatus({ kind: 'success' })
      setValues({ name: '', email: '', message: '' })
    } catch {
      setStatus({ kind: 'error', message: t.errNetwork })
    }
  }

  const busy = status.kind === 'submitting'
  const done = status.kind === 'success'

  const inputClass =
    'w-full rounded-2xl border px-5 py-4 text-[15px] outline-none transition-colors duration-300 focus:border-[#4B3FE4] disabled:opacity-50'
  const inputStyle = {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: p.border,
    color: p.ink,
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          disabled={busy}
          autoComplete="name"
          placeholder={t.fName}
          value={values.name}
          onChange={(e) => setValues((s) => ({ ...s, name: e.target.value }))}
          className={inputClass}
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          required
          disabled={busy}
          autoComplete="email"
          placeholder={t.fEmail}
          value={values.email}
          onChange={(e) => setValues((s) => ({ ...s, email: e.target.value }))}
          className={inputClass}
          style={inputStyle}
        />
      </div>
      <textarea
        name="message"
        required
        disabled={busy}
        rows={4}
        placeholder={t.fMsg}
        value={values.message}
        onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
        className={`${inputClass} resize-none`}
        style={inputStyle}
      />
      <div className="hidden" aria-hidden>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={busy || done}
          style={{ backgroundColor: p.ink, color: p.bg }}
          className="group inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {busy ? t.sending : done ? t.sent : t.send}
          {!done && (
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </button>
        {status.kind === 'error' && (
          <p className="text-sm" style={{ color: RED }}>
            {status.message}
          </p>
        )}
        {done && (
          <p className="text-sm" style={{ color: p.inkSoft }}>
            {t.successMsg}
          </p>
        )}
      </div>
    </form>
  )
}

/* ---------- editorial poster (inside Digital Product card) ---------- */

function SmPoster({ t, p }: { t: Dict; p: Palette }) {
  const surface = p.bg === '#141310' ? '#1B1A14' : '#EDEAE0'
  return (
    <div
      className="relative overflow-hidden px-6 py-7"
      style={{ backgroundColor: surface, color: p.ink }}
    >
      {/* diagonal blue wedge, bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: p.blue,
          clipPath: 'polygon(100% 42%, 100% 100%, 8% 100%)',
        }}
      />

      <div className="relative z-10">
        <h4
          style={{ fontFamily: 'var(--font-heading)', color: p.blue }}
          className="text-2xl font-extrabold uppercase leading-[0.92] tracking-[-0.01em] sm:text-[28px]"
        >
          {t.aiH1}
          <br />
          {t.aiH2}
        </h4>

        <p
          className="mt-4 max-w-[15rem] text-[11px] leading-snug"
          style={{ color: p.inkSoft }}
        >
          {t.aiNote}
        </p>

        <div className="mt-8">
          <p
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-[11px] font-bold uppercase leading-snug tracking-[0.06em]"
          >
            {t.aiFoot}
          </p>
          <svg
            viewBox="0 0 160 10"
            className="mt-1 h-2 w-40"
            fill="none"
            aria-hidden
          >
            <path
              d="M2 6c30-6 60 4 90-1s50-3 66 2"
              stroke={p.blue}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ---------- dedicated project screen (opens on tile click) ---------- */

function ProjectScreen({
  project,
  cover,
  number,
  total,
  sig,
  nextTitle,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project
  cover: string
  number: number
  total: number
  sig: StageSignature
  nextTitle: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const titleParts = project.title.split(' ')
  return (
    <article className="relative min-h-screen" style={{ backgroundColor: sig.bg, color: sig.ink }}>
      {/* ===== TOP NAV — sticky during scroll ===== */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 backdrop-blur-md md:px-12 md:py-6"
        style={{ backgroundColor: `${sig.bg}D9` }}
      >
        <div className="flex items-center gap-4 md:gap-6">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.32em] md:text-xs"
            style={{ color: sig.inkSoft }}
          >
            {sig.number} / {String(total).padStart(2, '0')}
          </span>
          <span className="h-px w-8 md:w-12" style={{ backgroundColor: sig.inkSoft }} />
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.32em] md:text-xs"
            style={{ color: sig.inkSoft }}
          >
            {sig.category}
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous project"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:opacity-70 md:h-10 md:w-10"
            style={{ borderColor: sig.inkSoft }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
              <path d="M14 7l-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next project"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:opacity-70 md:h-10 md:w-10"
            style={{ borderColor: sig.inkSoft }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
              <path d="M10 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-2 inline-flex h-9 items-center gap-2 rounded-full border px-4 text-[10px] font-semibold uppercase tracking-[0.28em] transition-colors hover:opacity-70 md:h-10 md:px-5 md:text-xs"
            style={{ borderColor: sig.inkSoft, color: sig.ink }}
          >
            Close
            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* ===== HERO — full-bleed cover with title overlay ===== */}
      <div className="relative h-[78vh] w-full overflow-hidden md:h-[88vh]">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image src={cover} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        {/* gradient anchor for title legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        {/* TITLE — bottom-left, italic first word like the stage */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-heading)', color: '#F1EDE4', lineHeight: 0.88 }}
          className="absolute bottom-6 left-6 z-10 max-w-[88vw] text-[14vw] font-extrabold uppercase tracking-[-0.03em] md:bottom-12 md:left-12 md:text-[9vw] lg:text-[8vw]"
        >
          <span className="italic" style={{ color: sig.accent }}>
            {titleParts[0]}
          </span>
          {titleParts.length > 1 ? (
            <>
              <br />
              {titleParts.slice(1).join(' ')}
            </>
          ) : null}
        </motion.h1>
      </div>

      {/* ===== MANIFESTO LINE ===== */}
      <section className="px-6 py-16 md:px-12 md:py-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-heading)' }}
          className="mx-auto max-w-5xl text-2xl font-extrabold italic leading-[1.15] tracking-[-0.01em] md:text-5xl"
        >
          <span style={{ color: sig.accent }}>“</span>
          {sig.manifesto}
          <span style={{ color: sig.accent }}>”</span>
        </motion.p>
      </section>

      {/* ===== METADATA GRID ===== */}
      <section
        className="border-y px-6 py-10 md:px-12 md:py-14"
        style={{ borderColor: `${sig.inkSoft}` }}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-x-12">
          {[
            { label: 'Project', value: String(number).padStart(2, '0') + ' / ' + String(total).padStart(2, '0') },
            { label: 'Year', value: project.tag.split(' · ')[0] },
            { label: 'Discipline', value: sig.category },
            { label: 'Studio', value: 'Cora' },
          ].map((cell) => (
            <div key={cell.label}>
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.32em] md:text-xs"
                style={{ color: sig.inkSoft }}
              >
                {cell.label}
              </p>
              <p
                className="mt-2 text-base font-medium md:text-lg"
                style={{ color: sig.ink, fontFamily: 'var(--font-heading)' }}
              >
                {cell.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BODY ===== */}
      <section className="px-6 py-16 md:px-12 md:py-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-lg leading-relaxed md:text-xl"
          style={{ color: sig.ink }}
        >
          {project.blurb}
        </motion.p>
      </section>

      {/* ===== GALLERY — asymmetric editorial layout ===== */}
      <section className="px-6 pb-16 md:px-12 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <p
            className="mb-8 text-[10px] font-semibold uppercase tracking-[0.32em] md:mb-14 md:text-xs"
            style={{ color: sig.inkSoft }}
          >
            ● Process · Gallery
          </p>
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {project.extras[0] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative col-span-12 aspect-[4/3] overflow-hidden rounded-[16px] md:col-span-7 md:rounded-[24px]"
              >
                <Image src={project.extras[0]} alt="" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
              </motion.div>
            )}
            {project.extras[1] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative col-span-12 mt-0 aspect-[3/4] overflow-hidden rounded-[16px] md:col-span-5 md:mt-16 md:rounded-[24px]"
              >
                <Image src={project.extras[1]} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
              </motion.div>
            )}
            {project.extras[2] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative col-span-12 aspect-[16/9] overflow-hidden rounded-[16px] md:col-span-10 md:col-start-2 md:rounded-[24px]"
              >
                <Image src={project.extras[2]} alt="" fill sizes="(max-width: 768px) 100vw, 80vw" className="object-cover" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ===== NEXT PROJECT CTA ===== */}
      <button
        type="button"
        onClick={onNext}
        className="group block w-full border-t px-6 py-14 text-left transition-colors duration-500 md:px-12 md:py-20"
        style={{ borderColor: sig.inkSoft }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <div className="min-w-0">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.32em] md:text-xs"
              style={{ color: sig.inkSoft }}
            >
              Next exhibit
            </p>
            <h3
              style={{ fontFamily: 'var(--font-heading)', color: sig.ink, lineHeight: 0.92 }}
              className="mt-3 truncate text-3xl font-extrabold uppercase tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-2 md:text-6xl"
            >
              <span className="italic" style={{ color: sig.accent }}>
                {nextTitle.split(' ')[0]}
              </span>{' '}
              {nextTitle.split(' ').slice(1).join(' ')}
            </h3>
          </div>
          <span
            className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 md:h-20 md:w-20"
            style={{ backgroundColor: sig.accent, color: '#F1EDE4' }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 md:h-7 md:w-7" aria-hidden>
              <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </button>
    </article>
  )
}

/* ---------- page ---------- */

const LANG_PATH: Record<Lang, string> = { en: '/', pt: '/pt', es: '/es' }

export function LandingV2({ initialLang = 'en' }: { initialLang?: Lang }) {
  const lang = initialLang
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const st = localStorage.getItem('sc-theme')
    if (st === 'dark') setIsDark(true)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    localStorage.setItem('sc-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const t = DICT[lang]
  const p = isDark ? dark : light
  const pInv = isDark ? light : dark

  const langs: Lang[] = ['en', 'pt', 'es']

  // Work-section entrance: each tile leaps in from the sides / above. The
  // animation re-plays every time the section re-enters view, BUT we only
  // re-arm to the hidden state when the section is completely off-screen,
  // so the cards never visually disappear while any of them is on screen.
  const tileEntrance = [
    { x: -220, scale: 0.85 },
    { y: 80, scale: 0.85 },
    { x: 220, scale: 0.85 },
  ]
  // Carousel rotation: which original tile is currently at the centre slot.
  // Clicking any tile rotates the row so the clicked one slides into place.
  const [centerOrigIdx, setCenterOrigIdx] = useState(2)
  const arrangedTiles = tiles.map((_, slot) => {
    const origIdx = (centerOrigIdx - 2 + slot + tiles.length) % tiles.length
    return { tile: tiles[origIdx], origIdx, slot }
  })

  // Dedicated project screen — which project (by original index) is open in
  // the fullscreen overlay. null = closed. Theatre stages open the overlay
  // directly (no carousel rotation step needed anymore).
  const [openProjectIdx, setOpenProjectIdx] = useState<number | null>(null)
  const openProject = (origIdx: number) => setOpenProjectIdx(origIdx)
  // ESC closes the overlay; body scroll is locked while open so the page
  // behind doesn't shift under the modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenProjectIdx(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = openProjectIdx !== null ? 'hidden' : prev
    return () => {
      document.body.style.overflow = prev
    }
  }, [openProjectIdx])
  const workRef = useRef<HTMLDivElement>(null)
  // Two thresholds: play the animation only once the section is meaningfully
  // visible (≥20%), and re-arm to hidden only when it is completely off-screen
  // — that way cards never appear to disappear while any of them is visible.
  const workMeaningfullyVisible = useInView(workRef, { amount: 0.2 })
  const workAnyVisible = useInView(workRef)
  const workControls = useAnimationControls()
  useEffect(() => {
    if (workMeaningfullyVisible) workControls.start('visible')
  }, [workMeaningfullyVisible, workControls])
  useEffect(() => {
    if (!workAnyVisible) workControls.set('hidden')
  }, [workAnyVisible, workControls])

  return (
    <div
      className="min-h-screen w-full overflow-x-clip transition-colors duration-500"
      style={{ backgroundColor: p.bg, color: p.ink }}
    >
      <NoiseGrain />
      <main className="relative mx-auto w-full max-w-[1600px] px-6 py-7 md:px-16 md:py-10 lg:px-24">
        {/* ===== HEADER ===== */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-[1fr_auto_1fr] items-center gap-4"
        >
          <div className="justify-self-start">
            <Logo studioColor={p.ink} className="h-9 w-auto md:h-12" />
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <a href="#work" className="transition-opacity hover:opacity-60">
              {t.nav.work}
            </a>
            <a href="#studio" className="transition-opacity hover:opacity-60">
              {t.nav.studio}
            </a>
            <a href="#services" className="transition-opacity hover:opacity-60">
              {t.nav.services}
            </a>
          </nav>

          <div className="flex items-center justify-end gap-3 justify-self-end">
            {/* language switch */}
            <div
              className="flex items-center rounded-full border p-0.5 text-xs font-semibold"
              style={{ borderColor: p.border }}
            >
              {langs.map((l) => (
                <Link
                  key={l}
                  href={LANG_PATH[l]}
                  hrefLang={l}
                  className="rounded-full px-2.5 py-1 uppercase transition-colors"
                  style={
                    lang === l
                      ? { backgroundColor: p.ink, color: p.bg }
                      : { color: p.inkSoft }
                  }
                  aria-current={lang === l ? 'page' : undefined}
                >
                  {l}
                </Link>
              ))}
            </div>

            {/* theme toggle */}
            <button
              onClick={() => setIsDark((v) => !v)}
              aria-label="Toggle dark mode"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:opacity-70"
              style={{ borderColor: p.border, color: p.ink }}
            >
              <SunMoon dark={isDark} />
            </button>

            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300 sm:inline-flex"
              style={{ borderColor: p.border }}
            >
              {t.contactUs}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.header>

        <div className="mt-6 h-px w-full" style={{ backgroundColor: p.border }} />

        {/* ===== HERO ===== */}
        <section className="relative mt-12 md:mt-16">
          {/* single atmospheric blue orb — drifts slowly behind the headline */}
          <Orb
            className="-left-32 -top-24 h-[38rem] w-[38rem]"
            color={`${p.blue}99`}
            duration={36}
            x={[0, 80, 0]}
            y={[0, 50, 0]}
          />

          <Asterisk
            className="absolute -top-2 left-0 h-9 w-9 md:h-12 md:w-12"
            color={p.blue}
          />
          <Sparkle className="absolute right-2 top-0 h-8 w-8 md:h-11 md:w-11" />

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            style={{ fontFamily: 'var(--font-heading)' }}
            className="relative z-10 mx-auto max-w-[1400px] text-center text-[12vw] font-extrabold uppercase leading-[0.96] tracking-[-0.02em] md:text-[8vw] lg:text-[7rem] xl:text-[8.25rem]"
          >
            {t.heroA}{' '}
            <a
              href="#contact"
              aria-label={t.contactUs}
              className="mx-1 inline-flex h-[0.62em] w-[1.5em] translate-y-[0.04em] items-center justify-center rounded-full align-middle transition-transform duration-300 ease-out hover:scale-[1.06]"
              style={{ backgroundColor: RED }}
            >
              <ArrowRight className="h-[0.3em] w-auto" color="#1C1B17" />
            </a>{' '}
            {t.heroB}
          </motion.h1>

          {/* marquee chant */}
          <div
            className="sc-marquee-wrap mt-14 border-y py-5 md:mt-20 md:py-7"
            style={{ borderColor: p.border }}
          >
            <div className="sc-marquee flex items-center">
              {Array.from({ length: 2 }).flatMap((_, dup) =>
                [
                  'Anything but ordinary',
                  'Studio Cora',
                  'Branding',
                  'UX',
                  'Web',
                  'Engineering',
                ].map((word, wi) => (
                  <span
                    key={`${dup}-${wi}`}
                    className="mr-8 flex items-center gap-8 text-2xl font-extrabold uppercase tracking-tight md:text-4xl"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {word}
                    <Asterisk color={p.blue} className="h-4 w-4 md:h-6 md:w-6" />
                  </span>
                ))
              )}
            </div>
          </div>

        </section>

        {/* --- bridge 1: Hero → Work --- */}
        <div className="mt-20 text-center md:mt-32">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.4em] md:text-xs"
            style={{ color: p.inkSoft }}
          >
            Selected work — 2024 – 2026
          </p>
          <p
            style={{ fontFamily: 'var(--font-heading)' }}
            className="mt-3 text-xl font-extrabold uppercase tracking-[-0.01em] md:text-3xl"
          >
            Three pieces.{' '}
            <span className="italic" style={{ color: RED }}>
              Three ruptures.
            </span>
          </p>
        </div>

        {/* ===== WORK — Editorial Theatre: vertical scroll pins the section
              and translates content horizontally through the stages. Mobile
              stacks vertically. ===== */}
        <div className="mt-12 md:mt-16">
          <div className="hidden md:block">
            <WorkTheatre onOpen={openProject} />
          </div>
          <div className="md:hidden">
            <WorkTheatreMobile onOpen={openProject} />
          </div>
        </div>

        {/* ===== DEDICATED PROJECT SCREEN — full-screen editorial spread,
              signature palette per project, clean cinematic reveal ===== */}
        <AnimatePresence>
          {openProjectIdx !== null && (
            <motion.div
              key="project-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="fixed inset-0 z-[70] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label={tiles[openProjectIdx].project.title}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              >
                <ProjectScreen
                  project={tiles[openProjectIdx].project}
                  cover={tiles[openProjectIdx].img}
                  number={openProjectIdx + 1}
                  total={tiles.length}
                  sig={STAGE_SIGNATURES[openProjectIdx] ?? STAGE_SIGNATURES[0]}
                  nextTitle={
                    tiles[(openProjectIdx + 1) % tiles.length].project.title
                  }
                  onClose={() => setOpenProjectIdx(null)}
                  onPrev={() =>
                    setOpenProjectIdx(
                      (openProjectIdx - 1 + tiles.length) % tiles.length
                    )
                  }
                  onNext={() =>
                    setOpenProjectIdx((openProjectIdx + 1) % tiles.length)
                  }
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- bridge 2: Work → Manifesto --- */}
        <div className="mt-24 text-center md:mt-40">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.4em] md:text-xs"
            style={{ color: p.inkSoft }}
          >
            End of exhibition
          </p>
        </div>

        {/* ===== MANIFESTO — philosophy as the anchor between proof and craft ===== */}
        <section id="manifesto" className="relative mt-24 md:mt-40">
          <Asterisk
            className="absolute -left-1 top-0 h-7 w-7 md:h-10 md:w-10"
            color={p.blue}
          />
          <Asterisk
            className="absolute -bottom-2 right-2 h-8 w-8 md:h-12 md:w-12"
            color={p.blue}
          />
          <motion.blockquote
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease }}
            style={{ fontFamily: 'var(--font-heading)' }}
            className="mx-auto max-w-3xl text-center text-2xl font-extrabold uppercase leading-[1.18] tracking-tight md:text-4xl"
          >
            {t.m1}{' '}
            <span
              className="inline-block rounded-full border-2 px-3 py-0.5"
              style={{ borderColor: p.ink }}
            >
              {t.mPill}
            </span>{' '}
            {t.m2}{' '}
            <span style={{ color: p.blue }}>{t.mBlue}</span>
          </motion.blockquote>
          <p
            className="mt-6 text-center text-sm"
            style={{ color: p.inkSoft }}
          >
            {t.promise}
          </p>
        </section>

        {/* --- bridge 3: Manifesto → Services --- */}
        <p
          className="mt-12 text-right text-sm md:mt-16 md:text-base"
          style={{ color: p.inkSoft, fontFamily: 'var(--font-heading)' }}
        >
          Here&apos;s how we put that to work →
        </p>

        {/* ===== WHAT WE DO PANEL ===== */}
        <section
          id="services"
          className="mt-8 rounded-[28px] p-7 transition-colors duration-500 md:mt-12 md:rounded-[36px] md:p-12"
          style={{ backgroundColor: p.panel }}
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2
              style={{ fontFamily: 'var(--font-heading)' }}
              className="text-3xl font-extrabold md:text-5xl"
            >
              {t.whatWeDo}
            </h2>
            <p className="max-w-sm text-sm" style={{ color: p.inkSoft }}>
              {t.whatWeDoDesc}
            </p>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
            {offerMeta.map((o, i) => {
              const featured = o.featured
              const copy = t.offers[i]
              return (
                <motion.div
                  key={o.variant}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease }}
                  className="group flex flex-col rounded-[24px] border p-6 transition-transform duration-500 ease-out hover:-translate-y-1.5"
                  style={{
                    backgroundColor: featured ? p.blue : p.card,
                    borderColor: featured ? p.blue : p.border,
                    color: featured ? '#F1EDE4' : p.ink,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <h3
                      style={{ fontFamily: 'var(--font-heading)' }}
                      className="text-xl font-bold leading-tight"
                    >
                      {copy.title}
                    </h3>
                    <span
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-12"
                      style={{
                        backgroundColor: featured ? RED : p.ink,
                        color: featured ? '#1C1B17' : p.bg,
                      }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p
                    className="mt-3 text-sm"
                    style={{
                      color: featured ? 'rgba(241,237,228,0.85)' : p.inkSoft,
                    }}
                  >
                    {copy.desc}
                  </p>
                  <div
                    className="mt-6 overflow-hidden rounded-2xl"
                    style={{
                      backgroundColor: featured
                        ? 'transparent'
                        : 'rgba(127,127,127,0.10)',
                    }}
                  >
                    {featured ? (
                      <SmPoster t={t} p={p} />
                    ) : (
                      <Art variant={o.variant} className="h-auto w-full" />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

        </section>


        {/* --- bridge 4: Services → Studio --- */}
        <div className="mt-20 text-center md:mt-28">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.4em] md:text-xs"
            style={{ color: p.inkSoft }}
          >
            Behind the work
          </p>
          <p
            style={{ fontFamily: 'var(--font-heading)' }}
            className="mt-3 text-xl font-extrabold uppercase tracking-[-0.01em] md:text-3xl"
          >
            Two people. Two crafts.{' '}
            <span className="italic" style={{ color: p.blue }}>
              One studio.
            </span>
          </p>
        </div>

        {/* ===== TEAM ===== */}
        <section id="studio" className="mt-12 md:mt-16">
          <h2
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-3xl font-extrabold md:text-5xl"
          >
            {t.theStudio}
          </h2>
          <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                className="group flex items-center gap-5 rounded-[24px] border p-5 transition-transform duration-500 ease-out hover:-translate-y-1"
                style={{ borderColor: p.border }}
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-black/10">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="96px"
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>
                <div>
                  <h3
                    style={{ fontFamily: 'var(--font-heading)' }}
                    className="text-xl font-bold"
                  >
                    {m.name}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: p.inkSoft }}>
                    {t.roles[i]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease }}
            className="group relative mt-6 aspect-[16/10] max-h-[340px] w-full overflow-hidden rounded-[24px] sm:aspect-[21/9] md:aspect-[32/9]"
          >
            <Image
              src="/office.webp"
              alt="Inside the Studio Cora office"
              fill
              sizes="(max-width: 768px) 100vw, 1400px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </motion.div>
        </section>

        {/* --- bridge 5: Studio → Contact --- */}
        <p
          className="mt-20 text-center text-sm md:mt-28 md:text-base"
          style={{ color: p.inkSoft, fontFamily: 'var(--font-heading)' }}
        >
          Want to start a{' '}
          <span className="italic font-extrabold" style={{ color: RED }}>
            rupture?
          </span>
        </p>

        {/* ===== CONTACT — brand blue panel (same blue as the pricing
              section). Cream text + cream-bordered form on blue. ===== */}
        <section
          id="contact"
          className="relative mt-20 overflow-hidden rounded-[28px] p-7 transition-colors duration-500 md:mt-28 md:rounded-[36px] md:p-12"
          style={{ backgroundColor: BLUE, color: '#F1EDE4' }}
        >
          {/* soft cream orbs — same decoration vibe as the pricing panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: '#F1EDE4' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-24 h-[24rem] w-[24rem] rounded-full opacity-15 blur-3xl"
            style={{ backgroundColor: '#F1EDE4' }}
          />

          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <Sparkle className="h-8 w-8" />
              <h2
                style={{ fontFamily: 'var(--font-heading)' }}
                className="mt-5 text-3xl font-extrabold uppercase leading-[1.05] md:text-5xl"
              >
                {t.contactT1}
                <br />
                {t.contactT2}
              </h2>
              <p
                className="mt-5 max-w-sm text-sm"
                style={{ color: 'rgba(241,237,228,0.78)' }}
              >
                {t.contactDesc}
              </p>
              <a
                href="mailto:hello@usestudiocora.com"
                className="mt-6 inline-block text-sm font-semibold underline-offset-4 hover:underline"
              >
                hello@usestudiocora.com
              </a>
            </div>
            <ContactForm
              t={t}
              p={{
                bg: BLUE,
                panel: BLUE,
                card: BLUE,
                ink: '#F1EDE4',
                inkSoft: 'rgba(241,237,228,0.7)',
                border: 'rgba(241,237,228,0.32)',
                blue: BLUE,
              }}
            />
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="mt-24 md:mt-36">
          <div className="h-px w-full" style={{ backgroundColor: p.border }} />

          {/* big email CTA */}
          <motion.a
            href={`mailto:${EMAIL}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
            className="group mt-14 flex flex-wrap items-end justify-between gap-4 md:mt-20"
          >
            <span
              style={{ fontFamily: 'var(--font-heading)' }}
              className="relative text-[10vw] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] md:text-[5.5vw]"
            >
              {t.contactUs}
              <span
                className="absolute -bottom-1 left-0 block h-[3px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                style={{ backgroundColor: p.blue }}
              />
            </span>
            <span
              className="mb-2 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-16 md:w-16"
              style={{ backgroundColor: p.blue, color: '#F1EDE4' }}
            >
              <ArrowUpRight className="h-5 w-5 md:h-7 md:w-7" />
            </span>
          </motion.a>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-3 inline-block text-sm font-medium hover:underline"
            style={{ color: p.inkSoft }}
          >
            {EMAIL}
          </a>

          {/* links + socials */}
          <div className="mt-14 flex flex-col gap-10 sm:flex-row sm:justify-between">
            <nav className="flex flex-col gap-2 text-sm">
              {[
                { label: t.nav.work, href: '#work' },
                { label: t.nav.services, href: '#services' },
                { label: t.theStudio, href: '#studio' },
                { label: t.contactUs, href: '#contact' },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group inline-flex w-fit items-center gap-2"
                  style={{ color: p.ink }}
                >
                  <span
                    className="h-px w-0 transition-all duration-300 group-hover:w-5"
                    style={{ backgroundColor: p.blue }}
                  />
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    {l.label}
                  </span>
                </a>
              ))}
            </nav>

            <div className="flex items-start gap-3">
              {[
                { href: SOCIALS.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
                { href: SOCIALS.facebook, label: 'Facebook', Icon: FacebookIcon },
                { href: SOCIALS.instagram, label: 'Instagram', Icon: InstagramIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-1 hover:rotate-6"
                  style={{ borderColor: p.border, color: p.ink }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* giant wordmark */}
          <div className="mt-16 overflow-hidden md:mt-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1, ease }}
              aria-hidden
              style={{
                fontFamily: 'var(--font-heading)',
                color: p.blue,
                lineHeight: 0.82,
              }}
              className="select-none text-center text-[22vw] font-extrabold uppercase tracking-[-0.03em] md:text-[17vw]"
            >
              <span className="block whitespace-nowrap">Studio</span>
              <span className="block whitespace-nowrap">Cora</span>
            </motion.div>
          </div>

          {/* bottom bar */}
          <div
            className="flex flex-col items-start justify-between gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center"
            style={{ borderColor: p.border, color: p.inkSoft }}
          >
            <span className="inline-flex items-center gap-2">
              <motion.span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: '#FF3539' }}
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              © {new Date().getFullYear()} {t.rights} · Est. 2025
            </span>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 font-medium"
              style={{ color: p.ink }}
            >
              usestudiocora.com
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
            </a>
          </div>
        </footer>
      </main>
    </div>
  )
}
