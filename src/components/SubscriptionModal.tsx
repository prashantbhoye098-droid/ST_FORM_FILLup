import React, { useState } from 'react';
import { X, Check, Sparkles, ShieldCheck, Zap, Award } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePlan: 'monthly' | 'yearly' | 'trial';
  onSelectPlan: (plan: 'monthly' | 'yearly') => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  activePlan,
  onSelectPlan
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [promoCode, setPromoCode] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SEVA2024' || promoCode.trim().toUpperCase() === 'FREE' || promoCode.trim().length > 3) {
      setIsSuccess(true);
      setTimeout(() => {
        onSelectPlan(billingCycle);
        setIsSuccess(false);
        onClose();
        alert('अभिनंदन! आपले सरकार सेवा केंद्र प्रो सबस्क्रिप्शन सक्रिय करण्यात आले आहे.');
      }, 800);
    } else {
      alert('कृपया वैध कूपन किंवा ॲक्टिव्हेशन कोड टाका.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 no-print overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>आपले सरकार सेवा केंद्र ऑपरेटर पोर्टल</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            केंद्र सबस्क्रिप्शन प्लॅन्स (Subscription Plans)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
            सर्व केंद्रांसाठी एकाच ठिकाणी सर्व शासकीय फॉर्म्स, वंशावळ ट्री, अमर्यादित PDF प्रिंटिंग आणि गाव प्रोफाईल सेव्हिंग!
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center mt-5">
            <div className="bg-white/10 p-1 rounded-lg flex items-center gap-1 border border-white/20">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                मासिक (Monthly)
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${
                  billingCycle === 'yearly'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                <span>वार्षिक (Yearly)</span>
                <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase font-black">
                  ४०% बचत
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Basic Plan */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/60 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-slate-500">स्टँडर्ड केंद्र प्लॅन</span>
              </div>
              <div className="text-2xl font-black text-slate-900">
                {billingCycle === 'monthly' ? '₹ १९९' : '₹ १,१९९'}
                <span className="text-xs font-normal text-slate-500 ml-1">
                  / {billingCycle === 'monthly' ? 'महिना' : 'वर्ष'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">लहान केंद्रांसाठी योग्य</p>

              <div className="space-y-2 mt-4 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ST जात प्रमाणपत्र फॉर्म (६ पृष्ठे)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>उत्पन्नाचा दाखला (प्रपत्र-अ)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>A4 साईज प्रिंटिंग व PDF सेव्ह</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-4 text-center">—</span>
                  <span>मर्यादित गाव प्रोफाईल्स (३ गावे)</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectPlan(billingCycle);
                onClose();
                alert(`स्टँडर्ड प्लॅन (${billingCycle === 'monthly' ? 'मासिक' : 'वार्षिक'}) निवडला आहे.`);
              }}
              className="mt-6 w-full py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-lg transition-colors"
            >
              हा प्लॅन सुरू करा
            </button>
          </div>

          {/* Pro / Center Owner Plan */}
          <div className="border-2 border-indigo-600 rounded-xl p-5 bg-indigo-50/30 flex flex-col justify-between relative shadow-sm">
            <div className="absolute -top-3 right-4 bg-indigo-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              सर्वात लोकप्रिय
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-indigo-700 flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  प्रो सेवा केंद्र (All-in-One)
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">
                {billingCycle === 'monthly' ? '₹ २९९' : '₹ १,९९९'}
                <span className="text-xs font-normal text-slate-500 ml-1">
                  / {billingCycle === 'monthly' ? 'महिना' : 'वर्ष'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">सर्व केंद्रांसाठी संपूर्ण सुविधा</p>

              <div className="space-y-2 mt-4 text-xs text-slate-800">
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>सर्व फॉर्म्स: ST, OBC, SC, VJNT, SBC</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>१६ प्रकारचे शासकीय स्वयं घोषणापत्र दाखले</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>उत्पन्नाचा दाखला ३ वर्षांचा तक्ता</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>कस्टम केंद्र लोगो व ASSK लोगो बदल</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>अमर्यादित गाव प्रोफाईल्स (१-क्लिक ऑटो-फिल)</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectPlan(billingCycle);
                onClose();
                alert(`अभिनंदन! प्रो सेवा केंद्र प्लॅन (${billingCycle === 'monthly' ? 'मासिक' : 'वार्षिक'}) सुरू झाला आहे.`);
              }}
              className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs rounded-lg shadow-sm transition-colors"
            >
              प्रो प्लॅन निवडा (सक्रिय करा)
            </button>
          </div>
        </div>

        {/* Promo / License Key Activation Box */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0" />
            <span>कूपन कोड किंवा ऑपरेटर ॲक्टिव्हेशन की आहे का?</span>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="उदा. SEVA2024"
              className="px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500 uppercase font-mono"
            />
            <button
              type="button"
              onClick={handleApplyPromo}
              className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-md hover:bg-slate-800 transition-colors shrink-0"
            >
              सक्रिय करा
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
