import React, { useState } from 'react';
import { UserProfile } from '../types/form';
import { X, CheckCircle, ShieldCheck, Mail, LogOut, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onOpenSubscription: () => void;
  onOpenPayment: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onOpenSubscription,
  onOpenPayment
}) => {
  const [operatorName, setOperatorName] = useState(user.name);
  const [operatorEmail, setOperatorEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    // Simulated instant Google OAuth sign-in flow
    onUpdateUser({
      isLoggedIn: true,
      name: operatorName || 'प्रशांत रामदास भोये',
      email: operatorEmail || 'prashantbhoye098@gmail.com',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    });
  };

  const handleSignOut = () => {
    onUpdateUser({
      isLoggedIn: false,
      plan: 'free',
      walletBalance: 0
    });
  };

  const handleSaveProfile = () => {
    onUpdateUser({
      name: operatorName,
      email: operatorEmail
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 no-print animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-base shadow-sm">
              महा
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">
                {user.isLoggedIn ? 'केंद्र संचालक प्रोफाईल' : 'गुगल साइन-इन / खाते'}
              </h3>
              <p className="text-xs text-slate-300">
                आपले सरकार सेवा केंद्र ऑपरेटर पोर्टल
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {!user.isLoggedIn ? (
            /* Logged Out View - Google One-Tap / Button */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center mx-auto text-indigo-600">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  आपल्या गुगल खात्याद्वारे लॉगिन करा
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto leading-relaxed">
                  सर्व शासकीय फॉर्म्स, सेव्ह केलेली गावे आणि सबस्क्रिप्शन सुरक्षित ठेवण्यासाठी गुगल लॉगिन करा.
                </p>
              </div>

              {/* Official Google Sign-In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 rounded-xl shadow-xs text-slate-800 font-bold text-sm transition-all cursor-pointer hover:shadow-md"
              >
                {/* Real Google SVG Logo */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign in with Google (गुगल सह पुढे जा)</span>
              </button>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>१००% सुरक्षित व त्वरित प्रमाणीकरण</span>
              </div>
            </div>
          ) : (
            /* Logged In Operator Profile View */
            <div className="space-y-4">
              <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <img
                  src={user.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full border-2 border-indigo-400 object-cover shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-slate-900 truncate">
                      {user.name}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-300">
                      सत्यापित
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Account Status & Plan */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                    प्लॅन स्थिती
                  </div>
                  <div className="text-sm font-black text-amber-950 mt-1 capitalize">
                    {user.plan === 'yearly'
                      ? '★ वार्षिक VIP (अमर्याद)'
                      : user.plan === 'monthly'
                      ? 'मासिक प्रो'
                      : 'विनामूल्य (Free)'}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenSubscription();
                    }}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-900 underline mt-1.5 block cursor-pointer"
                  >
                    अपग्रेड करा →
                  </button>
                </div>

                <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                  <div className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider">
                    व्हॅलेट शिल्लक
                  </div>
                  <div className="text-lg font-black text-indigo-950 mt-0.5">
                    ₹{user.walletBalance}.००
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenPayment();
                    }}
                    className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 underline mt-1 block cursor-pointer"
                  >
                    रिचार्ज करा (₹१०/पेज) →
                  </button>
                </div>
              </div>

              {/* Edit Details */}
              {isEditing ? (
                <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      संचालकाचे नाव
                    </label>
                    <input
                      type="text"
                      value={operatorName}
                      onChange={(e) => setOperatorName(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ईमेल पत्ता
                    </label>
                    <input
                      type="email"
                      value={operatorEmail}
                      onChange={(e) => setOperatorEmail(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex gap-2 justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded"
                    >
                      रद्द करा
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      className="px-3 py-1 text-xs font-bold bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      जतन करा
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center text-xs px-1">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="text-slate-600 hover:text-indigo-600 font-semibold underline"
                  >
                    नाव व ईमेल बदला
                  </button>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>लॉगआउट</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>माऊली डिजिटल सेवा केंद्र पाथवे दिगर</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            पूर्ण
          </button>
        </div>
      </div>
    </div>
  );
};
