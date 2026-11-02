import React from 'react';
import { STFormData } from '../../types/form';

interface VanshavalTreeDiagramProps {
  data: STFormData;
}

export const VanshavalTreeDiagram: React.FC<VanshavalTreeDiagramProps> = ({ data }) => {
  const v = data.vanshaval;
  const applicantName = data.applicantName || 'अर्जदार';
  const fatherName = data.fatherName || v.father || 'वडील';
  const grandfatherName = v.grandfather || 'आजोबा';
  const greatGrandfatherName = v.greatGrandfather || 'पणजोबा';
  const greatGreatGrandfatherName = v.greatGreatGrandfather || 'खापर पणजोबा';

  return (
    <div className="w-full my-3 px-2 py-2 border border-slate-700 bg-white text-xs">
      <div className="text-center font-bold text-sm mb-3 tracking-wide underline">
        कुटुंबाची वंशावळ (Family Tree)
      </div>

      <div className="flex flex-col items-center w-full">
        {/* Level 1: खापर पणजोबा */}
        <div className="flex flex-col items-center">
          <div className="border border-slate-900 bg-slate-50 px-3 py-1 font-semibold text-center min-w-[170px] shadow-2xs">
            <div className="text-[10px] text-slate-700 font-normal">खापर पणजोबा</div>
            <div className="text-xs font-bold text-slate-950">{greatGreatGrandfatherName}</div>
          </div>
          {/* Connector down */}
          <div className="w-0.5 h-3.5 bg-slate-800"></div>
        </div>

        {/* Level 2: पणजोबा */}
        <div className="flex flex-col items-center">
          <div className="border border-slate-900 bg-slate-50 px-3 py-1 font-semibold text-center min-w-[170px] shadow-2xs">
            <div className="text-[10px] text-slate-700 font-normal">पणजोबा</div>
            <div className="text-xs font-bold text-slate-950">{greatGrandfatherName}</div>
          </div>
          {/* Connector down */}
          <div className="w-0.5 h-3.5 bg-slate-800"></div>
        </div>

        {/* Level 3: आजोबा */}
        <div className="flex flex-col items-center">
          <div className="border border-slate-900 bg-slate-50 px-3 py-1 font-semibold text-center min-w-[170px] shadow-2xs">
            <div className="text-[10px] text-slate-700 font-normal">आजोबा</div>
            <div className="text-xs font-bold text-slate-950">{grandfatherName}</div>
          </div>
          {/* Connector down */}
          <div className="w-0.5 h-3.5 bg-slate-800"></div>
        </div>

        {/* Level 4: वडील and काका (Uncles) Branch */}
        <div className="relative flex flex-col items-center w-full">
          {/* Horizontal crossbar connecting Father and Uncles */}
          <div className="flex items-start justify-center gap-4 sm:gap-6 w-full max-w-full overflow-x-auto py-1">
            
            {/* Father's Branch */}
            <div className="flex flex-col items-center min-w-[160px]">
              <div className="w-0.5 h-2.5 bg-slate-800 mb-0"></div>
              <div className="border-2 border-slate-900 bg-amber-50/70 px-3 py-1 font-semibold text-center w-full">
                <div className="text-[10px] text-slate-700 font-normal">वडील</div>
                <div className="text-xs font-bold text-slate-950">{fatherName}</div>
              </div>

              {/* Connector to Level 5 (Applicant & Siblings) */}
              <div className="w-0.5 h-3.5 bg-slate-800"></div>

              {/* Level 5: Applicant & Siblings */}
              <div className="flex items-start justify-center gap-2 flex-wrap">
                {/* Applicant */}
                <div className="border-2 border-indigo-900 bg-indigo-50/80 px-2.5 py-1 text-center min-w-[130px]">
                  <div className="text-[10px] font-bold text-indigo-900">अर्जदार (Applicant)</div>
                  <div className="text-xs font-bold text-slate-950">{applicantName}</div>
                </div>

                {/* Siblings if any */}
                {v.siblings && v.siblings.length > 0 && v.siblings.map((sib, idx) => (
                  <div key={idx} className="border border-slate-800 bg-white px-2 py-1 text-center min-w-[110px]">
                    <div className="text-[10px] text-slate-600">भाऊ / बहीण</div>
                    <div className="text-xs font-medium text-slate-900">{sib}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Uncles (काका / चुलते) Branches */}
            {v.uncles && v.uncles.length > 0 ? (
              v.uncles.map((uncle, idx) => (
                <div key={idx} className="flex flex-col items-center min-w-[140px]">
                  <div className="w-0.5 h-2.5 bg-slate-800 mb-0"></div>
                  <div className="border border-slate-800 bg-slate-50 px-2.5 py-1 font-semibold text-center w-full">
                    <div className="text-[10px] text-slate-600 font-normal">काका / चुलते</div>
                    <div className="text-xs font-bold text-slate-900">{uncle}</div>
                  </div>

                  {/* Cousins if linked or general cousins */}
                  {idx === 0 && v.cousins && v.cousins.length > 0 && (
                    <>
                      <div className="w-0.5 h-3.5 bg-slate-800"></div>
                      <div className="flex flex-col gap-1">
                        {v.cousins.map((cos, cIdx) => (
                          <div key={cIdx} className="border border-slate-700 bg-white px-2 py-0.5 text-center text-[11px]">
                            <span className="text-[9px] text-slate-500 block">चुलत भाऊ / बहीण</span>
                            {cos}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center min-w-[120px] opacity-70">
                <div className="w-0.5 h-2.5 bg-slate-800 mb-0"></div>
                <div className="border border-dashed border-slate-400 bg-slate-50 px-2 py-1 text-center w-full">
                  <div className="text-[10px] text-slate-500">काका / चुलते</div>
                  <div className="text-xs text-slate-600">(काका असल्यास जोडा)</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
