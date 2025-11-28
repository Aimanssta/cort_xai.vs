import React from 'react';
import { Bot, MessageSquare, Clock, Users, CheckCircle, Database, Brain, RefreshCw, Shield, Lock, Server, Building, Briefcase, Truck, Home } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const SalesAI: React.FC = () => {
  return (
    <>
      <SEO 
        title="AI Sales Agents & Automation USA"
        description="Empower your US sales team with AI agents that work 24/7. Automate outreach, qualification, and booking. Perfect for SaaS, Real Estate, and Finance."
      />

      <div className="bg-slate-950 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Best Sales Rep <span className="text-cort-500">Never Sleeps</span>
            </h1>
            <p className="text-xl text-slate-400">
              Cort X AI agents handle the top-of-funnel grind so your human experts can focus on closing. 
              Seamless integration with HubSpot, Salesforce, and Pipedrive.
            </p>
          </div>

          {/* Key Feature Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 md:order-1">
              <div className="glass-card p-2 rounded-xl border border-slate-800">
                 <img src="https://picsum.photos/seed/sales/800/600" alt="AI Conversation Interface" className="rounded-lg w-full" />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-8">
              <div className="flex gap-4">
                <div className="bg-cort-900/50 p-3 rounded-lg h-fit">
                  <Bot className="h-6 w-6 text-cort-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Autonomous SDRs</h3>
                  <p className="text-slate-400">
                    Our AI agents don't just send emails. They understand context, reply to objections, and nurture prospects over weeks via Email, SMS, and LinkedIn until they are ready to buy.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-cort-900/50 p-3 rounded-lg h-fit">
                  <Clock className="h-6 w-6 text-cort-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Sub-Minute Response Time</h3>
                  <p className="text-slate-400">
                    Lead decay is real. Cort X AI contacts web leads within 30 seconds of submission, increasing conversion rates by up to 391%.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-cort-900/50 p-3 rounded-lg h-fit">
                  <MessageSquare className="h-6 w-6 text-cort-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Hyper-Personalization</h3>
                  <p className="text-slate-400">
                    Agents research prospects in real-time, referencing recent company news, hiring trends, and tech stack data to craft messages that feel human.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Industries Section for SEO */}
          <div className="mb-24">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Industries We Power</h2>
                <p className="text-slate-400">Our AI models are fine-tuned for specific US industry verticals.</p>
             </div>
             <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cort-500/50 transition-colors">
                   <Building className="h-8 w-8 text-blue-400 mb-4" />
                   <h4 className="text-lg font-bold text-white mb-2">SaaS & Technology</h4>
                   <p className="text-sm text-slate-400">Automated demos, free-trial conversion, and enterprise outreach.</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cort-500/50 transition-colors">
                   <Home className="h-8 w-8 text-emerald-400 mb-4" />
                   <h4 className="text-lg font-bold text-white mb-2">Real Estate</h4>
                   <p className="text-sm text-slate-400">Buyer qualification, open house follow-ups, and seller lead nurturing.</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cort-500/50 transition-colors">
                   <Briefcase className="h-8 w-8 text-purple-400 mb-4" />
                   <h4 className="text-lg font-bold text-white mb-2">Financial Services</h4>
                   <p className="text-sm text-slate-400">Secure appointment setting for wealth advisors and insurance brokers.</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cort-500/50 transition-colors">
                   <Truck className="h-8 w-8 text-orange-400 mb-4" />
                   <h4 className="text-lg font-bold text-white mb-2">Logistics & Supply Chain</h4>
                   <p className="text-sm text-slate-400">Freight broker outreach and capacity planning coordination.</p>
                </div>
             </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12 mb-20 border border-slate-800">
            <h2 className="text-3xl font-bold text-white text-center mb-10">The AI Advantage</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-slate-300">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="pb-4 font-semibold">Feature</th>
                    <th className="pb-4 font-semibold text-slate-500">Traditional SDR</th>
                    <th className="pb-4 font-semibold text-cort-400">Cort X AI Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    { feature: 'Availability', trad: '8 hours/day', ai: '24/7/365' },
                    { feature: 'Concurrent Conversations', trad: '5-10', ai: 'Unlimited' },
                    { feature: 'Training Time', trad: '3 Months', ai: 'Instant' },
                    { feature: 'Consistency', trad: 'Variable', ai: '100% on Script' },
                    { feature: 'Cost per Contact', trad: '$5 - $10', ai: '< $0.10' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 font-medium text-white">{row.feature}</td>
                      <td className="py-4 text-slate-500">{row.trad}</td>
                      <td className="py-4 text-cort-300 font-semibold">{row.ai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Testimonial / Social Proof */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <div className="glass-card p-6 rounded-xl relative">
              <div className="absolute -top-4 -left-4 bg-cort-600 rounded-full p-2">
                <Users className="h-5 w-5 text-white" />
              </div>
              <p className="text-slate-300 italic mb-4">"We replaced our entire outbound Tier 1 layer with Cort X. The calendar booking rate doubled in the first month."</p>
              <div className="text-sm font-semibold text-white">VP of Sales, TechFlow USA</div>
            </div>
            <div className="glass-card p-6 rounded-xl relative">
              <div className="absolute -top-4 -left-4 bg-cort-600 rounded-full p-2">
                <Users className="h-5 w-5 text-white" />
              </div>
              <p className="text-slate-300 italic mb-4">"The AI actually sounds like us. It handles objections better than our junior reps."</p>
              <div className="text-sm font-semibold text-white">Director, Austin Realty Group</div>
            </div>
             <div className="glass-card p-6 rounded-xl relative">
              <div className="absolute -top-4 -left-4 bg-cort-600 rounded-full p-2">
                <Users className="h-5 w-5 text-white" />
              </div>
              <p className="text-slate-300 italic mb-4">"Setup was seamless. We connected it to HubSpot and leads started flowing immediately."</p>
              <div className="text-sm font-semibold text-white">Ops Manager, Denver Logistics</div>
            </div>
          </div>

          {/* Training & Security Section */}
          <div className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                From "Blank Slate" to Top Performer in 72 Hours
              </h2>
              <p className="text-slate-400">
                Our agents don't guess. They are rigorously trained on your specific company data, sales methodology, and brand voice before they send a single message.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Step 1 */}
              <div className="relative p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
                <div className="absolute -top-6 left-6 bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-lg">
                  <span className="text-2xl font-bold text-white">01</span>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Database className="h-5 w-5 text-cort-400" /> Knowledge Ingestion
                  </h3>
                  <p className="text-sm text-slate-400">
                    We upload your sales playbooks, past call recordings, website content, and PDF assets. The AI creates a semantic map of your product and value propositions.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
                <div className="absolute -top-6 left-6 bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-lg">
                  <span className="text-2xl font-bold text-white">02</span>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-cort-400" /> Roleplay & Simulation
                  </h3>
                  <p className="text-sm text-slate-400">
                    The agent runs thousands of simulated conversations against "challenger" bots to test objection handling, tone consistency, and compliance with your rules.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
                <div className="absolute -top-6 left-6 bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-lg">
                  <span className="text-2xl font-bold text-white">03</span>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-cort-400" /> Active Calibration
                  </h3>
                  <p className="text-sm text-slate-400">
                    Once live, the agent self-corrects based on positive/negative outcomes. Human managers can also "whisper" corrections that the agent instantly memorizes.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Subsection */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
               
               <div className="flex-shrink-0 bg-slate-800 p-4 rounded-full border border-slate-700">
                  <Shield className="h-10 w-10 text-emerald-400" />
               </div>
               
               <div className="flex-1 relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-3">Enterprise-Grade Data Security</h3>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    Your proprietary data is never used to train public models. We deploy isolated instances for every client, ensuring your sales secrets remain yours. All data is encrypted at rest and in transit.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                      <CheckCircle className="h-3 w-3" /> SOC 2 Type II
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                      <Lock className="h-3 w-3" /> AES-256 Encryption
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                      <Server className="h-3 w-3" /> US-Based Hosting
                    </span>
                  </div>
               </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stop Leaving Money on the Table</h3>
            <div className="flex justify-center gap-4">
              <Button to="/contact" variant="primary">Hire Your AI Agent</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesAI;