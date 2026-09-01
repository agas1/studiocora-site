'use client'

import Image from 'next/image'
import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import type { SiteContent } from '@/content'
import { RollingText } from '@/components/ui/RollingText'
import { ScrollSectionReveal } from '@/components/motion/ScrollSectionReveal'
import { whatsappLinkProps } from '@/lib/whatsapp'

const ease = [0.16, 1, 0.3, 1] as const
type Status = { kind: 'idle' | 'submitting' | 'success' } | { kind: 'error'; message: string }

export function ContactSection({ copy, locale = 'pt' }: { copy: SiteContent['contact']; locale?: 'pt' | 'en' }) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [values, setValues] = useState({ name: '', email: '', message: '' })

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status.kind === 'submitting') return
    setStatus({ kind: 'submitting' })
    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.get('name'), email: formData.get('email'), message: formData.get('message'), company: formData.get('company') }),
      })
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean }
      if (!response.ok || !data.ok) {
        setStatus({ kind: 'error', message: copy.genericError })
        return
      }
      setStatus({ kind: 'success' })
      setValues({ name: '', email: '', message: '' })
    } catch {
      setStatus({ kind: 'error', message: copy.networkError })
    }
  }

  const isSubmitting = status.kind === 'submitting'
  const isSuccess = status.kind === 'success'

  return (
    <section id="contact" className="mx-auto max-w-[1600px] px-3 pb-3 pt-8 md:px-4 md:pb-4 md:pt-12">
      <ScrollSectionReveal>
      <div className="grid grid-cols-12 gap-3 md:gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="col-span-12 flex flex-col bg-white px-5 py-8 md:col-span-7 md:min-h-[780px] md:px-4 md:py-10 lg:px-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F2F2F2] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em]">
            <span className="h-1.5 w-1.5 bg-[#7473F5]" />
            {locale === 'pt' ? 'Estúdio criativo · Brasil' : 'Creative studio · Brazil'}
          </div>
          <h1 className="mt-7 text-[clamp(3rem,4.6vw,5.2rem)] leading-[0.92] tracking-[-0.055em]">{locale === 'pt' ? 'Vamos conversar' : "Let's talk"}</h1>
          <p className="mt-6 max-w-3xl text-[15px] leading-[1.6] text-[#0A0A0A]/60 md:text-base">{copy.description}</p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            <div className="border-l border-[#0A0A0A]/15 pl-4">
              <p className="text-sm font-semibold">{locale === 'pt' ? 'Atendimento' : 'Availability'}</p>
              <p className="mt-3 text-sm text-[#0A0A0A]/45">{locale === 'pt' ? 'Empresas em todo o Brasil' : 'Companies across Brazil'}</p>
            </div>
            <div className="border-l border-[#0A0A0A]/15 pl-4">
              <p className="text-sm font-semibold">E-mail</p>
              <a href="mailto:contato@usestudiocora.com" className="mt-3 inline-block text-sm text-[#0A0A0A]/45 hover:text-[#0A0A0A] hover:underline">contato@usestudiocora.com</a>
            </div>
          </div>

          <form onSubmit={onSubmit} aria-busy={isSubmitting} aria-describedby="contact-form-status" className="mt-11 flex flex-1 flex-col gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={copy.name} name="name" value={values.name} onChange={(name) => setValues((current) => ({ ...current, name }))} autoComplete="name" required maxLength={120} disabled={isSubmitting} />
              <Field label={copy.email} name="email" type="email" value={values.email} onChange={(email) => setValues((current) => ({ ...current, email }))} autoComplete="email" required maxLength={320} disabled={isSubmitting} />
            </div>
            <Field label={copy.message} name="message" value={values.message} onChange={(message) => setValues((current) => ({ ...current, message }))} required maxLength={5000} disabled={isSubmitting} multiline />
            <div className="hidden" aria-hidden><label>{copy.company}<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label></div>

            <div className="mt-auto flex flex-col gap-4 pt-2">
              <button type="submit" disabled={isSubmitting || isSuccess} className="group inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-7 py-4 text-sm font-bold text-white transition-[border-radius,transform] duration-200 hover:-translate-y-0.5 hover:rounded-[18px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6966F0] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">
                <RollingText>{isSubmitting ? copy.submitting : isSuccess ? copy.success : copy.submit}</RollingText>
                {!isSuccess && <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>}
              </button>
              <div id="contact-form-status" aria-live="polite" aria-atomic="true">
                {status.kind === 'error' && <p role="alert" className="text-sm text-[#7473F5]">{status.message}</p>}
                {status.kind === 'success' && <p className="text-sm text-[#0A0A0A]/70">{copy.successMessage}</p>}
              </div>
            </div>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="relative col-span-12 h-[560px] overflow-hidden rounded-[24px] md:col-span-5 md:mt-3 md:h-[820px] md:self-start">
          <Image src="/contact-blue-hand-flower-framed.png" alt={locale === 'pt' ? 'Mão azul completa segurando uma flor inteira em tons rosados' : 'Complete blue hand holding a complete flower in pink tones'} fill priority sizes="(max-width: 768px) 100vw, 42vw" className="object-cover" />
        </motion.div>
      </div>
      </ScrollSectionReveal>

      <ScrollSectionReveal>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
        className="mt-24 rounded-[24px] bg-[#0A0A0A] px-6 py-10 text-white md:mt-32 md:px-10 md:py-14"
      >
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#0A0A0A]">
          <span className="flex size-3 items-center justify-center bg-[#7473F5] text-[9px] leading-none text-white">+</span>
          {locale === 'pt' ? 'Nossos escritórios' : 'Our offices'}
        </div>

        <div className="group/offices mt-12 border-t border-dashed border-white/15">
          {(locale === 'pt' ? [
            ['Brasil', 'Operação atual · atendimento a empresas em todo o país'],
            ['Estados Unidos', 'Operação atual · atendimento a empresas em todo o país'],
          ] : [
            ['Brazil', 'Current operation · working with companies across the country'],
            ['United States', 'Current operation · working with companies across the country'],
          ]).map(([title, description]) => (
            <div key={title} className="group/office grid gap-4 border-b border-dashed border-white/15 py-7 transition-opacity duration-300 md:group-hover/offices:opacity-30 md:hover:!opacity-100 md:grid-cols-12 md:items-center md:py-9">
              <h2 className="origin-left text-[clamp(2.2rem,4vw,4.5rem)] leading-none tracking-[-0.05em] transition-transform duration-500 ease-out md:group-hover/office:translate-x-5 md:group-hover/office:scale-[1.035] md:col-span-8 md:group-hover/office:translate-x-8">{title}</h2>
              <p className="max-w-sm text-sm leading-6 text-white/65 transition-transform duration-500 ease-out md:group-hover/office:-translate-x-2 md:col-span-4 md:justify-self-end md:text-base">{description}</p>
            </div>
          ))}
        </div>
      </motion.div>
      </ScrollSectionReveal>

      <ScrollSectionReveal>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
        className="flex min-h-[620px] flex-col items-center justify-center px-5 py-24 text-center md:min-h-[720px]"
      >
        <div className="inline-flex w-fit items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-[#0A0A0A]">
          <span aria-hidden="true" className="text-[#6966F0]">✦</span>
          {locale === 'pt' ? 'Comece agora' : 'Start now'}
          <span aria-hidden="true" className="text-[#6966F0]">✦</span>
        </div>

        <h2 aria-label={locale === 'pt' ? 'Transforme suas ideias hoje mesmo' : 'Transform your ideas today'} className="mt-5 max-w-[900px] text-[clamp(2.6rem,7vw,120px)] leading-[1.02] tracking-[-0.055em]">
          {locale === 'pt' ? (
            <><span className="block">Transforme</span><span className="block whitespace-nowrap">suas ideias hoje</span><span className="block">mesmo</span></>
          ) : (
            <><span className="block">Transform</span><span className="block">your ideas</span><span className="block">today</span></>
          )}
        </h2>

        <a
          {...whatsappLinkProps(locale, "#contact")}
          className="group mt-10 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#6966F0] px-7 py-4 text-sm font-bold text-white shadow-[0_0_0_rgba(105,102,240,0)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(105,102,240,0.65)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6966F0]"
        >
          <RollingText>{locale === 'pt' ? 'Fale com nosso time de criativos' : 'Talk to our creative team'}</RollingText>
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </a>
      </motion.div>
      </ScrollSectionReveal>
    </section>
  )
}

function Field({ label, name, type = 'text', value, onChange, required, multiline, autoComplete, disabled, maxLength }: { label: string; name: string; type?: string; value: string; onChange: (next: string) => void; required?: boolean; multiline?: boolean; autoComplete?: string; disabled?: boolean; maxLength?: number }) {
  const sharedClass = 'block w-full appearance-none rounded-[14px] border border-[#0A0A0A]/15 bg-white px-4 py-3.5 text-base text-[#0A0A0A] outline-none transition-[border-color,box-shadow] duration-300 focus:border-[#0A0A0A]/40 focus:shadow-[inset_0_0_0_1px_rgba(10,10,10,0.08)] focus-visible:outline-none disabled:opacity-50'
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[13px] font-medium uppercase tracking-[0.04em] text-[#0A0A0A]">{label}{required && <span className="text-[#7473F5]"> *</span>}</span>
      {multiline ? <textarea name={name} value={value} onChange={(event) => onChange(event.target.value)} rows={5} required={required} disabled={disabled} maxLength={maxLength} className={`${sharedClass} resize-none`} /> : <input name={name} type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} autoComplete={autoComplete} disabled={disabled} maxLength={maxLength} className={sharedClass} />}
    </label>
  )
}
