import React from 'react';

interface WatermarkOverlayProps {
  text?: string;
  subText?: string;
  color?: string;
  opacity?: number;
  fontSize?: number;
  rotation?: number;
  enabled?: boolean;
  isRemoved?: boolean;
}

export const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({
  text = 'माऊली डिजिटल सेवा केंद्र पाथवे दिगर',
  subText = '★ अधिकृत वापरासाठी सबस्क्रिप्शन आवश्यक · विनामूल्य नमुना प्रत ★',
  color = '#b91c1c',
  opacity = 0.25,
  fontSize = 30,
  rotation = -30,
  enabled = true,
  isRemoved = false
}) => {
  if (!enabled || isRemoved) return null;

  return (
    <div
      aria-hidden="true"
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none z-30 overflow-hidden flex flex-col justify-around select-none print:opacity-30"
    >
      {[1, 2, 3].map((row) => (
        <div
          key={row}
          style={{ transform: `rotate(${rotation}deg)` }}
          className="flex flex-col items-center justify-center my-8 text-center"
        >
          <div
            style={{ color, borderColor: color, fontSize: `${fontSize}px` }}
            className="font-extrabold tracking-wider uppercase border-y-2 py-1 px-4 font-devanagari whitespace-nowrap"
          >
            {text}
          </div>
          {subText && (
            <div className="text-slate-800 font-bold text-[10px] tracking-widest mt-1 uppercase whitespace-nowrap">
              {subText}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
