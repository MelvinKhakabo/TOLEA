import type { ReactNode } from 'react'

// Same dark-green treatment used on Home/About/Contact — the ivory card
// pops out of it, like the Contact page.
const DARK_GRADIENT =
  'radial-gradient(circle at 15% 20%, rgba(195,216,46,0.16), transparent 45%), radial-gradient(circle at 85% 80%, rgba(232,163,49,0.16), transparent 50%), linear-gradient(160deg, #1d4433 0%, #2B6E4F 55%, #163828 100%)'

export default function AuthCard({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div data-nav-theme="dark" className="px-4 pt-4 pb-8">
      <div
        className="relative overflow-hidden rounded-[28px] px-4 sm:px-9 pt-24 pb-16 md:pt-28 md:pb-20"
        style={{ background: DARK_GRADIENT }}
      >
        <div className="relative z-10 max-w-md mx-auto rounded-[22px] bg-ivory shadow-2xl ring-1 ring-white/10 p-6 sm:p-9">
          <div className="font-mono text-[10.5px] text-forest mb-2 lowercase">{eyebrow}</div>
          <h1 className="font-display font-bold text-2xl leading-[1.2] mb-2">{title}</h1>
          {subtitle && <p className="text-[13px] text-umber-soft leading-[1.6] mb-6">{subtitle}</p>}
          {!subtitle && <div className="mb-4" />}
          {children}
          {footer && <div className="mt-6 pt-5 border-t border-line text-[12.5px] text-umber-soft text-center">{footer}</div>}
        </div>
      </div>
    </div>
  )
}