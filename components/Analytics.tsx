import React, { useEffect } from 'react';

const Analytics: React.FC = () => {
  const gaId = import.meta.env.VITE_GA_ID;

  useEffect(() => {
    if (!gaId) return;

    const script1 = document.createElement('script');
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`;
    document.head.appendChild(script2);

    return () => {
      try { document.head.removeChild(script1); } catch(e) {}
      try { document.head.removeChild(script2); } catch(e) {}
    };
  }, []);

  return null;
};

export default Analytics;
