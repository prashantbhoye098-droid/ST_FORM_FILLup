/**
 * Complete Admin Settings Types for ASSK Portal
 * Controls all text, watermarks, payment methods, branding, and tabs
 */

export interface SubscribedCenter {
  id: string; // e.g. "MSK-1082"
  password: string; // e.g. "Mauli@492"
  centerName: string;
  ownerName: string;
  mobile: string;
  village: string;
  taluka: string;
  district: string;
  plan: 'monthly' | 'quarterly' | 'yearly' | 'lifetime';
  amountPaid: number;
  utrNumber: string;
  registeredAt: string;
  expiresAt: string;
  status: 'active' | 'pending' | 'suspended';
  lastLoginAt?: string;
}

export interface AdminSettings {
  // Authentication
  adminId: string; // Master admin login ID (default: 'admin')
  adminPassword: string; // Master admin password (default: 'mauli@2024')

  // Watermark Settings
  watermark: {
    enabled: boolean;
    text: string; // e.g. "माऊली डिजिटल सेवा केंद्र पाथवे दिगर"
    subText: string;
    opacity: number; // 0.1 to 0.6
    color: string; // e.g. '#b91c1c'
    fontSize: number; // in pixels, e.g. 28
    rotation: number; // in degrees, e.g. -30
    antiScreenshotEnabled: boolean; // blocks right click, screen watermark
  };

  // Payment & Monetization Master Control (100% Paid Portal)
  payment: {
    isPaymentSystemActive: boolean; // Master toggle to activate/deactivate all payments
    enforcePaidLogin: boolean; // 100% Paid Gatekeeper: Forces ID/Password login before portal access
    autoApproveNewRegistrations: boolean; // Instantly activate newly purchased ID/Password
    isPayPerPageActive: boolean; // ₹10 / page option
    perPageFee: number; // Default: 10
    isWalletActive: boolean;
    isSubscriptionActive: boolean;
    monthlyPlanPrice: number; // Default: 199
    quarterlyPlanPrice: number; // Default: 499
    yearlyPlanPrice: number; // Default: 1499
    lifetimePlanPrice: number; // Default: 2999
    upiId: string; // Optional custom UPI ID (Default: empty)
    payeeName: string; // Default: 'माऊली डिजिटल सेवा केंद्र'
    customQrCodeUrl: string; // Admin can upload/paste custom QR code image
    allowFreeWatermarkedPrint: boolean; // If false, forces payment before any print

    // Specific Per-PDF Pricing (प्रतेक PDF फाईलचे वेगळे पेमेंट)
    docFees: {
      stCasteFee: number; // अनुसूचित जमाती (ST) जात प्रमाणपत्र व वंशावळ (६ पाने)
      obcScFee: number; // OBC / SC जात प्रमाणपत्र (७ पाने)
      incomeFee: number; // उत्पन्नाचा दाखला अर्ज (प्रपत्र-अ)
      selfDeclFee: number; // १६ विविध शासकीय स्वघोषणापत्र दाखले
      panCardFee: number; // पॅन कार्ड अर्ज (२-पानी फॉर्म)
    };

    // Shop UPI QR Code Option On/Off Toggle (बिगर UTR प्रिंट रोखण्यासाठी)
    enableShopQrPayment: boolean; // जर बंद असेल तर थेट दुकानाचा QR लपवला जाईल व फक्त Razorpay ऑटो-व्हेरीफाय दिसेल
    requireStrictUtrVerification: boolean; // QR चालू असताना किमान १२-अंकी UTR नंबर सक्तीचा

    // Razorpay Payment Gateway Integration
    razorpay?: {
      enabled: boolean;
      keyId: string; // e.g. rzp_live_xxxxxxxx or rzp_test_xxxxxxxx
      keySecret?: string;
    };
  };

  // Anti-Theft & Anti-Copy Protection
  antiCopy: {
    disableRightClick: boolean;
    disableInspectShortcuts: boolean;
    disableTextSelection: boolean;
  };

  // Branding & Header
  branding: {
    portalTitle: string; // e.g. 'आपले सरकार सेवा केंद्र'
    portalTagline: string; // e.g. 'डिजिटल शासकीय फॉर्म्स व वंशावळ जनरेटर'
    headerBadgeText: string; // e.g. 'पोर्टल २०२४'
    headerLogoText: string; // e.g. 'महा'
    centerName: string;
    centerAddress: string;
    centerContact: string;
    supportWhatsapp: string;
    centerLogoUrl: string;
    asskLogoOption: 'official_assk' | 'custom_uploaded' | 'csc_logo' | 'none';
    customAsskLogoUrl: string;
  };

  // Header Buttons On/Off Toggles
  headerButtons: {
    showDemoButton: boolean;
    showResetButton: boolean;
    showProfilesButton: boolean;
    showWalletButton: boolean;
    showAuthButton: boolean;
    showPageNavigation: boolean;
    showFormSelector: boolean;
  };

  // Top Announcement Banner
  announcement: {
    enabled: boolean;
    message: string;
    type: 'info' | 'warning' | 'success';
  };

  // Tabs & Forms Label Customization
  tabs: {
    // Form Categories
    stFormEnabled: boolean;
    stFormLabel: string;
    obcFormEnabled: boolean;
    obcFormLabel: string;
    incomeFormEnabled: boolean;
    incomeFormLabel: string;
    selfDeclFormEnabled: boolean;
    selfDeclFormLabel: string;
    panFormEnabled: boolean;
    panFormLabel: string;

    // Left Tab Titles
    tabCenter: string;
    tabApplicant: string;
    tabFamily: string;
    tabEducation: string;
    tabOther: string;
    tabVanshaval: string;
    tabSignatures: string;
    tabIncome: string;
    tabSelfDecl: string;
    tabPanCard: string;
  };

  // Google AdSense Monetization Settings
  adsense: {
    enabled: boolean;
    publisherId: string; // e.g. "ca-pub-XXXXXXXXXXXXXXXX"
    showTopBanner: boolean;
    showSidebarBanner: boolean;
    showBottomBanner: boolean;
  };

  // General Text Overrides dictionary
  textOverrides: {
    governmentTitle: string; // महाराष्ट्र शासन
    affidavitTitle: string; // स्वयं घोषणापत्र
    vanshavalTitle: string; // नमुना ३ (वंशावळ)
    submitButtonText: string;
    printButtonText: string;
  };
}

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  adminId: 'admin',
  adminPassword: 'mauli@2024',

  watermark: {
    enabled: true,
    text: 'माऊली डिजिटल सेवा केंद्र पठावे दिगर',
    subText: '★ अधिकृत वापरासाठी सबस्क्रिप्शन आवश्यक · विनामूल्य नमुना प्रत ★',
    opacity: 0.25,
    color: '#b91c1c',
    fontSize: 30,
    rotation: -30,
    antiScreenshotEnabled: true
  },

  payment: {
    isPaymentSystemActive: true,
    enforcePaidLogin: false, // Turned OFF as requested: anyone can fill any form freely!
    autoApproveNewRegistrations: true,
    isPayPerPageActive: true,
    perPageFee: 10,
    isWalletActive: false,
    isSubscriptionActive: false, // Turned OFF as requested
    monthlyPlanPrice: 199,
    quarterlyPlanPrice: 499,
    yearlyPlanPrice: 1499,
    lifetimePlanPrice: 2999,
    upiId: '', // चुकीचा UPI ID काढण्यात आला आहे (वापरकर्त्याच्या विनंतीनुसार)
    payeeName: 'माऊली डिजिटल सेवा केंद्र (प्रशांत वाळू भोये)',
    customQrCodeUrl: '',
    allowFreeWatermarkedPrint: false, // Must pay before print to remove watermark!
    docFees: {
      stCasteFee: 20,
      obcScFee: 20,
      incomeFee: 10,
      selfDeclFee: 10,
      panCardFee: 15
    },
    enableShopQrPayment: false, // Default: OFF (फक्त अधिकृत Razorpay ऑटो-व्हेरीफाय दिसेल जेणेकरून कोणीही खोटा UTR न टाकता प्रिंट करू शकणार नाही)
    requireStrictUtrVerification: true,
    razorpay: {
      enabled: true,
      keyId: 'rzp_test_TxBucNNFf7RzjN',
      keySecret: 'lRYJan90Xt97vqGtnkzVQVWe'
    }
  },

  antiCopy: {
    disableRightClick: true,
    disableInspectShortcuts: true,
    disableTextSelection: false
  },

  branding: {
    portalTitle: 'mauliservices.in - आपले सरकार सेवा केंद्र',
    portalTagline: 'डिजिटल शासकीय फॉर्म्स, वंशावळ व पॅन कार्ड पोर्टल (mauliservices.in)',
    headerBadgeText: 'mauliservices.in',
    headerLogoText: 'माऊली',
    centerName: 'माऊली डिजिटल सेवा केंद्र',
    centerAddress: 'मु.पो. पठावे दिगर, ता. बागलाण, जि. नाशिक - ४२३३०१',
    centerContact: '७०८३०३४६०७',
    supportWhatsapp: '७०८३०३४६०७',
    centerLogoUrl: '',
    asskLogoOption: 'official_assk',
    customAsskLogoUrl: ''
  },

  headerButtons: {
    showDemoButton: true,
    showResetButton: true,
    showProfilesButton: true,
    showWalletButton: false,
    showAuthButton: false,
    showPageNavigation: true,
    showFormSelector: true
  },

  announcement: {
    enabled: true,
    message: 'सूचना: सर्व २०२४-२५ सुधारित जात प्रमाणपत्र व उत्पन्नाचे फॉर्म्स उपलब्ध झाले आहेत.',
    type: 'info'
  },

  tabs: {
    stFormEnabled: true,
    stFormLabel: '१. अनुसूचित जमाती (ST) जात प्रमाणपत्र (६ पाने)',
    obcFormEnabled: true,
    obcFormLabel: '२. OBC / SC / VJNT / SBC जात प्रमाणपत्र (७ पाने)',
    incomeFormEnabled: true,
    incomeFormLabel: '३. उत्पन्नाचा दाखला - प्रपत्र-अ (३ वर्षे उत्पन्न)',
    selfDeclFormEnabled: true,
    selfDeclFormLabel: '४. शासकीय स्वयं घोषणापत्र (१६ दाखले)',
    panFormEnabled: true,
    panFormLabel: '५. पॅन कार्ड (PAN) फोटो व सही पेस्ट',

    tabCenter: 'केंद्र व लोगो',
    tabApplicant: '१. अर्जदार',
    tabFamily: '२. कुटुंब व जात',
    tabEducation: '३. शिक्षण व पुरावे',
    tabOther: '४. इतर व पृष्ठ ३',
    tabVanshaval: '५. वंशावळ व नाव बदल',
    tabSignatures: '६. स्वाक्षरी व फोटो',
    tabIncome: '२. ३ वर्षे उत्पन्न तक्ता',
    tabSelfDecl: '२. १६ दाखले निवड',
    tabPanCard: '२. PAN फोटो व सही सेटिंग'
  },

  adsense: {
    enabled: true,
    publisherId: '', // Set your ca-pub-XXXXXXXXXXXXXXXX once approved
    showTopBanner: true,
    showSidebarBanner: true,
    showBottomBanner: true
  },

  textOverrides: {
    governmentTitle: 'महाराष्ट्र शासन',
    affidavitTitle: 'स्वयं घोषणापत्र',
    vanshavalTitle: 'नमुना ३ (वंशावळ)',
    submitButtonText: 'जतन करा',
    printButtonText: 'PDF डाउनलोड / प्रिंट'
  }
};
