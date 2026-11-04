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
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  onPrintAll: () => void;
  onLoadDemo: () => void;
  onReset: () => void;
  onOpenSubscription: () => void;
  onOpenProfiles: () => void;
  onOpenAdmin: () => void;
  onOpenAuth: () => void;
  onOpenPayment: () => void;
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
  onOpenSubscription,
  onOpenProfiles,
  onOpenAdmin,
  onOpenAuth,
  onOpenPayment,
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
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 font-black flex items-center justify-center text-xs sm:text-sm shadow-xs font-mono shrink-0">
          महा
        </div>
        
        <div className="hidden lg:flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-sm tracking-tight text-white whitespace-nowrap">
              {adminSettings.branding.portalTitle || 'आपले सरकार सेवा केंद्र'}
            </span>
            <span className="bg-amber-400/20 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-400/30">
              {adminSettings.branding.headerBadgeText || 'पोर्टल २०२४'}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap mt-0.5">
            {adminSettings.branding.portalTagline || 'डिजिटल शासकीय फॉर्म्स व वंशावळ जनरेटर'}
          </span>
        </div>

        {/* Form Selector Dropdown */}
        <div className="relative">
          <select
            value={currentCategory}
            onChange={(e) => onSelectCategory(e.target.value as FormCategory)}
            className="appearance-none bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs pl-2.5 pr-7 py-1.5 sm:py-2 rounded-lg border border-slate-700 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-sm max-w-[210px] sm:max-w-none truncate"
          >
            {adminSettings.tabs.stFormEnabled && (
              <option value="ST_CASTE">{adminSettings.tabs.stFormLabel}</option>
            )}
            {adminSettings.tabs.obcFormEnabled && (
              <option value="OBC_SC_CASTE">{adminSettings.tabs.obcFormLabel}</option>
            )}
            {adminSettings.tabs.incomeFormEnabled && (
              <option value="INCOME_DECLARATION">{adminSettings.tabs.incomeFormLabel}</option>
            )}
            {adminSettings.tabs.selfDeclFormEnabled && (
              <option value="SELF_DECLARATIONS_16">{adminSettings.tabs.selfDeclFormLabel}</option>
            )}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Zone 2: Navigation Links for Multi-page forms */}
      {totalPages > 1 && (
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

      {/* Zone 3: Actions (Admin, Wallet, Subscription, Demo, PDF) */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        
        {/* MASTER ADMIN PANEL BUTTON */}
        <button
          type="button"
          onClick={onOpenAdmin}
          title="मास्टर ॲडमीन कंट्रोल पॅनेल (A to Z सेटिंग्ज)"
          className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-extrabold text-amber-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-md transition-all whitespace-nowrap shadow-xs cursor-pointer border border-amber-400"
        >
          <Settings className="w-3.5 h-3.5 text-slate-950 animate-spin-slow" />
          <span className="hidden md:inline">ॲडमीन पॅनेल</span>
        </button>

        {/* Center License ID badge or Subscribed status */}
        {user.centerId ? (
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold text-amber-300 bg-amber-950/80 border border-amber-600/70 rounded-md">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>ID: {user.centerId}</span>
          </div>
        ) : null}

        {/* Wallet / Pay Per Page (₹10) Button */}
        {adminSettings.payment.isPaymentSystemActive && (
          <button
            type="button"
            onClick={onOpenPayment}
            title="व्हॅलेट शिल्लक व पे-पर-पेज रिचार्ज"
            className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 rounded-md transition-colors whitespace-nowrap shadow-2xs cursor-pointer"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono">₹{user.walletBalance}</span>
            <span className="hidden lg:inline text-[10px] text-emerald-400 bg-emerald-900/50 px-1 rounded">
              (₹{adminSettings.payment.perPageFee}/पेज)
            </span>
          </button>
        )}

        {/* Village Profiles Button */}
        <button
          type="button"
          onClick={onOpenProfiles}
          title="जतन केलेले गाव निवडा किंवा सेव्ह करा"
          className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-bold text-indigo-200 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700 rounded-md transition-colors whitespace-nowrap shadow-2xs"
        >
          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">गावे</span>
        </button>

        {/* Subscription Plans Modal Button */}
        {adminSettings.payment.isPaymentSystemActive && adminSettings.payment.isSubscriptionActive && (
          <button
            type="button"
            onClick={onOpenSubscription}
            className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-bold text-amber-300 bg-amber-950/80 hover:bg-amber-900 border border-amber-700/80 rounded-md transition-colors whitespace-nowrap shadow-2xs"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">सबस्क्रिप्शन</span>
          </button>
        )}

        {/* Google User Profile Button */}
        <button
          type="button"
          onClick={onOpenAuth}
          title={user.isLoggedIn ? `लॉगिन: ${user.name}` : 'गुगल लॉगिन करा'}
          className="inline-flex items-center gap-1.5 p-1 sm:px-2 sm:py-1 rounded-md text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700 cursor-pointer"
        >
          {user.isLoggedIn ? (
            <>
              <img
                src={user.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80'}
                alt="Profile"
                className="w-5 h-5 rounded-full object-cover border border-amber-400"
              />
              <span className="hidden xl:inline max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
            </>
          ) : (
            <>
              <User className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">लॉगिन</span>
            </>
          )}
        </button>

        {/* Demo Button */}
        <button
          type="button"
          onClick={onLoadDemo}
          title="नमुना माहिती भरा"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors hidden xl:block"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </button>

        {/* Reset Button */}
        <button
          type="button"
          onClick={onReset}
          title="सर्व फॉर्म रिकामा करा"
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        {/* Primary PDF Download & Print Action */}
        <button
          type="button"
          onClick={onPrintAll}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 active:bg-amber-500 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer hover:shadow-md"
          title="प्रिंट करा किंवा PDF म्हणून सेव्ह करा"
        >
          <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
          <span>{adminSettings.textOverrides.printButtonText || 'PDF डाउनलोड / प्रिंट'}</span>
        </button>
      </div>
    </header>
  );
};
