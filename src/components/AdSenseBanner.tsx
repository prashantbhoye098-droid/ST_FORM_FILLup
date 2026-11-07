import React, { useEffect } from 'react';
import { AdminSettings } from '../types/admin';
import { Sparkles, Globe } from 'lucide-react';

interface AdSenseBannerProps {
  adminSettings: AdminSettings;
  position: 'top' | 'sidebar' | 'bottom';
  adSlot?: string;
  adFormat?: 'auto' | 'horizontal' | 'rectangle';
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  adminSettings,
  position,
  adSlot = '1234567890',
  adFormat = 'auto'
}) => {
  const isEnabled = adminSettings.adsense?.enabled ?? true;
  const publisherId = adminSettings.adsense?.publisherId?.trim();

  // Position-specific visibility check
  if (!isEnabled) return null;
  if (position === 'top' && !adminSettings.adsense?.showTopBanner) return null;
  if (position === 'sidebar' && !adminSettings.adsense?.showSidebarBanner) return null;
  if (position === 'bottom' && !adminSettings.adsense?.showBottomBanner) return null;

  useEffect(() => {
    // If publisherId is provided and adsbygoogle exists, trigger ad push
    if (publisherId && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        // Suppress repeated push errors in dev
      }
    }
  }, [publisherId]);

  // If user has entered real publisher ID
  if (publisherId) {
    return (
      <div className="no-print w-full flex flex-col items-center justify-center my-2 p-1 bg-slate-50 border border-slate-200/80 rounded-xl overflow-hidden text-center">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
          जाहिरात (Advertisement)
        </span>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: position === 'top' ? '60px' : '90px' }}
          data-ad-client={publisherId}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Preview Placeholder container (Clean, non-intrusive banner)
  return (
    <div
      className={`no-print w-full rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-2 sm:p-2.5 flex items-center justify-between text-xs text-slate-500 my-1.5 transition-all hover:bg-slate-100/80 ${
        position === 'sidebar' ? 'flex-col gap-1.5 text-center' : 'flex-row'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px] shrink-0">
          Ad
        </div>
        <div className="text-left">
          <span className="font-bold text-slate-700 text-[11px] block leading-tight">
            Google AdSense जाहिरात जागा ({position === 'top' ? 'हेडर' : position === 'sidebar' ? 'साइडबार' : 'फुटर'})
          </span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            डोमेन मंजुरीनंतर येथे Google च्या अधिकृत जाहिराती आपोआप सुरू होतील
          </span>
        </div>
      </div>

      <div className="text-[10px] font-mono font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
        Responsive Ad Unit
      </div>
    </div>
  );
};
