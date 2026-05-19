// Self-contained SVG "3D-ish" illustrations for the v2 landing.
// No external assets — crisp at any size, on-brand palette.

const BLUE = '#4B3FE4'
const BLUE_DK = '#2E25B8'
const LIME = '#FF3539'
const CREAM = '#F1EDE4'
const INK = '#1C1B17'

export type ArtVariant =
  | 'branding'
  | 'ux'
  | 'web'
  | 'motion'
  | 'engineering'
  | 'identity'
  | 'product'
  | 'direction'

export function Art({
  variant,
  className,
}: {
  variant: ArtVariant
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="sheenBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6A5FF0" />
          <stop offset="1" stopColor={BLUE_DK} />
        </linearGradient>
        <linearGradient id="sheenLime" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF6B6E" />
          <stop offset="1" stopColor={LIME} />
        </linearGradient>
        <linearGradient id="sheenCream" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor={CREAM} />
        </linearGradient>
      </defs>
      {render(variant)}
    </svg>
  )
}

function shadow(cx: number, cy: number, rx: number) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.28} fill="#000" opacity="0.12" />
}

function render(v: ArtVariant) {
  switch (v) {
    case 'branding':
      return (
        <>
          {shadow(100, 168, 56)}
          <rect x="52" y="44" width="96" height="96" rx="22" fill="url(#sheenBlue)" />
          <circle cx="100" cy="92" r="26" fill="url(#sheenLime)" />
          <circle cx="100" cy="92" r="10" fill={INK} />
          <rect x="64" y="120" width="72" height="10" rx="5" fill="#FFFFFF" opacity="0.7" />
        </>
      )
    case 'ux':
      return (
        <>
          {shadow(100, 168, 54)}
          <rect x="46" y="40" width="108" height="104" rx="18" fill="url(#sheenCream)" />
          <rect x="46" y="40" width="108" height="26" rx="13" fill="url(#sheenBlue)" />
          <rect x="60" y="80" width="56" height="10" rx="5" fill={INK} opacity="0.85" />
          <rect x="60" y="98" width="80" height="8" rx="4" fill={INK} opacity="0.25" />
          <rect x="60" y="112" width="40" height="8" rx="4" fill={INK} opacity="0.25" />
          <circle cx="132" cy="118" r="14" fill="url(#sheenLime)" />
        </>
      )
    case 'web':
      return (
        <>
          {shadow(100, 170, 58)}
          <rect x="40" y="46" width="120" height="84" rx="14" fill="url(#sheenBlue)" />
          <rect x="52" y="58" width="96" height="60" rx="6" fill={CREAM} />
          <rect x="60" y="66" width="34" height="34" rx="6" fill="url(#sheenLime)" />
          <rect x="100" y="66" width="40" height="8" rx="4" fill={INK} opacity="0.8" />
          <rect x="100" y="80" width="40" height="6" rx="3" fill={INK} opacity="0.3" />
          <rect x="76" y="132" width="48" height="10" rx="5" fill={INK} />
        </>
      )
    case 'motion':
      return (
        <>
          {shadow(100, 168, 52)}
          <circle cx="100" cy="96" r="52" fill="url(#sheenBlue)" />
          <path d="M88 74l34 22-34 22z" fill={CREAM} />
          <circle cx="150" cy="56" r="12" fill="url(#sheenLime)" />
          <circle cx="52" cy="128" r="9" fill="url(#sheenLime)" />
        </>
      )
    case 'engineering':
      return (
        <>
          {shadow(100, 170, 56)}
          <rect x="50" y="52" width="100" height="92" rx="16" fill={INK} />
          <text
            x="100"
            y="108"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="34"
            fill={LIME}
          >
            {'</>'}
          </text>
          <rect x="64" y="124" width="72" height="8" rx="4" fill="#FFFFFF" opacity="0.25" />
        </>
      )
    case 'identity':
      return (
        <>
          {shadow(100, 166, 50)}
          <rect x="56" y="46" width="88" height="100" rx="16" fill="url(#sheenBlue)" />
          <circle cx="100" cy="86" r="22" fill="url(#sheenLime)" />
          <rect x="74" y="118" width="52" height="10" rx="5" fill="#FFFFFF" opacity="0.75" />
        </>
      )
    case 'product':
      return (
        <>
          {shadow(100, 166, 52)}
          <rect x="58" y="40" width="84" height="112" rx="18" fill={INK} />
          <rect x="70" y="54" width="60" height="60" rx="10" fill="url(#sheenLime)" />
          <rect x="70" y="124" width="60" height="8" rx="4" fill="#FFFFFF" opacity="0.3" />
        </>
      )
    case 'direction':
      return (
        <>
          {shadow(100, 166, 52)}
          <rect x="50" y="58" width="100" height="78" rx="14" fill="url(#sheenCream)" />
          <path d="M70 116l24-34 18 22 14-18 14 30z" fill="url(#sheenBlue)" />
          <circle cx="124" cy="78" r="11" fill="url(#sheenLime)" />
        </>
      )
  }
}
