import React from 'react';
import { Database, Filter, Layers, Download, Check, Play, TrendingUp, Users, DollarSign, FileCheck, Smartphone, Code } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const LeadGen: React.FC = () => {
  return (
    <>
      <SEO 
        title="Custom AI Lead Generation Tools USA"
        description="Proprietary lead scraping, enrichment, and nurturing tools compliant with US laws. High-quality data for B2B and B2C markets."
      />

      <div className="bg-slate-950 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Precision Lead Gen. <br />
              <span className="gradient-text">Zero Waste.</span>
            </h1>
            <p className="text-xl text-slate-400">
              Generic lists are dead. Cort X AI builds custom scraping and enrichment pipelines tailored to your specific Ideal Customer Profile (ICP).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Tool 1 */}
            <div className="glass-card p-8 rounded-2xl border-t-4 border-cort-500 hover:-translate-y-2 transition-transform duration-300">
              <Database className="h-10 w-10 text-cort-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Deep Data Scraping</h3>
              <p className="text-slate-400 mb-4">
                We go beyond LinkedIn. Our custom scrapers access industry-specific directories, permit filings, and local databases to find leads your competitors miss.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Verified Emails & Direct Dials</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Technology Stack Detection</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Hiring Signal Triggers</li>
              </ul>
            </div>

            {/* Tool 2 */}
            <div className="glass-card p-8 rounded-2xl border-t-4 border-purple-500 hover:-translate-y-2 transition-transform duration-300">
              <Filter className="h-10 w-10 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">AI Intent Scoring</h3>
              <p className="text-slate-400 mb-4">
                Stop calling cold leads. Our AI analyzes behavioral data to score leads based on their likelihood to buy <i>right now</i>.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Website Visitor Identification</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Content Engagement Tracking</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Lookalike Modeling</li>
              </ul>
            </div>

            {/* Tool 3 */}
            <div className="glass-card p-8 rounded-2xl border-t-4 border-pink-500 hover:-translate-y-2 transition-transform duration-300">
              <Layers className="h-10 w-10 text-pink-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Automated Nurture</h3>
              <p className="text-slate-400 mb-4">
                Multi-channel sequences that adapt based on prospect behavior. If they open an email but don't click, the AI sends a specific SMS follow-up.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Dynamic Content Generation</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> A/B Testing on Autopilot</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Cross-Channel Sync</li>
              </ul>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Your Custom Data Pipeline</h2>
            <div className="relative">
              {/* Connector Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 hidden md:block"></div>
              
              <div className="grid md:grid-cols-4 gap-6 text-center">
                {[
                  { step: '01', title: 'Define ICP', desc: 'We map your perfect customer parameters.' },
                  { step: '02', title: 'Scrape & Verify', desc: 'AI gathers and cleans contact data.' },
                  { step: '03', title: 'Enrich', desc: 'Add financial, tech, and social data points.' },
                  { step: '04', title: 'Deliver', desc: 'Sync directly to your CRM via API.' },
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

          {/* Data Quality & Compliance Section */}
          <div className="mb-24 bg-slate-900/30 border border-slate-800 rounded-2xl p-8 md:p-10">
             <div className="grid md:grid-cols-2 gap-12">
                <div>
                   <h3 className="text-2xl font-bold text-white mb-4">Data Compliance & Ethics</h3>
                   <p className="text-slate-400 mb-6">
                      In the US regulatory environment, data safety is paramount. Cort X AI adheres to strict compliance standards to ensure your outreach is safe, legal, and effective.
                   </p>
                   <div className="space-y-4">
                      <div className="flex items-start gap-3">
                         <FileCheck className="h-6 w-6 text-emerald-400 mt-1" />
                         <div>
                            <h4 className="text-white font-bold">CCPA & CAN-SPAM Compliant</h4>
                            <p className="text-sm text-slate-500">All data is ethically sourced from public records and partners. Opt-out mechanisms are built-in.</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-3">
                         <Smartphone className="h-6 w-6 text-emerald-400 mt-1" />
                         <div>
                            <h4 className="text-white font-bold">DNC Registry Scrubbing</h4>
                            <p className="text-sm text-slate-500">We automatically filter out phone numbers on the Federal Do Not Call list to protect your brand.</p>
                         </div>
                      </div>
                   </div>
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-white mb-4">Enrichment Data Points</h3>
                   <p className="text-slate-400 mb-6">
                      We provide up to 50 data points per lead to power your AI personalization.
                   </p>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-950 p-3 rounded border border-slate-800 flex items-center gap-2">
                         <Check className="h-4 w-4 text-cort-400" />
                         <span className="text-sm text-white">Annual Revenue</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded border border-slate-800 flex items-center gap-2">
                         <Check className="h-4 w-4 text-cort-400" />
                         <span className="text-sm text-white">Employee Count</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded border border-slate-800 flex items-center gap-2">
                         <Code className="h-4 w-4 text-cort-400" />
                         <span className="text-sm text-white">Tech Stack Used</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded border border-slate-800 flex items-center gap-2">
                         <Check className="h-4 w-4 text-cort-400" />
                         <span className="text-sm text-white">Recent Funding</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded border border-slate-800 flex items-center gap-2">
                         <Check className="h-4 w-4 text-cort-400" />
                         <span className="text-sm text-white">Direct Mobile #</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded border border-slate-800 flex items-center gap-2">
                         <Check className="h-4 w-4 text-cort-400" />
                         <span className="text-sm text-white">LinkedIn Profile</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Case Study Section */}
          <div className="mb-24">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Video Placeholder / Visual Side */}
                <div className="relative min-h-[400px] bg-slate-800 group cursor-pointer overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/roofing/800/800" 
                    alt="White Glove Roofing Founder" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-5 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-1">Customer Story</div>
                    <h3 className="text-2xl font-bold text-white">White Glove Roofing</h3>
                    <p className="text-slate-300 text-sm mt-1">Top-Rated Contractor · USA</p>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cort-900/30 text-cort-400 text-xs font-bold mb-6 w-fit">
                    CUSTOM AI IMPLEMENTATION
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-6">
                    How we replaced "junk leads" with high-value homeowners
                  </h2>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    White Glove Roofing was struggling with generic lead aggregators that sold the same contact to 10 competitors. 
                    Cort X AI built a custom geospatial scraper that identified residential properties with older roofs in high-income zip codes, cross-referencing them with recent storm path data.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                        <span className="text-2xl font-bold text-white">3.5x</span>
                      </div>
                      <p className="text-xs text-slate-500">Increase in Quote Requests</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5 text-emerald-500" />
                        <span className="text-2xl font-bold text-white">40%</span>
                      </div>
                      <p className="text-xs text-slate-500">Reduction in Cost Per Lead</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-emerald-500" />
                        <span className="text-2xl font-bold text-white">85%</span>
                      </div>
                      <p className="text-xs text-slate-500">Lead Contact Rate</p>
                    </div>
                  </div>

                  <blockquote className="border-l-4 border-cort-500 pl-4 italic text-slate-300 text-sm">
                    "The difference was night and day. Instead of chasing ghosts, our sales team is walking into homes that actually need our help. Cort X AI built a pipeline that we own."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-purple-900/50 to-slate-900 border border-purple-500/30 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Need a Sample List?</h3>
              <p className="text-slate-300 max-w-lg">
                Get 50 free verified leads tailored to your niche to test our data quality. No credit card required.
              </p>
            </div>
            <div className="flex gap-4">
              <Button to="/contact" variant="primary">Request Data Sample <Download className="ml-2 h-4 w-4"/></Button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default LeadGen;