import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

type Payload = {
  name?: string
  email?: string
  message?: string
  // Honeypot — bots tend to fill every field
  company?: string
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

export async function POST(request: Request) {
  let body: Payload
  try {
    body = (await request.json()) as Payload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (body.company && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true })
  }

  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const message = body.message?.trim() ?? ''

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email and message are required.' },
      { status: 400 }
    )
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: 'Please provide a valid email address.' },
      { status: 400 }
    )
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: 'Message is too long.' },
      { status: 400 }
    )
  }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? '465')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.SMTP_TO ?? user

  if (!host || !user || !pass) {
    console.error('Contact form misconfigured: missing SMTP env vars')
    return NextResponse.json(
      { error: 'Server is not configured to send mail.' },
      { status: 500 }
    )
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  try {
    await transporter.sendMail({
      from: `"Studio Cora — Website" <${user}>`,
      to,
      replyTo: `${name} <${email}>`,
      subject: `New message from ${name} via usestudiocora.com`,
      text: [
        `From: ${name} <${email}>`,
        '',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; color: #0a0a0a;">
          <p style="margin:0 0 8px 0; color:#666; font-size:12px;">New message from usestudiocora.com</p>
          <p style="margin:0 0 16px 0;"><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
          <div style="white-space: pre-wrap; padding: 12px 14px; background:#f5f5f5; border-radius: 6px;">${escapeHtml(message)}</div>
        </div>
      `,
    })
  } catch (err) {
    console.error('Contact form send failed:', err)
    return NextResponse.json(
      { error: 'Could not send the message right now. Please try again later.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
