import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Star, CheckCircle, AlertCircle, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';

const BlogGBPNotShowing: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const reasons = [
    {
      number: '01',
      title: 'Your Google Business Profile Is Incomplete',
      color: 'border-red-500',
      badge: 'Most Common',
      badgeColor: 'bg-red-500/10 text-red-400 border-red-500/30',
      body: 'Google ranks complete profiles higher. If your GBP is missing categories, business hours, photos, or a description, it tells Google you\'re not serious. Most contractors fill out less than 40% of their profile.',
      fix: 'Fill out every single field in your GBP — especially services, business description with keywords, and at least 10 high-quality photos of your work.',
    },
    {
      number: '02',
      title: 'You Have Zero (or Very Few) Google Reviews',
      color: 'border-yellow-500',
      badge: 'High Impact',
      badgeColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      body: 'Reviews are one of Google\'s top 3 local ranking factors. Businesses with 50+ reviews rank dramatically higher than those with fewer than 10. More importantly, businesses with 4.5+ stars in the top 3 get 70% more clicks.',
      fix: 'Start systematically requesting reviews from every customer via SMS after job completion. Aim for 5+ new reviews per month.',
    },
    {
      number: '03',
      title: 'Your Business NAP Is Inconsistent Across the Web',
      color: 'border-purple-500',
      badge: 'Often Overlooked',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      body: 'NAP stands for Name, Address, Phone Number. If your business is listed as "ABC Roofing" on Google, "A.B.C. Roofing LLC" on Yelp, and "ABC Roofing & Construction" on HomeAdvisor, Google sees three different businesses and can\'t determine which is authoritative.',
      fix: 'Audit your business listings across Yelp, Angi, HomeAdvisor, Bing, Apple Maps, and 50+ other directories. Make every single one 100% identical.',
    },
    {
      number: '04',
      title: 'You\'re Not Publishing Regular GBP Posts',
      color: 'border-blue-500',
      badge: 'Easy Win',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      body: 'Google treats GBP posts like activity signals. An active profile that posts weekly tells Google your business is operational and engaged. A profile that hasn\'t posted in months looks abandoned — and gets ranked accordingly.',
      fix: 'Publish at least one GBP post per week. Include your primary keywords naturally (e.g., "We just completed a full roof replacement in [City]").',
    },
    {
      number: '05',
      title: 'Your Competitors Have More Backlinks & Citations',
      color: 'border-emerald-500',
      badge: 'Competitive Factor',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      body: 'Local authority matters. If a competitor has been listed on 80+ local directories and has links from local news sites, chamber of commerce pages, and industry associations — and you have none — Google defaults to them as the authoritative local business.',
      fix: 'Build citations on every relevant directory. Join your local chamber of commerce. Get listed on industry-specific sites like NRCA (roofing), ACCA (HVAC), etc.',
    },
    {
      number: '06',
      title: 'Your Service Area Is Set Up Incorrectly',
      color: 'border-orange-500',
      badge: 'Technical Issue',
      badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      body: 'If you serve a 30-mile radius but only have one city listed in your GBP service area, you\'re invisible in every other city. Worse, if you accidentally set your service area too large, Google may penalize you for geographic irrelevance.',
      fix: 'In your GBP settings, add every city and zip code you actively serve. Be specific — add 10–20 individual service areas rather than just your main city.',
    },
  ];

  const faqs = [
    { q: 'How long does it take to show up on Google Maps after optimizing?', a: 'Most businesses see initial ranking improvements within 2–4 weeks. Reaching the top 3 "Map Pack" positions typically takes 45–90 days of consistent optimization, depending on how competitive your local market is.' },
    { q: 'Does having a website affect my Google Maps ranking?', a: 'Yes, but less than most people think. Your GBP profile is the primary driver of Maps rankings. However, having a well-optimized website with consistent NAP information and local keywords does contribute to your overall local authority.' },
    { q: 'Why did I suddenly drop in Google Maps rankings?', a: 'Common causes include: a competitor increased their review count, Google updated its local algorithm, your GBP was flagged for a policy issue, or a competitor reported your listing. Check your GBP dashboard for any notifications first.' },
    { q: 'Is Google Business Profile free?', a: 'Yes, GBP is completely free to create and maintain. The investment comes in the time and expertise required to optimize it properly — or a tool like GBP Cortx that automates the entire process.' },
  ];

  return (
    <>
      <SEO
        title="Why Is My Business Not Showing on Google Maps? 6 Reasons + Fixes (2024)"
        description="Your local business not appearing on Google Maps? Here are the 6 most common reasons contractors and local businesses are invisible on Google Maps — and exactly how to fix each one."
        keywords="why is my business not showing on google maps, my google business profile not appearing, how to fix google maps ranking, google maps not showing my business, how to rank higher on google maps for contractors, GBP optimization for contractors, local SEO help for small business"
      />

      <div className="bg-slate-950 pt-10 min-h-screen">

        {/* Article Header */}
        <header className="border-b border-slate-800 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">Local SEO</span>
              <span className="bg-slate-800 text-slate-400 text-xs px-3 py-1 rounded-full flex items-center gap-1.5"><Clock className="h-3 w-3" /> 8 min read</span>
              <span className="text-slate-600 text-xs">May 17, 2024</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Why Is My Business Not Showing on Google Maps? (6 Reasons + How to Fix Each One)
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-8">
              You've claimed your Google Business Profile. You're doing good work. But when you search for your own business on Google Maps, you're nowhere to be found — while your competitors are right there at the top. Here's exactly why, and what to do about it.
            </p>
            {/* Author */}
            <div className="flex items-center gap-4 py-6 border-t border-slate-800">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-lg">C</div>
              <div>
                <p className="text-white font-bold text-sm">Cort X AI Team</p>
                <p className="text-slate-500 text-xs">GBP Optimization Specialists · cortxai.us</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Table of Contents */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-12">
            <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-4">In This Article</h2>
            <ol className="space-y-2">
              {reasons.map((r, i) => (
                <li key={i}>
                  <a href={`#reason-${i + 1}`} className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors text-sm group">
                    <span className="text-slate-700 font-mono text-xs w-5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className="group-hover:underline">{r.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Intro */}
          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-slate-300 text-lg leading-relaxed">
              The Google Maps "Map Pack" — those top 3 local results that appear with a map — captures <strong className="text-white">76% of all local search clicks</strong>. If you're not there, you're essentially invisible to customers searching right now.
            </p>
            <div className="bg-slate-800/50 border-l-4 border-emerald-500 rounded-r-xl p-5 my-8">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-slate-300 text-sm leading-relaxed m-0">
                  <strong className="text-white">Key stat:</strong> Businesses in the Google Maps top 3 receive <strong className="text-emerald-400">5x more calls</strong> than those on page 2 of local results. For a roofing company averaging $8,000 per job, being at #1 vs. #5 can mean $50,000–$200,000 in additional annual revenue.
                </p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              We've analyzed thousands of local contractor profiles over the past 3 years. Here are the 6 most common reasons businesses are invisible on Google Maps — and the exact fixes for each.
            </p>
          </div>

          {/* Reasons */}
          <div className="space-y-10 mb-16">
            {reasons.map((r, i) => (
              <div key={i} id={`reason-${i + 1}`} className={`bg-slate-900/60 border-l-4 ${r.color} rounded-r-2xl border border-slate-800 border-l-0 p-8`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl font-black text-slate-800 leading-none shrink-0">{r.number}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h2 className="text-xl md:text-2xl font-bold text-white">{r.title}</h2>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${r.badgeColor}`}>{r.badge}</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6">{r.body}</p>
                <div className="bg-slate-950/60 border border-slate-700 rounded-xl p-5">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-emerald-400 font-bold text-sm">The Fix: </span>
                      <span className="text-slate-300 text-sm leading-relaxed">{r.fix}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How Long It Takes */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">How Long Does It Take to Fix These Issues?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-slate-700"><th className="text-left py-3 px-4 text-slate-400 font-semibold">Fix</th><th className="text-center py-3 px-4 text-slate-400 font-semibold">Time to Implement</th><th className="text-center py-3 px-4 text-slate-400 font-semibold">Time to See Results</th></tr></thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    ['Complete your GBP profile', '30 minutes', '1–2 weeks'],
                    ['Get 10+ new reviews', '2–4 weeks', '2–4 weeks'],
                    ['Fix NAP consistency', '1–2 days', '4–8 weeks'],
                    ['Publish weekly GBP posts', 'Ongoing', '3–6 weeks'],
                    ['Build 50+ citations', '2–4 weeks', '6–10 weeks'],
                    ['Fix service area settings', '15 minutes', '1–3 weeks'],
                  ].map(([fix, implement, results], i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 text-slate-300">{fix}</td>
                      <td className="py-3 px-4 text-center text-slate-400">{implement}</td>
                      <td className="py-3 px-4 text-center"><span className="text-emerald-400 font-medium">{results}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Local Map Pack Visual */}
          <div className="mb-12">
            <div className="flex items-start gap-3 bg-amber-950/20 border border-amber-900/40 rounded-2xl p-6">
              <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-amber-300 font-bold mb-1">The Hard Truth About DIY GBP Optimization</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Doing all of the above manually — every week, consistently — is a part-time job. Posting weekly, monitoring and responding to reviews within hours, checking citations across 50+ directories, and tracking your heatmap rankings by zip code... 
                  Most contractors start strong and then fall off after 3–4 weeks. That inconsistency is exactly what Google penalizes.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors">
                    <span className="text-white font-semibold text-sm pr-4">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="h-5 w-5 text-emerald-400 shrink-0" /> : <ChevronDown className="h-5 w-5 text-slate-500 shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 border-t border-slate-800">
                      <p className="text-slate-400 text-sm leading-relaxed pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-emerald-900/20 blur-none" />
            <div className="relative bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-800/50 rounded-3xl p-10 md:p-14 text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full text-emerald-400 text-xs font-bold mb-6 uppercase tracking-widest">
                <MapPin className="h-3 w-3" /> Free for Your Business
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                See Exactly Where Your Competitors Are Outranking You
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Get a free local ranking audit that shows your Map Pack position, competitor analysis, and a step-by-step fix plan — specific to your city and trade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://gbp.cortxai.us/register" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-10 py-4 rounded-xl shadow-[0_0_40px_-10px_rgba(16,185,129,0.7)] transition-all hover:scale-105 text-base">
                  Run My Free Local Ranking Audit <ArrowRight className="h-5 w-5" />
                </a>
                <Link to="/live-demo" className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-emerald-500/50 text-white px-10 py-4 rounded-xl transition-all text-base font-semibold">
                  See Live Demo
                </Link>
              </div>
              <p className="text-slate-600 text-xs mt-4">No credit card required · Results in 30–60 days · Cancel anytime</p>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16 pt-12 border-t border-slate-800">
            <h3 className="text-white font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'How GBP Cortx Secures the #1 Map Pack Spot', category: 'GBP Optimization', to: '/solutions/lead-gen' },
                { title: 'Mastering Local Dominance with AI', category: 'Local SEO', to: '/solutions/lead-gen' },
              ].map((post, i) => (
                <Link key={i} to={post.to} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/30 transition-colors group">
                  <span className="text-emerald-400 text-xs font-bold">{post.category}</span>
                  <p className="text-white font-semibold mt-2 group-hover:text-emerald-400 transition-colors text-sm">{post.title} <ArrowRight className="inline h-3.5 w-3.5" /></p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default BlogGBPNotShowing;
