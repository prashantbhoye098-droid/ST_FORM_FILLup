import React from 'react';
import { FormCategory, UserProfile } from '../types/form';
import { AdminSettings } from '../types/admin';
import {
  Printer,
  Sparkles,
  RefreshCw,
  Crown,
  MapPin,
  ChevronDown,
  Globe,
  Settings,
  Wallet,
  User,
  ShieldCheck,
  KeyRound,
  FileText,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  onPrintAll: () => void;
  onLoadDemo: () => void;
  onReset: () => void;
  onOpenProfiles: () => void;
  onOpenAdmin: () => void;
  onOpenAuth: () => void;
  onOpenPayment: () => void;
  onOpenGuides?: () => void;
  currentCategory: FormCategory;
  onSelectCategory: (cat: FormCategory) => void;
  currentPage: number;
  onSelectPage: (p: number) => void;
  totalPages: number;
  user: UserProfile;
  adminSettings: AdminSettings;
}

export const Header: React.FC<HeaderProps> = ({
  onPrintAll,
  onLoadDemo,
  onReset,
  onOpenProfiles,
  onOpenAdmin,
  onOpenAuth,
  onOpenPayment,
  onOpenGuides,
  currentCategory,
  onSelectCategory,
  currentPage,
  onSelectPage,
  totalPages,
  user,
  adminSettings
}) => {
  return (
    <header className="no-print bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40 px-2.5 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4 shadow-lg">
      
      {/* Zone 1: Branding & Form Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 font-black flex items-center justify-center text-xs sm:text-sm shadow-xs font-mono shrink-0 overflow-hidden">
          {adminSettings.branding.centerLogoUrl ? (
            <img src={adminSettings.branding.centerLogoUrl} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <span>{adminSettings.branding.headerLogoText || 'महा'}</span>
          )}
        </div>
        
        <div className="hidden lg:flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-sm tracking-tight text-white whitespace-nowrap">
              {adminSettings.branding.portalTitle || 'आपले सरकार सेवा केंद्र'}
            </span>
            {adminSettings.branding.headerBadgeText && (
              <span className="bg-amber-400/20 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-400/30">
                {adminSettings.branding.headerBadgeText}
              </span>
            )}
          </div>
          {adminSettings.branding.portalTagline && (
            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap mt-0.5">
              {adminSettings.branding.portalTagline}
            </span>
          )}
        </div>

        {/* Form Selector Dropdown */}
        {(adminSettings.headerButtons?.showFormSelector ?? true) && (
          <div className="relative">
            <select
              value={currentCategory}
              onChange={(e) => onSelectCategory(e.target.value as FormCategory)}
              className="appearance-none bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs pl-2.5 pr-7 py-1.5 sm:py-2 rounded-lg border border-slate-700 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-sm max-w-[210px] sm:max-w-none truncate"
            >
              {(adminSettings.tabs.stFormEnabled ?? true) && (
                <option value="ST_CASTE">{adminSettings.tabs.stFormLabel || '१. अनुसूचित जमाती (ST) जात प्रमाणपत्र'}</option>
              )}
              {(adminSettings.tabs.obcFormEnabled ?? true) && (
                <option value="OBC_SC_CASTE">{adminSettings.tabs.obcFormLabel || '२. OBC / SC / VJNT / SBC जात प्रमाणपत्र'}</option>
              )}
              {(adminSettings.tabs.incomeFormEnabled ?? true) && (
                <option value="INCOME_DECLARATION">{adminSettings.tabs.incomeFormLabel || '३. उत्पन्नाचा दाखला - प्रपत्र-अ'}</option>
              )}
              {(adminSettings.tabs.selfDeclFormEnabled ?? true) && (
                <option value="SELF_DECLARATIONS_16">{adminSettings.tabs.selfDeclFormLabel || '४. शासकीय स्वयं घोषणापत्र (१६ दाखले)'}</option>
              )}
              {(adminSettings.tabs.panFormEnabled ?? true) && (
                <option value="PAN_CARD_49A">{adminSettings.tabs.panFormLabel || '५. पॅन कार्ड (PAN) फोटो व सही पेस्ट'}</option>
              )}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        )}

        {/* Quick PAN Card 1-Click Button */}
        {(adminSettings.tabs.panFormEnabled ?? true) && (
          <button
            type="button"
            onClick={() => onSelectCategory('PAN_CARD_49A')}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-black text-xs transition-all cursor-pointer shadow-xs whitespace-nowrap ${
              currentCategory === 'PAN_CARD_49A'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white ring-2 ring-blue-400 shadow-md'
                : 'bg-blue-950/80 hover:bg-blue-900 text-blue-200 border border-blue-700/60'
            }`}
            title="पॅन कार्ड (PAN Form 49A) २-पानी फोटो व सही पेस्टिंग टूल"
          >
            <FileText className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">🪪 PAN फॉर्म (फोटो+सही)</span>
            <span className="sm:hidden">🪪 PAN फॉर्म</span>
            {currentCategory === 'PAN_CARD_49A' && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            )}
          </button>
        )}
      </div>

      {/* Zone 2: Navigation Links for Multi-page forms */}
      {totalPages > 1 && (adminSettings.headerButtons?.showPageNavigation ?? true) && (
        <nav className="hidden 2xl:flex items-center gap-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => onSelectPage(0)}
            className={`px-2 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap ${
              currentPage === 0
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            सर्व पृष्ठे ({totalPages})
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              type="button"
              key={num}
              onClick={() => onSelectPage(num)}
              className={`px-1.5 py-1 rounded-md text-xs font-medium transition-colors ${
                currentPage === num
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              पृष्ठ {num}
            </button>
          ))}
        </nav>
      )}

      {/* Zone 3: Actions (Admin, Wallet, Demo, PDF) */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        
        {/* MASTER ADMIN PANEL BUTTON */}
        <button
          type="button"
          onClick={onOpenAdmin}
          title="मास्टर ॲडमीन लॉगिन व कंट्रोल पॅनेल (ग्राहक ID-PW निर्मिती व सर्व नियंत्रण)"
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-black text-amber-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-lg transition-all whitespace-nowrap shadow-xs cursor-pointer border border-amber-400 hover:shadow-md"
        >
          <KeyRound className="w-3.5 h-3.5 text-slate-950" />
          <span>ॲडमीन लॉगिन / पॅनेल</span>
        </button>

        {/* Wallet Button (Admin Controllable) */}
        {adminSettings.payment.isPaymentSystemActive && (adminSettings.headerButtons?.showWalletButton ?? false) && (
          <button
            type="button"
            onClick={onOpenPayment}
            title="व्हॅलेट शिल्लक व पे-पर-पेज रिचार्ज"
            className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 rounded-md transition-colors whitespace-nowrap shadow-2xs cursor-pointer"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono">₹{user.walletBalance}</span>
          </button>
        )}

        {/* Village Profiles Button (Admin Controllable) */}
        {(adminSettings.headerButtons?.showProfilesButton ?? true) && (
          <button
            type="button"
            onClick={onOpenProfiles}
            title="जतन केलेले गाव निवडा किंवा सेव्ह करा"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-indigo-200 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700 rounded-md transition-colors whitespace-nowrap shadow-2xs cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">गावे</span>
          </button>
        )}

        {/* Scheme & Document Guides Button (AdSense & Knowledge Base) */}
        {onOpenGuides && (
          <button
            type="button"
            onClick={onOpenGuides}
            title="शासकीय दाखले माहिती, नियम व कागदपत्रे मार्गदर्शक"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-amber-200 bg-amber-950/80 hover:bg-amber-900 border border-amber-700/80 rounded-md transition-colors whitespace-nowrap shadow-2xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">दाखले माहिती</span>
          </button>
        )}

        {/* Google User Profile Button (Admin Controllable) */}
        {(adminSettings.headerButtons?.showAuthButton ?? false) && (
          <button
            type="button"
            onClick={onOpenAuth}
            title={user.isLoggedIn ? `लॉगिन: ${user.name}` : 'लॉगिन करा'}
            className="inline-flex items-center gap-1.5 p-1 sm:px-2 sm:py-1 rounded-md text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700 cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">लॉगिन</span>
          </button>
        )}

        {/* Demo Button (Admin Controllable) */}
        {(adminSettings.headerButtons?.showDemoButton ?? true) && (
          <button
            type="button"
            onClick={onLoadDemo}
            title="नमुना माहिती भरा"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors hidden sm:block cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </button>
        )}

        {/* Reset Button (Admin Controllable) */}
        {(adminSettings.headerButtons?.showResetButton ?? true) && (
          <button
            type="button"
            onClick={onReset}
            title="सर्व फॉर्म रिकामा करा"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Primary PDF Download & Print Action */}
        <button
          type="button"
          onClick={onPrintAll}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 active:bg-amber-500 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer hover:shadow-md"
          title="पेमेंट करून वॉटरमार्कशिवाय प्रिंट करा किंवा PDF डाउनलोड करा"
        >
          <Printer className="w-4 h-4 text-slate-950" />
          <span>{adminSettings.textOverrides.printButtonText || 'PDF डाउनलोड / प्रिंट'}</span>
        </button>
      </div>
    </header>
  );
};
