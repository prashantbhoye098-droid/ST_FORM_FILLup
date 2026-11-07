import React from 'react';
import { STFormData } from '../../types/form';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface PanCardFormProps {
  data: STFormData;
  pageNumber?: 1 | 2 | 'all';
}

export const PanCardForm: React.FC<PanCardFormProps> = ({ data, pageNumber = 1 }) => {
  const isCorrection = data.panFormType === 'CORRECTION_CR01';

  // Default templates for New PAN (Form 49A) vs Correction (CR-01)
  const defaultPage1 = isCorrection
    ? '/assets/aistudio/pan_corr_page_1.png'
    : '/assets/aistudio/pan_page_1.png';
  const defaultPage2 = isCorrection
    ? '/assets/aistudio/pan_corr_page_2.png'
    : '/assets/aistudio/pan_page_2.png';

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

      {/* PAN Form Page 1 Background Image */}
      <img
        src={data.panPage1ImageUrl || defaultPage1}
        alt={isCorrection ? "PAN Correction CR-01 Page 1" : "PAN Form 49A Page 1"}
        className="w-full h-full object-cover block"
      />

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
            className="w-full h-full object-cover rounded-2xs"
          />
        ) : (
          <div className="w-full h-full border-2 border-dashed border-red-500 bg-red-50/60 flex flex-col items-center justify-center p-1 text-center">
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
            className="w-full h-full object-cover rounded-2xs"
          />
        ) : (
          <div className="w-full h-full border-2 border-dashed border-red-500 bg-red-50/60 flex flex-col items-center justify-center p-1 text-center">
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

      {/* PAN Form Page 2 Background Image */}
      <img
        src={data.panPage2ImageUrl || defaultPage2}
        alt={isCorrection ? "PAN Correction CR-01 Page 2" : "PAN Form 49A Page 2"}
        className="w-full h-full object-cover block"
      />

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
          <div className="w-full h-full border-2 border-dashed border-red-500 bg-red-50/60 flex items-center justify-center px-2">
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
