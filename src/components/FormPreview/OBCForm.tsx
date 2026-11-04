import React from 'react';
import { STFormData } from '../../types/form';
import { getTodayFormatted } from '../../constants/initialData';
import { VanshavalTreeDiagram } from './VanshavalTreeDiagram';
import { AapleSarkarLogo } from './AapleSarkarLogo';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface OBCFormProps {
  data: STFormData;
  pageNumber: number; // 1 to 7
  onUpdate?: (updates: Partial<STFormData>) => void;
}

export const OBCForm: React.FC<OBCFormProps> = ({ data, pageNumber }) => {
  const displayDate = data.isAutoDateEnabled
    ? getTodayFormatted()
    : data.customDate || getTodayFormatted();

  const isMinor = data.age < 18;
  const applicantSig = isMinor ? data.fatherSignatureUrl : data.applicantSignatureUrl;
  const signatoryName = isMinor
    ? `${data.fatherNameAsGuardian || data.fatherName || 'पालक'} (अज्ञान अर्जदाराचे पालक)`
    : data.applicantName || 'अर्जदार';

  const relationWord = data.gender === 'स्त्री' ? 'मुलगी' : 'मुलगा';
  const personSubject = data.nameDiscrepancyPerson || 'माझे';

  const watermarkElement = (
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
  );

  // PAGE 1: नमुना १ (पृष्ठ १)
  if (pageNumber === 1) {
    return (
      <div className="a4-page p-8 sm:p-10 text-[12.5px] leading-relaxed relative flex flex-col justify-between border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 bg-white overflow-hidden">
        {watermarkElement}
        <div>
          {/* Header Row */}
          <div className="flex justify-between items-start mb-2 border-b pb-2 border-slate-200">
            <div className="flex items-center gap-2 max-w-[55%]">
              {data.centerLogoUrl ? (
                <img src={data.centerLogoUrl} alt="Logo" className="w-12 h-12 object-contain" />
              ) : null}
              <div className="leading-tight">
                <div className="font-bold text-slate-900 text-sm">{data.centerName || 'आपले सरकार सेवा केंद्र'}</div>
                {data.centerAddress && <div className="text-[11px] text-slate-600">{data.centerAddress}</div>}
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-bold text-xs mb-1">[१]</span>
              {data.asskLogoOption === 'official_assk' && <AapleSarkarLogo className="h-14" showSubtitle={false} />}
              {data.asskLogoOption === 'custom_uploaded' && data.customAsskLogoUrl && (
                <img src={data.customAsskLogoUrl} alt="Custom Logo" className="h-14 object-contain" />
              )}
            </div>
          </div>

          {/* Form Title */}
          <div className="text-center font-bold mb-3">
            <div className="text-base tracking-wide">नमुना १</div>
            <div className="text-xs font-semibold text-slate-700">[ नियम ४ (१) ]</div>
            <div className="text-sm font-extrabold mt-1 text-slate-900">
              अनुसूचित जाती / बौद्ध धर्मांतरीत अनुसूचित जाती / विमुक्त जाती / भटक्या जमाती / इतर मागासवर्ग (OBC) किंवा विशेष मागासप्रवर्ग जाती प्रमाणपत्र मिळवण्यासाठी अर्जाचा नमुना.
            </div>
          </div>

          {/* Addressee & Photo Box */}
          <div className="flex justify-between items-start my-2">
            <div className="text-xs leading-normal">
              <div className="font-semibold">प्रति,</div>
              <div className="font-bold text-sm">उपविभागीय अधिकारी,</div>
              <div className="font-semibold text-slate-800">{data.subDivisionalOffice || 'बागलाण'}</div>
            </div>

            <div className="w-[105px] h-[130px] border-2 border-slate-800 bg-slate-50 flex flex-col items-center justify-center p-1 text-center shrink-0">
              {data.applicantPhotoUrl ? (
                <img src={data.applicantPhotoUrl} alt="Applicant" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-slate-600">
                  <span className="text-xs font-bold">पासपोर्ट आकाराचे</span>
                  <span className="text-[10px]">रंगीत छायाचित्र</span>
                </div>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="font-bold text-center text-xs my-2 bg-slate-100 py-1 border-y border-slate-300">
            विषय :- {data.casteCategory || 'इतर मागासवर्ग (OBC)'} जाती प्रमाणपत्र मिळण्याबाबत अर्ज...
          </div>

          <div className="text-xs text-justify leading-relaxed mb-3">
            महोदय, मी खाली सही करणार विनंती करतो की, मला माझ्यासाठी / माझ्या मुलासाठी / मुलीसाठी {data.casteCategory || 'इतर मागासवर्ग (OBC)'} जाती प्रमाणपत्र मिळावे. माझ्या दाव्याच्या पुष्ट्यर्थ मी खालीलप्रमाणे माहिती सादर करीत आहे :-
          </div>

          {/* 1. अर्जदाराचे तपशील */}
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-12 gap-1 items-baseline">
              <div className="col-span-5 font-bold">१. (क) अर्जदाराचे संपूर्ण नाव :</div>
              <div className="col-span-7 font-bold border-b border-dotted border-slate-900 pb-0.5 text-slate-950">
                {data.applicantName || '—'}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(ख) सध्याचा पत्ता :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
                {data.currentAddress || '—'}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(ग) गांव / शहर :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-medium">
                {data.village || '—'}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(घ) तहसिल व जिल्हा :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-bold">
                ता. {data.taluka || 'बागलाण'}, जि. {data.district || 'नाशिक'}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(च) टपाल कार्यालयाचे नाव :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-medium">
                {data.postOffice || '—'}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(छ) सध्याचा व्यवसाय :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-bold text-slate-950">
                {data.applicantCurrentOccupation || 'शिक्षण'}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(ज) वंशपरंपरागत व्यवसाय :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-bold text-slate-950">
                {data.applicantTraditionalOccupation || 'शेती'}
              </div>
            </div>
          </div>
        </div>

        <div className="text-right text-[10px] text-slate-500 pt-2 border-t border-slate-200 mt-2">
          नमुना १ (पृष्ठ १ / ५)
        </div>
      </div>
    );
  }

  // PAGE 2: नमुना १ (पृष्ठ २)
  if (pageNumber === 2) {
    return (
      <div className="a4-page p-8 sm:p-10 text-[12.5px] leading-relaxed relative flex flex-col justify-between border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 bg-white overflow-hidden">
        {watermarkElement}
        <div>
          <div className="flex justify-end items-center mb-3">
            <span className="font-bold text-xs">[२]</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-12 gap-1 items-baseline">
              <div className="col-span-5 font-bold">२. (क) वडिलांचे संपूर्ण नाव व पूर्ण पत्ता :</div>
              <div className="col-span-7 font-bold border-b border-dotted border-slate-900 pb-0.5 text-slate-950">
                {data.fatherName ? `${data.fatherName}, ${data.fatherAddress || ''}` : '—'}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-700 text-[11px]">
                (जर ते हयात नसतील तर, त्यांचा शेवटच्या निवासाचा पत्ता) :
              </div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-medium">
                {data.isFatherAlive ? 'हयात आहेत.' : data.fatherLastResidenceIfDeceased || '—'}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(ख) सध्याचा व्यवसाय :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-medium">
                {data.fatherCurrentOccupation || 'शेती'}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(ग) वंशपरंपरागत व्यवसाय :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-medium">
                {data.fatherTraditionalOccupation || 'शेती'}
              </div>
            </div>

            {/* 3. जात व भाषा */}
            <div className="grid grid-cols-12 gap-1 items-baseline pt-2">
              <div className="col-span-5 font-bold">३. (क) (एक) जाती/प्रवर्गाचे नाव :</div>
              <div className="col-span-7 font-bold border-b border-dotted border-slate-900 pb-0.5 text-slate-950">
                {data.tribeName || data.casteCategory || 'कुणबी (OBC)'}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(दोन) पोट-जात :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-medium">
                {data.subTribe || '—'}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(ख) (एक) मातृभाषा :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-medium">
                {data.motherTongue || 'मराठी'}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(दोन) बोली / पोटभाषा :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-medium">
                {data.spokenDialect || 'मराठी'}
              </div>
            </div>

            {/* 4. प्रमाणपत्र पाहिजे त्या व्यक्तीची माहिती */}
            <div className="pt-2 font-bold text-slate-900">४. ज्या व्यक्तीला प्रमाणपत्र पाहिजे असेल त्या व्यक्तीची माहिती :-</div>

            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(क) संपूर्ण नाव :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-bold text-slate-950">
                {data.applicantName || '—'}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(ख) व्यक्तीचे मूळ गाव / शहर, तहसील, जिल्हा :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-medium">
                {data.originalVillage ? `${data.originalVillage}, ता. ${data.originalTaluka}, जि. ${data.originalDistrict}` : '—'}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800 leading-tight">(ग) मूळ गावाव्यतिरिक्त अन्य गावी राहत असल्यास गावाचे नाव :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-medium">
                {data.livingInOtherVillage ? data.otherVillageName || '—' : 'मूळ गावातच'}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(घ) मूळ गाव / शहर सोडल्याचे वर्ष :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-medium">
                {data.livingInOtherVillage ? data.yearLeftOriginalVillage || '—' : 'लागू नाही'}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800">(छ) जन्मठिकाण :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-bold text-slate-950">
                {data.birthPlace || (data.village ? `${data.village}, ता. ${data.taluka}, जि. ${data.district}` : '—')}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1 items-baseline pl-4">
              <div className="col-span-5 text-slate-800 leading-tight">(ज) त्याने / तिने प्राथमिक शिक्षण घेतलेल्या शाळेचे नाव, गाव, तहसील, जिल्हा :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-medium">
                {data.primarySchoolName ? `${data.primarySchoolName}, ${data.primarySchoolVillageTalukaDist}` : '—'}
              </div>
            </div>
          </div>
        </div>

        <div className="text-right text-[10px] text-slate-500 pt-2 border-t border-slate-200 mt-2">
          नमुना १ (पृष्ठ २ / ५)
        </div>
      </div>
    );
  }

  // PAGE 3: नमुना १ (पृष्ठ ३)
  if (pageNumber === 3) {
    return (
      <div className="a4-page p-8 sm:p-10 text-[12.5px] leading-relaxed relative flex flex-col justify-between border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 bg-white overflow-hidden">
        {watermarkElement}
        <div>
          <div className="flex justify-end items-center mb-3">
            <span className="font-bold text-xs">[३]</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-12 gap-1 items-baseline">
              <div className="col-span-5 text-slate-800 leading-tight">(झ) माध्यमिक शाळेचे / महाविद्यालयाचे नाव, गाव/शहर, तहसील, जिल्हा :</div>
              <div className="col-span-7 border-b border-dotted border-slate-800 pb-0.5 font-bold text-slate-950">
                {data.secondarySchoolName ? `${data.secondarySchoolName}, ${data.secondarySchoolVillageTalukaDist}` : '—'}
              </div>
            </div>

            <div className="pt-2 font-bold text-sm text-slate-900 border-b pb-1">५. पुष्ट्यर्थ पुरावा (Evidence Documents) :</div>

            <div className="font-bold pl-2 pt-1">६. (१) प्राथमिक माहिती :-</div>

            <div className="pl-4 space-y-3">
              <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
                <div className="text-slate-800 max-w-[80%]">
                  (क) (एक) अर्जदार, त्याचे वडील किंवा नातेवाईक यांच्याबाबतचा जन्म नोंदवहीतील उतारा :
                </div>
                <span className="font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-900">
                  {data.proofBirthRegister}
                </span>
              </div>

              <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
                <div className="text-slate-800 max-w-[80%]">
                  (दोन) उपलब्ध असल्यास अर्जदार किंवा त्याचे वडील किंवा आजोबा यांचा प्राथमिक शाळा प्रवेश नोंदवहीतील उतारा :
                </div>
                <span className="font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-900">
                  {data.proofSchoolAdmissionRegister}
                </span>
              </div>

              <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
                <div className="text-slate-800 max-w-[80%]">
                  (तीन) अर्जदाराचा किंवा त्याच्या वडिलांचा प्राथमिक शाळा सोडल्याचा दाखला :
                </div>
                <span className="font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-900">
                  {data.proofSchoolLeavingCert}
                </span>
              </div>

              <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
                <div className="text-slate-800 max-w-[80%] leading-relaxed">
                  (ख) जातीच्या अधिसूचनेच्या दिनांकापूर्वीच्या सर्वसाधारण निवासाच्या ठिकाणाबाबतचा लेखी पुरावा :
                </div>
                <span className="font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-900">
                  {data.proof1950Residence}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right text-[10px] text-slate-500 pt-2 border-t border-slate-200 mt-2">
          नमुना १ (पृष्ठ ३ / ५)
        </div>
      </div>
    );
  }

  // PAGE 4: नमुना १ (पृष्ठ ४)
  if (pageNumber === 4) {
    return (
      <div className="a4-page p-8 sm:p-10 text-[12.5px] leading-relaxed relative flex flex-col justify-between border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 bg-white overflow-hidden">
        {watermarkElement}
        <div>
          <div className="flex justify-end items-center mb-3">
            <span className="font-bold text-xs">[४]</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[80%] leading-relaxed">
                (ग) अर्जदाराचे वडील किंवा नातेवाईक शासकीय सेवेत असल्यास सेवापुस्तकातील उतारा :
              </div>
              <span className="font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-900">
                {data.proofServiceBookRecord}
              </span>
            </div>

            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[80%] leading-relaxed">
                (घ) पडताळणी समितीने दिलेले वडिलांचे किंवा नातेवाईकांचे वैधता प्रमाणपत्र :
              </div>
              <span className="font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-900">
                {data.proofScrutinyValidityCert}
              </span>
            </div>

            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[80%] leading-relaxed">
                (ड) महसुली अभिलेख किंवा ग्रामपंचायत अभिलेख :
              </div>
              <span className="font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-900">
                {data.proofRevenueGramPanchayatRecord}
              </span>
            </div>

            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[80%] leading-relaxed">
                (च) इतर संबंधित लेखी पुरावा असल्यास :
              </div>
              <span className="font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-900">
                {data.proofOtherWrittenEvidence}
              </span>
            </div>

            <div className="pt-2 font-bold text-slate-900">(२) अतिरिक्त माहिती :-</div>

            <div className="pl-4 space-y-2">
              <div className="grid grid-cols-12 gap-1 items-baseline">
                <div className="col-span-5 text-slate-800">(क) नातेवाईक राहत असलेल्या ५ गावांची नावे :</div>
                <div className="col-span-7 font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
                  {data.relativeVillages || '—'}
                </div>
              </div>

              <div className="grid grid-cols-12 gap-1 items-baseline">
                <div className="col-span-5 text-slate-800">(ख) देव / देवींची नावे :</div>
                <div className="col-span-7 font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
                  {data.deityNames || '—'}
                </div>
              </div>

              <div className="grid grid-cols-12 gap-1 items-baseline">
                <div className="col-span-5 text-slate-800 leading-tight">(ग) दुसऱ्या धर्मामध्ये धर्मांतरित असल्यास पूर्वीच्या देवदेवता :</div>
                <div className="col-span-7 font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
                  {data.convertedDeityNames || 'लागू नाही'}
                </div>
              </div>

              <div className="grid grid-cols-12 gap-1 items-baseline pt-1">
                <div className="col-span-5 font-bold text-slate-900">७. वडिलांचे / आजोबांचे मूळ गाव, तालुका, जिल्हा :</div>
                <div className="col-span-7 font-semibold border-b border-dotted border-slate-800 pb-0.5 text-slate-950">
                  {data.fatherAncestorOriginalVillage || `ता. ${data.taluka || 'बागलाण'} जि. ${data.district || 'नाशिक'}`}
                </div>
              </div>

              <div className="flex justify-between items-center gap-2 pt-1 border-b border-slate-100 pb-1">
                <div className="font-bold text-slate-900">८. असल्यास, मूळ गावाबद्दलचा पुरावा :</div>
                <span className="font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-900">
                  {data.hasOriginalVillageProof}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right text-[10px] text-slate-500 pt-2 border-t border-slate-200 mt-2">
          नमुना १ (पृष्ठ ४ / ५)
        </div>
      </div>
    );
  }

  // PAGE 5: नमुना १ (पृष्ठ ५ - घोषणा व सही)
  if (pageNumber === 5) {
    return (
      <div className="a4-page p-8 sm:p-10 text-[12.5px] leading-relaxed relative flex flex-col justify-between border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 bg-white overflow-hidden">
        {watermarkElement}
        <div>
          <div className="flex justify-end items-center mb-3">
            <span className="font-bold text-xs">[५]</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[80%] leading-relaxed">
                ९. (क) वडिलांना किंवा नातेवाईकांना जातीचे प्रमाणपत्र किंवा सरकारी सवलतींचा लाभ मिळालेला आहे किंवा कसे :
              </div>
              <span className="font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-900">
                {data.hasGovtBenefitsOrCert}
              </span>
            </div>

            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[80%] leading-relaxed">
                (ख) या सोबत नमुना-२ व नमुना-३ मधील शपथपत्र जोडले आहे किंवा कसे :
              </div>
              <span className="font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-900">
                {data.affidavitFormA1Attached}
              </span>
            </div>

            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[80%] leading-relaxed">
                १०. (क) अर्जदाराने सक्षम प्राधिकाऱ्याकडे पूर्वी अर्ज केलेला आहे किंवा कसे :
              </div>
              <span className="font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-900">
                {data.hasPreviousApplication}
              </span>
            </div>

            <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-1.5">
              <div className="text-slate-800 max-w-[80%] leading-relaxed">
                (ख) वडिलांना किंवा नातेवाईकांना पडताळणी समितीने वैधता प्रमाणपत्र दिलेले आहे किंवा कसे :
              </div>
              <span className="font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-900">
                {data.hasRelativeValidityCert}
              </span>
            </div>
          </div>

          {/* Legal Truth Declaration */}
          <div className="mt-8 pt-4 border-t border-slate-300 text-xs text-justify leading-relaxed">
            मी शपथपूर्वक असे जाहीर करतो की, या अर्जात मी दिलेली संपूर्ण माहिती बरोबर आहे आणि मला याची जाणीव आहे की, मी दिलेली वरील माहिती चुकीची असल्याचे नंतर आढळून आल्यास, <span className="font-bold">भारतीय दंड संहिता कलमे १९३(२), १९९ व २०० / भारतीय न्याय संहिता २०२३ कलम २३६, २३७ व २२९</span> यांच्या तरतुदीनुसार माझ्यावर खटला भरला जाईल व त्यानुसार मी शिक्षेस पात्र असेन.
          </div>

          {/* Footer Signatures */}
          <div className="mt-12 flex justify-between items-end text-xs">
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
              </div>
            </div>

            <div className="flex flex-col items-center min-w-[200px]">
              <div className="text-center font-semibold mb-1">आपला विश्वासू</div>
              <div className="w-[170px] h-[60px] border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center relative overflow-hidden mb-1">
                {applicantSig ? (
                  <img src={applicantSig} alt="Signature" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-[10px] text-slate-400 italic">स्वाक्षरी</span>
                )}
              </div>
              <div className="text-center text-[11px] font-bold">
                ( {signatoryName} )
              </div>
              <div className="text-[10px] text-slate-600">
                {isMinor ? '(पालकाची सही)' : '(अर्जदाराची सही)'}
              </div>
            </div>
          </div>
        </div>

        <div className="text-right text-[10px] text-slate-500 pt-2 border-t border-slate-200 mt-2">
          नमुना १ (पृष्ठ ५ / ५ - समाप्ती)
        </div>
      </div>
    );
  }

  // PAGE 6: नमुना २ (शपथपत्र)
  if (pageNumber === 6) {
    return (
      <div className="a4-page p-8 sm:p-10 text-[12px] leading-relaxed relative flex flex-col justify-between border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 bg-white overflow-hidden">
        {watermarkElement}
        <div>
          <div className="flex justify-end items-center mb-2">
            <span className="font-bold text-xs">[६]</span>
          </div>

          <div className="text-center font-bold mb-4">
            <div className="text-base tracking-wide">नमुना २</div>
            <div className="text-xs font-semibold text-slate-700">[ नियम ४ (१) पहा ]</div>
            <div className="text-xs sm:text-sm font-extrabold mt-0.5">
              अर्जदाराने जाती प्रमाणपत्र मिळवण्यासाठी सक्षम प्राधिकाऱ्याकडे अर्जासोबत (नमुना - १) सादर करावयाचे शपथपत्र.
            </div>
          </div>

          <div className="text-justify text-xs sm:text-[12.5px] leading-loose space-y-3">
            <p>
              मी, <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.applicantName || '_______________________'}</span>,{' '}
              श्री. <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.fatherName || '_______________________'}</span>{' '}
              यांचा {relationWord}, वय <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.age || '___'}</span> वर्षे, व्यवसाय{' '}
              <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.applicantCurrentOccupation || 'शिक्षण'}</span>{' '}
              राहणार मु. <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.village || data.currentAddress || '_______________________'}</span>{' '}
              तहसील <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.taluka || 'बागलाण'}</span> जिल्हा{' '}
              <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.district || 'नाशिक'}</span> राज्य महाराष्ट्र येथील रहिवासी असून याद्वारे दृढपूर्वक कथन करतो की, मी{' '}
              <span className="font-bold text-slate-950 border-b border-slate-900 px-1 bg-slate-50">{data.tribeName || data.casteCategory || 'कुणबी (OBC)'}</span> या जातीचा/प्रवर्गाचा आहे. माझा धर्म{' '}
              <span className="font-bold underline">{data.applicantReligion || 'हिंदू'}</span> आहे.
            </p>

            <p>
              माझे मूळ निवासाचे ठिकाण तहसील <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.originalTaluka || data.taluka || 'बागलाण'}</span> जिल्हा{' '}
              <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.originalDistrict || data.district || 'नाशिक'}</span> हे आहे.
            </p>

            <p>
              मी महाराष्ट्र राज्यामध्ये अथवा अन्य कोणत्याही राज्यामध्ये अशा जातीचे प्रमाणपत्र मिळण्याकरिता अर्ज केलेला नाही, मला प्रमाणपत्र देण्यात आलेले नाही.
            </p>

            <p>
              माझ्या वडिलांकडील नातेवाईकाला मिळालेले वैधता प्रमाणपत्राची सत्यप्रत अर्जासोबत जोडलेली आहे.
            </p>

            <p>
              माझ्या माहितीप्रमाणे आणि समजुतीप्रमाणे माझ्या अर्जात (नमुना १) व या शपथपत्रात दिलेली माहिती ही सत्याधारित व अचूक आहे.
            </p>

            <p>
              मी शपथपूर्वक असे घोषित करतो/करते की, या अर्जात माझ्याकडून देण्यात आलेली माहिती खरी आहे. नंतर ती खोटी असल्याचे आढळून आल्यास माझ्यावर कायदेशीर खटला भरण्यात येईल.
            </p>
          </div>

          {/* Dual Signatures */}
          <div className="mt-8 pt-4 border-t border-slate-300 grid grid-cols-2 gap-6 text-xs">
            <div>
              <span className="font-bold mb-1 block">साक्षीदार सही -</span>
              <div className="w-[160px] h-[55px] border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center mb-1">
                {data.witnessSignatureUrl ? (
                  <img src={data.witnessSignatureUrl} alt="Witness" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-[10px] text-slate-400 italic">साक्षीदार सही</span>
                )}
              </div>
              <div className="font-semibold text-slate-950">नाव: {data.witnessName || '—'}</div>
            </div>

            <div className="flex flex-col items-end text-right">
              <span className="font-bold mb-1 block">दावाकर्त्याची सही -</span>
              <div className="w-[160px] h-[55px] border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center mb-1">
                {applicantSig ? (
                  <img src={applicantSig} alt="Applicant" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-[10px] text-slate-400 italic">दावाकर्ता सही</span>
                )}
              </div>
              <div className="font-bold text-slate-950">नाव: {signatoryName}</div>
            </div>
          </div>
        </div>

        <div className="text-right text-[10px] text-slate-500 pt-2 border-t border-slate-200 mt-2">
          नमुना २ (शपथपत्र)
        </div>
      </div>
    );
  }

  // PAGE 7: नमुना ३ (वंशावळ शपथपत्र)
  return (
    <div className="a4-page p-8 sm:p-10 text-[12px] leading-relaxed relative flex flex-col justify-between border border-slate-300 print:border-none print:shadow-none print:p-0 print:m-0 bg-white overflow-hidden">
      {watermarkElement}
      <div>
        <div className="flex justify-end items-center mb-2">
          <span className="font-bold text-xs">[७]</span>
        </div>

        <div className="text-center font-bold mb-3">
          <div className="text-base tracking-wide">नमुना ३</div>
          <div className="text-xs font-semibold text-slate-700">( नियम ४ )</div>
          <div className="text-sm font-extrabold mt-0.5">दावाकर्त्याचे / दावाकर्त्याच्या पालकाचे शपथपत्र</div>
          <div className="text-xs text-slate-600">[ दिवाणी प्रक्रिया संहिता १९०८ (आदेश १८ - नियम ४) ]</div>
        </div>

        <div className="text-justify text-xs sm:text-[12.5px] leading-relaxed mb-2">
          १) मी, <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.applicantName || '_______________________'}</span>,{' '}
          श्री. <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.fatherName || '_______________________'}</span>{' '}
          यांचा {relationWord}, वय <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.age || '___'}</span> वर्षे, व्यवसाय{' '}
          <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.applicantCurrentOccupation || 'शिक्षण'}</span>{' '}
          राहणार मु. <span className="font-bold border-b border-dotted border-slate-800 px-1 text-slate-950">{data.village || data.currentAddress || '_______________________'}</span>{' '}
          तहसील <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.taluka || 'बागलाण'}</span> जिल्हा{' '}
          <span className="font-bold border-b border-dotted border-slate-800 px-1">{data.district || 'नाशिक'}</span> राज्य महाराष्ट्र येथील रहिवासी असून दृढपूर्वक कथन करतो :-
          <br />
          २) मी याद्वारे माझ्या कुटुंबाची व नातेवाईकांची वंशावळ देत आहे, ती पुढीलप्रमाणे आहे :-
        </div>

        {/* Tree Diagram */}
        <VanshavalTreeDiagram data={data} />

        {/* Name Discrepancy Clause */}
        <div className="text-justify text-xs leading-relaxed mt-2 bg-slate-50/70 p-2 border border-slate-300">
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

        <div className="text-justify text-[11px] leading-relaxed text-slate-800 mt-2">
          ३) दावा केलेल्या जातीच्या/जमातीच्या पुष्ट्यर्थ करावयाची अन्य संबंधित सादर निवेदने किंवा कोणतीही आवश्यक स्पष्टीकरणे, तसेच असल्यास, त्या जातीची/जमातीची समाजशास्त्रीय, मानवशास्त्रीय व मानववंशशास्त्रीय लक्षणे. माझ्या माहितीप्रमाणे व समजुतीप्रमाणे या अर्जातील नमुना १ आणि या शपथपत्रातील माहिती खरी आणि अचूक आहे.
        </div>

        {/* Signatures */}
        <div className="mt-4 pt-3 border-t border-slate-300 grid grid-cols-2 gap-6 text-xs">
          <div>
            <span className="font-bold mb-1 block">साक्षीदार सही -</span>
            <div className="w-[160px] h-[55px] border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center mb-1">
              {data.witnessSignatureUrl ? (
                <img src={data.witnessSignatureUrl} alt="Witness" className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-[10px] text-slate-400 italic">साक्षीदार सही</span>
              )}
            </div>
            <div className="font-semibold text-slate-950">नाव: {data.witnessName || '—'}</div>
          </div>

          <div className="flex flex-col items-end text-right">
            <span className="font-bold mb-1 block">दावाकर्त्याची सही -</span>
            <div className="w-[160px] h-[55px] border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center mb-1">
              {applicantSig ? (
                <img src={applicantSig} alt="Applicant" className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-[10px] text-slate-400 italic">दावाकर्ता सही</span>
              )}
            </div>
            <div className="font-bold text-slate-950">नाव: {signatoryName}</div>
          </div>
        </div>
      </div>

      <div className="text-right text-[10px] text-slate-500 pt-2 border-t border-slate-200 mt-2">
        नमुना ३ (वंशावळ शपथपत्र)
      </div>
    </div>
  );
};
