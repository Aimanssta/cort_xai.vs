import React from 'react';
import { TrendingUp, Brain, MapPin, BarChart3, Zap, Shield } from 'lucide-react';

type Insight = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  image: string;
  link?: string;
};

const insights: Insight[] = [
  {
    title: 'The Rise of Generative Engine Optimization (GEO)',
    desc: 'As AI chatbots dominate search, traditional SEO is shifting. Businesses now compete for placement in AI snapshots, not just blue links. Learn how to optimize for ChatGPT, Google Gemini, and other AI search engines.',
    icon: <Brain className="h-6 w-6 text-emerald-400" />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&q=80',
  },
  {
    title: 'Local Dominance: Why AI Overviews Favor Data Authority',
    desc: 'Google\'s AI overviews pull answers from the most authoritative local sources. Rank #1 in AI by building entity authority across 70+ directories, ensuring consistent NAP, and winning the "data quality game."',
    icon: <MapPin className="h-6 w-6 text-blue-400" />,
    image: '/borges-ranking.PNG',
  },
  {
    title: 'Voice Search & Semantic Intent in 2025',
    desc: '55% of US households use voice-activated devices. Voice queries demand conversational, long-tail keywords and structured data. Cort X AI helps you dominate voice by optimizing for natural language processing (NLP) recognition.',
    icon: <Zap className="h-6 w-6 text-yellow-400" />,
    image: '/voice-search-website.png',
  },
  {
    title: 'Citation Building: The Silent Ranking Factor',
    desc: 'Citations (online mentions of your business) signal credibility to both AI and traditional search. Consistent citations across Yelp, Google, Apple Maps, and 70+ directories boost local visibility by 40%+ on average.',
    icon: <BarChart3 className="h-6 w-6 text-purple-400" />,
    image: '/social-web.png',
  },
  {
    title: 'Review Sentiment & AI Trust Scores',
    desc: 'AI algorithms now analyze review sentiment to assess trustworthiness. A 4.5+ star average with positive sentiment wins the "trust algorithm." Learn strategies to collect reviews and respond to feedback at scale.',
    icon: <TrendingUp className="h-6 w-6 text-pink-400" />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&q=80',
  },
  {
    title: 'Data Privacy & Compliance in Local AI',
    desc: 'As you automate lead capture and customer data collection, GDPR and CCPA compliance become non-negotiable. Discover how to leverage AI while protecting customer privacy and building brand trust.',
    icon: <Shield className="h-6 w-6 text-indigo-400" />,
    image: '/DataPrivacy&ComplianceLocalAI.png',
  },
];

export default function AIInsights() {
  return (
    <section className="py-12 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">AI Insights & Local Search Trends</h2>
        <p className="text-slate-400 mb-8">Stay ahead of the curve with insights on Generative Engine Optimization, local authority, and the future of AI-driven search.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, i) => (
            <div
              key={i}
              className="group bg-slate-900 rounded-2xl border border-slate-800 hover:border-emerald-500/60 transition-all duration-300 hover:shadow-lg transform motion-safe:hover:scale-105 overflow-hidden"
              role="article"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden bg-slate-800">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="mt-1">{insight.icon}</div>
                  <h3 className="text-sm font-semibold text-white leading-snug">{insight.title}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{insight.desc}</p>
                {insight.link && (
                  <a href={insight.link} className="inline-block mt-4 text-emerald-400 text-xs font-medium hover:underline">
                    Read More →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
