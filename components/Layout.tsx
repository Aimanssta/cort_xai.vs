import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, MapPin, Phone, ArrowRight, Activity } from 'lucide-react';
import AICallAgent from './AICallAgent';
import Logo from './Logo';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Sales Agents', path: '/solutions/sales-agents' },
    { label: 'Lead Gen Tools', path: '/solutions/lead-gen' },
    { label: 'Local AIO', path: '/solutions/local-aio' },
    { label: 'Live Demo', path: '/dashboard' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cort-500/30">
      {/* AI Call Agent Widget */}
      <AICallAgent />

      {/* Sticky Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || isMobileMenuOpen ? 'glass-nav shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group relative z-50" onClick={() => setIsMobileMenuOpen(false)}>
                  <Logo size={56} />
                </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-all relative py-1 ${
                    isActive(link.path) ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className={link.label === 'Live Demo' ? 'flex items-center gap-1.5 text-emerald-400' : ''}>
                    {link.label === 'Live Demo' && <Activity className="h-3 w-3 animate-pulse" />}
                    {link.label}
                  </span>
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cort-500 rounded-full animate-fade-in"></span>
                  )}
                </Link>
              ))}
                  <Link to="/contact" className="bg-cort-600 hover:bg-cort-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-cort-600/20 flex items-center gap-2">
                    Book Demo <ArrowRight className="h-4 w-4" />
                  </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden relative z-50">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl pt-24 px-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-4 rounded-xl text-lg font-medium border border-transparent transition-all ${
                    isActive(link.path)
                      ? 'bg-cort-900/50 text-cort-400 border-cort-500/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                 <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-cort-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg shadow-cort-600/20"
                >
                  Book Demo
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
                  <Link to="/" className="flex items-center gap-2 mb-4">
                    <Logo size={36} />
                  </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Revolutionizing USA businesses with autonomous sales agents, intelligent lead generation, and local AIO dominance.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-cort-600 transition-colors cursor-pointer flex items-center justify-center text-slate-400 hover:text-white">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-cort-600 transition-colors cursor-pointer flex items-center justify-center text-slate-400 hover:text-white">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Solutions</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link to="/solutions/sales-agents" className="hover:text-cort-400 transition-colors">AI Sales Agents</Link></li>
                <li><Link to="/solutions/lead-gen" className="hover:text-cort-400 transition-colors">Lead Gen Tools</Link></li>
                <li><Link to="/solutions/local-aio" className="hover:text-cort-400 transition-colors">Local AIO Dominance</Link></li>
                <li><Link to="/solutions/sales-agents" className="hover:text-cort-400 transition-colors">CRM Integration</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link to="/contact" className="hover:text-cort-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-cort-400 transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-cort-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/contact" className="hover:text-cort-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-cort-500 shrink-0" />
                  <span>100 Innovation Dr, Suite 500<br />San Francisco, CA 94105</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-cort-500 shrink-0" />
                  <a href="mailto:hello@cortxai.com" className="hover:text-white transition-colors">hello@cortxai.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-cort-500 shrink-0" />
                  <a href="tel:+18885550123" className="hover:text-white transition-colors">+1 (888) 555-0123</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Cort X AI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <Link to="/contact" className="cursor-pointer hover:text-slate-300">Privacy</Link>
               <Link to="/contact" className="cursor-pointer hover:text-slate-300">Terms</Link>
               <Link to="/" className="cursor-pointer hover:text-slate-300">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;