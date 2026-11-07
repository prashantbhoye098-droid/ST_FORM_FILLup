import React from 'react';
import { AdminSettings } from '../types/admin';
import {
  ShieldCheck,
  FileText,
  Building2,
  BookOpen,
  Scale,
  Phone,
  Heart
} from 'lucide-react';

interface FooterProps {
  adminSettings: AdminSettings;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenDisclaimer: () => void;
  onOpenAbout: () => void;
  onOpenGuides: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  adminSettings,
  onOpenPrivacy,
  onOpenTerms,
  onOpenDisclaimer,
  onOpenAbout,
  onOpenGuides
}) => {
  const centerName = adminSettings.branding.centerName || 'माऊली डिजिटल सेवा केंद्र';
  const centerAddress = adminSettings.branding.centerAddress || 'मु.पो. पठावे दिगर, ता. बागलाण, जि. नाशिक - ४२३३०१';
  const centerContact = adminSettings.branding.centerContact || '७०८३०३४६०७';

  return (
    <footer className="no-print bg-slate-900 text-slate-300 border-t border-slate-800 text-xs py-4 px-3 sm:px-6 mt-auto shrink-0 select-text">
      <div className="max-w-[1750px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Branding & Center Information */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-500 text-slate-950 font-black flex items-center justify-center text-[10px] tracking-tight">
              MDS
            </div>
            <a
              href="https://mauliservices.in"
              className="font-bold text-white text-xs hover:text-amber-400 transition-colors"
            >
              mauliservices.in
            </a>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-300 text-xs font-semibold">{centerName}</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 text-[11px]">{centerAddress}</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 text-[11px] font-mono">मो. {centerContact}</span>
        </div>

        {/* Center & Right: Compliance & Legal Links (Crucial for Fast Google AdSense Approval) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] font-medium">
          <button
            type="button"
            onClick={onOpenGuides}
            className="text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer flex items-center gap-1 hover:underline"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>दाखले माहिती व कागदपत्रे</span>
          </button>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 hover:underline"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>गोपनीयता धोरण (Privacy)</span>
          </button>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <button
            type="button"
            onClick={onOpenDisclaimer}
            className="text-amber-300 hover:text-amber-200 transition-colors cursor-pointer flex items-center gap-1 hover:underline font-semibold"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>अस्वीकरण (Disclaimer)</span>
          </button>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <button
            type="button"
            onClick={onOpenTerms}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 hover:underline"
          >
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            <span>नियम व अटी (Terms)</span>
          </button>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <button
            type="button"
            onClick={onOpenAbout}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 hover:underline"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>आमच्याबद्दल व संपर्क</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1750px] mx-auto mt-2 pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 gap-1 text-center sm:text-left">
        <div>
          © {new Date().getFullYear()} <span className="text-slate-300 font-semibold">mauliservices.in</span> ({centerName}) · सर्व हक्क सुरक्षित. Google AdSense, IT Act & DPDP Act Compliant Portal.
        </div>
        <div className="text-slate-400">
          शासकीय नियम व नमुन्यानुसार नागरिकांसाठी तयार केलेले स्वतंत्र डिजिटल सहाय्यक साधन (Non-Government Entity)
        </div>
      </div>
    </footer>
  );
};
