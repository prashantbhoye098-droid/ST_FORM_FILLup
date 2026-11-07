import React, { useState } from 'react';
import {
  X,
  BookOpen,
  FileCheck2,
  HelpCircle,
  Search,
  CheckCircle,
  ExternalLink,
  Coins,
  CreditCard,
  Building2,
  Users
} from 'lucide-react';

interface SchemeGuidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFormCategory?: (cat: string) => void;
}

interface GuideItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  officialAuthority: string;
  validity: string;
  requiredDocuments: string[];
  rules: string[];
  faqs: { q: string; a: string }[];
}

const SCHEME_GUIDES: GuideItem[] = [
  {
    id: 'st_caste',
    category: 'ST जात प्रमाणपत्र व वंशावळ',
    title: 'अनुसूचित जमाती (ST) जात प्रमाणपत्र व नमुना ३ वंशावळ शपथपत्र',
    subtitle: 'उपविभागीय अधिकारी (SDO) कार्यालयाकडून मिळणारा अधिकृत जात दाखला संच',
    officialAuthority: 'उपविभागीय अधिकारी / सक्षम प्राधिकारी (SDO Office)',
    validity: 'कायमस्वरूपी (Lifetime Validity)',
    requiredDocuments: [
      'अर्जदाराचा शाळा सोडल्याचा दाखला (LC) किंवा बोनाफाईड प्रमाणपत्र (जातीचा स्पष्ट उल्लेख असलेला).',
      'अर्जदाराच्या वडिलांचा / आजोबांचा शाळा सोडल्याचा दाखला (६ सप्टेंबर १९५० पूर्वीचा पुरावा अत्यंत महत्त्वाचा).',
      'कुटुंबातील रक्ताच्या नात्यातील व्यक्तींचा जात वैधता प्रमाणपत्र (Caste Validity Certificate - उपलब्ध असल्यास).',
      'महसुली पुरावे (७/१२ उतारा, ८-अ, जुने हक्कनोंद पत्रक, किंवा कोतवाल नोंद वही नक्कल).',
      'नमुना ३ नुसार सविस्तर वंशावळ वृक्ष (Family Tree) आणि १०० रुपयांच्या स्टॅम्पवर स्वयं घोषणापत्र.'
    ],
    rules: [
      'एसटी जात प्रमाणपत्रासाठी ६ सप्टेंबर १९५० पूर्वीचा मूळ वास्तव्याचा व जातीचा पुरावा सिद्ध करावा लागतो.',
      'वंशावळीमध्ये खापरपणजोबा $\\rightarrow$ पणजोबा $\\rightarrow$ आजोबा $\\rightarrow$ वडील $\\rightarrow$ अर्जदार असा सरळ रक्तसंबंध स्पष्ट असणे बंधनकारक आहे.',
      'लग्न झालेल्या स्त्रियांसाठी माहेरचे सर्व पुरावे व वंशावळ जोडणे आवश्यक असते.'
    ],
    faqs: [
      {
        q: '१९५० पूर्वीचा पुरावा नसेल तर काय करावे?',
        a: 'गावातील जुनी कोतवाल बुक नक्कल, जन्म-मृत्यू नोंद वही, किंवा जुने महसूल फेरफार अभिलेख मिळवण्यासाठी तहसील कार्यालयात अर्ज करता येतो.'
      },
      {
        q: 'वंशावळ कोणाची लावावी लागते?',
        a: 'वंशावळ नेहमी वडिलांच्या (पितृसत्ताक) रक्ताच्या नात्यातील पुरुषांची व त्यांच्या वंशजांची असावी लागते.'
      }
    ]
  },
  {
    id: 'income_certificate',
    category: 'उत्पन्नाचा दाखला',
    title: 'तहसीलदार उत्पन्नाचा दाखला (प्रपत्र-अ मिळकत घोषणापत्र)',
    subtitle: 'विविध शासकीय योजना, शिष्यवृत्ती व सवलतींसाठी आवश्यक ३ वर्षांचा दाखला',
    officialAuthority: 'तहसीलदार / नायब तहसीलदार कार्यालय',
    validity: '१ वर्ष किंवा ३ वर्षे (आर्थिक वर्षासाठी)',
    requiredDocuments: [
      'अर्जदाराचे आधार कार्ड व रेशन कार्ड (पिवळे/केशरी/अंत्योदय).',
      'तलाठी यांचा मूळ उत्पन्न अहवाल (शेती उत्पन्न, बागायत/जिरायत तपशील).',
      'नोकरीत असल्यास फॉर्म १६ किंवा नियोक्ता (Employer) यांचे वेतन प्रमाणपत्र.',
      'व्यवसाय असल्यास बँक पासबुक, GST रिटर्न किंवा स्वयं घोषणापत्र.',
      'प्रपत्र-अ नुसार मागील ३ वर्षांच्या उत्पन्नाचा तपशीलवार तक्ता.'
    ],
    rules: [
      'कुटुंबातील सर्व कमवत्या सदस्यांचे एकत्रित उत्पन्न दाखवण्यात यावे.',
      'विद्यार्थी शिष्यवृत्तीसाठी उत्पन्नाची कमाल मर्यादा शासनाने ठरवून दिलेल्या निकषांनुसार (उदा. ₹२.५ लाख किंवा ₹८ लाख) असावी लागते.'
    ],
    faqs: [
      {
        q: '३ वर्षांचा दाखला का लागतो?',
        a: 'नॉन-क्रीमीलेअर आणि उच्च शिक्षण शिष्यवृत्तीसाठी शासनाने मागील सलग ३ वर्षांच्या उत्पन्नाची सरासरी तपासणे अनिवार्य केले आहे.'
      }
    ]
  },
  {
    id: 'obc_sc_caste',
    category: 'OBC / SC / VJNT',
    title: 'इतर मागासवर्गीय (OBC / SC / NT / SBC) जात प्रमाणपत्र व नॉन-क्रीमीलेअर',
    subtitle: '७ पानी अधिकृत संच, परिशिष्ट व हमीपत्र',
    officialAuthority: 'उपविभागीय अधिकारी (प्रांत अधिकारी)',
    validity: 'जात दाखला: कायमस्वरूपी | नॉन-क्रीमीलेअर: ३ वर्षे',
    requiredDocuments: [
      'अर्जदाराचा जन्म दाखला किंवा शाळा सोडल्याचा दाखला.',
      'OBC साठी १३ ऑक्टोबर १९६७ पूर्वीचा; SC/ST साठी १९५० पूर्वीचा; VJNT साठी १९६१ पूर्वीचा पुरावा.',
      'मागील ३ वर्षांचे अधिकृत उत्पन्नाचे दाखले (नॉन-क्रीमीलेअरसाठी उत्पन्न ₹८ लाखांपेक्षा कमी असणे आवश्यक).',
      'नमुना २ व नमुना ३ स्वयं घोषणापत्र आणि स्थानिक रहिवासी दाखला.'
    ],
    rules: [
      'नॉन-क्रीमीलेअर प्रमाणपत्रासाठी शेती उत्पन्नाव्यतिरिक्त इतर स्त्रोतांचे उत्पन्न मोजले जाते.',
      'जातीच्या पुराव्यावर खाडाखोड किंवा संशयास्पद बदल असल्यास अर्ज नामंजूर होऊ शकतो.'
    ],
    faqs: [
      {
        q: 'नॉन-क्रीमीलेअर कोणाला मिळते?',
        a: 'ज्या कुटुंबाचे वार्षिक उत्पन्न मागील सलग ३ वर्षे प्रत्येकी ₹८ लाखांपेक्षा कमी आहे, अशा OBC, VJNT, व SBC प्रवर्गातील उमेदवारांना मिळते.'
      }
    ]
  },
  {
    id: 'pan_card',
    category: 'पॅन कार्ड अर्ज',
    title: 'नवीन पॅन कार्ड (Form 49A) व दुरुस्ती (Correction CR-01)',
    subtitle: 'आयकर विभाग (Income Tax Department - NSDL/UTIITSL) नमुना',
    officialAuthority: 'आयकर विभाग (UTIITSL / Protean NSDL)',
    validity: 'कायमस्वरूपी (Lifetime)',
    requiredDocuments: [
      'ओळखीचा पुरावा: आधार कार्ड (नाव व जन्मतारीख अचूक असावी).',
      'पत्ता पुरावा: आधार कार्ड, वीज बिल, मतदान कार्ड किंवा पासपोर्ट.',
      'जन्मतारीख पुरावा: आधार कार्ड, १०वी बोर्ड प्रमाणपत्र किंवा जन्म दाखला.',
      'दुरुस्तीसाठी: जुन्या पॅन कार्डची स्पष्ट झेरॉक्स प्रत.',
      '२ ताजे रंगीत पासपोर्ट आकाराचे फोटो (३.५ x २.५ सेंमी) व काळ्या शाईने स्वाक्षरी.'
    ],
    rules: [
      'डाव्या फोटोवर तिरकी स्वाक्षरी (अर्धी फोटोवर व अर्धी फॉर्मवर) करणे आवश्यक आहे.',
      'उजव्या फोटोखाली दिलेल्या बॉक्समध्ये आणि दुसऱ्या पानावर उजव्या कोपऱ्यात स्पष्ट स्वाक्षरी असावी.',
      'नावामध्ये किंवा वडिलांच्या नावात दुरुस्ती असल्यास अधिकृत गॅझेट किंवा पुरावा जोडावा लागतो.'
    ],
    faqs: [
      {
        q: 'फोटो व सही कशी अपलोड करावी?',
        a: 'आपल्या पोर्टलवर फक्त फोटो व सहीची फाईल अपलोड करा, सिस्टीम दोन्ही पानांवर आपोआप अचूक बॉक्समध्ये पेस्ट करून २-पानी संपूर्ण PDF तयार करते.'
      }
    ]
  },
  {
    id: 'self_decl',
    category: '१६ शासकीय स्वघोषणापत्रे',
    title: 'महाराष्ट्र शासन मान्य १६ विविध शासकीय स्वयं घोषणापत्रे',
    subtitle: 'ग्रामपंचायत, तलाठी व शासकीय योजनांसाठी लागणारे प्रतिज्ञापत्र',
    officialAuthority: 'ग्राम महसूल व स्थानिक स्वराज्य संस्था',
    validity: 'संबंधित कामापुरती वैध',
    requiredDocuments: [
      'रहिवास दाखला: आधार कार्ड, वीज बिल व ग्रामपंचायत कर पावती.',
      'विधवा दाखला: पतीचा मूळ मृत्यू दाखला व रेशन कार्ड.',
      'विभक्त कुटुंब दाखला: विभक्त घराचा नमुना ८ उतारा व स्वतंत्र रेशन कार्ड.',
      'शौचालय दाखला: ग्रामपंचायत कर पावती व वापर प्रमाणपत्र.',
      'बेरोजगार दाखला: पदवी/डिप्लोमा गुणपत्रिका व स्वयं घोषणापत्र.'
    ],
    rules: [
      'स्वघोषणापत्रामध्ये खोटी माहिती देणे भारतीय दंड विधान संहितेनुसार दंडनीय अपराध आहे.',
      'अर्जदाराची स्वाक्षरी आणि दिनांक व्यवस्थित नोंदवणे आवश्यक आहे.'
    ],
    faqs: [
      {
        q: 'नोटरी किंवा स्टॅम्प पेपरची गरज असते का?',
        a: 'महाराष्ट्र शासनाच्या शासन निर्णयानुसार बहुतांश योजनांसाठी १०० रुपयांच्या स्टॅम्पऐवजी साध्या कागदावर स्वयं घोषणापत्र कायदेशीररीत्या वैध ठरवले आहे.'
      }
    ]
  }
];

export const SchemeGuidesModal: React.FC<SchemeGuidesModalProps> = ({
  isOpen,
  onClose,
  onSelectFormCategory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuideId, setSelectedGuideId] = useState<string>('st_caste');

  if (!isOpen) return null;

  const filteredGuides = SCHEME_GUIDES.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeGuide =
    SCHEME_GUIDES.find((g) => g.id === selectedGuideId) || SCHEME_GUIDES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-5 no-print animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-950 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg tracking-tight leading-tight text-white">
                शासकीय दाखले माहिती व कागदपत्रे मार्गदर्शक (Knowledge Base)
              </h3>
              <p className="text-xs text-blue-200">
                दाखल्यांसाठी लागणारी कागदपत्रे, नियम, अटी व वंशावळ पुरावे संपूर्ण माहिती
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 shrink-0">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="दाखल्याचे नाव किंवा कागदपत्र शोधा (उदा. ST जात, उत्पन्न, पॅन)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-600"
            />
          </div>
        </div>

        {/* Main Body (Left category list + Right detail) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Category Navigation */}
          <div className="w-full md:w-72 border-r border-slate-200 bg-slate-50/60 p-2 overflow-y-auto shrink-0 space-y-1">
            <div className="text-[10px] font-black text-slate-500 uppercase px-2 py-1">
              दाखल्यांचे प्रकार ({filteredGuides.length})
            </div>
            {filteredGuides.map((guide) => (
              <button
                type="button"
                key={guide.id}
                onClick={() => setSelectedGuideId(guide.id)}
                className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex flex-col gap-0.5 ${
                  selectedGuideId === guide.id
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <span className="text-xs font-bold leading-tight line-clamp-1">
                  {guide.category}
                </span>
                <span
                  className={`text-[10px] leading-tight line-clamp-1 ${
                    selectedGuideId === guide.id
                      ? 'text-indigo-200'
                      : 'text-slate-500'
                  }`}
                >
                  {guide.subtitle}
                </span>
              </button>
            ))}
          </div>

          {/* Right Guide Content */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed bg-white">
            {/* Title & Badge */}
            <div className="border-b border-slate-200 pb-3">
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-900 rounded-md text-[10px] font-black uppercase tracking-wider inline-block mb-1.5">
                {activeGuide.category}
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {activeGuide.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1">{activeGuide.subtitle}</p>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px]">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">सक्षम प्राधिकारी:</span>
                  <span className="font-bold text-slate-800">{activeGuide.officialAuthority}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">वैधता कालावधी:</span>
                  <span className="font-bold text-slate-800">{activeGuide.validity}</span>
                </div>
              </div>
            </div>

            {/* Required Documents */}
            <div className="space-y-2">
              <h5 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>आवश्यक कागदपत्रांची यादी (Required Documents):</span>
              </h5>
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-3 space-y-2">
                {activeGuide.requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-800 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Rules */}
            <div className="space-y-2">
              <h5 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>महत्त्वाचे नियम व अटी (Rules & Instructions):</span>
              </h5>
              <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-3 space-y-1.5 text-amber-950">
                {activeGuide.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5"></span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {activeGuide.faqs.length > 0 && (
              <div className="space-y-2">
                <h5 className="font-black text-sm text-slate-900">वारंवार विचारले जाणारे प्रश्न (FAQ):</h5>
                <div className="space-y-2">
                  {activeGuide.faqs.map((faq, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 text-xs">प्र. {faq.q}</div>
                      <div className="text-slate-600 text-[11px] leading-relaxed">उत्तर: {faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            माहिती स्रोत: महाराष्ट्र शासन अधिकृत मार्गदर्शक तत्त्वे व शासन निर्णय (GR)
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
