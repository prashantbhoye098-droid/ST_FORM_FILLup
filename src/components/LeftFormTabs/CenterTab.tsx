import React, { useRef } from 'react';
import { STFormData, ASSKLogoType } from '../../types/form';
import { Building2, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { AapleSarkarLogo } from '../FormPreview/AapleSarkarLogo';

interface CenterTabProps {
  data: STFormData;
  onChange: (updates: Partial<STFormData>) => void;
}

export const CenterTab: React.FC<CenterTabProps> = ({ data, onChange }) => {
  const centerLogoInputRef = useRef<HTMLInputElement>(null);
  const customAsskLogoInputRef = useRef<HTMLInputElement>(null);

  const handleCenterLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({ centerLogoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomAsskLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          customAsskLogoUrl: reader.result as string,
          asskLogoOption: 'custom_uploaded'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-lg text-indigo-950 leading-relaxed">
        <span className="font-bold">कायमस्वरूपी जतन (Auto-saved):</span> केंद्राची सर्व माहिती व लोगो ब्राउझरमध्ये आपोआप सेव्ह राहतात. तुम्ही एकदा भरल्यानंतर वारंवार टाईप करण्याची गरज पडत नाही.
      </div>

      {/* 1. केंद्राचा स्वतःचा लोगो (डाव्या कोपऱ्यात) */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
        <label className="font-bold text-slate-800 block mb-1">
          १. आपल्या केंद्राचा लोगो (Left Corner Logo)
        </label>
        <p className="text-[11px] text-slate-500 mb-2">
          हा लोगो फॉर्मच्या पहिल्या पानावर डाव्या बाजूला तुमच्या केंद्राच्या नावाशेजारी दिसेल.
        </p>

        <div className="flex items-center gap-3">
          {data.centerLogoUrl ? (
            <div className="relative group w-14 h-14 bg-white border border-slate-300 rounded-md p-1 flex items-center justify-center">
              <img
                src={data.centerLogoUrl}
                alt="Center Logo Preview"
                className="max-h-full max-w-full object-contain"
              />
              <button
                type="button"
                onClick={() => onChange({ centerLogoUrl: '' })}
                className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-0.5 shadow-sm hover:bg-red-700"
                title="लोगो काढा"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-14 h-14 bg-slate-200 border border-dashed border-slate-300 rounded-md flex items-center justify-center text-slate-400">
              <Building2 className="w-6 h-6" />
            </div>
          )}

          <div className="flex-1">
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              केंद्राचा लोगो निवडा (PNG/JPG)
            </button>
          </div>
        </div>
      </div>

      {/* 2. मुख्य आपले सरकार सेवा केंद्र (ASSK) लोगो निवड / बदल (उजव्या कोपऱ्यात) */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2">
        <label className="font-bold text-slate-800 block">
          २. अधिकृत सरकारी लोगो निवड (Right Header Logo)
        </label>
        <p className="text-[11px] text-slate-500">
          फॉर्मवर उजव्या कोपऱ्यात कोणता लोगो हवा आहे ते निवडा किंवा स्वतःचा अपलोड करा:
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <label className={`flex items-center gap-2 p-2 rounded border cursor-pointer ${data.asskLogoOption === 'official_assk' ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold' : 'bg-white border-slate-300'}`}>
            <input
              type="radio"
              name="asskLogoOption"
              checked={data.asskLogoOption === 'official_assk'}
              onChange={() => onChange({ asskLogoOption: 'official_assk' })}
              className="text-indigo-600"
            />
            <span>आपले सरकार (ASSK)</span>
          </label>

          <label className={`flex items-center gap-2 p-2 rounded border cursor-pointer ${data.asskLogoOption === 'custom_uploaded' ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold' : 'bg-white border-slate-300'}`}>
            <input
              type="radio"
              name="asskLogoOption"
              checked={data.asskLogoOption === 'custom_uploaded'}
              onChange={() => onChange({ asskLogoOption: 'custom_uploaded' })}
              className="text-indigo-600"
            />
            <span>कस्टम लोगो अपलोड</span>
          </label>
        </div>

        {data.asskLogoOption === 'custom_uploaded' && (
          <div className="pt-2 border-t border-slate-200">
            <input
              type="file"
              ref={customAsskLogoInputRef}
              onChange={handleCustomAsskLogoUpload}
              accept="image/*"
              className="hidden"
            />
            <div className="flex items-center gap-2">
              {data.customAsskLogoUrl && (
                <img src={data.customAsskLogoUrl} alt="Custom" className="w-12 h-12 object-contain border p-0.5 rounded bg-white" />
              )}
              <button
                type="button"
                onClick={() => customAsskLogoInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-700 font-medium hover:bg-slate-50"
              >
                <Upload className="w-3.5 h-3.5" />
                नवीन लोगो निवडा
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Center Name */}
      <div>
        <label className="font-bold text-slate-800 block mb-1">
          केंद्राचे नाव (Center Name) *
        </label>
        <input
          type="text"
          value={data.centerName}
          onChange={(e) => onChange({ centerName: e.target.value })}
          placeholder="उदा. श्री गणेश आपले सरकार सेवा केंद्र"
          className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-bold"
        />
      </div>

      {/* Center Address */}
      <div>
        <label className="font-bold text-slate-800 block mb-1">
          केंद्राचा पत्ता (Center Address)
        </label>
        <input
          type="text"
          value={data.centerAddress}
          onChange={(e) => onChange({ centerAddress: e.target.value })}
          placeholder="उदा. मुख्य बाजारपेठ, सटाणा ता. बागलाण, जि. नाशिक"
          className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
        />
      </div>

      {/* Contact */}
      <div>
        <label className="font-bold text-slate-800 block mb-1">
          ऑपरेटर संपर्क क्रमांक (Contact No.)
        </label>
        <input
          type="text"
          value={data.centerContact}
          onChange={(e) => onChange({ centerContact: e.target.value })}
          placeholder="उदा. ९८२२xxxxxx"
          className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
        />
      </div>

      {/* Authority (उपविभागीय अधिकारी) */}
      <div className="pt-2 border-t border-slate-200">
        <label className="font-bold text-slate-800 block mb-1">
          सक्षम प्राधिकारी कार्यालय (SDO Office / उपविभाग)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[11px] text-slate-500 block mb-0.5">उपविभाग नाव</span>
            <input
              type="text"
              value={data.subDivisionalOffice}
              onChange={(e) => onChange({ subDivisionalOffice: e.target.value })}
              placeholder="उदा. बागलाण / कळवण / नाशिक"
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-semibold"
            />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block mb-0.5">ठिकाण</span>
            <input
              type="text"
              value={data.subDivisionPlace}
              onChange={(e) => onChange({ subDivisionPlace: e.target.value })}
              placeholder="उदा. बागलाण"
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
