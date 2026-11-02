import React from 'react';
import { STFormData } from '../../types/form';
import { getTodayFormatted } from '../../constants/initialData';

interface Page6Props {
  data: STFormData;
  onUpdate?: (updates: Partial<STFormData>) => void;
}

export const Page6: React.FC<Page6Props> = ({ data }) => {
  const displayDate = data.isAutoDateEnabled
    ? getTodayFormatted()
    : data.customDate || getTodayFormatted();

  const isMinor = data.age < 18;
  const applicantSig = isMinor ? data.fatherSignatureUrl : data.applicantSignatureUrl;
  const applicantDisplayName = isMinor
    ? `${data.applicantName || 'अर्जदार'} (अज्ञान - पालक: ${data.fatherNameAsGuardian || data.fatherName || 'वडील'})`
    : data.applicantName || '—';

  const relationWord = data.gender === 'स्त्री' ? 'मुलगी' : 'मुलगा';

  return (
    <div className="a4-page p-8 sm:p-10 text-[13px] leading-relaxed relative flex flex-col justify-between border border-slate-300 print:border-none print:p-0">
      <div>
        {/* Top Header Row with Page Number */}
        <div className="flex justify-end items-center mb-4">
          <span className="font-bold text-xs">[६]</span>
        </div>

        {/* Title */}
        <div className="text-center font-bold mb-4">
          <div className="text-xs font-semibold text-slate-700">
            शासन निर्णय क्रमांक : प्रसुधा १६१४/३४५/प्र.क्र.७१/१८-अ
          </div>
          <div className="text-base font-extrabold mt-1">प्रपत्र -अ-ब</div>
          <div className="text-sm sm:text-base font-extrabold underline mt-0.5">
            स्वयं-साक्षांकनासाठी स्वयं घोषणापत्र
          </div>
        </div>

        {/* Photo Box on Right (Second Photo Placement as requested) */}
        <div className="flex justify-end mb-4">
          <div className="w-[105px] h-[130px] border-2 border-slate-800 bg-slate-50 flex flex-col items-center justify-center p-1 text-center shrink-0 shadow-2xs">
            {data.applicantPhotoUrl ? (
              <img
                src={data.applicantPhotoUrl}
                alt="Applicant Photo Page 6"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-600">
                <span className="text-xs font-bold">छायाचित्र</span>
                <span className="text-[9px] text-slate-500 mt-1 leading-tight">
                  स्वयं साक्षांकित फोटो
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Declaration Body */}
        <div className="text-justify text-xs sm:text-[13.5px] leading-loose space-y-4">
          <p>
            मी, श्री / श्रीमती. <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.applicantName || '_______________________'}</span>,{' '}
            श्री. <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.fatherName || '_______________________'}</span>{' '}
            यांचा / यांची <span className="font-semibold underline">{relationWord}</span>,{' '}
            वय <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.age || '___'}</span> वर्ष,{' '}
            व्यवसाय <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.applicantCurrentOccupation || 'शिक्षण'}</span>{' '}
            राहणार <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.currentAddress || data.village ? `${data.village}, ता. ${data.taluka}, जि. ${data.district}` : '_______________________'}</span>{' '}
            या द्वारे घोषित करतो / करते की, वरील सर्व माहिती माझ्या व्यक्तिगत माहिती व समजुतीनुसार खरी आहे.
          </p>

          <p>
            तसेच मी स्वयं साक्षांकीत केलेल्या प्रती या मुळ कागदपत्रांच्याच सत्य प्रति आहेत. त्या खोट्या असल्याचे आढळून आल्यास,{' '}
            <span className="font-bold">भारतीय न्याय संहिता २०२३ कलम २३६, २३७ व २२९</span> किंवा संबंधित कायद्यानुसार माझ्यावर खटला भरला जाईल व त्यानुसार मी शिक्षेस पात्र राहीन याची मला पुर्ण जाणीव आहे.
          </p>
        </div>

        {/* Footer: Thikan, Date, and Signature */}
        <div className="mt-16 pt-8 border-t border-slate-300 flex justify-between items-end text-xs sm:text-[13px]">
          <div className="space-y-3">
            <div className="flex items-baseline gap-1">
              <span className="font-bold">ठिकाण :</span>
              <span className="font-semibold border-b border-dotted border-slate-800 min-w-[130px] pb-0.5 inline-block text-slate-950">
                {data.declarationPlace || 'बागलाण'}
              </span>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="font-bold">दिनांक :</span>
              <span className="font-semibold border-b border-dotted border-slate-800 min-w-[130px] pb-0.5 inline-block text-slate-950 font-mono">
                {displayDate}
              </span>
            </div>
          </div>

          {/* Signature on Right */}
          <div className="flex flex-col items-center min-w-[220px]">
            <span className="font-bold mb-1">
              {isMinor ? 'पालकांची सही (अज्ञान अर्जदार) -' : 'अर्जदाराची सही'}
            </span>
            <div className="w-[180px] h-[65px] border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center relative overflow-hidden mb-2">
              {applicantSig ? (
                <img
                  src={applicantSig}
                  alt="Signature"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-[10px] text-slate-400 italic">
                  {isMinor ? 'वडिलांची / पालकांची सही' : 'अर्जदाराची सही'}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold">अर्जदाराचे नांव :</span>
              <span className="font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
                {applicantDisplayName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Page 6 Bottom Footer Marker */}
      <div className="text-right text-[10px] text-slate-500 pt-2 border-t border-slate-200 mt-2">
        पृष्ठ ६ / ६ (अंतिम पृष्ठ)
      </div>
    </div>
  );
};
