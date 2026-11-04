import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Globe,
  Code2,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  Download,
  CloudLightning,
  Layers,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  FileCode
} from 'lucide-react';

interface BloggerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BloggerGuideModal: React.FC<BloggerGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'netlify' | 'redirect' | 'page_iframe' | 'theme_xml'>('netlify');
  const [customLiveUrl, setCustomLiveUrl] = useState('https://mauli-seva-kendra.netlify.app');

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleDownloadPortal = () => {
    const link = document.createElement('a');
    link.href = '/mauli-portal.html';
    link.download = 'mauli-digital-seva-kendra-portal.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Iframe code with user-configured or fallback URL
  const iframeEmbedCode = `<!-- ======================================================== -->
<!-- माऊली डिजिटल सेवा केंद्र - कायमस्वरूपी पोर्टल (Blogger Embed) -->
<!-- ======================================================== -->
<div style="width: 100%; min-height: 100vh; height: 100vh; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); margin: 0 auto; background: #ffffff;">
  <iframe 
    src="${customLiveUrl}" 
    style="width: 100%; height: 100%; border: none; display: block;" 
    title="माऊली डिजिटल सेवा केंद्र पाथवे दिगर - फॉर्म्स व वंशावळ जनरेटर"
    allow="clipboard-write; fullscreen; print; camera"
    loading="lazy">
  </iframe>
</div>`;

  // Automatic redirect script for Blogger Theme <head>
  const redirectCode = `<!-- ======================================================== -->
<!-- Blogger Auto-Redirect: Blogger वरून थेट कायमस्वरूपी पोर्टल उघडेल -->
<!-- Blogger Dashboard > Theme > Edit HTML > <head> च्या खाली टाका -->
<!-- ======================================================== -->
<script type='text/javascript'>
  //<![CDATA[
  window.location.replace("${customLiveUrl}");
  //]]>
</script>`;

  // Complete clean full-width Blogger XML theme
  const bloggerThemeXmlCode = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:responsive='true' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta charset='utf-8'/>
  <meta content='width=device-width, initial-scale=1.0' name='viewport'/>
  <title>माऊली डिजिटल सेवा केंद्र पाथवे दिगर - शासकीय फॉर्म्स पोर्टल</title>
  <b:skin><![CDATA[
    body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #0f172a; }
    iframe { width: 100vw; height: 100vh; border: none; display: block; }
  ]]></b:skin>
</head>
<body>
  <b:section id='main' showaddelement='no'/>
  <iframe src='${customLiveUrl}' allow='clipboard-write; fullscreen; print; camera' title='माऊली डिजिटल सेवा केंद्र'></iframe>
</body>
</html>`;

  const bloggerThemeCss = `/* Blogger Full-Width CSS: Layout > Theme > Edit HTML किंवा Custom CSS मध्ये जोडा */
.main-inner, .content, #main, .post-outer, .post {
  max-width: 100% !important;
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
.sidebar-wrapper, #sidebar, .sidebar, .header-widget {
  display: none !important;
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-2 sm:p-4 no-print animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-orange-600 flex items-center justify-center font-black text-xl shadow-sm">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                ब्लॉगरवर (Blogger) कायमस्वरूपी वेबसाईट सेटप
              </h3>
              <p className="text-xs text-orange-100 font-medium">
                maulidigitalsevakendrapathavedigar.blogspot.com वर २४ तास लाइफटाईम फ्री चालू करा
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white hover:bg-black/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 24-hr Issue Explanation Banner */}
        <div className="bg-amber-50 border-b border-amber-200 p-3 sm:px-5 flex items-start gap-2.5 text-xs text-amber-900 shrink-0">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <b className="font-bold text-amber-950">२४ तासांनंतर 'ais-pre-...run.app' लिंक का बंद झाली?</b><br />
            AI Studio मधील डेव्हलपमेंट लिंक ही फक्त कोडिंग दरम्यान तात्पुरत्या टेस्टिंगसाठी असते, ती कायमस्वरूपी होस्टिंग नसते. 
            त्यामुळे आम्ही तुमच्या संपूर्ण वेबसाईटची <b>एकच स्वयंपूर्ण HTML फाईल तयार केली आहे</b>. खालील १ मिनिटांच्या सोप्या पद्धतीने ती अपलोड करा, तुमची वेबसाईट <b>कधीही बंद पडणार नाही (Lifetime Active)</b>!
          </div>
        </div>

        {/* Download Standalone File Banner */}
        <div className="bg-slate-900 text-white p-3.5 sm:px-5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>संपूर्ण वेबसाईट फाईल (Single-File HTML)</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/40 font-mono">
                  956 KB
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                सर्व फॉर्म्स, फॉन्ट, फोटो, QR पेमेंट व ॲडमीन पॅनेल या एकाच फाईलमध्ये आहे
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDownloadPortal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer hover:scale-102"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>📥 डाऊनलोड करा (mauli-portal.html)</span>
          </button>
        </div>

        {/* Tabs for Methods */}
        <div className="flex border-b border-slate-200 bg-slate-100 px-3 pt-2 gap-1 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('netlify')}
            className={`px-3 py-2 text-xs font-extrabold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'netlify'
                ? 'bg-white text-orange-600 border-t-2 border-orange-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <CloudLightning className="w-3.5 h-3.5" />
            <span>पद्धत १: Netlify Drop (कायमस्वरूपी मोफत लिंक) ⭐</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('redirect')}
            className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'redirect'
                ? 'bg-white text-orange-600 border-t-2 border-orange-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>पद्धत २: ब्लॉगर ऑटो-रिडायरेक्ट (१ ओळीचा कोड)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('page_iframe')}
            className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'page_iframe'
                ? 'bg-white text-orange-600 border-t-2 border-orange-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>पद्धत ३: ब्लॉगर पेज Iframe</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('theme_xml')}
            className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'theme_xml'
                ? 'bg-white text-orange-600 border-t-2 border-orange-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>पद्धत ४: संपूर्ण ब्लॉगर थीम XML</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-800 text-xs sm:text-sm">
          
          {/* TAB 1: Netlify Drop */}
          {activeTab === 'netlify' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-xs leading-relaxed">
                <span className="font-extrabold text-emerald-800 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  ही पद्धत सर्वांत सुरक्षित व १००% कायमस्वरूपी (Lifetime Free) आहे!
                </span>
                Netlify वर कोणतीही फी नसते, क्रेडिट कार्ड लागत नाही. फक्त फाईल ओढून सोडली की तुम्हाला तुमची स्वतःची कायमची लिंक मिळते जी कधीही बंद होत नाही.
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-orange-600 text-white font-black text-xs flex items-center justify-center shrink-0">१</span>
                  <div>
                    <h4 className="font-bold text-slate-900">वेबसाईट फाईल डाऊनलोड करा:</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      वर दिलेल्या काळ्या पट्टीतील <b>"📥 डाऊनलोड करा (mauli-portal.html)"</b> बटनावर क्लिक करून फाईल तुमच्या कॉम्प्युटर/मोबाईलमध्ये सेव्ह करा.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-orange-600 text-white font-black text-xs flex items-center justify-center shrink-0">२</span>
                  <div>
                    <h4 className="font-bold text-slate-900">मोफत Netlify Drop वेबसाईट उघडा:</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      गुगल क्रोममध्ये ही लिंक उघडा: <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-orange-600 font-bold underline inline-flex items-center gap-1">app.netlify.com/drop <ExternalLink className="w-3 h-3" /></a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-orange-600 text-white font-black text-xs flex items-center justify-center shrink-0">३</span>
                  <div>
                    <h4 className="font-bold text-slate-900">डाऊनलोड केलेली फाईल ड्रॅग & ड्रॉप (Drag & Drop) करा:</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      डाऊनलोड केलेली <code>mauli-digital-seva-kendra-portal.html</code> फाईल Netlify Drop च्या चौकटीत ओढून सोडा (Drag & Drop करा). (किंवा फाईलचे नाव <code>index.html</code> ठेवून एका फोल्डरमध्ये ठेवून ते फोल्डर ओढून सोडा).
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-orange-600 text-white font-black text-xs flex items-center justify-center shrink-0">४</span>
                  <div>
                    <h4 className="font-bold text-slate-900">१० सेकंदात तुमची कायमस्वरूपी लिंक तयार होईल:</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Netlify तुम्हाला कायमस्वरूपी लिंक देईल (उदा. <code>https://mauli-seva.netlify.app</code>). 
                      Site settings मध्ये जाऊन तुम्ही तुमच्या आवडीचे नाव (उदा. <code>mauli-digital-seva-kendra</code>) विनामूल्य बदलू शकता.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-orange-600 text-white font-black text-xs flex items-center justify-center shrink-0">५</span>
                  <div>
                    <h4 className="font-bold text-slate-900">ब्लॉगरवर जोडा:</h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      मिळालेली नवीन लिंक खालील बॉक्समध्ये टाका आणि <b>"पद्धत २: ब्लॉगर ऑटो-रिडायरेक्ट"</b> किंवा <b>"पद्धत ३: ब्लॉगर पेज Iframe"</b> वापरा.
                    </p>
                  </div>
                </div>
              </div>

              {/* URL Input Box */}
              <div className="p-3.5 bg-slate-50 border border-slate-300 rounded-xl space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  तुम्हाला Netlify किंवा Vercel वरून मिळालेली नवीन कायमस्वरूपी लिंक येथे टाका:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customLiveUrl}
                    onChange={(e) => setCustomLiveUrl(e.target.value)}
                    placeholder="https://tumchi-link.netlify.app"
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="text-xs text-slate-500 self-center font-medium">
                    (खालील सर्व कोड आपोआप अपडेट होतील)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Instant Redirect */}
          {activeTab === 'redirect' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 text-xs leading-relaxed">
                <span className="font-bold text-amber-900 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  सर्वोत्कृष्ट अनुभव (Best Experience):
                </span>
                या पद्धतीमुळे जेव्हा कोणी तुमच्या <code>https://maulidigitalsevakendrapathavedigar.blogspot.com</code> वर येईल, तेव्हा १ सेकंदात थेट तुमचे हे सुंदर फॉर्म पोर्टल कोणत्याही अडथळ्याविना उघडेल!
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900">
                  पायरी १: ब्लॉगर थीममध्ये १ ओळीचा कोड कसा टाकायचा?
                </h4>
                <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-700">
                  <li><a href="https://www.blogger.com" target="_blank" rel="noreferrer" className="text-orange-600 font-bold underline inline-flex items-center gap-0.5">Blogger.com</a> डॅशबोर्ड उघडा.</li>
                  <li>डाव्या बाजूच्या मेनूमध्ये <b>'Theme' (थीम)</b> वर क्लिक करा.</li>
                  <li>'Customize' च्या बाजूला असलेल्या लहान <b>बाणावर (Arrow ▾)</b> क्लिक करा.</li>
                  <li><b>'Edit HTML'</b> निवडा.</li>
                  <li>तिथे वरच्या भागात <code>&lt;head&gt;</code> शब्द शोधा आणि त्याच्या अगदी खाली हा खालील कोड पेस्ट करा.</li>
                  <li>वरच्या उजव्या बाजूला असलेले <b>Save (फ्लॉपी चिन्ह)</b> दाबा!</li>
                </ol>
              </div>

              {/* Code Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">हा रिडायरेक्ट कोड कॉपी करा:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(redirectCode, 'redirect')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedCode === 'redirect' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'redirect' ? 'कॉपी झाला!' : 'कोड कॉपी करा'}</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-amber-300 p-3 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
                  {redirectCode}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: Blogger Page Iframe */}
          {activeTab === 'page_iframe' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900">
                  ब्लॉगरच्या 'Pages' मध्ये थेट पोर्टल कसे दाखवायचे:
                </h4>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700">
                  <li>Blogger.com डॅशबोर्डमध्ये डाव्या मेनूतील <b>'Pages'</b> वर जा.</li>
                  <li><b>'+ New Page'</b> वर क्लिक करा.</li>
                  <li>पेजचे नाव द्या: <b>"आपले सरकार डिजिटल फॉर्म्स पोर्टल"</b>.</li>
                  <li>डाव्या कोपऱ्यात असलेल्या पेन्सिल आयकॉनवर क्लिक करून <b>"&lt;&gt; HTML view"</b> निवडा.</li>
                  <li>खालील तयार Iframe कोड कॉपी करून तिथे पेस्ट करा आणि <b>Publish</b> दाबा!</li>
                </ol>
              </div>

              {/* Iframe Code Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Iframe कोड:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(iframeEmbedCode, 'iframe')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedCode === 'iframe' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'iframe' ? 'कॉपी झाला!' : 'Iframe कॉपी करा'}</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-amber-300 p-3 rounded-xl text-[11px] font-mono overflow-x-auto border border-slate-800 leading-relaxed max-h-48">
                  {iframeEmbedCode}
                </pre>
              </div>

              {/* Full Width CSS */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">ब्लॉगर फुल-स्क्रीन CSS (साईडबार लपवण्यासाठी):</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(bloggerThemeCss, 'css')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedCode === 'css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'css' ? 'CSS कॉपी झाली!' : 'CSS कॉपी करा'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-600">
                  (Blogger &gt; Theme &gt; Customize &gt; Advanced &gt; Add CSS मध्ये ही CSS पेस्ट करा जेणेकरून फॉर्म पूर्ण स्क्रीनवर पसरेल).
                </p>
                <pre className="bg-slate-900 text-slate-200 p-2.5 rounded-lg text-[10px] font-mono overflow-x-auto border border-slate-800">
                  {bloggerThemeCss}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: Full Blogger Theme XML */}
          {activeTab === 'theme_xml' && (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-950 text-xs leading-relaxed">
                <span className="font-bold text-indigo-900 block mb-1">
                  ब्लॉगरला थेट मूळ ॲपमध्ये बदलणे (Zero Blogger Clutter):
                </span>
                या पद्धतीमुळे तुमच्या ब्लॉगरची जुनी थीम पूर्ण निघून जाईल आणि थेट १००% स्क्रीन व्यापणारे आपले सरकार पोर्टल दिसेल.
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900">
                  पायऱ्या:
                </h4>
                <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-700">
                  <li>Blogger.com &gt; <b>Theme</b> वर जा.</li>
                  <li>Customize च्या बाजूच्या <b>बाणावर (Arrow ▾)</b> क्लिक करून <b>'Edit HTML'</b> उघडा.</li>
                  <li>तिथे असलेला सर्व जुना कोड पुसून टाका (Select All Ctrl+A & Delete).</li>
                  <li>खालील संपूर्ण XML कोड कॉपी करून पेस्ट करा आणि <b>Save</b> दाबा!</li>
                </ol>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">संपूर्ण ब्लॉगर थीम XML:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(bloggerThemeXmlCode, 'theme_xml')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedCode === 'theme_xml' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'theme_xml' ? 'थीम कॉपी झाली!' : 'थीम XML कॉपी करा'}</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-indigo-200 p-3 rounded-xl text-[11px] font-mono overflow-x-auto border border-slate-800 leading-relaxed max-h-52">
                  {bloggerThemeXmlCode}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-3.5 sm:p-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>कोणतेही सर्व्हर बिल नाही · कायमस्वरूपी मोफत सेवा केंद्र पोर्टल</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors cursor-pointer shadow-sm"
          >
            समजले, बंद करा
          </button>
        </div>

      </div>
    </div>
  );
};
