import React, { useState } from 'react';
import { ArrowRight, Bot, Target, Map, BarChart3, ShieldCheck, Zap, ChevronDown, ChevronUp, Building2, Globe2, Star, Award, Sparkles, TrendingUp, Users, Phone, Mail, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800/60 group">
      <button 
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group-hover:text-cort-300 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-white">{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-cort-500" /> : <ChevronDown className="h-5 w-5 text-slate-500 group-hover:text-cort-400" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-400 leading-relaxed text-base">{answer}</p>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="AI Sales Agents & Lead Generation USA"
        description="Cort X AI automates your growth with custom sales agents, lead generation tools, and local AIO dominance. Trusted by top USA businesses."
      />

      {/* Hero Section with Tech Grid Background */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-32 md:pb-40">
        {/* Background Grid & Glows */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-slate-900 bg-[length:40px_40px] bg-grid-mask opacity-40"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cort-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-md text-cort-300 text-sm font-medium mb-10 animate-fade-in hover:border-cort-500/50 transition-colors cursor-default shadow-lg shadow-cort-900/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cort-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cort-500"></span>
            </span>
            Now serving Enterprise clients across the USA
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 animate-slide-up leading-tight">
            Turn Data Into <br/>
            <span className="gradient-text relative">
              Revenue
              <Sparkles className="absolute -top-6 -right-8 text-yellow-400 h-8 w-8 animate-float opacity-80" />
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-12 animate-slide-up leading-relaxed" style={{animationDelay: '0.1s'}}>
            Cort X AI connects your sales team, lead generation, and local market presence into one <span className="text-white font-semibold">intelligent ecosystem</span>. 
            Deploy agents that never sleep and tools that never miss a lead.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-5 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <Button to="/contact" variant="primary" className="text-lg px-10 py-4 shadow-xl shadow-cort-600/20">
              Start Your Pilot
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button to="/solutions/sales-agents" variant="outline" className="text-lg px-10 py-4 bg-slate-950/50 backdrop-blur-sm">
              View Solutions
            </Button>
          </div>

          {/* Floating Dashboard Preview */}
          <div className="mt-20 relative mx-auto max-w-5xl animate-slide-up hidden md:block perspective-1000" style={{animationDelay: '0.4s'}}>
            {/* Glow behind */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cort-600 to-purple-600 rounded-2xl blur opacity-30 animate-pulse-slow"></div>
            
            <div className="relative bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform transition-transform hover:scale-[1.005] duration-700">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
                 <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <div className="h-6 w-px bg-slate-700 mx-2"></div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                       <Bot className="h-4 w-4" />
                       <span>cortx_agent_v4.2.1 (Running)</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs text-emerald-400 font-bold tracking-wider">LIVE SYSTEM</span>
                 </div>
              </div>

              {/* Dashboard Content */}
              <div className="flex h-[450px]">
                 {/* Sidebar */}
                 <div className="w-64 bg-slate-900/30 border-r border-slate-800 p-4 flex flex-col gap-2">
                    {['Overview', 'Agent Status', 'Campaigns', 'Lead Database', 'Analytics', 'Settings'].map((item, i) => (
                       <div key={i} className={`px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors cursor-default ${i === 0 ? 'bg-cort-500/10 text-cort-400 border border-cort-500/20' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>
                          <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-cort-500' : 'bg-slate-700'}`}></div>
                          {item}
                       </div>
                    ))}
                    
                    <div className="mt-auto bg-slate-900 rounded-xl p-4 border border-slate-800">
                       <div className="text-xs text-slate-500 mb-2">Storage Used</div>
                       <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                          <div className="h-full bg-purple-500 w-[75%]"></div>
                       </div>
                       <div className="flex justify-between text-[10px] text-slate-400">
                          <span>75GB</span>
                          <span>100GB</span>
                       </div>
                    </div>
                 </div>

                 {/* Main View */}
                 <div className="flex-1 bg-slate-950 p-8 overflow-hidden relative">
                    {/* Grid background inside dashboard */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                    <div className="relative z-10 flex flex-col h-full gap-6">
                       {/* Top Metrics */}
                       <div className="grid grid-cols-3 gap-6">
                          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl backdrop-blur-sm">
                             <div className="flex justify-between items-start mb-4">
                                <div>
                                   <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total Revenue</p>
                                   <h4 className="text-2xl font-bold text-white mt-1">$142,384</h4>
                                </div>
                                <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                   <TrendingUp className="h-4 w-4 text-emerald-400" />
                                </div>
                             </div>
                             <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" /> +12.5% from last week
                             </div>
                          </div>
                          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl backdrop-blur-sm">
                             <div className="flex justify-between items-start mb-4">
                                <div>
                                   <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Active Leads</p>
                                   <h4 className="text-2xl font-bold text-white mt-1">1,249</h4>
                                </div>
                                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                   <Users className="h-4 w-4 text-blue-400" />
                                </div>
                             </div>
                             <div className="w-full bg-slate-800 h-1 rounded-full mt-2">
                                <div className="bg-blue-500 h-1 rounded-full w-[60%] animate-[width_2s_ease-in-out]"></div>
                             </div>
                          </div>
                          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl backdrop-blur-sm">
                             <div className="flex justify-between items-start mb-4">
                                <div>
                                   <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Agents Active</p>
                                   <h4 className="text-2xl font-bold text-white mt-1">12/15</h4>
                                </div>
                                <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                   <Bot className="h-4 w-4 text-purple-400" />
                                </div>
                             </div>
                             <div className="flex -space-x-2 mt-1">
                                {[1,2,3,4].map(i => (
                                   <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-white font-bold">{String.fromCharCode(64+i)}</div>
                                ))}
                             </div>
                          </div>
                       </div>

                       {/* Split View: Graph & Feed */}
                       <div className="grid grid-cols-3 gap-6 h-full min-h-0">
                          {/* Graph Area */}
                          <div className="col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col backdrop-blur-sm">
                             <div className="flex justify-between items-center mb-6">
                                <h5 className="text-sm font-bold text-slate-300">Campaign Performance</h5>
                                <div className="flex gap-3">
                                   <div className="flex items-center gap-1.5">
                                     <span className="w-2 h-2 bg-cort-500 rounded-full"></span>
                                     <span className="text-[10px] text-slate-500 font-medium">Outreach</span>
                                   </div>
                                   <div className="flex items-center gap-1.5">
                                     <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                     <span className="text-[10px] text-slate-500 font-medium">Conversion</span>
                                   </div>
                                </div>
                             </div>
                             {/* CSS Bar Chart simulation */}
                             <div className="flex-1 flex items-end justify-between gap-2 px-2 border-b border-slate-800/50 pb-1">
                                {[40, 65, 45, 70, 50, 80, 60, 85, 75, 90, 65, 95].map((h, i) => (
                                   <div key={i} className="w-full rounded-t-sm relative group h-full flex items-end">
                                      <div 
                                         className="w-full bg-cort-500/80 rounded-t-sm transition-all duration-300 group-hover:bg-cort-400 shadow-[0_0_10px_rgba(99,102,241,0.3)]" 
                                         style={{height: `${h}%`, animation: `slideUp 1s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05}s backwards`}}
                                      ></div>
                                       <div 
                                         className="absolute bottom-0 left-0 w-full bg-emerald-500/30 rounded-t-sm transition-all duration-300 border-t border-emerald-400/30" 
                                         style={{height: `${h * 0.4}%`, animation: `slideUp 1s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05 + 0.2}s backwards`}}
                                      ></div>
                                   </div>
                                ))}
                             </div>
                          </div>

                          {/* Activity Feed */}
                          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 overflow-hidden relative backdrop-blur-sm">
                             <h5 className="text-sm font-bold text-slate-300 mb-4">Live Activities</h5>
                             <div className="space-y-4">
                                {[
                                   { icon: Phone, color: 'text-blue-400', bg: 'bg-blue-500/10', text: 'Agent Sarah connected with Lead #4092', time: 'Just now' },
                                   { icon: Mail, color: 'text-purple-400', bg: 'bg-purple-500/10', text: 'Email sequence started: "Tech SaaS"', time: '2m ago' },
                                   { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', text: 'Meeting booked via Calendar', time: '14m ago' },
                                   { icon: Users, color: 'text-orange-400', bg: 'bg-orange-500/10', text: 'New lead enriched: Oracle Corp', time: '28m ago' },
                                ].map((item, i) => (
                                   <div key={i} className="flex gap-3 items-start animate-fade-in" style={{animationDelay: `${i * 0.5 + 1}s`}}>
                                      <div className={`p-1.5 rounded-md shrink-0 ${item.bg}`}>
                                         <item.icon className={`h-3 w-3 ${item.color}`} />
                                      </div>
                                      <div>
                                         <p className="text-xs text-slate-300 font-medium leading-tight">{item.text}</p>
                                         <p className="text-[10px] text-slate-600 mt-1 font-mono">{item.time}</p>
                                      </div>
                                   </div>
                                ))}
                             </div>
                             {/* Gradient fade at bottom */}
                             <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pointer-events-none"></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-800 bg-slate-950/80 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-800/50">
            {[
              { label: 'Revenue Generated', value: '$120M+', color: 'text-emerald-400' },
              { label: 'Leads Processed', value: '2.5M+', color: 'text-blue-400' },
              { label: 'Hours Saved', value: '850k+', color: 'text-cort-400' },
              { label: 'Client Retention', value: '98%', color: 'text-purple-400' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center px-4">
                <div className={`text-3xl md:text-5xl font-bold ${stat.color} mb-2 tracking-tight`}>{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified & Trusted Strip */}
      <section className="py-12 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-slate-600 uppercase tracking-[0.2em] mb-10">
            Verified Platform & Industry Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            
            {/* Google Partner */}
            <div className="flex items-center gap-2 group cursor-default">
              <span className="text-2xl font-bold text-white group-hover:text-[#4285F4] transition-colors">Google</span>
              <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 group-hover:border-[#4285F4]/50 group-hover:text-white transition-colors tracking-wide">PARTNER</span>
            </div>

            {/* Trustpilot */}
            <div className="flex items-center gap-3 group cursor-default">
              <Star className="h-8 w-8 text-emerald-500 fill-emerald-500" />
              <div>
                <span className="block text-lg font-bold text-white leading-none">Trustpilot</span>
              </div>
            </div>

            {/* G2 Crowd */}
            <div className="flex items-center gap-2 group cursor-default">
              <div className="h-9 w-9 bg-[#FF492C] rounded flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-red-900/20">G2</div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-tight">High Performer</span>
              </div>
            </div>

            {/* Meta Business Partner */}
            <div className="flex items-center gap-2 group cursor-default">
              <div className="text-2xl font-bold text-white group-hover:text-[#0668E1] transition-colors">∞ Meta</div>
              <span className="text-[10px] font-semibold text-slate-400 border-l border-slate-700 pl-2 ml-1">Business Partner</span>
            </div>

            {/* SOC 2 */}
            <div className="flex items-center gap-2 group cursor-default">
              <div className="p-1 bg-slate-800 rounded-full border border-slate-700">
                <ShieldCheck className="h-6 w-6 text-white group-hover:text-blue-400 transition-colors" />
              </div>
              <div className="flex flex-col">
                 <span className="text-sm font-bold text-white">SOC 2</span>
                 <span className="text-[10px] text-slate-400">Type II</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="py-32 bg-slate-950 relative">
         {/* Ambient background elements */}
         <div className="absolute top-1/2 left-0 w-96 h-96 bg-cort-900/10 rounded-full blur-[128px]"></div>
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Three Pillars of <br/> Modern Growth</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              We don't just provide software; we provide an ecosystem. Our platform is built on three core pillars designed to dominate the USA market.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="glass-card rounded-2xl p-10 group relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-cort-500/10 rounded-full blur-2xl group-hover:bg-cort-500/20 transition-colors"></div>
              
              <div className="h-14 w-14 bg-slate-900/50 border border-slate-700/50 rounded-xl flex items-center justify-center mb-8 group-hover:border-cort-500/50 group-hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.3)] transition-all duration-500">
                <Bot className="h-7 w-7 text-cort-400 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 ease-out" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Sales Team & <br/> AI Agents</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Deploy 24/7 SDR agents that engage, qualify, and book meetings. Reduce overhead while increasing touchpoints by 1000%.
              </p>
              <Button to="/solutions/sales-agents" variant="outline" className="w-full group-hover:bg-cort-600 group-hover:border-cort-600 group-hover:text-white transition-all duration-300">Learn More</Button>
            </div>

            {/* Pillar 2 */}
            <div className="glass-card rounded-2xl p-10 group relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors"></div>

              <div className="h-14 w-14 bg-slate-900/50 border border-slate-700/50 rounded-xl flex items-center justify-center mb-8 group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] transition-all duration-500">
                <Target className="h-7 w-7 text-purple-400 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 ease-out" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Custom AI <br/> Lead Gen</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Proprietary tools tailored to your niche. We scrape, enrich, and nurture leads automatically, feeding your pipeline high-intent prospects.
              </p>
              <Button to="/solutions/lead-gen" variant="outline" className="w-full group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:text-white transition-all duration-300">Explore Tools</Button>
            </div>

            {/* Pillar 3 */}
            <div className="glass-card rounded-2xl p-10 group relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>

              <div className="h-14 w-14 bg-slate-900/50 border border-slate-700/50 rounded-xl flex items-center justify-center mb-8 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] transition-all duration-500">
                <Map className="h-7 w-7 text-emerald-400 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Local AIO <br/> Dominance</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Own your backyard. Our AI optimizes your presence for AI Search Engines (ChatGPT, Gemini) and Google Maps to rank you #1.
              </p>
              <Button to="/solutions/local-aio" variant="outline" className="w-full group-hover:bg-emerald-600 group-hover:border-emerald-600 group-hover:text-white transition-all duration-300">Rank Higher</Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Block: Why US Market Needs AI */}
      <section className="py-24 border-t border-slate-800/50 bg-slate-950 relative">
        <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-slate-900 to-transparent opacity-30 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-cort-500 font-bold uppercase tracking-wide mb-3 text-sm">American Business Innovation</h3>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Top US Companies are Switching to Cort X AI</h2>
              </div>
              <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
                <p>
                  The United States market is shifting rapidly. Traditional outbound strategies—cold calling from purchased lists, generic email blasts, and manual CRM entry—are yielding diminishing returns. In a landscape saturated with noise, <span className="text-white">personalization at scale</span> is the only way to break through.
                </p>
                <p>
                  Cort X AI was built specifically for the nuances of the American B2B and B2C sectors. We understand that compliance (TCPA, CAN-SPAM) is just as critical as conversion. Our systems are designed to be aggressive in growth but conservative in risk, ensuring your brand reputation remains pristine.
                </p>
                <p>
                  From Wall Street fintech firms to Main Street service providers, our custom AI architectures allow businesses to perform the work of a 50-person sales team with just 5 people and our software.
                </p>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="glass-card p-8 rounded-2xl flex gap-6 hover:border-blue-500/30 transition-all">
                <div className="bg-blue-500/10 p-4 rounded-xl h-fit">
                   <Building2 className="h-8 w-8 text-blue-400 flex-shrink-0" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">Enterprise Scalability</h4>
                  <p className="text-slate-400">Whether you need to process 1,000 or 1,000,000 leads, our infrastructure scales instantly on AWS US-East servers.</p>
                </div>
              </div>
              <div className="glass-card p-8 rounded-2xl flex gap-6 hover:border-emerald-500/30 transition-all">
                <div className="bg-emerald-500/10 p-4 rounded-xl h-fit">
                   <Globe2 className="h-8 w-8 text-emerald-400 flex-shrink-0" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">Localized Intelligence</h4>
                  <p className="text-slate-400">Our AI understands US regional dialects, time zones, and cultural nuances, ensuring your outreach feels native, not robotic.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight / Why Us */}
      <section className="py-32 relative overflow-hidden bg-slate-950">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cort-500/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">Built for the Speed of the <br/> <span className="text-cort-400">USA Market</span></h2>
              <p className="text-slate-300 text-xl mb-12 leading-relaxed">
                In the competitive landscape of American business, speed wins. Cort X AI removes the friction between marketing and sales.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "Instant Scalability", desc: "Scale your outreach from 100 to 10,000 prospects per day without hiring more staff.", icon: BarChart3 },
                  { title: "Enterprise Grade Security", desc: "SOC2 compliant data handling ensures your customer data remains protected.", icon: ShieldCheck },
                  { title: "Real-Time Optimization", desc: "Our AI adjusts strategies daily based on response rates and conversion data.", icon: Zap },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg">
                        <item.icon className="h-6 w-6 text-cort-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{item.title}</h4>
                      <p className="text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative group perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-r from-cort-600 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="glass-card p-3 rounded-2xl border border-slate-700/50 shadow-2xl transform group-hover:rotate-y-2 transition-transform duration-700">
                <img 
                  src="https://picsum.photos/800/600?grayscale" 
                  alt="AI Dashboard Interface" 
                  className="rounded-xl shadow-inner border border-slate-700/50 w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
                
                {/* Floating Widget */}
                <div className="absolute -bottom-8 -left-8 bg-slate-900/95 backdrop-blur border border-slate-700 p-6 rounded-2xl shadow-2xl flex items-center gap-5 animate-float">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">Live Agent Activity</div>
                    <div className="text-base font-bold text-white mt-1">Meeting Booked: <span className="text-emerald-400">+$12,000 Deal</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-900/30 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-lg">Common questions about implementing AI in your workflow.</p>
          </div>
          
          <div className="space-y-2">
            <FAQItem 
              question="How is Cort X AI different from traditional lead generation agencies?" 
              answer="Unlike agencies that rely on manual list building and generic cold calling, Cort X AI uses proprietary algorithms to scrape, enrich, and contact leads in real-time. We don't just sell you data; we build an autonomous system that books meetings for you, reducing your cost-per-acquisition by up to 60%." 
            />
            <FAQItem 
              question="Is your system compliant with US Regulations (TCPA, CAN-SPAM)?" 
              answer="Absolutely. Our platform includes built-in compliance checks. We scrub all phone numbers against the DNC (Do Not Call) registry and ensure all email outreach includes mandatory opt-out mechanisms, keeping your business safe while you scale." 
            />
            <FAQItem 
              question="Does Cort X AI integrate with my existing CRM?" 
              answer="Yes. We offer native 2-way integration with Salesforce, HubSpot, Pipedrive, GoHighLevel, and Zoho. Our agents update lead statuses, log calls, and save conversation transcripts directly into your system of record." 
            />
            <FAQItem 
              question="What industries do you specialize in?" 
              answer="While our tools are agnostic, we have deep training models specifically for SaaS, Real Estate, Financial Services, Solar/Home Services, and Logistics. Our AI understands the specific jargon and pain points of these US markets." 
            />
            <FAQItem 
              question="What is the difference between SEO and Local AIO?" 
              answer="Traditional SEO focuses on ranking for keywords on Google Search. Local AIO (Artificial Intelligence Optimization) focuses on making your business the primary answer for AI models like ChatGPT, Gemini, and Search Generative Experience (SGE). It's the future of search visibility." 
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute inset-0 bg-slate-950"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cort-900/40 via-slate-950 to-slate-950"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-12 md:p-20 text-center border border-white/10 shadow-2xl relative overflow-hidden group">
            {/* Animated glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cort-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 relative z-10 tracking-tight">
              Ready to Scale with <br/> <span className="text-cort-400">Cort X AI?</span>
            </h2>
            <p className="text-slate-300 text-xl md:text-2xl mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
              Don't let manual processes hold you back. Join top USA companies leveraging our autonomous agents and AIO tools.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-5">
              <Button to="/contact" className="bg-white text-cort-950 hover:bg-indigo-50 px-10 py-5 text-lg font-bold shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300">
                Get Your Custom Strategy
              </Button>
              <Button to="/contact" variant="outline" className="border-slate-600 text-white hover:bg-slate-800/80 px-10 py-5 text-lg font-semibold backdrop-blur-md">
                Book a Demo
              </Button>
            </div>
            <p className="mt-8 text-sm text-slate-500 relative z-10 font-medium">
              No commitment required. See the platform in action.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;