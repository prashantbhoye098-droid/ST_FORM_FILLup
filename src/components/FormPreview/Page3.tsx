import React from 'react';
import { STFormData, YesNo } from '../../types/form';
import { getTodayFormatted } from '../../constants/initialData';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface Page3Props {
  data: STFormData;
  onUpdate?: (updates: Partial<STFormData>) => void;
}

export const Page3: React.FC<Page3Props> = ({ data, onUpdate }) => {
  const displayDate = data.isAutoDateEnabled
    ? getTodayFormatted()
    : data.customDate || getTodayFormatted();

  const isMinor = data.age < 18;
  const signatureToUse = isMinor ? data.fatherSignatureUrl : data.applicantSignatureUrl;
  const signatoryName = isMinor
    ? `${data.fatherNameAsGuardian || data.fatherName || 'वडील / पालक'} (अज्ञान अर्जदाराचे पालक)`
    : data.applicantName || 'अर्जदार';

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
          <span className="font-bold text-xs">[३]</span>
        </div>

        {/* 6. इतर माहिती */}
        <div className="space-y-3 text-xs">
          <div className="font-bold text-xs sm:text-sm">६. इतर माहिती :</div>

          <div className="pl-3 space-y-2">
            <div className="grid grid-cols-12 gap-1 items-baseline">
              <div className="col-span-5 text-slate-800">
                (अ) अर्जदाराचे नातेवाईक राहत असलेल्या ५ गावांची नावे :
              </div>
              <div className="col-span-7 font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
                {data.relativeVillages || '—'}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline">
              <div className="col-span-5 text-slate-800">
                (ब) अनुसूचित जमातीच्या देवदेवतांची नावे :
              </div>
              <div className="col-span-7 font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
                {data.deityNames || '—'}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline">
              <div className="col-span-5 text-slate-800 leading-tight">
                (क) ज्या व्यक्तीने धर्मांतर केले असेल ती व्यक्ती धर्मांतरापूर्वी पूजा करीत असलेल्या देवदेवतांची नांवे :
              </div>
              <div className="col-span-7 font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
                {data.convertedDeityNames || 'लागू नाही'}
              </div>
            </div>
          </div>

          {/* 7. वडिलांचे / आजोबांचे मूळ गाव */}
          <div className="grid grid-cols-12 gap-1 items-baseline pt-2">
            <div className="col-span-6 font-bold text-slate-900 leading-tight">
              ७. अर्जदाराच्या वडिलांचे / आजोबांचे मुळ गांव, तहसिल व जिल्हा :
            </div>
            <div className="col-span-6 font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
              {data.fatherAncestorOriginalVillage || `ता. ${data.taluka || 'बागलाण'} जि. ${data.district || 'नाशिक'}`}
            </div>
          </div>

          {/* 8. मूळ गावासंबंधीचा पुरावा */}
          <div className="flex justify-between items-center gap-2 pt-1 border-b border-slate-100 pb-1.5">
            <div className="font-bold text-slate-900 max-w-[78%]">
              ८. असल्यास, अर्जदाराच्या मुळ गावासंबंधीचा पुरावा :
            </div>
            <div className="shrink-0">
              {renderYesNoBadge('hasOriginalVillageProof', data.hasOriginalVillageProof)}
            </div>
          </div>

          {/* 9. सवलती व शपथपत्र */}
          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-850 max-w-[78%] leading-relaxed">
                ९. (अ) वडील किंवा जवळचे नातेवाईक यांनी अनुसूचित जमातीचे प्रमाणपत्र किंवा शासकीय सवलती घेतल्या आहेत काय ?
              </div>
              <div className="shrink-0">
                {renderYesNoBadge('hasGovtBenefitsOrCert', data.hasGovtBenefitsOrCert)}
              </div>
            </div>

            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-850 max-w-[78%] leading-relaxed">
                (ब) नमुना अ-१ मधील अर्जासोबत जोडावयाचे शपथपत्र :
              </div>
              <div className="shrink-0">
                {renderYesNoBadge('affidavitFormA1Attached', data.affidavitFormA1Attached)}
              </div>
            </div>
          </div>

          {/* 10. पूर्वी अर्ज व छाननी वैधता */}
          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-850 max-w-[78%] leading-relaxed">
                १०. (अ) अर्जदाराने अनुसूचित जमातीच्या प्रमाणपत्रासाठी सक्षम प्राधिकाऱ्याकडे पूर्वी अर्ज केलेला आहे काय ? (महाराष्ट्र राज्यातील किंवा इतर राज्यातील सक्षम प्राधिकारी धरुन) केला असल्यास, कोणाकडे व केव्हा ? (प्रत जोडावी) :
              </div>
              <div className="shrink-0">
                {renderYesNoBadge('hasPreviousApplication', data.hasPreviousApplication)}
              </div>
            </div>

            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-850 max-w-[78%] leading-relaxed">
                (ब) छाननी समितीकडून देण्यात आलेले अर्जदाराच्या वडिलांचे किंवा वडिलांच्या बाजूकडील इतर कोणत्याही नातेवाईकांचे वैधता प्रमाणपत्र तसे असल्यास कोणाला व केव्हा देण्यात आले. (सत्यप्रत जोडावी) :
              </div>
              <div className="shrink-0">
                {renderYesNoBadge('hasRelativeValidityCert', data.hasRelativeValidityCert)}
              </div>
            </div>

            {data.hasRelativeValidityCert === 'होय' && data.relativeValidityDetails && (
              <div className="text-[11px] bg-slate-50 border border-slate-200 p-2 rounded-xs text-slate-800">
                <span className="font-bold">वैधता प्रमाणपत्र तपशील:</span> {data.relativeValidityDetails}
              </div>
            )}
          </div>
        </div>

        {/* Declaration Paragraph (BNS 2023) */}
        <div className="mt-6 pt-3 border-t border-slate-300 text-xs text-justify leading-relaxed">
          मी शपथपूर्वक असे घोषीत करतो / करते की, या अर्जात माझ्याकडून देण्यात आलेली माहिती खरी आहे. नंतर ती खोटी आढळून आल्यास, <span className="font-bold">भारतीय न्याय संहिता २०२३ कलम २३६, २३७ व २२९</span> यांच्या तरतुदीनुसार माझ्यावर खटला भरण्यात येईल व तदनुसार शिक्षा करण्यात येईल, याची मला जाणीव आहे.
        </div>

        {/* Footer: Thikan, Automatic Date, Signature Box */}
        <div className="mt-8 flex justify-between items-end text-xs">
          <div className="space-y-2">
            <div className="flex items-baseline gap-1">
              <span className="font-bold">ठिकाण :</span>
              <span className="font-semibold border-b border-dotted border-slate-800 min-w-[120px] pb-0.5 inline-block text-slate-950">
                {data.declarationPlace || 'बागलाण'}
              </span>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="font-bold">दिनांक :</span>
              <span className="font-semibold border-b border-dotted border-slate-800 min-w-[120px] pb-0.5 inline-block text-slate-950 font-mono">
                {displayDate}
              </span>
              {data.isAutoDateEnabled && (
                <span className="text-[9px] text-emerald-700 font-semibold no-print">
                  (आजची तारीख)
                </span>
              )}
            </div>
          </div>

          {/* Signature of Applicant / Father if Minor */}
          <div className="flex flex-col items-center min-w-[220px]">
            <div className="text-center font-semibold mb-1">आपला विश्वासू</div>

            <div className="w-[180px] h-[65px] border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center relative overflow-hidden">
              {signatureToUse ? (
                <img
                  src={signatureToUse}
                  alt="Signature"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-[10px] text-slate-400 italic">
                  {isMinor ? 'वडिलांची स्वाक्षरी' : 'स्वाक्षरी उपलब्ध नाही'}
                </span>
              )}
            </div>

            <div className="text-center text-[11px] font-bold mt-1">
              {isMinor ? (
                <span className="text-indigo-950 font-bold block">
                  (अज्ञान अर्जदाराचे वडील/पालक: {signatoryName})
                </span>
              ) : (
                <span>( {signatoryName} )</span>
              )}
            </div>
            <div className="text-[10px] text-slate-600">
              {isMinor ? 'पालकाची सही / अंगठा' : '(अर्जदाराची सही / अंगठा)'}
            </div>
          </div>
        </div>
      </div>

      {/* Page 3 Bottom Footer Marker */}
      <div className="text-right text-[10px] text-slate-500 pt-2 border-t border-slate-200 mt-2">
        पृष्ठ ३ / ६
      </div>
    </div>
  );
};
