import React from 'react';
import { STFormData } from '../../types/form';
import { getTodayFormatted } from '../../constants/initialData';
import { AapleSarkarLogo } from './AapleSarkarLogo';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface IncomeFormProps {
  data: STFormData;
  onUpdate?: (updates: Partial<STFormData>) => void;
}

export const IncomeForm: React.FC<IncomeFormProps> = ({ data }) => {
  const displayDate = data.isAutoDateEnabled
    ? getTodayFormatted()
    : data.customDate || getTodayFormatted();

  const isMinor = data.age < 18;
  const signatureToUse = isMinor ? data.fatherSignatureUrl : data.applicantSignatureUrl;
  const signatoryName = isMinor
    ? `${data.fatherNameAsGuardian || data.fatherName || 'पालक'}`
    : data.applicantName || 'अर्जदार';

  // Calculate year totals
  const totalYear1 = data.incomeRows.reduce((sum, r) => sum + (Number(r.year1Amount) || 0), 0);
  const totalYear2 = data.incomeRows.reduce((sum, r) => sum + (Number(r.year2Amount) || 0), 0);
  const totalYear3 = data.incomeRows.reduce((sum, r) => sum + (Number(r.year3Amount) || 0), 0);

  return (
    <div className="a4-page p-8 sm:p-10 text-[12.5px] leading-relaxed relative flex flex-col justify-between border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 bg-white overflow-hidden">
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
        {/* Top Center Branding & ASSK Logo */}
        <div className="flex justify-between items-start mb-2 border-b pb-2 border-slate-200">
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
            </div>
          </div>

          <div className="flex flex-col items-end">
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

        {/* Official Header Box matching Attachment 1 */}
        <div className="border-2 border-slate-900 rounded-lg p-2 text-center text-xs mb-3 font-semibold bg-white">
          <div>(माहिती तंत्रज्ञान (सा.प्र.वि)</div>
          <div>(शासन निर्णय क्र. प्रसुधा १६१४/३४५/प्र.क्र.०१/१८/अ मंत्रालय-मुंबई ४०००३२ दि. ०९ मार्च २०१५)</div>
        </div>

        {/* Title & Photo Box matching Annexure-A PDF */}
        <div className="flex items-center justify-between mb-3 min-h-[125px]">
          <div className="flex-1 text-center pr-2">
            <div className="text-base tracking-wide font-extrabold text-slate-950">प्रपत्र-अ (Annexure-A)</div>
            <div className="text-xl font-black text-slate-950 mt-1">
              मिळकती बाबत स्वयंघोषणा पत्र
            </div>
            <div className="text-[11px] text-slate-600 font-semibold mt-0.5">
              (Income Declaration for Income Certificate)
            </div>
          </div>

          {/* Official Rounded Photo Box matching PDF 1 */}
          <div className="w-[105px] h-[125px] border-2 border-slate-900 rounded-2xl bg-slate-50 flex flex-col items-center justify-center p-1 text-center shrink-0 shadow-2xs">
            {data.applicantPhotoUrl ? (
              <img
                src={data.applicantPhotoUrl}
                alt="Applicant"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="text-slate-400 font-bold text-[10px] leading-tight">
                येथे फोटो<br />चिकटवा<br />(Photo)
              </div>
            )}
          </div>
        </div>

        {/* Declaration Paragraph matching PDF 1 */}
        <div className="text-justify text-xs sm:text-[13px] leading-loose mb-3">
          मी अर्जदार श्री./श्रीमती/कु.{' '}
          <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">
            {data.applicantName || '_______________________'}
          </span>
          , वय <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.age || '___'}</span> वर्ष, धंदा{' '}
          <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.applicantCurrentOccupation || 'शेती'}</span>{' '}
          रा. <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.village || data.currentAddress || '_______________________'}</span>{' '}
          ता. <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.taluka || 'बागलाण'}</span> जि.{' '}
          <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.district || 'नाशिक'}</span> येथील रहिवासी असून मी सत्यप्रतिज्ञेवर घोषित करतो/करते की, माझ्या कुटुंबात{' '}
          <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.incomeFamilyMembersCount || '४'}</span> व्यक्ती असून माझ्या कुटुंबात{' '}
          <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.incomeLandHectare || '०.००'}</span> हे.आर.{' '}
          <span className="font-semibold underline">{data.hasLand ? 'जमीन आहे' : 'जमीन नाही'}</span>. माझे खालीलप्रमाणे उत्पन्न आहे.
        </div>

        {/* 10 Income Sources Table across 3 Years */}
        <div className="overflow-x-auto my-3 border border-slate-900">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-900 text-slate-900 font-bold">
                <th className="border-r border-slate-900 p-1.5 text-center w-12">अ. नं.</th>
                <th className="border-r border-slate-900 p-1.5">उत्पन्नाचे साधन</th>
                <th className="border-r border-slate-900 p-1.5 text-right w-28">
                  मार्च {data.incomeYears[0] || '२०२३'}<br /><span className="text-[10px] font-normal">अखेर उत्पन्न (₹)</span>
                </th>
                <th className="border-r border-slate-900 p-1.5 text-right w-28">
                  मार्च {data.incomeYears[1] || '२०२४'}<br /><span className="text-[10px] font-normal">अखेर उत्पन्न (₹)</span>
                </th>
                <th className="p-1.5 text-right w-28">
                  मार्च {data.incomeYears[2] || '२०२५'}<br /><span className="text-[10px] font-normal">अखेर उत्पन्न (₹)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.incomeRows.map((row) => (
                <tr key={row.srNo} className="border-b border-slate-400 hover:bg-slate-50/50">
                  <td className="border-r border-slate-900 p-1 text-center font-semibold">{row.srNo}</td>
                  <td className="border-r border-slate-900 p-1 text-slate-900">{row.sourceName}</td>
                  <td className="border-r border-slate-900 p-1 text-right font-mono font-medium">
                    {row.year1Amount ? Number(row.year1Amount).toLocaleString('en-IN') : '—'}
                  </td>
                  <td className="border-r border-slate-900 p-1 text-right font-mono font-medium">
                    {row.year2Amount ? Number(row.year2Amount).toLocaleString('en-IN') : '—'}
                  </td>
                  <td className="p-1 text-right font-mono font-medium">
                    {row.year3Amount ? Number(row.year3Amount).toLocaleString('en-IN') : '—'}
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-slate-100 font-bold text-slate-950 border-t-2 border-slate-900">
                <td colSpan={2} className="border-r border-slate-900 p-1.5 text-right tracking-wide">
                  एकूण उत्पन्न (Total) :
                </td>
                <td className="border-r border-slate-900 p-1.5 text-right font-mono font-extrabold text-sm">
                  ₹ {totalYear1 > 0 ? totalYear1.toLocaleString('en-IN') : '०'}
                </td>
                <td className="border-r border-slate-900 p-1.5 text-right font-mono font-extrabold text-sm">
                  ₹ {totalYear2 > 0 ? totalYear2.toLocaleString('en-IN') : '०'}
                </td>
                <td className="p-1.5 text-right font-mono font-extrabold text-sm">
                  ₹ {totalYear3 > 0 ? totalYear3.toLocaleString('en-IN') : '०'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legal Penalty & Truth Declaration (BNS 2023) */}
        <div className="text-justify text-[11.5px] leading-relaxed mt-3 space-y-1.5">
          <p>
            सदरचे उत्पन्न दाखल्याचे प्रतिज्ञापत्र मला / माझ्या पाल्याचे{' '}
            <span className="font-bold underline">{data.incomePurpose || 'शैक्षणिक/शासकीय/प्रकरण कामी'}</span>{' '}
            उत्पन्न दाखला मिळणेकामी करुन देत आहे. माझे वरील मिळकती बाबतचे सत्य कथन मी घोषीत करतो / करते की, कुठल्याही मार्गाने कमविलेली मिळकत मी शासनापासून लपवीत नाही याची ग्वाही देतो, तसे मी केल्यास किंवा आढळून आल्यास{' '}
            <span className="font-bold">भारतीय न्याय संहिता २०२३ कलम २३६, २३७ व २२९</span> व अन्य / संबंधित कायद्यानुसार माझ्यावर शासनाची फसवणूक केल्याच्या कलमाखाली मी कार्यवाहीस पात्र राहील त्यानुसार माझ्यावर खटला भरला जाईल व मी शिक्षेस पात्र राहीन याची मला पूर्ण जाणीव आहे. यासाठी मी हे स्वयंघोषणापत्र लिहून देत आहे.
          </p>
        </div>

        {/* Footer: Thikan, Date, Signature */}
        <div className="mt-8 pt-4 border-t border-slate-300 flex justify-between items-end text-xs">
          <div className="space-y-2">
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

          <div className="flex flex-col items-center min-w-[200px]">
            <span className="font-bold mb-1">अर्जदाराची स्वाक्षरी</span>
            <div className="w-[170px] h-[60px] border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center relative overflow-hidden mb-1.5">
              {signatureToUse ? (
                <img
                  src={signatureToUse}
                  alt="Signature"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-[10px] text-slate-400 italic">स्वाक्षरी</span>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold">नाव :</span>
              <span className="font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
                {signatoryName}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-right text-[10px] text-slate-400 pt-2 border-t border-slate-200 mt-2">
        प्रपत्र-अ (उत्पन्नाचा दाखला स्वयंघोषणापत्र)
      </div>
    </div>
  );
};
