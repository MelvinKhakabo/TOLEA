import { Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'
import AuthProvider from './lib/auth/AuthProvider'
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
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import CompleteProfile from './pages/CompleteProfile'

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
    <AuthProvider>
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}