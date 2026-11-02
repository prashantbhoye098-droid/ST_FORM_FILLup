import React, { useState } from 'react';
import { STFormData } from '../../types/form';
import { Plus, Trash2, GitBranch, AlertCircle } from 'lucide-react';

interface VanshavalTreeEditorTabProps {
  data: STFormData;
  onChange: (updates: Partial<STFormData>) => void;
}

export const VanshavalTreeEditorTab: React.FC<VanshavalTreeEditorTabProps> = ({ data, onChange }) => {
  const [newUncle, setNewUncle] = useState('');
  const [newSibling, setNewSibling] = useState('');
  const [newCousin, setNewCousin] = useState('');

  const v = data.vanshaval;

  const updateVanshavalField = (field: keyof typeof v, value: any) => {
    onChange({
      vanshaval: {
        ...v,
        [field]: value
      }
    });
  };

  const handleAddUncle = () => {
    if (!newUncle.trim()) return;
    const updated = [...(v.uncles || []), newUncle.trim()];
    updateVanshavalField('uncles', updated);
    setNewUncle('');
  };

  const handleRemoveUncle = (idx: number) => {
    const updated = v.uncles.filter((_, i) => i !== idx);
    updateVanshavalField('uncles', updated);
  };

  const handleAddSibling = () => {
    if (!newSibling.trim()) return;
    const updated = [...(v.siblings || []), newSibling.trim()];
    updateVanshavalField('siblings', updated);
    setNewSibling('');
  };

  const handleRemoveSibling = (idx: number) => {
    const updated = v.siblings.filter((_, i) => i !== idx);
    updateVanshavalField('siblings', updated);
  };

  const handleAddCousin = () => {
    if (!newCousin.trim()) return;
    const updated = [...(v.cousins || []), newCousin.trim()];
    updateVanshavalField('cousins', updated);
    setNewCousin('');
  };

  const handleRemoveCousin = (idx: number) => {
    const updated = v.cousins.filter((_, i) => i !== idx);
    updateVanshavalField('cousins', updated);
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-lg text-indigo-950 flex items-start gap-2">
        <GitBranch className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold">वंशावळ चार्ट (पृष्ठ ५ - Family Tree)</div>
          <p className="text-[11px] text-indigo-800 mt-0.5">
            येथे भरलेली वंशावळ फॉर्मच्या पृष्ठ ५ वर सुंदर ट्री-चार्ट फॉरमॅटमध्ये दिसेल. खापर पणजोबा ते अर्जदार व काका/चुलते जोडा.
          </p>
        </div>
      </div>

      {/* Primary Lineage Inputs */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
        <div className="font-bold text-sm text-slate-800 border-b pb-1 border-slate-200">
          वंशावळीतील मुख्य व्यक्ती (रक्ताचे नातेसंबंध)
        </div>

        {/* 1. खापर पणजोबा */}
        <div>
          <label className="font-bold text-slate-800 block mb-1">
            १. खापर पणजोबांचे नाव (Great-Great Grandfather) *
          </label>
          <input
            type="text"
            value={v.greatGreatGrandfather}
            onChange={(e) => updateVanshavalField('greatGreatGrandfather', e.target.value)}
            placeholder="उदा. धोंडू भोये"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-semibold"
          />
        </div>

        {/* 2. पणजोबा */}
        <div>
          <label className="font-bold text-slate-800 block mb-1">
            २. पणजोबांचे नाव (Great Grandfather) *
          </label>
          <input
            type="text"
            value={v.greatGrandfather}
            onChange={(e) => updateVanshavalField('greatGrandfather', e.target.value)}
            placeholder="उदा. लक्ष्मण धोंडू भोये"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-semibold"
          />
        </div>

        {/* 3. आजोबा */}
        <div>
          <label className="font-bold text-slate-800 block mb-1">
            ३. आजोबांचे नाव (Grandfather) *
          </label>
          <input
            type="text"
            value={v.grandfather}
            onChange={(e) => updateVanshavalField('grandfather', e.target.value)}
            placeholder="उदा. यशवंत लक्ष्मण भोये"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-semibold"
          />
        </div>

        {/* 4. वडील */}
        <div>
          <label className="font-bold text-slate-800 block mb-1">
            ४. वडिलांचे नाव (Father) *
          </label>
          <input
            type="text"
            value={v.father || data.fatherName}
            onChange={(e) => {
              const val = e.target.value;
              updateVanshavalField('father', val);
              onChange({ fatherName: val });
            }}
            placeholder="उदा. रामदास यशवंत भोये"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-semibold"
          />
          <span className="text-[10px] text-slate-500 mt-0.5 block">
            (हे नाव वडिलांच्या माहितीसोबत आपोआप जोडलेले आहे)
          </span>
        </div>

        {/* 5. अर्जदार */}
        <div>
          <label className="font-bold text-slate-800 block mb-1">
            ५. अर्जदाराचे नाव (Applicant) *
          </label>
          <input
            type="text"
            value={v.applicant || data.applicantName}
            onChange={(e) => {
              const val = e.target.value;
              updateVanshavalField('applicant', val);
              onChange({ applicantName: val });
            }}
            placeholder="उदा. प्रशांत रामदास भोये (अर्जदार)"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 font-bold"
          />
        </div>
      </div>

      {/* काका / चुलते शाखा (Uncles Branch) */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2.5">
        <div className="font-bold text-sm text-slate-800">
          काका / चुलते (Uncles Branch)
        </div>
        <p className="text-[11px] text-slate-600">
          वडिलांचे सख्खे भाऊ (काका/चुलते) असल्यास येथे जोडा:
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={newUncle}
            onChange={(e) => setNewUncle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUncle())}
            placeholder="उदा. सोमनाथ यशवंत भोये (काका)"
            className="flex-1 px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-900 text-xs"
          />
          <button
            type="button"
            onClick={handleAddUncle}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            जोडा
          </button>
        </div>

        {v.uncles && v.uncles.length > 0 && (
          <div className="space-y-1.5 mt-2">
            {v.uncles.map((uncle, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
              >
                <span className="font-medium text-slate-900">{uncle}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveUncle(idx)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="काढा"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* सख्खे भाऊ / बहिणी (Siblings) */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2.5">
        <div className="font-bold text-sm text-slate-800">
          सख्खा भाऊ / बहीण (Siblings)
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newSibling}
            onChange={(e) => setNewSibling(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSibling())}
            placeholder="उदा. किरण रामदास भोये (भाऊ)"
            className="flex-1 px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-900 text-xs"
          />
          <button
            type="button"
            onClick={handleAddSibling}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            जोडा
          </button>
        </div>

        {v.siblings && v.siblings.length > 0 && (
          <div className="space-y-1.5 mt-2">
            {v.siblings.map((sib, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
              >
                <span className="font-medium text-slate-900">{sib}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSibling(idx)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="काढा"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* चुलत भाऊ / बहिणी (Cousins) */}
      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2.5">
        <div className="font-bold text-sm text-slate-800">
          चुलत भाऊ / बहीण (Cousins)
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newCousin}
            onChange={(e) => setNewCousin(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCousin())}
            placeholder="उदा. अमोल सोमनाथ भोये (चुलत भाऊ)"
            className="flex-1 px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-900 text-xs"
          />
          <button
            type="button"
            onClick={handleAddCousin}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            जोडा
          </button>
        </div>

        {v.cousins && v.cousins.length > 0 && (
          <div className="space-y-1.5 mt-2">
            {v.cousins.map((cos, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
              >
                <span className="font-medium text-slate-900">{cos}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCousin(idx)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="काढा"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* नाव बदल / तफावत (LC Name Discrepancy Option) */}
      <div className="border border-slate-200 rounded-lg p-3 bg-amber-50/50 space-y-3">
        <div className="font-bold text-sm text-slate-900 border-b pb-1 border-amber-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          <span>शाळा सोडल्याच्या दाखल्यावर नाव बदल / तफावत असल्यास</span>
        </div>

        <p className="text-[11px] text-slate-600">
          दाखल्यावर जुने नाव व आधार कार्ड / इतर कागदपत्रांवर नवीन नाव असल्यास दोन्ही एकच व्यक्ती असल्याचा खुलासा:
        </p>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            नाव बदल कोणाच्या दाखल्यावर आहे?
          </label>
          <select
            value={data.nameDiscrepancyPerson}
            onChange={(e) => onChange({ nameDiscrepancyPerson: e.target.value })}
            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
          >
            <option value="माझे">माझे (अर्जदाराचे)</option>
            <option value="वडिलांच्या">वडिलांच्या</option>
            <option value="आजोबांच्या">आजोबांच्या</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              दाखल्यावरील जुने नाव (Old Name)
            </label>
            <input
              type="text"
              value={data.oldNameOnLC}
              onChange={(e) => onChange({ oldNameOnLC: e.target.value })}
              placeholder="उदा. रामदास यशवंत भिल्ल"
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              नवीन / बरोबर नाव (New/Current Name)
            </label>
            <input
              type="text"
              value={data.newNameOfficial}
              onChange={(e) => onChange({ newNameOfficial: e.target.value })}
              placeholder="उदा. रामदास यशवंत भोये"
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
            />
          </div>
        </div>

        {/* Live preview sentence */}
        <div className="p-2 bg-white border border-amber-200 rounded text-[11px] text-slate-800 leading-relaxed italic">
          "तसेच {data.nameDiscrepancyPerson || 'माझे'}/वडिलांच्या/आजोबांच्या शाळा सोडल्याच्या दाखल्यावर <b>{data.oldNameOnLC || '[जुने नाव]'}</b> असे नाव आहे तरी <b>{data.oldNameOnLC || '[जुने नाव]'}</b> व <b>{data.newNameOfficial || '[नवीन नाव]'}</b> ही दोन्ही नाव {data.nameDiscrepancyPerson || 'माझे'}/ वडील / आजोबा ची आहेत ही दुसरी व्यक्ती नसून एकच व्यक्ती आहे."
        </div>
      </div>
    </div>
  );
};
