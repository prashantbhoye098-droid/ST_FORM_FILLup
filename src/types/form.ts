/**
 * Complete types for Maharashtra Seva Kendra Application Forms Suite
 */

export type FormCategory =
  | 'ST_CASTE' // अनुसूचित जमाती (ST) जात प्रमाणपत्र (६ पृष्ठे)
  | 'OBC_SC_CASTE' // OBC / SC / VJNT / SBC जात प्रमाणपत्र (७ पृष्ठे)
  | 'INCOME_DECLARATION' // उत्पन्नाचा दाखला - प्रपत्र-अ मिळकत स्वघोषणा
  | 'SELF_DECLARATIONS_16'; // १६ विविध स्वयं घोषणापत्र दाखले (रहिवास, विधवा, विभक्त कुटुंब, इ.)

export type YesNo = 'होय' | 'नाही';

export type ASSKLogoType = 'official_assk' | 'custom_uploaded' | 'csc_logo' | 'none';

// User Account & Authentication
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  isLoggedIn: boolean;
  plan: 'free' | 'monthly' | 'quarterly' | 'yearly' | 'lifetime';
  walletBalance: number; // In Rupees (e.g. 50)
  planExpiryDate?: string;
  centerId?: string; // e.g. "MSK-1001"
  centerName?: string;
  mobile?: string;
  village?: string;
  isSubscribed?: boolean;
}

// Income Source Row for उत्पन्नाचा दाखला
export interface IncomeSourceRow {
  srNo: number;
  sourceName: string;
  year1Amount: number | string; // उदा. २०२३-२४
  year2Amount: number | string; // उदा. २०२४-२५
  year3Amount: number | string; // उदा. २०२५-२६
}

// 16 Self Declaration types
export type SelfDeclarationType =
  | 'रहिवास प्रमाणपत्र'
  | 'विधवा असल्याचा दाखला'
  | 'परितक्त्या असल्याचा दाखला'
  | 'विभक्त कुटुंबाचा दाखला'
  | 'नोकरी व्यवसायासाठी ना-हरकत प्रमाणपत्र'
  | 'बेरोजगार प्रमाणपत्र'
  | 'हयातीचा दाखला'
  | 'शौचालय दाखला'
  | 'नळ जोडणीसाठी अनुमती प्रमाणपत्र'
  | 'चारित्र्याचा दाखला'
  | 'विजेच्या जोडणीसाठी ना-हरकत प्रमाणपत्र'
  | 'जिल्हा परिषद फंडातून कृषी साहित्य खरेदी'
  | 'राष्ट्रीय बायोगॅस व खत व्यवस्थापन कार्यक्रम'
  | 'बचत गटांना खेळते भाग भांडवल बँक मार्फत कर्ज पुरवठा'
  | 'कोणत्याही योजनेचा लाभ न घेतल्याचे प्रमाणपत्र'
  | 'निराधार योजनेसाठी वयाचा दाखला';

// Saved Village Profile for instant auto-fill of future applicants
export interface VillageProfile {
  id: string;
  profileName: string; // e.g. "अंबासन गाव प्रोफाईल"
  village: string;
  taluka: string;
  district: string;
  postOffice: string;
  residence1950Place: string;
  primarySchoolName: string;
  primarySchoolVillageTalukaDist: string;
  secondarySchoolName: string;
  secondarySchoolVillageTalukaDist: string;
  relativeVillages: string;
  deityNames: string;
  tribeName: string;
  subTribe: string;
  casteCategory: string;
}

export interface STFormData {
  // Active Form Mode
  activeFormCategory: FormCategory;
  activeSelfDeclarationType: SelfDeclarationType;

  // Center Details & Logo Options
  centerName: string;
  centerAddress: string;
  centerLogoUrl: string;
  centerContact: string;
  asskLogoOption: ASSKLogoType; // official / custom / csc / none
  customAsskLogoUrl: string;

  // Header Authority
  subDivisionalOffice: string; // e.g. "बागलाण"
  subDivisionPlace: string;

  // Watermark Settings (Default: "माऊली डिजिटल सेवा केंद्र पाथवे दिगर")
  watermarkText: string;
  watermarkSubText?: string;
  watermarkColor?: string;
  watermarkOpacity?: number;
  watermarkFontSize?: number;
  watermarkRotation?: number;
  watermarkEnabled?: boolean;
  isWatermarkRemoved: boolean; // True when paid or subscribed

  // 1. अर्जदाराची माहिती (Applicant Details)
  applicantName: string;
  currentAddress: string;
  village: string;
  taluka: string;
  district: string;
  postOffice: string;
  gender: 'पुरुष' | 'स्त्री' | 'इतर';
  birthDate: string; // YYYY-MM-DD
  age: number;
  aadhaarNumber?: string;
  applicantCurrentOccupation: string;
  applicantCurrentOccupationOther?: string;
  applicantTraditionalOccupation: string;
  applicantTraditionalOccupationOther?: string;

  // 2. वडिलांची माहिती (Father Details)
  fatherName: string;
  fatherAddress: string;
  isFatherAlive: boolean;
  fatherLastResidenceIfDeceased?: string;
  fatherCurrentOccupation: string;
  fatherCurrentOccupationOther?: string;
  fatherTraditionalOccupation: string;
  fatherTraditionalOccupationOther?: string;

  // 3. जात व भाषा (Tribe & Caste)
  casteCategory: 'अनुसूचित जमाती (ST)' | 'इतर मागासवर्ग (OBC)' | 'अनुसूचित जाती (SC)' | 'विमुक्त जाती (VJ)' | 'भटक्या जमाती (NT)' | 'विशेष मागासप्रवर्ग (SBC)';
  tribeName: string;
  subTribe: string;
  motherTongue: string;
  motherTongueOther?: string;
  spokenDialect: string;
  spokenDialectOther?: string;

  // 4. मूळ गाव व स्थलांतर
  originalVillage: string;
  originalTaluka: string;
  originalDistrict: string;
  residence1950Place: string;
  livingInOtherVillage: boolean;
  otherVillageName: string;
  yearLeftOriginalVillage: string;
  reasonLeftOriginalVillage: string;
  reasonLivingCurrentVillage: string;
  birthPlace: string;

  // शिक्षण माहिती
  primarySchoolName: string;
  primarySchoolVillageTalukaDist: string;
  secondarySchoolName: string;
  secondarySchoolVillageTalukaDist: string;

  // पुरावे
  proofBirthRegister: YesNo;
  proofSchoolAdmissionRegister: YesNo;
  proofSchoolLeavingCert: YesNo;
  proof1950Residence: YesNo;
  proofServiceBookRecord: YesNo;
  proofScrutinyValidityCert: YesNo;
  proofRevenueGramPanchayatRecord: YesNo;
  proofOtherWrittenEvidence: YesNo;

  // इतर माहिती (पृष्ठ ३)
  relativeVillages: string;
  deityNames: string;
  convertedDeityNames: string;
  fatherAncestorOriginalVillage: string;
  hasOriginalVillageProof: YesNo;
  hasGovtBenefitsOrCert: YesNo;
  affidavitFormA1Attached: YesNo;
  hasPreviousApplication: YesNo;
  previousApplicationDetails?: string;
  hasRelativeValidityCert: YesNo;
  relativeValidityDetails?: string;

  // ठिकाण व दिनांक
  declarationPlace: string;
  customDate?: string;
  isAutoDateEnabled: boolean;

  // नमुना अ-१ व २ शपथपत्र
  applicantReligion: string;
  hasAppliedOtherState: YesNo;
  hasReceivedOtherStateCert: YesNo;
  relativeWithValidityName: string;
  relativeWithValidityRelation: string;

  // वंशावळ व नाव बदल
  nameDiscrepancyPerson: string;
  oldNameOnLC: string;
  newNameOfficial: string;
  vanshaval: {
    greatGreatGrandfather: string;
    greatGrandfather: string;
    grandfather: string;
    father: string;
    uncles: string[];
    applicant: string;
    siblings: string[];
    cousins: string[];
  };

  // साक्षीदार
  witnessName: string;
  witnessAddress?: string;
  witnessSignatureUrl: string;

  // स्वाक्षरी व फोटो
  applicantPhotoUrl: string;
  applicantSignatureUrl: string;
  fatherSignatureUrl: string;
  fatherNameAsGuardian: string;

  // प्रपत्र-अ (उत्पन्नाचा दाखला तपशील)
  incomeFamilyMembersCount: number | string;
  incomeLandHectare: string; // हे.आर. जमीन
  hasLand: boolean;
  incomeYears: [string, string, string]; // उदा. ['२०२३', '२०२४', '२०२५']
  incomeRows: IncomeSourceRow[];
  incomePurpose: string; // उदा. 'शैक्षणिक/शासकीय/प्रकरण कामी'
}
