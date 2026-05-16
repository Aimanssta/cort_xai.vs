import React from 'react';
import { Database, Filter, Layers, Download, Check, Play, TrendingUp, Users, DollarSign, FileCheck, Smartphone, Code } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const LeadGen: React.FC = () => {
  return (
    <>
      <SEO 
        title="AI Lead Generation Tools & B2B Lead Database USA | Qualified Leads"
        description="Get high-quality, pre-qualified B2B and B2C leads for your business. AI-powered lead scraping, verification, and enrichment. USA-compliant and fully managed."
        keywords="lead generation software, B2B lead database, qualified leads USA, lead scraping tools, lead enrichment, contact database, LinkedIn lead generation, email list building, lead scoring"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Cort X AI Lead Generation',
          description: 'AI-powered lead generation and database management platform',
          brand: { '@type': 'Brand', name: 'Cort X AI' },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            highPrice: '5000',
            lowPrice: '500'
          }
        }}
      />

      <div className="bg-slate-950 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Inbound Lead Gen. <br />
              <span className="text-emerald-500">Powered by Local AI.</span>
            </h1>
            <p className="text-xl text-slate-400">
              Stop buying dead lead lists. GBP Cortx turns your Google Business Profile into an automated, inbound lead generation engine that captures high-intent customers right when they search.
            </p>
          </div>

          {/* Features as Blog Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              {
                title: "Review Automation Engine",
                category: "Social Proof Leads",
                date: "Feature Spotlight",
                excerpt: "Automatically request and reply to reviews using AI. A 5-star profile generates 3x more inbound calls than a 4-star profile. Turn past customers into a lead-gen magnet.",
                image: "/blog-1.png"
              },
              {
                title: "AI Local Post Generator",
                category: "Engagement Leads",
                date: "Feature Spotlight",
                excerpt: "Our AI analyzes local search trends and automatically publishes high-converting posts to your GBP, capturing searchers who are looking for immediate services.",
                image: "/blog-2.png"
              },
              {
                title: "Local Citation Syncing",
                category: "Authority Leads",
                date: "Feature Spotlight",
                excerpt: "We build and sync your business data across 50+ local directories. This massive boost in domain authority pushes your Maps ranking to #1, driving organic traffic.",
                image: "/blog-3.png"
              },
              {
                title: "Mastering Local Dominance with AI",
                category: "Local SEO",
                date: "Oct 12, 2024",
                excerpt: "Discover how AI-driven local SEO strategies are reshaping how businesses capture high-intent customers in their immediate area, making traditional keyword stuffing obsolete.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
              },
              {
                title: "How GBP Cortx Secures the #1 Map Pack Spot",
                category: "GBP Optimization",
                date: "Oct 28, 2024",
                excerpt: "Google Business Profile optimization requires continuous engagement. See how GBP Cortx uses automated review management and localized signaling to dominate Google Maps.",
                image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop"
              },
              {
                title: "The Future of Search: Local AIO",
                category: "AI Marketing",
                date: "Nov 05, 2024",
                excerpt: "With Google's SGE and ChatGPT search, being recommended by AI is critical. Learn how our AIO framework ensures your business is the primary answer for AI models.",
                image: "https://images.unsplash.com/photo-1620712949843-80d5909240bc?q=80&w=800&auto=format&fit=crop"
              }
            ].map((blog, idx) => (
              <div key={idx} className="glass-card rounded-2xl overflow-hidden group hover:border-emerald-500/50 transition-all duration-300 flex flex-col h-full bg-slate-900/40 border border-slate-800">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">{blog.category}</span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-slate-500 text-sm mb-3 font-mono">{blog.date}</p>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{blog.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{blog.excerpt}</p>
                  <a href="/live-demo" className="text-emerald-400 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                    Run a free local ranking audit <Play className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Your Inbound Traffic Pipeline</h2>
            <div className="relative">
              {/* Connector Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 hidden md:block"></div>
              
              <div className="grid md:grid-cols-4 gap-6 text-center">
                {[
                  { step: '01', title: 'Connect GBP', desc: 'Securely link your Google Business Profile.' },
                  { step: '02', title: 'AI Analysis', desc: 'We scan your local competitors and keyword gaps.' },
                  { step: '03', title: 'Auto-Optimize', desc: 'AI generates posts, replies to reviews, and syncs data.' },
                  { step: '04', title: 'Capture Calls', desc: 'Rank #1 and receive high-intent inbound calls.' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-700 p-6 rounded-xl">
                     <div className="text-4xl font-black text-slate-800 mb-4">{item.step}</div>
                     <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                     <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-emerald-900/50 to-slate-900 border border-emerald-500/30 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready to switch to Inbound Leads?</h3>
              <p className="text-slate-300 max-w-lg">
                Stop paying for shared lead lists. Secure the #1 spot in your local area and let the customers call you.
              </p>
            </div>
            <div className="flex gap-4">
              <Button to="/live-demo" variant="primary" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold border-none">Start Your Free Audit <TrendingUp className="ml-2 h-4 w-4"/></Button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default LeadGen;