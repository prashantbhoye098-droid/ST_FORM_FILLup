import React, { useState, useEffect, useRef } from 'react';
import { STFormData, FormCategory, VillageProfile, UserProfile } from './types/form';
import { AdminSettings, DEFAULT_ADMIN_SETTINGS } from './types/admin';
import {
  DEMO_FORM_DATA,
  EMPTY_FORM_DATA,
  DEFAULT_VILLAGE_PROFILES
} from './constants/initialData';
import { Header } from './components/Header';

import { CenterTab } from './components/LeftFormTabs/CenterTab';
import { ApplicantTab } from './components/LeftFormTabs/ApplicantTab';
import { FamilyTribeTab } from './components/LeftFormTabs/FamilyTribeTab';
import { EducationEvidenceTab } from './components/LeftFormTabs/EducationEvidenceTab';
import { OtherAffidavitTab } from './components/LeftFormTabs/OtherAffidavitTab';
import { VanshavalTreeEditorTab } from './components/LeftFormTabs/VanshavalTreeEditorTab';
import { SignaturesPhotoTab } from './components/LeftFormTabs/SignaturesPhotoTab';
import { IncomeTab } from './components/LeftFormTabs/IncomeTab';
import { SelfDeclarationsTab } from './components/LeftFormTabs/SelfDeclarationsTab';

import { Page1 } from './components/FormPreview/Page1';
import { Page2 } from './components/FormPreview/Page2';
import { Page3 } from './components/FormPreview/Page3';
import { Page4 } from './components/FormPreview/Page4';
import { Page5 } from './components/FormPreview/Page5';
import { Page6 } from './components/FormPreview/Page6';
import { IncomeForm } from './components/FormPreview/IncomeForm';
import { OBCForm } from './components/FormPreview/OBCForm';
import { SelfDeclarationForm } from './components/FormPreview/SelfDeclarationForm';

import { AdminPanelModal } from './components/AdminPanelModal';
import { AuthModal } from './components/AuthModal';
import { PaymentModal } from './components/PaymentModal';
import { BloggerGuideModal } from './components/BloggerGuideModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { SavedProfilesModal } from './components/SavedProfilesModal';

import {
  Building2,
  User,
  Users,
  GraduationCap,
  FileCheck2,
  GitBranch,
  PenTool,
  Coins,
  FileCheck,
  Printer,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Bell,
  Sparkles,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';

const LOCAL_STORAGE_FORM_KEY = 'st_caste_form_data_draft_v4';
const LOCAL_STORAGE_PROFILES_KEY = 'village_saved_profiles_v4';
const LOCAL_STORAGE_ADMIN_KEY = 'assk_admin_settings_v4';
const LOCAL_STORAGE_USER_KEY = 'assk_user_profile_v4';

const DEFAULT_USER: UserProfile = {
  id: 'user_1',
  name: 'प्रशांत रामदास भोये',
  email: 'prashantbhoye098@gmail.com',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  isLoggedIn: true,
  plan: 'free',
  walletBalance: 50
};

export default function App() {
  // Master Admin Settings State
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ADMIN_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_ADMIN_SETTINGS;
    } catch {
      return DEFAULT_ADMIN_SETTINGS;
    }
  });

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  // Session state: has the operator paid ₹10 for the current session's document?
  const [hasPaidCurrentDoc, setHasPaidCurrentDoc] = useState<boolean>(false);

  // Form Data State
  const [formData, setFormData] = useState<STFormData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FORM_KEY);
      let base = saved ? JSON.parse(saved) : DEMO_FORM_DATA;
      return base;
    } catch (e) {
      console.error('Failed to load local storage draft', e);
      return DEMO_FORM_DATA;
    }
  });

  const [villageProfiles, setVillageProfiles] = useState<VillageProfile[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROFILES_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_VILLAGE_PROFILES;
    } catch {
      return DEFAULT_VILLAGE_PROFILES;
    }
  });

  // Modals state
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isBloggerGuideModalOpen, setIsBloggerGuideModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isProfilesModalOpen, setIsProfilesModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<string>('applicant');
  const [activePagePreview, setActivePagePreview] = useState<number>(0); // 0 = all pages, 1..N = specific
  const [zoomLevel, setZoomLevel] = useState<number>(90);
  const [printTarget, setPrintTarget] = useState<'all' | 'single'>('all');

  // Determine if watermark is removed
  const isWatermarkRemoved =
    !adminSettings.payment.isPaymentSystemActive ||
    !adminSettings.watermark.enabled ||
    userProfile.plan !== 'free' ||
    hasPaidCurrentDoc;

  // Sync Form Data with Admin Settings & Watermark dynamically
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      centerName: adminSettings.branding.centerName || prev.centerName,
      centerAddress: adminSettings.branding.centerAddress || prev.centerAddress,
      centerContact: adminSettings.branding.centerContact || prev.centerContact,
      centerLogoUrl: adminSettings.branding.centerLogoUrl || prev.centerLogoUrl,
      watermarkText: adminSettings.watermark.text,
      watermarkSubText: adminSettings.watermark.subText,
      watermarkColor: adminSettings.watermark.color,
      watermarkOpacity: adminSettings.watermark.opacity,
      watermarkFontSize: adminSettings.watermark.fontSize,
      watermarkRotation: adminSettings.watermark.rotation,
      watermarkEnabled: adminSettings.watermark.enabled,
      isWatermarkRemoved: isWatermarkRemoved
    }));
  }, [adminSettings, isWatermarkRemoved]);

  // Total pages based on category
  const getTotalPages = (category: FormCategory): number => {
    if (category === 'ST_CASTE') return 6;
    if (category === 'OBC_SC_CASTE') return 7;
    return 1;
  };

  const totalPages = getTotalPages(formData.activeFormCategory);

  // Auto-save form data
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_FORM_KEY, JSON.stringify(formData));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [formData]);

  // Auto-save Admin settings
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ADMIN_KEY, JSON.stringify(adminSettings));
    } catch (e) {
      console.error('Failed to save admin settings', e);
    }
  }, [adminSettings]);

  // Auto-save User profile
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userProfile));
    } catch (e) {
      console.error('Failed to save user profile', e);
    }
  }, [userProfile]);

  // Auto-save village profiles
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(villageProfiles));
    } catch (e) {
      console.error('Failed to save profiles', e);
    }
  }, [villageProfiles]);

  const updateFormData = (updates: Partial<STFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...updates
    }));
  };

  // Direct Browser Print execution
  const executePrint = (all: boolean = true) => {
    setPrintTarget(all ? 'all' : 'single');
    setTimeout(() => {
      window.print();
    }, 120);
  };

  // Smart Print Handler with Watermark & Pay Check
  const handlePrintRequest = (all: boolean = true) => {
    if (isWatermarkRemoved) {
      executePrint(all);
    } else {
      // Payment required or option to preview
      if (adminSettings.payment.isPaymentSystemActive) {
        setIsPaymentModalOpen(true);
      } else {
        executePrint(all);
      }
    }
  };

  const handleCategoryChange = (category: FormCategory) => {
    updateFormData({ activeFormCategory: category });
    setActivePagePreview(0);
    if (category === 'INCOME_DECLARATION') {
      setActiveTab('income');
    } else if (category === 'SELF_DECLARATIONS_16') {
      setActiveTab('self_decl');
    } else {
      setActiveTab('applicant');
    }
  };

  const handleApplyVillageProfile = (p: VillageProfile) => {
    updateFormData({
      village: p.village,
      taluka: p.taluka,
      district: p.district,
      postOffice: p.postOffice,
      residence1950Place: p.residence1950Place,
      primarySchoolName: p.primarySchoolName,
      primarySchoolVillageTalukaDist: p.primarySchoolVillageTalukaDist,
      secondarySchoolName: p.secondarySchoolName,
      secondarySchoolVillageTalukaDist: p.secondarySchoolVillageTalukaDist,
      relativeVillages: p.relativeVillages,
      deityNames: p.deityNames,
      tribeName: p.tribeName,
      subTribe: p.subTribe
    });
  };

  const handleSaveVillageProfile = (p: VillageProfile) => {
    setVillageProfiles((prev) => [p, ...prev]);
  };

  const handleDeleteVillageProfile = (id: string) => {
    if (window.confirm('हे गाव प्रोफाईल काढून टाकायचे का?')) {
      setVillageProfiles((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleLoadDemo = () => {
    if (window.confirm('नमुना माहिती (Demo Data) लोड करायची आहे का? सध्याचा डेटा बदलेल.')) {
      setFormData({
        ...DEMO_FORM_DATA,
        centerName: adminSettings.branding.centerName || DEMO_FORM_DATA.centerName,
        centerAddress: adminSettings.branding.centerAddress || DEMO_FORM_DATA.centerAddress,
        watermarkText: adminSettings.watermark.text,
        isWatermarkRemoved: isWatermarkRemoved
      });
    }
  };

  const handleReset = () => {
    if (window.confirm('नवीन अर्ज भरण्यासाठी अर्जदाराची माहिती रिकामी करायची का? (केंद्राची माहिती कायम राहील)')) {
      setFormData({
        ...EMPTY_FORM_DATA,
        centerName: adminSettings.branding.centerName || formData.centerName,
        centerAddress: adminSettings.branding.centerAddress || formData.centerAddress,
        centerLogoUrl: adminSettings.branding.centerLogoUrl || formData.centerLogoUrl,
        centerContact: adminSettings.branding.centerContact || formData.centerContact,
        asskLogoOption: formData.asskLogoOption,
        customAsskLogoUrl: formData.customAsskLogoUrl,
        subDivisionalOffice: formData.subDivisionalOffice,
        subDivisionPlace: formData.subDivisionPlace,
        activeFormCategory: formData.activeFormCategory,
        watermarkText: adminSettings.watermark.text,
        isWatermarkRemoved: isWatermarkRemoved
      });
      setHasPaidCurrentDoc(false);
    }
  };

  // Build tabs dynamically based on form category and Admin configuration
  const getTabsForCategory = () => {
    const commonStart = [
      { key: 'center', label: adminSettings.tabs.tabCenter || 'केंद्र व लोगो', icon: Building2 },
      { key: 'applicant', label: adminSettings.tabs.tabApplicant || '१. अर्जदार', icon: User }
    ];

    if (formData.activeFormCategory === 'INCOME_DECLARATION') {
      return [
        ...commonStart,
        { key: 'income', label: adminSettings.tabs.tabIncome || '२. ३ वर्षे उत्पन्न तक्ता', icon: Coins },
        { key: 'signatures', label: adminSettings.tabs.tabSignatures || '३. स्वाक्षरी व फोटो', icon: PenTool }
      ];
    }

    if (formData.activeFormCategory === 'SELF_DECLARATIONS_16') {
      return [
        ...commonStart,
        { key: 'self_decl', label: adminSettings.tabs.tabSelfDecl || '२. १६ दाखले निवड', icon: FileCheck },
        { key: 'signatures', label: adminSettings.tabs.tabSignatures || '३. स्वाक्षरी व फोटो', icon: PenTool }
      ];
    }

    // Caste Certificate Forms (ST or OBC/SC/VJNT/SBC)
    return [
      ...commonStart,
      { key: 'family', label: adminSettings.tabs.tabFamily || '२. कुटुंब व जात', icon: Users },
      { key: 'education', label: adminSettings.tabs.tabEducation || '३. शिक्षण व पुरावे', icon: GraduationCap },
      { key: 'other', label: adminSettings.tabs.tabOther || '४. इतर व पृष्ठ ३', icon: FileCheck2 },
      { key: 'vanshaval', label: adminSettings.tabs.tabVanshaval || '५. वंशावळ व नाव बदल', icon: GitBranch },
      { key: 'signatures', label: adminSettings.tabs.tabSignatures || '६. स्वाक्षरी व फोटो', icon: PenTool }
    ];
  };

  const currentTabs = getTabsForCategory();

  return (
    <>
      {/* SCREEN INTERACTION WORKSPACE (Hidden on Print) */}
      <div
        className="screen-layout print:hidden min-h-screen flex flex-col bg-slate-100 font-devanagari text-slate-900 select-text"
        onContextMenu={(e) => {
          if (adminSettings.watermark.antiScreenshotEnabled && !isWatermarkRemoved) {
            e.preventDefault();
          }
        }}
      >
        
        {/* Top Header with Admin Panel & All Tools */}
        <Header
          onPrintAll={() => handlePrintRequest(true)}
          onLoadDemo={handleLoadDemo}
          onReset={handleReset}
          onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
          onOpenProfiles={() => setIsProfilesModalOpen(true)}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
          onOpenBloggerGuide={() => setIsBloggerGuideModalOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenPayment={() => setIsPaymentModalOpen(true)}
          currentCategory={formData.activeFormCategory}
          onSelectCategory={handleCategoryChange}
          currentPage={activePagePreview}
          onSelectPage={(p) => setActivePagePreview(p)}
          totalPages={totalPages}
          user={userProfile}
          adminSettings={adminSettings}
        />

        {/* Dynamic Top Announcement Banner (Controlled via Admin Panel) */}
        {adminSettings.announcement.enabled && adminSettings.announcement.message && (
          <div
            className={`no-print py-1.5 px-4 text-xs font-bold flex items-center justify-between border-b shadow-2xs ${
              adminSettings.announcement.type === 'warning'
                ? 'bg-amber-400 text-slate-950 border-amber-500'
                : adminSettings.announcement.type === 'success'
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-indigo-900 text-indigo-100 border-indigo-800'
            }`}
          >
            <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
              <Bell className="w-3.5 h-3.5 shrink-0 animate-pulse" />
              <span className="flex-1 truncate">{adminSettings.announcement.message}</span>
              <span className="text-[10px] opacity-80 hidden md:inline">
                माऊली डिजिटल सेवा केंद्र
              </span>
            </div>
          </div>
        )}

        {/* Two-Column Form Builder & Live Preview */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1750px] w-full mx-auto">
          
          {/* LEFT COLUMN: Tabbed Editor */}
          <div className="w-full lg:w-[480px] xl:w-[530px] shrink-0 border-r border-slate-200 bg-white flex flex-col h-[calc(100vh-65px)] shadow-xs">
            
            {/* Tabs Bar */}
            <div className="flex overflow-x-auto border-b border-slate-200 p-1.5 gap-1 bg-slate-50 shrink-0">
              {currentTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    type="button"
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {activeTab === 'center' && (
                <CenterTab data={formData} onChange={updateFormData} />
              )}
              {activeTab === 'applicant' && (
                <ApplicantTab data={formData} onChange={updateFormData} />
              )}
              {activeTab === 'family' && (
                <FamilyTribeTab data={formData} onChange={updateFormData} />
              )}
              {activeTab === 'education' && (
                <EducationEvidenceTab data={formData} onChange={updateFormData} />
              )}
              {activeTab === 'other' && (
                <OtherAffidavitTab data={formData} onChange={updateFormData} />
              )}
              {activeTab === 'vanshaval' && (
                <VanshavalTreeEditorTab data={formData} onChange={updateFormData} />
              )}
              {activeTab === 'signatures' && (
                <SignaturesPhotoTab data={formData} onChange={updateFormData} />
              )}
              {activeTab === 'income' && (
                <IncomeTab data={formData} onChange={updateFormData} />
              )}
              {activeTab === 'self_decl' && (
                <SelfDeclarationsTab data={formData} onChange={updateFormData} />
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-medium">माहिती आपोआप सेव्ह होते</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePrintRequest(true)}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{adminSettings.textOverrides.printButtonText || 'PDF प्रिंट करा'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Real-Time A4 Live Document Preview Canvas */}
          <div className="flex-1 bg-slate-200 flex flex-col h-[calc(100vh-65px)] overflow-hidden relative">
            
            {/* Top Preview Control Bar */}
            <div className="bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 py-2 flex items-center justify-between shrink-0 shadow-2xs z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 hidden sm:inline">
                  थेट प्रिव्ह्यू:
                </span>
                <span className="text-xs font-extrabold text-indigo-900 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                  {formData.activeFormCategory === 'ST_CASTE' && 'अनुसूचित जमाती (ST) - ६ पृष्ठे'}
                  {formData.activeFormCategory === 'OBC_SC_CASTE' && 'OBC / SC / VJNT - ७ पृष्ठे'}
                  {formData.activeFormCategory === 'INCOME_DECLARATION' && 'उत्पन्न प्रपत्र-अ'}
                  {formData.activeFormCategory === 'SELF_DECLARATIONS_16' && formData.activeSelfDeclarationType}
                </span>

                {/* Watermark Status Pill */}
                {isWatermarkRemoved ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>वॉटरमार्कमुक्त (VIP)</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-100 border border-red-300 px-2 py-0.5 rounded-full hover:bg-red-200 cursor-pointer"
                    title="वॉटरमार्क काढण्यासाठी क्लिक करा"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                    <span>वॉटरमार्क सक्रिय (काढा ₹{adminSettings.payment.perPageFee})</span>
                  </button>
                )}
              </div>

              {/* Zoom & Action Buttons */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-0.5 rounded-md">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(60, z - 10))}
                    className="p-1 hover:bg-white rounded text-slate-700"
                    title="झूम कमी करा"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-bold text-slate-700 px-1 font-mono">
                    {zoomLevel}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                    className="p-1 hover:bg-white rounded text-slate-700"
                    title="झूम वाढवा"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(100)}
                    className="p-1 hover:bg-white rounded text-slate-700"
                    title="मूळ आकार (१००%)"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Single Page Print button if a specific page is selected */}
                {totalPages > 1 && activePagePreview !== 0 && (
                  <button
                    type="button"
                    onClick={() => handlePrintRequest(false)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-md shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                    title={`फक्त पृष्ठ ${activePagePreview} प्रिंट करा`}
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>फक्त पृष्ठ {activePagePreview}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handlePrintRequest(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-md shadow-sm transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{totalPages > 1 ? `सर्व ${totalPages} पाने PDF प्रिंट` : 'PDF डाउनलोड / प्रिंट'}</span>
                </button>
              </div>
            </div>

            {/* Document Preview Canvas */}
            <div
              className="preview-scroll-area flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center gap-8 relative select-text"
              onContextMenu={(e) => {
                if (adminSettings.watermark.antiScreenshotEnabled && !isWatermarkRemoved) {
                  e.preventDefault();
                }
              }}
            >
              <div
                className="print-pages-wrapper flex flex-col items-center gap-8 transition-transform origin-top"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                {/* 1. अनुसूचित जमाती (ST) जात प्रमाणपत्र फॉर्म (६ पृष्ठे) */}
                {formData.activeFormCategory === 'ST_CASTE' && (
                  <>
                    {(activePagePreview === 0 || activePagePreview === 1) && (
                      <div className="a4-container">
                        <Page1 data={formData} onUpdate={updateFormData} />
                      </div>
                    )}
                    {(activePagePreview === 0 || activePagePreview === 2) && (
                      <div className="a4-container">
                        <Page2 data={formData} onUpdate={updateFormData} />
                      </div>
                    )}
                    {(activePagePreview === 0 || activePagePreview === 3) && (
                      <div className="a4-container">
                        <Page3 data={formData} onUpdate={updateFormData} />
                      </div>
                    )}
                    {(activePagePreview === 0 || activePagePreview === 4) && (
                      <div className="a4-container">
                        <Page4 data={formData} onUpdate={updateFormData} />
                      </div>
                    )}
                    {(activePagePreview === 0 || activePagePreview === 5) && (
                      <div className="a4-container">
                        <Page5 data={formData} onUpdate={updateFormData} />
                      </div>
                    )}
                    {(activePagePreview === 0 || activePagePreview === 6) && (
                      <div className="a4-container">
                        <Page6 data={formData} onUpdate={updateFormData} />
                      </div>
                    )}
                  </>
                )}

                {/* 2. OBC / SC / VJNT / SBC जात प्रमाणपत्र फॉर्म (७ पृष्ठे) */}
                {formData.activeFormCategory === 'OBC_SC_CASTE' && (
                  <>
                    {(activePagePreview === 0 || activePagePreview === 1) && (
                      <div className="a4-container">
                        <OBCForm data={formData} pageNumber={1} onUpdate={updateFormData} />
                      </div>
                    )}
                    {(activePagePreview === 0 || activePagePreview === 2) && (
                      <div className="a4-container">
                        <OBCForm data={formData} pageNumber={2} onUpdate={updateFormData} />
                      </div>
                    )}
                    {(activePagePreview === 0 || activePagePreview === 3) && (
                      <div className="a4-container">
                        <OBCForm data={formData} pageNumber={3} onUpdate={updateFormData} />
                      </div>
                    )}
                    {(activePagePreview === 0 || activePagePreview === 4) && (
                      <div className="a4-container">
                        <OBCForm data={formData} pageNumber={4} onUpdate={updateFormData} />
                      </div>
                    )}
                    {(activePagePreview === 0 || activePagePreview === 5) && (
                      <div className="a4-container">
                        <OBCForm data={formData} pageNumber={5} onUpdate={updateFormData} />
                      </div>
                    )}
                    {(activePagePreview === 0 || activePagePreview === 6) && (
                      <div className="a4-container">
                        <OBCForm data={formData} pageNumber={6} onUpdate={updateFormData} />
                      </div>
                    )}
                    {(activePagePreview === 0 || activePagePreview === 7) && (
                      <div className="a4-container">
                        <OBCForm data={formData} pageNumber={7} onUpdate={updateFormData} />
                      </div>
                    )}
                  </>
                )}

                {/* 3. उत्पन्नाचा दाखला - प्रपत्र-अ (१ पृष्ठ) */}
                {formData.activeFormCategory === 'INCOME_DECLARATION' && (
                  <div className="a4-container">
                    <IncomeForm data={formData} onUpdate={updateFormData} />
                  </div>
                )}

                {/* 4. १६ शासकीय स्वयं घोषणापत्रे (१ पृष्ठ) */}
                {formData.activeFormCategory === 'SELF_DECLARATIONS_16' && (
                  <div className="a4-container">
                    <SelfDeclarationForm data={formData} onUpdate={updateFormData} />
                  </div>
                )}
              </div>

              {/* Bottom Notice */}
              <div className="text-center text-xs text-slate-500 py-4 max-w-lg">
                'PDF डाउनलोड / प्रिंट' वर क्लिक केल्यावर उघडणाऱ्या विंडोमध्ये Destination / Printer मध्ये <b>"Save as PDF"</b> निवडून स्वच्छ A4 PDF डाऊनलोड करा.
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* DEDICATED PURE PRINT PORTAL (Active ONLY during browser print) */}
      <div className="hidden print:block print-document-root">
        {formData.activeFormCategory === 'ST_CASTE' && (
          (printTarget === 'single' && activePagePreview !== 0
            ? [activePagePreview]
            : [1, 2, 3, 4, 5, 6]
          ).map((pageNum) => (
            <div key={pageNum} className="print-sheet">
              {pageNum === 1 && <Page1 data={formData} onUpdate={updateFormData} />}
              {pageNum === 2 && <Page2 data={formData} onUpdate={updateFormData} />}
              {pageNum === 3 && <Page3 data={formData} onUpdate={updateFormData} />}
              {pageNum === 4 && <Page4 data={formData} onUpdate={updateFormData} />}
              {pageNum === 5 && <Page5 data={formData} onUpdate={updateFormData} />}
              {pageNum === 6 && <Page6 data={formData} onUpdate={updateFormData} />}
            </div>
          ))
        )}

        {formData.activeFormCategory === 'OBC_SC_CASTE' && (
          (printTarget === 'single' && activePagePreview !== 0
            ? [activePagePreview]
            : [1, 2, 3, 4, 5, 6, 7]
          ).map((pageNum) => (
            <div key={pageNum} className="print-sheet">
              <OBCForm data={formData} pageNumber={pageNum} onUpdate={updateFormData} />
            </div>
          ))
        )}

        {formData.activeFormCategory === 'INCOME_DECLARATION' && (
          <div className="print-sheet">
            <IncomeForm data={formData} onUpdate={updateFormData} />
          </div>
        )}

        {formData.activeFormCategory === 'SELF_DECLARATIONS_16' && (
          <div className="print-sheet">
            <SelfDeclarationForm data={formData} onUpdate={updateFormData} />
          </div>
        )}
      </div>

      {/* Master Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        settings={adminSettings}
        onSaveSettings={(newSettings) => setAdminSettings(newSettings)}
        onResetDefault={() => setAdminSettings(DEFAULT_ADMIN_SETTINGS)}
      />

      {/* Google User Profile & Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={userProfile}
        onUpdateUser={(updated) => setUserProfile((prev) => ({ ...prev, ...updated }))}
        onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
        onOpenPayment={() => setIsPaymentModalOpen(true)}
      />

      {/* Payment & Watermark Unlock Modal (₹10/page) */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        user={userProfile}
        pageCount={printTarget === 'single' ? 1 : totalPages}
        onUnlockWatermarkForPrint={() => {
          setHasPaidCurrentDoc(true);
          setTimeout(() => {
            executePrint(printTarget === 'all');
          }, 300);
        }}
        onCreditWallet={(amount) => {
          setUserProfile((prev) => ({
            ...prev,
            walletBalance: Math.max(0, prev.walletBalance + amount)
          }));
        }}
        onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
        onProceedWithWatermark={() => {
          executePrint(printTarget === 'all');
        }}
      />

      {/* Blogger / Blogspot Embedding Guide Modal */}
      <BloggerGuideModal
        isOpen={isBloggerGuideModalOpen}
        onClose={() => setIsBloggerGuideModalOpen(false)}
      />

      {/* Subscription Plans Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        activePlan={userProfile.plan === 'free' ? 'yearly' : (userProfile.plan as 'monthly' | 'yearly')}
        onSelectPlan={(plan) => {
          setUserProfile((prev) => ({ ...prev, plan }));
          setHasPaidCurrentDoc(true);
        }}
      />

      {/* Saved Profiles / Village Templates Modal */}
      <SavedProfilesModal
        isOpen={isProfilesModalOpen}
        onClose={() => setIsProfilesModalOpen(false)}
        profiles={villageProfiles}
        currentFormData={formData}
        onSaveProfile={handleSaveVillageProfile}
        onDeleteProfile={handleDeleteVillageProfile}
        onApplyProfile={handleApplyVillageProfile}
      />
    </>
  );
}
