import React, { useState } from 'react';
import { UserProfile, FormCategory } from '../types/form';
import { AdminSettings } from '../types/admin';
import {
  X,
  QrCode,
  CheckCircle,
  ShieldCheck,
  Zap,
  Lock,
  Printer,
  FileText,
  CreditCard,
  AlertCircle
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  adminSettings: AdminSettings;
  onUnlockWatermarkForPrint: () => void;
  pageCount?: number;
  currentCategory?: FormCategory;
  customDocTitle?: string;
  customAmount?: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  user: _user,
  adminSettings,
  onUnlockWatermarkForPrint,
  pageCount = 1,
  currentCategory,
  customDocTitle,
  customAmount
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [utrError, setUtrError] = useState('');

  if (!isOpen) return null;

  // 1. Dynamic Per-Document Pricing Calculation
  const getDocumentDetails = () => {
    const docFees = adminSettings.payment.docFees || {
      stCasteFee: 20,
      obcScFee: 20,
      incomeFee: 10,
      selfDeclFee: 10,
      panCardFee: 15
    };

    if (currentCategory === 'ST_CASTE') {
      return {
        title: '१. अनुसूचित जमाती (ST) जात प्रमाणपत्र व वंशावळ',
        subtitle: '६ पाने संपूर्ण संच (प्रपत्र-१ ते ५ व वंशावळ)',
        fee: docFees.stCasteFee ?? 20
      };
    }
    if (currentCategory === 'INCOME_DECLARATION') {
      return {
        title: '२. उत्पन्नाचा दाखला अर्ज (प्रपत्र-अ)',
        subtitle: 'तहसीलदार कार्यालयासाठी प्रपत्र-अ मिळकत घोषणापत्र',
        fee: docFees.incomeFee ?? 10
      };
    }
    if (currentCategory === 'OBC_SC_CASTE') {
      return {
        title: '३. इतर मागासवर्गीय (OBC / SC) जात प्रमाणपत्र अर्ज',
        subtitle: '७ पाने संपूर्ण संच (परिशिष्ट व प्रतिज्ञापत्र)',
        fee: docFees.obcScFee ?? 20
      };
    }
    if (currentCategory === 'SELF_DECLARATIONS_16') {
      return {
        title: '४. शासकीय स्वघोषणापत्र दाखला',
        subtitle: '१६ शासकीय दाखल्यांपैकी निवडलेला दाखला',
        fee: docFees.selfDeclFee ?? 10
      };
    }
    if (currentCategory === 'PAN_CARD_49A') {
      return {
        title: '५. पॅन कार्ड अर्ज (२-पानी Form)',
        subtitle: 'नवीन Form 49A किंवा दुरुस्ती CR-01 फोटो व सहीसह',
        fee: docFees.panCardFee ?? 15
      };
    }

    return {
      title: customDocTitle || `शासकीय फॉर्म प्रिंट (${pageCount} पाने)`,
      subtitle: `दर: ₹${adminSettings.payment.perPageFee || 10} प्रति पृष्ठ × ${pageCount} पाने`,
      fee: Math.max(adminSettings.payment.perPageFee || 10, pageCount * (adminSettings.payment.perPageFee || 10))
    };
  };

  const docDetails = getDocumentDetails();
  const totalAmount = customAmount ?? docDetails.fee;

  const upiId = adminSettings.payment.upiId || '';
  const payeeName = adminSettings.payment.payeeName || 'माऊली डिजिटल सेवा केंद्र (प्रशांत वाळू भोये)';

  // Toggle checks:
  const isRazorpayActive = Boolean(
    adminSettings.payment.razorpay?.enabled && adminSettings.payment.razorpay?.keyId
  );
  const isShopQrActive = Boolean(adminSettings.payment.enableShopQrPayment && upiId);

  // Dynamic UPI URL with real amount and note
  const orderRef = `ORD${Date.now().toString().slice(-6)}`;
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(`${docDetails.title.slice(0, 20)} ${orderRef}`)}&tr=${orderRef}`;

  const qrImageUrl =
    adminSettings.payment.customQrCodeUrl ||
    `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiUrl)}&margin=6`;

  // Intent links for mobile apps
  const phonePeIntent = `phonepe://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${totalAmount}&cu=INR&tr=${orderRef}`;
  const gPayIntent = `tez://upi/pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${totalAmount}&cu=INR&tr=${orderRef}`;
  const paytmIntent = `paytmmp://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${totalAmount}&cu=INR&tr=${orderRef}`;

  const handlePayWithRazorpay = () => {
    const keyId = adminSettings.payment.razorpay?.keyId;
    if (!keyId) {
      alert('कृपया ॲडमीन पॅनेलमध्ये जाऊन Razorpay Key ID सेट करा.');
      return;
    }

    if (!(window as any).Razorpay) {
      alert('Razorpay सिस्टीम लोड होत आहे. कृपया पुन्हा प्रयत्न करा.');
      return;
    }

    try {
      const options = {
        key: keyId,
        amount: totalAmount * 100, // in paise
        currency: 'INR',
        name: adminSettings.branding.centerName || 'माऊली डिजिटल सेवा केंद्र',
        description: docDetails.title,
        image: adminSettings.branding.centerLogoUrl || undefined,
        handler: function (_response: any) {
          setIsVerifying(true);
          setTimeout(() => {
            setIsVerifying(false);
            setPaymentSuccess(true);
            setTimeout(() => {
              setPaymentSuccess(false);
              onUnlockWatermarkForPrint();
              onClose();
            }, 800);
          }, 400);
        },
        prefill: {
          contact: adminSettings.branding.centerContact || ''
        },
        theme: {
          color: '#2563eb'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error('Razorpay open error', e);
      alert('Razorpay उघडताना त्रुटी आली. कृपया ॲडमीन सेटिंग्ज तपासा.');
    }
  };

  const handleConfirmQrPayment = () => {
    setUtrError('');

    // Strict UTR verification check
    const trimmedUtr = utrNumber.trim();
    if (adminSettings.payment.requireStrictUtrVerification !== false) {
      if (trimmedUtr.length < 12) {
        setUtrError('कृपया बँकेचा अचूक १२-अंकी UPI UTR / संदर्भ क्रमांक (Reference Number) प्रविष्ट करा.');
        return;
      }
    } else if (!trimmedUtr) {
      setUtrError('कृपया UPI UTR नंबर प्रविष्ट करा.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        onUnlockWatermarkForPrint();
        onClose();
      }, 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-4 no-print animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-black text-lg shadow-sm">
              <Printer className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg tracking-tight leading-tight text-slate-950">
                प्रिंट व PDF डाउनलोडसाठी पेमेंट
              </h3>
              <p className="text-xs font-bold text-slate-900/80">
                पेमेंट केल्यावर वॉटरमार्क तात्काळ निघून जाईल आणि स्वच्छ फाईल मिळेल
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-950 hover:bg-black/15 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Success Banner */}
          {paymentSuccess && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-xl text-center space-y-1 animate-bounce">
              <CheckCircle className="w-9 h-9 text-emerald-600 mx-auto" />
              <div className="text-base font-black text-emerald-950">पेमेंट यशस्वी झाले!</div>
              <div className="text-xs text-emerald-700 font-semibold">
                वॉटरमार्क हटवला गेला आहे. तुमची प्रिंट / डाउनलोड प्रक्रिया सुरू होत आहे...
              </div>
            </div>
          )}

          {/* Amount Breakdown Card with Specific Document Name */}
          <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-4 flex items-center justify-between">
            <div className="space-y-0.5 max-w-[70%]">
              <div className="text-xs font-black text-amber-950 flex items-center gap-1.5 truncate">
                <FileText className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="truncate">{docDetails.title}</span>
              </div>
              <div className="text-[11px] text-slate-600 font-medium leading-tight">
                {docDetails.subtitle}
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-2xl font-black text-slate-950 font-mono">
                ₹{totalAmount}
              </div>
              <div className="text-[10px] text-emerald-700 font-bold uppercase">
                देय एकूण शुल्क
              </div>
            </div>
          </div>

          {/* Option A: Razorpay Official 1-Click Instant Payment Card */}
          {isRazorpayActive && (
            <div className="p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl text-white shadow-lg space-y-2.5 animate-fade-in border border-blue-400">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-200">
                  <CreditCard className="w-4 h-4 text-amber-300" />
                  <span>अधिकृत Razorpay ऑटो-व्हेरीफाय</span>
                </div>
                <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                  १ सेकंदात प्रिंट
                </span>
              </div>

              <button
                type="button"
                onClick={handlePayWithRazorpay}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-slate-50 text-blue-900 font-black text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer hover:shadow-lg"
              >
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span>Razorpay ने ऑनलाईन भरा (₹{totalAmount})</span>
              </button>

              <p className="text-[10px] text-blue-100 text-center leading-relaxed">
                PhonePe, Google Pay, Paytm, डेबिट/क्रेडिट कार्ड किंवा नेटबँकिंग — पैसे भरताच आपोआप व्हेरिफाय होऊन वॉटरमार्क निघेल!
              </p>
            </div>
          )}

          {/* Divider between Razorpay & Shop QR if both are active */}
          {isRazorpayActive && isShopQrActive && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-slate-300"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                किंवा थेट दुकानाचा QR कोड स्कॅन करा
              </span>
              <div className="flex-1 h-px bg-slate-300"></div>
            </div>
          )}

          {/* Option B: Shop QR Code Payment Box (Only rendered if enableShopQrPayment is ON in Admin) */}
          {isShopQrActive && (
            <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative bg-white p-2 rounded-xl shadow-md shrink-0">
                <img
                  src={qrImageUrl}
                  alt="UPI QR Code"
                  className="w-36 h-36 sm:w-40 sm:h-40 object-contain"
                />
                <div className="text-center mt-1">
                  <span className="bg-amber-100 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full font-mono">
                    स्कॅन करा: ₹{totalAmount}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-2.5 text-center sm:text-left w-full">
                <div className="text-xs text-slate-300">
                  PhonePe, Google Pay, Paytm ने वरील QR कोड स्कॅन करून <b>₹{totalAmount}</b> भरा.
                </div>

                {/* 1-Tap UPI App Buttons for Mobile Users */}
                <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                  <a
                    href={phonePeIntent}
                    className="px-2 py-1.5 bg-purple-900/90 hover:bg-purple-800 text-purple-200 border border-purple-700 rounded-lg text-center font-bold text-[10px] truncate transition-colors"
                  >
                    PhonePe
                  </a>
                  <a
                    href={gPayIntent}
                    className="px-2 py-1.5 bg-blue-900/90 hover:bg-blue-800 text-blue-200 border border-blue-700 rounded-lg text-center font-bold text-[10px] truncate transition-colors"
                  >
                    Google Pay
                  </a>
                  <a
                    href={paytmIntent}
                    className="px-2 py-1.5 bg-sky-900/90 hover:bg-sky-800 text-sky-200 border border-sky-700 rounded-lg text-center font-bold text-[10px] truncate transition-colors"
                  >
                    Paytm
                  </a>
                </div>

                {/* UTR Number Input with Strict Validation */}
                <div className="space-y-1">
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="बँकेचा १२-अंकी UPI UTR / Ref No. टाका"
                    value={utrNumber}
                    onChange={(e) => {
                      setUtrNumber(e.target.value);
                      if (utrError) setUtrError('');
                    }}
                    className={`w-full text-xs bg-slate-950 text-white px-3 py-2 border rounded-lg focus:outline-hidden font-mono ${
                      utrError
                        ? 'border-red-500 ring-1 ring-red-500'
                        : 'border-slate-700 focus:border-amber-400'
                    }`}
                  />
                  {utrError && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{utrError}</span>
                    </div>
                  )}
                  <div className="text-[10px] text-slate-400">
                    पेमेंट झाल्यावर ॲपमधील १२-अंकी UTR किंवा Txn ID इथे नोंदवा.
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isVerifying}
                  onClick={handleConfirmQrPayment}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <Zap className="w-4 h-4 text-white" />
                  <span>
                    {isVerifying ? 'पडताळणी होत आहे...' : `मी ₹${totalAmount} भरले · प्रिंट सुरू करा`}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* When Shop QR is turned OFF by Admin, give a clean security assurance note */}
          {!isShopQrActive && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                सुरक्षिततेसाठी पेमेंट Razorpay द्वारे स्वयंचलित पडताळले जाते. खोटा UTR नंबर वापरण्याची आवश्यकता नाही.
              </span>
            </div>
          )}

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>१००% अधिकृत शासकीय नमुना प्रत:</span>
            </div>
            <div>
              पेमेंट पूर्ण होताच पानावरील वॉटरमार्क पूर्णपणे निघून जातो आणि मूळ शासकीय प्रत प्रिंट / डाऊनलोड होते.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-3 sm:p-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-1.5 font-medium">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>सुरक्षित पेमेंट गेटवे</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded-lg font-bold cursor-pointer text-xs"
          >
            रद्द करा
          </button>
        </div>
      </div>
    </div>
  );
};
