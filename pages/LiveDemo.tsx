import React from 'react';
const EXTERNAL_URL = 'https://cort-xai.vercel.app/';

const LiveDemo: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Live Demo</h1>
        <p className="text-slate-400 mt-2">Embedded dashboard demo (single view).</p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-slate-400 mt-2">Live dashboard embedded from external deployment.</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={EXTERNAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cort-600 hover:bg-cort-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Open in new tab
          </a>
          <a
            href={EXTERNAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 text-sm underline"
          >
            Direct link
          </a>
        </div>
      </div>

      <div className="w-full bg-slate-900 rounded-lg overflow-hidden border border-slate-800" style={{height: '82vh'}}>
        <iframe
          title="Cort X AIO Embedded Dashboard"
          src={EXTERNAL_URL}
          className="w-full h-full"
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
        />
      </div>

      <div className="mt-4 text-slate-400 text-sm">
        Note: If the demo does not appear, click "Open in new tab" to view it directly.
      </div>
    </div>
  );
};

export default LiveDemo;
