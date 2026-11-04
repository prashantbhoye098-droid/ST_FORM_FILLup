import React, { useState } from 'react';
import { VillageProfile, STFormData } from '../types/form';
import { X, MapPin, Plus, Trash2, Check, ArrowRight } from 'lucide-react';

interface SavedProfilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: VillageProfile[];
  currentFormData: STFormData;
  onSaveProfile: (profile: VillageProfile) => void;
  onDeleteProfile: (id: string) => void;
  onApplyProfile: (profile: VillageProfile) => void;
}

export const SavedProfilesModal: React.FC<SavedProfilesModalProps> = ({
  isOpen,
  onClose,
  profiles,
  currentFormData,
  onSaveProfile,
  onDeleteProfile,
  onApplyProfile
}) => {
  const [newProfileName, setNewProfileName] = useState(
    currentFormData.village ? `मु. पो. ${currentFormData.village} (ता. ${currentFormData.taluka})` : ''
  );

  if (!isOpen) return null;

  const handleSaveCurrentAsProfile = () => {
    if (!currentFormData.village) {
      alert('कृपया आधी फॉर्ममध्ये गावाचे नाव भरा.');
      return;
    }
    const nameToUse = newProfileName.trim() || `मु. पो. ${currentFormData.village} (ता. ${currentFormData.taluka})`;
    const profile: VillageProfile = {
      id: `prof_${Date.now()}`,
      profileName: nameToUse,
      village: currentFormData.village,
      taluka: currentFormData.taluka,
      district: currentFormData.district,
      postOffice: currentFormData.postOffice,
      residence1950Place: currentFormData.residence1950Place,
      primarySchoolName: currentFormData.primarySchoolName,
      primarySchoolVillageTalukaDist: currentFormData.primarySchoolVillageTalukaDist,
      secondarySchoolName: currentFormData.secondarySchoolName,
      secondarySchoolVillageTalukaDist: currentFormData.secondarySchoolVillageTalukaDist,
      relativeVillages: currentFormData.relativeVillages,
      deityNames: currentFormData.deityNames,
      tribeName: currentFormData.tribeName,
      subTribe: currentFormData.subTribe,
      casteCategory: currentFormData.casteCategory
    };

    onSaveProfile(profile);
    alert(`'${nameToUse}' प्रोफाईल यशस्वीरित्या जतन झाले! आता या गावातील नवीन अर्जांसाठी एका क्लिकवर माहिती भरता येईल.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
            <MapPin className="w-5 h-5 text-indigo-600" />
            <span>जतन केलेले गावाचे प्रोफाईल्स (Village Templates)</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-emerald-950 leading-relaxed">
            <span className="font-bold">फायदा:</span> एकाच गावातून दुसरा अर्जदार आल्यास पुन्हा पुन्हा शाळा, गाव, तालुका, कुलदैवत टाईप करण्याची गरज नाही. फक्त खालील गावातून निवडा, सर्व माहिती आपोआप भरेल. तुम्हाला फक्त <b>नाव, जन्मतारीख व वंशावळ</b> बदलावी लागेल!
          </div>

          {/* Save Current Village Form */}
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2">
            <label className="font-bold text-slate-800 block">
              सध्या भरलेली गाव माहिती नवीन प्रोफाईल म्हणून जतन करा:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                placeholder="उदा. मु. पो. अंबासन (ता. बागलाण)"
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-900 text-xs"
              />
              <button
                type="button"
                onClick={handleSaveCurrentAsProfile}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition-colors shrink-0 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                जतन करा
              </button>
            </div>
          </div>

          {/* Existing Saved Profiles */}
          <div className="space-y-2">
            <label className="font-bold text-slate-800 block">
              उपलब्ध गावे (निवडण्यासाठी क्लिक करा) :
            </label>

            {profiles.length === 0 ? (
              <p className="text-slate-400 italic py-2 text-center">कोणतेही गाव जतन केलेले नाही.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {profiles.map((p) => (
                  <div
                    key={p.id}
                    className="border border-slate-200 hover:border-indigo-400 rounded-lg p-3 bg-white flex items-center justify-between gap-3 shadow-2xs transition-all"
                  >
                    <div className="flex-1 leading-snug">
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{p.profileName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {p.village}, ता. {p.taluka}, जि. {p.district} · {p.primarySchoolName}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          onApplyProfile(p);
                          onClose();
                          alert(`'${p.village}' गावची सर्व माहिती फॉर्ममध्ये लागू झाली!`);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md transition-colors text-[11px] shadow-2xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        माहिती भरा
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteProfile(p.id)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                        title="काढा"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
