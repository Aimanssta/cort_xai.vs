import React, { useState } from 'react';

const Logo: React.FC<{ className?: string; compact?: boolean }> = ({ className = '', compact = false }) => {
  const [imgError, setImgError] = useState(false);
  const imgSrc = '/cortx-logo-bluish.png';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {!imgError && (
        <img
          src={imgSrc}
          alt="Cort X"
          width={compact ? 36 : 48}
          height={compact ? 36 : 48}
          className="rounded-md object-contain"
          onError={() => setImgError(true)}
        />
      )}

      {imgError && (
        <svg width={compact ? 36 : 48} height={compact ? 36 : 48} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2b6ef6" />
              <stop offset="60%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" rx="16" fill="transparent" />
          <g transform="translate(30,20)">
            <path d="M18 2 L68 2 C86 2 98 24 86 40 L36 130 C24 146 2 146 2 128 L2 48 C2 30 10 8 28 4 Z" fill="url(#g1)" opacity="0.95" />
            <rect x="84" y="70" width="22" height="70" rx="10" transform="rotate(-30 95 105)" fill="url(#g1)" />
            <circle cx="140" cy="8" r="12" fill="#d946ef" />
          </g>
        </svg>
      )}

      {!compact && (
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-xl text-white">Cort <span className="text-cort-400">X</span></span>
        </div>
      )}
    </div>
  );
};

export default Logo;
