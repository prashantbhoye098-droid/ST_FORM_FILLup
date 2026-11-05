import React, { useState } from 'react';
import { UserProfile } from '../types/form';
import { AdminSettings } from '../types/admin';
import {
  X,
  QrCode,
  CheckCircle,
  ShieldCheck,
  Zap,
  Smartphone,
  Lock,
  Printer,
  FileText
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  adminSettings: AdminSettings;
  onUnlockWatermarkForPrint: () => void;
  pageCount?: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  user,
  adminSettings,
  onUnlockWatermarkForPrint,
  pageCount = 1
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');

  if (!isOpen) return null;

  const perPageFee = adminSettings.payment.perPageFee || 10;
  const totalAmount = Math.max(perPageFee, pageCount * perPageFee);

  const upiId = adminSettings.payment.upiId || 'prashantbhoye098@oksbi';
  const payeeName = adminSettings.payment.payeeName || 'माऊली डिजिटल सेवा केंद्र पाथवे दिगर';

  // Dynamic UPI URL with real amount and note
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(`Form Print ${pageCount} Pages`)}`;

  const qrImageUrl = adminSettings.payment.customQrCodeUrl ||
    `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiUrl)}&margin=6`;

  const handleConfirmPayment = () => {
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
                पेमेंट केल्यावर वॉटरमार्क तात्काळ निघून जाईल आणि स्वच्छ प्रिंट सुरू होईल
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
                वॉटरमार्क हटवला गेला आहे. तुमची प्रिंट विंडो उघडत आहे...
              </div>
            </div>
          )}

          {/* Amount Breakdown Card */}
          <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-700" />
                <span>दस्तऐवज शुल्क ({pageCount} पाने):</span>
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                दर: ₹{perPageFee} प्रति पृष्ठ × {pageCount} पाने
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black text-slate-950 font-mono">
                ₹{totalAmount}
              </div>
              <div className="text-[10px] text-emerald-700 font-bold uppercase">
                देय एकूण रक्कम
              </div>
            </div>
          </div>

          {/* QR Code Payment Box */}
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
                PhonePe, Google Pay, Paytm किंवा कोणत्याही UPI ॲपने वरील QR कोड स्कॅन करून <b>₹{totalAmount}</b> भरा.
              </div>

              <div className="text-xs font-mono bg-slate-950 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">खातेदार / केंद्र:</div>
                <div className="font-bold text-amber-300 truncate">{payeeName}</div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  UPI ID: <span className="font-bold text-emerald-400">{upiId}</span>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="UPI UTR / संदर्भ क्र. (ऐच्छिक)"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full text-xs bg-slate-950 text-white px-3 py-2 border border-slate-700 rounded-lg focus:outline-hidden focus:border-amber-400 font-mono"
                />
              </div>

              <button
                type="button"
                disabled={isVerifying}
                onClick={handleConfirmPayment}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-4 h-4 text-white" />
                <span>
                  {isVerifying ? 'पडताळणी होत आहे...' : `मी ₹${totalAmount} भरले · वॉटरमार्क हटवून प्रिंट करा`}
                </span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>१००% अधिकृत सरकारी नमुना प्रत:</span>
            </div>
            <div>
              पेमेंट पूर्ण होताच पानावरील "माऊली डिजिटल सेवा केंद्र" चा वॉटरमार्क पूर्णपणे निघून जातो आणि मूळ शासकीय प्रत प्रिंट होते.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-3 sm:p-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-1.5 font-medium">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>सुरक्षित UPI पेमेंट गेटवे</span>
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
