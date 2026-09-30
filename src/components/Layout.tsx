import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const activeByPath: Record<string, string> = {
  '/volunteer': 'Volunteer',
  '/organizations': 'Organizations',
  '/organizations/register': 'Organizations',
  '/opportunities': 'Opportunities',
  '/how-we-work': 'How We Work',
  '/about': 'About',
  '/donate': 'Donate',
  '/careers': 'Careers',
  '/events': 'Events',
  '/contact': 'Contact',
};

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-ivory text-umber font-sans flex flex-col">
      <Nav active={activeByPath[pathname]} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}