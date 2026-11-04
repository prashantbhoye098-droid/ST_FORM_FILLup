import React, { useState } from 'react';
import { SubscribedCenter, AdminSettings } from '../types/admin';
import { UserProfile } from '../types/form';
import {
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  CheckCircle,
  Copy,
  Check,
  QrCode,
  Smartphone,
  ExternalLink,
  Crown,
  KeyRound,
  User,
  Building2,
  Calendar,
  Sparkles,
  HelpCircle,
  PhoneCall,
  Send,
  AlertTriangle
} from 'lucide-react';

interface PaidAccessGateModalProps {
  isOpen: boolean;
  onClose?: () => void;
  adminSettings: AdminSettings;
  subscribedCenters: SubscribedCenter[];
  onAddSubscribedCenter: (center: SubscribedCenter) => void;
  onLoginSuccess: (user: Partial<UserProfile>, isAdmin?: boolean) => void;
}

export const PaidAccessGateModal: React.FC<PaidAccessGateModalProps> = ({
  isOpen,
  onClose,
  adminSettings,
  subscribedCenters,
  onAddSubscribedCenter,
  onLoginSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login State
  const [loginIdOrMobile, setLoginIdOrMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Registration State
  const [regCenterName, setRegCenterName] = useState('');
  const [regOwnerName, setRegOwnerName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regVillage, setRegVillage] = useState('');
  const [regTaluka, setRegTaluka] = useState('बागलाण');
  const [regDistrict, setRegDistrict] = useState('नाशिक');
  const [regPlan, setRegPlan] = useState<'monthly' | 'quarterly' | 'yearly' | 'lifetime'>('yearly');
  const [regUtr, setRegUtr] = useState('');
  const [regError, setRegError] = useState('');

  // Generated Credentials State
  const [generatedCredentials, setGeneratedCredentials] = useState<{
    id: string;
    password: string;
    centerName: string;
    ownerName: string;
    mobile: string;
    plan: string;
    expiresAt: string;
  } | null>(null);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  // Plan Prices from Admin Settings
  const planPrices = {
    monthly: adminSettings.payment.monthlyPlanPrice || 199,
    quarterly: adminSettings.payment.quarterlyPlanPrice || 499,
    yearly: adminSettings.payment.yearlyPlanPrice || 1499,
    lifetime: adminSettings.payment.lifetimePlanPrice || 2999
  };

  const currentPlanAmount = planPrices[regPlan];

  // UPI payment intent URL
  const upiUrl = `upi://pay?pa=${encodeURIComponent(adminSettings.payment.upiId || 'prashantbhoye098@oksbi')}&pn=${encodeURIComponent(adminSettings.payment.payeeName || 'माऊली डिजिटल सेवा केंद्र')}&am=${currentPlanAmount}&cu=INR&tn=${encodeURIComponent(`Portal-${regPlan}`)}`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiUrl)}&margin=8`;

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const cleanInput = loginIdOrMobile.trim();
    const cleanPass = loginPassword.trim();

    if (!cleanInput || !cleanPass) {
      setLoginError('कृपया केंद्र आयडी / मोबाईल नंबर आणि पासवर्ड दोन्ही भरा.');
      return;
    }

    // Check Master Admin login
    if (
      (cleanInput.toLowerCase() === 'admin' || cleanInput === 'mauli@2024' || cleanInput === adminSettings.adminPassword) &&
      cleanPass === (adminSettings.adminPassword || 'mauli@2024')
    ) {
      onLoginSuccess(
        {
          id: 'admin_master',
          name: 'मास्टर ॲडमीन (प्रशांत भोये)',
          centerName: adminSettings.branding.centerName,
          plan: 'lifetime',
          isLoggedIn: true,
          isSubscribed: true
        },
        true
      );
      return;
    }

    // Check in Subscribed Centers database
    const matched = subscribedCenters.find(
      (c) =>
        (c.id.toLowerCase() === cleanInput.toLowerCase() || c.mobile === cleanInput) &&
        c.password === cleanPass
    );

    if (!matched) {
      setLoginError('अवैध केंद्र आयडी किंवा पासवर्ड! कृपया पुन्हा तपासा किंवा नवीन नोंदणी करा.');
      return;
    }

    if (matched.status === 'suspended') {
      setLoginError('हे केंद्र खाते सध्या स्थगित (Suspended) केले आहे. कृपया मुख्य ॲडमीनशी संपर्क करा.');
      return;
    }

    // Check expiry
    const expiryDate = new Date(matched.expiresAt);
    if (expiryDate < new Date() && matched.plan !== 'lifetime') {
      setLoginError(`आपले सबस्क्रिप्शन ${expiryDate.toLocaleDateString('mr-IN')} रोजी संपले आहे. कृपया खाली रिन्यू करा.`);
      return;
    }

    // Login success!
    onLoginSuccess({
      id: matched.id,
      centerId: matched.id,
      name: matched.ownerName,
      centerName: matched.centerName,
      mobile: matched.mobile,
      village: matched.village,
      plan: matched.plan,
      planExpiryDate: matched.expiresAt,
      isLoggedIn: true,
      isSubscribed: true
    });
  };

  // Helper to generate a unique Center ID
  const generateUniqueId = (): string => {
    const random4Digits = Math.floor(1000 + Math.random() * 9000);
    return `MSK-${random4Digits}`;
  };

  // Helper to generate a secure 6-char password
  const generatePassword = (): string => {
    const random3 = Math.floor(100 + Math.random() * 900);
    return `M@uli${random3}`;
  };

  // Registration handler
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regCenterName.trim()) {
      setRegError('कृपया केंद्राचे नाव टाका.');
      return;
    }
    if (!regOwnerName.trim()) {
      setRegError('कृपया केंद्र चालकाचे नाव टाका.');
      return;
    }
    if (!regMobile.trim() || regMobile.trim().length < 10) {
      setRegError('कृपया योग्य १० अंकी मोबाईल नंबर टाका.');
      return;
    }

    // Calculate expiry date
    const now = new Date();
    const expiry = new Date();
    if (regPlan === 'monthly') {
      expiry.setDate(now.getDate() + 30);
    } else if (regPlan === 'quarterly') {
      expiry.setDate(now.getDate() + 90);
    } else if (regPlan === 'yearly') {
      expiry.setDate(now.getDate() + 365);
    } else {
      expiry.setFullYear(now.getFullYear() + 25); // Lifetime
    }

    const newId = generateUniqueId();
    const newPass = generatePassword();

    const newCenter: SubscribedCenter = {
      id: newId,
      password: newPass,
      centerName: regCenterName.trim(),
      ownerName: regOwnerName.trim(),
      mobile: regMobile.trim(),
      village: regVillage.trim() || 'पाथवे',
      taluka: regTaluka.trim() || 'बागलाण',
      district: regDistrict.trim() || 'नाशिक',
      plan: regPlan,
      amountPaid: currentPlanAmount,
      utrNumber: regUtr.trim() || 'UPI-ONLINE',
      registeredAt: now.toISOString(),
      expiresAt: expiry.toISOString(),
      status: adminSettings.payment.autoApproveNewRegistrations ? 'active' : 'active',
      lastLoginAt: now.toISOString()
    };

    onAddSubscribedCenter(newCenter);

    setGeneratedCredentials({
      id: newId,
      password: newPass,
      centerName: newCenter.centerName,
      ownerName: newCenter.ownerName,
      mobile: newCenter.mobile,
      plan:
        regPlan === 'monthly'
          ? 'मासिक प्लॅन (३० दिवस)'
          : regPlan === 'quarterly'
          ? 'त्रैमासिक प्लॅन (३ महिने)'
          : regPlan === 'yearly'
          ? 'वार्षिक प्लॅन (१ वर्ष)'
          : 'लाइफटाईम प्लॅन',
      expiresAt: expiry.toLocaleDateString('mr-IN')
    });
  };

  // WhatsApp Message Composer
  const getWhatsAppMessageText = () => {
    if (!generatedCredentials) return '';
    return `*माऊली डिजिटल सेवा केंद्र - अधिकृत पोर्टल प्रवेश माहिती*\n` +
      `----------------------------------------\n` +
      `🏢 *केंद्राचे नाव:* ${generatedCredentials.centerName}\n` +
      `👤 *चालकाचे नाव:* ${generatedCredentials.ownerName}\n` +
      `📱 *नोंदणीकृत मोबाईल:* ${generatedCredentials.mobile}\n` +
      `👑 *सबस्क्रिप्शन प्लॅन:* ${generatedCredentials.plan}\n` +
      `📅 *वैधता:* ${generatedCredentials.expiresAt}\n\n` +
      `🔑 *आपला केंद्र आयडी (ID):* ${generatedCredentials.id}\n` +
      `🔒 *आपला पासवर्ड (Password):* ${generatedCredentials.password}\n\n` +
      `🌐 *पोर्टल लिंक:* https://maulidigitalsevakendrapathavedigar.blogspot.com\n` +
      `----------------------------------------\n` +
      `⚠️ *टीप:* हा मेसेज सुरक्षित ठेवा. कोणाशीही पासवर्ड शेअर करू नका.`;
  };

  const handleSendWhatsApp = () => {
    if (!generatedCredentials) return;
    const cleanMobile = generatedCredentials.mobile.replace(/\D/g, '');
    const fullMobile = cleanMobile.length === 10 ? `91${cleanMobile}` : cleanMobile;
    const url = `https://wa.me/${fullMobile}?text=${encodeURIComponent(getWhatsAppMessageText())}`;
    window.open(url, '_blank');
  };

  // Continue to portal directly after registration
  const handleStartUsingPortal = () => {
    if (!generatedCredentials) return;
    onLoginSuccess({
      id: generatedCredentials.id,
      centerId: generatedCredentials.id,
      name: generatedCredentials.ownerName,
      centerName: generatedCredentials.centerName,
      mobile: generatedCredentials.mobile,
      village: regVillage,
      plan: regPlan,
      isLoggedIn: true,
      isSubscribed: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-3 sm:p-5 no-print animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-700 flex flex-col my-auto max-h-[95vh]">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-5 sm:p-6 shrink-0 border-b border-amber-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg ring-2 ring-amber-400/50 shrink-0">
                <Lock className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-black text-lg sm:text-xl tracking-tight text-white">
                    {adminSettings.branding.portalTitle || 'माऊली डिजिटल सेवा केंद्र'}
                  </h2>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Paid Portal
                  </span>
                </div>
                <p className="text-xs text-amber-200/90 font-medium mt-0.5">
                  अधिकृत प्रवेश गेटवे · सर्व शासकीय फॉर्म्स, वंशावळ व दाखले जनरेटर
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials Generated View (Modal inside modal after registration) */}
        {generatedCredentials ? (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-50 text-slate-900">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                नोंदणी यशस्वी झाली! आपला आयडी व पासवर्ड तयार झाला आहे
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                खालील केंद्र आयडी व पासवर्ड सुरक्षित ठेवा. या माहितीचा टेक्स्ट मेसेज तुमच्या व्हॉट्सॲपवर पाठवण्यासाठी खालील हिरव्या बटनावर क्लिक करा.
              </p>
            </div>

            {/* Credential Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl border-2 border-amber-400/60 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span className="font-black text-amber-300 text-sm">{generatedCredentials.centerName}</span>
                </div>
                <span className="text-[11px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md font-bold">
                  {generatedCredentials.plan}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ID Box */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-700">
                  <div className="text-[11px] text-slate-400 font-bold mb-1 flex items-center justify-between">
                    <span>केंद्र आयडी (User ID):</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(generatedCredentials.id, 'id')}
                      className="text-amber-400 hover:text-amber-300 text-xs font-mono inline-flex items-center gap-1"
                    >
                      {copiedKey === 'id' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'id' ? 'कॉपी!' : 'कॉपी'}</span>
                    </button>
                  </div>
                  <div className="text-xl font-mono font-black text-amber-400 tracking-wider">
                    {generatedCredentials.id}
                  </div>
                </div>

                {/* Password Box */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-700">
                  <div className="text-[11px] text-slate-400 font-bold mb-1 flex items-center justify-between">
                    <span>पासवर्ड (Password):</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(generatedCredentials.password, 'pass')}
                      className="text-amber-400 hover:text-amber-300 text-xs font-mono inline-flex items-center gap-1"
                    >
                      {copiedKey === 'pass' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'pass' ? 'कॉपी!' : 'कॉपी'}</span>
                    </button>
                  </div>
                  <div className="text-xl font-mono font-black text-emerald-400 tracking-wider">
                    {generatedCredentials.password}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>चालक: {generatedCredentials.ownerName} ({generatedCredentials.mobile})</span>
                <span className="text-amber-300 font-medium">वैधता: {generatedCredentials.expiresAt}</span>
              </div>
            </div>

            {/* Actions for credentials */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <Smartphone className="w-5 h-5" />
                <span>📱 WhatsApp वर आयडी & पासवर्ड चा टेक्स्ट मेसेज पाठवा</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopy(getWhatsAppMessageText(), 'all')}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                {copiedKey === 'all' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === 'all' ? 'सर्व माहिती कॉपी झाली!' : 'सर्व माहिती क्लिपबोर्डवर कॉपी करा'}</span>
              </button>

              <button
                type="button"
                onClick={handleStartUsingPortal}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all cursor-pointer hover:scale-101"
              >
                <Unlock className="w-5 h-5 text-slate-950" />
                <span>🚀 आता थेट पोर्टल सुरू करा (Start Portal Now)</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs Selector */}
            <div className="flex border-b border-slate-200 bg-slate-100 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setLoginError('');
                }}
                className={`flex-1 py-3 text-xs sm:text-sm font-black transition-all border-b-2 flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-white text-amber-700 border-amber-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/70'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>१. केंद्र लॉगिन (Member Login)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  setRegError('');
                }}
                className={`flex-1 py-3 text-xs sm:text-sm font-black transition-all border-b-2 flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-white text-amber-700 border-amber-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/70'
                }`}
              >
                <Crown className="w-4 h-4 text-amber-600" />
                <span>२. नवीन केंद्र नोंदणी व सबस्क्रिप्शन</span>
              </button>
            </div>

            {/* TAB 1: LOGIN */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="p-6 sm:p-8 space-y-5 overflow-y-auto">
                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-amber-950 leading-relaxed">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <b>सुरक्षित पोर्टल:</b> हे पोर्टल चालवण्यासाठी आपल्या अधिकृत केंद्राचा युनिक <b>आयडी (ID)</b> आणि <b>पासवर्ड</b> टाकून लॉगिन करा.
                  </div>
                </div>

                {loginError && (
                  <div className="p-3 bg-rose-50 border border-rose-300 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-bold animate-shake">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      केंद्र आयडी किंवा नोंदणीकृत मोबाईल नंबर:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={loginIdOrMobile}
                        onChange={(e) => setLoginIdOrMobile(e.target.value)}
                        placeholder="उदा. MSK-1001 किंवा 9822xxxxxx"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all font-mono"
                        required
                      />
                      <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      पासवर्ड (Password):
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="आपला सुरक्षित पासवर्ड टाका"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all font-mono"
                        required
                      />
                      <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>पोर्टलमध्ये सुरक्षित प्रवेश करा (Login & Unlock)</span>
                </button>

                <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                  <span>नवीन केंद्र आहात? <button type="button" onClick={() => setActiveTab('register')} className="text-amber-700 font-bold underline cursor-pointer">येथे नोंदणी करा</button></span>
                  <a
                    href={`https://wa.me/919822000000?text=${encodeURIComponent('नमस्कार माऊली डिजिटल सेवा केंद्र, मला पोर्टल लॉगिनसाठी पासवर्ड हवा आहे.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-600 hover:text-slate-900 flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>पासवर्ड विसरलात? WhatsApp सपोर्ट</span>
                  </a>
                </div>
              </form>
            )}

            {/* TAB 2: REGISTER & SUBSCRIBE */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="p-6 sm:p-8 space-y-5 overflow-y-auto text-xs sm:text-sm">
                
                {regError && (
                  <div className="p-3 bg-rose-50 border border-rose-300 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-bold animate-shake">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{regError}</span>
                  </div>
                )}

                {/* Center Details */}
                <div className="space-y-3">
                  <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span>१. केंद्राची व चालकाची माहिती</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        केंद्राचे नाव: *
                      </label>
                      <input
                        type="text"
                        value={regCenterName}
                        onChange={(e) => setRegCenterName(e.target.value)}
                        placeholder="उदा. समर्थ डिजिटल सेवा केंद्र"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        केंद्र चालकाचे नाव: *
                      </label>
                      <input
                        type="text"
                        value={regOwnerName}
                        onChange={(e) => setRegOwnerName(e.target.value)}
                        placeholder="उदा. राहुल सुरेश पाटील"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        मोबाईल नंबर (ज्यावर ID/PW मेसेज येईल): *
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={regMobile}
                        onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))}
                        placeholder="१० अंकी मोबाईल नंबर"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        गाव / तालुका / जिल्हा:
                      </label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={regVillage}
                          onChange={(e) => setRegVillage(e.target.value)}
                          placeholder="गाव"
                          className="w-1/3 bg-slate-50 border border-slate-300 rounded-lg px-2 py-2 text-xs font-medium"
                        />
                        <input
                          type="text"
                          value={regTaluka}
                          onChange={(e) => setRegTaluka(e.target.value)}
                          placeholder="तालुका"
                          className="w-1/3 bg-slate-50 border border-slate-300 rounded-lg px-2 py-2 text-xs font-medium"
                        />
                        <input
                          type="text"
                          value={regDistrict}
                          onChange={(e) => setRegDistrict(e.target.value)}
                          placeholder="जिल्हा"
                          className="w-1/3 bg-slate-50 border border-slate-300 rounded-lg px-2 py-2 text-xs font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subscription Plans */}
                <div className="space-y-3">
                  <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                    <Crown className="w-4 h-4 text-amber-600" />
                    <span>२. सबस्क्रिप्शन प्लॅन निवडा</span>
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {/* Monthly */}
                    <div
                      onClick={() => setRegPlan('monthly')}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-center ${
                        regPlan === 'monthly'
                          ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-400/30'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-slate-600">मासिक</div>
                      <div className="text-base font-black text-slate-900 font-mono">₹{planPrices.monthly}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">३० दिवस</div>
                    </div>

                    {/* Quarterly */}
                    <div
                      onClick={() => setRegPlan('quarterly')}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-center ${
                        regPlan === 'quarterly'
                          ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-400/30'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-slate-600">त्रैमासिक</div>
                      <div className="text-base font-black text-slate-900 font-mono">₹{planPrices.quarterly}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">९० दिवस</div>
                    </div>

                    {/* Yearly (Best Value) */}
                    <div
                      onClick={() => setRegPlan('yearly')}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-center relative ${
                        regPlan === 'yearly'
                          ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-400/40 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                        लोकप्रिय
                      </span>
                      <div className="text-[11px] font-black text-amber-900">वार्षिक</div>
                      <div className="text-base font-black text-amber-700 font-mono">₹{planPrices.yearly}</div>
                      <div className="text-[10px] text-slate-600 mt-0.5 font-bold">१ वर्ष (३६५ दिवस)</div>
                    </div>

                    {/* Lifetime */}
                    <div
                      onClick={() => setRegPlan('lifetime')}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-center ${
                        regPlan === 'lifetime'
                          ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-400/30'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-purple-900">लाइफटाईम</div>
                      <div className="text-base font-black text-purple-700 font-mono">₹{planPrices.lifetime}</div>
                      <div className="text-[10px] text-purple-600 mt-0.5">कायमस्वरूपी</div>
                    </div>
                  </div>
                </div>

                {/* UPI Payment Box */}
                <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
                      <QrCode className="w-4 h-4" />
                      <span>३. UPI QR कोड स्कॅन करून भरा: ₹{currentPlanAmount}</span>
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
                      {adminSettings.payment.upiId || 'prashantbhoye098@oksbi'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="p-2 bg-white rounded-xl shadow-md shrink-0">
                      <img
                        src={adminSettings.payment.customQrCodeUrl || qrCodeImageUrl}
                        alt="UPI QR Code"
                        className="w-28 h-28 object-contain"
                      />
                    </div>
                    <div className="space-y-1.5 text-center sm:text-left text-xs">
                      <div className="text-slate-300">
                        PhonePe / Google Pay / Paytm किंवा कोणत्याही UPI ॲपने वरील QR कोड स्कॅन करा.
                      </div>
                      <div className="text-amber-400 font-mono font-bold">
                        पेयी नाव: {adminSettings.payment.payeeName || 'माऊली डिजिटल सेवा केंद्र'}
                      </div>
                      <div className="pt-1.5">
                        <label className="block text-[11px] text-slate-400 mb-1">
                          UPI UTR / ट्रान्झॅक्शन नंबर (१२ अंकी):
                        </label>
                        <input
                          type="text"
                          value={regUtr}
                          onChange={(e) => setRegUtr(e.target.value)}
                          placeholder="उदा. 4123xxxxxxxx"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-sm rounded-xl shadow-lg transition-all cursor-pointer hover:scale-101 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>नोंदणी पूर्ण करा व तत्काळ आयडी-पासवर्ड मिळवा</span>
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  ★ नोंदणी होताच स्क्रीनवर तुमचा युनिक केंद्र आयडी व पासवर्ड दिसेल आणि एका क्लिकवर तुमच्या व्हॉट्सॲपवर पाठवला जाईल.
                </p>
              </form>
            )}
          </>
        )}

      </div>
    </div>
  );
};
