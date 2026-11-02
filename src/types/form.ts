/**
 * Types for Maharashtra Scheduled Tribe (ST) Caste Certificate Application Form
 * Forms covered:
 * Page 1-3: नमुना "अ" [नियम ३ (१) पहा]
 * Page 4: नमुना "अ-१" [नियम ३ (२) पहा]
 * Page 5: नमुना ३ [नियम ४] - वंशावळ व शपथपत्र
 * Page 6: प्रपत्र -अ-ब - स्वयं घोषणापत्र
 */

export type YesNo = 'होय' | 'नाही';

export interface VanshavalMember {
  id: string;
  relation: string; // e.g. 'खापर पणजोबा' | 'पणजोबा' | 'आजोबा' | 'वडील' | 'काका / चुलते' | 'अर्जदार' | 'भाऊ'
  name: string;
  notes?: string;
  children?: VanshavalMember[];
}

export interface STFormData {
  // Center Details (left corner option & header)
  centerName: string;
  centerAddress: string;
  centerLogoUrl: string; // user uploaded or empty
  centerContact: string;

  // Header Authority
  subDivisionalOffice: string; // e.g. "उपविभागीय अधिकारी, बागलाण" or "बागलाण"
  subDivisionPlace: string; // e.g. "बागलाण"

  // 1. अर्जदाराची माहिती (Applicant Details)
  applicantName: string;
  currentAddress: string;
  village: string;
  taluka: string;
  district: string;
  postOffice: string;
  gender: 'पुरुष' | 'स्त्री' | 'इतर';
  birthDate: string; // YYYY-MM-DD
  age: number; // calculated or manual
  applicantCurrentOccupation: string; // शिक्षण, नोकरी, शेती, मजुरी, इतर
  applicantCurrentOccupationOther?: string;
  applicantTraditionalOccupation: string; // शेती, मजुरी, इतर
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

  // 3. जात व भाषा (Tribe & Language)
  tribeName: string; // e.g. "कोकणा", "कोकणी", "भिल्ल", "महादेव कोळी", "वारली", etc.
  subTribe: string; // पोट-जमात
  motherTongue: string; // मराठी, हिंदी, इंग्लिश, कोकणी
  motherTongueOther?: string;
  spokenDialect: string; // मराठी, हिंदी, इंग्लिश, कोकणी, डांगी, अहिराणी, भिल्ली
  spokenDialectOther?: string;

  // 4. प्रमाणपत्राची आवश्यकता असलेल्या व्यक्तीबाबत माहिती
  originalVillage: string; // मूळ गाव
  originalTaluka: string; // मूळ तालुका
  originalDistrict: string; // मूळ जिल्हा
  residence1950Place: string; // ६ सप्टेंबर १९५० पूर्वीचे वास्तव्याचे ठिकाण
  
  // Page 2: 4(ब) - (ह)
  livingInOtherVillage: boolean;
  otherVillageName: string;
  yearLeftOriginalVillage: string;
  reasonLeftOriginalVillage: string; // शिक्षण / नोकरी / इतर
  reasonLivingCurrentVillage: string; // शिक्षण / नोकरी / इतर
  birthPlace: string; // जन्म ठिकाण (गाव, तालुका, जिल्हा)

  // शिक्षण माहिती (Education)
  primarySchoolName: string; // प्राथमिक शाळेचे नाव
  primarySchoolVillageTalukaDist: string; // गाव, तहसील व जिल्हा
  secondarySchoolName: string; // माध्यमिक शाळा / महाविद्यालयाचे नाव
  secondarySchoolVillageTalukaDist: string; // गाव, तहसील व जिल्हा

  // 5. पुष्ट्यर्थ पुरावा (Evidence Yes/No)
  proofBirthRegister: YesNo; // ५(अ)(१) जन्म नोंदवही उतारा
  proofSchoolAdmissionRegister: YesNo; // ५(अ)(२) प्राथमिक शाळा प्रवेश नोंदवही उतारा
  proofSchoolLeavingCert: YesNo; // ५(अ)(३) प्राथमिक शाळा सोडल्याचा दाखला
  proof1950Residence: YesNo; // ५(ब) १९५० पूर्वीचा पुरावा
  proofServiceBookRecord: YesNo; // ५(क) शासकीय सेवेतील सेवा पुस्तकातील उतारा
  proofScrutinyValidityCert: YesNo; // ५(ड) जात छाननी समितीकडून दिलेले वैधता प्रमाणपत्र
  proofRevenueGramPanchayatRecord: YesNo; // ५(ई) महसुली किंवा ग्रामपंचायतीतील अभिलेख
  proofOtherWrittenEvidence: YesNo; // ५(फ) इतर संबंधित लेखी पुरावा

  // Page 3: 6. इतर माहिती
  relativeVillages: string; // नातेवाईक राहत असलेल्या ५ गावांची नावे
  deityNames: string; // कुलदैवत / देवदेवतांची नावे
  convertedDeityNames: string; // धर्मांतरापूर्वी पूजा करीत असलेल्या देवदेवतांची नावे

  // 7 - 10
  fatherAncestorOriginalVillage: string; // वडिलांचे / आजोबांचे मूळ गाव, तहसील व जिल्हा
  hasOriginalVillageProof: YesNo; // ८. मूळ गावासंबंधीचा पुरावा
  hasGovtBenefitsOrCert: YesNo; // ९(अ) प्रमाणपत्र किंवा शासकीय सवलती घेतल्या आहेत काय
  affidavitFormA1Attached: YesNo; // ९(ब) नमुना अ-१ मधील शपथपत्र जोडले आहे काय
  hasPreviousApplication: YesNo; // १०(अ) पूर्वी सक्षम प्राधिकाऱ्याकडे अर्ज केला आहे काय
  previousApplicationDetails?: string;
  hasRelativeValidityCert: YesNo; // १०(ब) नातेवाईकांचे वैधता प्रमाणपत्र दिले आहे काय
  relativeValidityDetails?: string;

  // Page 3 footer
  declarationPlace: string; // ठिकाण (e.g. बागलाण, सटाणा, नाशिक)
  customDate?: string; // If empty, today's date formatted automatically
  isAutoDateEnabled: boolean;

  // Page 4: नमुना अ-१ शपथपत्र
  applicantReligion: string; // default "हिंदू"
  hasAppliedOtherState: YesNo; // मी महाराष्ट्र राज्यात किंवा इतर राज्यात अर्ज केलेला आहे / नाही
  hasReceivedOtherStateCert: YesNo; // मला प्रमाणपत्र देण्यात आलेले आहे / नाही
  relativeWithValidityName: string; // ज्या नातेवाईकाला वैधता प्रमाणपत्र मिळाले त्यांचे नाव
  relativeWithValidityRelation: string; // नाते (उदा. चुलते, भाऊ, वडील)

  // Page 5: वंशावळ व नाव बदल
  nameDiscrepancyPerson: string; // 'माझे' | 'वडिलांच्या' | 'आजोबांच्या'
  oldNameOnLC: string; // शाळा सोडल्याच्या दाखल्यावरील जुने नाव
  newNameOfficial: string; // नवीन / बरोबर नाव

  // वंशावळ नोंदी (Tree Nodes)
  vanshaval: {
    greatGreatGrandfather: string; // खापर पणजोबा
    greatGrandfather: string; // पणजोबा
    grandfather: string; // आजोबा
    father: string; // वडील
    uncles: string[]; // काका / चुलते
    applicant: string; // अर्जदार (auto synced with applicantName)
    siblings: string[]; // भाऊ / बहीण
    cousins: string[]; // चुलत भाऊ
  };

  // साक्षीदार (Witness for Page 4 & 5)
  witnessName: string;
  witnessAddress?: string;
  witnessSignatureUrl: string;

  // स्वाक्षरी व फोटो (Uploads)
  applicantPhotoUrl: string; // Shown on Page 1 AND Page 6
  applicantSignatureUrl: string;
  fatherSignatureUrl: string; // Used if age < 18
  fatherNameAsGuardian: string; // Auto-synced with father's name
}
