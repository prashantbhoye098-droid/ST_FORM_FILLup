import React, { useState } from 'react';
import { UserProfile } from '../types/form';
import {
  X,
  QrCode,
  CheckCircle,
  Crown,
  ShieldCheck,
  CreditCard,
  Zap,
  ArrowRight,
  Sparkles,
  Smartphone
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUnlockWatermarkForPrint: () => void;
  onCreditWallet: (amount: number) => void;
  onOpenSubscription: () => void;
  onProceedWithWatermark: () => void;
  pageCount?: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  user,
  onUnlockWatermarkForPrint,
  onCreditWallet,
  onOpenSubscription,
  onProceedWithWatermark,
  pageCount = 1
}) => {
  const [selectedPlanType, setSelectedPlanType] = useState<'per_page' | 'wallet_50' | 'wallet_100'>('per_page');
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');

  if (!isOpen) return null;

  const currentAmount =
    selectedPlanType === 'per_page'
      ? Math.max(10, pageCount * 10)
      : selectedPlanType === 'wallet_50'
      ? 50
      : 100;

  // UPI Link generation for real mobile scanning
  const upiId = 'mauliseva@upi';
  const payeeName = 'Mauli Digital Seva Kendra';
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${currentAmount}&cu=INR&tn=${encodeURIComponent('ASSK Form Print Fee')}`;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    upiUrl
  )}`;

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setPaymentSuccess(true);

      if (selectedPlanType === 'per_page') {
        onUnlockWatermarkForPrint();
      } else {
        onCreditWallet(currentAmount);
      }

      setTimeout(() => {
        setPaymentSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  const handlePayFromWallet = () => {
    const cost = Math.max(10, pageCount * 10);
    if (user.walletBalance >= cost) {
      onCreditWallet(-cost);
      onUnlockWatermarkForPrint();
      onClose();
    } else {
      alert(`आपल्या व्हॅलेटमध्ये पुरेसे पैसे नाहीत. आवश्यक: ₹${cost}, सध्या शिल्लक: ₹${user.walletBalance}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-3 sm:p-4 no-print animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-amber-300 flex items-center justify-center font-black text-sm shadow-sm">
              ₹
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg tracking-tight leading-tight">
                वॉटरमार्कशिवाय ओरिजिनल PDF प्रिंट / डाऊनलोड
              </h3>
              <p className="text-xs font-semibold text-slate-900/80">
                पे पर पेज (₹१०/पेज) किंवा व्हॅलेट रिचार्ज
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-900 hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Success Banner */}
          {paymentSuccess && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-xl text-center space-y-1 animate-bounce">
              <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="text-sm font-black text-emerald-950">पेमेंट यशस्वी झाले!</div>
              <div className="text-xs text-emerald-700">
                वॉटरमार्क काढला गेला आहे. आता तुमची मूळ स्वच्छ सरकारी प्रत तयार आहे.
              </div>
            </div>
          )}

          {/* Quick Pay Options Tabs */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSelectedPlanType('per_page')}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                selectedPlanType === 'per_page'
                  ? 'border-amber-500 bg-amber-50/70 shadow-xs'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="text-[11px] font-bold text-slate-500">चालू अर्ज</div>
              <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                ₹{Math.max(10, pageCount * 10)}
              </div>
              <div className="text-[10px] text-amber-700 font-semibold mt-1">
                {pageCount > 1 ? `${pageCount} पाने (₹१०/पान)` : '१ पान प्रिंट'}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPlanType('wallet_50')}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                selectedPlanType === 'wallet_50'
                  ? 'border-amber-500 bg-amber-50/70 shadow-xs'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="text-[11px] font-bold text-slate-500">व्हॅलेट रिचार्ज</div>
              <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                ₹५०
              </div>
              <div className="text-[10px] text-indigo-700 font-semibold mt-1">
                ५ पाने प्रिंट क्रेडिट
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPlanType('wallet_100')}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                selectedPlanType === 'wallet_100'
                  ? 'border-amber-500 bg-amber-50/70 shadow-xs'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="text-[11px] font-bold text-slate-500">व्हॅलेट रिचार्ज</div>
              <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                ₹१००
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                १० पाने प्रिंट क्रेडिट
              </div>
            </button>
          </div>

          {/* If user already has wallet balance */}
          {user.walletBalance >= Math.max(10, pageCount * 10) && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-900">
                  तुमच्या व्हॅलेटमध्ये ₹{user.walletBalance} शिल्लक आहेत!
                </div>
                <div className="text-[11px] text-emerald-700">
                  थेट व्हॅलेटमधून ₹{Math.max(10, pageCount * 10)} कापून त्वरित प्रिंट करा.
                </div>
              </div>
              <button
                type="button"
                onClick={handlePayFromWallet}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs cursor-pointer whitespace-nowrap"
              >
                व्हॅलेटने अनलॉक करा
              </button>
            </div>
          )}

          {/* Live UPI QR Box */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row items-center gap-5">
            <div className="relative bg-white p-2.5 rounded-xl border-2 border-slate-300 shadow-xs shrink-0">
              <img
                src={qrImageUrl}
                alt="UPI QR Code"
                className="w-36 h-36 sm:w-40 sm:h-40 object-contain"
              />
              <div className="absolute inset-x-0 bottom-1 text-center">
                <span className="bg-amber-100 text-amber-900 font-extrabold text-[9px] px-2 py-0.5 rounded-full border border-amber-300">
                  रक्कम: ₹{currentAmount}.००
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                <span>कोणत्याही UPI अ‍ॅपद्वारे स्कॅन करा</span>
              </div>

              {/* UPI Brand Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-[10px] font-bold">
                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded border border-purple-200">
                  PhonePe
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded border border-blue-200">
                  Google Pay
                </span>
                <span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded border border-sky-200">
                  Paytm
                </span>
                <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded border border-green-200">
                  BHIM UPI
                </span>
              </div>

              <div className="text-[11px] text-slate-600 font-mono bg-white px-2.5 py-1 rounded border border-slate-200 inline-block">
                UPI ID: <span className="font-bold text-slate-900">{upiId}</span>
              </div>

              {/* Optional UTR / Reference Input */}
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="UTR / संदर्भ क्र. (ऐच्छिक)"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full text-[11px] px-2.5 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Instant Verification Button */}
              <button
                type="button"
                disabled={isVerifying}
                onClick={handleSimulatePayment}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>
                  {isVerifying ? 'पडताळणी चालू आहे...' : `मी ₹${currentAmount} पाठवले · अनलॉक करा`}
                </span>
              </button>
            </div>
          </div>

          {/* Upsell to Monthly/Yearly Subscription */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-3.5 rounded-xl border border-indigo-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Crown className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-black text-amber-300">
                  वारंवार फॉर्म्स लागतात? सबस्क्रिप्शन घ्या!
                </div>
                <div className="text-[10px] text-slate-300">
                  महिना फक्त ₹१९९ किंवा वर्षभर ₹१,१९९ (अमर्याद प्रिंट्स, ० वॉटरमार्क)
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSubscription();
              }}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] rounded-lg whitespace-nowrap cursor-pointer shadow-xs"
            >
              प्लॅन पहा →
            </button>
          </div>

          {/* Free watermark fallback */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => {
                onProceedWithWatermark();
                onClose();
              }}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
            >
              किंवा वॉटरमार्कसह मोफत प्रिव्ह्यू प्रिंट चालू ठेवा
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-3 sm:p-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>सुरक्षित UPI पेमेंट · माऊली डिजिटल सेवा केंद्र</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded font-bold cursor-pointer"
          >
            बंद करा
          </button>
        </div>

      </div>
    </div>
  );
};
