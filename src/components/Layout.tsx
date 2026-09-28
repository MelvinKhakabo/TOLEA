import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

const primaryNav = [
  { label: 'Volunteer', to: '/volunteer' },
  { label: 'Organizations', to: '/organizations' },
  { label: 'Opportunities', to: '/opportunities' },
  { label: 'How We Work', to: '/how-we-work' },
]

// "About" is both a link (clicking the label goes to /about) and a dropdown
// trigger for the rest of the secondary pages — same pattern IVHQ uses.
const aboutLink = { label: 'About', to: '/about' }
const aboutMenu = [
  { label: 'Donate', to: '/donate' },
  { label: 'Careers', to: '/careers' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]
const aboutGroupPaths = [aboutLink.to, ...aboutMenu.map((l) => l.to)]

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <path d="M6 9l6 6l6-6" />
    </svg>
  )
}

function AboutDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isGroupActive = aboutGroupPaths.includes(pathname)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 text-sm cursor-pointer ${
          isGroupActive ? 'text-marigold font-semibold' : 'text-taupe'
        }`}
      >
        {aboutLink.label}
        <ChevronDown />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-md border border-line bg-white shadow-md py-1.5 z-20">
          <Link
            to={aboutLink.to}
            onClick={() => setOpen(false)}
            className={`block px-3.5 py-2 text-sm hover:bg-taupe/10 ${
              pathname === aboutLink.to ? 'text-marigold font-semibold' : 'text-umber'
            }`}
          >
            About Tolea
          </Link>
          <div className="h-px bg-line my-1" />
          {aboutMenu.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`block px-3.5 py-2 text-sm hover:bg-taupe/10 ${
                pathname === item.to ? 'text-marigold font-semibold' : 'text-umber'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-ivory text-umber font-sans flex flex-col">
      <header className="border-b border-taupe/30">
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-xl text-marigold">
            Tolea
          </Link>

          <nav className="flex items-center gap-6">
            {primaryNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium ${
                  pathname === item.to ? 'text-marigold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <span className="h-4 w-px bg-taupe/40" />
            <AboutDropdown pathname={pathname} />
            <span className="h-4 w-px bg-taupe/40" />
            <Link to="/login" className="text-sm font-medium text-indigo">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}