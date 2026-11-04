import React from 'react';
import { STFormData } from '../../types/form';
import { getTodayFormatted } from '../../constants/initialData';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface SelfDeclarationFormProps {
  data: STFormData;
  onUpdate?: (updates: Partial<STFormData>) => void;
}

export const SelfDeclarationForm: React.FC<SelfDeclarationFormProps> = ({ data }) => {
  const displayDate = data.isAutoDateEnabled
    ? getTodayFormatted()
    : data.customDate || getTodayFormatted();

  const isMinor = data.age < 18;
  const signatureToUse = isMinor ? data.fatherSignatureUrl : data.applicantSignatureUrl;
  const signatoryName = isMinor
    ? `${data.fatherNameAsGuardian || data.fatherName || 'पालक'}`
    : data.applicantName || 'अर्जदार';

  const relationWord = data.gender === 'स्त्री' ? 'मुलगी' : 'मुलगा';

  return (
    <div className="a4-page p-10 sm:p-14 text-xs leading-relaxed relative flex flex-col justify-between border-2 border-dashed border-slate-900 print:border-2 print:border-dashed print:border-slate-900 print:shadow-none print:p-8 bg-white m-auto overflow-hidden">
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
        {/* Top Header */}
        <div className="text-center font-bold mb-4">
          <div className="text-sm tracking-wide">महाराष्ट्र शासन</div>
          <div className="text-[11px] font-normal text-slate-700">
            (शासन निर्णय क्रमांक : आरटीएस-२०१८/प्र.क्र.१४५/आस्था.५)
          </div>
          <div className="text-xl font-black mt-2 tracking-wide">स्वयं घोषणापत्र</div>
        </div>

        {/* Certificate Title Banner & Photo Box */}
        <div className="flex justify-between items-center my-6">
          <div className="flex-1 pr-6">
            <div className="bg-slate-900 text-white font-extrabold text-sm sm:text-base px-6 py-2.5 rounded-sm text-center tracking-wide shadow-xs">
              {data.activeSelfDeclarationType || 'रहिवास प्रमाणपत्र'}
            </div>
          </div>

          {/* Photo Box */}
          <div className="w-[105px] h-[130px] border-2 border-dashed border-slate-800 rounded-md bg-slate-50 flex flex-col items-center justify-center p-1 text-center shrink-0">
            {data.applicantPhotoUrl ? (
              <img
                src={data.applicantPhotoUrl}
                alt="Applicant"
                className="w-full h-full object-cover rounded-xs"
              />
            ) : (
              <div className="text-slate-600 font-bold text-xs">
                अर्जदार फोटो
              </div>
            )}
          </div>
        </div>

        {/* Declaration Body */}
        <div className="text-justify text-xs sm:text-[13.5px] leading-loose space-y-4 my-6">
          <p>
            मी <span className="font-bold border-b border-dotted border-slate-900 px-1 text-slate-950">{data.applicantName || '______________________________________'}</span>
          </p>
          <p>
            श्री./ <span className="font-bold border-b border-dotted border-slate-900 px-1 text-slate-950">{data.fatherName || '______________________________________'}</span> यांचा {relationWord} वय{' '}
            <span className="font-bold border-b border-dotted border-slate-900 px-1 text-slate-950">{data.age || '____'}</span> वर्षे, आधारकार्ड क्रमांक (असल्यास){' '}
            <span className="font-bold border-b border-dotted border-slate-900 px-1 font-mono text-slate-950">{data.aadhaarNumber || '________________________________'}</span>
          </p>
          <p>
            व्यवसाय <span className="font-bold border-b border-dotted border-slate-900 px-1 text-slate-950">{data.applicantCurrentOccupation || 'शिक्षण'}</span>{' '}
            राहणार मु. पो. <span className="font-bold border-b border-dotted border-slate-900 px-1 text-slate-950">{data.village || data.currentAddress || '________________________'}</span>{' '}
            ता. <span className="font-bold border-b border-dotted border-slate-900 px-1 text-slate-950">{data.taluka || 'बागलाण'}</span> जि.{' '}
            <span className="font-bold border-b border-dotted border-slate-900 px-1 text-slate-950">{data.district || 'नाशिक'}</span> याद्वारे घोषित करतो / करते की, वरील सर्व माहिती माझ्या व्यक्तिगत माहिती व समजुतीनुसार खरी आहे.
          </p>
          <p>
            सदर माहिती खोटी आढळून आल्यास, भारतीय न्याय संहिता २०२३ व भारतीय दंड संहिता अन्वये आणि / किंवा संबंधित कायद्यानुसार माझ्यावर खटला भरला जाईल व त्यानुसार मी शिक्षेस पात्र राहीन. तसेच सदर स्वयंघोषणापत्राद्वारे मला मिळालेले सर्व लाभ सर्वंकषरित्या काढून घेण्यात येतील, याची मला पूर्ण जाणीव आहे.
          </p>
        </div>

        {/* Signatures & Place/Date Footer */}
        <div className="mt-16 pt-8 border-t border-slate-300 flex justify-between items-end text-xs sm:text-[13px]">
          <div className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="font-bold">ठिकाण :-</span>
              <span className="font-semibold border-b border-dotted border-slate-800 min-w-[140px] pb-0.5 inline-block text-slate-950">
                {data.declarationPlace || 'बागलाण'}
              </span>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="font-bold">दिनांक :-</span>
              <span className="font-semibold border-b border-dotted border-slate-800 min-w-[140px] pb-0.5 inline-block text-slate-950 font-mono">
                {displayDate}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center min-w-[220px]">
            <span className="font-bold mb-1">अर्जदार सही</span>
            <div className="w-[180px] h-[65px] border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center relative overflow-hidden mb-2">
              {signatureToUse ? (
                <img
                  src={signatureToUse}
                  alt="Signature"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-[10px] text-slate-400 italic">सही / स्वाक्षरी</span>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold">अर्जदार नाव :-</span>
              <span className="font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
                {signatoryName}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-right text-[10px] text-slate-400 pt-2 border-t border-slate-200 mt-2">
        शासकीय स्वयं घोषणापत्र - {data.activeSelfDeclarationType}
      </div>
    </div>
  );
};
