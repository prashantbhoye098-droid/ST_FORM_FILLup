import { STFormData, IncomeSourceRow, VillageProfile } from '../types/form';

export const getTodayFormatted = (): string => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

export const calculateAgeFromBirthdate = (birthDateString: string): number => {
  if (!birthDateString) return 0;
  const birthDate = new Date(birthDateString);
  if (isNaN(birthDate.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return Math.max(0, age);
};

export const DEFAULT_INCOME_ROWS: IncomeSourceRow[] = [
  { srNo: 1, sourceName: 'शेती', year1Amount: 45000, year2Amount: 48000, year3Amount: 50000 },
  { srNo: 2, sourceName: 'शेती पूरक व्यवसाय', year1Amount: '', year2Amount: '', year3Amount: '' },
  { srNo: 3, sourceName: 'दुग्ध व्यवसाय', year1Amount: 15000, year2Amount: 16000, year3Amount: 18000 },
  { srNo: 4, sourceName: 'शेत मजुरी', year1Amount: '', year2Amount: '', year3Amount: '' },
  { srNo: 5, sourceName: 'इतर मजुरी', year1Amount: '', year2Amount: '', year3Amount: '' },
  { srNo: 6, sourceName: 'इतर व्यवसाय / उद्योग / धंदा', year1Amount: '', year2Amount: '', year3Amount: '' },
  { srNo: 7, sourceName: 'शेतीशिवाय इतर स्थावर मिळकती पासुनचे उत्पन्न', year1Amount: '', year2Amount: '', year3Amount: '' },
  { srNo: 8, sourceName: 'नोकरीतील वेतन/सेवानिवृत्त वेतन/ मानधन/ अनुदान इत्यादी', year1Amount: '', year2Amount: '', year3Amount: '' },
  { srNo: 9, sourceName: 'गुंतवणुकीवरील व्याज / लाभांश व तत्सम उत्पन्न', year1Amount: '', year2Amount: '', year3Amount: '' },
  { srNo: 10, sourceName: 'वर नमुद साधनाशिवाय इतर उत्पन्नाची साधने असल्यास', year1Amount: '', year2Amount: '', year3Amount: '' },
];

export const DEFAULT_VILLAGE_PROFILES: VillageProfile[] = [
  {
    id: 'ambasan',
    profileName: 'मु. पो. अंबासन (ता. बागलाण)',
    village: 'अंबासन',
    taluka: 'बागलाण',
    district: 'नाशिक',
    postOffice: 'अंबासन',
    residence1950Place: 'मु. पो. अंबासन, ता. बागलाण, जि. नाशिक',
    primarySchoolName: 'जि. प. प्राथमिक शाळा, अंबासन',
    primarySchoolVillageTalukaDist: 'अंबासन, ता. बागलाण, जि. नाशिक',
    secondarySchoolName: 'जनता माध्यमिक व उच्च माध्यमिक विद्यालय, अंबासन',
    secondarySchoolVillageTalukaDist: 'अंबासन, ता. बागलाण, जि. नाशिक',
    relativeVillages: 'डांगसौंदाणे, मुल्हेर, वीरगाव, नामपूर, ताहराबाद',
    deityNames: 'कणसरा माता, भवानी माता, डोंगरदेव, नारंदेव',
    tribeName: 'कोकणा',
    subTribe: 'कोकणी',
    casteCategory: 'अनुसूचित जमाती (ST)',
  },
  {
    id: 'taharabad',
    profileName: 'मु. पो. ताहराबाद (ता. बागलाण)',
    village: 'ताहराबाद',
    taluka: 'बागलाण',
    district: 'नाशिक',
    postOffice: 'ताहराबाद',
    residence1950Place: 'मु. पो. ताहराबाद, ता. बागलाण, जि. नाशिक',
    primarySchoolName: 'जि. प. प्राथमिक शाळा, ताहराबाद',
    primarySchoolVillageTalukaDist: 'ताहराबाद, ता. बागलाण, जि. नाशिक',
    secondarySchoolName: 'न्यू इंग्लिश स्कूल व कनिष्ठ महाविद्यालय, ताहराबाद',
    secondarySchoolVillageTalukaDist: 'ताहराबाद, ता. बागलाण, जि. नाशिक',
    relativeVillages: 'अंबासन, सटाणा, मुल्हेर, डांगसौंदाणे, सोमपूर',
    deityNames: 'सप्तशृंगी माता, कुलदैवत, खंडोबा',
    tribeName: 'भिल्ल',
    subTribe: 'भिल्ल',
    casteCategory: 'अनुसूचित जमाती (ST)',
  }
];

export const EMPTY_FORM_DATA: STFormData = {
  activeFormCategory: 'ST_CASTE',
  activeSelfDeclarationType: 'रहिवास प्रमाणपत्र',

  centerName: 'आपले सरकार सेवा केंद्र',
  centerAddress: 'ता. बागलाण, जि. नाशिक',
  centerLogoUrl: '',
  centerContact: '',
  asskLogoOption: 'official_assk',
  customAsskLogoUrl: '',

  subDivisionalOffice: 'बागलाण',
  subDivisionPlace: 'बागलाण',

  watermarkText: 'माऊली डिजिटल सेवा केंद्र पाथवे दिगर',
  isWatermarkRemoved: false,

  applicantName: '',
  currentAddress: '',
  village: '',
  taluka: 'बागलाण',
  district: 'नाशिक',
  postOffice: '',
  gender: 'पुरुष',
  birthDate: '',
  age: 19,
  aadhaarNumber: '',
  applicantCurrentOccupation: 'शिक्षण',
  applicantCurrentOccupationOther: '',
  applicantTraditionalOccupation: 'शेती',
  applicantTraditionalOccupationOther: '',

  fatherName: '',
  fatherAddress: '',
  isFatherAlive: true,
  fatherLastResidenceIfDeceased: '',
  fatherCurrentOccupation: 'शेती',
  fatherCurrentOccupationOther: '',
  fatherTraditionalOccupation: 'शेती',
  fatherTraditionalOccupationOther: '',

  casteCategory: 'अनुसूचित जमाती (ST)',
  tribeName: 'कोकणा',
  subTribe: 'कोकणी',
  motherTongue: 'मराठी',
  motherTongueOther: '',
  spokenDialect: 'कोकणी',
  spokenDialectOther: '',

  originalVillage: '',
  originalTaluka: 'बागलाण',
  originalDistrict: 'नाशिक',
  residence1950Place: 'ता. बागलाण, जि. नाशिक',

  livingInOtherVillage: false,
  otherVillageName: '',
  yearLeftOriginalVillage: '',
  reasonLeftOriginalVillage: 'शिक्षण',
  reasonLivingCurrentVillage: 'शिक्षण',
  birthPlace: '',

  primarySchoolName: '',
  primarySchoolVillageTalukaDist: 'ता. बागलाण, जि. नाशिक',
  secondarySchoolName: '',
  secondarySchoolVillageTalukaDist: 'ता. बागलाण, जि. नाशिक',

  proofBirthRegister: 'होय',
  proofSchoolAdmissionRegister: 'होय',
  proofSchoolLeavingCert: 'होय',
  proof1950Residence: 'होय',
  proofServiceBookRecord: 'नाही',
  proofScrutinyValidityCert: 'होय',
  proofRevenueGramPanchayatRecord: 'होय',
  proofOtherWrittenEvidence: 'नाही',

  relativeVillages: '',
  deityNames: '',
  convertedDeityNames: 'लागू नाही',

  fatherAncestorOriginalVillage: 'ता. बागलाण, जि. नाशिक',
  hasOriginalVillageProof: 'होय',
  hasGovtBenefitsOrCert: 'नाही',
  affidavitFormA1Attached: 'होय',
  hasPreviousApplication: 'नाही',
  previousApplicationDetails: '',
  hasRelativeValidityCert: 'होय',
  relativeValidityDetails: '',

  declarationPlace: 'बागलाण',
  customDate: '',
  isAutoDateEnabled: true,

  applicantReligion: 'हिंदू',
  hasAppliedOtherState: 'नाही',
  hasReceivedOtherStateCert: 'नाही',
  relativeWithValidityName: '',
  relativeWithValidityRelation: '',

  nameDiscrepancyPerson: 'माझे',
  oldNameOnLC: '',
  newNameOfficial: '',

  vanshaval: {
    greatGreatGrandfather: '',
    greatGrandfather: '',
    grandfather: '',
    father: '',
    uncles: [],
    applicant: '',
    siblings: [],
    cousins: []
  },

  witnessName: '',
  witnessAddress: '',
  witnessSignatureUrl: '',

  applicantPhotoUrl: '',
  applicantSignatureUrl: '',
  fatherSignatureUrl: '',
  fatherNameAsGuardian: '',

  incomeFamilyMembersCount: 4,
  incomeLandHectare: '१.५०',
  hasLand: true,
  incomeYears: ['२०२३', '२०२४', '२०२५'],
  incomeRows: DEFAULT_INCOME_ROWS,
  incomePurpose: 'शैक्षणिक/शासकीय/प्रकरण कामी'
};

export const DEMO_FORM_DATA: STFormData = {
  ...EMPTY_FORM_DATA,
  centerName: 'श्री गणेश आपले सरकार सेवा केंद्र',
  centerAddress: 'मुख्य बाजारपेठ, सटाणा ता. बागलाण, जि. नाशिक',
  centerContact: '९८२२xxxxxx',

  applicantName: 'प्रशांत रामदास भोये',
  currentAddress: 'मु. पो. अंबासन, ता. बागलाण, जि. नाशिक',
  village: 'अंबासन',
  taluka: 'बागलाण',
  district: 'नाशिक',
  postOffice: 'अंबासन',
  birthDate: '2005-04-12',
  age: 19,
  aadhaarNumber: '४५८७ ९६३२ १५४१',

  fatherName: 'रामदास यशवंत भोये',
  fatherAddress: 'मु. पो. अंबासन, ता. बागलाण, जि. नाशिक',

  tribeName: 'कोकणा',
  subTribe: 'कोकणी',
  originalVillage: 'अंबासन',
  residence1950Place: 'मु. पो. अंबासन, ता. बागलाण, जि. नाशिक',
  birthPlace: 'अंबासन, ता. बागलाण, जि. नाशिक',

  primarySchoolName: 'जि. प. प्राथमिक शाळा, अंबासन',
  primarySchoolVillageTalukaDist: 'अंबासन, ता. बागलाण, जि. नाशिक',
  secondarySchoolName: 'जनता माध्यमिक व उच्च माध्यमिक विद्यालय, अंबासन',
  secondarySchoolVillageTalukaDist: 'अंबासन, ता. बागलाण, जि. नाशिक',

  relativeVillages: 'डांगसौंदाणे, मुल्हेर, वीरगाव, नामपूर, ताहराबाद',
  deityNames: 'कणसरा माता, भवानी माता, डोंगरदेव, नारंदेव',
  fatherAncestorOriginalVillage: 'मु. पो. अंबासन, ता. बागलाण, जि. नाशिक',

  vanshaval: {
    greatGreatGrandfather: 'धोंडू भोये',
    greatGrandfather: 'लक्ष्मण धोंडू भोये',
    grandfather: 'यशवंत लक्ष्मण भोये',
    father: 'रामदास यशवंत भोये',
    uncles: ['सोमनाथ यशवंत भोये (काका)', 'दिलीप यशवंत भोये (काका)'],
    applicant: 'प्रशांत रामदास भोये (अर्जदार)',
    siblings: ['किरण रामदास भोये (भाऊ)', 'रोहिणी रामदास भोये (बहीण)'],
    cousins: ['अमोल सोमनाथ भोये (चुलत भाऊ)']
  },

  witnessName: 'ज्ञानेश्वर बाबुराव मोरे',
  witnessAddress: 'रा. अंबासन, ता. बागलाण',
  fatherNameAsGuardian: 'रामदास यशवंत भोये',

  incomeFamilyMembersCount: 4,
  incomeLandHectare: '२.२०',
  hasLand: true,
  incomeRows: DEFAULT_INCOME_ROWS,

  // Default PAN Card 49A photo & signature positioning
  panFormType: 'NEW_49A',
  panPdfFileName: 'A125752330_PAN_Form.pdf',
  panPage1ImageUrl: '/assets/aistudio/pan_page_1.png',
  panPage2ImageUrl: '/assets/aistudio/pan_page_2.png',
  panCrossSignEnabled: true,
  panPhoto1X: 4.8,
  panPhoto1Y: 13.5,
  panPhoto1Width: 14.5,
  panPhoto1Height: 13.2,
  panPhoto2X: 80.8,
  panPhoto2Y: 13.5,
  panPhoto2Width: 14.5,
  panPhoto2Height: 13.2,
  panSignPage2X: 57.5,
  panSignPage2Y: 90.2,
  panSignPage2Width: 35.5,
  panSignPage2Height: 4.8
};
