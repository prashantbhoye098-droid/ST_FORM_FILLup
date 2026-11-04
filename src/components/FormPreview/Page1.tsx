import React from 'react';
import { STFormData } from '../../types/form';
import { AapleSarkarLogo } from './AapleSarkarLogo';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface Page1Props {
  data: STFormData;
  onUpdate?: (updates: Partial<STFormData>) => void;
}

export const Page1: React.FC<Page1Props> = ({ data, onUpdate }) => {
  const isSelected = (val: string, target: string) =>
    val?.toLowerCase().trim() === target?.toLowerCase().trim();

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
        {/* Top Header Row with Page Number and Center Info */}
        <div className="flex justify-between items-start mb-2 border-b pb-2 border-slate-200">
          {/* Left: Custom Center Branding (User customizable) */}
          <div className="flex items-center gap-2 max-w-[55%]">
            {data.centerLogoUrl ? (
              <img
                src={data.centerLogoUrl}
                alt="Center Logo"
                className="w-12 h-12 object-contain rounded-xs border border-slate-300"
              />
            ) : null}
            <div className="leading-tight">
              <div className="font-bold text-slate-900 text-sm">{data.centerName || 'आपले सरकार सेवा केंद्र'}</div>
              {data.centerAddress && (
                <div className="text-[11px] text-slate-600">{data.centerAddress}</div>
              )}
              {data.centerContact && (
                <div className="text-[10px] text-slate-500">संपर्क: {data.centerContact}</div>
              )}
            </div>
          </div>

          {/* Right: Aaple Sarkar Seva Kendra Logo (or custom uploaded logo) & Page No */}
          <div className="flex flex-col items-end">
            <span className="font-bold text-xs mb-1">[१]</span>
            {data.asskLogoOption === 'official_assk' && <AapleSarkarLogo className="h-14" showSubtitle={false} />}
            {data.asskLogoOption === 'custom_uploaded' && data.customAsskLogoUrl && (
              <img src={data.customAsskLogoUrl} alt="Custom Logo" className="h-14 object-contain" />
            )}
            {data.asskLogoOption === 'csc_logo' && (
              <div className="text-center font-bold text-xs bg-slate-900 text-white px-2 py-1 rounded">
                CSC DIGITAL SEVA
              </div>
            )}
          </div>
        </div>

        {/* Form Title */}
        <div className="text-center font-bold mb-3">
          <div className="text-base tracking-wide">नमुना “अ”</div>
          <div className="text-xs font-semibold text-slate-700">[नियम ३ (१) पहा]</div>
          <div className="text-sm sm:text-base font-extrabold mt-0.5 border-b-2 border-slate-900 inline-block pb-0.5">
            अनुसूचित जमातीचे प्रमाणपत्र मिळण्यासाठी अर्जाचा नमुना
          </div>
        </div>

        {/* Authority Addressee & Photo Box */}
        <div className="flex justify-between items-start mb-2">
          <div className="text-xs leading-normal">
            <div className="font-semibold">प्रति,</div>
            <div className="font-bold text-sm">उपविभागीय अधिकारी,</div>
            <div className="font-semibold text-slate-800">{data.subDivisionalOffice || 'बागलाण'}</div>
          </div>

          {/* Passport Photo Box (First Page) */}
          <div className="w-[105px] h-[130px] border-2 border-slate-800 bg-slate-50 flex flex-col items-center justify-center p-1 text-center shrink-0 shadow-2xs">
            {data.applicantPhotoUrl ? (
              <img
                src={data.applicantPhotoUrl}
                alt="Applicant"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-600">
                <span className="text-xs font-bold">छायाचित्र</span>
                <span className="text-[9px] text-slate-500 mt-1 leading-tight">
                  अर्जदाराचा पासपोर्ट फोटो
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Subject */}
        <div className="font-bold text-center text-xs sm:text-sm my-2 bg-slate-100 py-1 border-y border-slate-300">
          विषय :- अनुसूचित जमातीचे प्रमाणपत्र मिळण्याबाबत...
        </div>

        {/* Salutation & Declaration Intro */}
        <div className="text-xs leading-relaxed text-justify mb-3">
          <span className="font-bold">महोदय,</span>
          <br />
          मी खाली सही करणार अर्ज करतो / करते की, माझ्या{' '}
          <span className="font-bold underline">
            {data.age < 18 ? 'माझ्या मुलासाठी / मुलीसाठी' : 'स्वतःसाठी'}
          </span>{' '}
          अनुसूचित जमातीच्या प्रमाणपत्राची आवश्यकता असल्याने माझ्या जमातीच्या दाव्याचा पुष्ट्यर्थ मी पुढील माहिती सादर करीत आहे.
        </div>

        {/* Numbered Sections 1 to 4 */}
        <div className="space-y-2 text-xs">
          {/* 1. अर्जदाराची माहिती */}
          <div className="grid grid-cols-12 gap-1 items-baseline">
            <div className="col-span-4 font-bold">१. (अ) अर्जदाराचे पूर्ण नाव :</div>
            <div className="col-span-8 font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
              {data.applicantName || '—'}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
            <div className="col-span-4 text-slate-800">सध्याचा पत्ता :</div>
            <div className="col-span-8 border-b border-dotted border-slate-800 pb-0.5 text-slate-950 font-medium">
              {data.currentAddress || '—'}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
            <div className="col-span-4 text-slate-800">गावाचे नाव :</div>
            <div className="col-span-8 border-b border-dotted border-slate-800 pb-0.5 font-medium">
              {data.village || '—'}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
            <div className="col-span-4 text-slate-800">तहसिल व जिल्हा :</div>
            <div className="col-span-8 border-b border-dotted border-slate-800 pb-0.5 font-semibold">
              ता. {data.taluka || 'बागलाण'}, जि. {data.district || 'नाशिक'}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
            <div className="col-span-4 text-slate-800">डाक कार्यालयाचे नाव :</div>
            <div className="col-span-8 border-b border-dotted border-slate-800 pb-0.5 font-medium">
              {data.postOffice || '—'}
            </div>
          </div>

          {/* 1 (ब) व (क) व्यवसाय */}
          <div className="grid grid-cols-12 gap-1 items-center pl-4">
            <div className="col-span-4 text-slate-800">(ब) सध्याचा व्यवसाय :</div>
            <div className="col-span-8 flex flex-wrap items-center gap-x-3 gap-y-1">
              {['शिक्षण', 'नोकरी', 'शेती', 'मजुरी', 'इतर'].map((occ) => (
                <label key={occ} className="flex items-center gap-1 cursor-pointer">
                  <span
                    className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-slate-900 text-[10px] font-bold ${
                      isSelected(data.applicantCurrentOccupation, occ) ? 'bg-slate-900 text-white' : 'bg-white'
                    }`}
                  >
                    {isSelected(data.applicantCurrentOccupation, occ) ? '✓' : ''}
                  </span>
                  <span>{occ}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-center pl-4">
            <div className="col-span-4 text-slate-800">(क) परंपरागत व्यवसाय :</div>
            <div className="col-span-8 flex flex-wrap items-center gap-x-3 gap-y-1">
              {['शिक्षण', 'नोकरी', 'शेती', 'मजुरी', 'इतर'].map((occ) => (
                <label key={occ} className="flex items-center gap-1 cursor-pointer">
                  <span
                    className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-slate-900 text-[10px] font-bold ${
                      isSelected(data.applicantTraditionalOccupation, occ) ? 'bg-slate-900 text-white' : 'bg-white'
                    }`}
                  >
                    {isSelected(data.applicantTraditionalOccupation, occ) ? '✓' : ''}
                  </span>
                  <span>{occ}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 2. वडिलांची माहिती */}
          <div className="grid grid-cols-12 gap-1 items-baseline pt-1">
            <div className="col-span-4 font-bold">२. (अ) वडिलांचे पूर्ण नाव व पूर्ण पत्ता :</div>
            <div className="col-span-8 font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
              {data.fatherName ? `${data.fatherName}, ${data.fatherAddress || ''}` : '—'}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
            <div className="col-span-4 text-slate-700 text-[11px] leading-tight">
              (वडील ह्यात नसल्यास, त्यांच्या निवास्थानाचा शेवटच्या ठिकाणाचा पत्ता) :
            </div>
            <div className="col-span-8 border-b border-dotted border-slate-800 pb-0.5 font-medium">
              {data.isFatherAlive ? 'वडील ह्यात आहेत.' : data.fatherLastResidenceIfDeceased || '—'}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-center pl-4">
            <div className="col-span-4 text-slate-800">(ब) सध्याचा व्यवसाय :</div>
            <div className="col-span-8 flex flex-wrap items-center gap-x-3 gap-y-1">
              {['शिक्षण', 'नोकरी', 'शेती', 'मजुरी', 'इतर'].map((occ) => (
                <label key={occ} className="flex items-center gap-1 cursor-pointer">
                  <span
                    className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-slate-900 text-[10px] font-bold ${
                      isSelected(data.fatherCurrentOccupation, occ) ? 'bg-slate-900 text-white' : 'bg-white'
                    }`}
                  >
                    {isSelected(data.fatherCurrentOccupation, occ) ? '✓' : ''}
                  </span>
                  <span>{occ}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-center pl-4">
            <div className="col-span-4 text-slate-800">(क) परंपरागत व्यवसाय :</div>
            <div className="col-span-8 flex flex-wrap items-center gap-x-3 gap-y-1">
              {['शिक्षण', 'नोकरी', 'शेती', 'मजुरी', 'इतर'].map((occ) => (
                <label key={occ} className="flex items-center gap-1 cursor-pointer">
                  <span
                    className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-slate-900 text-[10px] font-bold ${
                      isSelected(data.fatherTraditionalOccupation, occ) ? 'bg-slate-900 text-white' : 'bg-white'
                    }`}
                  >
                    {isSelected(data.fatherTraditionalOccupation, occ) ? '✓' : ''}
                  </span>
                  <span>{occ}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. जमात व भाषा */}
          <div className="grid grid-cols-12 gap-1 items-center pt-1">
            <div className="col-span-4 font-bold">३. (अ) (एक) अनुसूचित जमातीचे नाव :</div>
            <div className="col-span-8 flex flex-wrap items-center gap-x-3">
              {['कोकणा', 'कोकणी', 'भिल्ल'].map((tribe) => (
                <label key={tribe} className="flex items-center gap-1 cursor-pointer">
                  <span
                    className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-slate-900 text-[10px] font-bold ${
                      isSelected(data.tribeName, tribe) ? 'bg-slate-900 text-white' : 'bg-white'
                    }`}
                  >
                    {isSelected(data.tribeName, tribe) ? '✓' : ''}
                  </span>
                  <span>{tribe}</span>
                </label>
              ))}
              {!['कोकणा', 'कोकणी', 'भिल्ल'].includes(data.tribeName) && data.tribeName && (
                <span className="font-bold underline ml-1">{data.tribeName}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-center pl-4">
            <div className="col-span-4 text-slate-800">(दोन) पोट-जमात :</div>
            <div className="col-span-8 flex flex-wrap items-center gap-x-3">
              {['कोकणा', 'कोकणी', 'भिल्ल'].map((sub) => (
                <label key={sub} className="flex items-center gap-1 cursor-pointer">
                  <span
                    className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-slate-900 text-[10px] font-bold ${
                      isSelected(data.subTribe, sub) ? 'bg-slate-900 text-white' : 'bg-white'
                    }`}
                  >
                    {isSelected(data.subTribe, sub) ? '✓' : ''}
                  </span>
                  <span>{sub}</span>
                </label>
              ))}
              {!['कोकणा', 'कोकणी', 'भिल्ल'].includes(data.subTribe) && data.subTribe && (
                <span className="font-bold underline ml-1">{data.subTribe}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-center pl-4">
            <div className="col-span-4 text-slate-800">(ब) (एक) मातृभाषा :</div>
            <div className="col-span-8 flex flex-wrap items-center gap-x-3">
              {['मराठी', 'हिंदी', 'इंग्लिश'].map((lang) => (
                <label key={lang} className="flex items-center gap-1 cursor-pointer">
                  <span
                    className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-slate-900 text-[10px] font-bold ${
                      isSelected(data.motherTongue, lang) ? 'bg-slate-900 text-white' : 'bg-white'
                    }`}
                  >
                    {isSelected(data.motherTongue, lang) ? '✓' : ''}
                  </span>
                  <span>{lang}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1 items-center pl-4">
            <div className="col-span-4 text-slate-800">(दोन) बोलीभाषा :</div>
            <div className="col-span-8 flex flex-wrap items-center gap-x-3">
              {['मराठी', 'हिंदी', 'इंग्लिश', 'कोकणी'].map((dialect) => (
                <label key={dialect} className="flex items-center gap-1 cursor-pointer">
                  <span
                    className={`inline-flex items-center justify-center w-3.5 h-3.5 border border-slate-900 text-[10px] font-bold ${
                      isSelected(data.spokenDialect, dialect) ? 'bg-slate-900 text-white' : 'bg-white'
                    }`}
                  >
                    {isSelected(data.spokenDialect, dialect) ? '✓' : ''}
                  </span>
                  <span>{dialect}</span>
                </label>
              ))}
              {!['मराठी', 'हिंदी', 'इंग्लिश', 'कोकणी'].includes(data.spokenDialect) && data.spokenDialect && (
                <span className="font-bold underline ml-1">{data.spokenDialect}</span>
              )}
            </div>
          </div>

          {/* 4. प्रमाणपत्राची आवश्यकता असलेल्या व्यक्तीबाबत माहिती */}
          <div className="pt-2">
            <div className="font-bold">४. प्रमाणपत्राची आवश्यकता असलेल्या व्यक्तीबाबत माहिती :</div>
            <div className="grid grid-cols-12 gap-1 items-baseline pl-4 mt-1">
              <div className="col-span-6 text-slate-800">
                (अ) अर्जदाराचे मुळ गांव (ठिकाण) / तहसिल :
              </div>
              <div className="col-span-6 font-semibold border-b border-dotted border-slate-800 pb-0.5">
                {data.originalVillage ? `${data.originalVillage}, ता. ${data.originalTaluka}` : '—'}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline pl-4 mt-1">
              <div className="col-span-6 text-slate-800 text-[11px] leading-tight">
                जिल्हा (६ सप्टेंबर १९५० रोजी किंवा त्या विशिष्ट जमातीच्या अधिसूचनेच्या दिनांकास जेथे अर्जदाराचे कुटुंब राहत होते ते ठिकाण) :
              </div>
              <div className="col-span-6 font-semibold border-b border-dotted border-slate-800 pb-0.5">
                {data.residence1950Place || `ता. ${data.taluka || 'बागलाण'} जि. ${data.district || 'नाशिक'}`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 1 Bottom Footer Marker */}
      <div className="text-right text-[10px] text-slate-500 pt-2 border-t border-slate-200 mt-2">
        पृष्ठ १ / ६
      </div>
    </div>
  );
};
