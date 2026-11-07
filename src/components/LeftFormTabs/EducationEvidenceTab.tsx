import React from 'react';
import { STFormData, YesNo } from '../../types/form';

interface EducationEvidenceTabProps {
  data: STFormData;
  onChange: (updates: Partial<STFormData>) => void;
}

export const EducationEvidenceTab: React.FC<EducationEvidenceTabProps> = ({ data, onChange }) => {
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
      {/* स्थलांतर माहिती */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
        <div className="font-bold text-sm text-slate-800 border-b pb-1 border-slate-200">
          ४. इतर गावी वास्तव्याची माहिती (स्थलांतर)
        </div>

        <div className="flex items-center gap-4">
          <label className="font-semibold text-slate-700">
            मूळ गावाव्यतिरिक्त इतर गावात राहता का?
          </label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="livingInOtherVillage"
                checked={data.livingInOtherVillage}
                onChange={() => onChange({ livingInOtherVillage: true })}
                className="text-indigo-600"
              />
              <span>होय</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="livingInOtherVillage"
                checked={!data.livingInOtherVillage}
                onChange={() => onChange({ livingInOtherVillage: false })}
                className="text-indigo-600"
              />
              <span>नाही (मूळ गावातच)</span>
            </label>
          </div>
        </div>

        {data.livingInOtherVillage && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">४(ब) इतर गावाचे नाव</label>
              <input
                type="text"
                value={data.otherVillageName}
                onChange={(e) => onChange({ otherVillageName: e.target.value })}
                placeholder="उदा. नाशिक"
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">४(क) मूळ गाव सोडल्याचे वर्ष</label>
              <input
                type="text"
                value={data.yearLeftOriginalVillage}
                onChange={(e) => onChange({ yearLeftOriginalVillage: e.target.value })}
                placeholder="उदा. २०१०"
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              ४(ड) मूळ गाव सोडल्याचे कारण
            </label>
            <select
              value={data.reasonLeftOriginalVillage}
              onChange={(e) => onChange({ reasonLeftOriginalVillage: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            >
              <option value="शिक्षण">शिक्षण</option>
              <option value="नोकरी">नोकरी</option>
              <option value="इतर">इतर</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              ४(ई) सध्याच्या गावात राहण्याचे कारण
            </label>
            <select
              value={data.reasonLivingCurrentVillage}
              onChange={(e) => onChange({ reasonLivingCurrentVillage: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            >
              <option value="शिक्षण">शिक्षण</option>
              <option value="नोकरी">नोकरी</option>
              <option value="इतर">इतर</option>
            </select>
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">
            ४(फ) जन्म ठिकाण (Birth Place) *
          </label>
          <input
            type="text"
            value={data.birthPlace}
            onChange={(e) => onChange({ birthPlace: e.target.value })}
            placeholder="उदा. गाव, ता. ..., जि. ..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
          />
        </div>
      </div>

      {/* शाळा व महाविद्यालय माहिती (Education) */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
        <div className="font-bold text-sm text-slate-800 border-b pb-1 border-slate-200">
          शिक्षण तपशील (Education Information)
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">
            ४(ग) प्राथमिक शाळेचे नाव *
          </label>
          <input
            type="text"
            value={data.primarySchoolName}
            onChange={(e) => onChange({ primarySchoolName: e.target.value })}
            placeholder="उदा. शाळेचे नाव"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            प्राथमिक शाळा गाव, तहसील व जिल्हा
          </label>
          <input
            type="text"
            value={data.primarySchoolVillageTalukaDist}
            onChange={(e) => onChange({ primarySchoolVillageTalukaDist: e.target.value })}
            placeholder="उदा. गाव, ता. ..., जि. ..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          />
        </div>

        <div className="pt-1">
          <label className="font-bold text-slate-800 block mb-1">
            ४(ह) माध्यमिक शाळा / महाविद्यालयाचे नाव *
          </label>
          <input
            type="text"
            value={data.secondarySchoolName}
            onChange={(e) => onChange({ secondarySchoolName: e.target.value })}
            placeholder="उदा. माध्यमिक शाळा / महाविद्यालयाचे नाव"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            माध्यमिक शाळा / कॉलेज गाव, तहसील व जिल्हा
          </label>
          <input
            type="text"
            value={data.secondarySchoolVillageTalukaDist}
            onChange={(e) => onChange({ secondarySchoolVillageTalukaDist: e.target.value })}
            placeholder="उदा. गाव, ता. ..., जि. ..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          />
        </div>
      </div>

      {/* ५. पुरावे तपासणी (Evidence Checklist) */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2.5">
        <div className="flex items-center justify-between border-b pb-1 border-slate-200">
          <span className="font-bold text-sm text-slate-800">
            ५. पुष्ट्यर्थ पुरावा (Evidence List - पृष्ठ २)
          </span>
          <span className="text-[11px] text-slate-500">होय / नाही पर्याय</span>
        </div>

        {renderYesNoSwitch('५(अ)(१) जन्म नोंदवहीतील उतारा', 'proofBirthRegister', data.proofBirthRegister)}
        {renderYesNoSwitch('५(अ)(२) प्राथमिक शाळा प्रवेश नोंदवहीतील उतारा', 'proofSchoolAdmissionRegister', data.proofSchoolAdmissionRegister)}
        {renderYesNoSwitch('५(अ)(३) शाळा सोडल्याचा दाखला (LC)', 'proofSchoolLeavingCert', data.proofSchoolLeavingCert)}
        {renderYesNoSwitch('५(ब) १९५० पूर्वीचा रहिवासी पुरावा', 'proof1950Residence', data.proof1950Residence)}
        {renderYesNoSwitch('५(क) शासकीय सेवेतील सेवा पुस्तक उतारा', 'proofServiceBookRecord', data.proofServiceBookRecord)}
        {renderYesNoSwitch('५(ड) जात छाननी समितीचे वैधता प्रमाणपत्र', 'proofScrutinyValidityCert', data.proofScrutinyValidityCert)}
        {renderYesNoSwitch('५(ई) महसुली किंवा ग्रामपंचायत अभिलेख', 'proofRevenueGramPanchayatRecord', data.proofRevenueGramPanchayatRecord)}
        {renderYesNoSwitch('५(फ) इतर संबंधित पुरावा', 'proofOtherWrittenEvidence', data.proofOtherWrittenEvidence)}
      </div>
    </div>
  );
};
