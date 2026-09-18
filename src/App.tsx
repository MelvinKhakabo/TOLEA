import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Volunteer from './pages/Volunteer'
import Organizations from './pages/Organizations'
import Opportunities from './pages/Opportunities'
import HowWeWork from './pages/HowWeWork'
import Donate from './pages/Donate'
import Careers from './pages/Careers'
import Events from './pages/Events'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/how-we-work" element={<HowWeWork />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}