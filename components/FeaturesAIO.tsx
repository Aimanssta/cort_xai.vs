import React, { useEffect, useRef, useState } from 'react';
import { Globe, FileText, Send, BarChart } from 'lucide-react';

const features = [
  {
    title: 'Live Voice Calls',
    desc: 'AI-hosted calls that answer customer questions, qualify leads, and hand off warm prospects.',
    icon: Globe,
  },
  {
    title: 'Transcripts & Summaries',
    desc: 'Full call transcripts, automated summaries, and lead notes saved to your dashboard.',
    icon: FileText,
  },
  {
    title: 'Lead Capture & CRM',
    desc: 'Send new leads to email, Slack, or your CRM instantly with full call context.',
    icon: Send,
  },
  {
    title: 'Local Search Insights',
    desc: 'Service-area specific search volumes and visibility gaps, so you know where to focus.',
    icon: BarChart,
  },
];

export default function FeaturesAIO() {
  return (
    <section className="py-10 px-6 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-white">What Cort X AI Does</h2>
        <p className="text-sm text-slate-400 mt-2">Everything a local business needs to convert searchers into customers — in one lightweight widget.</p>

        {/* animated grid rendered for IntersectionObserver */}
        <AnimatedFeatureGrid features={features} />
      </div>
    </section>
  );
}

type Feature = { title: string; desc: string; icon: any };

function AnimatedFeatureGrid({ features }: { features: Feature[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      {features.map((f, idx) => {
        const Icon = f.icon as any;
        const delay = `${idx * 80}ms`;
        return (
          <div
            key={f.title}
            role="article"
            aria-label={f.title}
            style={{ transitionDelay: delay }}
            className={`p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-sm transform transition-all duration-700 ease-out will-change-transform motion-safe:transform-gpu ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } motion-reduce:transition-none`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Icon className="h-6 w-6 text-emerald-400" />
              <h3 className="text-sm font-medium text-white">{f.title}</h3>
            </div>
            <p className="text-xs text-slate-300 mt-2">{f.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
