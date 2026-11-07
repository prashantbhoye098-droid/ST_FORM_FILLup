import React from 'react';
import { X, ShieldCheck, Lock, Eye, FileText, Globe, CheckCircle, Mail, MapPin } from 'lucide-react';
import { AdminSettings } from '../../types/admin';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminSettings: AdminSettings;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
  adminSettings
}) => {
  if (!isOpen) return null;

  const centerName = adminSettings.branding.centerName || 'माऊली डिजिटल सेवा केंद्र';
  const centerAddress = adminSettings.branding.centerAddress || 'मु.पो. पठावे दिगर, ता. बागलाण, जि. नाशिक - ४२३३०१';
  const centerContact = adminSettings.branding.centerContact || '७०८३०३४६०७';
  const websiteUrl = 'https://mauliservices.in';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-5 no-print animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-sm text-sm">
              MS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg tracking-tight leading-tight text-white">
                  गोपनीयता धोरण (Privacy Policy)
                </h3>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full font-mono">
                  mauliservices.in
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Google AdSense, DPDP कायदा २०२३ आणि वापरकर्ता डेटा सुरक्षा धोरण
              </p>
            </div>
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
          {/* Intro Box */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-950">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed space-y-1">
              <div>
                <b>{websiteUrl}</b> (संबंधित: <b>{centerName}</b>) वर आपले स्वागत आहे. आम्ही आमच्या वापरकर्त्यांच्या वैयक्तिक गोपनीयतेचा आदर करतो आणि तिचे रक्षण करण्यासाठी कटिबद्ध आहोत.
              </div>
              <div className="text-slate-600">
                हे गोपनीयता धोरण (Privacy Policy) Google AdSense मार्गदर्शक तत्त्वे, भारतीय माहिती तंत्रज्ञान कायदा (IT Act 2000), आणि DPDP कायदा २०२३ नुसार तयार करण्यात आले आहे.
              </div>
            </div>
          </div>

          {/* 1. Website Overview */}
          <div className="space-y-1.5">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>१. संकेतस्थळाचे कार्यक्षेत्र व परिचय (Website Scope)</span>
            </h4>
            <p>
              <b>mauliservices.in</b> हे ग्रामीण व शहरी भागातील आपले सरकार सेवा केंद्र चालक, सीएससी व्हीएलई (VLE) आणि नागरिकांसाठी महाराष्ट्र शासनाच्या अधिकृत नमुन्यानुसार संगणकीकृत अर्ज (ST जात प्रमाणपत्र व वंशावळ, उत्पन्नाचा दाखला प्रपत्र-अ, ओबीसी अर्ज, पॅन कार्ड आणि १६ शासकीय स्वघोषणापत्रे) जलद तयार करून देणारे डिजिटल सहाय्यक व्यासपीठ (Facilitation Tool) आहे.
            </p>
          </div>

          {/* 2. Client Side Storage Policy */}
          <div className="space-y-1.5">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>२. संकलित केली जाणारी माहिती व स्थानिक स्टोरेज (Information Collection)</span>
            </h4>
            <p>
              आमचे पोर्टल वापरकर्त्यांच्या गोपनीयतेला सर्वोच्च प्राधान्य देते:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                <b>स्थानिक ब्राऊझर स्टोरेज (Local Storage):</b> फॉर्ममध्ये भरलेली अर्जदाराची माहिती (नाव, पत्ता, जात, वंशावळ तक्ता) ही कोणत्याही बाह्य डेटाबेसमध्ये साठवली जात नाही; ती केवळ तुमच्या कॉम्प्युटर किंवा मोबाईलच्या स्थानिक ब्राऊझर स्टोरेजमध्ये सुरक्षित राहते.
              </li>
              <li>
                <b>फोटो व स्वाक्षरी प्रक्रिया:</b> अपलोड केलेले पासपोर्ट फोटो व स्वाक्षरी ब्राऊझरच्या मेमरीमध्ये क्लायंट-साइड प्रोसेस होऊन थेट डाऊनलोड होणाऱ्या PDF दस्तऐवजात एम्बेड होतात. आम्ही कोणत्याही वापरकर्त्याचा खाजगी फोटो आमच्या सर्व्हरवर विकत वा शेअर करत नाही.
              </li>
            </ul>
          </div>

          {/* 3. Google AdSense & DART Cookies */}
          <div className="space-y-2 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>३. Google AdSense आणि DoubleClick DART Cookies धोरण</span>
            </h4>
            <p>
              <b>mauliservices.in</b> वर तृतीय-पक्ष जाहिराती प्रदर्शित करण्यासाठी <b>Google AdSense</b> चा वापर केला जाऊ शकतो.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                Google हा तृतीय-पक्ष विक्रेता म्हणून आमच्या संकेतस्थळावर जाहिराती दाखवण्यासाठी कुकीज (Cookies) चा वापर करतो.
              </li>
              <li>
                Google द्वारे <b>DoubleClick DART Cookie</b> चा वापर केला जातो, ज्यामुळे वापरकर्त्यांना <b>mauliservices.in</b> किंवा इंटरनेटवरील इतर संकेतस्थळांच्या भेटींवर आधारित संबंधित जाहिराती दाखवता येतात.
              </li>
              <li>
                वापरकर्ते हवे असल्यास Google च्या जाहिरात गोपनीयता धोरणाला <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold underline">https://policies.google.com/technologies/ads</a> येथे भेट देऊन DART कुकीचा वापर नाकारू (Opt-out) शकतात.
              </li>
            </ul>
          </div>

          {/* 4. Log Files & Analytics */}
          <div className="space-y-1.5">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>४. लॉग फाईल्स व तांत्रिक माहिती (Log Files)</span>
            </h4>
            <p>
              इतर अनेक संकेतस्थळांप्रमाणे <b>mauliservices.in</b> मानक लॉग फाईल्सचा वापर करू शकते. यामध्ये इंटरनेट प्रोटोकॉल (IP) पत्ते, ब्राऊझर प्रकार, इंटरनेट सेवा प्रदाता (ISP), तारीख/वेळ स्टॅम्प, आणि रेफरिंग पेजेस यांचा समावेश असतो. ही माहिती कोणत्याही व्यक्तीच्या वैयक्तिक ओळखीशी जोडलेली नसते आणि फक्त पोर्टलची सुरक्षितता व कामगिरी तपासण्यासाठी वापरली जाते.
            </p>
          </div>

          {/* 5. Payment Security */}
          <div className="space-y-1.5">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-teal-600" />
              <span>५. पेमेंट गेटवे सुरक्षा (Razorpay & UPI Security)</span>
            </h4>
            <p>
              PDF डाऊनलोडसाठी आकारले जाणारे नाममात्र शुल्क हे <b>Razorpay Payment Gateway</b> किंवा थेट <b>UPI QR Code</b> द्वारे स्वीकारले जाते.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>तुमचे बँक खाते क्रमांक, डेबिट/क्रेडिट कार्ड CVV किंवा UPI PIN आमच्याकडे कधीही संकलित किंवा साठवले जात नाहीत.</li>
              <li>सर्व ऑनलाइन व्यवहार बँकिंग मानकांनुसार १२८/२५६-बिट एन्क्रिप्टेड सुरक्षित चॅनेलद्वारे होतात.</li>
            </ul>
          </div>

          {/* 6. Contact Details for mauliservices.in */}
          <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1.5">
            <div className="font-black text-xs text-indigo-950 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-indigo-600" />
              <span>गोपनीयता अधिकारी व संपर्क माहिती (Contact for mauliservices.in)</span>
            </div>
            <p className="text-[11px] text-indigo-900">
              आमच्या गोपनीयता धोरणाबद्दल आपल्या मनात काही शंका किंवा प्रश्न असल्यास आपण खालील अधिकृत पत्त्यावर आमच्याशी थेट संपर्क साधू शकता:
            </p>
            <div className="text-[11px] text-slate-700 font-medium space-y-0.5 pt-1">
              <div><b>संकेतस्थळ:</b> <a href={websiteUrl} className="text-indigo-600 underline font-mono">{websiteUrl}</a></div>
              <div><b>केंद्र:</b> {centerName} (संचालक: प्रशांत वाळू भोये)</div>
              <div><b>पत्ता:</b> {centerAddress}</div>
              <div><b>अधिकृत ईमेल:</b> <span className="font-mono font-bold text-slate-900">prashantbhoye098@gmail.com</span></div>
              <div><b>हेल्पलाईन फोन:</b> <span className="font-mono font-bold text-slate-900">{centerContact}</span></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 font-mono">
            © {new Date().getFullYear()} mauliservices.in · सर्व हक्क राखीव
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
