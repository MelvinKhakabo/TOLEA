import { Link, Outlet } from 'react-router-dom'

const primaryNav = [
  { label: 'Volunteer', to: '/volunteer' },
  { label: 'Organizations', to: '/organizations' },
  { label: 'Opportunities', to: '/opportunities' },
  { label: 'How We Work', to: '/how-we-work' },
]

const secondaryNav = [
  { label: 'About', to: '/about' },
  { label: 'Donate', to: '/donate' },
  { label: 'Careers', to: '/careers' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-ivory text-ink font-sans">
      <header className="border-b border-taupe/30">
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-xl text-marigold">
            Tolea
          </Link>

          <nav className="flex items-center gap-6">
            {primaryNav.map((item) => (
              <Link key={item.to} to={item.to} className="text-sm font-medium">
                {item.label}
              </Link>
            ))}
            <span className="h-4 w-px bg-taupe/40" />
            {secondaryNav.map((item) => (
              <Link key={item.to} to={item.to} className="text-sm text-taupe">
                {item.label}
              </Link>
            ))}
            <span className="h-4 w-px bg-taupe/40" />
            <Link to="/login" className="text-sm font-medium text-indigo">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}