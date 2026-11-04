import React from 'react';
import { STFormData } from '../../types/form';
import { VanshavalTreeDiagram } from './VanshavalTreeDiagram';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface Page5Props {
  data: STFormData;
  onUpdate?: (updates: Partial<STFormData>) => void;
}

export const Page5: React.FC<Page5Props> = ({ data }) => {
  const isMinor = data.age < 18;
  const applicantSig = isMinor ? data.fatherSignatureUrl : data.applicantSignatureUrl;
  const applicantDisplayName = isMinor
    ? `${data.applicantName || 'अर्जदार'} (अज्ञान - पालक: ${data.fatherNameAsGuardian || data.fatherName || 'वडील'})`
    : data.applicantName || '—';

  const relationWord = data.gender === 'स्त्री' ? 'मुलगी' : 'मुलगा';
  const personSubject = data.nameDiscrepancyPerson || 'माझे';

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
          <span className="font-bold text-xs">[५]</span>
        </div>

        {/* Title */}
        <div className="text-center font-bold mb-3">
          <div className="text-base tracking-wide">नमुना ३ (नियम ४)</div>
          <div className="text-sm sm:text-base font-extrabold">
            दाव्याकर्त्याचे / दाव्याकर्त्याच्या पालकाचे शपथपत्र
          </div>
          <div className="text-xs font-semibold text-slate-700">
            [दिवाणी प्रक्रिया संहिता १९०८ (आदेश १८- नियम ४)]
          </div>
        </div>

        {/* Declaration Intro (Page 1 auto-fill) */}
        <div className="text-justify text-xs sm:text-[13px] leading-relaxed mb-2">
          मी, <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.applicantName || '_______________________'}</span>,{' '}
          श्री. <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.fatherName || '_______________________'}</span>{' '}
          यांचा <span className="font-semibold underline">{relationWord}</span>, वय{' '}
          <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.age || '___'}</span> वर्ष, व्यवसाय{' '}
          <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.applicantCurrentOccupation || 'शिक्षण'}</span>{' '}
          राहणार <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.currentAddress || data.village || '_______________________'}</span>{' '}
          तहसिल <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.taluka || 'बागलाण'}</span> जिल्हा{' '}
          <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.district || 'नाशिक'}</span> राज्य महाराष्ट्र येथील रहिवासी असुन मी पुढीलप्रमाणे दृढपुर्वक कथन करतो / करते की, मी याद्वारे माझ्या कुटुंबाची व नातेवाईकाची वंशावळ देत आहे. ती पुढील प्रमाणे....
        </div>

        {/* Dynamic & Clean Marathi Genealogical Family Tree (वंशावळ) */}
        <VanshavalTreeDiagram data={data} />

        {/* Name Discrepancy Clause (तसेच शाळा सोडल्याच्या दाखल्यावर नाव बदल) */}
        <div className="text-justify text-xs sm:text-[11.5px] leading-relaxed mt-2 bg-slate-50/70 p-2 border border-slate-300">
          तसेच {personSubject}/वडिलांच्या/आजोबांच्या शाळा सोडल्याच्या दाखल्यावर{' '}
          <span className="font-bold underline text-slate-950 bg-amber-50 px-1 border-b border-slate-900">
            {data.oldNameOnLC || '____________________'}
          </span>{' '}
          असे नाव आहे तरी{' '}
          <span className="font-bold underline text-slate-950 bg-amber-50 px-1 border-b border-slate-900">
            {data.oldNameOnLC || '____________________'}
          </span>{' '}
          व{' '}
          <span className="font-bold underline text-slate-950 bg-emerald-50 px-1 border-b border-slate-900">
            {data.newNameOfficial || '____________________'}
          </span>{' '}
          ही दोन्ही नाव {personSubject}/ वडील / आजोबा ची आहेत ही दुसरी व्यक्ती नसून एकच व्यक्ती आहे. वरील प्रमाणे आमची वंशावळ असून हे माझेच कुटुंब आहे.
        </div>

        {/* Sociological / Anthropological Evidence Clause */}
        <div className="text-justify text-[11px] leading-relaxed text-slate-800 mt-2">
          मी दावा केलेल्या जातीच्या जमातीच्या पुष्ट्यर्थ करावयाची अन्य संबंधित सादर निवेदने किंवा कोणतीही आवश्यक स्पष्टीकरणे, तसेच असल्यास, त्या जातीची / जमातीची समाजशास्त्रीय, मानवशास्त्रीय व मानववंशशास्त्रीय (मानवशास्त्रीय वंशावळ व मानवशास्त्रीय नातेसंबंध), वांशिक विशेष लक्षणे. माझ्या माहितीप्रमाणे आणि समजुतीप्रमाणे या अर्जातील नमुना १ आणि या शपथपत्रातील माहिती खरी आणि अचुक आहे.
        </div>

        {/* Bharatiya Nyaya Sanhita 2023 Penalty Warning */}
        <div className="text-justify text-[11px] leading-relaxed mt-2 font-medium">
          मी शपथपुर्वक असे घोषीत करतो / करते की, या अर्जात माझ्याकडुन देण्यात आलेली माहिती खरी आहे. नंतर ती खोटी आढळुन आल्यास,{' '}
          <span className="font-bold">भारतीय न्याय संहिता २०२३ कलम २३६, २३७ व २२९</span> यांच्या तरतुदीनुसार माझ्यावर खटला भरण्यात येईल व तदनुसार शिक्षा करण्यात येईल, याची मला जाणीव आहे.
        </div>

        {/* Dual Signatures: Sakshidar (Witness) on Left & Arjdar/Guardian on Right */}
        <div className="mt-4 pt-3 border-t border-slate-300 grid grid-cols-2 gap-8 text-xs">
          {/* Witness (साक्षीदार) */}
          <div className="flex flex-col">
            <span className="font-bold mb-1">साक्षीदार सही -</span>
            <div className="w-[170px] h-[55px] border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center relative overflow-hidden mb-1.5">
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
          </div>

          {/* Applicant / Guardian if age < 18 */}
          <div className="flex flex-col items-end text-right">
            <span className="font-bold mb-1 self-end">
              {isMinor ? 'पालकांची सही (अज्ञान अर्जदार) -' : 'अर्जदाराची सही -'}
            </span>
            <div className="w-[170px] h-[55px] border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center relative overflow-hidden mb-1.5">
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

      {/* Page 5 Bottom Footer Marker */}
      <div className="text-right text-[10px] text-slate-500 pt-1 border-t border-slate-200 mt-2">
        पृष्ठ ५ / ६
      </div>
    </div>
  );
};
