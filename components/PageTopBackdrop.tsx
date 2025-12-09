import React from 'react';

const PageTopBackdrop: React.FC = () => {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-grid-slate-900 bg-[length:40px_40px] opacity-35"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[420px] bg-cort-600/18 rounded-full blur-[90px] mix-blend-screen animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-purple-900/18 rounded-full blur-[80px] mix-blend-screen"></div>
    </div>
  );
};

export default PageTopBackdrop;
