import React from 'react';
import { STFormData } from '../../types/form';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface Page4Props {
  data: STFormData;
  onUpdate?: (updates: Partial<STFormData>) => void;
}

export const Page4: React.FC<Page4Props> = ({ data }) => {
  const isMinor = data.age < 18;
  const applicantSig = isMinor ? data.fatherSignatureUrl : data.applicantSignatureUrl;
  const applicantDisplayName = isMinor
    ? `${data.applicantName || 'अर्जदार'} (अज्ञान - पालक: ${data.fatherNameAsGuardian || data.fatherName || 'वडील'})`
    : data.applicantName || '—';

  const relationWord = data.gender === 'स्त्री' ? 'मुलगी' : 'मुलगा';

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
        <div className="flex justify-end items-center mb-4">
          <span className="font-bold text-xs">[४]</span>
        </div>

        {/* Title */}
        <div className="text-center font-bold mb-6">
          <div className="text-base tracking-wide">नमुना “अ-१”</div>
          <div className="text-xs font-semibold text-slate-700">[ नियम ३ (२) पहा]</div>
          <div className="text-sm sm:text-base font-extrabold mt-1">
            अर्जदाराने अनुसूचित जमाती प्रमाणपत्र मिळण्याबाबतच्या अर्जासोबत
          </div>
          <div className="text-sm sm:text-base font-extrabold underline">
            सक्षम प्राधिका-याकडे सादर करावयाचे शपथपत्र
          </div>
        </div>

        {/* Declaration Body with Auto-filled Information from Page 1 */}
        <div className="text-justify text-xs sm:text-[13px] leading-loose space-y-4">
          <p>
            मी, <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.applicantName || '_______________________'}</span>,{' '}
            श्री. <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.fatherName || '_______________________'}</span>{' '}
            यांचा <span className="font-semibold underline">{relationWord}</span>, वय{' '}
            <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.age || '___'}</span> वर्ष, व्यवसाय{' '}
            <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.applicantCurrentOccupation || 'शिक्षण'}</span>{' '}
            राहणार <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.currentAddress || data.village || '_______________________'}</span>{' '}
            तहसिल <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.taluka || 'बागलाण'}</span> जिल्हा{' '}
            <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.district || 'नाशिक'}</span> राज्य महाराष्ट्र येथील रहिवासी असुन मी पुढीलप्रमाणे दृढपुर्वक कथन करतो / करते की, मी{' '}
            <span className="font-bold text-slate-950 border-b-2 border-slate-900 px-1.5 bg-slate-100">{data.tribeName || 'कोकणा'}</span> या अनुसूचित जमातीचा आहे. मी{' '}
            <span className="font-bold underline">{data.applicantReligion || 'हिंदू'}</span> धर्माचा आहे. माझे निवासाचे मुळ ठिकाण (अनुसूचित जमातीच्या अधिसूचनेच्या दिनांकास व दिनांकापुर्वी माझे / माझ्या पुर्वजांचे सर्वसाधारण निवासाचे ठिकाण{' '}
            <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.residence1950Place || data.originalVillage || (data.village ? `मु. पो. ${data.village}` : '_______________________')}</span> तहसिल{' '}
            <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.originalTaluka || data.taluka || 'बागलाण'}</span> जिल्हा{' '}
            <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.originalDistrict || data.district || 'नाशिक'}</span> हे आहे.
          </p>

          <p>
            मी महाराष्ट्र राज्यात किंवा इतर कोणत्याही राज्यात अनुसूचित जमातीचे प्रमाणपत्र मिळण्यासाठी अर्ज केलेला{' '}
            <span className="font-bold border-b border-slate-800 px-1">
              {data.hasAppliedOtherState === 'होय' ? 'आहे' : 'नाही'}
            </span>
            . मला अनुसूचित जमातीचे प्रमाणपत्र देण्यात आलेले{' '}
            <span className="font-bold border-b border-slate-800 px-1">
              {data.hasReceivedOtherStateCert === 'होय' ? 'आहे' : 'नाही'}
            </span>
            .
          </p>

          <p>
            माझ्या वडिलांच्या बाजूकडील कोणत्याही नातेवाईकास महाराष्ट्र राज्यात किंवा इतर कोणत्याही राज्यात अनुसूचित जमातीचे प्रमाणपत्र मिळालेले{' '}
            <span className="font-bold border-b border-slate-800 px-1">
              {data.hasRelativeValidityCert === 'होय' ? 'आहे' : 'नाही'}
            </span>
            . माझ्या वडिलांकडील नातेवाईकाला जसे
          </p>

          <div className="pl-4 my-2 py-1.5 border-l-2 border-slate-700 bg-slate-50 text-xs">
            ★ <span className="font-bold">{data.relativeWithValidityName || data.vanshaval.uncles[0] || '—'}</span> यांना / मला मिळालेले वैधता प्रमाणपत्राची सत्यप्रत अर्जासोबत जोडलेली आहे ती/तो नात्याने माझे / माझी{' '}
            <span className="font-bold underline">{data.relativeWithValidityRelation || 'चुलते (काका)'}</span> आहे.
          </div>

          <p>
            अर्जात व शपथपत्रात दिलेली माहिती माझ्या संपुर्ण माहिती व विश्वासाप्रमाणे वस्तुस्थितीवर आधारीत व अचुक / बरोबर आहे .
          </p>

          <p className="pt-1">
            मी शपथपुर्वक असे घोषीत करतो / करते की, या अर्जात माझ्याकडुन देण्यात आलेली माहिती खरी आहे. नंतर ती खोटी आढळुन आल्यास,{' '}
            <span className="font-bold">भारतीय न्याय संहिता २०२३ कलम २३६, २३७ व २२९</span> यांच्या तरतुदीनुसार माझ्यावर खटला भरण्यात येईल व तदनुसार शिक्षा करण्यात येईल, याची मला जाणीव आहे.
          </p>
        </div>

        {/* Dual Signatures: Sakshidar (Witness) on Left & Arjdar/Guardian on Right */}
        <div className="mt-12 pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 text-xs">
          {/* Witness (साक्षीदार) */}
          <div className="flex flex-col">
            <span className="font-bold mb-1">साक्षीदार सही -</span>
            <div className="w-[180px] h-[65px] border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center relative overflow-hidden mb-2">
              {data.witnessSignatureUrl ? (
                <img
                  src={data.witnessSignatureUrl}
                  alt="Witness Signature"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-[10px] text-slate-400 italic">साक्षीदाराची सही</span>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold">नांव :</span>
              <span className="font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950 flex-1">
                {data.witnessName || '—'}
              </span>
            </div>
            {data.witnessAddress && (
              <div className="text-[11px] text-slate-600 mt-0.5">पत्ता: {data.witnessAddress}</div>
            )}
          </div>

          {/* Applicant / Guardian if age < 18 */}
          <div className="flex flex-col items-end text-right">
            <span className="font-bold mb-1 self-end">
              {isMinor ? 'पालकांची सही (अज्ञान अर्जदार) -' : 'अर्जदाराची सही -'}
            </span>
            <div className="w-[180px] h-[65px] border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center relative overflow-hidden mb-2">
              {applicantSig ? (
                <img
                  src={applicantSig}
                  alt="Applicant Signature"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-[10px] text-slate-400 italic">
                  {isMinor ? 'वडिलांची / पालकांची स्वाक्षरी' : 'अर्जदाराची स्वाक्षरी'}
                </span>
              )}
            </div>
            <div className="w-full flex items-baseline justify-end gap-1">
              <span className="font-bold whitespace-nowrap">अर्जदाराचे नांव :</span>
              <span className="font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
                {applicantDisplayName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Page 4 Bottom Footer Marker */}
      <div className="text-right text-[10px] text-slate-500 pt-2 border-t border-slate-200 mt-2">
        पृष्ठ ४ / ६
      </div>
    </div>
  );
};
