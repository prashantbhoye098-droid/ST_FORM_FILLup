import React from 'react';
import { STFormData, YesNo } from '../../types/form';
import { getTodayFormatted } from '../../constants/initialData';

interface OtherAffidavitTabProps {
  data: STFormData;
  onChange: (updates: Partial<STFormData>) => void;
}

export const OtherAffidavitTab: React.FC<OtherAffidavitTabProps> = ({ data, onChange }) => {
  const renderYesNoSwitch = (label: string, field: keyof STFormData, val: YesNo) => {
    return (
      <div className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-md">
        <span className="text-slate-800 text-xs font-medium pr-2">{label}</span>
        <div className="inline-flex rounded-md p-0.5 bg-slate-100 shrink-0">
          <button
            type="button"
            onClick={() => onChange({ [field]: 'होय' })}
            className={`px-2.5 py-1 text-xs font-bold rounded-sm transition-colors ${
              val === 'होय'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            होय
          </button>
          <button
            type="button"
            onClick={() => onChange({ [field]: 'नाही' })}
            className={`px-2.5 py-1 text-xs font-bold rounded-sm transition-colors ${
              val === 'नाही'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            नाही
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 text-xs">
      {/* ६. इतर माहिती (पृष्ठ ३) */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
        <div className="font-bold text-sm text-slate-800 border-b pb-1 border-slate-200">
          ६. इतर माहिती (पृष्ठ ३ तपशील)
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">
            ६(अ) नातेवाईक राहत असलेल्या ५ गावांची नावे *
          </label>
          <input
            type="text"
            value={data.relativeVillages}
            onChange={(e) => onChange({ relativeVillages: e.target.value })}
            placeholder="उदा. डांगसौंदाणे, मुल्हेर, वीरगाव, नामपूर, ताहराबाद"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
          />
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">
            ६(ब) अनुसूचित जमातीच्या देवदेवतांची नावे *
          </label>
          <input
            type="text"
            value={data.deityNames}
            onChange={(e) => onChange({ deityNames: e.target.value })}
            placeholder="उदा. कणसरा माता, भवानी माता, डोंगरदेव, नारंदेव"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            ६(क) धर्मांतर केले असल्यास पूर्वीच्या देवदेवतांचे नाव
          </label>
          <input
            type="text"
            value={data.convertedDeityNames}
            onChange={(e) => onChange({ convertedDeityNames: e.target.value })}
            placeholder="लागू नसल्यास 'लागू नाही' लिहा"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          />
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">
            ७. वडिलांचे / आजोबांचे मूळ गाव, तहसील व जिल्हा *
          </label>
          <input
            type="text"
            value={data.fatherAncestorOriginalVillage}
            onChange={(e) => onChange({ fatherAncestorOriginalVillage: e.target.value })}
            placeholder="उदा. मु. पो. अंबासन, ता. बागलाण, जि. नाशिक"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
          />
        </div>
      </div>

      {/* पृष्ठ ३ मधील होय / नाही प्रश्न */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2.5">
        <div className="font-bold text-sm text-slate-800 border-b pb-1 border-slate-200">
          पृष्ठ ३ मधील होय/नाही पर्याय
        </div>

        {renderYesNoSwitch('८. मूळ गावासंबंधी पुरावा उपलब्ध आहे काय?', 'hasOriginalVillageProof', data.hasOriginalVillageProof)}
        {renderYesNoSwitch('९(अ) पूर्वी जात प्रमाणपत्र किंवा शासकीय सवलती घेतल्या आहेत का?', 'hasGovtBenefitsOrCert', data.hasGovtBenefitsOrCert)}
        {renderYesNoSwitch('९(ब) नमुना अ-१ मधील शपथपत्र अर्जासोबत जोडले आहे काय?', 'affidavitFormA1Attached', data.affidavitFormA1Attached)}
        {renderYesNoSwitch('१०(अ) पूर्वी सक्षम प्राधिकाऱ्याकडे अर्ज केला होता काय?', 'hasPreviousApplication', data.hasPreviousApplication)}
        {renderYesNoSwitch('१०(ब) नातेवाईकांचे जात वैधता प्रमाणपत्र आहे काय?', 'hasRelativeValidityCert', data.hasRelativeValidityCert)}

        {data.hasRelativeValidityCert === 'होय' && (
          <div className="pt-2">
            <label className="font-semibold text-slate-800 block mb-1">
              वैधता प्रमाणपत्राचा सविस्तर तपशील (नमुना अ-१ व पृष्ठ ३ साठी)
            </label>
            <textarea
              rows={2}
              value={data.relativeValidityDetails || ''}
              onChange={(e) => onChange({ relativeValidityDetails: e.target.value })}
              placeholder="उदा. काका श्री. सोमनाथ यशवंत भोये यांना नाशिक पडताळणी समितीने दिलेले वैधता प्रमाणपत्र क्र. ६५४३/२०२१"
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 text-xs"
            />
          </div>
        )}
      </div>

      {/* ठिकाण व स्वयंचलित दिनांक (User Requirement) */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
        <div className="font-bold text-sm text-slate-800 border-b pb-1 border-slate-200">
          ठिकाण व दिनांक पर्याय (Date & Place)
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">
            ठिकाण (Place) *
          </label>
          <input
            type="text"
            value={data.declarationPlace}
            onChange={(e) => onChange({ declarationPlace: e.target.value })}
            placeholder="उदा. बागलाण / सटाणा / नाशिक"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-bold"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-bold text-slate-800">
              दिनांक (Date)
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-indigo-700 font-semibold text-[11px]">
              <input
                type="checkbox"
                checked={data.isAutoDateEnabled}
                onChange={(e) => onChange({ isAutoDateEnabled: e.target.checked })}
                className="rounded-xs text-indigo-600"
              />
              <span>प्रिंटच्या दिवशी आपोआप आजचा दिनांक घ्या (Automatic)</span>
            </label>
          </div>

          {data.isAutoDateEnabled ? (
            <div className="px-3 py-2 bg-emerald-50 border border-emerald-300 rounded-md text-emerald-950 font-mono font-bold flex items-center justify-between">
              <span>आजचा दिनांक: {getTodayFormatted()}</span>
              <span className="text-[10px] text-emerald-700 uppercase">Auto Sync Active</span>
            </div>
          ) : (
            <input
              type="text"
              value={data.customDate || ''}
              onChange={(e) => onChange({ customDate: e.target.value })}
              placeholder="उदा. 15/08/2026 किंवा DD/MM/YYYY"
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-mono"
            />
          )}
        </div>
      </div>

      {/* नमुना अ-१ मधील नातेवाईक व साक्षीदार तपशील */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
        <div className="font-bold text-sm text-slate-800 border-b pb-1 border-slate-200">
          पृष्ठ ४ (नमुना अ-१) नातेवाईक व साक्षीदार माहिती
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              वैधता असलेले नातेवाईकाचे नाव
            </label>
            <input
              type="text"
              value={data.relativeWithValidityName}
              onChange={(e) => onChange({ relativeWithValidityName: e.target.value })}
              placeholder="उदा. सोमनाथ यशवंत भोये"
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              अर्जदाराशी नाते (Relationship)
            </label>
            <input
              type="text"
              value={data.relativeWithValidityRelation}
              onChange={(e) => onChange({ relativeWithValidityRelation: e.target.value })}
              placeholder="उदा. चुलते (काका) / सख्खा भाऊ"
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">
            साक्षीदाराचे पूर्ण नाव (Witness Name) *
          </label>
          <input
            type="text"
            value={data.witnessName}
            onChange={(e) => onChange({ witnessName: e.target.value })}
            placeholder="उदा. ज्ञानेश्वर बाबुराव मोरे"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            साक्षीदाराचा पत्ता
          </label>
          <input
            type="text"
            value={data.witnessAddress || ''}
            onChange={(e) => onChange({ witnessAddress: e.target.value })}
            placeholder="उदा. रा. अंबासन, ता. बागलाण"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          />
        </div>
      </div>
    </div>
  );
};
