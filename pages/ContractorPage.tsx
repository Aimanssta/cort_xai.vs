import React from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, Phone, CheckCircle, ArrowRight, Zap, MapPin } from 'lucide-react';
import SEO from '../components/SEO';

export interface ContractorConfig {
  trade: string;
  headline: string;
  subheadline: string;
  heroKeyword: string;
  accentColor: string;
  accentBg: string;
  painPoint: string;
  benefits: string[];
  keywords: string[];
  testimonial: { quote: string; name: string; title: string; location: string; result: string };
  stats: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
}

const ContractorPage: React.FC<{ config: ContractorConfig }> = ({ config: c }) => {
  return (
    <>
      <SEO
        title={`${c.trade} Marketing & Local SEO | Get More ${c.trade} Leads | GBP Cortx`}
        description={`Stop paying for shared leads. GBP Cortx helps ${c.trade.toLowerCase()} contractors rank #1 on Google Maps and get more inbound calls. No contracts. Setup in 24 hours.`}
        keywords={c.keywords.join(', ') + ', google business profile management for contractors, local SEO for contractors, contractor marketing agency'}
      />
      <div className="bg-slate-950 pt-10">

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-800/60">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${c.accentBg} ${c.accentColor}`}>{c.trade} Specialist</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold"><CheckCircle className="h-3 w-3 text-emerald-400" /> No Contracts</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">{c.headline}</h1>
                <p className="text-lg text-slate-400 mb-8 leading-relaxed">{c.subheadline}</p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <a href="https://gbp.cortxai.us/register" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-8 py-4 rounded-xl shadow-[0_0_30px_-8px_rgba(16,185,129,0.6)] transition-all hover:scale-105 text-base">
                    Get Free {c.trade} SEO Audit <ArrowRight className="h-5 w-5" />
                  </a>
                  <Link to="/live-demo" className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-emerald-500/50 text-white px-8 py-4 rounded-xl transition-all text-base font-semibold">
                    See Live Demo
                  </Link>
                </div>
                <p className="text-slate-600 text-xs">✓ Setup in 24 hours &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ Results in 30–60 days</p>
              </div>

              {/* Mock Map Pack */}
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/5 blur-[80px] rounded-full" />
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
                  <div className="bg-slate-100 px-4 py-2 flex items-center gap-2 border-b border-slate-200">
                    <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"/><div className="w-3 h-3 rounded-full bg-yellow-400"/><div className="w-3 h-3 rounded-full bg-green-400"/></div>
                    <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-slate-500 font-mono">Google — {c.heroKeyword}</div>
                  </div>
                  <div className="p-4 bg-slate-50 space-y-2">
                    <div className="text-xs text-slate-500 mb-3 font-medium">Google Maps · Top 3 Results</div>
                    {[
                      { name: `Your ${c.trade} Co.`, rating: '4.9', reviews: '127', top: true },
                      { name: 'Competitor A', rating: '4.2', reviews: '43', top: false },
                      { name: 'Competitor B', rating: '3.8', reviews: '19', top: false },
                    ].map((r, i) => (
                      <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${r.top ? 'bg-emerald-50 border border-emerald-200' : 'bg-white border border-slate-100'}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white shrink-0 ${r.top ? 'bg-emerald-500' : 'bg-slate-300'}`}>{i + 1}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-slate-800 flex items-center gap-2 flex-wrap">{r.name}
                            {r.top && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">GBP CORTX</span>}
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            {[...Array(5)].map((_, s) => <Star key={s} className={`h-3 w-3 ${s < Math.floor(Number(r.rating)) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />)}
                            <span className="text-xs text-slate-500">{r.rating} ({r.reviews})</span>
                          </div>
                        </div>
                        {r.top && <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0"><Phone className="h-3 w-3" /> Call</div>}
                      </div>
                    ))}
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-slate-900 border border-slate-700 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <div><div className="text-emerald-400 font-extrabold text-sm">#1 Achieved</div><div className="text-slate-500 text-[10px]">60 days avg.</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 py-16 border-b border-slate-800">
            {c.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{s.value}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Before / After */}
          <div className="py-20 border-b border-slate-800">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Problem Most {c.trade} Companies Have</h2>
              <p className="text-slate-400 text-lg leading-relaxed">{c.painPoint}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-8">
                <div className="text-red-400 font-bold text-xs uppercase tracking-widest mb-4">Without GBP Cortx</div>
                <ul className="space-y-3">
                  {['Buried on page 2+ of Google Maps', 'Competitors capture all inbound calls', 'Paying $2k–$5k/month for shared lead lists', 'Reviews go unanswered', 'Inconsistent info across the web'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 text-sm"><span className="text-red-500 font-bold">✕</span>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-8">
                <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-4">With GBP Cortx</div>
                <ul className="space-y-3">
                  {c.benefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm"><CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="py-20 border-b border-slate-800">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">How It Works for {c.trade} Contractors</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Zap, step: '01', title: 'Connect GBP', desc: 'Link your Google Business Profile in 2 minutes.' },
                { icon: MapPin, step: '02', title: 'AI Analysis', desc: 'We scan competitors and find ranking gaps in your area.' },
                { icon: TrendingUp, step: '03', title: 'Auto-Optimize', desc: 'Posts, reviews, and citations updated automatically 24/7.' },
                { icon: Phone, step: '04', title: 'Calls Arrive', desc: 'Rank #1 in Maps and watch inbound calls replace paid leads.' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-colors">
                  <div className="text-4xl font-black text-slate-800 mb-3">{item.step}</div>
                  <div className="h-12 w-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4"><item.icon className="h-6 w-6 text-emerald-400" /></div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="py-20 border-b border-slate-800">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">What {c.trade} Contractors Are Saying</h2>
            <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-10 hover:border-emerald-500/30 transition-colors">
              <div className="flex gap-1 mb-6">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}</div>
              <blockquote className="text-slate-200 text-lg italic leading-relaxed mb-8">"{c.testimonial.quote}"</blockquote>
              <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                <div>
                  <p className="text-white font-bold">{c.testimonial.name}</p>
                  <p className="text-slate-500 text-sm">{c.testimonial.title}</p>
                  <p className="text-slate-600 text-xs">{c.testimonial.location}</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 px-5 py-3 rounded-xl">
                  <p className="text-emerald-400 font-extrabold">{c.testimonial.result}</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="py-20 border-b border-slate-800">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Common Questions from {c.trade} Contractors</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {c.faqs.map((faq, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/20 transition-colors">
                  <h3 className="text-white font-bold mb-3">{faq.q}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="py-24 text-center">
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute inset-0 bg-emerald-500/10 blur-[60px] rounded-full" />
              <div className="relative bg-slate-900/80 border border-emerald-900/50 rounded-3xl p-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Dominate {c.trade} Searches in Your City?</h2>
                <p className="text-slate-400 text-lg mb-8">No contract. Cancel anytime. Results in 30–60 days.</p>
                <a href="https://gbp.cortxai.us/register" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-12 py-5 rounded-full shadow-[0_0_40px_-10px_rgba(16,185,129,0.7)] transition-all hover:scale-105 text-lg">
                  Start My Free {c.trade} SEO Audit <ArrowRight className="h-5 w-5" />
                </a>
                <p className="mt-4 text-slate-600 text-sm">Setup in 24 hours · No contract required</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ContractorPage;
