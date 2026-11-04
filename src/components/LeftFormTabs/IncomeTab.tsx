import React from 'react';
import { STFormData } from '../../types/form';

interface IncomeTabProps {
  data: STFormData;
  onChange: (updates: Partial<STFormData>) => void;
}

export const IncomeTab: React.FC<IncomeTabProps> = ({ data, onChange }) => {
  const handleRowAmountChange = (
    index: number,
    field: 'year1Amount' | 'year2Amount' | 'year3Amount',
    val: string
  ) => {
    const updated = [...data.incomeRows];
    updated[index] = {
      ...updated[index],
      [field]: val === '' ? '' : Number(val) || val
    };
    onChange({ incomeRows: updated });
  };

  const handleYearHeaderChange = (idx: 0 | 1 | 2, val: string) => {
    const updatedYears: [string, string, string] = [...data.incomeYears];
    updatedYears[idx] = val;
    onChange({ incomeYears: updatedYears });
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-amber-950 leading-relaxed">
        <span className="font-bold">प्रपत्र-अ (Annexure-A):</span> उत्पन्नाचा दाखला मिळण्यासाठी ३ वर्षांचा उत्पन्नाचा तक्ता येथे भरा. रक्कम बदलताच एकूण उत्पन्न (Total) आपोआप मोजले जाईल.
      </div>

      {/* Basic Income Fields */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
        <div className="font-bold text-sm text-slate-800 border-b pb-1">
          कुटुंब व जमिनीची माहिती
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              कुटुंबातील एकूण व्यक्ती संख्या *
            </label>
            <input
              type="number"
              min={1}
              value={data.incomeFamilyMembersCount}
              onChange={(e) => onChange({ incomeFamilyMembersCount: e.target.value })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              जमीन (हे.आर.)
            </label>
            <input
              type="text"
              value={data.incomeLandHectare}
              onChange={(e) => onChange({ incomeLandHectare: e.target.value })}
              placeholder="उदा. २.२० हे.आर."
              className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white font-medium"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-800 block mb-1">
            दाखला कशासाठी पाहिजे (Purpose)
          </label>
          <input
            type="text"
            value={data.incomePurpose}
            onChange={(e) => onChange({ incomePurpose: e.target.value })}
            placeholder="उदा. शैक्षणिक/शासकीय/प्रकरण कामी"
            className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white"
          />
        </div>
      </div>

      {/* Financial Years Setup */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2">
        <label className="font-bold text-slate-800 block">
          ३ आर्थिक वर्षे (Financial Years)
        </label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <span className="text-[10px] text-slate-500 block mb-0.5">१ ले वर्ष (मार्च अखेर)</span>
            <input
              type="text"
              value={data.incomeYears[0]}
              onChange={(e) => handleYearHeaderChange(0, e.target.value)}
              placeholder="२०२३"
              className="w-full px-2 py-1 border border-slate-300 rounded-md bg-white text-center font-bold"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block mb-0.5">२ रे वर्ष (मार्च अखेर)</span>
            <input
              type="text"
              value={data.incomeYears[1]}
              onChange={(e) => handleYearHeaderChange(1, e.target.value)}
              placeholder="२०२४"
              className="w-full px-2 py-1 border border-slate-300 rounded-md bg-white text-center font-bold"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block mb-0.5">३ रे वर्ष (मार्च अखेर)</span>
            <input
              type="text"
              value={data.incomeYears[2]}
              onChange={(e) => handleYearHeaderChange(2, e.target.value)}
              placeholder="२०२५"
              className="w-full px-2 py-1 border border-slate-300 rounded-md bg-white text-center font-bold"
            />
          </div>
        </div>
      </div>

      {/* 10 Income Sources Inputs */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
        <div className="font-bold text-sm text-slate-800 border-b pb-1">
          १० उत्पन्नाची साधने (रक्कम ₹ मध्ये)
        </div>

        <div className="space-y-2">
          {data.incomeRows.map((row, idx) => (
            <div key={row.srNo} className="bg-white p-2 border border-slate-200 rounded-md">
              <div className="font-semibold text-slate-800 mb-1">
                {row.srNo}. {row.sourceName}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder={`मार्च ${data.incomeYears[0]}`}
                  value={row.year1Amount}
                  onChange={(e) => handleRowAmountChange(idx, 'year1Amount', e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                />
                <input
                  type="number"
                  placeholder={`मार्च ${data.incomeYears[1]}`}
                  value={row.year2Amount}
                  onChange={(e) => handleRowAmountChange(idx, 'year2Amount', e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                />
                <input
                  type="number"
                  placeholder={`मार्च ${data.incomeYears[2]}`}
                  value={row.year3Amount}
                  onChange={(e) => handleRowAmountChange(idx, 'year3Amount', e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
