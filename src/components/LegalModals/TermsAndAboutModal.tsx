import React, { useState } from 'react';
import {
  X,
  FileText,
  Building2,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ShieldCheck,
  Scale,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { AdminSettings } from '../../types/admin';

interface TermsAndAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminSettings: AdminSettings;
  defaultTab?: 'terms' | 'about' | 'disclaimer';
}

export const TermsAndAboutModal: React.FC<TermsAndAboutModalProps> = ({
  isOpen,
  onClose,
  adminSettings,
  defaultTab = 'terms'
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'about' | 'disclaimer'>(defaultTab);

  if (!isOpen) return null;

  const centerName = adminSettings.branding.centerName || 'माऊली डिजिटल सेवा केंद्र';
  const centerAddress = adminSettings.branding.centerAddress || 'मु.पो. पठावे दिगर, ता. बागलाण, जि. नाशिक - ४२३३०१';
  const centerContact = adminSettings.branding.centerContact || '७०८३०३४६०७';
  const websiteUrl = 'https://mauliservices.in';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-5 no-print animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header with 3 Tabs */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'terms'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>नियम व अटी (Terms)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('disclaimer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'disclaimer'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>अस्वीकरण (Disclaimer)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('about')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'about'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>आमच्याबद्दल व संपर्क (About)</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed">
          {/* TAB 1: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5 text-amber-950">
                <FileText className="w-5 h-5 text-amber-700 shrink-0" />
                <div className="text-[11px] font-bold">
                  <b>{websiteUrl}</b> संकेतस्थळ वापरताना खालील नियम व वापर अटींचे पालन करणे अनिवार्य आहे.
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-sm text-slate-900">१. सेवेचे स्वरूप (Service Scope)</h4>
                <p>
                  <b>mauliservices.in</b> हे महाराष्ट्र शासनाच्या विविध अधिकृत दाखल्यांचे (ST जात प्रमाणपत्र व वंशावळ, उत्पन्नाचा दाखला प्रपत्र-अ, ओबीसी अर्ज, पॅन कार्ड, आणि १६ शासकीय स्वघोषणापत्रे) संगणकीकृत PDF मसुदे जलद तयार करून देणारे एक खाजगी डिजिटल सहाय्यक साधन आहे.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-sm text-slate-900">२. माहितीची वैधता व वापरकर्त्याची जबाबदारी</h4>
                <p>
                  अर्जात भरलेली सर्व माहिती (उदा. नाव, जात, वंशावळ, जन्मदिनांक) ही वापरकर्त्याने स्वतःच्या जबाबदारीवर व मूळ कागदपत्रांच्या आधारे भरलेली असावी. कोणत्याही चुकीच्या किंवा दिशाभूल करणाऱ्या माहितीसाठी <b>mauliservices.in</b> जबाबदार राहणार नाही.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-sm text-slate-900">३. सेवा शुल्क व डाऊनलोड अटी (Fees & Cancellation)</h4>
                <p>
                  PDF डाऊनलोड किंवा वॉटरमार्क काढून स्वच्छ प्रिंट घेण्यासाठी आकारले जाणारे शुल्क हे केवळ सॉफ्टवेअर निर्मिती व प्रक्रिया शुल्क आहे. एकदा फाईल डाऊनलोड झाल्यानंतर भरलेले शुल्क कोणत्याही परिस्थितीत परत केले जात नाही.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-sm text-slate-900">४. बौद्धिक संपदा व कॉपीराईट</h4>
                <p>
                  <b>mauliservices.in</b> वरील संपूर्ण कोड, लेआउट, वंशावळ ट्री अल्गोरिदम आणि डिझाईन कॉपीराईट कायद्यानुसार सुरक्षित आहे. कोड अनधिकृतरीत्या कॉपी करणे किंवा गैरवापर करणे दंडनीय अपराध आहे.
                </p>
              </div>
            </>
          )}

          {/* TAB 2: DISCLAIMER (CRITICAL FOR ADSENSE APPROVAL) */}
          {activeTab === 'disclaimer' && (
            <>
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-950">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <b>महत्त्वाचे कायदेशीर अस्वीकरण (Important Legal Disclaimer):</b><br />
                  <b>mauliservices.in</b> हे कोणत्याही शासकीय संस्थेचे, महाराष्ट्र शासनाचे किंवा भारत सरकारचे अधिकृत सरकारी पोर्टल नाही.
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-black text-sm text-slate-900">१. शासकीय संलग्नतेचा अभाव (Non-Government Affiliation)</h4>
                <p>
                  हे संकेतस्थळ <b>माऊली डिजिटल सेवा केंद्र</b> द्वारे खाजगीरीत्या चालवले जाते. याचा महाराष्ट्र शासनाच्या 'आपले सरकार' पोर्टलशी किंवा कोणत्याही शासकीय कार्यालयाशी थेट सरकारी मालकी संबंध नाही. हे केवळ नागरिकांना व केंद्र चालकांना अचूक शासकीय नमुन्यानुसार फॉर्म भरून देण्याचे एक सहाय्यक डिजिटल टूल आहे.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-black text-sm text-slate-900">२. दाखला मंजुरीचे अधिकार (Approval Discretion)</h4>
                <p>
                  येथे तयार केलेला फॉर्म फक्त अर्जाची प्रत आहे. संबंधित दाखला किंवा प्रमाणपत्र मंजूर करणे, नामंजूर करणे किंवा तपासणे हे सर्वस्वी संबंधित शासकीय अधिकारी (उपविभागीय अधिकारी, तहसीलदार, प्रांत अधिकारी, आयकर विभाग) यांच्या अधिकारात येते.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-black text-sm text-slate-900">३. आकाराली जाणारी फी (Service Fee vs Govt Fees)</h4>
                <p>
                  या संकेतस्थळावर आकारली जाणारी नाममात्र फी (उदा. ₹१० किंवा ₹२०) हे केवळ संगणकीय सॉफ्टवेअर व PDF निर्मितीचे सेवा शुल्क आहे. हा कोणताही शासकीय महसूल, मुद्रांक शुल्क (Stamp Duty) किंवा कर नाही.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-black text-sm text-slate-900">४. माहितीचा स्रोत (Information Sources)</h4>
                <p>
                  संकेतस्थळावरील सर्व नियम, अटी व कागदपत्रांची यादी ही महाराष्ट्र शासनाचे अधिकृत शासन निर्णय (GR) व माहिती अधिकारांतर्गत उपलब्ध असलेल्या सार्वजनिक माहितीवर आधारित आहे.
                </p>
              </div>
            </>
          )}

          {/* TAB 3: ABOUT US & CONTACT */}
          {activeTab === 'about' && (
            <>
              {/* Branding Banner */}
              <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl space-y-2.5 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-lg shrink-0">
                    MS
                  </div>
                  <div>
                    <h4 className="font-black text-base text-amber-300">{centerName}</h4>
                    <p className="text-xs text-slate-300 font-mono">{websiteUrl}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed pt-1">
                  <b>mauliservices.in</b> हे ग्रामीण व शहरी भागातील आपले सरकार सेवा केंद्र चालक आणि नागरिकांना शासकीय दाखले व वंशावळ सहज, जलद आणि अचूक भरून देण्यासाठी समर्पित व्यासपीठ आहे.
                </p>
              </div>

              {/* Verified Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>केंद्राचा अधिकृत पत्ता (Center Address)</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {centerAddress}
                  </p>
                  <p className="text-slate-500 text-[10px]">
                    संचालक: <b>प्रशांत वाळू भोये</b>
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>हेल्पलाईन व ईमेल संपर्क (Contact)</span>
                  </div>
                  <p className="text-slate-600 text-[11px] font-mono font-bold">
                    मोबाईल / WhatsApp: {centerContact}
                  </p>
                  <p className="text-slate-600 text-[11px] font-mono font-bold">
                    ईमेल: prashantbhoye098@gmail.com
                  </p>
                  <p className="text-slate-500 text-[10px]">
                    वेळ: सकाळी ९:०० ते संध्याकाळी ८:०० (सोम-शनि)
                  </p>
                </div>
              </div>

              {/* Service Commitments */}
              <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1 text-[11px] text-indigo-950">
                <div className="font-black text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>आमची बांधिलकी (Our Commitment)</span>
                </div>
                <p>
                  १००% अचूक शासकीय नमुने, सुलभ वंशावळ निर्मिती, आणि पारदर्शक डिजिटल सेवा देणे हेच <b>mauliservices.in</b> चे उद्दिष्ट आहे.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 font-mono">
            {websiteUrl} · सर्व हक्क सुरक्षित
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
          >
            बंद करा
          </button>
        </div>
      </div>
    </div>
  );
};
