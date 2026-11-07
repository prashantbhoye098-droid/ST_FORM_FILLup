import React from 'react';
import { STFormData } from '../../types/form';
import { WatermarkOverlay } from '../WatermarkOverlay';
import { ShieldCheck, Upload, FileText, CheckCircle2 } from 'lucide-react';

interface PanCardFormProps {
  data: STFormData;
  pageNumber?: 1 | 2 | 'all';
}

export const PanCardForm: React.FC<PanCardFormProps> = ({ data, pageNumber = 1 }) => {
  const isCorrection = data.panFormType === 'CORRECTION_CR01';

  const hasUploadedPage1 = Boolean(data.panPage1ImageUrl);
  const hasUploadedPage2 = Boolean(data.panPage2ImageUrl);

  const p1X = data.panPhoto1X ?? 4.2;
  const p1Y = data.panPhoto1Y ?? 13.0;
  const p1W = data.panPhoto1Width ?? 16.5;
  const p1H = data.panPhoto1Height ?? 15.2;

  const p2X = data.panPhoto2X ?? 79.5;
  const p2Y = data.panPhoto2Y ?? 13.0;
  const p2W = data.panPhoto2Width ?? 16.5;
  const p2H = data.panPhoto2Height ?? 15.2;

  // Signature position: for Correction, shifts UP to ~ 41.0%, for New PAN it is at ~ 90.0%
  const defaultSignY = isCorrection ? 41.0 : 90.0;
  const defaultSignX = isCorrection ? 53.5 : 56.5;
  const defaultSignW = isCorrection ? 38.0 : 36.5;
  const defaultSignH = isCorrection ? 5.2 : 5.0;

  const signX = data.panSignPage2X ?? defaultSignX;
  const signY = data.panSignPage2Y ?? defaultSignY;
  const signW = data.panSignPage2Width ?? defaultSignW;
  const signH = data.panSignPage2Height ?? defaultSignH;

  const renderPage1 = () => (
    <div className="a4-page relative border border-slate-300 print:border-none print:shadow-none bg-white overflow-hidden shadow-md mx-auto select-none">
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

      {hasUploadedPage1 ? (
        /* Real Uploaded PDF Page 1 (No personal data stored on server!) */
        <img
          src={data.panPage1ImageUrl}
          alt={isCorrection ? 'PAN Correction CR-01 Page 1' : 'PAN Form 49A Page 1'}
          className="w-full h-full object-cover block"
        />
      ) : (
        /* Clean, Privacy-Protected Blank Official Template Mockup */
        <div className="w-full h-full p-6 flex flex-col justify-between text-slate-800 bg-white font-serif">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1">
            <div className="text-[11px] font-black uppercase tracking-wider">
              {isCorrection ? 'FORM NO. PAN CR-01' : 'FORM NO. 49A'}
            </div>
            <div className="text-[10px] text-slate-600 italic">
              [See rule 158 of Income Tax Rules, 1962]
            </div>
            <div className="text-xs font-black text-slate-950 uppercase">
              {isCorrection
                ? 'Request for Changes Or Correction in PAN Data [For an Individual]'
                : 'Application for Allotment of Permanent Account Number [Citizen of India]'}
            </div>
          </div>

          {/* Privacy & Upload Guidance Banner */}
          <div className="my-4 p-4 bg-indigo-50/90 border-2 border-dashed border-indigo-400 rounded-xl text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div className="font-bold text-indigo-950 text-xs">
              📄 ग्राहक डेटा सुरक्षा: अर्जदाराचा २-पानी PDF फॉर्म डाव्या बाजूने अपलोड करा
            </div>
            <p className="text-[11px] text-indigo-900 max-w-md mx-auto leading-relaxed">
              कोणतीही वैयक्तिक माहिती सर्व्हरवर सेव्ह केली जात नाही. तुम्ही डाव्या बाजूने PDF फाईल निवडताच ती थेट येथे दिसेल आणि तुमचे फोटो व सही आपोआप अचूक जागेवर जोडले जातील.
            </p>
          </div>

          {/* Blank Grid Structure Mockup */}
          <div className="space-y-3 text-[10px] opacity-60">
            <div className="border border-slate-400 p-2 rounded">
              <span className="font-bold block text-slate-900">1. Full Name (Full expanded name to be mentioned)</span>
              <div className="grid grid-cols-20 gap-0.5 mt-1">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="h-4 border border-slate-300 bg-slate-50"></div>
                ))}
              </div>
            </div>

            <div className="border border-slate-400 p-2 rounded">
              <span className="font-bold block text-slate-900">2. Date of Birth / Incorporation</span>
              <div className="flex gap-1 mt-1">
                <div className="w-6 h-5 border border-slate-300 bg-slate-50 text-center text-[9px]">D</div>
                <div className="w-6 h-5 border border-slate-300 bg-slate-50 text-center text-[9px]">D</div>
                <div className="w-2 text-center">/</div>
                <div className="w-6 h-5 border border-slate-300 bg-slate-50 text-center text-[9px]">M</div>
                <div className="w-6 h-5 border border-slate-300 bg-slate-50 text-center text-[9px]">M</div>
                <div className="w-2 text-center">/</div>
                <div className="w-6 h-5 border border-slate-300 bg-slate-50 text-center text-[9px]">Y</div>
                <div className="w-6 h-5 border border-slate-300 bg-slate-50 text-center text-[9px]">Y</div>
                <div className="w-6 h-5 border border-slate-300 bg-slate-50 text-center text-[9px]">Y</div>
                <div className="w-6 h-5 border border-slate-300 bg-slate-50 text-center text-[9px]">Y</div>
              </div>
            </div>

            <div className="border border-slate-400 p-2 rounded">
              <span className="font-bold block text-slate-900">3. Aadhaar Number (12 digits)</span>
              <div className="flex gap-1 mt-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-6 h-5 border border-slate-300 bg-slate-50"></div>
                ))}
              </div>
            </div>

            <div className="border border-slate-400 p-2 rounded">
              <span className="font-bold block text-slate-900">4. Residence Address</span>
              <div className="space-y-1 mt-1">
                <div className="h-4 border border-slate-300 bg-slate-50"></div>
                <div className="h-4 border border-slate-300 bg-slate-50"></div>
                <div className="h-4 border border-slate-300 bg-slate-50"></div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 text-center border-t border-slate-200 pt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>DPDP Act २०२३ व IT कायदा नियमांनुसार ग्राहक वैयक्तिक डेटा १००% सुरक्षित</span>
          </div>
        </div>
      )}

      {/* OVERLAY 1: Left Photo (with optional Cross Signature) */}
      <div
        style={{
          left: `${p1X}%`,
          top: `${p1Y}%`,
          width: `${p1W}%`,
          height: `${p1H}%`
        }}
        className="absolute z-10 overflow-hidden flex items-center justify-center bg-transparent group"
      >
        {data.applicantPhotoUrl ? (
          <img
            src={data.applicantPhotoUrl}
            alt="Left Photo"
            className="w-full h-full object-cover rounded-2xs shadow-xs"
          />
        ) : (
          <div className="w-full h-full border-2 border-dashed border-red-500 bg-red-50/70 flex flex-col items-center justify-center p-1 text-center shadow-xs">
            <span className="text-[10px] font-black text-red-700 leading-tight">
              फोटो १<br />(Photo 1)
            </span>
          </div>
        )}

        {/* Diagonal Cross Signature across Left Photo */}
        {data.panCrossSignEnabled !== false && data.applicantSignatureUrl && (
          <div className="absolute -bottom-2 -left-2 w-[115%] h-[60%] -rotate-20 pointer-events-none flex items-center justify-center opacity-95">
            <img
              src={data.applicantSignatureUrl}
              alt="Cross Signature"
              className="max-h-full max-w-full object-contain filter contrast-125"
            />
          </div>
        )}
      </div>

      {/* OVERLAY 2: Right Photo */}
      <div
        style={{
          left: `${p2X}%`,
          top: `${p2Y}%`,
          width: `${p2W}%`,
          height: `${p2H}%`
        }}
        className="absolute z-10 overflow-hidden flex items-center justify-center bg-transparent group"
      >
        {data.applicantPhotoUrl ? (
          <img
            src={data.applicantPhotoUrl}
            alt="Right Photo"
            className="w-full h-full object-cover rounded-2xs shadow-xs"
          />
        ) : (
          <div className="w-full h-full border-2 border-dashed border-red-500 bg-red-50/70 flex flex-col items-center justify-center p-1 text-center shadow-xs">
            <span className="text-[10px] font-black text-red-700 leading-tight">
              फोटो २<br />(Photo 2)
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const renderPage2 = () => (
    <div className="a4-page relative border border-slate-300 print:border-none print:shadow-none bg-white overflow-hidden shadow-md mx-auto select-none">
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

      {hasUploadedPage2 ? (
        /* Real Uploaded PDF Page 2 (No personal data stored on server!) */
        <img
          src={data.panPage2ImageUrl}
          alt={isCorrection ? 'PAN Correction CR-01 Page 2' : 'PAN Form 49A Page 2'}
          className="w-full h-full object-cover block"
        />
      ) : (
        /* Clean, Privacy-Protected Blank Page 2 Mockup */
        <div className="w-full h-full p-6 flex flex-col justify-between text-slate-800 bg-white font-serif">
          {/* Header */}
          <div className="border-b border-slate-300 pb-2 text-center">
            <div className="text-[11px] font-black uppercase text-slate-900">
              {isCorrection ? 'PAN CR-01 PAGE 2' : 'FORM NO. 49A PAGE 2'}
            </div>
            <div className="text-[9px] text-slate-500">
              Details of Parents, AO Code & Verification
            </div>
          </div>

          <div className="space-y-4 my-auto opacity-70 text-[10px]">
            <div className="border border-slate-300 p-2.5 rounded">
              <span className="font-bold block text-slate-900">PART C - Father&apos;s Name</span>
              <div className="grid grid-cols-20 gap-0.5 mt-1">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="h-4 border border-slate-300 bg-slate-50"></div>
                ))}
              </div>
            </div>

            <div className="border border-slate-300 p-2.5 rounded">
              <span className="font-bold block text-slate-900">PART D - Assessing Officer Code (AO Code)</span>
              <div className="flex gap-2 mt-1">
                <div className="w-16 h-5 border border-slate-300 bg-slate-50 text-center text-[9px] pt-0.5">Area Code</div>
                <div className="w-16 h-5 border border-slate-300 bg-slate-50 text-center text-[9px] pt-0.5">AO Type</div>
                <div className="w-16 h-5 border border-slate-300 bg-slate-50 text-center text-[9px] pt-0.5">Range Code</div>
                <div className="w-16 h-5 border border-slate-300 bg-slate-50 text-center text-[9px] pt-0.5">AO No.</div>
              </div>
            </div>

            <div className="border border-slate-300 p-2.5 rounded">
              <span className="font-bold block text-slate-900">Verification & Declaration</span>
              <p className="text-[9px] text-slate-600 mt-1 leading-relaxed">
                I/We do hereby declare that what is stated above is true to the best of my/our knowledge and belief.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-300 pt-2 text-center text-[10px] text-slate-400">
            {isCorrection ? 'दुरुस्ती अर्ज - स्वाक्षरी पृष्ठ' : 'नवीन पॅन अर्ज - स्वाक्षरी पृष्ठ'}
          </div>
        </div>
      )}

      {/* OVERLAY: Page 2 Signature Box (Auto positioned for New PAN or Correction) */}
      <div
        style={{
          left: `${signX}%`,
          top: `${signY}%`,
          width: `${signW}%`,
          height: `${signH}%`
        }}
        className="absolute z-10 overflow-hidden flex items-center justify-center bg-transparent group"
      >
        {data.applicantSignatureUrl ? (
          <img
            src={data.applicantSignatureUrl}
            alt="Applicant Signature Page 2"
            className="max-h-full max-w-full object-contain filter contrast-125"
          />
        ) : (
          <div className="w-full h-full border-2 border-dashed border-red-500 bg-red-50/70 flex items-center justify-center px-2 shadow-xs">
            <span className="text-[11px] font-black text-red-700">
              ✍️ येथे सही / अंगठा (Signature)
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (pageNumber === 'all') {
    return (
      <div className="space-y-8 print:space-y-0">
        <div className="print-page">{renderPage1()}</div>
        <div className="print-page page-break">{renderPage2()}</div>
      </div>
    );
  }

  return pageNumber === 2 ? renderPage2() : renderPage1();
};
