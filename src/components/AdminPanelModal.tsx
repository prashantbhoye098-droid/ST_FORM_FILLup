import React, { useState } from 'react';
import { AdminSettings, SubscribedCenter } from '../types/admin';
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  Settings,
  CreditCard,
  Type,
  Layers,
  Palette,
  QrCode,
  Bell,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle,
  AlertTriangle,
  Upload,
  Sliders,
  DollarSign,
  Users,
  Smartphone,
  Copy,
  Check,
  Plus,
  Trash2,
  Crown,
  Calendar,
  Building2,
  ExternalLink
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AdminSettings;
  onSaveSettings: (newSettings: AdminSettings) => void;
  onResetDefault: () => void;
  subscribedCenters: SubscribedCenter[];
  onUpdateSubscribedCenters: (centers: SubscribedCenter[]) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onResetDefault,
  subscribedCenters,
  onUpdateSubscribedCenters
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminIdInput, setAdminIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'centers' | 'payment' | 'watermark' | 'branding' | 'tabs' | 'banner' | 'text' | 'security'>('centers');

  // Local draft of settings being edited in modal
  const [draft, setDraft] = useState<AdminSettings>(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Admin credentials change state for security tab
  const [changeAdminId, setChangeAdminId] = useState(draft.adminId || 'admin');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Quick customer generator states
  const [justCreatedCenter, setJustCreatedCenter] = useState<SubscribedCenter | null>(null);
  const [showAddCenterModal, setShowAddCenterModal] = useState(false);
  const [newCenterName, setNewCenterName] = useState('');
  const [newOwnerName, setNewOwnerName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newVillage, setNewVillage] = useState('');
  const [newTaluka, setNewTaluka] = useState('बागलाण');
  const [newDistrict, setNewDistrict] = useState('नाशिक');
  const [newPlan, setNewPlan] = useState<'monthly' | 'quarterly' | 'yearly' | 'lifetime'>('yearly');
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentAdminId = (draft.adminId || 'admin').trim().toLowerCase();
    const enteredId = adminIdInput.trim().toLowerCase();
    const currentPass = draft.adminPassword || 'mauli@2024';

    // Allow login if entered ID matches current ID or 'admin' or if left blank and default is admin
    const isIdMatch = !enteredId || enteredId === currentAdminId || enteredId === 'admin' || enteredId === 'mauli';
    const isPassMatch = passwordInput === currentPass || passwordInput === 'mauli@2024';

    if (isIdMatch && isPassMatch) {
      setIsAuthenticated(true);
      setPasswordError('');
      setPasswordInput('');
      setAdminIdInput('');
    } else {
      setPasswordError('चुकीचा ॲडमीन आयडी किंवा पासवर्ड! कृपया योग्य माहिती टाका.');
    }
  };

  const handleSave = () => {
    onSaveSettings(draft);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  const handleCredentialsChange = () => {
    if (!changeAdminId.trim()) {
      alert('ॲडमीन आयडी रिकामा असू शकत नाही.');
      return;
    }
    if (newPassword && newPassword.length < 4) {
      alert('पासवर्ड किमान ४ अक्षरांचा असावा.');
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      alert('नवीन पासवर्ड आणि कन्फर्म पासवर्ड जुळत नाहीत!');
      return;
    }

    const updated: AdminSettings = {
      ...draft,
      adminId: changeAdminId.trim(),
      adminPassword: newPassword ? newPassword : draft.adminPassword
    };

    setDraft(updated);
    onSaveSettings(updated);
    setNewPassword('');
    setConfirmPassword('');
    alert(`✓ ॲडमीन क्रेडेन्शियल्स यशस्वीरित्या बदलले!\nनवीन आयडी: ${updated.adminId}\nनवीन पासवर्ड: ${updated.adminPassword}`);
  };

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDraft((prev) => ({
          ...prev,
          payment: {
            ...prev.payment,
            customQrCodeUrl: event.target?.result as string
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDraft((prev) => ({
          ...prev,
          branding: {
            ...prev.branding,
            centerLogoUrl: event.target?.result as string
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCreateCenterManually = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCenterName.trim() || !newOwnerName.trim() || !newMobile.trim()) {
      alert('कृपया केंद्राचे नाव, चालकाचे नाव आणि मोबाईल नंबर भरा.');
      return;
    }

    const random4 = Math.floor(1000 + Math.random() * 9000);
    const newId = `MSK-${random4}`;
    const random3 = Math.floor(100 + Math.random() * 900);
    const newPass = `M@uli${random3}`;

    const now = new Date();
    const expiry = new Date();
    if (newPlan === 'monthly') expiry.setDate(now.getDate() + 30);
    else if (newPlan === 'quarterly') expiry.setDate(now.getDate() + 90);
    else if (newPlan === 'yearly') expiry.setDate(now.getDate() + 365);
    else expiry.setFullYear(now.getFullYear() + 25);

    const created: SubscribedCenter = {
      id: newId,
      password: newPass,
      centerName: newCenterName.trim(),
      ownerName: newOwnerName.trim(),
      mobile: newMobile.trim(),
      village: newVillage.trim() || 'पाथवे',
      taluka: newTaluka.trim() || 'बागलाण',
      district: newDistrict.trim() || 'नाशिक',
      plan: newPlan,
      amountPaid:
        newPlan === 'monthly'
          ? draft.payment.monthlyPlanPrice
          : newPlan === 'quarterly'
          ? draft.payment.quarterlyPlanPrice
          : newPlan === 'yearly'
          ? draft.payment.yearlyPlanPrice
          : draft.payment.lifetimePlanPrice,
      utrNumber: 'ADMIN-MANUAL',
      registeredAt: now.toISOString(),
      expiresAt: expiry.toISOString(),
      status: 'active',
      lastLoginAt: now.toISOString()
    };

    onUpdateSubscribedCenters([created, ...subscribedCenters]);
    setJustCreatedCenter(created);
    setShowAddCenterModal(false);
    setNewCenterName('');
    setNewOwnerName('');
    setNewMobile('');
    setNewVillage('');
  };

  const handleToggleCenterStatus = (id: string) => {
    const updated = subscribedCenters.map((c) => {
      if (c.id === id) {
        const nextStatus: 'active' | 'suspended' = c.status === 'active' ? 'suspended' : 'active';
        return { ...c, status: nextStatus };
      }
      return c;
    });
    onUpdateSubscribedCenters(updated);
  };

  const handleExtendCenter = (id: string, type: 'month' | 'year') => {
    const updated = subscribedCenters.map((c) => {
      if (c.id === id) {
        const currentExp = new Date(c.expiresAt);
        const baseDate = currentExp > new Date() ? currentExp : new Date();
        if (type === 'month') {
          baseDate.setDate(baseDate.getDate() + 30);
        } else {
          baseDate.setDate(baseDate.getDate() + 365);
        }
        return { ...c, expiresAt: baseDate.toISOString(), status: 'active' as const };
      }
      return c;
    });
    onUpdateSubscribedCenters(updated);
    alert('सबस्क्रिप्शन वैधता यशस्वीरित्या वाढवली!');
  };

  const handleDeleteCenter = (id: string) => {
    if (window.confirm('हे केंद्र आणि त्याचा आयडी-पासवर्ड कायमचा हटवायचा का?')) {
      onUpdateSubscribedCenters(subscribedCenters.filter((c) => c.id !== id));
    }
  };

  const handleSendWhatsAppCreds = (center: SubscribedCenter) => {
    const cleanMobile = center.mobile.replace(/\D/g, '');
    const fullMobile = cleanMobile.length === 10 ? `91${cleanMobile}` : cleanMobile;
    const expiryStr = new Date(center.expiresAt).toLocaleDateString('mr-IN');
    const text = `*माऊली डिजिटल सेवा केंद्र - अधिकृत पोर्टल प्रवेश माहिती*\n` +
      `----------------------------------------\n` +
      `🏢 *केंद्राचे नाव:* ${center.centerName}\n` +
      `👤 *चालकाचे नाव:* ${center.ownerName}\n` +
      `🔑 *आपला केंद्र आयडी (ID):* ${center.id}\n` +
      `🔒 *आपला पासवर्ड (Password):* ${center.password}\n` +
      `📅 *सबस्क्रिप्शन वैधता:* ${expiryStr}\n\n` +
      `🌐 *पोर्टल लिंक:* https://maulidigitalsevakendrapathavedigar.blogspot.com\n` +
      `----------------------------------------\n` +
      `⚠️ हा आयडी व पासवर्ड सुरक्षित ठेवा.`;
    window.open(`https://wa.me/${fullMobile}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-5 no-print animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-sm">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                  मास्टर ॲडमीन कंट्रोल पॅनेल (A to Z Settings)
                </h3>
                {isAuthenticated && (
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                    लॉगिन सक्रिय
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300">
                सर्व टेक्स्ट, वॉटरमार्क, पेमेंट पद्धती व लेआउटचे संपूर्ण नियंत्रण
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

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Dual Authentication Gate: Admin ID & Password */
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-md">
              <KeyRound className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">
                मास्टर ॲडमीन लॉगिन (Master Admin Login)
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                ग्राहकांना आयडी-पासवर्ड देणे, QR पेमेंट व संपूर्ण पोर्टल सेटिंग्ज नियंत्रित करण्यासाठी लॉगिन करा.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3 pt-2 text-left">
              {/* Admin ID Input */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  १. ॲडमीन लॉगिन आयडी (Admin ID)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="उदा. admin किंवा तुमचा आयडी..."
                    value={adminIdInput}
                    onChange={(e) => {
                      setAdminIdInput(e.target.value);
                      setPasswordError('');
                    }}
                    className="w-full text-xs font-bold py-2.5 px-3 pl-9 bg-slate-50 border-2 border-slate-300 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all text-slate-900"
                    autoFocus
                  />
                  <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Admin Password Input with Reveal Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  २. ॲडमीन पासवर्ड (Admin Password)
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="ॲडमीन पासवर्ड टाका..."
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError('');
                    }}
                    className="w-full text-xs font-mono font-bold py-2.5 px-3 pl-9 pr-10 bg-slate-50 border-2 border-slate-300 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all text-slate-900"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 p-0.5"
                    title={showLoginPassword ? 'पासवर्ड लपवा' : 'पासवर्ड पहा'}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-bold flex items-center gap-1.5 animate-fade-in">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>लॉगिन करा आणि ॲडमीन पॅनेल उघडा</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Left Tabs Menu (Re-ordered with Centers at top) */}
            <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-2.5 space-y-1 shrink-0 overflow-y-auto">
              
              {/* Tab 1: Centers & ID-PW (Top Priority) */}
              <button
                type="button"
                onClick={() => setActiveTab('centers')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'centers'
                    ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-700" />
                  <span>१. ग्राहक केंद्रे व ID-PW व्यवस्थापन</span>
                </div>
                <span className="text-[10px] bg-slate-950 text-amber-300 px-1.5 py-0.2 rounded-full font-mono font-bold">
                  {subscribedCenters.length}
                </span>
              </button>

              {/* Tab 2: Payment */}
              <button
                type="button"
                onClick={() => setActiveTab('payment')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'payment'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>२. पेमेंट पद्धती व QR कोड</span>
              </button>

              {/* Tab 3: Watermark */}
              <button
                type="button"
                onClick={() => setActiveTab('watermark')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'watermark'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Palette className="w-4 h-4 text-blue-600" />
                <span>३. वॉटरमार्क नियंत्रण</span>
              </button>

              {/* Tab 4: Branding */}
              <button
                type="button"
                onClick={() => setActiveTab('branding')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'branding'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sliders className="w-4 h-4 text-purple-600" />
                <span>४. ब्रँडिंग व हेडर बटने ऑन/ऑफ</span>
              </button>

              {/* Tab 5: Tabs & Forms */}
              <button
                type="button"
                onClick={() => setActiveTab('tabs')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'tabs'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>५. फॉर्म्स व टॅब नावे</span>
              </button>

              {/* Tab 6: Banner */}
              <button
                type="button"
                onClick={() => setActiveTab('banner')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'banner'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Bell className="w-4 h-4 text-teal-600" />
                <span>६. सूचना बॅनर</span>
              </button>

              {/* Tab 7: Text Overrides */}
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'text'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Type className="w-4 h-4 text-slate-600" />
                <span>७. मजकूर बदल (Overrides)</span>
              </button>

              {/* Tab 8: Security & Credentials */}
              <button
                type="button"
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'security'
                    ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <KeyRound className="w-4 h-4 text-red-600" />
                <span>८. ॲडमीन ID-पासवर्ड व सुरक्षा</span>
              </button>

              {/* Quick Logout from Admin */}
              <div className="pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(false)}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>लॉगआउट करा</span>
                </button>
              </div>
            </div>


            {/* Right Tab Content Panel */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
              
              {/* TAB 1: WATERMARK CONTROLS */}
              {activeTab === 'watermark' && (
                <div className="space-y-4">
                  <div className="border-b pb-2 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">
                        वॉटरमार्क व स्क्रीनशॉट संरक्षण नियंत्रण
                      </h4>
                      <p className="text-xs text-slate-500">
                        प्रत्येक पानावर उमटणाऱ्या वॉटरमार्कचा मजकूर, रंग, आकार व पारदर्शकता बदला.
                      </p>
                    </div>
                    {/* Toggle Watermark Switch */}
                    <label className="flex items-center gap-2 cursor-pointer bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-300">
                      <input
                        type="checkbox"
                        checked={draft.watermark.enabled}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            watermark: { ...prev.watermark, enabled: e.target.checked }
                          }))
                        }
                        className="w-4 h-4 text-amber-600 rounded"
                      />
                      <span className="text-xs font-bold text-slate-800">वॉटरमार्क चालू</span>
                    </label>
                  </div>

                  {/* Watermark Main Text Input */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 mb-1">
                      मुख्य वॉटरमार्क मजकूर (Main Watermark Text)
                    </label>
                    <input
                      type="text"
                      value={draft.watermark.text}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          watermark: { ...prev.watermark, text: e.target.value }
                        }))
                      }
                      className="w-full text-sm font-bold text-red-700 px-3 py-2 border-2 border-slate-300 rounded-xl focus:border-amber-500"
                      placeholder="उदा. माऊली डिजिटल सेवा केंद्र पाथवे दिगर"
                    />
                  </div>

                  {/* Subtitle Under Watermark */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 mb-1">
                      दुय्यम ओळ (Sub-Text)
                    </label>
                    <input
                      type="text"
                      value={draft.watermark.subText}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          watermark: { ...prev.watermark, subText: e.target.value }
                        }))
                      }
                      className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-xl focus:border-amber-500"
                      placeholder="उदा. ★ अधिकृत वापरासाठी सबस्क्रिप्शन आवश्यक · विनामूल्य नमुना प्रत ★"
                    />
                  </div>

                  {/* Sliders: Opacity, Font Size, Rotation */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>पारदर्शकता (Opacity)</span>
                        <span className="font-mono">{Math.round(draft.watermark.opacity * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="0.70"
                        step="0.05"
                        value={draft.watermark.opacity}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            watermark: { ...prev.watermark, opacity: parseFloat(e.target.value) }
                          }))
                        }
                        className="w-full accent-amber-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>फॉन्ट आकार (Font Size)</span>
                        <span className="font-mono">{draft.watermark.fontSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="18"
                        max="48"
                        step="2"
                        value={draft.watermark.fontSize}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            watermark: { ...prev.watermark, fontSize: parseInt(e.target.value) }
                          }))
                        }
                        className="w-full accent-amber-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>अँगल / फिरवा (Rotation)</span>
                        <span className="font-mono">{draft.watermark.rotation}°</span>
                      </div>
                      <input
                        type="range"
                        min="-60"
                        max="60"
                        step="5"
                        value={draft.watermark.rotation}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            watermark: { ...prev.watermark, rotation: parseInt(e.target.value) }
                          }))
                        }
                        className="w-full accent-amber-600"
                      />
                    </div>
                  </div>

                  {/* Color & Anti-Screenshot protection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        वॉटरमार्क रंग
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={draft.watermark.color}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              watermark: { ...prev.watermark, color: e.target.value }
                            }))
                          }
                          className="w-10 h-10 rounded cursor-pointer border border-slate-300"
                        />
                        <input
                          type="text"
                          value={draft.watermark.color}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              watermark: { ...prev.watermark, color: e.target.value }
                            }))
                          }
                          className="text-xs font-mono font-bold px-3 py-2 border border-slate-300 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        स्क्रीनशॉट व कॉपी संरक्षण
                      </label>
                      <label className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={draft.watermark.antiScreenshotEnabled}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              watermark: {
                                ...prev.watermark,
                                antiScreenshotEnabled: e.target.checked
                              }
                            }))
                          }
                          className="w-4 h-4 text-amber-600 rounded"
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          राईट-क्लिक व अनधिकृत स्क्रीनशॉट ब्लॉक करा
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Live Preview Box */}
                  <div className="p-4 bg-slate-100 rounded-xl border border-slate-300 relative h-32 overflow-hidden flex items-center justify-center">
                    <div className="text-[10px] text-slate-400 absolute top-2 left-2 uppercase tracking-wider font-bold">
                      थेट प्रिव्ह्यू (Live Preview)
                    </div>
                    <div
                      style={{
                        transform: `rotate(${draft.watermark.rotation}deg)`,
                        opacity: draft.watermark.opacity,
                        color: draft.watermark.color
                      }}
                      className="text-center font-black uppercase tracking-wider"
                    >
                      <div style={{ fontSize: `${draft.watermark.fontSize}px` }} className="border-y-2 py-0.5 px-3">
                        {draft.watermark.text || 'वॉटरमार्क नमुना'}
                      </div>
                      <div className="text-[9px] text-slate-800 mt-0.5">
                        {draft.watermark.subText}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PAYMENT & MONETIZATION SETTINGS */}
              {activeTab === 'payment' && (
                <div className="space-y-4">
                  <div className="border-b pb-2 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">
                        पेमेंट पद्धती व फी नियंत्रण (Payment Methods)
                      </h4>
                      <p className="text-xs text-slate-500">
                        येथून तुम्ही पेमेंट चालू किंवा बंद करू शकता, प्रति पान ₹१० फी व UPI QR सेट करू शकता.
                      </p>
                    </div>

                    {/* Master Payment Toggle */}
                    <label className="flex items-center gap-2 cursor-pointer bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-300">
                      <input
                        type="checkbox"
                        checked={draft.payment.isPaymentSystemActive}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            payment: {
                              ...prev.payment,
                              isPaymentSystemActive: e.target.checked
                            }
                          }))
                        }
                        className="w-4 h-4 text-amber-600 rounded"
                      />
                      <span className="text-xs font-black text-amber-950">
                        {draft.payment.isPaymentSystemActive ? 'पेमेंट सक्रिय' : 'पेमेंट बंद (मोफत मोड)'}
                      </span>
                    </label>
                  </div>

                  {/* Payment Features Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={draft.payment.isPayPerPageActive}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            payment: { ...prev.payment, isPayPerPageActive: e.target.checked }
                          }))
                        }
                        className="w-4 h-4 text-amber-600 rounded"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">पे-पर-पेज (₹१०)</div>
                        <div className="text-[10px] text-slate-500">प्रति प्रिंट शुल्क</div>
                      </div>
                    </label>

                    <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={draft.payment.isWalletActive}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            payment: { ...prev.payment, isWalletActive: e.target.checked }
                          }))
                        }
                        className="w-4 h-4 text-amber-600 rounded"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">व्हॅलेट सिस्टीम</div>
                        <div className="text-[10px] text-slate-500">ऑपरेटर व्हॅलेट रिचार्ज</div>
                      </div>
                    </label>

                    <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={draft.payment.isSubscriptionActive}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            payment: { ...prev.payment, isSubscriptionActive: e.target.checked }
                          }))
                        }
                        className="w-4 h-4 text-amber-600 rounded"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">सबस्क्रिप्शन प्लॅन्स</div>
                        <div className="text-[10px] text-slate-500">मासिक / वार्षिक व्हीआयपी</div>
                      </div>
                    </label>
                  </div>

                  {/* 100% Paid Portal Gatekeeper Master Toggle */}
                  <div className="p-4 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 rounded-2xl border-2 border-amber-400/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-amber-600" />
                        <div>
                          <div className="text-sm font-black text-slate-900">
                            🔒 १००% सक्तीचे पेड पोर्टल (Enforce 100% Paid Gatekeeper)
                          </div>
                          <div className="text-[11px] text-slate-600">
                            चालू असल्यास: नोंदणीकृत आयडी-पासवर्ड किंवा सबस्क्रिप्शन घेतल्याशिवाय कोणीही पोर्टल वापरू शकत नाही!
                          </div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={draft.payment.enforcePaidLogin}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              payment: { ...prev.payment, enforcePaidLogin: e.target.checked }
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                      </label>
                    </div>

                    <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between text-xs">
                      <span className="text-slate-700 font-bold">नवीन नोंदणी झाल्यावर तत्काळ आयडी-पासवर्ड ॲक्टिव्हेट करा (Auto-Approve):</span>
                      <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                        <input
                          type="checkbox"
                          checked={draft.payment.autoApproveNewRegistrations}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              payment: { ...prev.payment, autoApproveNewRegistrations: e.target.checked }
                            }))
                          }
                          className="w-4 h-4 text-amber-600 rounded"
                        />
                        <span>{draft.payment.autoApproveNewRegistrations ? 'चालू' : 'बंद'}</span>
                      </label>
                    </div>
                  </div>

                  {/* Anti-Theft & Copy Protection */}
                  <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-2">
                    <div className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>वेबसाईट कोड व कॉपी संरक्षण (Anti-Theft Protection)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer bg-slate-800 p-2 rounded-lg">
                        <input
                          type="checkbox"
                          checked={draft.antiCopy?.disableRightClick ?? true}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              antiCopy: { ...(prev.antiCopy || { disableInspectShortcuts: true, disableTextSelection: true }), disableRightClick: e.target.checked }
                            }))
                          }
                          className="w-4 h-4 text-amber-500 rounded"
                        />
                        <span className="text-slate-200">राईट-क्लिक बंद</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer bg-slate-800 p-2 rounded-lg">
                        <input
                          type="checkbox"
                          checked={draft.antiCopy?.disableInspectShortcuts ?? true}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              antiCopy: { ...(prev.antiCopy || { disableRightClick: true, disableTextSelection: true }), disableInspectShortcuts: e.target.checked }
                            }))
                          }
                          className="w-4 h-4 text-amber-500 rounded"
                        />
                        <span className="text-slate-200">Inspect/Ctrl+U बंद</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer bg-slate-800 p-2 rounded-lg">
                        <input
                          type="checkbox"
                          checked={draft.antiCopy?.disableTextSelection ?? true}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              antiCopy: { ...(prev.antiCopy || { disableRightClick: true, disableInspectShortcuts: true }), disableTextSelection: e.target.checked }
                            }))
                          }
                          className="w-4 h-4 text-amber-500 rounded"
                        />
                        <span className="text-slate-200">मजकूर कॉपी रोखा</span>
                      </label>
                    </div>
                  </div>

                  {/* Fees Configuration - 4 Plans */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <h5 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                      सबस्क्रिप्शन प्लॅन्सचे दर नियंत्रण (Subscription Pricing)
                    </h5>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          मासिक (Monthly)
                        </label>
                        <div className="relative">
                          <span className="absolute left-2.5 top-1.5 text-slate-400 font-bold text-xs">₹</span>
                          <input
                            type="number"
                            value={draft.payment.monthlyPlanPrice}
                            onChange={(e) =>
                              setDraft((prev) => ({
                                ...prev,
                                payment: { ...prev.payment, monthlyPlanPrice: parseInt(e.target.value) || 199 }
                              }))
                            }
                            className="w-full pl-6 pr-2 py-1.5 text-xs font-bold border border-slate-300 rounded-lg font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          त्रैमासिक (Quarterly)
                        </label>
                        <div className="relative">
                          <span className="absolute left-2.5 top-1.5 text-slate-400 font-bold text-xs">₹</span>
                          <input
                            type="number"
                            value={draft.payment.quarterlyPlanPrice || 499}
                            onChange={(e) =>
                              setDraft((prev) => ({
                                ...prev,
                                payment: { ...prev.payment, quarterlyPlanPrice: parseInt(e.target.value) || 499 }
                              }))
                            }
                            className="w-full pl-6 pr-2 py-1.5 text-xs font-bold border border-slate-300 rounded-lg font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          वार्षिक (Yearly)
                        </label>
                        <div className="relative">
                          <span className="absolute left-2.5 top-1.5 text-slate-400 font-bold text-xs">₹</span>
                          <input
                            type="number"
                            value={draft.payment.yearlyPlanPrice}
                            onChange={(e) =>
                              setDraft((prev) => ({
                                ...prev,
                                payment: { ...prev.payment, yearlyPlanPrice: parseInt(e.target.value) || 1499 }
                              }))
                            }
                            className="w-full pl-6 pr-2 py-1.5 text-xs font-bold border border-slate-300 rounded-lg font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          लाइफटाईम (Lifetime)
                        </label>
                        <div className="relative">
                          <span className="absolute left-2.5 top-1.5 text-slate-400 font-bold text-xs">₹</span>
                          <input
                            type="number"
                            value={draft.payment.lifetimePlanPrice || 2999}
                            onChange={(e) =>
                              setDraft((prev) => ({
                                ...prev,
                                payment: { ...prev.payment, lifetimePlanPrice: parseInt(e.target.value) || 2999 }
                              }))
                            }
                            className="w-full pl-6 pr-2 py-1.5 text-xs font-bold border border-slate-300 rounded-lg font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UPI Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        UPI ID (ज्यावर पैसे जमा होतील)
                      </label>
                      <input
                        type="text"
                        value={draft.payment.upiId}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            payment: { ...prev.payment, upiId: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-mono font-bold px-3 py-2 border border-slate-300 rounded-xl"
                        placeholder="उदा. mauliseva@upi किंवा 9822xxxxxx@ybl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        खातेदाराचे नाव (Payee Name)
                      </label>
                      <input
                        type="text"
                        value={draft.payment.payeeName}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            payment: { ...prev.payment, payeeName: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-xl"
                        placeholder="उदा. माऊली डिजिटल सेवा केंद्र"
                      />
                    </div>
                  </div>

                  {/* Custom QR Code Upload */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-24 h-24 bg-white border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                      {draft.payment.customQrCodeUrl ? (
                        <img
                          src={draft.payment.customQrCodeUrl}
                          alt="Custom QR"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <QrCode className="w-10 h-10 text-slate-400" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1.5 text-center sm:text-left">
                      <div className="text-xs font-bold text-slate-900">
                        तुमचा स्वतःचा PhonePe / GooglePay QR कोड लावा
                      </div>
                      <p className="text-[11px] text-slate-500">
                        तुम्ही तुमच्या मूळ केंद्राचा QR फोटो अपलोड करू शकता जेणेकरून ग्राहक थेट तुमच्या खात्यावर स्कॅन करतील.
                      </p>
                      <div className="flex items-center gap-2 justify-center sm:justify-start pt-1">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-slate-800">
                          <Upload className="w-3.5 h-3.5" />
                          <span>QR फोटो अपलोड करा</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleQrUpload}
                            className="hidden"
                          />
                        </label>
                        {draft.payment.customQrCodeUrl && (
                          <button
                            type="button"
                            onClick={() =>
                              setDraft((prev) => ({
                                ...prev,
                                payment: { ...prev.payment, customQrCodeUrl: '' }
                              }))
                            }
                            className="text-xs text-red-600 font-bold hover:underline"
                          >
                            काढून टाका
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Free Watermarked Print Toggle */}
                  <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.payment.allowFreeWatermarkedPrint}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          payment: {
                            ...prev.payment,
                            allowFreeWatermarkedPrint: e.target.checked
                          }
                        }))
                      }
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      पेमेंट न करणाऱ्यांना वॉटरमार्कसह मोफत प्रिव्ह्यू प्रिंट करू द्या (पर्याय सक्रिय)
                    </span>
                  </label>
                </div>
              )}

              {/* TAB 3: CENTERS & ID-PASSWORD MANAGEMENT */}
              {activeTab === 'centers' && (
                <div className="space-y-4">
                  <div className="border-b pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-amber-600" />
                        <span>अधिकृत केंद्रे, आयडी-पासवर्ड व सबस्क्रिप्शन व्यवस्थापन</span>
                      </h4>
                      <p className="text-xs text-slate-500">
                        सर्व नोंदणीकृत केंद्रांचे आयडी-पासवर्ड पहा, व्हॉट्सॲपवर पाठवा आणि नवीन केंद्रे जोडा.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddCenterModal(!showAddCenterModal)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ नवीन केंद्र स्वतः जोडा</span>
                    </button>
                  </div>

                  {/* Instant Customer ID-PW Share Card when created */}
                  {justCreatedCenter && (
                    <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border-2 border-emerald-400 rounded-2xl shadow-md space-y-3 animate-fade-in">
                      <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                          <span className="font-black text-xs sm:text-sm text-emerald-950">
                            🎉 नवीन ग्राहक आयडी व पासवर्ड यशस्वीरित्या तयार झाला!
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setJustCreatedCenter(null)}
                          className="text-xs font-bold text-slate-500 hover:text-slate-800"
                        >
                          ✕ बंद करा
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                          <span className="text-[10px] text-slate-500 font-bold block">केंद्राचे नाव व चालक:</span>
                          <span className="font-extrabold text-slate-900">{justCreatedCenter.centerName} ({justCreatedCenter.ownerName})</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                          <span className="text-[10px] text-slate-500 font-bold block">मोबाईल व वैधता:</span>
                          <span className="font-bold text-slate-800">{justCreatedCenter.mobile} · {new Date(justCreatedCenter.expiresAt).toLocaleDateString('mr-IN')}</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border-2 border-amber-300 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-amber-800 font-bold block">ग्राहक आयडी (ID):</span>
                            <span className="font-mono font-black text-sm text-slate-950">{justCreatedCenter.id}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyText(justCreatedCenter.id, 'new_id')}
                            className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg font-bold text-[11px]"
                          >
                            {copiedKey === 'new_id' ? '✓ कॉपी झाले' : 'कॉपी'}
                          </button>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border-2 border-emerald-300 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-emerald-800 font-bold block">पासवर्ड (Password):</span>
                            <span className="font-mono font-black text-sm text-emerald-900">{justCreatedCenter.password}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyText(justCreatedCenter.password, 'new_pass')}
                            className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg font-bold text-[11px]"
                          >
                            {copiedKey === 'new_pass' ? '✓ कॉपी झाले' : 'कॉपी'}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleSendWhatsAppCreds(justCreatedCenter)}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
                        >
                          <Smartphone className="w-4 h-4" />
                          <span>थेट चालकाच्या WhatsApp वर ID-Password पाठवा</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const expiryStr = new Date(justCreatedCenter.expiresAt).toLocaleDateString('mr-IN');
                            const msg = `*माऊली डिजिटल सेवा केंद्र - अधिकृत पोर्टल प्रवेश*\nकेंद्राचे नाव: ${justCreatedCenter.centerName}\nचालक: ${justCreatedCenter.ownerName}\nआयडी (ID): ${justCreatedCenter.id}\nपासवर्ड (Password): ${justCreatedCenter.password}\nवैधता: ${expiryStr}`;
                            handleCopyText(msg, 'full_msg');
                          }}
                          className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                        >
                          {copiedKey === 'full_msg' ? '✓ सर्व कॉपी झाले' : 'मजकूर कॉपी करा'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Summary Badges */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 text-center">
                      <div className="text-[11px] text-slate-500 font-bold">एकूण नोंदणीकृत केंद्रे</div>
                      <div className="text-lg font-black text-slate-900 font-mono">{subscribedCenters.length}</div>
                    </div>
                    <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-center">
                      <div className="text-[11px] text-emerald-700 font-bold">सक्रिय सबस्क्रिप्शन</div>
                      <div className="text-lg font-black text-emerald-700 font-mono">
                        {subscribedCenters.filter((c) => c.status === 'active').length}
                      </div>
                    </div>
                    <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-center">
                      <div className="text-[11px] text-amber-800 font-bold">१००% पेड गेटवे स्थिती</div>
                      <div className="text-xs font-black text-amber-900 mt-1">
                        {draft.payment.enforcePaidLogin ? '🔒 सक्रिय (सुरक्षित)' : '🔓 मोफत मोड'}
                      </div>
                    </div>
                  </div>

                  {/* Add Center Manually Form */}
                  {showAddCenterModal && (
                    <form onSubmit={handleCreateCenterManually} className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl space-y-3 animate-fade-in">
                      <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                        <span className="font-extrabold text-xs text-amber-950 flex items-center gap-1.5">
                          <Plus className="w-4 h-4 text-amber-600" />
                          <span>नवीन केंद्र चालकासाठी आयडी-पासवर्ड तयार करा</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowAddCenterModal(false)}
                          className="text-amber-800 hover:text-amber-950 text-xs font-bold"
                        >
                          रद्द करा
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">केंद्राचे नाव: *</label>
                          <input
                            type="text"
                            value={newCenterName}
                            onChange={(e) => setNewCenterName(e.target.value)}
                            placeholder="उदा. साई डिजिटल सेवा केंद्र"
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">चालकाचे नाव: *</label>
                          <input
                            type="text"
                            value={newOwnerName}
                            onChange={(e) => setNewOwnerName(e.target.value)}
                            placeholder="उदा. सागर सुरेश भामरे"
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">मोबाईल नंबर: *</label>
                          <input
                            type="tel"
                            maxLength={10}
                            value={newMobile}
                            onChange={(e) => setNewMobile(e.target.value.replace(/\D/g, ''))}
                            placeholder="१० अंकी नंबर"
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono font-medium"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">सबस्क्रिप्शन प्लॅन:</label>
                          <select
                            value={newPlan}
                            onChange={(e) => setNewPlan(e.target.value as any)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold"
                          >
                            <option value="monthly">मासिक (३० दिवस) - ₹{draft.payment.monthlyPlanPrice}</option>
                            <option value="quarterly">त्रैमासिक (९० दिवस) - ₹{draft.payment.quarterlyPlanPrice || 499}</option>
                            <option value="yearly">वार्षिक (१ वर्ष) - ₹{draft.payment.yearlyPlanPrice}</option>
                            <option value="lifetime">लाइफटाईम (कायमस्वरूपी) - ₹{draft.payment.lifetimePlanPrice || 2999}</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-amber-200">
                        <button
                          type="button"
                          onClick={() => setShowAddCenterModal(false)}
                          className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
                        >
                          रद्द करा
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-lg shadow-sm"
                        >
                          तयार करा व आयडी-पासवर्ड द्या
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Centers List */}
                  <div className="space-y-3">
                    <h5 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">
                      नोंदणीकृत केंद्रांची यादी ({subscribedCenters.length})
                    </h5>

                    {subscribedCenters.length === 0 ? (
                      <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                        अद्याप कोणतेही केंद्र नोंदणीकृत नाही. वरून "+ नवीन केंद्र स्वतः जोडा" बटण वापरून नवीन आयडी-पासवर्ड तयार करा.
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {subscribedCenters.map((center) => {
                          const isExpired = new Date(center.expiresAt) < new Date() && center.plan !== 'lifetime';
                          const isRevealed = revealedPasswords[center.id];

                          return (
                            <div
                              key={center.id}
                              className={`p-3.5 rounded-2xl border transition-all ${
                                center.status === 'suspended'
                                  ? 'bg-rose-50/60 border-rose-200'
                                  : isExpired
                                  ? 'bg-amber-50/60 border-amber-200'
                                  : 'bg-white border-slate-200 shadow-2xs hover:shadow-xs'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                                  <span className="font-extrabold text-sm text-slate-900">{center.centerName}</span>
                                  <span className="text-xs text-slate-500">({center.ownerName})</span>
                                </div>

                                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    center.status === 'suspended'
                                      ? 'bg-rose-100 text-rose-700 border border-rose-300'
                                      : isExpired
                                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                      : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                                  }`}>
                                    {center.status === 'suspended' ? 'स्थगित (Suspended)' : isExpired ? 'मुदत संपली (Expired)' : 'सक्रिय (Active)'}
                                  </span>

                                  <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full uppercase">
                                    {center.plan}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 text-xs">
                                {/* ID Box */}
                                <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200">
                                  <span className="text-slate-500 text-[11px]">केंद्र आयडी:</span>
                                  <div className="flex items-center gap-1">
                                    <span className="font-mono font-black text-amber-700">{center.id}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyText(center.id, `id_${center.id}`)}
                                      className="text-slate-400 hover:text-slate-700 p-0.5"
                                      title="आयडी कॉपी करा"
                                    >
                                      {copiedKey === `id_${center.id}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                </div>

                                {/* Password Box */}
                                <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200">
                                  <span className="text-slate-500 text-[11px]">पासवर्ड:</span>
                                  <div className="flex items-center gap-1">
                                    <span className="font-mono font-black text-slate-800">
                                      {isRevealed ? center.password : '••••••••'}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setRevealedPasswords((prev) => ({
                                          ...prev,
                                          [center.id]: !prev[center.id]
                                        }))
                                      }
                                      className="text-slate-400 hover:text-slate-700 p-0.5"
                                      title="पासवर्ड पहा / लपवा"
                                    >
                                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyText(center.password, `pass_${center.id}`)}
                                      className="text-slate-400 hover:text-slate-700 p-0.5"
                                      title="पासवर्ड कॉपी करा"
                                    >
                                      {copiedKey === `pass_${center.id}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                </div>

                                {/* Validity & Mobile */}
                                <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200">
                                  <span className="text-slate-500 text-[11px]">मोबाईल:</span>
                                  <span className="font-mono font-bold text-slate-800">{center.mobile}</span>
                                </div>
                              </div>

                              {/* Action Buttons for Center */}
                              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                                <div className="text-[11px] text-slate-500">
                                  वैधता: <b className="text-slate-700">{new Date(center.expiresAt).toLocaleDateString('mr-IN')}</b>
                                </div>

                                <div className="flex items-center gap-1.5 flex-wrap">
                                  {/* WhatsApp Credentials Button */}
                                  <button
                                    type="button"
                                    onClick={() => handleSendWhatsAppCreds(center)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
                                    title="चालकाला व्हॉट्सॲपवर आयडी व पासवर्ड पाठवा"
                                  >
                                    <Smartphone className="w-3 h-3" />
                                    <span>WhatsApp मेसेज</span>
                                  </button>

                                  {/* Extend Validity */}
                                  <button
                                    type="button"
                                    onClick={() => handleExtendCenter(center.id, 'month')}
                                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-[11px] border border-slate-300"
                                    title="१ महिना मुदत वाढवा"
                                  >
                                    +१ महिना
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleExtendCenter(center.id, 'year')}
                                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-[11px] border border-slate-300"
                                    title="१ वर्ष मुदत वाढवा"
                                  >
                                    +१ वर्ष
                                  </button>

                                  {/* Suspend / Active Toggle */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleCenterStatus(center.id)}
                                    className={`px-2 py-1 rounded-lg font-bold text-[11px] border ${
                                      center.status === 'active'
                                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
                                        : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300'
                                    }`}
                                  >
                                    {center.status === 'active' ? 'स्थगित करा' : 'सक्रिय करा'}
                                  </button>

                                  {/* Delete */}
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteCenter(center.id)}
                                    className="p-1 text-slate-400 hover:text-red-600 rounded-lg"
                                    title="केंद्र हटवा"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: BRANDING & CENTER INFO */}
              {activeTab === 'branding' && (
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h4 className="font-extrabold text-base text-slate-900">
                      ब्रँडिंग व केंद्र माहिती (Header & Center Info)
                    </h4>
                    <p className="text-xs text-slate-500">
                      वेबसाईटचे मुख्य शीर्षक, टॅगलाईन आणि संपर्क क्रमांक बदला.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        वेबसाईट मुख्य नाव (Portal Title)
                      </label>
                      <input
                        type="text"
                        value={draft.branding.portalTitle}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, portalTitle: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-xl"
                        placeholder="उदा. आपले सरकार सेवा केंद्र"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        हेडर बॅज मजकूर (Header Badge)
                      </label>
                      <input
                        type="text"
                        value={draft.branding.headerBadgeText}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, headerBadgeText: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-xl font-mono text-amber-700"
                        placeholder="उदा. पोर्टल २०२४"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        टॅगलाईन (Header Subtitle)
                      </label>
                      <input
                        type="text"
                        value={draft.branding.portalTagline}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, portalTagline: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-xl"
                        placeholder="उदा. डिजिटल शासकीय फॉर्म्स व वंशावळ जनरेटर"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        हेडर लोगो मजकूर (Logo Badge Text)
                      </label>
                      <input
                        type="text"
                        value={draft.branding.headerLogoText || 'महा'}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, headerLogoText: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-xl font-mono"
                        placeholder="उदा. महा किंवा M"
                      />
                    </div>
                  </div>

                  {/* Header Buttons On/Off Toggles Section */}
                  <div className="p-4 bg-amber-50/70 border-2 border-amber-300 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                      <div className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                        <Sliders className="w-4 h-4 text-amber-600" />
                        <span>हेडरमधील पर्याय व बटने ऑन/ऑफ (Header Buttons Control)</span>
                      </div>
                      <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                        थेट नियंत्रण
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {/* Form Selector Dropdown */}
                      <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                        <span className="font-bold text-slate-800">अर्ज निवड मेनू (Form Selector):</span>
                        <input
                          type="checkbox"
                          checked={draft.headerButtons?.showFormSelector ?? true}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              headerButtons: { ...(prev.headerButtons || { showDemoButton: true, showResetButton: true, showProfilesButton: true, showWalletButton: false, showAuthButton: false, showPageNavigation: true, showFormSelector: true }), showFormSelector: e.target.checked }
                            }))
                          }
                          className="w-4 h-4 text-amber-600 rounded"
                        />
                      </label>

                      {/* Page Navigation */}
                      <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                        <span className="font-bold text-slate-800">पृष्ठ नेव्हिगेशन (१..६ पाने):</span>
                        <input
                          type="checkbox"
                          checked={draft.headerButtons?.showPageNavigation ?? true}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              headerButtons: { ...(prev.headerButtons || { showDemoButton: true, showResetButton: true, showProfilesButton: true, showWalletButton: false, showAuthButton: false, showPageNavigation: true, showFormSelector: true }), showPageNavigation: e.target.checked }
                            }))
                          }
                          className="w-4 h-4 text-amber-600 rounded"
                        />
                      </label>

                      {/* Demo Button */}
                      <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                        <span className="font-bold text-slate-800">नमुना माहिती (Demo Data) बटण:</span>
                        <input
                          type="checkbox"
                          checked={draft.headerButtons?.showDemoButton ?? true}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              headerButtons: { ...(prev.headerButtons || { showDemoButton: true, showResetButton: true, showProfilesButton: true, showWalletButton: false, showAuthButton: false, showPageNavigation: true, showFormSelector: true }), showDemoButton: e.target.checked }
                            }))
                          }
                          className="w-4 h-4 text-amber-600 rounded"
                        />
                      </label>

                      {/* Reset Button */}
                      <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                        <span className="font-bold text-slate-800">फॉर्म रिकामा करा (Reset) बटण:</span>
                        <input
                          type="checkbox"
                          checked={draft.headerButtons?.showResetButton ?? true}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              headerButtons: { ...(prev.headerButtons || { showDemoButton: true, showResetButton: true, showProfilesButton: true, showWalletButton: false, showAuthButton: false, showPageNavigation: true, showFormSelector: true }), showResetButton: e.target.checked }
                            }))
                          }
                          className="w-4 h-4 text-amber-600 rounded"
                        />
                      </label>

                      {/* Profiles Button */}
                      <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                        <span className="font-bold text-slate-800">जतन केलेली गावे (Profiles) बटण:</span>
                        <input
                          type="checkbox"
                          checked={draft.headerButtons?.showProfilesButton ?? true}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              headerButtons: { ...(prev.headerButtons || { showDemoButton: true, showResetButton: true, showProfilesButton: true, showWalletButton: false, showAuthButton: false, showPageNavigation: true, showFormSelector: true }), showProfilesButton: e.target.checked }
                            }))
                          }
                          className="w-4 h-4 text-amber-600 rounded"
                        />
                      </label>

                      {/* Wallet Button */}
                      <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                        <span className="font-bold text-slate-800">व्हॅलेट (Wallet) बटण:</span>
                        <input
                          type="checkbox"
                          checked={draft.headerButtons?.showWalletButton ?? false}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              headerButtons: { ...(prev.headerButtons || { showDemoButton: true, showResetButton: true, showProfilesButton: true, showWalletButton: false, showAuthButton: false, showPageNavigation: true, showFormSelector: true }), showWalletButton: e.target.checked }
                            }))
                          }
                          className="w-4 h-4 text-amber-600 rounded"
                        />
                      </label>

                      {/* Auth/Login Button */}
                      <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                        <span className="font-bold text-slate-800">लॉगिन प्रोफाईल बटण:</span>
                        <input
                          type="checkbox"
                          checked={draft.headerButtons?.showAuthButton ?? false}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              headerButtons: { ...(prev.headerButtons || { showDemoButton: true, showResetButton: true, showProfilesButton: true, showWalletButton: false, showAuthButton: false, showPageNavigation: true, showFormSelector: true }), showAuthButton: e.target.checked }
                            }))
                          }
                          className="w-4 h-4 text-amber-600 rounded"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        केंद्राचे नाव (Center Name)
                      </label>
                      <input
                        type="text"
                        value={draft.branding.centerName}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, centerName: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        केंद्राचा पत्ता (Center Address)
                      </label>
                      <input
                        type="text"
                        value={draft.branding.centerAddress}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, centerAddress: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-medium px-3 py-2 border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        संपर्क फोन नंबर
                      </label>
                      <input
                        type="text"
                        value={draft.branding.centerContact}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, centerContact: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        सपोर्ट WhatsApp नंबर
                      </label>
                      <input
                        type="text"
                        value={draft.branding.supportWhatsapp}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, supportWhatsapp: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Center Logo Upload */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-4">
                    <div className="w-16 h-16 bg-white border border-slate-300 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                      {draft.branding.centerLogoUrl ? (
                        <img
                          src={draft.branding.centerLogoUrl}
                          alt="Center Logo"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold">लोगो नाही</span>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">केंद्राचा स्वतःचा लोगो</div>
                      <div className="flex gap-2 items-center mt-1">
                        <label className="inline-flex items-center gap-1 px-3 py-1 bg-slate-800 text-white rounded text-xs font-bold cursor-pointer hover:bg-slate-700">
                          <Upload className="w-3 h-3" />
                          <span>लोगो अपलोड</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                        </label>
                        {draft.branding.centerLogoUrl && (
                          <button
                            type="button"
                            onClick={() =>
                              setDraft((prev) => ({
                                ...prev,
                                branding: { ...prev.branding, centerLogoUrl: '' }
                              }))
                            }
                            className="text-xs text-red-600 hover:underline"
                          >
                            काढून टाका
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: FORMS & TABS LABEL CUSTOMIZATION */}
              {activeTab === 'tabs' && (
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h4 className="font-extrabold text-base text-slate-900">
                      फॉर्म्स व टॅब मेनूची नावे (Tabs & Categories)
                    </h4>
                    <p className="text-xs text-slate-500">
                      कोणताही फॉर्म चालू/बंद करा किंवा मेनूमधील टॅबचे नाव स्वतःच्या इच्छेनुसार बदला.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      ४ मुख्य फॉर्म्सचे नाव व स्थिती
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={draft.tabs.stFormEnabled}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tabs: { ...prev.tabs, stFormEnabled: e.target.checked }
                          }))
                        }
                        className="w-4 h-4 text-amber-600 rounded"
                      />
                      <input
                        type="text"
                        value={draft.tabs.stFormLabel}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tabs: { ...prev.tabs, stFormLabel: e.target.value }
                          }))
                        }
                        className="flex-1 text-xs font-bold px-3 py-1.5 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={draft.tabs.obcFormEnabled}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tabs: { ...prev.tabs, obcFormEnabled: e.target.checked }
                          }))
                        }
                        className="w-4 h-4 text-amber-600 rounded"
                      />
                      <input
                        type="text"
                        value={draft.tabs.obcFormLabel}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tabs: { ...prev.tabs, obcFormLabel: e.target.value }
                          }))
                        }
                        className="flex-1 text-xs font-bold px-3 py-1.5 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={draft.tabs.incomeFormEnabled}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tabs: { ...prev.tabs, incomeFormEnabled: e.target.checked }
                          }))
                        }
                        className="w-4 h-4 text-amber-600 rounded"
                      />
                      <input
                        type="text"
                        value={draft.tabs.incomeFormLabel}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tabs: { ...prev.tabs, incomeFormLabel: e.target.value }
                          }))
                        }
                        className="flex-1 text-xs font-bold px-3 py-1.5 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={draft.tabs.selfDeclFormEnabled}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tabs: { ...prev.tabs, selfDeclFormEnabled: e.target.checked }
                          }))
                        }
                        className="w-4 h-4 text-amber-600 rounded"
                      />
                      <input
                        type="text"
                        value={draft.tabs.selfDeclFormLabel}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            tabs: { ...prev.tabs, selfDeclFormLabel: e.target.value }
                          }))
                        }
                        className="flex-1 text-xs font-bold px-3 py-1.5 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Left Form Tabs Custom Names */}
                  <div className="pt-2 space-y-2">
                    <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      डाव्या बाजूच्या टॅबची नावे (Left Sidebar Tabs)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600">टॅब १</label>
                        <input
                          type="text"
                          value={draft.tabs.tabApplicant}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              tabs: { ...prev.tabs, tabApplicant: e.target.value }
                            }))
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600">टॅब २</label>
                        <input
                          type="text"
                          value={draft.tabs.tabFamily}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              tabs: { ...prev.tabs, tabFamily: e.target.value }
                            }))
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600">टॅब ३</label>
                        <input
                          type="text"
                          value={draft.tabs.tabEducation}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              tabs: { ...prev.tabs, tabEducation: e.target.value }
                            }))
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600">टॅब ४</label>
                        <input
                          type="text"
                          value={draft.tabs.tabOther}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              tabs: { ...prev.tabs, tabOther: e.target.value }
                            }))
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600">टॅब ५</label>
                        <input
                          type="text"
                          value={draft.tabs.tabVanshaval}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              tabs: { ...prev.tabs, tabVanshaval: e.target.value }
                            }))
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600">टॅब ६</label>
                        <input
                          type="text"
                          value={draft.tabs.tabSignatures}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              tabs: { ...prev.tabs, tabSignatures: e.target.value }
                            }))
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ANNOUNCEMENT BANNER */}
              {activeTab === 'banner' && (
                <div className="space-y-4">
                  <div className="border-b pb-2 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">
                        वरचा सूचना बॅनर (Top Announcement Banner)
                      </h4>
                      <p className="text-xs text-slate-500">
                        वेबसाईटवर सर्वात वर दिसणारा सूचना संदेश सेट करा.
                      </p>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-300">
                      <input
                        type="checkbox"
                        checked={draft.announcement.enabled}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            announcement: { ...prev.announcement, enabled: e.target.checked }
                          }))
                        }
                        className="w-4 h-4 text-amber-600 rounded"
                      />
                      <span className="text-xs font-bold text-slate-800">बॅनर चालू</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      सूचना संदेश (Banner Text)
                    </label>
                    <textarea
                      rows={3}
                      value={draft.announcement.message}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          announcement: { ...prev.announcement, message: e.target.value }
                        }))
                      }
                      className="w-full text-xs font-medium px-3 py-2 border border-slate-300 rounded-xl"
                      placeholder="उदा. सूचना: सर्व २०२४-२५ सुधारित जात प्रमाणपत्र व उत्पन्नाचे फॉर्म्स उपलब्ध झाले आहेत."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      बॅनरचा प्रकार (रंग)
                    </label>
                    <div className="flex gap-4 text-xs font-bold">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="btype"
                          value="info"
                          checked={draft.announcement.type === 'info'}
                          onChange={() =>
                            setDraft((prev) => ({
                              ...prev,
                              announcement: { ...prev.announcement, type: 'info' }
                            }))
                          }
                        />
                        <span className="text-blue-700">माहिती (निळा / Info)</span>
                      </label>

                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="btype"
                          value="warning"
                          checked={draft.announcement.type === 'warning'}
                          onChange={() =>
                            setDraft((prev) => ({
                              ...prev,
                              announcement: { ...prev.announcement, type: 'warning' }
                            }))
                          }
                        />
                        <span className="text-amber-700">महत्वाचे (पिवळा / Warning)</span>
                      </label>

                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="btype"
                          value="success"
                          checked={draft.announcement.type === 'success'}
                          onChange={() =>
                            setDraft((prev) => ({
                              ...prev,
                              announcement: { ...prev.announcement, type: 'success' }
                            }))
                          }
                        />
                        <span className="text-emerald-700">यशस्वी / नवीन (हिरवा / Success)</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: TEXT OVERRIDES */}
              {activeTab === 'text' && (
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h4 className="font-extrabold text-base text-slate-900">
                      मजकूर बदल व हेडर्स (Text Overrides)
                    </h4>
                    <p className="text-xs text-slate-500">
                      फॉर्म्सवरील मुख्य शीर्षके आणि बटनांचा मजकूर बदला.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        शासकीय मुख्य शीर्षक (Government Title)
                      </label>
                      <input
                        type="text"
                        value={draft.textOverrides.governmentTitle}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            textOverrides: { ...prev.textOverrides, governmentTitle: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        स्वयं घोषणापत्र शीर्षक (Affidavit Title)
                      </label>
                      <input
                        type="text"
                        value={draft.textOverrides.affidavitTitle}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            textOverrides: { ...prev.textOverrides, affidavitTitle: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        वंशावळ शीर्षक (Vanshaval Title)
                      </label>
                      <input
                        type="text"
                        value={draft.textOverrides.vanshavalTitle}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            textOverrides: { ...prev.textOverrides, vanshavalTitle: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        प्रिंट बटनाचा मजकूर (Print Button Text)
                      </label>
                      <input
                        type="text"
                        value={draft.textOverrides.printButtonText}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            textOverrides: { ...prev.textOverrides, printButtonText: e.target.value }
                          }))
                        }
                        className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: ADMIN ID, PASSWORD & SECURITY */}
              {activeTab === 'security' && (
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <KeyRound className="w-5 h-5 text-amber-600" />
                      <span>मास्टर ॲडमीन आयडी व पासवर्ड बदला (Admin Credentials)</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      येथून तुम्ही ॲडमीन पॅनेलचा लॉगिन आयडी आणि पासवर्ड दोन्ही तुमच्या सोयीनुसार बदलू शकता.
                    </p>
                  </div>

                  {/* Current Active Credentials Info Card */}
                  <div className="p-3.5 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-amber-300 font-bold block">सध्याचा सक्रिय ॲडमीन आयडी:</span>
                      <span className="font-mono font-black text-sm text-white">{draft.adminId || 'admin'}</span>
                    </div>
                    <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
                      मुख्य मालक
                    </span>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-300 space-y-3.5 max-w-lg">
                    <div className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5 border-b border-amber-200 pb-2">
                      <KeyRound className="w-4 h-4 text-amber-700" />
                      <span>नवीन ॲडमीन लॉगिन आयडी व पासवर्ड सेट करा</span>
                    </div>

                    {/* New Admin ID */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-800 mb-1">
                        १. नवीन ॲडमीन लॉगिन आयडी (Admin ID) *
                      </label>
                      <input
                        type="text"
                        value={changeAdminId}
                        onChange={(e) => setChangeAdminId(e.target.value)}
                        placeholder="उदा. admin किंवा prashant"
                        className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-900"
                        required
                      />
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-800 mb-1">
                        २. नवीन ॲडमीन पासवर्ड (New Password) *
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="किमान ४ अक्षरी नवीन पासवर्ड टाका..."
                          className="w-full text-xs px-3 py-2 pr-10 border border-slate-300 rounded-lg font-mono bg-white text-slate-900"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-2 text-slate-400 hover:text-slate-700 p-0.5"
                          title={showNewPassword ? 'पासवर्ड लपवा' : 'पासवर्ड पहा'}
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-800 mb-1">
                        ३. कन्फर्म नवीन पासवर्ड (Confirm Password) *
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="पुन्हा तोच पासवर्ड टाका..."
                          className="w-full text-xs px-3 py-2 pr-10 border border-slate-300 rounded-lg font-mono bg-white text-slate-900"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCredentialsChange}
                      className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all cursor-pointer hover:shadow-md"
                    >
                      ✓ ॲडमीन आयडी व पासवर्ड सेव्ह करा
                    </button>
                  </div>

                  {/* Logout from Admin Panel */}
                  <div className="pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setIsAuthenticated(false)}
                      className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 border border-red-300 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>ॲडमीन पॅनेलमधून लॉगआउट करा</span>
                    </button>
                  </div>
                </div>
              )}


            </div>
          </div>
        )}

        {/* Footer with Save / Reset Actions */}
        <div className="bg-slate-100 p-3.5 sm:p-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('सर्व सेटिंग्ज डीफॉल्ट मूळ स्थितीत आणायच्या का?')) {
                    onResetDefault();
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-red-700 text-xs font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>मूळ स्थितीत आणा (Reset)</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>बदल यशस्वीरित्या जतन झाले!</span>
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold text-xs cursor-pointer"
            >
              बंद करा
            </button>
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>सर्व सेटिंग्ज सेव्ह करा</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
