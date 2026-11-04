import React from 'react';
import { STFormData, SelfDeclarationType } from '../../types/form';
import { FileCheck, Sparkles } from 'lucide-react';

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
      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-emerald-950 leading-relaxed">
        <span className="font-bold">महाराष्ट्र शासन (आरटीएस-२०१८) स्वयं घोषणापत्र:</span> खालील १६ अधिकृत दाखल्यांपैकी हवा तो दाखला निवडा. अर्जदाराची माहिती, फोटो आणि सही आपोआप त्या दाखल्यावर लागेल.
      </div>

      {/* Select Certificate */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2">
        <label className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
          <FileCheck className="w-4 h-4 text-indigo-600" />
          <span>दाखल्याचा प्रकार निवडा (Select 1 of 16 Certificates) *</span>
        </label>

        <div className="grid grid-cols-1 gap-1.5 max-h-72 overflow-y-auto pr-1">
          {SELF_DECLARATION_TYPES.map((certName, idx) => (
            <button
              type="button"
              key={certName}
              onClick={() => onChange({ activeSelfDeclarationType: certName })}
              className={`text-left px-3 py-2 rounded-md font-semibold text-xs border transition-all flex items-center justify-between ${
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

      {/* Aadhaar Number input */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2">
        <label className="font-bold text-slate-800 block">
          आधार कार्ड क्रमांक (Aadhaar No. - असल्यास)
        </label>
        <input
          type="text"
          value={data.aadhaarNumber || ''}
          onChange={(e) => onChange({ aadhaarNumber: e.target.value })}
          placeholder="उदा. ४५८७ ९६३२ १५४१"
          className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white font-mono text-sm tracking-wider"
        />
        <p className="text-[11px] text-slate-500">
          हे स्वयं घोषणापत्रात 'आधारकार्ड क्रमांक (असल्यास)' या रकान्यात दिसेल.
        </p>
      </div>
    </div>
  );
};
