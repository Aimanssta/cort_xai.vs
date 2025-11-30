import React from 'react';
import Button from './Button';

export default function HeroAIO() {
  return (
    <section className="py-12 px-6 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">AI Voice Agent for Local Businesses — <span className="text-emerald-500">Book more calls, capture better leads</span></h1>
        <p className="mt-2 text-slate-300 text-sm md:text-base">Real-time voice calls, automatic transcripts, and lead capture — built to convert local search visitors into customers.</p>

        <div className="mt-6 flex justify-center gap-4">
          <Button
            to="#"
            variant="primary"
            onClick={(e: any) => {
              e.preventDefault();
              // Dispatch a global event to open the AI call modal and start the demo
              window.dispatchEvent(new CustomEvent('openAICall', { detail: { start: true } }));
            }}
          >
            Try Live Demo
          </Button>
          <button className="px-5 py-2 rounded border border-slate-700 text-slate-300 hover:border-emerald-500">Get Free Local Audit</button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
          <div>
            <p className="text-xs text-slate-400">Demo: Start a short simulated call to hear how the agent answers common questions and captures lead info.</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Use the widget to collect leads, forward to CRM, or schedule follow-ups. Works with major CRMs and webhooks.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
