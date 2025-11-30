import React, { useState } from 'react';
import { clients as defaultClients } from '../data/clients';

export default function ClientReviews({ clients = defaultClients }: { clients?: typeof defaultClients }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Client Reviews & Success Stories</h2>
        <p className="text-sm text-slate-400 mb-6">Real client videos and logos — replace the sample assets in `data/clients.ts` with your actual media files (public/ or remote URLs).</p>

        {/* Logo row */}
        <div className="flex items-center gap-6 flex-wrap mb-8">
          {clients.map((c) => (
            <div key={c.name} className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
              {c.logo ? (
                <img src={c.logo} alt={`${c.name} logo`} className="h-10 object-contain" />
              ) : (
                <div className="h-10 w-28 bg-slate-800 rounded flex items-center justify-center text-xs text-slate-400">Logo</div>
              )}
              <div className="text-sm text-slate-300">{c.name}</div>
            </div>
          ))}
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clients.map((c) => (
            <div key={c.name} className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="mb-2 text-sm text-slate-300 font-semibold">{c.name}</div>

              {c.video ? (
                <div className="relative">
                  <video
                    src={c.video}
                    poster={c.poster}
                    controls
                    preload="metadata"
                    className="w-full rounded-lg bg-black"
                    onPlay={() => setPlaying(c.name)}
                    onPause={() => setPlaying((p) => (p === c.name ? null : p))}
                  />
                  <div className="mt-2 text-xs text-slate-400">Click play to watch client review</div>
                </div>
              ) : (
                <div className="h-40 bg-slate-800 rounded flex items-center justify-center text-sm text-slate-400">No video available</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
