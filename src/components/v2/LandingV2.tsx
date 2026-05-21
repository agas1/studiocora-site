'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useInView,
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
  {
    img: '/work/2.webp',
    bg: '#1C1B17',
    project: {
      title: 'Quiet Hours',
      tag: '2024 · UX / UI',
      blurb:
        'A late-night-friendly journaling product — type-led, frictionless, considered to the last keystroke.',
      extras: [
        '/work/2a.webp',
        '/work/2b.webp',
        '/work/2c.webp',
      ],
    },
  },
  {
    img: '/work/3.webp',
    bg: BLUE,
    project: {
      title: 'Atlas',
      tag: '2025 · Web',
      blurb:
        'A magazine-grade editorial platform — engineered for speed, composed for narrative depth.',
      extras: [
        '/work/3a.webp',
        '/work/3b.webp',
        '/work/3c.webp',
      ],
    },
  },
  {
    img: '/work/4.webp',
    bg: '#1C1B17',
    project: {
      title: 'Halo',
      tag: '2024 · Motion',
      blurb:
        'Brand motion suite for a fragrance launch — sculptural light, precise easing, zero noise.',
      extras: [
        '/work/4a.webp',
        '/work/4b.webp',
        '/work/4c.webp',
      ],
    },
  },
  {
    img: '/work/5.webp',
    bg: BLUE,
    project: {
      title: 'Mason Type',
      tag: '2025 · Typography',
      blurb:
        'A custom display typeface drawn for editorial impact — born in a Studio Cora type workshop.',
      extras: [
        '/work/5a.webp',
        '/work/5b.webp',
        '/work/5c.webp',
      ],
    },
  },
]

// Heights tied to the visual SLOT (the pyramid shape), per tile in order.
const slotHeights = [
  'md:h-[22rem]',
  'md:h-[32rem]',
  'md:h-[42rem]',
  'md:h-[32rem]',
  'md:h-[22rem]',
]

const offerMeta: { variant: ArtVariant; featured?: boolean }[] = [
  { variant: 'identity' },
  { variant: 'product', featured: true },
  { variant: 'direction' },
]

const team = [
  { name: 'Amanda Maximo', photo: '/amanda.webp' },
  { name: 'Agatha Selbach', photo: '/agatha.webp' },
]

const EMAIL = 'hello@usestudiocora.com'
// TODO: paste the real Facebook page URL here
const SOCIALS = {
  linkedin: 'https://www.linkedin.com/company/studiocora',
  facebook: 'https://www.facebook.com/studiocora',
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
  blue,
  inkSoft,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project
  cover: string
  number: number
  total: number
  blue: string
  inkSoft: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="flex flex-col">
      {/* top bar */}
      <div className="flex items-center justify-between px-6 pt-6 md:px-12 md:pt-10">
        <span
          className="text-xs uppercase tracking-[0.3em] md:text-sm"
          style={{ color: inkSoft }}
        >
          {project.tag} ·{' '}
          <span style={{ color: blue }}>
            {String(number).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:opacity-70"
          style={{ borderColor: inkSoft }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* cover */}
      <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden md:mt-8">
        <Image
          src={cover}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* content */}
      <div className="grid grid-cols-1 gap-10 px-6 py-10 md:grid-cols-12 md:gap-12 md:px-12 md:py-14">
        <div className="md:col-span-7">
          <h2
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-3xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] md:text-5xl"
          >
            {project.title}
          </h2>
          <p
            className="mt-5 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: inkSoft }}
          >
            {project.blurb}
          </p>
        </div>

        <div className="md:col-span-5">
          <span
            className="block text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: inkSoft }}
          >
            More from this project
          </span>
          <div className="mt-4 grid grid-cols-3 gap-2 md:gap-3">
            {project.extras.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-md"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* prev / next */}
      <div
        className="flex items-center justify-between border-t px-6 py-5 md:px-12"
        style={{ borderColor: inkSoft }}
      >
        <button
          type="button"
          onClick={onPrev}
          className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider md:text-base"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          Prev project
        </button>
        <button
          type="button"
          onClick={onNext}
          className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider md:text-base"
        >
          Next project
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
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

  const langs: Lang[] = ['en', 'pt', 'es']

  // Work-section entrance: each tile leaps in from the sides / above. The
  // animation re-plays every time the section re-enters view, BUT we only
  // re-arm to the hidden state when the section is completely off-screen,
  // so the cards never visually disappear while any of them is on screen.
  const tileEntrance = [
    { x: -260, scale: 0.85 },
    { x: -130, scale: 0.9 },
    { y: 80, scale: 0.85 },
    { x: 130, scale: 0.9 },
    { x: 260, scale: 0.85 },
  ]
  // Carousel rotation: which original tile is currently at the centre slot.
  // Clicking any tile rotates the row so the clicked one slides into place.
  const [centerOrigIdx, setCenterOrigIdx] = useState(2)
  const arrangedTiles = tiles.map((_, slot) => {
    const origIdx = (centerOrigIdx - 2 + slot + tiles.length) % tiles.length
    return { tile: tiles[origIdx], origIdx, slot }
  })

  // Dedicated project screen: which project (by original index) is open in the
  // fullscreen overlay. null = closed. Click first slides the tile to centre,
  // then (after the rotation settles) opens the dedicated view with a flip-in.
  const [openProjectIdx, setOpenProjectIdx] = useState<number | null>(null)
  const openProject = (origIdx: number) => {
    setCenterOrigIdx(origIdx)
    // Delay matches the carousel layout spring — let the tile reach the centre
    // before the dedicated screen flips in over it.
    window.setTimeout(() => setOpenProjectIdx(origIdx), 650)
  }
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
      className="min-h-screen w-full overflow-x-hidden transition-colors duration-500"
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

        {/* ===== WORK — click rotates to centre, then a dedicated screen
              opens for that project (carousel + flip into fullscreen) ===== */}
        <section id="work" className="mt-20 md:mt-32">
          <motion.div
            ref={workRef}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
            initial="hidden"
            animate={workControls}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:flex md:items-center md:justify-center md:gap-6"
          >
            {arrangedTiles.map(({ tile, origIdx, slot }) => (
              <motion.div
                key={origIdx}
                layout
                onClick={() => openProject(origIdx)}
                role="button"
                tabIndex={0}
                aria-label={`Open project ${tile.project.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openProject(origIdx)
                  }
                }}
                style={{ backgroundColor: tile.bg }}
                variants={{
                  hidden: { opacity: 0, ...tileEntrance[slot] },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    transition: { duration: 1, ease },
                  },
                }}
                whileHover={{ y: -8 }}
                transition={{
                  layout: { type: 'spring', stiffness: 160, damping: 22 },
                }}
                className={`${slotHeights[slot]} group relative aspect-square cursor-pointer overflow-hidden rounded-[28px] md:aspect-auto md:flex-1`}
              >
                <Image
                  src={tile.img}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ===== DEDICATED PROJECT SCREEN ===== */}
        <AnimatePresence>
          {openProjectIdx !== null && (
            <motion.div
              key="project-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              onClick={() => setOpenProjectIdx(null)}
              className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 md:p-10"
              style={{ perspective: 1800 }}
              role="dialog"
              aria-modal="true"
              aria-label={tiles[openProjectIdx].project.title}
            >
              <motion.article
                initial={{ rotateY: 92, opacity: 0, scale: 0.92 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: -92, opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.75, ease }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  transformStyle: 'preserve-3d',
                  backgroundColor: p.bg,
                  color: p.ink,
                  borderColor: p.border,
                }}
                className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[28px] border shadow-2xl md:rounded-[36px]"
              >
                <ProjectScreen
                  project={tiles[openProjectIdx].project}
                  cover={tiles[openProjectIdx].img}
                  number={openProjectIdx + 1}
                  total={tiles.length}
                  blue={p.blue}
                  inkSoft={p.inkSoft}
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
              </motion.article>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== WHAT WE DO PANEL ===== */}
        <section
          id="services"
          className="mt-16 rounded-[28px] p-7 transition-colors duration-500 md:mt-24 md:rounded-[36px] md:p-12"
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

        {/* ===== MANIFESTO ===== */}
        <section id="studio" className="relative mt-20 md:mt-28">
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

        {/* ===== TEAM ===== */}
        <section className="mt-20 md:mt-28">
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

        {/* ===== CONTACT ===== */}
        <section
          id="contact"
          className="mt-20 rounded-[28px] p-7 transition-colors duration-500 md:mt-28 md:rounded-[36px] md:p-12"
          style={{ backgroundColor: p.panel }}
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
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
                style={{ color: p.inkSoft }}
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
            <ContactForm t={t} p={p} />
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
