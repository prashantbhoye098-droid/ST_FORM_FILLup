import React from 'react';
import { STFormData } from '../../types/form';

interface FamilyTribeTabProps {
  data: STFormData;
  onChange: (updates: Partial<STFormData>) => void;
}

export const FamilyTribeTab: React.FC<FamilyTribeTabProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4 text-xs">
      {/* 2. वडिलांचे तपशील */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
        <div className="font-bold text-sm text-slate-800 border-b pb-1 border-slate-200">
          २. वडिलांची माहिती (Father Details)
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">
            २(अ) वडिलांचे पूर्ण नाव *
          </label>
          <input
            type="text"
            value={data.fatherName}
            onChange={(e) => {
              const val = e.target.value;
              onChange({
                fatherName: val,
                fatherNameAsGuardian: val,
                vanshaval: { ...data.vanshaval, father: val }
              });
            }}
            placeholder="उदा. वडिलांचे पूर्ण नाव"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-semibold"
          />
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">
            वडिलांचा पूर्ण पत्ता
          </label>
          <input
            type="text"
            value={data.fatherAddress}
            onChange={(e) => onChange({ fatherAddress: e.target.value })}
            placeholder="उदा. मु. पो. ..., ता. ..., जि. ..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="font-semibold text-slate-700">वडील ह्यात आहेत का?</label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="isFatherAlive"
                checked={data.isFatherAlive}
                onChange={() => onChange({ isFatherAlive: true })}
                className="text-indigo-600"
              />
              <span>होय (ह्यात आहेत)</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="isFatherAlive"
                checked={!data.isFatherAlive}
                onChange={() => onChange({ isFatherAlive: false })}
                className="text-indigo-600"
              />
              <span>नाही (हयात नाहीत)</span>
            </label>
          </div>
        </div>

        {!data.isFatherAlive && (
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              वडिलांच्या निवास्थानाचा शेवटच्या ठिकाणाचा पत्ता
            </label>
            <input
              type="text"
              value={data.fatherLastResidenceIfDeceased || ''}
              onChange={(e) => onChange({ fatherLastResidenceIfDeceased: e.target.value })}
              placeholder="उदा. मु. पो. ..., ता. ..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              २(ब) वडिलांचा सध्याचा व्यवसाय
            </label>
            <select
              value={data.fatherCurrentOccupation}
              onChange={(e) => onChange({ fatherCurrentOccupation: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            >
              <option value="शेती">शेती</option>
              <option value="मजुरी">मजुरी</option>
              <option value="नोकरी">नोकरी</option>
              <option value="शिक्षण">शिक्षण</option>
              <option value="इतर">इतर</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              २(क) वडिलांचा परंपरागत व्यवसाय
            </label>
            <select
              value={data.fatherTraditionalOccupation}
              onChange={(e) => onChange({ fatherTraditionalOccupation: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            >
              <option value="शेती">शेती</option>
              <option value="मजुरी">मजुरी</option>
              <option value="नोकरी">नोकरी</option>
              <option value="शिक्षण">शिक्षण</option>
              <option value="इतर">इतर</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. जात व भाषा */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
        <div className="font-bold text-sm text-slate-800 border-b pb-1 border-slate-200">
          ३. अनुसूचित जमातीचे नाव व भाषा (Tribe & Language)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              ३(अ)(१) अनुसूचित जमातीचे नाव *
            </label>
            <input
              type="text"
              value={data.tribeName}
              onChange={(e) => onChange({ tribeName: e.target.value })}
              placeholder="उदा. कोकणा / कोकणी / भिल्ल / महादेव कोळी"
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-bold"
            />
            <div className="flex gap-1.5 flex-wrap mt-1">
              {['कोकणा', 'कोकणी', 'भिल्ल', 'महादेव कोळी', 'वारली', 'कातकरी'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => onChange({ tribeName: t })}
                  className={`text-[10px] px-2 py-0.5 rounded-sm border ${
                    data.tribeName === t
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              ३(अ)(२) पोट-जमात (Sub-Tribe)
            </label>
            <input
              type="text"
              value={data.subTribe}
              onChange={(e) => onChange({ subTribe: e.target.value })}
              placeholder="उदा. कोकणी"
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              ३(ब)(१) मातृभाषा (Mother Tongue)
            </label>
            <select
              value={data.motherTongue}
              onChange={(e) => onChange({ motherTongue: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            >
              <option value="मराठी">मराठी</option>
              <option value="हिंदी">हिंदी</option>
              <option value="इंग्लिश">इंग्लिश</option>
              <option value="कोकणी">कोकणी</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              ३(ब)(२) बोलीभाषा (Spoken Dialect)
            </label>
            <select
              value={data.spokenDialect}
              onChange={(e) => onChange({ spokenDialect: e.target.value })}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            >
              <option value="कोकणी">कोकणी</option>
              <option value="मराठी">मराठी</option>
              <option value="डांगी">डांगी</option>
              <option value="अहिराणी">अहिराणी</option>
              <option value="भिल्ली">भिल्ली</option>
              <option value="हिंदी">हिंदी</option>
              <option value="इंग्लिश">इंग्लिश</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. मूळ गाव व १९५० वास्तव्य */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
        <div className="font-bold text-sm text-slate-800 border-b pb-1 border-slate-200">
          ४. मूळ गाव व १९५० वास्तव्याची माहिती
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="font-bold text-slate-800 block mb-1">मूळ गाव (Original Village)</label>
            <input
              type="text"
              value={data.originalVillage}
              onChange={(e) => onChange({ originalVillage: e.target.value })}
              placeholder="उदा. गावाचे नाव"
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">मूळ तालुका</label>
            <input
              type="text"
              value={data.originalTaluka}
              onChange={(e) => onChange({ originalTaluka: e.target.value })}
              placeholder="उदा. तालुक्याचे नाव"
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">मूळ जिल्हा</label>
            <input
              type="text"
              value={data.originalDistrict}
              onChange={(e) => onChange({ originalDistrict: e.target.value })}
              placeholder="उदा. जिल्ह्याचे नाव"
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-800 block mb-1">
            ६ सप्टेंबर १९५० रोजी कुटुंब राहत होते ते ठिकाण :
          </label>
          <input
            type="text"
            value={data.residence1950Place}
            onChange={(e) => onChange({ residence1950Place: e.target.value })}
            placeholder="उदा. मु. पो. ..., ता. ..., जि. ..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          />
        </div>
      </div>
    </div>
  );
};
