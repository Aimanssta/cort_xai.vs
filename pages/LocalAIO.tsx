import React from 'react';
import { MapPin, Star, TrendingUp, Search, Globe, Cpu, Mic, Sparkles, Zap, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const LocalAIO: React.FC = () => {
  return (
    <>
      <SEO 
        title="AI Powered Local AIO Services USA"
        description="Dominate local search & AI answers. AI-optimized Business Profiles, automated review management, and local AIO signals for US markets."
      />

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
                src="https://picsum.photos/seed/map/800/600" 
                alt="Local Map Pack Ranking" 
                className="relative z-10 rounded-2xl shadow-2xl border border-slate-700" 
              />
              {/* Floating Badge */}
              <div className="absolute top-10 -right-4 bg-white text-slate-900 p-4 rounded-lg shadow-xl z-20 animate-bounce" style={{animationDuration: '4s'}}>
                 <div className="flex items-center gap-2 font-bold">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    <span>Rank #1 Achieved</span>
                 </div>
                 <div className="text-xs text-slate-500">New York, NY Service Area</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <div className="glass-card p-8 rounded-2xl group hover:border-emerald-500/50 transition-colors">
              <Globe className="h-10 w-10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">AI Profile Optimization</h3>
              <p className="text-slate-400 text-sm">
                Our AI continuously updates your Business Profiles with semantic keywords, posts, and photos to signal relevance to both Google and AI algorithms.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl group hover:border-emerald-500/50 transition-colors">
              <Star className="h-10 w-10 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">Review Intelligence</h3>
              <p className="text-slate-400 text-sm">
                Automatically request reviews via SMS. Our AI drafts context-aware responses to boost your sentiment analysis score in AI search models.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl group hover:border-emerald-500/50 transition-colors">
              <Cpu className="h-10 w-10 text-red-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">Hyper-Local AIO Signals</h3>
              <p className="text-slate-400 text-sm">
                We build thousands of consistent data points across the web to establish your brand as the authoritative entity in your region.
              </p>
            </div>
          </div>
          
          {/* The Future of Search - Educational SEO Section */}
          <div className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">The Shift: From SEO to GEO</h2>
              <p className="text-slate-400">
                Generative Engine Optimization (GEO) is the new standard. Search is no longer about 10 blue links; it's about providing the definitive answer.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <Mic className="h-6 w-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Voice & Semantic Search</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  55% of US households own a smart speaker. When someone asks, "Who is the best roof repair near me?", they get one answer, not a list. Cort X AI optimizes your digital footprint to be that one answer by structuring your data for NLP (Natural Language Processing) recognition.
                </p>
              </div>
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Search Generative Experience (SGE)</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Google's new AI snapshot pushes traditional organic results down the page. To appear in the AI snapshot, your business needs "Entity Authority." We build this by cross-referencing your business data across 70+ high-authority directories instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Success Story */}
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800">
             <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                   <h3 className="text-2xl font-bold text-white mb-4">Case Study: HVAC Service, Chicago</h3>
                   <p className="text-slate-400 mb-6">
                      Before Cort X AI, they ranked on page 2 for "AC Repair Chicago". Within 60 days of our automated local AIO implementation:
                   </p>
                   <ul className="space-y-4">
                      <li className="flex items-center gap-4">
                         <div className="bg-emerald-900/50 p-2 rounded text-emerald-400 font-bold">+210%</div>
                         <span className="text-slate-200">Increase in organic calls</span>
                      </li>
                      <li className="flex items-center gap-4">
                         <div className="bg-emerald-900/50 p-2 rounded text-emerald-400 font-bold">#1 Spot</div>
                         <span className="text-slate-200">For 15 high-value keywords</span>
                      </li>
                      <li className="flex items-center gap-4">
                         <div className="bg-emerald-900/50 p-2 rounded text-emerald-400 font-bold">4.9 Star</div>
                         <span className="text-slate-200">Average rating (up from 4.2)</span>
                      </li>
                   </ul>
                </div>
                <div className="flex-1 w-full">
                   <div className="bg-white rounded-lg p-4 shadow-inner">
                      {/* Mock Search Result */}
                      <div className="border-b border-gray-200 pb-4 mb-4">
                         <div className="flex items-center gap-2 mb-1">
                            <Search className="h-4 w-4 text-gray-400" />
                            <div className="h-4 bg-gray-200 rounded w-48"></div>
                         </div>
                      </div>
                      <div className="space-y-4">
                         {/* Map Pack Result 1 - Highlighted */}
                         <div className="bg-emerald-50 border border-emerald-200 p-3 rounded flex justify-between items-start">
                            <div>
                               <div className="h-4 bg-slate-800 rounded w-32 mb-2"></div>
                               <div className="flex gap-1 mb-2">
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                               </div>
                               <div className="h-3 bg-gray-300 rounded w-24"></div>
                            </div>
                            <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">WEBSITE</div>
                         </div>
                         <div className="p-3 rounded flex justify-between items-start opacity-50">
                            <div>
                               <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                               <div className="h-3 bg-gray-200 rounded w-20"></div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocalAIO;