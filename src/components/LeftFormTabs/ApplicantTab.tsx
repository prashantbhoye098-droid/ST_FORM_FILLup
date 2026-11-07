import React, { useRef } from 'react';
import { STFormData } from '../../types/form';
import { calculateAgeFromBirthdate } from '../../constants/initialData';
import { User, Upload, Trash2, AlertCircle } from 'lucide-react';

interface ApplicantTabProps {
  data: STFormData;
  onChange: (updates: Partial<STFormData>) => void;
}

export const ApplicantTab: React.FC<ApplicantTabProps> = ({ data, onChange }) => {
  const photoInputRef = useRef<HTMLInputElement>(null);

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

  const handleBirthDateChange = (dateVal: string) => {
    const calculatedAge = calculateAgeFromBirthdate(dateVal);
    onChange({
      birthDate: dateVal,
      age: calculatedAge > 0 ? calculatedAge : data.age
    });
  };

  const isMinor = data.age < 18;

  return (
    <div className="space-y-4 text-xs">
      {/* 18-Year Age Rule Status Alert */}
      {isMinor ? (
        <div className="bg-amber-50 border border-amber-300 p-3 rounded-lg flex items-start gap-2.5 text-amber-900 leading-relaxed animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">अर्जदाराचे वय १८ वर्षांपेक्षा कमी आहे ({data.age} वर्षे)</div>
            <p className="text-[11px] text-amber-800 mt-0.5">
              नियमानुसार सर्व पानांवर अर्जावर सहीसाठी आपोआप वडिलांचे / पालकांचे नाव व स्वाक्षरी लागू करण्यात येईल.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-emerald-900 text-[11px] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>अर्जदार सज्ञान आहे (वय: {data.age} वर्षे) - अर्जदाराची स्वतःची स्वाक्षरी लागू होईल.</span>
        </div>
      )}

      {/* Applicant Photo Upload (Pages 1 & 6) */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
        <label className="font-bold text-slate-800 block mb-1">
          अर्जदाराचा फोटो (Applicant Photo) *
        </label>
        <p className="text-[11px] text-slate-500 mb-2">
          हा फोटो फॉर्मच्या पृष्ठ १ व पृष्ठ ६ (दोन्ही ठिकाणी) आपोआप लागेल.
        </p>

        <div className="flex items-center gap-3">
          {data.applicantPhotoUrl ? (
            <div className="relative group w-16 h-20 bg-white border border-slate-300 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src={data.applicantPhotoUrl}
                alt="Applicant Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onChange({ applicantPhotoUrl: '' })}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 shadow-sm hover:bg-red-700"
                title="फोटो काढा"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-16 h-20 bg-slate-200 border-2 border-dashed border-slate-300 rounded-md flex flex-col items-center justify-center text-slate-400">
              <User className="w-6 h-6" />
              <span className="text-[9px] mt-1 font-medium">फोटो</span>
            </div>
          )}

          <div className="flex-1">
            <input
              type="file"
              ref={photoInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              पासपोर्ट फोटो निवडा
            </button>
            <p className="text-[10px] text-slate-500 mt-1">
              JPG किंवा PNG (पासपोर्ट साईज ३.५ सेमी × ४.५ सेमी)
            </p>
          </div>
        </div>
      </div>

      {/* Applicant Full Name */}
      <div>
        <label className="font-bold text-slate-800 block mb-1">
          १(अ) अर्जदाराचे पूर्ण नाव (Full Name) *
        </label>
        <input
          type="text"
          value={data.applicantName}
          onChange={(e) => {
            const val = e.target.value;
            onChange({
              applicantName: val,
              vanshaval: { ...data.vanshaval, applicant: val }
            });
          }}
          placeholder="उदा. अर्जदाराचे पूर्ण नाव"
          className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-semibold"
        />
      </div>

      {/* Gender, DOB & Age */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div>
          <label className="font-bold text-slate-800 block mb-1">लिंग (Gender)</label>
          <select
            value={data.gender}
            onChange={(e) => onChange({ gender: e.target.value as 'पुरुष' | 'स्त्री' | 'इतर' })}
            className="w-full px-2.5 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          >
            <option value="पुरुष">पुरुष</option>
            <option value="स्त्री">स्त्री</option>
            <option value="इतर">इतर</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">जन्म तारीख (DOB)</label>
          <input
            type="date"
            value={data.birthDate}
            onChange={(e) => handleBirthDateChange(e.target.value)}
            className="w-full px-2 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          />
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">वय (Age in Years)</label>
          <input
            type="number"
            min={1}
            max={120}
            value={data.age}
            onChange={(e) => onChange({ age: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-semibold"
          />
        </div>
      </div>

      {/* Village, Taluka, District */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div>
          <label className="font-bold text-slate-800 block mb-1">गावाचे नाव (Village)</label>
          <input
            type="text"
            value={data.village}
            onChange={(e) => onChange({ village: e.target.value })}
            placeholder="उदा. गावाचे नाव"
            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          />
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">तहसील (Taluka)</label>
          <input
            type="text"
            value={data.taluka}
            onChange={(e) => onChange({ taluka: e.target.value })}
            placeholder="उदा. तालुक्याचे नाव"
            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          />
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">जिल्हा (District)</label>
          <input
            type="text"
            value={data.district}
            onChange={(e) => onChange({ district: e.target.value })}
            placeholder="उदा. जिल्ह्याचे नाव"
            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          />
        </div>
      </div>

      {/* Address & Post Office */}
      <div>
        <label className="font-bold text-slate-800 block mb-1">सध्याचा पूर्ण पत्ता (Address)</label>
        <input
          type="text"
          value={data.currentAddress}
          onChange={(e) => onChange({ currentAddress: e.target.value })}
          placeholder="उदा. मु. पो. ..., ता. ..., जि. ..."
          className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
        />
      </div>

      <div>
        <label className="font-bold text-slate-800 block mb-1">डाक कार्यालयाचे नाव (Post Office)</label>
        <input
          type="text"
          value={data.postOffice}
          onChange={(e) => onChange({ postOffice: e.target.value })}
          placeholder="उदा. पोस्ट ऑफिसचे नाव"
          className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
        />
      </div>

      {/* Occupations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
        <div>
          <label className="font-bold text-slate-800 block mb-1">
            १(ब) अर्जदाराचा सध्याचा व्यवसाय
          </label>
          <select
            value={data.applicantCurrentOccupation}
            onChange={(e) => onChange({ applicantCurrentOccupation: e.target.value })}
            className="w-full px-2.5 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          >
            <option value="शिक्षण">शिक्षण</option>
            <option value="शेती">शेती</option>
            <option value="नोकरी">नोकरी</option>
            <option value="मजुरी">मजुरी</option>
            <option value="इतर">इतर</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">
            १(क) अर्जदाराचा परंपरागत व्यवसाय
          </label>
          <select
            value={data.applicantTraditionalOccupation}
            onChange={(e) => onChange({ applicantTraditionalOccupation: e.target.value })}
            className="w-full px-2.5 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          >
            <option value="शेती">शेती</option>
            <option value="मजुरी">मजुरी</option>
            <option value="शिक्षण">शिक्षण</option>
            <option value="नोकरी">नोकरी</option>
            <option value="इतर">इतर</option>
          </select>
        </div>
      </div>
    </div>
  );
};
