import React, { useRef } from 'react';
import { STFormData } from '../../types/form';
import { Building2, Upload, Trash2 } from 'lucide-react';

interface CenterTabProps {
  data: STFormData;
  onChange: (updates: Partial<STFormData>) => void;
}

export const CenterTab: React.FC<CenterTabProps> = ({ data, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({ centerLogoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-lg text-amber-900 leading-relaxed">
        <span className="font-bold">टीप:</span> हे तपशील फॉर्मच्या पहिल्या पानावर डाव्या कोपऱ्यात (Left Corner) दिसतील. उजव्या बाजूचा अधिकृत आपले सरकार सेवा केंद्र (ASSK) लोगो कायम राहील, आणि जुना पत्ता (करंजखेड) काढून टाकण्यात आला आहे.
      </div>

      {/* Center Logo Upload */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
        <label className="font-bold text-slate-800 block mb-2">
          आपल्या केंद्राचा लोगो (Center Logo)
        </label>
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
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              लोगो अपलोड करा (PNG/JPG)
            </button>
            <p className="text-[11px] text-slate-500 mt-1">
              आपल्या केंद्राचा स्वतंत्र लोगो असल्यास निवडा
            </p>
          </div>
        </div>
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
          className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
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

      {/* Authority (प्रति, उपविभागीय अधिकारी, बागलाण) */}
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
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
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
