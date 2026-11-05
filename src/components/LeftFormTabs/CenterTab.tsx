import React, { useRef, useState, useEffect } from 'react';
import { STFormData, ASSKLogoType } from '../../types/form';
import {
  Building2,
  Upload,
  Trash2,
  Save,
  CheckCircle2,
  Download,
  FileUp,
  ShieldCheck,
  Info,
  HelpCircle
} from 'lucide-react';

export const LOCAL_STORAGE_CENTER_PROFILE_KEY = 'permanent_center_profile_v4';

export interface PermanentCenterProfile {
  centerName: string;
  centerAddress: string;
  centerContact: string;
  subDivisionalOffice?: string;
  subDivisionPlace?: string;
  centerLogoUrl?: string;
  asskLogoOption?: ASSKLogoType;
  customAsskLogoUrl?: string;
  savedAt?: string;
}

interface CenterTabProps {
  data: STFormData;
  onChange: (updates: Partial<STFormData>) => void;
}

export const CenterTab: React.FC<CenterTabProps> = ({ data, onChange }) => {
  const centerLogoInputRef = useRef<HTMLInputElement>(null);
  const customAsskLogoInputRef = useRef<HTMLInputElement>(null);
  const importProfileInputRef = useRef<HTMLInputElement>(null);

  const [savedStatus, setSavedStatus] = useState<string | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Check on mount if there is already a saved permanent profile
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CENTER_PROFILE_KEY);
      if (saved) {
        const parsed: PermanentCenterProfile = JSON.parse(saved);
        if (parsed.savedAt) {
          const date = new Date(parsed.savedAt);
          setLastSavedTime(date.toLocaleDateString('mr-IN', { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (e) {
      console.error('Error reading permanent center profile', e);
    }
  }, []);

  const handleCenterLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const logoData = reader.result as string;
        onChange({ centerLogoUrl: logoData });
        // Auto update saved profile if one exists
        saveToPermanentProfile({ centerLogoUrl: logoData });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomAsskLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const logoData = reader.result as string;
        onChange({
          customAsskLogoUrl: logoData,
          asskLogoOption: 'custom_uploaded'
        });
        saveToPermanentProfile({
          customAsskLogoUrl: logoData,
          asskLogoOption: 'custom_uploaded'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveToPermanentProfile = (overrides?: Partial<PermanentCenterProfile>) => {
    const profileToSave: PermanentCenterProfile = {
      centerName: data.centerName || '',
      centerAddress: data.centerAddress || '',
      centerContact: data.centerContact || '',
      subDivisionalOffice: data.subDivisionalOffice || '',
      subDivisionPlace: data.subDivisionPlace || '',
      centerLogoUrl: data.centerLogoUrl || '',
      asskLogoOption: data.asskLogoOption || 'official_assk',
      customAsskLogoUrl: data.customAsskLogoUrl || '',
      savedAt: new Date().toISOString(),
      ...overrides
    };

    try {
      localStorage.setItem(LOCAL_STORAGE_CENTER_PROFILE_KEY, JSON.stringify(profileToSave));
      const now = new Date().toLocaleDateString('mr-IN', { hour: '2-digit', minute: '2-digit' });
      setLastSavedTime(now);
      setSavedStatus('केंद्राची माहिती व लोगो या कॉम्प्युटरवर कायमस्वरूपी सेव्ह झाले!');
      setTimeout(() => setSavedStatus(null), 4000);
    } catch (e) {
      console.error('Failed to save permanent profile', e);
      alert('माहिती सेव्ह करताना त्रुटी आली. स्टोरेज पूर्ण भरले असू शकते.');
    }
  };

  // Export center profile as JSON file
  const handleExportProfile = () => {
    const profile: PermanentCenterProfile = {
      centerName: data.centerName,
      centerAddress: data.centerAddress,
      centerContact: data.centerContact,
      subDivisionalOffice: data.subDivisionalOffice,
      subDivisionPlace: data.subDivisionPlace,
      centerLogoUrl: data.centerLogoUrl,
      asskLogoOption: data.asskLogoOption,
      customAsskLogoUrl: data.customAsskLogoUrl,
      savedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kendra_profile_${(data.centerName || 'center').replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import center profile from JSON file
  const handleImportProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported: PermanentCenterProfile = JSON.parse(event.target?.result as string);
          onChange({
            centerName: imported.centerName || data.centerName,
            centerAddress: imported.centerAddress || data.centerAddress,
            centerContact: imported.centerContact || data.centerContact,
            subDivisionalOffice: imported.subDivisionalOffice || data.subDivisionalOffice,
            subDivisionPlace: imported.subDivisionPlace || data.subDivisionPlace,
            centerLogoUrl: imported.centerLogoUrl || data.centerLogoUrl,
            asskLogoOption: imported.asskLogoOption || data.asskLogoOption,
            customAsskLogoUrl: imported.customAsskLogoUrl || data.customAsskLogoUrl
          });

          // Save to permanent localStorage
          localStorage.setItem(LOCAL_STORAGE_CENTER_PROFILE_KEY, JSON.stringify(imported));
          setSavedStatus('केंद्राची प्रोफाईल फाईल यशस्वीरित्या इम्पोर्ट केली!');
          setTimeout(() => setSavedStatus(null), 4000);
        } catch {
          alert('अवैध फाईल! कृपया योग्य प्रोफाईल JSON फाईल निवडा.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-4 text-xs">
      
      {/* 1. Device Isolation & Privacy Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border border-emerald-300 p-3.5 rounded-xl text-emerald-950 shadow-xs space-y-1.5">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-[13px]">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>तुमचा लोगो व केंद्राचा डेटा १००% स्वतंत्र व खाजगी आहे!</span>
        </div>
        <p className="text-[11px] text-emerald-800 leading-relaxed">
          हे पोर्टल प्रत्येक ऑपरेटरच्या स्वतःच्या कॉम्प्युटर/मोबाईल ब्राउझरमध्ये स्वतंत्रपणे चालते.
          तुमचा लोगो व माहिती तुमच्याच डिव्हाइसमध्ये सेव्ह राहते.
          <b> इतर कोणीही हे पोर्टल वापरले तरी तुमचा डेटा किंवा लोगो कधीही बदलणार नाही आणि तुमचा लोगो दुसऱ्या कोणाला दिसणार नाही.</b>
        </p>
      </div>

      {/* 2. Permanent Save & Backup Toolbar */}
      <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span className="font-extrabold text-sm text-amber-300">
              माझे केंद्र प्रोफाईल व्यवस्थापन
            </span>
          </div>
          {lastSavedTime && (
            <span className="text-[10px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
              शेवटचे सेव्ह: {lastSavedTime}
            </span>
          )}
        </div>

        <p className="text-[11px] text-slate-300">
          एकदा सेव्ह करा — त्यानंतर नवीन अर्ज भरताना लोगो किंवा पत्ता वारंवार अपलोड करण्याची किंवा टाईप करण्याची अजिबात गरज पडत नाही!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => saveToPermanentProfile()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-lg text-xs shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>कायमस्वरूपी सेव्ह करा (Save Profile)</span>
          </button>

          {/* Export JSON Button */}
          <button
            type="button"
            onClick={handleExportProfile}
            className="inline-flex items-center gap-1 px-2.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold rounded-lg text-xs border border-slate-700 hover:border-slate-600 transition-colors"
            title="केंद्राचा सर्व डेटा व लोगो एका फाईलमध्ये सेव्ह करा"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>बॅकअप फाईल डाऊनलोड</span>
          </button>

          {/* Import JSON Button */}
          <input
            type="file"
            ref={importProfileInputRef}
            onChange={handleImportProfile}
            accept=".json"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => importProfileInputRef.current?.click()}
            className="inline-flex items-center gap-1 px-2.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold rounded-lg text-xs border border-slate-700 hover:border-slate-600 transition-colors"
            title="दुसऱ्या कॉम्प्युटरवर बनवलेला प्रोफाईल फाईल थेट लोड करा"
          >
            <FileUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>इम्पोर्ट करा</span>
          </button>
        </div>

        {/* Success Alert */}
        {savedStatus && (
          <div className="flex items-center gap-2 p-2 bg-emerald-500/20 border border-emerald-400/50 rounded-lg text-emerald-300 text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{savedStatus}</span>
          </div>
        )}
      </div>

      {/* 3. केंद्राचा स्वतःचा लोगो (डाव्या कोपऱ्यात) */}
      <div className="border border-slate-200 rounded-xl p-3 bg-white shadow-2xs">
        <label className="font-extrabold text-slate-900 block mb-1">
          १. आपल्या केंद्राचा लोगो (Left Corner Logo)
        </label>
        <p className="text-[11px] text-slate-500 mb-2.5">
          हा लोगो फॉर्मच्या पहिल्या पानावर डाव्या बाजूला तुमच्या केंद्राच्या नावाशेजारी दिसेल. हा एकदाच निवडावा लागतो.
        </p>

        <div className="flex items-center gap-3">
          {data.centerLogoUrl ? (
            <div className="relative group w-16 h-16 bg-white border-2 border-amber-300 rounded-lg p-1 flex items-center justify-center shadow-xs">
              <img
                src={data.centerLogoUrl}
                alt="Center Logo Preview"
                className="max-h-full max-w-full object-contain"
              />
              <button
                type="button"
                onClick={() => {
                  onChange({ centerLogoUrl: '' });
                  saveToPermanentProfile({ centerLogoUrl: '' });
                }}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-sm hover:bg-red-700"
                title="लोगो काढा"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400">
              <Building2 className="w-7 h-7" />
            </div>
          )}

          <div className="flex-1 space-y-1">
            <input
              type="file"
              ref={centerLogoInputRef}
              onChange={handleCenterLogoUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => centerLogoInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>{data.centerLogoUrl ? 'लोगो बदला (Change)' : 'केंद्राचा लोगो निवडा (PNG/JPG)'}</span>
            </button>
            <div className="text-[10px] text-slate-500">
              (टीप: पारदर्शक पीएनजी (PNG) लोगो वापरल्यास प्रिंट अधिक सुंदर दिसते)
            </div>
          </div>
        </div>
      </div>

      {/* 4. मुख्य आपले सरकार सेवा केंद्र (ASSK) लोगो निवड / बदल (उजव्या कोपऱ्यात) */}
      <div className="border border-slate-200 rounded-xl p-3 bg-white shadow-2xs space-y-2.5">
        <label className="font-extrabold text-slate-900 block">
          २. अधिकृत सरकारी लोगो निवड (Right Header Logo)
        </label>
        <p className="text-[11px] text-slate-500">
          फॉर्मवर उजव्या कोपऱ्यात कोणता लोगो हवा आहे ते निवडा:
        </p>

        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
            data.asskLogoOption === 'official_assk'
              ? 'bg-amber-50 border-amber-500 text-amber-950 font-black shadow-xs'
              : 'bg-white border-slate-200 text-slate-700'
          }`}>
            <input
              type="radio"
              name="asskLogoOption"
              checked={data.asskLogoOption === 'official_assk'}
              onChange={() => {
                onChange({ asskLogoOption: 'official_assk' });
                saveToPermanentProfile({ asskLogoOption: 'official_assk' });
              }}
              className="text-amber-600"
            />
            <span>आपले सरकार (ASSK) अधिकृत</span>
          </label>

          <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
            data.asskLogoOption === 'custom_uploaded'
              ? 'bg-amber-50 border-amber-500 text-amber-950 font-black shadow-xs'
              : 'bg-white border-slate-200 text-slate-700'
          }`}>
            <input
              type="radio"
              name="asskLogoOption"
              checked={data.asskLogoOption === 'custom_uploaded'}
              onChange={() => {
                onChange({ asskLogoOption: 'custom_uploaded' });
                saveToPermanentProfile({ asskLogoOption: 'custom_uploaded' });
              }}
              className="text-amber-600"
            />
            <span>कस्टम लोगो अपलोड</span>
          </label>
        </div>

        {data.asskLogoOption === 'custom_uploaded' && (
          <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
            <input
              type="file"
              ref={customAsskLogoInputRef}
              onChange={handleCustomAsskLogoUpload}
              accept="image/*"
              className="hidden"
            />
            {data.customAsskLogoUrl ? (
              <img src={data.customAsskLogoUrl} alt="Custom" className="w-12 h-12 object-contain border p-0.5 rounded-lg bg-white" />
            ) : null}
            <button
              type="button"
              onClick={() => customAsskLogoInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-slate-800 font-bold"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>नवीन सरकारी लोगो अपलोड करा</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. Center Details Inputs */}
      <div className="space-y-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        {/* Center Name */}
        <div>
          <label className="font-extrabold text-slate-900 block mb-1">
            केंद्राचे नाव (Center Name) *
          </label>
          <input
            type="text"
            value={data.centerName}
            onChange={(e) => onChange({ centerName: e.target.value })}
            onBlur={() => saveToPermanentProfile({ centerName: data.centerName })}
            placeholder="उदा. माऊली डिजिटल सेवा केंद्र पाथवे दिगर"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900 font-bold text-xs"
          />
        </div>

        {/* Center Address */}
        <div>
          <label className="font-extrabold text-slate-900 block mb-1">
            केंद्राचा पत्ता (Center Address)
          </label>
          <input
            type="text"
            value={data.centerAddress}
            onChange={(e) => onChange({ centerAddress: e.target.value })}
            onBlur={() => saveToPermanentProfile({ centerAddress: data.centerAddress })}
            placeholder="उदा. मु. पो. पाथवे दिगर, ता. बागलाण, जि. नाशिक - ४२३३०१"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900 text-xs"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="font-extrabold text-slate-900 block mb-1">
            ऑपरेटर संपर्क क्रमांक (Contact No.)
          </label>
          <input
            type="text"
            value={data.centerContact}
            onChange={(e) => onChange({ centerContact: e.target.value })}
            onBlur={() => saveToPermanentProfile({ centerContact: data.centerContact })}
            placeholder="उदा. ९८२२००००००"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900 font-mono text-xs"
          />
        </div>
      </div>

      {/* 6. Authority (उपविभागीय अधिकारी) */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
        <label className="font-extrabold text-slate-900 block">
          सक्षम प्राधिकारी कार्यालय (SDO Office / उपविभाग)
        </label>
        <p className="text-[11px] text-slate-500">
          तहसीलदार किंवा उपविभागीय अधिकारी कार्यालय (दाखला देणारे कार्यालय):
        </p>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div>
            <span className="text-[11px] font-bold text-slate-700 block mb-0.5">उपविभाग नाव</span>
            <input
              type="text"
              value={data.subDivisionalOffice}
              onChange={(e) => onChange({ subDivisionalOffice: e.target.value })}
              onBlur={() => saveToPermanentProfile({ subDivisionalOffice: data.subDivisionalOffice })}
              placeholder="उदा. बागलाण / कळवण / नाशिक"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900 font-semibold text-xs"
            />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-700 block mb-0.5">ठिकाण</span>
            <input
              type="text"
              value={data.subDivisionPlace}
              onChange={(e) => onChange({ subDivisionPlace: e.target.value })}
              onBlur={() => saveToPermanentProfile({ subDivisionPlace: data.subDivisionPlace })}
              placeholder="उदा. बागलाण"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Final Save Reminder */}
      <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-amber-600" />
          <span>वरील माहिती बदलल्यास "कायमस्वरूपी सेव्ह करा" बटणावर क्लिक करा.</span>
        </span>
      </div>

    </div>
  );
};
