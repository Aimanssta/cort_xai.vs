import React from 'react';

const PageTopBackdrop: React.FC = () => {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-grid-slate-900 bg-[length:40px_40px] opacity-30"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[260px] sm:w-[600px] sm:h-[360px] md:w-[700px] md:h-[420px] bg-cort-600/14 rounded-full blur-[60px] sm:blur-[80px] md:blur-[90px] mix-blend-screen animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] bg-purple-900/14 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] mix-blend-screen"></div>
    </div>
  );
};

export default PageTopBackdrop;
