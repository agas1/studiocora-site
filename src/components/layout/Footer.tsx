'use client'

import Link from 'next/link'
import { useRef, useState, type FormEvent, type PointerEvent } from 'react'
import type { Locale, SiteContent } from '@/content'
import { motion } from 'framer-motion'

function SocialIcon({ name }: { name: 'linkedin' | 'instagram' | 'facebook' | 'x' | 'youtube' }) {
  const paths = {
    linkedin: <path d="M5.2 8.2H2V18h3.2V8.2ZM3.6 3.5a1.85 1.85 0 1 0 0 3.7 1.85 1.85 0 0 0 0-3.7ZM10.4 8.2H7.3V18h3.2v-5.1c0-1.35.25-2.65 1.92-2.65 1.64 0 1.66 1.53 1.66 2.74V18h3.2v-5.65c0-2.78-.6-4.92-3.85-4.92-1.56 0-2.6.86-3.03 1.67h-.04v-.9Z" />,
    instagram: <><rect x="3" y="3" width="15" height="15" rx="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="10.5" cy="10.5" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="15.3" cy="5.8" r="1" /></>,
    facebook: <path d="M12.4 19v-7h2.4l.36-2.8H12.4V7.4c0-.8.22-1.36 1.4-1.36h1.5V3.55a20 20 0 0 0-2.18-.12c-2.16 0-3.64 1.32-3.64 3.74V9.2H7.04V12h2.44v7h2.92Z" />,
    x: <path d="M4 3.5 9.1 10 4.3 18h2.2l3.62-6.07L14.9 18H19l-5.45-6.94L18.05 3.5h-2.2l-3.32 5.57L8.15 3.5H4Zm3.2 1.6h.9l7.7 11.3h-.9L7.2 5.1Z" />,
    youtube: <path d="M19.3 6.1a2.35 2.35 0 0 0-1.65-1.66C16.2 4.05 10.4 4.05 10.4 4.05s-5.8 0-7.25.39A2.35 2.35 0 0 0 1.5 6.1c-.39 1.46-.39 4.5-.39 4.5s0 3.04.39 4.5a2.35 2.35 0 0 0 1.65 1.66c1.45.39 7.25.39 7.25.39s5.8 0 7.25-.39a2.35 2.35 0 0 0 1.65-1.66c.39-1.46.39-4.5.39-4.5s0-3.04-.39-4.5ZM8.55 13.4V7.8l4.85 2.8-4.85 2.8Z" />,
  }
  return <svg aria-hidden="true" viewBox="0 0 21 21" className="size-4 fill-current">{paths[name]}</svg>
}

export function Footer({ locale, copy }: { locale: Locale; copy: SiteContent['footer'] }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const base = locale === 'pt' ? '/pt' : '/en'
  const contactPath = locale === 'pt' ? '/pt/contato' : '/en/contact'
  const socials = [
    { name: 'linkedin' as const, label: 'LinkedIn', href: 'https://www.linkedin.com/company/studiocora/' },
    { name: 'instagram' as const, label: 'Instagram', href: 'https://www.instagram.com/usestudiocora/' },
    { name: 'facebook' as const, label: 'Facebook' },
    { name: 'x' as const, label: 'X' },
    { name: 'youtube' as const, label: 'YouTube' },
  ]
  const columns = [
    [{ label: copy.links.home, href: base }, { label: copy.links.studio, href: locale === 'pt' ? '/pt/sobre' : '/en/studio' }, { label: copy.links.projects, href: `${base}#work` }, { label: copy.links.services, href: `${base}#services` }, { label: copy.links.journal, href: locale === 'pt' ? '/pt/blog' : '/en/insights' }],
    [{ label: copy.links.branding, href: locale === 'pt' ? '/pt/servicos/branding' : '/en/services/branding' }, { label: copy.links.social, href: locale === 'pt' ? '/pt/servicos/gestao-de-redes-sociais' : '/en/services/social-media-management' }, { label: copy.links.identity, href: locale === 'pt' ? '/pt/servicos/identidade-visual' : '/en/services/visual-identity' }, { label: copy.links.web, href: locale === 'pt' ? '/pt/servicos/desenvolvimento-web' : '/en/services/web-development' }],
    [{ label: copy.links.contact, href: contactPath }, { label: copy.links.email, href: 'mailto:hello@usestudiocora.com' }, { label: copy.links.language, href: locale === 'pt' ? '/en' : '/pt' }],
  ]

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    panelRef.current?.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`)
    panelRef.current?.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`)
  }

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email || status === 'sending') return
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Newsletter', email, message: copy.newsletterMessage, company: '' }) })
      if (!response.ok) throw new Error('Request failed')
      setStatus('sent')
      setEmail('')
    } catch { setStatus('error') }
  }

  return (
    <footer className="bg-white px-3 pb-3 pt-8 md:px-4 md:pb-4 md:pt-8">
      <div ref={panelRef} onPointerMove={followPointer} className="group/footer relative isolate min-h-[640px] overflow-hidden rounded-[26px] bg-[#090909] px-6 py-9 font-semibold text-white md:min-h-[680px] md:rounded-[30px] md:px-10 md:py-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/footer:opacity-100 motion-reduce:hidden" style={{ background: 'radial-gradient(340px circle at var(--glow-x, 55%) var(--glow-y, 60%), rgba(255,255,255,0.13), transparent 72%)' }} />
        <div className="mx-auto flex min-h-[568px] max-w-[1440px] flex-col md:min-h-[600px]">
          <div className="grid grid-cols-12 gap-x-8 gap-y-14">
            <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="col-span-12 md:col-span-6">
              <h2 className="max-w-[540px] text-[clamp(1.75rem,2.8vw,3rem)] font-bold leading-[1.05] tracking-[-0.045em]">{copy.newsletterLine1}<br />{copy.newsletterLine2}</h2>
              <form onSubmit={subscribe} className="mt-7 flex min-h-[60px] max-w-[560px] items-center rounded-full border border-white p-1 transition-[border-radius] duration-200 ease-out hover:rounded-[16px] focus-within:rounded-[16px]">
                <label htmlFor="footer-email" className="sr-only">{copy.emailPlaceholder}</label>
                <input id="footer-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={copy.emailPlaceholder} className="min-w-0 flex-1 bg-transparent px-5 py-2 text-sm font-bold text-white outline-none focus-visible:outline-none placeholder:font-bold placeholder:text-white" />
                <button type="submit" disabled={status === 'sending'} aria-label={copy.subscribe} className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-lg text-black transition-transform duration-200 hover:rotate-45 disabled:opacity-50">↗</button>
              </form>
              <p aria-live="polite" className="mt-3 min-h-5 text-sm text-white/55">{status === 'sent' ? copy.success : status === 'error' ? copy.error : ''}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {socials.map((social) => social.href ? (
                  <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={`Studio Cora no ${social.label}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white transition-[background-color,color] duration-200 hover:bg-white/15 hover:text-[#6966F0]">
                    <SocialIcon name={social.name} /><span>↗</span>
                  </a>
                ) : (
                  <span key={social.name} aria-label={`${social.label} — em breve`} aria-disabled="true" className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white opacity-55 transition-[border-radius,background-color] duration-200 hover:rounded-[10px] hover:bg-white/15">
                    <SocialIcon name={social.name} /><span>↗</span>
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.nav initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} aria-label={copy.navigationLabel} className="col-span-12 grid grid-cols-2 gap-x-4 gap-y-8 md:col-span-5 md:col-start-8 md:grid-cols-3 md:gap-8">
                  {columns.map((column, index) => <div key={index} className="space-y-3 border-l border-white/20 pl-4 md:pl-6">{column.map((link) => <Link key={link.label} href={link.href} className="block w-fit text-base text-white transition-colors duration-200 hover:text-[#6966F0] md:text-lg">{link.label}</Link>)}</div>)}
            </motion.nav>
          </div>
          <p aria-label="Studio Cora" className="mt-auto whitespace-nowrap text-center text-[clamp(2.2rem,12.5vw,12rem)] font-bold leading-[0.8] tracking-[-0.075em]">STUDIO CORA</p>
          <div className="mt-9 flex flex-col justify-between gap-4 border-t border-white/20 pt-5 text-sm text-white md:flex-row">
            <p>Studio Cora © {new Date().getFullYear()}. {copy.rights} {copy.developedBy}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2"><a href="mailto:hello@usestudiocora.com" className="transition-colors duration-200 hover:text-[#6966F0]">hello@usestudiocora.com</a><Link href={contactPath} className="transition-colors duration-200 hover:text-[#6966F0]">{copy.contactLabel}</Link></div>
          </div>
        </div>
      </div>
    </footer>
  )
}
