/**
 * Complete Admin Settings Types for ASSK Portal
 * Controls all text, watermarks, payment methods, branding, and tabs
 */

export interface AdminSettings {
  // Authentication
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

  // Payment & Monetization Master Control
  payment: {
    isPaymentSystemActive: boolean; // Master toggle to activate/deactivate all payments
    isPayPerPageActive: boolean; // ₹10 / page option
    perPageFee: number; // Default: 10
    isWalletActive: boolean;
    isSubscriptionActive: boolean;
    monthlyPlanPrice: number; // Default: 199
    yearlyPlanPrice: number; // Default: 1199
    upiId: string; // Default: 'mauliseva@upi'
    payeeName: string; // Default: 'माऊली डिजिटल सेवा केंद्र'
    customQrCodeUrl: string; // Admin can upload/paste custom QR code image
    allowFreeWatermarkedPrint: boolean; // If false, forces payment before any print
  };

  // Branding & Header
  branding: {
    portalTitle: string; // e.g. 'आपले सरकार सेवा केंद्र'
    portalTagline: string; // e.g. 'पोर्टल २०२४ - डिजिटल शासकीय फॉर्म्स व वंशावळ जनरेटर'
    headerBadgeText: string; // e.g. 'पोर्टल २०२४'
    centerName: string;
    centerAddress: string;
    centerContact: string;
    supportWhatsapp: string;
    centerLogoUrl: string;
    asskLogoOption: 'official_assk' | 'custom_uploaded' | 'csc_logo' | 'none';
    customAsskLogoUrl: string;
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
  adminPassword: 'mauli@2024',

  watermark: {
    enabled: true,
    text: 'माऊली डिजिटल सेवा केंद्र पाथवे दिगर',
    subText: '★ अधिकृत वापरासाठी सबस्क्रिप्शन आवश्यक · विनामूल्य नमुना प्रत ★',
    opacity: 0.25,
    color: '#b91c1c',
    fontSize: 30,
    rotation: -30,
    antiScreenshotEnabled: true
  },

  payment: {
    isPaymentSystemActive: true,
    isPayPerPageActive: true,
    perPageFee: 10,
    isWalletActive: true,
    isSubscriptionActive: true,
    monthlyPlanPrice: 199,
    yearlyPlanPrice: 1199,
    upiId: 'mauliseva@upi',
    payeeName: 'माऊली डिजिटल सेवा केंद्र पाथवे दिगर',
    customQrCodeUrl: '',
    allowFreeWatermarkedPrint: true
  },

  branding: {
    portalTitle: 'आपले सरकार सेवा केंद्र',
    portalTagline: 'डिजिटल शासकीय फॉर्म्स व वंशावळ जनरेटर',
    headerBadgeText: 'पोर्टल २०२४',
    centerName: 'आपले सरकार सेवा केंद्र',
    centerAddress: 'ता. बागलाण, जि. नाशिक',
    centerContact: '९८२२xxxxxx',
    supportWhatsapp: '९८२२xxxxxx',
    centerLogoUrl: '',
    asskLogoOption: 'official_assk',
    customAsskLogoUrl: ''
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

    tabCenter: 'केंद्र व लोगो',
    tabApplicant: '१. अर्जदार',
    tabFamily: '२. कुटुंब व जात',
    tabEducation: '३. शिक्षण व पुरावे',
    tabOther: '४. इतर व पृष्ठ ३',
    tabVanshaval: '५. वंशावळ व नाव बदल',
    tabSignatures: '६. स्वाक्षरी व फोटो',
    tabIncome: '२. ३ वर्षे उत्पन्न तक्ता',
    tabSelfDecl: '२. १६ दाखले निवड'
  },

  textOverrides: {
    governmentTitle: 'महाराष्ट्र शासन',
    affidavitTitle: 'स्वयं घोषणापत्र',
    vanshavalTitle: 'नमुना ३ (वंशावळ)',
    submitButtonText: 'जतन करा',
    printButtonText: 'PDF डाउनलोड / प्रिंट'
  }
};
