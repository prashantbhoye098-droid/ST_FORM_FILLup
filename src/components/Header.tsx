import React from 'react';
import { Printer, Download, Upload, Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onPrintAll: () => void;
  onLoadDemo: () => void;
  onReset: () => void;
  onExportJson: () => void;
  onImportJson: () => void;
  currentPage: number;
  onSelectPage: (p: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onPrintAll,
  onLoadDemo,
  onReset,
  onExportJson,
  onImportJson,
  currentPage,
  onSelectPage
}) => {
  return (
    <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 px-4 py-2.5 flex items-center justify-between gap-8 shadow-md">
      {/* Zone 1: Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-md bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs font-mono">
          ST
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-extrabold text-base tracking-tight text-white whitespace-nowrap">
            ST जात प्रमाणपत्र व वंशावळ
          </span>
          <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap mt-0.5">
            आपले सरकार सेवा केंद्र डिजिटल पोर्टल
          </span>
        </div>
      </div>

      {/* Zone 2: Page Jump Quick Links */}
      <nav className="hidden lg:flex items-center gap-1.5 text-xs font-medium">
        {[
          { num: 0, label: 'सर्व ६ पाने' },
          { num: 1, label: 'पृष्ठ १ (नमुना अ)' },
          { num: 2, label: 'पृष्ठ २ (पुरावे)' },
          { num: 3, label: 'पृष्ठ ३ (प्रतिज्ञा)' },
          { num: 4, label: 'पृष्ठ ४ (नमुना अ-१)' },
          { num: 5, label: 'पृष्ठ ५ (वंशावळ)' },
          { num: 6, label: 'पृष्ठ ६ (घोषणापत्र)' }
        ].map((tab) => (
          <button
            type="button"
            key={tab.num}
            onClick={() => onSelectPage(tab.num)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              currentPage === tab.num
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Zone 3: Actions (Demo, Reset, JSON Backup, Print) */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onLoadDemo}
          title="चाचणीसाठी खरी नमुना माहिती भरा"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900 border border-amber-800 rounded-md transition-colors whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">नमुना माहिती (Demo)</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          title="सर्व माहिती रिकामी करा"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onExportJson}
          title="अर्जदाराची माहिती सेव्ह/डाउनलोड करा"
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onImportJson}
          title="जतन केलेला अर्ज अपलोड करा"
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
        >
          <Upload className="w-4 h-4" />
        </button>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={onPrintAll}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-md shadow-sm transition-colors whitespace-nowrap"
        >
          <Printer className="w-4 h-4 text-slate-950" />
          <span>प्रिंट करा (Print Form)</span>
        </button>
      </div>
    </header>
  );
};
