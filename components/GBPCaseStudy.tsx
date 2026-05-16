import React from 'react';
import { Phone, TrendingUp, Users, ArrowRight } from 'lucide-react';
import Button from './Button';

const GBPCaseStudy: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              Case Study: Elite Home Services
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Scaling Local Calls from <span className="text-emerald-500">15 to 45 Monthly</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Discover how a local service business in Dallas, TX used our core AI tool to dominate their service area and triple their inbound call volume in just 90 days.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-emerald-400" />
                  <span className="text-2xl font-bold">300%</span>
                </div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Increase in Calls</p>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  <span className="text-2xl font-bold">4.9/5</span>
                </div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Average Rating</p>
              </div>
            </div>

            <Button to="#demo-frame" variant="primary" className="group">
              See the Tool in Action <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-2xl blur opacity-25"></div>
            <div className="relative bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <h4 className="font-bold">Growth Metrics</h4>
                  <span className="text-xs text-slate-500">Last 90 Days</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-400">GMB Visibility</span>
                      <span className="text-sm text-emerald-400">+145%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full w-[85%]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-400">Review Response Rate</span>
                      <span className="text-sm text-emerald-400">100%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full w-[100%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-400">New Leads Generated</span>
                      <span className="text-sm text-emerald-400">128</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-emerald-400 h-2 rounded-full w-[70%]"></div>
                    </div>
                  </div>
                </div>

                {/* Hialeah Ranking Proof */}
                <div className="relative mt-8 group">
                  <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src="/borges-ranking.PNG" 
                    alt="Rank #1 in AI Search - Hialeah, FL" 
                    className="relative z-10 rounded-xl border border-slate-700 w-full object-cover h-48 shadow-lg" 
                  />
                  <div className="absolute top-4 -right-2 bg-white text-slate-900 px-3 py-1.5 rounded-lg shadow-xl z-20 flex items-center gap-2 font-bold text-[10px]">
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                    <span>Rank #1 in Hialeah, FL</span>
                  </div>
                </div>


                <div className="pt-4 mt-6">
                  <p className="text-sm text-slate-400 italic">
                    "Since integrating GBP.cortxai.us, we've stopped worrying about GMB updates. The AI handles our posts and reviews, and the heatmap tool showed us exactly where our competitors were weak."
                  </p>
                  <p className="mt-4 text-xs font-bold text-white">— George Borges, CEO of Borges Roofing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GBPCaseStudy;
