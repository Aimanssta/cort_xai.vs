import React from 'react';
import GBPCaseStudy from '../components/GBPCaseStudy';
import GBPFeaturesList from '../components/GBPFeaturesList';
import ListingManagement from '../components/ListingManagement';
import SEO from '../components/SEO';

// Subtree reference: cortx-app (https://github.com/Aimanssta/cort-x-ai)
const LiveDemo: React.FC = () => {
  const [activeFeature, setActiveFeature] = React.useState<string | null>(null);

  const handleFeatureClick = (id?: string) => {
    setActiveFeature(activeFeature === id ? null : id || null);
  };

  return (
    <div className="bg-slate-950 min-h-screen font-sans">
      <SEO 
        title="Live Demo & Case Study - GBP Optimization AI | Cort X AI"
        description="Experience the core AI tools that scale local business presence and inbound calls. View our latest case studies and interactive GBP optimization dashboard."
      />
      {/* 1. Hero / Header Section (Following existing site style) */}
      <section className="pt-24 pb-16 px-6 text-center border-b border-slate-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The Core of <span className="text-emerald-500">Local AI Dominance</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            Experience the tools that power thousands of local businesses. From AI-driven review management to advanced ranking heatmaps — everything you need to scale inbound calls.
          </p>
        </div>
      </section>

      {/* 2. Case Study Section */}
      <GBPCaseStudy />

      {/* 3. Features Section (Semrush Inspired) */}
      <GBPFeaturesList onFeatureClick={handleFeatureClick} />

      {/* Dynamic Detailed Menus */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        {activeFeature === 'listing-mgmt' && (
          <div className="animate-slide-up">
            <ListingManagement />
          </div>
        )}

        {activeFeature === 'post-gen' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 animate-slide-up">
            <h3 className="text-2xl font-bold text-white mb-6">AI Local Post Generator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <p className="text-slate-400">Our AI analyzes your business type and local trends to generate high-engagement posts.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-slate-300"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Keyword-optimized captions</li>
                  <li className="flex items-center gap-2 text-sm text-slate-300"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> AI Image enhancement</li>
                  <li className="flex items-center gap-2 text-sm text-slate-300"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Multi-location scheduling</li>
                </ul>
              </div>
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 font-bold">AI</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generating Content...</div>
                </div>
                <div className="h-4 bg-slate-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        )}

        {activeFeature === 'heatmaps' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 animate-slide-up">
            <h3 className="text-2xl font-bold text-white mb-6">Local Ranking Heatmaps</h3>
            <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i1032!3i1612!2m3!1e0!2sm!3i633140934!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2')] bg-cover"></div>
               <div className="grid grid-cols-5 gap-4 relative z-10">
                 {[...Array(15)].map((_, i) => (
                   <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${i < 5 ? 'bg-emerald-500 text-white' : i < 10 ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'}`}>
                     {i % 3 + 1}
                   </div>
                 ))}
               </div>
            </div>
            <p className="mt-6 text-center text-slate-500 text-sm">Real-time GPS-based ranking nodes across your target service area.</p>
          </div>
        )}

        {activeFeature === 'review-auto' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 animate-slide-up">
            <h3 className="text-2xl font-bold text-white mb-6">Review Auto-Pilot</h3>
            <div className="space-y-6">
              <div className="bg-slate-950 p-6 rounded-xl border-l-4 border-emerald-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">New Review: ⭐⭐⭐⭐⭐</span>
                  <span className="text-[10px] text-slate-500">2 minutes ago</span>
                </div>
                <p className="text-sm text-slate-400 italic">"The team was incredibly professional and finished the roof in record time. Highly recommend!"</p>
                <div className="mt-4 pt-4 border-t border-slate-800">
                   <div className="text-[10px] text-emerald-400 font-bold uppercase mb-1">AI Response Sent</div>
                   <p className="text-xs text-slate-300">"Thank you for the kind words! We take pride in our rapid roofing services in Dallas. Glad we could help with your home project!"</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Placeholder for other features to keep the UX consistent */}
        {(activeFeature && !['listing-mgmt', 'post-gen', 'heatmaps', 'review-auto'].includes(activeFeature)) && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 animate-slide-up text-center">
            <h3 className="text-2xl font-bold text-white mb-4 italic uppercase">Feature Insight Loading</h3>
            <p className="text-slate-400">Detailed analytics and management module for this feature is available in the full platform.</p>
          </div>
        )}
      </div>

      {/* 4. The Actual Demo Section */}
      <section id="demo-frame" className="py-24 px-6 bg-slate-950 border-t border-slate-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-block px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold rounded-full mb-4">
              LIVE INSTANCE
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Experience the Software</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              This is a live instance of our GBP Optimization engine. Explore the dashboard, check the analytics, and see how our AI manages local footprints in real-time.
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
              <iframe
                src="https://gbp.cortxai.us"
                title="GBP Optimization Demo"
                className="w-full h-[800px] border-0"
                allow="fullscreen"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 Heavy Bottom Funnel CTA */}
      <section className="py-24 px-6 bg-emerald-900/10 border-t border-emerald-900/30 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Your Competitors Are Optimizing Daily.</h2>
          <p className="text-xl text-emerald-100/80 mb-10">Stop losing high-intent traffic to other businesses in your area. Let AI automate your growth and secure the #1 Map Pack spot.</p>
          <a href="https://gbp.cortxai.us/register" target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xl font-extrabold px-12 py-5 rounded-full shadow-[0_0_40px_-10px_rgba(16,185,129,0.8)] transition-all transform hover:scale-105">
            Start Optimizing My Profile
          </a>
          <p className="mt-6 text-sm text-emerald-500/60 font-semibold uppercase tracking-widest">Connect Your GBP Instantly</p>
        </div>
      </section>

      {/* 5. Legal & Footer Compliance Section */}
      <section className="py-16 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-md">
              <div className="text-xl font-bold text-white mb-4 tracking-tighter italic">GBP.CORTXAI.US</div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Our core AI tool is built on secure, US-based infrastructure. We specialize in automating local presence for high-growth enterprises and multi-location franchises.
              </p>
              <div className="flex flex-wrap gap-6">
                <a href="https://gbp.cortxai.us/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors text-xs font-semibold">Privacy Policy</a>
                <a href="https://gbp.cortxai.us/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors text-xs font-semibold">Terms of Service</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-6">
              <div>
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">US Support</h5>
                <p className="text-slate-500 text-sm">Miami, Florida HQ</p>
                <p className="text-slate-500 text-sm mt-1">Mon - Fri: 9AM - 6PM EST</p>
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">Contact</h5>
                <p className="text-slate-500 text-sm mt-1">support@cortxai.us</p>
                <p className="text-slate-500 text-sm mt-1">321-534-0423</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-900 text-center text-slate-600 text-[10px] tracking-wide">
            © 2026 CORTX AI. ALL RIGHTS RESERVED. GOOGLE BUSINESS PROFILE IS A REGISTERED TRADEMARK OF GOOGLE LLC.
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveDemo;
