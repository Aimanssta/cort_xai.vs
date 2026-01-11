import React from 'react';
import { MapPin, Star, TrendingUp, Search, Globe, Cpu, Mic, Sparkles, Zap, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';
// LocalAIDashboard removed per request (audit form removed from website)
import HeroAIO from '../components/HeroAIO';
import FeaturesAIO from '../components/FeaturesAIO';
import AIInsights from '../components/AIInsights';

const LocalAIO: React.FC = () => {
  return (
    <>
      <SEO 
        title="AI Powered Local AIO Services USA"
        description="Dominate local search & AI answers. AI-optimized Business Profiles, automated review management, and local AIO signals for US markets."
      />

      <HeroAIO />

      <div className="bg-slate-950 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-400 text-xs font-bold">
                  LOCAL AIO ENGINE
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700">
                  <CheckCircle className="h-3 w-3 text-blue-400" /> Google Verified Partner
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Own Your Backyard. <br/>
                <span className="text-emerald-500">Rank #1 in AI Search.</span>
              </h1>
              <p className="text-lg text-slate-400 mb-8">
                Over 50% of discovery now happens via AI and Maps. Cort X AI ensures your business appears in the "Map Pack" and AI overviews (ChatGPT, Gemini, SGE) for every relevant search in your service area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button to="/contact" variant="primary">Get Free AIO Audit</Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/10 blur-[80px] rounded-full"></div>
              <img 
                src="/borges-ranking.PNG" 
                alt="Rank #1 in AI Search - Hialeah, FL" 
                className="relative z-10 rounded-2xl shadow-2xl border border-slate-700 w-full object-cover h-96" 
              />
              {/* Floating Badge */}
              <div className="absolute top-10 -right-4 bg-white text-slate-900 p-4 rounded-lg shadow-xl z-20 animate-bounce" style={{animationDuration: '4s'}}>
                 <div className="flex items-center gap-2 font-bold">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    <span>Rank #1 Achieved</span>
                 </div>
                 <div className="text-xs text-slate-500">Hialeah, FL Service Area</div>
              </div>
            </div>

            {/* Promotional GEO block removed as requested */}

            {/* Features (replaced by FeaturesAIO) */}
            <FeaturesAIO />

            {/* The Future of Search - Educational SEO Section */}
            <div className="mb-24">
                              <img src="/website-geo.png" alt="GEO visualization" className="w-full h-auto max-h-[420px] object-contain rounded-md shadow-inner" />
              <h2 className="text-3xl font-bold text-white mb-4">The Shift: From SEO to GEO</h2>
              <p className="text-slate-400">
                Generative Engine Optimization (GEO) is the new standard. Search is no longer about 10 blue links; it's about providing the definitive answer.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Regional GEO Signals</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  GEO prioritizes the most relevant local entity for a user's query. We focus on business profile quality, service-area content, review authority, and structured signals so your profile is the clear answer for local and AI-powered queries in each region you serve.
                </p>
                <ul className="mt-4 text-slate-400 list-disc list-inside space-y-2">
                  <li><strong>Profile Quality:</strong> Optimize Google Business Profile fields, images, and categories for high-confidence matches.</li>
                  <li><strong>Service-Area Pages:</strong> Region-specific pages that match conversational queries and local intent.</li>
                  <li><strong>Review Authority:</strong> Aggregated review signals and optimized snippets that LLMs treat as strong evidence.</li>
                </ul>
              </div>
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Search Generative Experience (SGE)</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Google's AI snapshot (SGE) reduces the importance of traditional ranking and rewards trusted entities. We build "Entity Authority" by synchronizing your profile data, publishing structured knowledge, and surfacing high-quality review evidence that SGE uses to cite your business.
                </p>
              </div>
            </div>
          </div>

          {/* Local Audit Dashboard removed per request */}

          {/* Generative Engine Optimization (GEO) - Detailed Section */}
          <div className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Generative Engine Optimization (GEO)</h2>
              <p className="text-slate-400">GEO is the practice of preparing your business to be the single authoritative answer returned by generative models and AI-powered search for queries within your service areas.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-slate-400">
                <p className="leading-relaxed">
                  Generative Engines (ChatGPT, Gemini, SGE and other LLM-powered assistants) consume signals differently than traditional search engines. Instead of ranking many pages, they synthesize an answer from the highest-authority entities and the most consistent local signals. Our GEO approach creates and reinforces those signals across the web.
                </p>

                <ul className="list-disc list-inside space-y-3">
                  <li><strong>Entity Authority:</strong> We align your business name, address, phone (NAP), and schema across 70+ trusted sources so generative models see a single, verified entity with high trust.</li>
                  <li><strong>Localized Content Signals:</strong> Region-aware landing pages, conversational FAQs, and service-area content tailored to regional intent (Northeast, Midwest, South, West).</li>
                  <li><strong>Structured Data for LLMs:</strong> We publish machine-readable data (JSON-LD, knowledge panels, review snippets) optimized for the semantic parsers used by AI snapshots.</li>
                  <li><strong>Conversational Feedback Loop:</strong> We capture user interactions and conversational signals, then feed them back to model-tuned content so answers continuously improve for your service areas.</li>
                </ul>

                <div className="mt-4">
                  <Button to="/contact" variant="primary">Request a GEO Audit</Button>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-center">
                <img src="/website-geo.png" alt="GEO visualization" className="w-full h-auto max-h-[420px] object-contain rounded-md shadow-inner" />
              </div>
            </div>
          </div>

          {/* AI Insights & Local Search Trends */}
          <AIInsights />
        </div>
      </div>
    </>
    );
  };

export default LocalAIO;