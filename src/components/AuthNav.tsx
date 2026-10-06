import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth/context'

const pill = 'inline-flex items-center gap-1.5 bg-lime text-umber font-semibold text-[12.5px] px-4 py-2 rounded-full'
const iconDot =
  'w-[18px] h-[18px] rounded-full bg-umber/15 inline-flex items-center justify-center font-mono text-[8px]'

/** Drop-in replacement for the "Login" link in Nav.tsx. */
export default function AuthNav() {
  const { user, profile, loading, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  if (!user) {
    return (
      <Link to="/login" className={pill} aria-busy={loading}>
        <span className={iconDot}>i</span>
        Login
      </Link>
    )
  }

  const first = (profile?.full_name || user.email || 'Account').split(/[\s@]/)[0]

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)} className={`${pill} cursor-pointer`} aria-expanded={open}>
        <span className={iconDot}>{first.charAt(0).toUpperCase()}</span>
        {first}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-md border border-line bg-white shadow-md py-1.5 z-30 text-left">
          <Link to="/opportunities" onClick={() => setOpen(false)} className="block px-3.5 py-2 text-[12px] text-umber hover:bg-taupe/10">
            Browse opportunities
          </Link>
          <div className="h-px bg-line my-1" />
          <button
            type="button"
            onClick={async () => {
              setOpen(false)
              await signOut()
              navigate('/')
            }}
            className="block w-full text-left px-3.5 py-2 text-[12px] text-umber hover:bg-taupe/10 cursor-pointer"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}