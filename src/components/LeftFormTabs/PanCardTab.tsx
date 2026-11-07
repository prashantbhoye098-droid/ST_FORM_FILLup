import React, { useState } from 'react';
import { STFormData } from '../../types/form';
import {
  generatePanPdfWithOverlays,
  renderPdfPagesToImages
} from '../../utils/panPdfGenerator';
import {
  Upload,
  Camera,
  PenTool,
  Download,
  Printer,
  Sparkles,
  Sliders,
  CheckCircle,
  RotateCcw,
  FileText,
  Loader2,
  FileCheck2,
  HelpCircle
} from 'lucide-react';

interface PanCardTabProps {
  data: STFormData;
  onChange: (updates: Partial<STFormData>) => void;
  onRequestPrint?: () => void;
  isPaymentActive?: boolean;
  isPaid?: boolean;
  onRequirePayment?: () => void;
}

export const PanCardTab: React.FC<PanCardTabProps> = ({
  data,
  onChange,
  onRequestPrint,
  isPaymentActive = false,
  isPaid = false,
  onRequirePayment
}) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const isCorrection = data.panFormType === 'CORRECTION_CR01';

  // 1. Switch Form Mode: New PAN vs PAN Correction
  const handleSelectMode = (type: 'NEW_49A' | 'CORRECTION_CR01') => {
    if (type === 'CORRECTION_CR01') {
      onChange({
        panFormType: 'CORRECTION_CR01',
        panPdfFileName: data.panPdfBytes ? data.panPdfFileName : 'Q026020627_PAN_Correction_CR01.pdf',
        panSignPage2X: 53.5,
        panSignPage2Y: 41.0,
        panSignPage2Width: 38.0,
        panSignPage2Height: 5.2,
        panPage1ImageUrl: data.panPdfBytes ? data.panPage1ImageUrl : undefined,
        panPage2ImageUrl: data.panPdfBytes ? data.panPage2ImageUrl : undefined
      });
    } else {
      onChange({
        panFormType: 'NEW_49A',
        panPdfFileName: data.panPdfBytes ? data.panPdfFileName : 'A125752330_PAN_Form49A.pdf',
        panSignPage2X: 56.5,
        panSignPage2Y: 90.0,
        panSignPage2Width: 36.5,
        panSignPage2Height: 5.0,
        panPage1ImageUrl: data.panPdfBytes ? data.panPage1ImageUrl : undefined,
        panPage2ImageUrl: data.panPdfBytes ? data.panPage2ImageUrl : undefined
      });
    }
  };

  // 2. Handle ANY Uploaded PAN PDF (New or Correction)
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoadingPdf(true);
      const buffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(buffer);

      // Auto-detect if file is a Correction Form based on filename
      const fname = file.name.toLowerCase();
      const detectedCorrection =
        fname.includes('corr') ||
        fname.includes('cr') ||
        fname.includes('change') ||
        file.name.startsWith('Q') ||
        file.name.startsWith('U-Q');

      const nextType = detectedCorrection ? 'CORRECTION_CR01' : 'NEW_49A';

      // Render Page 1 and Page 2 as images for instant preview
      try {
        const { page1, page2 } = await renderPdfPagesToImages(uint8);
        onChange({
          panFormType: nextType,
          panPdfFileName: file.name,
          panPdfBytes: uint8,
          panPage1ImageUrl: page1,
          panPage2ImageUrl: page2,
          panSignPage2X: detectedCorrection ? 53.5 : 56.5,
          panSignPage2Y: detectedCorrection ? 41.0 : 90.0,
          panSignPage2Width: detectedCorrection ? 38.0 : 36.5,
          panSignPage2Height: detectedCorrection ? 5.2 : 5.0
        });
      } catch (renderErr) {
        console.warn('PDF.js render fallback, saving bytes', renderErr);
        onChange({
          panFormType: nextType,
          panPdfFileName: file.name,
          panPdfBytes: uint8,
          panSignPage2X: detectedCorrection ? 53.5 : 56.5,
          panSignPage2Y: detectedCorrection ? 41.0 : 90.0,
          panSignPage2Width: detectedCorrection ? 38.0 : 36.5,
          panSignPage2Height: detectedCorrection ? 5.2 : 5.0
        });
      }

      alert(
        `✓ ${file.name} यशस्वीरित्या लोड झाली! (${detectedCorrection ? 'पॅन दुरुस्ती (Correction CR-01)' : 'नवीन पॅन (Form 49A)'} प्रकार आपोआप ओळखला आणि स्वाक्षरी अचूक सेट केली).`
      );
    } catch (err) {
      console.error('Failed to load PDF', err);
      alert('PDF लोड करताना त्रुटी आली. कृपया वैध २-पानी PAN PDF फाईल निवडा.');
    } finally {
      setIsLoadingPdf(false);
    }
  };

  // 3. Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({ applicantPhotoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // 4. Handle Signature Upload
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({ applicantSignatureUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // 5. Download Completed 2-Page PDF
  const handleDownloadGeneratedPdf = async () => {
    // If Admin enabled Master Payment Box and user has not paid yet, trigger Razorpay/QR payment modal
    if (isPaymentActive && !isPaid) {
      onRequirePayment?.();
      return;
    }

    try {
      setIsGeneratingPdf(true);

      const defaultTemplate = isCorrection
        ? '/assets/aistudio/Q026020627_c04f6533.pdf'
        : '/assets/aistudio/A125752330_1f5c854d.pdf';

      const pdfSource = data.panPdfBytes || defaultTemplate;

      const blob = await generatePanPdfWithOverlays({
        pdfUrlOrBytes: pdfSource,
        photoDataUrl: data.applicantPhotoUrl,
        signatureDataUrl: data.applicantSignatureUrl,
        crossSign: data.panCrossSignEnabled !== false,
        isCorrection: isCorrection,
        photo1X: data.panPhoto1X,
        photo1Y: data.panPhoto1Y,
        photo1Width: data.panPhoto1Width,
        photo1Height: data.panPhoto1Height,
        photo2X: data.panPhoto2X,
        photo2Y: data.panPhoto2Y,
        photo2Width: data.panPhoto2Width,
        photo2Height: data.panPhoto2Height,
        signPage2X: data.panSignPage2X,
        signPage2Y: data.panSignPage2Y,
        signPage2Width: data.panSignPage2Width,
        signPage2Height: data.panSignPage2Height
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const prefix = isCorrection ? 'PAN_Correction_CR01' : 'PAN_New_Form49A';
      link.download = `${prefix}_${data.applicantName ? data.applicantName.replace(/\s+/g, '_') : 'Completed'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('PDF generation error', err);
      alert('PDF तयार करताना त्रुटी आली. कृपया ब्राउझर प्रिंट पर्याय वापरा.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleResetPositions = () => {
    onChange({
      panPhoto1X: 4.2,
      panPhoto1Y: 13.0,
      panPhoto1Width: 16.5,
      panPhoto1Height: 15.2,
      panPhoto2X: 79.5,
      panPhoto2Y: 13.0,
      panPhoto2Width: 16.5,
      panPhoto2Height: 15.2,
      panSignPage2X: isCorrection ? 53.5 : 56.5,
      panSignPage2Y: isCorrection ? 41.0 : 90.0,
      panSignPage2Width: isCorrection ? 38.0 : 36.5,
      panSignPage2Height: isCorrection ? 5.2 : 5.0,
      panCrossSignEnabled: true
    });
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. PAN FORM TYPE SELECTOR: New PAN vs PAN Correction */}
      <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 space-y-2 shadow-sm text-white">
        <div className="flex items-center justify-between px-1">
          <span className="font-extrabold text-[11px] text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>पॅन फॉर्म प्रकार निवडा (Select PAN Type):</span>
          </span>
          <span className="text-[10px] text-slate-400">१-क्लिक अचूक जागा</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* New PAN Mode */}
          <button
            type="button"
            onClick={() => handleSelectMode('NEW_49A')}
            className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
              !isCorrection
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-400 shadow-md ring-2 ring-emerald-400/50'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-xs">१. नवीन पॅन (Form 49A)</span>
              {!isCorrection && <CheckCircle className="w-4 h-4 text-white" />}
            </div>
            <span className="text-[10px] opacity-90 leading-tight">
              स्वाक्षरी Page 2 च्या **शेवटी खाली** (Bottom)
            </span>
          </button>

          {/* PAN Correction Mode */}
          <button
            type="button"
            onClick={() => handleSelectMode('CORRECTION_CR01')}
            className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
              isCorrection
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-blue-400 shadow-md ring-2 ring-blue-400/50'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-xs">२. पॅन दुरुस्ती (CR-01)</span>
              {isCorrection && <CheckCircle className="w-4 h-4 text-white" />}
            </div>
            <span className="text-[10px] opacity-90 leading-tight">
              स्वाक्षरी Page 2 च्या **मध्यावर वरती** (Middle)
            </span>
          </button>
        </div>
      </div>

      {/* Info Notice about current mode */}
      <div
        className={`p-2.5 rounded-xl border flex items-center gap-2 ${
          isCorrection
            ? 'bg-blue-50 border-blue-300 text-blue-950'
            : 'bg-emerald-50 border-emerald-300 text-emerald-950'
        }`}
      >
        <Sparkles className="w-4 h-4 shrink-0 text-amber-500" />
        <span className="text-[11px] font-bold leading-relaxed">
          {isCorrection ? (
            <>
              <b>पॅन दुरुस्ती (CR-01) सक्रिय आहे:</b> Page 2 वरील स्वाक्षरी आपोआप वर सरकवून मध्यभागी अधिकृत जागेवर सेट केली आहे.
            </>
          ) : (
            <>
              <b>नवीन पॅन (Form 49A) सक्रिय आहे:</b> Page 2 वरील स्वाक्षरी खालील अधिकृत बॉक्समध्ये सेट आहे.
            </>
          )}
        </span>
      </div>

      {/* STEP 1: UPLOAD ANY PAN PDF FILE (New or Correction) */}
      <div className="border-2 border-dashed border-indigo-400 rounded-xl p-3.5 bg-indigo-50/60 text-center space-y-2 shadow-xs hover:bg-indigo-50 transition-colors">
        <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-sm">
          {isLoadingPdf ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FileText className="w-4 h-4" />
          )}
        </div>

        <div>
          <span className="font-black text-indigo-950 text-xs block">
            १. नवीन पॅन PDF फाईल अपलोड करा (Upload Any PAN PDF)
          </span>
          <p className="text-[10px] text-indigo-900/80 mt-0.5">
            सध्याची फाईल: <b className="font-mono text-indigo-950 underline">{data.panPdfFileName || (isCorrection ? 'Q026020627_Correction.pdf' : 'A125752330_Form49A.pdf')}</b>
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-black text-xs rounded-lg cursor-pointer shadow-sm transition-all hover:scale-101">
          <Upload className="w-3.5 h-3.5" />
          <span>{isLoadingPdf ? 'PDF लोड होत आहे...' : 'पॅन PDF फाईल निवडा (Auto-Detect)'}</span>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            disabled={isLoadingPdf}
            className="hidden"
          />
        </label>
        <p className="text-[10px] text-slate-500">
          (नवीन पॅन असो वा करेक्शन फॉर्म, सिस्टीम दोन्ही पाने आपोआप ओळखते)
        </p>
      </div>

      {/* STEP 2: PASSPORT PHOTO UPLOAD (Page 1 Left & Right Boxes) */}
      <div className="border-2 border-blue-300 rounded-xl p-3.5 bg-blue-50/50 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <label className="font-extrabold text-blue-950 text-xs flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-blue-600" />
            <span>२. पासपोर्ट फोटो (Page 1 वरील २ फोटो बॉक्स) *</span>
          </label>
          <span className="text-[10px] bg-blue-200 text-blue-900 font-black px-2 py-0.5 rounded-full">
            ३.५ × ४.५ सेमी
          </span>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-16 h-20 border-2 border-slate-300 rounded-lg bg-white overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
            {data.applicantPhotoUrl ? (
              <img
                src={data.applicantPhotoUrl}
                alt="Passport Photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[9px] text-slate-400 font-bold text-center p-1">
                फोटो नाही
              </span>
            )}
          </div>

          <div className="flex-1 space-y-1.5">
            <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>पासपोर्ट फोटो निवडा</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
            <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
              ✓ Page 1 वर डाव्या व उजव्या दोन्ही अधिकृत बॉक्समध्ये आपोआप बसेल.
            </p>
          </div>
        </div>
      </div>

      {/* STEP 3: SIGNATURE UPLOAD (Page 2 Signature Box) */}
      <div className="border-2 border-emerald-300 rounded-xl p-3.5 bg-emerald-50/50 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <label className="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5">
            <PenTool className="w-4 h-4 text-emerald-600" />
            <span>३. स्वाक्षरी / अंगठा (Page 2 {isCorrection ? 'मध्यभागी वरती' : 'खाली उजव्या कोपऱ्यात'}) *</span>
          </label>
          <span className="text-[10px] bg-emerald-200 text-emerald-900 font-black px-2 py-0.5 rounded-full">
            {isCorrection ? 'मध्यावर' : 'शेवटी'}
          </span>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-24 h-14 border-2 border-slate-300 rounded-lg bg-white overflow-hidden flex items-center justify-center shrink-0 shadow-xs p-1">
            {data.applicantSignatureUrl ? (
              <img
                src={data.applicantSignatureUrl}
                alt="Signature"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-[9px] text-slate-400 font-bold text-center">
                सही नाही
              </span>
            )}
          </div>

          <div className="flex-1 space-y-1.5">
            <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>स्वाक्षरी अपलोड करा</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleSignatureUpload}
                className="hidden"
              />
            </label>
            <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
              ✓ Page 2 वर (Signature of Applicant) च्या अधिकृत जागेवर आपोआप बसेल.
            </p>
          </div>
        </div>

        {/* Cross signature toggle */}
        <div className="pt-1.5 border-t border-emerald-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.panCrossSignEnabled !== false}
              onChange={(e) => onChange({ panCrossSignEnabled: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded"
            />
            <span className="text-[11px] font-bold text-slate-800">
              Page 1 वरील डाव्या फोटोवर नियमानुसार तिरपी क्रॉस सही (Cross Sign) लावा
            </span>
          </label>
        </div>
      </div>

      {/* STEP 4: FINE ADJUSTMENTS (+/- Positioning) */}
      <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-2">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowAdjustments(!showAdjustments)}
            className="font-bold text-slate-700 text-xs flex items-center gap-1.5 hover:text-indigo-600 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showAdjustments ? 'बारीक जागा ॲडजस्टमेंट लपवा' : 'फोटो व सहीची जागा बारीक सरकवा (+/-)'}</span>
          </button>
          <button
            type="button"
            onClick={handleResetPositions}
            className="text-[10px] text-slate-500 hover:text-red-600 flex items-center gap-1 cursor-pointer font-bold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>रीसेट</span>
          </button>
        </div>

        {showAdjustments && (
          <div className="space-y-2.5 pt-2 border-t border-slate-200 animate-fade-in text-[11px]">
            {/* Page 2 Signature Position slider */}
            <div className="bg-white p-2 rounded border border-slate-200 space-y-1">
              <span className="font-black text-slate-800 block">
                Page 2 स्वाक्षरी जागा (सध्या: {isCorrection ? 'दुरुस्ती फॉर्म' : 'नवीन फॉर्म'})
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500">डावीकडून अंतर (X %):</label>
                  <input
                    type="range"
                    min="35"
                    max="80"
                    step="0.2"
                    value={data.panSignPage2X ?? (isCorrection ? 53.5 : 56.5)}
                    onChange={(e) => onChange({ panSignPage2X: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">वरून अंतर (Y %):</label>
                  <input
                    type="range"
                    min="20"
                    max="98"
                    step="0.2"
                    value={data.panSignPage2Y ?? (isCorrection ? 41.0 : 90.0)}
                    onChange={(e) => onChange({ panSignPage2Y: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Left Photo */}
            <div className="bg-white p-2 rounded border border-slate-200 space-y-1">
              <span className="font-black text-slate-800 block">फोटो १ (Page 1 डावा फोटो)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500">डावीकडून अंतर (X %):</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.2"
                    value={data.panPhoto1X ?? 4.2}
                    onChange={(e) => onChange({ panPhoto1X: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">वरून अंतर (Y %):</label>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="0.2"
                    value={data.panPhoto1Y ?? 13.0}
                    onChange={(e) => onChange({ panPhoto1Y: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Right Photo */}
            <div className="bg-white p-2 rounded border border-slate-200 space-y-1">
              <span className="font-black text-slate-800 block">फोटो २ (Page 1 उजवा फोटो)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500">डावीकडून अंतर (X %):</label>
                  <input
                    type="range"
                    min="65"
                    max="95"
                    step="0.2"
                    value={data.panPhoto2X ?? 79.5}
                    onChange={(e) => onChange({ panPhoto2X: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500">वरून अंतर (Y %):</label>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="0.2"
                    value={data.panPhoto2Y ?? 13.0}
                    onChange={(e) => onChange({ panPhoto2Y: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STEP 5: DOWNLOAD & PRINT ACTIONS */}
      <div className="space-y-2 pt-1">
        <button
          type="button"
          onClick={handleDownloadGeneratedPdf}
          disabled={isGeneratingPdf || isLoadingPdf}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50 hover:shadow-lg"
        >
          {isGeneratingPdf ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>२-पानी {isCorrection ? 'दुरुस्ती' : 'नवीन'} PDF तयार होत आहे...</span>
            </span>
          ) : (
            <>
              <Download className="w-4 h-4 text-emerald-200" />
              <span>२-पानी संपूर्ण {isCorrection ? 'दुरुस्ती' : 'नवीन'} PAN PDF डाउनलोड करा</span>
              {isPaymentActive && !isPaid && (
                <span className="ml-1 px-2 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-md shadow-2xs">
                  पेमेंट आवश्यक
                </span>
              )}
            </>
          )}
        </button>

        {downloadSuccess && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 text-xs font-bold flex items-center justify-center gap-1.5 animate-bounce">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>✓ PAN PDF फोटो आणि स्वाक्षरीसह यशस्वीरित्या डाउनलोड झाली!</span>
          </div>
        )}

        {onRequestPrint && (
          <button
            type="button"
            onClick={onRequestPrint}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-black text-amber-300 font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>ब्राउझरने दोन्ही पाने प्रिंट करा</span>
          </button>
        )}
      </div>
    </div>
  );
};
