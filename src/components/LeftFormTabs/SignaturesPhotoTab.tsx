import React, { useRef, useState } from 'react';
import { STFormData } from '../../types/form';
import { SignatureModal } from '../SignatureModal';
import { PenTool, Upload, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface SignaturesPhotoTabProps {
  data: STFormData;
  onChange: (updates: Partial<STFormData>) => void;
}

export const SignaturesPhotoTab: React.FC<SignaturesPhotoTabProps> = ({ data, onChange }) => {
  const applicantSigInputRef = useRef<HTMLInputElement>(null);
  const fatherSigInputRef = useRef<HTMLInputElement>(null);
  const witnessSigInputRef = useRef<HTMLInputElement>(null);

  const [activeModal, setActiveModal] = useState<'applicant' | 'father' | 'witness' | null>(null);

  const isMinor = data.age < 18;

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof STFormData
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({ [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 18-Year Age Rule Callout */}
      {isMinor ? (
        <div className="bg-amber-50 border border-amber-300 p-3 rounded-lg text-amber-950 flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">१८ वर्षांखालील अर्जदार अट (Minor Applicant Rule):</span>
            <p className="text-[11px] text-amber-900 mt-0.5 leading-relaxed">
              अर्जदाराचे वय <b>{data.age} वर्षे</b> असल्याने नियमानुसार अर्जावर अर्जदाराच्या जागी आपोआप <b>वडिलांची / पालकांची सही व नाव</b> लागणार आहे. कृपया खाली वडिलांची स्वाक्षरी अपलोड करा किंवा डिजिटल पेनने करा.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>अर्जदार सज्ञान आहे (वय: {data.age} वर्षे) - अर्जदाराची स्वाक्षरी सर्व पानांवर लागू होईल.</span>
        </div>
      )}

      {/* 1. अर्जदाराची स्वाक्षरी (Applicant Signature) */}
      <div className={`border rounded-lg p-3 bg-white ${isMinor ? 'border-slate-200 opacity-80' : 'border-indigo-300 ring-1 ring-indigo-200'}`}>
        <div className="flex items-center justify-between mb-1.5">
          <label className="font-bold text-slate-800 text-sm">
            १. अर्जदाराची स्वाक्षरी (Applicant Signature)
          </label>
          {isMinor && (
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
              (वय &lt; १८ असल्याने सध्या पालकांची सही लागू)
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {data.applicantSignatureUrl ? (
            <div className="relative group w-32 h-14 bg-white border border-slate-300 rounded p-1 flex items-center justify-center">
              <img
                src={data.applicantSignatureUrl}
                alt="Applicant Signature"
                className="max-h-full max-w-full object-contain"
              />
              <button
                type="button"
                onClick={() => onChange({ applicantSignatureUrl: '' })}
                className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-0.5 shadow-sm hover:bg-red-700"
                title="काढा"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-32 h-14 bg-slate-100 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-[10px]">
              स्वाक्षरी नाही
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <input
              type="file"
              ref={applicantSigInputRef}
              onChange={(e) => handleFileUpload(e, 'applicantSignatureUrl')}
              accept="image/*"
              className="hidden"
            />
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => applicantSigInputRef.current?.click()}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-md transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                फाईल अपलोड
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('applicant')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 font-medium rounded-md transition-colors"
              >
                <PenTool className="w-3.5 h-3.5" />
                स्क्रीनवर सही करा
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. वडिलांची / पालकांची स्वाक्षरी (Father / Guardian Signature) */}
      <div className={`border rounded-lg p-3 bg-white ${isMinor ? 'border-amber-400 ring-2 ring-amber-200 bg-amber-50/20' : 'border-slate-200'}`}>
        <div className="flex items-center justify-between mb-1.5">
          <label className="font-bold text-slate-800 text-sm">
            २. वडिलांची / पालकांची स्वाक्षरी (Father / Guardian Signature)
          </label>
          {isMinor && (
            <span className="text-[10px] bg-amber-600 text-white font-bold px-2 py-0.5 rounded shadow-2xs">
              सक्रिय (Active for Minor)
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {data.fatherSignatureUrl ? (
            <div className="relative group w-32 h-14 bg-white border border-slate-300 rounded p-1 flex items-center justify-center">
              <img
                src={data.fatherSignatureUrl}
                alt="Father Signature"
                className="max-h-full max-w-full object-contain"
              />
              <button
                type="button"
                onClick={() => onChange({ fatherSignatureUrl: '' })}
                className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-0.5 shadow-sm hover:bg-red-700"
                title="काढा"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-32 h-14 bg-slate-100 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-[10px]">
              स्वाक्षरी नाही
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <input
              type="file"
              ref={fatherSigInputRef}
              onChange={(e) => handleFileUpload(e, 'fatherSignatureUrl')}
              accept="image/*"
              className="hidden"
            />
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => fatherSigInputRef.current?.click()}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-md transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                फाईल अपलोड
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('father')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-900 font-medium rounded-md transition-colors"
              >
                <PenTool className="w-3.5 h-3.5" />
                स्क्रीनवर सही करा
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. साक्षीदाराची स्वाक्षरी (Witness Signature) */}
      <div className="border border-slate-200 rounded-lg p-3 bg-white">
        <label className="font-bold text-slate-800 text-sm block mb-1.5">
          ३. साक्षीदाराची स्वाक्षरी (Witness Signature - पृष्ठ ४ व ५)
        </label>

        <div className="flex items-center gap-3">
          {data.witnessSignatureUrl ? (
            <div className="relative group w-32 h-14 bg-white border border-slate-300 rounded p-1 flex items-center justify-center">
              <img
                src={data.witnessSignatureUrl}
                alt="Witness Signature"
                className="max-h-full max-w-full object-contain"
              />
              <button
                type="button"
                onClick={() => onChange({ witnessSignatureUrl: '' })}
                className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-0.5 shadow-sm hover:bg-red-700"
                title="काढा"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-32 h-14 bg-slate-100 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-[10px]">
              स्वाक्षरी नाही
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <input
              type="file"
              ref={witnessSigInputRef}
              onChange={(e) => handleFileUpload(e, 'witnessSignatureUrl')}
              accept="image/*"
              className="hidden"
            />
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => witnessSigInputRef.current?.click()}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-md transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                फाईल अपलोड
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('witness')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium rounded-md transition-colors"
              >
                <PenTool className="w-3.5 h-3.5" />
                स्क्रीनवर सही करा
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Pad Modal for Canvas Drawing */}
      <SignatureModal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={
          activeModal === 'applicant'
            ? 'अर्जदाराची स्वाक्षरी'
            : activeModal === 'father'
            ? 'वडिलांची / पालकांची स्वाक्षरी'
            : 'साक्षीदाराची स्वाक्षरी'
        }
        onSave={(dataUrl) => {
          if (activeModal === 'applicant') onChange({ applicantSignatureUrl: dataUrl });
          if (activeModal === 'father') onChange({ fatherSignatureUrl: dataUrl });
          if (activeModal === 'witness') onChange({ witnessSignatureUrl: dataUrl });
        }}
      />
    </div>
  );
};
