import { STFormData } from '../types/form';

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

export const EMPTY_FORM_DATA: STFormData = {
  centerName: 'आपले सरकार सेवा केंद्र',
  centerAddress: 'ता. बागलाण, जि. नाशिक',
  centerLogoUrl: '',
  centerContact: '',

  subDivisionalOffice: 'बागलाण',
  subDivisionPlace: 'बागलाण',

  applicantName: '',
  currentAddress: '',
  village: '',
  taluka: 'बागलाण',
  district: 'नाशिक',
  postOffice: '',
  gender: 'पुरुष',
  birthDate: '',
  age: 19,
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
  fatherNameAsGuardian: ''
};

export const DEMO_FORM_DATA: STFormData = {
  centerName: 'श्री गणेश आपले सरकार सेवा केंद्र',
  centerAddress: 'मुख्य बाजारपेठ, सटाणा ता. बागलाण, जि. नाशिक',
  centerLogoUrl: '',
  centerContact: '९८२२xxxxxx',

  subDivisionalOffice: 'बागलाण',
  subDivisionPlace: 'बागलाण',

  applicantName: 'प्रशांत रामदास भोये',
  currentAddress: 'मु. पो. अंबासन, ता. बागलाण, जि. नाशिक',
  village: 'अंबासन',
  taluka: 'बागलाण',
  district: 'नाशिक',
  postOffice: 'अंबासन',
  gender: 'पुरुष',
  birthDate: '2005-04-12',
  age: 19,
  applicantCurrentOccupation: 'शिक्षण',
  applicantCurrentOccupationOther: '',
  applicantTraditionalOccupation: 'शेती',
  applicantTraditionalOccupationOther: '',

  fatherName: 'रामदास यशवंत भोये',
  fatherAddress: 'मु. पो. अंबासन, ता. बागलाण, जि. नाशिक',
  isFatherAlive: true,
  fatherLastResidenceIfDeceased: '',
  fatherCurrentOccupation: 'शेती',
  fatherCurrentOccupationOther: '',
  fatherTraditionalOccupation: 'शेती',
  fatherTraditionalOccupationOther: '',

  tribeName: 'कोकणा',
  subTribe: 'कोकणी',
  motherTongue: 'मराठी',
  motherTongueOther: '',
  spokenDialect: 'कोकणी',
  spokenDialectOther: '',

  originalVillage: 'अंबासन',
  originalTaluka: 'बागलाण',
  originalDistrict: 'नाशिक',
  residence1950Place: 'मु. पो. अंबासन, ता. बागलाण, जि. नाशिक',

  livingInOtherVillage: false,
  otherVillageName: '',
  yearLeftOriginalVillage: '',
  reasonLeftOriginalVillage: 'शिक्षण',
  reasonLivingCurrentVillage: 'शिक्षण',
  birthPlace: 'अंबासन, ता. बागलाण, जि. नाशिक',

  primarySchoolName: 'जि. प. प्राथमिक शाळा, अंबासन',
  primarySchoolVillageTalukaDist: 'अंबासन, ता. बागलाण, जि. नाशिक',
  secondarySchoolName: 'जनता माध्यमिक व उच्च माध्यमिक विद्यालय, अंबासन',
  secondarySchoolVillageTalukaDist: 'अंबासन, ता. बागलाण, जि. नाशिक',

  proofBirthRegister: 'होय',
  proofSchoolAdmissionRegister: 'होय',
  proofSchoolLeavingCert: 'होय',
  proof1950Residence: 'होय',
  proofServiceBookRecord: 'नाही',
  proofScrutinyValidityCert: 'होय',
  proofRevenueGramPanchayatRecord: 'होय',
  proofOtherWrittenEvidence: 'होय',

  relativeVillages: 'डांगसौंदाणे, मुल्हेर, वीरगाव, नामपूर, ताहराबाद',
  deityNames: 'कणसरा माता, भवानी माता, डोंगरदेव, नारंदेव',
  convertedDeityNames: 'लागू नाही (मूळ हिंदू अनुसूचित जमाती)',

  fatherAncestorOriginalVillage: 'मु. पो. अंबासन, ता. बागलाण, जि. नाशिक',
  hasOriginalVillageProof: 'होय',
  hasGovtBenefitsOrCert: 'नाही',
  affidavitFormA1Attached: 'होय',
  hasPreviousApplication: 'नाही',
  previousApplicationDetails: '',
  hasRelativeValidityCert: 'होय',
  relativeValidityDetails: 'काका श्री. सोमनाथ यशवंत भोये यांना पडताळणी समिती नाशिक यांनी दिलेले वैधता प्रमाणपत्र क्र. ६५४३/२०२१',

  declarationPlace: 'बागलाण',
  customDate: '',
  isAutoDateEnabled: true,

  applicantReligion: 'हिंदू',
  hasAppliedOtherState: 'नाही',
  hasReceivedOtherStateCert: 'नाही',
  relativeWithValidityName: 'सोमनाथ यशवंत भोये',
  relativeWithValidityRelation: 'चुलते (काका)',

  nameDiscrepancyPerson: 'वडिलांच्या',
  oldNameOnLC: 'रामदास यशवंत भिल्ल',
  newNameOfficial: 'रामदास यशवंत भोये',

  vanshaval: {
    greatGreatGrandfather: 'धोंडू भोये',
    greatGrandfather: 'लक्ष्मण धोंडू भोये',
    grandfather: 'यशवंत लक्ष्मण भोये',
    father: 'रामदास यशवंत भोये',
    uncles: ['सोमनाथ यशवंत भोये (काका)', 'दिलीप यशवंत भोये (काका)'],
    applicant: 'प्रशांत रामदास भोये (अर्जदार)',
    siblings: ['किरण रामदास भोये (भाऊ)', 'रोहिणी रामदास भोये (बहीण)'],
    cousins: ['अमोल सोमनाथ भोये (चुलत भाऊ)', 'संदीप सोमनाथ भोये (चुलत भाऊ)']
  },

  witnessName: 'ज्ञानेश्वर बाबुराव मोरे',
  witnessAddress: 'रा. अंबासन, ता. बागलाण',
  witnessSignatureUrl: '',

  applicantPhotoUrl: '',
  applicantSignatureUrl: '',
  fatherSignatureUrl: '',
  fatherNameAsGuardian: 'रामदास यशवंत भोये'
};
