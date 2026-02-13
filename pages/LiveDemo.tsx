import React, { useState } from 'react';
const EXTERNAL_URL = 'https://cort-xai-vs-bvsr.vercel.app';

const LiveDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Live Demo</h1>
        <p className="text-slate-400 mt-2">Interactive demo of Cort X AIO. You can interact inline or open in a new tab.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 font-semibold text-sm transition-colors ${
            activeTab === 'dashboard'
              ? 'text-cort-500 border-b-2 border-cort-500'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Dashboard View
        </button>
        <button
          onClick={() => setActiveTab('live-demo')}
          className={`px-4 py-2 font-semibold text-sm transition-colors ${
            activeTab === 'live-demo'
              ? 'text-cort-500 border-b-2 border-cort-500'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Live Demo
        </button>
      </div>

      {/* Dashboard View Tab */}
      {activeTab === 'dashboard' && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Dashboard</h2>
              <p className="text-slate-400 mt-2">Access the full dashboard interface</p>
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

          <div className="w-full bg-slate-900 rounded-lg overflow-hidden border border-slate-800" style={{height: '72vh'}}>
            <iframe
              title="Cort X AIO Dashboard"
              src={EXTERNAL_URL}
              className="w-full h-full"
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
            />
          </div>

          <div className="mt-4 text-slate-400 text-sm">
            Note: If the demo does not appear, click "Open in new tab" to view it directly.
          </div>
        </div>
      )}

      {/* Live Demo Tab */}
      {activeTab === 'live-demo' && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Interactive Demo</h2>
              <p className="text-slate-400 mt-2">Experience Cort X AIO features in action</p>
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

          <div className="w-full bg-slate-900 rounded-lg overflow-hidden border border-slate-800" style={{height: '72vh'}}>
            <iframe
              title="Cort X AIO Live Demo"
              src={EXTERNAL_URL}
              className="w-full h-full"
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
            />
          </div>

          <div className="mt-4 text-slate-400 text-sm">
            Note: If the demo does not appear, click "Open in new tab" to view it directly.
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveDemo;
