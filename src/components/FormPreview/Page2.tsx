import React from 'react';
import { STFormData, YesNo } from '../../types/form';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface Page2Props {
  data: STFormData;
  onUpdate?: (updates: Partial<STFormData>) => void;
}

export const Page2: React.FC<Page2Props> = ({ data, onUpdate }) => {
  const isSelected = (val: string, target: string) =>
    val?.toLowerCase().trim() === target?.toLowerCase().trim();

  const handleToggle = (field: keyof STFormData, currentVal: YesNo) => {
    if (!onUpdate) return;
    const nextVal: YesNo = currentVal === 'होय' ? 'नाही' : 'होय';
    onUpdate({ [field]: nextVal });
  };

  const renderYesNoBadge = (field: keyof STFormData, val: YesNo) => {
    const isYes = val === 'होय';
    return (
      <div
        onClick={() => handleToggle(field, val)}
        className="inline-flex items-center gap-1 cursor-pointer select-none no-print-bg print:cursor-default"
        title="क्लिक करून बदला (होय/नाही)"
      >
        <span
          className={`px-1.5 py-0.5 text-xs font-bold rounded-xs transition-colors ${
            isYes
              ? 'bg-slate-900 text-white font-extrabold print:text-black print:bg-transparent print:underline'
              : 'text-slate-400 font-normal hover:text-slate-700'
          }`}
        >
          {isYes ? '✓ होय' : 'होय'}
        </span>
        <span className="text-slate-400">/</span>
        <span
          className={`px-1.5 py-0.5 text-xs font-bold rounded-xs transition-colors ${
            !isYes
              ? 'bg-slate-900 text-white font-extrabold print:text-black print:bg-transparent print:underline'
              : 'text-slate-400 font-normal hover:text-slate-700'
          }`}
        >
          {!isYes ? '✓ नाही' : 'नाही'}
        </span>
      </div>
    );
  };

  return (
    <div className="a4-page p-8 sm:p-10 text-[13px] leading-relaxed relative flex flex-col justify-between border border-slate-300 print:border-none print:p-0 overflow-hidden">
      <WatermarkOverlay
        text={data.watermarkText}
        subText={data.watermarkSubText}
        color={data.watermarkColor}
        opacity={data.watermarkOpacity}
        fontSize={data.watermarkFontSize}
        rotation={data.watermarkRotation}
        enabled={data.watermarkEnabled}
        isRemoved={data.isWatermarkRemoved}
      />
      <div>
        {/* Top Header Row with Page Number */}
        <div className="flex justify-end items-center mb-3">
          <span className="font-bold text-xs">[२]</span>
        </div>

        {/* Section 4 Continued */}
        <div className="space-y-2 text-xs">
          <div className="grid grid-cols-12 gap-1 items-baseline">
            <div className="col-span-6 text-slate-800 leading-tight">
              (ब) जर व्यक्ती तिच्या मुळ गावाव्यतिरिक्त इतर गावात (निवासस्थानाच्या सर्वसाधारण ठिकाणी) राहत असल्यास, त्या गावाचे नाव :
            </div>
            <div className="col-span-6 font-semibold border-b border-dotted border-slate-800 pb-0.5">
              {data.livingInOtherVillage ? data.otherVillageName || '—' : 'नाही (मूळ गावातच वास्तव्यास)'}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-baseline">
            <div className="col-span-6 text-slate-800">
              (क) मुळ गांव सोडल्याचे वर्ष :
            </div>
            <div className="col-span-6 font-semibold border-b border-dotted border-slate-800 pb-0.5">
              {data.livingInOtherVillage ? data.yearLeftOriginalVillage || '—' : 'लागू नाही'}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-center">
            <div className="col-span-6 text-slate-800">
              (ड) मुळ गांव सोडल्याची कारणे (शिक्षण/नोकरी/इ.) :
            </div>
            <div className="col-span-6 flex items-center gap-3">
              {['शिक्षण', 'नोकरी', 'इतर'].map((r) => (
                <label key={r} className="flex items-center gap-1 cursor-pointer">
                  <span
                    className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-slate-900 text-[10px] font-bold ${
                      isSelected(data.reasonLeftOriginalVillage, r) ? 'bg-slate-900 text-white' : 'bg-white'
                    }`}
                  >
                    {isSelected(data.reasonLeftOriginalVillage, r) ? '✓' : ''}
                  </span>
                  <span>{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-center">
            <div className="col-span-6 text-slate-800 leading-tight">
              (ई) सध्याच्या गावातील वास्तव्याची कारणे (शिक्षण/नोकरी/इत्यादी) :
            </div>
            <div className="col-span-6 flex items-center gap-3">
              {['शिक्षण', 'नोकरी', 'इतर'].map((r) => (
                <label key={r} className="flex items-center gap-1 cursor-pointer">
                  <span
                    className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-slate-900 text-[10px] font-bold ${
                      isSelected(data.reasonLivingCurrentVillage, r) ? 'bg-slate-900 text-white' : 'bg-white'
                    }`}
                  >
                    {isSelected(data.reasonLivingCurrentVillage, r) ? '✓' : ''}
                  </span>
                  <span>{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-baseline pt-1">
            <div className="col-span-4 text-slate-800 font-semibold">(फ) जन्म ठिकाण :</div>
            <div className="col-span-8 font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
              {data.birthPlace || (data.village ? `${data.village}, ता. ${data.taluka}, जि. ${data.district}` : '—')}
            </div>
          </div>

          {/* शिक्षण माहिती */}
          <div className="grid grid-cols-12 gap-1 items-baseline pt-1">
            <div className="col-span-5 text-slate-800 leading-tight">
              (ग) जेथे त्याने / तिने शिक्षण घेतले त्या प्राथमिक शाळेचे नाव-गांव, तहसिल व जिल्हा :
            </div>
            <div className="col-span-7 font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950 leading-snug">
              {data.primarySchoolName ? `${data.primarySchoolName}, ${data.primarySchoolVillageTalukaDist}` : '—'}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-baseline pt-1">
            <div className="col-span-5 text-slate-800 leading-tight">
              (ह) जेथे त्याने / तिने शिक्षण घेतले त्या माध्यमिक शाळेचे / महाविद्यालयाचे नाव-गांव, तहसिल व जिल्हा :
            </div>
            <div className="col-span-7 font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950 leading-snug">
              {data.secondarySchoolName ? `${data.secondarySchoolName}, ${data.secondarySchoolVillageTalukaDist}` : '—'}
            </div>
          </div>
        </div>

        {/* 5. पुरावा (Evidence Checklist) */}
        <div className="mt-4 pt-2 border-t border-slate-300">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-xs sm:text-sm">
              ५. (अ) त्याच्या अनुसूचित जमातीच्या दाव्याच्या पुष्ट्यर्थ पुरावा :
            </span>
            <span className="text-xs font-bold text-slate-700">होय / नाही</span>
          </div>

          <div className="space-y-3 text-xs pl-2">
            {/* (एक) जन्म नोंदवही उतारा */}
            <div className="flex justify-between items-start gap-2 pt-1 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[78%] leading-relaxed">
                (एक) अर्जदाराचा, त्याच्या / तिच्या वडिलांचा किंवा वडिलांच्या बाजूकडील वयस्क नातेवाईकांचा जन्म नोंदवहीतील उतारा
              </div>
              <div className="shrink-0">
                {renderYesNoBadge('proofBirthRegister', data.proofBirthRegister)}
              </div>
            </div>

            {/* (दोन) प्राथमिक शाळा प्रवेश नोंदवही उतारा */}
            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[78%] leading-relaxed">
                (दोन) अर्जदाराचा, उपलब्ध नसल्यास त्याच्या वडिलांचा किंवा आजोबांचा प्राथमिक शाळा प्रवेश नोंदवहीतील उतारा
              </div>
              <div className="shrink-0">
                {renderYesNoBadge('proofSchoolAdmissionRegister', data.proofSchoolAdmissionRegister)}
              </div>
            </div>

            {/* (तीन) प्राथमिक शाळा सोडल्याचा दाखला */}
            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[78%] leading-relaxed">
                (तीन) अर्जदाराचा व त्याच्या / तिचा वडिलांचा प्राथमिक शाळा सोडल्याचा दाखला
              </div>
              <div className="shrink-0">
                {renderYesNoBadge('proofSchoolLeavingCert', data.proofSchoolLeavingCert)}
              </div>
            </div>

            {/* (ब) अधिसूचनेच्या दिनांकापूर्वीचा पुरावा */}
            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[78%] leading-relaxed">
                (ब) अशा अनुसूचित जमातीच्या अधिसूचनेच्या दिनांकापूर्वी अनुसूचित जमातीच्या व निवासस्थानाच्या सर्वसाधारण ठिकाणासंबंधी लेखी पुरावा.
              </div>
              <div className="shrink-0">
                {renderYesNoBadge('proof1950Residence', data.proof1950Residence)}
              </div>
            </div>

            {/* (क) सेवेत असल्यास सेवा पुस्तक उतारा */}
            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[78%] leading-relaxed">
                (क) अर्जदाराचे वडील किंवा रक्ताचे नातेवाईक शासनाच्या सेवेत किंवा इतर कोणत्याही सेवेत असल्यास, त्यांच्या जमातीचा उल्लेख असलेला सेवा अभिलेखातील (पुस्तकातील) उतारा.
              </div>
              <div className="shrink-0">
                {renderYesNoBadge('proofServiceBookRecord', data.proofServiceBookRecord)}
              </div>
            </div>

            {/* (ड) जात छाननी समितीचे वैधता प्रमाणपत्र */}
            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[78%] leading-relaxed">
                (ड) अनुसूचित जमाती छाननी समितीकडून दिलेले अर्जदाराच्या वडिलांचे किंवा काकांचे किंवा वडिलांच्या बाजूकडील इतर कोणत्याही वयस्क नातेवाईकांचे असल्यास, वैधता प्रमाणपत्र.
              </div>
              <div className="shrink-0">
                {renderYesNoBadge('proofScrutinyValidityCert', data.proofScrutinyValidityCert)}
              </div>
            </div>

            {/* (ई) महसुली किंवा ग्रामपंचायत अभिलेख */}
            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[78%] leading-relaxed">
                (ई) असल्यास, महसुली अभिलेख किंवा ग्रामपंचायतीतील अभिलेख
              </div>
              <div className="shrink-0">
                {renderYesNoBadge('proofRevenueGramPanchayatRecord', data.proofRevenueGramPanchayatRecord)}
              </div>
            </div>

            {/* (फ) इतर पुरावा */}
            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[78%] leading-relaxed">
                (फ) असल्यास, इतर संबंधित लेखी पुरावा.
              </div>
              <div className="shrink-0">
                {renderYesNoBadge('proofOtherWrittenEvidence', data.proofOtherWrittenEvidence)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2 Bottom Footer Marker */}
      <div className="text-right text-[10px] text-slate-500 pt-2 border-t border-slate-200 mt-2">
        पृष्ठ २ / ६
      </div>
    </div>
  );
};
