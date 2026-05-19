import { ImageResponse } from 'next/og'

export const alt = 'Studio Cora — Branding, UX & Digital Experiences'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#F1EDE4',
          color: '#1C1B17',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              backgroundColor: '#FF3539',
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
            studio cora
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.05,
            textTransform: 'uppercase',
            letterSpacing: -2,
          }}
        >
          <span>We build brands</span>
          <span>
            that are{' '}
            <span style={{ color: '#4B3FE4' }}>anything but ordinary</span>
          </span>
        </div>

        <div style={{ display: 'flex', fontSize: 26, color: '#1C1B17' }}>
          Branding · UX · Web · Engineering — usestudiocora.com
        </div>
      </div>
    ),
    { ...size }
  )
}
