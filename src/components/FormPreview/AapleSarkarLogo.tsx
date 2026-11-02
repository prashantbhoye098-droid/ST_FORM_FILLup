import React from 'react';

interface AapleSarkarLogoProps {
  className?: string;
  showSubtitle?: boolean;
  subtitleText?: string;
}

export const AapleSarkarLogo: React.FC<AapleSarkarLogoProps> = ({
  className = 'h-16',
  showSubtitle = false,
  subtitleText = ''
}) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center gap-2">
        {/* Emblem Sun/Rays icon */}
        <svg
          viewBox="0 0 100 70"
          className="w-12 h-10 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Saffron & Tricolor Rays */}
          <path d="M50 48 L46 16 L54 16 Z" fill="#E65100" />
          <path d="M50 48 L32 20 L38 16 Z" fill="#F57C00" />
          <path d="M50 48 L68 20 L62 16 Z" fill="#F57C00" />
          <path d="M50 48 L20 28 L24 23 Z" fill="#FFA000" />
          <path d="M50 48 L80 28 L76 23 Z" fill="#FFA000" />
          <path d="M50 48 L12 40 L15 34 Z" fill="#FFB74D" />
          <path d="M50 48 L88 40 L85 34 Z" fill="#FFB74D" />
          
          {/* Semi-circular rising sun arc */}
          <circle cx="50" cy="48" r="16" fill="#00897B" />
          <circle cx="50" cy="48" r="11" fill="#FFF" />
          {/* Central person figure */}
          <circle cx="50" cy="42" r="4.5" fill="#E65100" />
          <path d="M43 51 C43 47 47 46 50 46 C53 46 57 47 57 51 Z" fill="#E65100" />
        </svg>

        {/* Marathi Typography: आपले सरकार */}
        <div className="flex flex-col items-start leading-none">
          <div className="flex items-baseline gap-1 font-extrabold tracking-tight">
            <span className="text-[#00838F] text-xl font-bold" style={{ fontFamily: "'Mukta', sans-serif" }}>
              आपले
            </span>
            <span className="text-[#E65100] text-2xl font-black ml-0.5" style={{ fontFamily: "'Mukta', sans-serif" }}>
              सरकार
            </span>
          </div>
          <div className="text-[#B71C1C] text-xs font-bold tracking-wider mt-0.5" style={{ fontFamily: "'Mukta', sans-serif" }}>
            सेवा केंद्र (ASSK)
          </div>
        </div>
      </div>

      {showSubtitle && subtitleText && (
        <div className="text-[10px] font-semibold text-slate-700 mt-0.5 tracking-tight">
          {subtitleText}
        </div>
      )}
    </div>
  );
};
