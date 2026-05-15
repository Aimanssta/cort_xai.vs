import React from 'react';
import { MessageSquare, Calendar, Map, BarChart3, Users, ShieldCheck, Zap, Image as ImageIcon, Search } from 'lucide-react';

const features = [
  {
    id: 'post-gen',
    title: 'AI Local Post Generator',
    desc: 'Generate weekly, SEO-optimized Google Business posts and photos in seconds to keep your profile active and ranking.',
    icon: Zap,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10'
  },
  {
    id: 'review-auto',
    title: 'Review Auto-Pilot',
    desc: 'Our AI instantly responds to every customer review with hyper-personalized, keyword-rich replies that build trust and boost SEO.',
    icon: MessageSquare,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10'
  },
  {
    id: 'heatmaps',
    title: 'Local Ranking Heatmaps',
    desc: 'Track your search visibility neighborhood-by-neighborhood. See exactly where you rank on Google Maps across your entire service area.',
    icon: Map,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10'
  },
  {
    id: 'comp-intel',
    title: 'Competitive Intelligence',
    desc: 'Monitor your top competitors in real-time. Know their ranking moves, review volume, and visibility gaps before they do.',
    icon: BarChart3,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10'
  },
  {
    id: 'review-agg',
    title: 'Review Aggregator',
    desc: 'A unified inbox for all your Google reviews. Monitor, manage, and analyze sentiment from one simple dashboard.',
    icon: Users,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10'
  },
  {
    id: 'info-sync',
    title: 'Business Info Sync',
    desc: 'Ensure your name, address, phone number, and hours are 100% consistent across the web to prevent ranking drops.',
    icon: ShieldCheck,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10'
  },
  {
    id: 'listing-mgmt',
    title: 'Listing Management',
    desc: 'Audit 30+ major directories like Bing, Facebook, and TripAdvisor. Identify missed opportunities and sync data instantly.',
    icon: Search,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10'
  }
];

interface GBPFeaturesListProps {
  onFeatureClick?: (id?: string) => void;
}

const GBPFeaturesList: React.FC<GBPFeaturesListProps> = ({ onFeatureClick }) => {
  return (
    <section className="py-20 px-6 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Enterprise Features for <span className="text-emerald-500">Local Dominance</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Everything you need to automate your Google Business Profile and scale your inbound calls on autopilot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              onClick={() => onFeatureClick && onFeatureClick((f as any).id)}
              className={`group p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] cursor-pointer`}
            >
              <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className={`h-7 w-7 ${f.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GBPFeaturesList;
