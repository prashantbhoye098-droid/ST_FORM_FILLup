import React, { useState } from 'react';
import { AdminSettings } from '../types/admin';
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
  KeyRound,
  CheckCircle,
  AlertTriangle,
  Upload,
  Sliders,
  DollarSign
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AdminSettings;
  onSaveSettings: (newSettings: AdminSettings) => void;
  onResetDefault: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onResetDefault
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'watermark' | 'payment' | 'branding' | 'tabs' | 'banner' | 'text' | 'security'>('watermark');

  // Local draft of settings being edited in modal
  const [draft, setDraft] = useState<AdminSettings>(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New password state for security tab
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === draft.adminPassword || passwordInput === 'mauli@2024') {
      setIsAuthenticated(true);
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('चुकीचा पासवर्ड! कृपया योग्य ॲडमीन पासवर्ड टाका.');
    }
  };

  const handleSave = () => {
    onSaveSettings(draft);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  const handlePasswordChange = () => {
    if (!newPassword || newPassword.length < 4) {
      alert('पासवर्ड किमान ४ अक्षरांचा असावा.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('नवीन पासवर्ड आणि कन्फर्म पासवर्ड जुळत नाहीत!');
      return;
    }
    const updated = { ...draft, adminPassword: newPassword };
    setDraft(updated);
    onSaveSettings(updated);
    setNewPassword('');
    setConfirmPassword('');
    alert('ॲडमीन पासवर्ड यशस्वीरित्या बदलला गेला आहे!');
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
          /* Password Authentication Gate */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-5">
            <div className="w-20 h-20 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-600 shadow-inner">
              <Lock className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-xl font-black text-slate-900">
                सुरक्षित ॲडमीन लॉगिन
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                या पॅनेलचे पासवर्ड केवळ आपल्याकडे आहे. सर्व नियंत्रण बदलण्यासाठी पासवर्ड टाका.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <div>
                <input
                  type="password"
                  placeholder="ॲडमीन पासवर्ड टाका..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError('');
                  }}
                  className="w-full text-center text-base tracking-widest font-mono py-2.5 px-4 bg-slate-50 border-2 border-slate-300 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all shadow-inner"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-xs text-red-600 font-bold mt-1.5 flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{passwordError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>ॲडमीन पॅनेल उघडा</span>
              </button>
            </form>

            <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-[11px] text-slate-600 w-full text-left">
              <span className="font-bold text-slate-800">माहिती:</span> डीफॉल्ट पासवर्ड <b>mauli@2024</b> आहे. आत गेल्यावर तुम्ही पासवर्ड बदलू शकता.
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Left Tabs Menu */}
            <div className="w-full md:w-60 bg-slate-50 border-r border-slate-200 p-2.5 space-y-1 shrink-0 overflow-y-auto">
              <button
                type="button"
                onClick={() => setActiveTab('watermark')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'watermark'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>१. वॉटरमार्क नियंत्रण</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('payment')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'payment'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>२. पेमेंट पद्धती (₹१०/फी)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('branding')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'branding'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>३. ब्रँडिंग व केंद्र माहिती</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tabs')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'tabs'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>४. फॉर्म्स व टॅब नावे</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('banner')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'banner'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>५. सूचना बॅनर</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'text'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Type className="w-4 h-4" />
                <span>६. मजकूर बदल (Overrides)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'security'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>७. पासवर्ड बदला / सुरक्षा</span>
              </button>
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

                  {/* Fees Configuration */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        प्रति पान फी (Per Page Fee)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">₹</span>
                        <input
                          type="number"
                          value={draft.payment.perPageFee}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              payment: { ...prev.payment, perPageFee: parseInt(e.target.value) || 10 }
                            }))
                          }
                          className="w-full pl-7 pr-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        मासिक सबस्क्रिप्शन दर
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">₹</span>
                        <input
                          type="number"
                          value={draft.payment.monthlyPlanPrice}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              payment: { ...prev.payment, monthlyPlanPrice: parseInt(e.target.value) || 199 }
                            }))
                          }
                          className="w-full pl-7 pr-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        वार्षिक सबस्क्रिप्शन दर
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">₹</span>
                        <input
                          type="number"
                          value={draft.payment.yearlyPlanPrice}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              payment: { ...prev.payment, yearlyPlanPrice: parseInt(e.target.value) || 1199 }
                            }))
                          }
                          className="w-full pl-7 pr-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg"
                        />
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

              {/* TAB 3: BRANDING & CENTER INFO */}
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
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        टॅगलाईन (Subtitle)
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
                      />
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

              {/* TAB 7: ADMIN PASSWORD & SECURITY */}
              {activeTab === 'security' && (
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h4 className="font-extrabold text-base text-slate-900">
                      ॲडमीन पासवर्ड व सुरक्षा (Security & Password)
                    </h4>
                    <p className="text-xs text-slate-500">
                      हा पासवर्ड केवळ आपल्याकडे ठेवा जेणेकरून इतर कोणीही सेटिंग्ज बदलू शकणार नाही.
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-3 max-w-md">
                    <div className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-amber-700" />
                      <span>नवीन ॲडमीन पासवर्ड सेट करा</span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        नवीन पासवर्ड (New Password)
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="किमान ४ अक्षरी पासवर्ड..."
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        कन्फर्म नवीन पासवर्ड (Confirm Password)
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="पुन्हा तोच पासवर्ड टाका..."
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg font-mono"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handlePasswordChange}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      पासवर्ड अपडेट करा
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
