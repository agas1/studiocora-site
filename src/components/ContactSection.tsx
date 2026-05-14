'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const
const ACCENT = '#3D3DFF'

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

export function ContactSection() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [values, setValues] = useState({ name: '', email: '', message: '' })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status.kind === 'submitting') return

    setStatus({ kind: 'submitting' })

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: (formData.get('name') as string) ?? '',
      email: (formData.get('email') as string) ?? '',
      message: (formData.get('message') as string) ?? '',
      company: (formData.get('company') as string) ?? '',
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
        setStatus({
          kind: 'error',
          message: data.error ?? 'Something went wrong. Please try again.',
        })
        return
      }
      setStatus({ kind: 'success' })
      setValues({ name: '', email: '', message: '' })
    } catch {
      setStatus({
        kind: 'error',
        message: 'Network error. Please try again.',
      })
    }
  }

  const isSubmitting = status.kind === 'submitting'
  const isSuccess = status.kind === 'success'

  return (
    <section
      id="contact"
      className="mt-16 border-t border-[#0A0A0A]/30 pt-10 md:mt-24 md:pt-14"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        {/* LEFT — pitch */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
          className="col-span-12 md:col-span-5"
        >
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-[12vw] leading-[0.95] tracking-[-0.01em] md:text-[5vw] lg:text-[5.5rem]"
          >
            TELL US <br />
            ABOUT YOUR <br />
            <span style={{ color: ACCENT }}>PROJECT.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-[1.5] text-[#0A0A0A]/80 md:text-base">
            A short note, an early idea, a deadline you’re unsure about — we’ll
            get back within two working days.
          </p>
        </motion.div>

        {/* RIGHT — form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="col-span-12 md:col-span-7"
        >
          <form onSubmit={onSubmit} className="flex flex-col gap-7">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              <Field
                label="Name"
                name="name"
                value={values.name}
                onChange={(v) => setValues((s) => ({ ...s, name: v }))}
                autoComplete="name"
                required
                disabled={isSubmitting}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={(v) => setValues((s) => ({ ...s, email: v }))}
                autoComplete="email"
                required
                disabled={isSubmitting}
              />
            </div>

            <Field
              label="Message"
              name="message"
              value={values.message}
              onChange={(v) => setValues((s) => ({ ...s, message: v }))}
              required
              disabled={isSubmitting}
              multiline
            />

            {/* Honeypot — hidden from humans */}
            <div className="hidden" aria-hidden>
              <label>
                Company
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                style={{ backgroundColor: ACCENT }}
                className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium text-[#EDEDED] transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {isSubmitting
                  ? 'Sending…'
                  : isSuccess
                    ? 'Sent — thank you'
                    : 'Send message'}
                {!isSuccess && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M1 7h12M8 2l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              {status.kind === 'error' && (
                <p className="text-sm text-red-600">{status.message}</p>
              )}
              {status.kind === 'success' && (
                <p className="text-sm text-[#0A0A0A]/70">
                  We’ll be in touch shortly.
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required,
  multiline,
  autoComplete,
  disabled,
}: {
  label: string
  name: string
  type?: string
  value: string
  onChange: (next: string) => void
  required?: boolean
  multiline?: boolean
  autoComplete?: string
  disabled?: boolean
}) {
  const sharedClass =
    'block w-full appearance-none border-0 border-b border-[#0A0A0A]/30 bg-transparent px-0 py-2 text-base text-[#0A0A0A] outline-none transition-colors duration-300 placeholder:text-[#0A0A0A]/40 focus:border-[#0A0A0A] disabled:opacity-50'

  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/60">
        {label}
        {required && <span style={{ color: ACCENT }}> *</span>}
      </span>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          required={required}
          disabled={disabled}
          className={`${sharedClass} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          className={sharedClass}
        />
      )}
    </label>
  )
}
