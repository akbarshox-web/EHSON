// Single source of truth for all sticker icons used across the app.
// Every icon is an inline SVG, no external assets, no emoji.

function base({ size = 24, viewBox = '0 0 24 24', children, className = '', strokeWidth = 1.8 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

// Sticker wrapper: rounded background, soft shadow, brand-tinted.
// Use when you want a "sticker on the page" look.
export function Sticker({ children, tone = 'primary', size = 56, className = '' }) {
  const tones = {
    primary: 'from-primary-400 to-primary-600 text-white shadow-soft',
    accent:  'from-accent-400 to-accent-600 text-white shadow-soft',
    rose:    'from-rose-400 to-rose-600 text-white shadow-soft',
    sky:     'from-sky-400 to-sky-600 text-white shadow-soft',
    amber:   'from-amber-400 to-amber-600 text-white shadow-soft',
    slate:   'from-slate-200 to-slate-300 text-slate-700 shadow-soft dark:from-slate-700 dark:to-slate-800 dark:text-slate-200',
  }
  return (
    <span
      className={
        'inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ' +
        tones[tone] +
        ' ' +
        className
      }
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  )
}

// --- Navigation / UI ---
export const IconHeart = (p) => base({
  ...p,
  children: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  ),
})

export const IconHeartFilled = (p) => base({
  ...p,
  fill: 'currentColor',
  stroke: 'currentColor',
  children: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  ),
})

export const IconHand = (p) => base({
  ...p,
  children: (
    <>
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M12 11V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M15 11V6.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1-6 6h-1.34a4 4 0 0 1-3.06-1.45L4 14.5a1.5 1.5 0 0 1 2.36-1.86L9 15" />
    </>
  ),
})

export const IconSearch = (p) => base({
  ...p,
  children: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
})

export const IconSun = (p) => base({
  ...p,
  children: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </>
  ),
})

export const IconMoon = (p) => base({
  ...p,
  children: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
})

export const IconClose = (p) => base({
  ...p,
  children: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
})

export const IconCheck = (p) => base({
  ...p,
  children: <path d="M20 6 9 17l-5-5" />,
})

export const IconArrowRight = (p) => base({
  ...p,
  children: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
})

export const IconArrowLeft = (p) => base({
  ...p,
  children: (
    <>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </>
  ),
})

export const IconPhone = (p) => base({
  ...p,
  children: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.92z" />
  ),
})

export const IconPin = (p) => base({
  ...p,
  children: (
    <>
      <path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
})

export const IconCard = (p) => base({
  ...p,
  children: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </>
  ),
})

export const IconWallet = (p) => base({
  ...p,
  children: (
    <>
      <path d="M21 12V8a2 2 0 0 0-2-2H5a2 2 0 0 1 0-4h12v4" />
      <path d="M3 6v12a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-3" />
      <circle cx="17" cy="13" r="1.5" />
    </>
  ),
})

export const IconUser = (p) => base({
  ...p,
  children: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
})

export const IconUsers = (p) => base({
  ...p,
  children: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
})

export const IconCalendar = (p) => base({
  ...p,
  children: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
})

export const IconMap = (p) => base({
  ...p,
  children: (
    <>
      <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
      <path d="M9 4v16M15 6v16" />
    </>
  ),
})

export const IconShield = (p) => base({
  ...p,
  children: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
})

export const IconImage = (p) => base({
  ...p,
  children: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </>
  ),
})

export const IconVideo = (p) => base({
  ...p,
  children: (
    <>
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="m22 8-6 4 6 4z" />
    </>
  ),
})

export const IconUpload = (p) => base({
  ...p,
  children: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m17 8-5-5-5 5" />
      <path d="M12 3v12" />
    </>
  ),
})

export const IconClipboard = (p) => base({
  ...p,
  children: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </>
  ),
})

export const IconMail = (p) => base({
  ...p,
  children: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </>
  ),
})

export const IconChart = (p) => base({
  ...p,
  children: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 3 3 5-6" />
    </>
  ),
})

export const IconGlobe = (p) => base({
  ...p,
  children: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </>
  ),
})

export const IconCheckCircle = (p) => base({
  ...p,
  children: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5L16 9" />
    </>
  ),
})

export const IconXCircle = (p) => base({
  ...p,
  children: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </>
  ),
})

export const IconHourglass = (p) => base({
  ...p,
  children: (
    <>
      <path d="M6 2h12M6 22h12" />
      <path d="M6 2v3a6 6 0 0 0 12 0V2" />
      <path d="M6 22v-3a6 6 0 0 1 12 0v3" />
    </>
  ),
})

export const IconLock = (p) => base({
  ...p,
  children: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
})

export const IconRefresh = (p) => base({
  ...p,
  children: (
    <>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </>
  ),
})

export const IconList = (p) => base({
  ...p,
  children: (
    <>
      <path d="M8 6h13M8 12h13M8 18h13" />
      <circle cx="3.5" cy="6" r="1" />
      <circle cx="3.5" cy="12" r="1" />
      <circle cx="3.5" cy="18" r="1" />
    </>
  ),
})

export const IconFilter = (p) => base({
  ...p,
  children: <path d="M3 4h18l-7 9v6l-4 2v-8z" />,
})

export const IconCopy = (p) => base({
  ...p,
  children: (
    <>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
})

export const IconSparkle = (p) => base({
  ...p,
  children: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m6 6 2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
    </>
  ),
})

// Big decorative sticker used on the Home hero.
export function StickerHeroDonate({ size = 200 }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-[2rem] bg-gradient-to-br from-primary-400 to-primary-700 text-white shadow-glow"
      style={{ width: size, height: size }}
    >
      <IconHeartFilled size={size * 0.55} />
    </span>
  )
}
