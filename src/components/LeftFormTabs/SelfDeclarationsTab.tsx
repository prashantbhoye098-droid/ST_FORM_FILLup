import React from 'react';
import { STFormData, SelfDeclarationType } from '../../types/form';
import { FileCheck, Sparkles, User, Users, MapPin, Calendar } from 'lucide-react';

interface SelfDeclarationsTabProps {
  data: STFormData;
  onChange: (updates: Partial<STFormData>) => void;
}

export const SELF_DECLARATION_TYPES: SelfDeclarationType[] = [
  'रहिवास प्रमाणपत्र',
  'विधवा असल्याचा दाखला',
  'परितक्त्या असल्याचा दाखला',
  'विभक्त कुटुंबाचा दाखला',
  'नोकरी व्यवसायासाठी ना-हरकत प्रमाणपत्र',
  'बेरोजगार प्रमाणपत्र',
  'हयातीचा दाखला',
  'शौचालय दाखला',
  'नळ जोडणीसाठी अनुमती प्रमाणपत्र',
  'चारित्र्याचा दाखला',
  'विजेच्या जोडणीसाठी ना-हरकत प्रमाणपत्र',
  'जिल्हा परिषद फंडातून कृषी साहित्य खरेदी',
  'राष्ट्रीय बायोगॅस व खत व्यवस्थापन कार्यक्रम',
  'बचत गटांना खेळते भाग भांडवल बँक मार्फत कर्ज पुरवठा',
  'कोणत्याही योजनेचा लाभ न घेतल्याचे प्रमाणपत्र',
  'निराधार योजनेसाठी वयाचा दाखला'
];

export const SelfDeclarationsTab: React.FC<SelfDeclarationsTabProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4 text-xs">
      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-emerald-950 leading-relaxed shadow-2xs">
        <span className="font-bold">महाराष्ट्र शासन (आरटीएस-२०१८) स्वयं घोषणापत्र:</span> खालील १६ अधिकृत दाखल्यांपैकी हवा तो दाखला निवडा. अर्जदाराची व वडिलांची/पतीची माहिती भरताच दाखला तयार होतो.
      </div>

      {/* 1. Select Certificate */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2">
        <label className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
          <FileCheck className="w-4 h-4 text-indigo-600" />
          <span>१. दाखल्याचा प्रकार निवडा (Select 1 of 16 Certificates) *</span>
        </label>

        <div className="grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto pr-1">
          {SELF_DECLARATION_TYPES.map((certName, idx) => (
            <button
              type="button"
              key={certName}
              onClick={() => onChange({ activeSelfDeclarationType: certName })}
              className={`text-left px-3 py-2 rounded-md font-semibold text-xs border transition-all flex items-center justify-between cursor-pointer ${
                data.activeSelfDeclarationType === certName
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
              }`}
            >
              <span>{idx + 1}. {certName}</span>
              {data.activeSelfDeclarationType === certName && (
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Applicant & Father's / Husband's Name Input (Prominently Added as Requested!) */}
      <div className="border-2 border-indigo-300 rounded-xl p-3.5 bg-indigo-50/40 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 border-b border-indigo-200 pb-2">
          <Users className="w-4 h-4 text-indigo-700" />
          <span className="font-black text-indigo-950 text-xs uppercase tracking-wide">
            २. अर्जदार व वडिलांचे / पतीचे नाव (Father / Husband Details)
          </span>
        </div>

        {/* Applicant Name */}
        <div>
          <label className="block text-[11px] font-bold text-slate-800 mb-1">
            अर्जदाराचे संपूर्ण नाव (Applicant Full Name) *
          </label>
          <input
            type="text"
            value={data.applicantName || ''}
            onChange={(e) => onChange({ applicantName: e.target.value })}
            placeholder="उदा. प्रशांत रामदास भोये"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white font-semibold text-slate-900"
          />
        </div>

        {/* Father's / Husband's Name */}
        <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-300">
          <label className="block text-[11px] font-black text-amber-950 mb-1 flex items-center gap-1">
            <span className="text-red-600 font-bold">*</span>
            <span>वडिलांचे / पतीचे नाव (Father's / Husband's Name):</span>
          </label>
          <input
            type="text"
            value={data.fatherName || ''}
            onChange={(e) => onChange({ fatherName: e.target.value })}
            placeholder="उदा. रामदास यशवंत भोये"
            className="w-full px-3 py-2 border border-amber-400 rounded-md bg-white font-bold text-slate-900 shadow-2xs focus:ring-2 focus:ring-amber-500"
          />
          <p className="text-[10px] text-amber-800 font-medium mt-1">
            💡 हे नाव १६ दाखल्यांमध्ये "श्री. [वडिलांचे नाव] यांचा मुलगा / मुलगी / पत्नी" या ठिकाणी थेट दिसेल.
          </p>
        </div>

        {/* Relation & Gender */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-800 mb-1">
              नाते संबंध (Relation)
            </label>
            <select
              value={data.gender || 'पुरुष'}
              onChange={(e) => onChange({ gender: e.target.value as any })}
              className="w-full px-2.5 py-2 border border-slate-300 rounded-md bg-white font-bold text-slate-800"
            >
              <option value="पुरुष">मुलगा (Son)</option>
              <option value="स्त्री">मुलगी (Daughter)</option>
              <option value="पत्नी">पत्नी (Wife)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-800 mb-1">
              वय (Age)
            </label>
            <input
              type="number"
              value={data.age || ''}
              onChange={(e) => onChange({ age: Number(e.target.value) })}
              placeholder="उदा. १९"
              className="w-full px-2.5 py-2 border border-slate-300 rounded-md bg-white font-bold text-slate-800"
            />
          </div>
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-[11px] font-bold text-slate-800 mb-1">
            व्यवसाय (Occupation)
          </label>
          <input
            type="text"
            value={data.applicantCurrentOccupation || ''}
            onChange={(e) => onChange({ applicantCurrentOccupation: e.target.value })}
            placeholder="उदा. शेती / शिक्षण / नोकरी"
            className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-900"
          />
        </div>
      </div>

      {/* 3. Address & Aadhaar */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2.5">
        <label className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-600" />
          <span>३. पत्ता व आधार क्रमांक</span>
        </label>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-0.5">गाव / मु. पो.</label>
            <input
              type="text"
              value={data.village || ''}
              onChange={(e) => onChange({ village: e.target.value })}
              placeholder="गाव"
              className="w-full px-2 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-0.5">तालुका</label>
            <input
              type="text"
              value={data.taluka || ''}
              onChange={(e) => onChange({ taluka: e.target.value })}
              placeholder="तालुका"
              className="w-full px-2 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-0.5">जिल्हा</label>
            <input
              type="text"
              value={data.district || ''}
              onChange={(e) => onChange({ district: e.target.value })}
              placeholder="जिल्हा"
              className="w-full px-2 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
            />
          </div>
        </div>

        {/* Aadhaar Number */}
        <div>
          <label className="block text-[11px] font-bold text-slate-800 mb-1">
            आधार कार्ड क्रमांक (Aadhaar No. - असल्यास)
          </label>
          <input
            type="text"
            value={data.aadhaarNumber || ''}
            onChange={(e) => onChange({ aadhaarNumber: e.target.value })}
            placeholder="उदा. ४५८७ ९६३२ १५४१"
            className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white font-mono text-xs tracking-wider"
          />
        </div>
      </div>

      {/* 4. Place & Date */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-800 mb-1">ठिकाण</label>
          <input
            type="text"
            value={data.declarationPlace || ''}
            onChange={(e) => onChange({ declarationPlace: e.target.value })}
            placeholder="उदा. बागलाण"
            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-800 mb-1">दिनांक</label>
          <input
            type="text"
            value={data.customDate || ''}
            onChange={(e) => onChange({ customDate: e.target.value })}
            placeholder="उदा. ०३/११/२०२६"
            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white font-mono text-xs"
          />
        </div>
      </div>
    </div>
  );
};
