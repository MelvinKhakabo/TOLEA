import { Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Volunteer from './pages/Volunteer'
import Organizations from './pages/Organizations'
import OrganizationRegister from './pages/OrganizationRegister'
import Opportunities from './pages/Opportunities'
import HowWeWork from './pages/HowWeWork'
import Donate from './pages/Donate'
import Careers from './pages/Careers'
import Events from './pages/Events'
import Contact from './pages/Contact'

// Placeholder until real auth is built.
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-[60vh] bg-ivory flex items-center justify-center font-sans">
      <p className="text-umber-soft text-sm">{title} — coming soon</p>
    </div>
  )
}

// Catch-all so a wrong URL shows a page instead of a blank screen.
function NotFound() {
  return (
    <div className="min-h-[60vh] bg-ivory flex flex-col items-center justify-center font-sans gap-3">
      <p className="text-umber-soft text-sm">We couldn't find that page.</p>
      <Link to="/" className="text-indigo text-sm font-medium">
        ← Back to home
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organizations/register" element={<OrganizationRegister />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/how-we-work" element={<HowWeWork />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<ComingSoon title="Sign up" />} />
        <Route path="/login" element={<ComingSoon title="Login" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}