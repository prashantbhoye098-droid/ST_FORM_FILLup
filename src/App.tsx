import React, { useState, useEffect, useRef } from 'react';
import { STFormData } from './types/form';
import { DEMO_FORM_DATA, EMPTY_FORM_DATA } from './constants/initialData';
import { Header } from './components/Header';

import { CenterTab } from './components/LeftFormTabs/CenterTab';
import { ApplicantTab } from './components/LeftFormTabs/ApplicantTab';
import { FamilyTribeTab } from './components/LeftFormTabs/FamilyTribeTab';
import { EducationEvidenceTab } from './components/LeftFormTabs/EducationEvidenceTab';
import { OtherAffidavitTab } from './components/LeftFormTabs/OtherAffidavitTab';
import { VanshavalTreeEditorTab } from './components/LeftFormTabs/VanshavalTreeEditorTab';
import { SignaturesPhotoTab } from './components/LeftFormTabs/SignaturesPhotoTab';

import { Page1 } from './components/FormPreview/Page1';
import { Page2 } from './components/FormPreview/Page2';
import { Page3 } from './components/FormPreview/Page3';
import { Page4 } from './components/FormPreview/Page4';
import { Page5 } from './components/FormPreview/Page5';
import { Page6 } from './components/FormPreview/Page6';

import {
  Building2,
  User,
  Users,
  GraduationCap,
  FileCheck2,
  GitBranch,
  PenTool,
  Printer,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';

type TabKey = 'center' | 'applicant' | 'family' | 'education' | 'other' | 'vanshaval' | 'signatures';

const LOCAL_STORAGE_KEY = 'st_caste_form_data_draft_v2';

export default function App() {
  const [formData, setFormData] = useState<STFormData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load local storage draft', e);
    }
    return DEMO_FORM_DATA;
  });

  const [activeTab, setActiveTab] = useState<TabKey>('applicant');
  const [activePagePreview, setActivePagePreview] = useState<number>(0); // 0 = all pages, 1 to 6 = individual
  const [zoomLevel, setZoomLevel] = useState<number>(90); // percentage for preview
  const fileImportRef = useRef<HTMLInputElement>(null);

  // Auto-save draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.error('Failed to save draft to localStorage', e);
    }
  }, [formData]);

  const updateFormData = (updates: Partial<STFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...updates
    }));
  };

  const handlePrint = (printAll: boolean = true) => {
    if (printAll && activePagePreview !== 0) {
      setActivePagePreview(0);
      setTimeout(() => {
        window.print();
      }, 150);
    } else {
      window.print();
    }
  };

  const handleLoadDemo = () => {
    if (window.confirm('नमुना माहिती (Demo Data) लोड करायची आहे का? सध्याचा डेटा बदलेल.')) {
      setFormData(DEMO_FORM_DATA);
    }
  };

  const handleReset = () => {
    if (window.confirm('सर्व फॉर्म रिकामा (Clear) करायचा आहे का?')) {
      setFormData(EMPTY_FORM_DATA);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    const filename = `${formData.applicantName || 'ST_Form'}_${Date.now()}.json`;
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          setFormData(parsed);
          alert('माहिती यशस्वीरित्या लोड केली!');
        } catch (err) {
          alert('अवैध JSON फाईल!');
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'center', label: 'केंद्र तपशील', icon: Building2 },
    { key: 'applicant', label: '१. अर्जदार', icon: User },
    { key: 'family', label: '२. कुटुंब व जात', icon: Users },
    { key: 'education', label: '३. शिक्षण व पुरावे', icon: GraduationCap },
    { key: 'other', label: '४. इतर व पृष्ठ ३', icon: FileCheck2 },
    { key: 'vanshaval', label: '५. वंशावळ व नाव बदल', icon: GitBranch },
    { key: 'signatures', label: '६. स्वाक्षरी व फोटो', icon: PenTool }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-devanagari text-slate-900">
      {/* Hidden file input for import */}
      <input
        type="file"
        ref={fileImportRef}
        onChange={handleImportJson}
        accept=".json"
        className="hidden"
      />

      {/* Top Bar strictly compliant with the Top Bar Contract */}
      <Header
        onPrintAll={() => handlePrint(true)}
        onLoadDemo={handleLoadDemo}
        onReset={handleReset}
        onExportJson={handleExportJson}
        onImportJson={() => fileImportRef.current?.click()}
        currentPage={activePagePreview}
        onSelectPage={(p) => setActivePagePreview(p)}
      />

      {/* Main Responsive Two-Column Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1700px] w-full mx-auto">
        
        {/* LEFT COLUMN: Tab Navigation & Form Fields (Editor) */}
        <div className="no-print w-full lg:w-[480px] xl:w-[520px] shrink-0 border-r border-slate-200 bg-white flex flex-col h-[calc(100vh-55px)] shadow-xs">
          
          {/* Tabs Navigation Strip */}
          <div className="flex overflow-x-auto border-b border-slate-200 p-1.5 gap-1 bg-slate-50 shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  type="button"
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
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

          {/* Form Content Scrollable Area */}
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
          </div>

          {/* Left Footer Action Strip */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
            <span className="truncate max-w-[220px]">
              {formData.applicantName ? `अर्जदार: ${formData.applicantName}` : 'अर्जदार: माहिती भरा'}
            </span>
            <button
              type="button"
              onClick={() => handlePrint(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              प्रिंट करा (Print)
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Authentic PDF-accurate Form Preview */}
        <div className="flex-1 flex flex-col h-[calc(100vh-55px)] bg-slate-200/80 overflow-hidden">
          
          {/* Preview Toolbar (Page Selectors, Zoom, Print Helper) */}
          <div className="no-print bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 py-2 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
            {/* Page Filter Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto text-xs">
              <span className="text-slate-500 font-semibold mr-1 hidden sm:inline">पृष्ठ:</span>
              {[
                { num: 0, label: 'सर्व ६ पाने' },
                { num: 1, label: '१' },
                { num: 2, label: '२' },
                { num: 3, label: '३' },
                { num: 4, label: '४' },
                { num: 5, label: '५' },
                { num: 6, label: '६' }
              ].map((p) => (
                <button
                  type="button"
                  key={p.num}
                  onClick={() => setActivePagePreview(p.num)}
                  className={`px-2.5 py-1 rounded-sm text-xs font-bold transition-colors ${
                    activePagePreview === p.num
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Zoom Controls & Print Button */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-0.5 rounded-md">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(60, z - 10))}
                  title="झूम कमी करा"
                  className="p-1 hover:bg-white rounded text-slate-700"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-bold text-slate-700 px-1 font-mono">
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                  title="झूम वाढवा"
                  className="p-1 hover:bg-white rounded text-slate-700"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(100)}
                  title="मूळ आकार (१००%)"
                  className="p-1 hover:bg-white rounded text-slate-700"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {activePagePreview !== 0 && (
                <button
                  type="button"
                  onClick={() => handlePrint(false)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-md shadow-xs transition-colors whitespace-nowrap"
                  title={`फक्त चालू पृष्ठ ${activePagePreview} प्रिंट करा`}
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>फक्त पृष्ठ {activePagePreview}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => handlePrint(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-md shadow-xs transition-colors whitespace-nowrap"
              >
                <Printer className="w-4 h-4" />
                <span>सर्व ६ पाने प्रिंट करा</span>
              </button>
            </div>
          </div>

          {/* Document Preview Canvas Area */}
          <div className="preview-scroll-area flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center gap-8">
            <div
              className="print-pages-wrapper flex flex-col items-center gap-8 transition-transform origin-top"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              {/* Page 1: नमुना "अ" */}
              {(activePagePreview === 0 || activePagePreview === 1) && (
                <div className="a4-container">
                  <Page1 data={formData} onUpdate={updateFormData} />
                </div>
              )}

              {/* Page 2: स्थलांतर, शिक्षण व पुरावे */}
              {(activePagePreview === 0 || activePagePreview === 2) && (
                <div className="a4-container">
                  <Page2 data={formData} onUpdate={updateFormData} />
                </div>
              )}

              {/* Page 3: इतर माहिती, देवदेवता, प्रतिज्ञा व सही */}
              {(activePagePreview === 0 || activePagePreview === 3) && (
                <div className="a4-container">
                  <Page3 data={formData} onUpdate={updateFormData} />
                </div>
              )}

              {/* Page 4: नमुना "अ-१" शपथपत्र व साक्षीदार */}
              {(activePagePreview === 0 || activePagePreview === 4) && (
                <div className="a4-container">
                  <Page4 data={formData} onUpdate={updateFormData} />
                </div>
              )}

              {/* Page 5: नमुना ३ वंशावळ चार्ट व नाव बदल */}
              {(activePagePreview === 0 || activePagePreview === 5) && (
                <div className="a4-container">
                  <Page5 data={formData} onUpdate={updateFormData} />
                </div>
              )}

              {/* Page 6: प्रपत्र -अ-ब स्वयं घोषणापत्र व फोटो */}
              {(activePagePreview === 0 || activePagePreview === 6) && (
                <div className="a4-container">
                  <Page6 data={formData} onUpdate={updateFormData} />
                </div>
              )}
            </div>

            {/* Print Help Note at bottom */}
            <div className="no-print text-center text-xs text-slate-500 max-w-xl my-6 bg-white/70 p-3 rounded-lg border border-slate-300">
              <span className="font-bold text-slate-700">प्रिंटिंग टीप (Printing Guide):</span>{' '}
              प्रिंट करताना ब्राऊझरच्या Print विंडोमध्ये 'More settings' वर क्लिक करा. 'Headers and footers' अनचेक (Uncheck) करा आणि 'Background graphics' चेक (Check) करा, जेणेकरून सर्व ६ पाने हुबेहूब सरकारी फॉर्मप्रमाणे स्वच्छ प्रिंट होतील.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
