import React from 'react';
// Subtree reference: cortx-app (https://github.com/Aimanssta/cort-x-ai)
const LiveDemo: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Live Demo</h1>
        <p className="text-slate-400 mt-2">Experience our core Google Business Profile optimization software in action.</p>
      </div>

      <div className="p-6 bg-slate-900 rounded-lg border border-slate-800">
        <iframe
          src="https://gbp.cortxai.us"
          title="GBP Optimization Demo"
          className="w-full h-[600px] border-0 rounded"
          allow="fullscreen"
        ></iframe>
      </div>

      {/* Legal Links for Cloud Marketplace */}
      <div className="mt-8 pt-8 border-t border-slate-800">
        <p className="text-slate-500 text-sm mb-4">GBP.cortxai.us Legal & Compliance</p>
        <div className="flex flex-wrap gap-6">
          <a 
            href="https://gbp.cortxai.us/privacy-policy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cort-400 hover:text-cort-300 transition-colors text-sm font-medium"
          >
            Privacy Policy
          </a>
          <a 
            href="https://gbp.cortxai.us/terms-of-service" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cort-400 hover:text-cort-300 transition-colors text-sm font-medium"
          >
            Terms of Service
          </a>
          <a 
            href="https://www.cortxai.us/contact" 
            className="text-cort-400 hover:text-cort-300 transition-colors text-sm font-medium"
          >
            Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;
