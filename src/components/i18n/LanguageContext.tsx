"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "hi" | "te";

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇺🇸" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी (Hindi)", flag: "🇮🇳" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు (Telugu)", flag: "🇮🇳" },
];

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Brand & Navbar
  brandName: {
    en: "Hair Line Detector",
    hi: "हेयर लाइन डिटेक्टर",
    te: "హెయిర్ లైన్ డిటెక్టర్",
  },
  brandSubtitle: {
    en: "Hairline Analyzer",
    hi: "हेयरलाइन विश्लेषक",
    te: "హెయిర్‌లైన్ ఎనలైజర్",
  },
  navHome: {
    en: "Home",
    hi: "होम",
    te: "హోమ్",
  },
  navProducts: {
    en: "Hair Products",
    hi: "हेयर उत्पाद",
    te: "హెయిర్ ఉత్పత్తులు",
  },
  navAnalyzer: {
    en: "Hairline Analyzer",
    hi: "हेयरलाइन विश्लेषक",
    te: "హెయిర్‌లైన్ ఎనలైజర్",
  },
  navSample: {
    en: "Sample Scan",
    hi: "नमूना स्कैन",
    te: "నమూనా స్కాన్",
  },
  launchAnalyzer: {
    en: "Launch Analyzer",
    hi: "स्कैनर शुरू करें",
    te: "ఎనలైజర్ ప్రారంభించండి",
  },
  languageLabel: {
    en: "Language",
    hi: "भाषा",
    te: "భాష",
  },
  directUploadTitle: {
    en: "Direct Photo Upload",
    hi: "सीधे फोटो अपलोड करें",
    te: "నేరుగా ఫోటో అప్‌లోడ్",
  },
  directUploadDesc: {
    en: "Upload your forehead photo to scan immediately without any questions",
    hi: "बिना किसी सवाल के तुरंत स्कैन करने के लिए अपने माथे की फोटो अपलोड करें",
    te: "ఎలాంటి ప్రశ్నలు లేకుండా వెంటనే స్కాన్ చేయడానికి మీ నుదిటి ఫోటోను అప్‌లోడ్ చేయండి",
  },
  btnDirectUpload: {
    en: "Upload Photo Directly",
    hi: "सीधे फोटो अपलोड करें",
    te: "నేరుగా ఫోటో అప్‌లోడ్",
  },
  btnTakePhoto: {
    en: "Take Photo (Camera)",
    hi: "कैमरे से फोटो लें",
    te: "కెమెరాతో ఫోటో తీయండి",
  },
  dragOrClick: {
    en: "Drag and drop your photo here or click to browse",
    hi: "अपनी फोटो यहाँ खींचकर छोड़ें या चुनने के लिए क्लिक करें",
    te: "మీ ఫోటోను ఇక్కడ లాగి వదలండి లేదా ఎంచుకోవడానికి క్లిక్ చేయండి",
  },

  // Home Page
  heroBadge: {
    en: "HAIR LINE DETECTOR • PRECISION ANALYZER",
    hi: "हेयर लाइन डिटेक्टर • सटीक विश्लेषक",
    te: "హెయిర్ లైన్ డిటెక్టర్ • ఖచ్చితమైన ఎనలైజర్",
  },
  heroTitle: {
    en: "Check your hairline easily with red contour detection.",
    hi: "लाल रेखा से आसानी से अपनी हेयरलाइन की जांच करें।",
    te: "ఎరుపు లైన్ కాంటూర్ గుర్తింపుతో మీ హెయిర్‌లైన్‌ను సులభంగా తనిఖీ చేయండి.",
  },
  heroDescription: {
    en: "Take or upload a front photo showing your forehead. Our analyzer highlights your hairline with a clear red line, checks corner dips, and explains everything in simple words.",
    hi: "अपने माथे की सामने से फोटो लें या अपलोड करें। हमारा विश्लेषक आपकी हेयरलाइन को एक साफ लाल रेखा से दिखाता है और आसान शब्दों में समझाता है।",
    te: "మీ నుదిటిని చూపే ముందు ఫోటోను తీయండి లేదా అప్‌లోడ్ చేయండి. మా ఎనలైజర్ మీ హెయిర్‌లైన్‌ను స్పష్టమైన ఎరుపు గీతతో చూపిస్తుంది మరియు సరళమైన పదాలలో వివరిస్తుంది.",
  },
  btnSampleScan: {
    en: "View Sample Result",
    hi: "नमूना परिणाम देखें",
    te: "నమూనా ఫలితం చూడండి",
  },
  privacyPill1: {
    en: "100% Client-Side Scan",
    hi: "100% सुरक्षित स्कैन",
    te: "100% సురక్షిత స్కాన్",
  },
  privacyPill2: {
    en: "No Photo Uploads to Server",
    hi: "फोटो सर्वर पर नहीं जाती",
    te: "ఫోటోలు సర్వర్‌కు వెళ్లవు",
  },

  // How It Works Steps
  howItWorksTitle: {
    en: "3 Easy Steps to Check Your Hairline",
    hi: "हेयरलाइन जांचने के 3 आसान चरण",
    te: "మీ హెయిర్‌లైన్ తనిఖీ చేయడానికి 3 సులభమైన దశలు",
  },
  howStep1Title: {
    en: "1. Take or Upload Front Photo",
    hi: "1. सामने से फोटो लें या अपलोड करें",
    te: "1. ముందు నుండి ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి",
  },
  howStep1Desc: {
    en: "Make sure your full forehead and both side temple corners are visible.",
    hi: "ध्यान रखें कि पूरा माथा और दोनों कोने साफ दिखाई दें।",
    te: "మీ పూర్తి నుదిటి మరియు రెండు కణతల మూలలు స్పష్టంగా కనిపించేలా చూసుకోండి.",
  },
  howStep2Title: {
    en: "2. Red Contour Auto-Detection",
    hi: "2. लाल रेखा से अपने आप पहचान",
    te: "2. ఎరుపు గీత ఆటోమేటిక్ గుర్తింపు",
  },
  howStep2Desc: {
    en: "Our algorithm marks where your hairline begins and highlights any corner changes.",
    hi: "सिस्टम अपने आप मापेगा कि बाल कहाँ से शुरू होते हैं और कोनों में क्या अंतर है।",
    te: "మా సిస్టమ్ మీ హెయిర్‌లైన్ ఎక్కడ ప్రారంభమవుతుందో గుర్తించి మూలల మార్పులను చూపిస్తుంది.",
  },
  howStep3Title: {
    en: "3. Read Your Simple Summary",
    hi: "3. आसान शब्दों में अपनी रिपोर्ट पढ़ें",
    te: "3. మీ సులభమైన నివేదికను చదవండి",
  },
  howStep3Desc: {
    en: "Get a clear, honest explanation with natural home remedies and daily tips.",
    hi: "बिना किसी कठिन शब्दों के आसान परिणाम और प्राकृतिक घरेलू उपाय जानें।",
    te: "కష్టమైన పదాలు లేకుండా సులభమైన వివరణ, సహజ నివారణలు మరియు చిట్కాలను పొందండి.",
  },

  // Upload Page
  uploadPageTitle: {
    en: "Check Your Hairline",
    hi: "अपनी हेयरलाइन की जांच करें",
    te: "మీ హెయిర్‌లైన్‌ను తనిఖీ చేయండి",
  },
  uploadPageSubtitle: {
    en: "Upload or take a front photo with forehead clearly visible",
    hi: "माथा साफ दिखने वाली सामने की फोटो अपलोड करें या कैमरे से लें",
    te: "నుదిటి స్పష్టంగా కనిపించేలా ముందు ఫోటోను అప్‌లోడ్ చేయండి లేదా తీయండి",
  },
  dropzoneTitle: {
    en: "Select or Drop Forehead Photo",
    hi: "माथे की फोटो चुनें या यहाँ खींचें",
    te: "నుదిటి ఫోటోను ఎంచుకోండి లేదా లాగి వదలండి",
  },
  dropzoneSub: {
    en: "Supported formats: JPG, PNG, WebP (Max 10MB)",
    hi: "समर्थित प्रारूप: JPG, PNG, WebP (अधिकतम 10MB)",
    te: "మద్దతు గల ఫార్మాట్లు: JPG, PNG, WebP (గరిష్టంగా 10MB)",
  },
  btnChooseFile: {
    en: "Choose Photo",
    hi: "फोटो चुनें",
    te: "ఫోటోను ఎంచుకోండి",
  },
  photoTipsTitle: {
    en: "Quick Photo Tips for Best Result",
    hi: "अच्छे परिणाम के लिए जरूरी टिप्स",
    te: "మంచి ఫలితం కోసం ముఖ్యమైన చిట్కాలు",
  },
  tip1: {
    en: "Pull or comb hair back to show full forehead and side corners",
    hi: "माथा और दोनों कोने पूरी तरह दिखने के लिए बालों को पीछे करें",
    te: "నుదిటి మరియు రెండు మూలలు పూర్తిగా కనిపించేలా జుట్టును వెనక్కి దువ్వండి",
  },
  tip2: {
    en: "Face the light directly so there are no dark shadows",
    hi: "रोशनी की तरफ मुंह रखें ताकि चेहरे पर अंधेरा न रहे",
    te: "ముఖంపై నీడలు పడకుండా నేరుగా వెలుతురు వైపు చూడండి",
  },
  tip3: {
    en: "Look straight into the camera at eye level",
    hi: "कैमरे में सीधे सामने की तरफ देखें",
    te: "కంటి మట్టంలో కెమెరాలోకి నేరుగా చూడండి",
  },

  // Scanning State
  scanningTitle: {
    en: "Analyzing Your Hairline...",
    hi: "आपकी हेयरलाइन का विश्लेषण हो रहा है...",
    te: "మీ హెయిర్‌లైన్‌ను విశ్లేషిస్తోంది...",
  },
  scanningSub: {
    en: "Tracing red contours and measuring corner curves...",
    hi: "लाल रेखा से हेयरलाइन की पहचान और कोनों की माप की जा रही है...",
    te: "ఎరుపు గీతతో హెయిర్‌లైన్ గుర్తింపు మరియు మూలల కొలత...",
  },

  // Results Page
  resultsTitle: {
    en: "Your Hairline Analysis Review",
    hi: "आपकी हेयरलाइन रिपोर्ट",
    te: "మీ హెయిర్‌లైన్ విశ్లేషణ నివేదిక",
  },
  resultsSubtitle: {
    en: "Clear, simple explanations of what your scan shows.",
    hi: "आपकी रिपोर्ट का आसान और स्पष्ट विवरण।",
    te: "మీ స్కాన్ ఫలితాల స్పష్టమైన, సరళమైన వివరణ.",
  },
  easyNoticeTitle: {
    en: "A Quick, Honest Note",
    hi: "एक छोटी और सच्ची बात",
    te: "ఒక చిన్న, నిజాయితీ గమనిక",
  },
  easyNoticeText: {
    en: "This scan is a visual guide based on a single photo, not a medical diagnosis. For persistent thinning, itching, or sudden hair loss, please consult a dermatologist or trichologist.",
    hi: "यह स्कैन एक फोटो पर आधारित दृश्य मार्गदर्शन है, चिकित्सीय निदान नहीं। लगातार बाल पतले होने, खुजली या अचानक बाल झड़ने पर त्वचा या बाल विशेषज्ञ से सलाह लें।",
    te: "ఈ స్కాన్ ఒక ఫోటో ఆధారంగా చేసిన దృశ్య మార్గదర్శనం మాత్రమే, వైద్య నిర్ధారణ కాదు. నిరంతర జుట్టు సన్నబడటం, దురద లేదా అకస్మాత్తుగా జుట్టు రాలడం ఉంటే చర్మవ్యాధి నిపుణుడిని సంప్రదించండి.",
  },
  photoViewerTitle: {
    en: "Your Photo with Red Line Indicator",
    hi: "लाल रेखा के साथ आपकी फोटो",
    te: "ఎరుపు గీత గుర్తింపుతో మీ ఫోటో",
  },
  photoViewerSub: {
    en: "The bright red line traces where your hairline begins. Move the slider to see before and after.",
    hi: "लाल रेखा दिखाती है कि आपके बाल कहाँ से शुरू होते हैं। स्लाइडर से पहले और बाद का फर्क देखें।",
    te: "ఎరుపు గీత మీ జుట్టు ఎక్కడ మొదలవుతుందో చూపిస్తుంది. స్లైడర్‌ను జరిపి తేడాను చూడండి.",
  },
  overallStatusLabel: {
    en: "OVERALL HAIRLINE STATUS",
    hi: "हेयरलाइन की स्थिति",
    te: "మొత్తం హెయిర్‌లైన్ పరిస్థితి",
  },
  confidenceLabel: {
    en: "Scan Match Quality",
    hi: "स्कैन स्पष्टता",
    te: "స్కాన్ స్పష్టత నాణ్యత",
  },
  photoQualityGood: {
    en: "Photo quality looks good — lighting and alignment are clear enough for a reliable visual read.",
    hi: "फोटो की गुणवत्ता अच्छी है — रोशनी और संरेखण भरोसेमंद दृश्य विश्लेषण के लिए पर्याप्त साफ हैं।",
    te: "ఫోటో నాణ్యత బాగుంది — విశ్వసనీయ దృశ్య విశ్లేషణకు లైటింగ్ మరియు అమరిక స్పష్టంగా ఉన్నాయి.",
  },
  simpleSummaryHeader: {
    en: "What This Means in Plain Words:",
    hi: "आसान शब्दों में इसका क्या मतलब है:",
    te: "సాధారణ పదాలలో దీని అర్థం:",
  },
  measurementsSectionTitle: {
    en: "Measurements Made Simple",
    hi: "माप - आसान शब्दों में",
    te: "కొలతలు - సులభమైన పదాలలో",
  },
  foreheadBalanceLabel: {
    en: "Forehead Height Balance",
    hi: "माथे की ऊंचाई का संतुलन",
    te: "నుదిటి ఎత్తు సమతుల్యత",
  },
  foreheadBalanceValue: {
    en: "Normal & Balanced",
    hi: "सामान्य और संतुलित",
    te: "సాధారణం & సమతుల్యం",
  },
  foreheadBalanceDesc: {
    en: "Your forehead takes up about 1/3 of your face, which is standard for healthy adults.",
    hi: "आपका माथा चेहरे का लगभग एक तिहाई हिस्सा है, जो पूरी तरह सामान्य और स्वस्थ है।",
    te: "మీ నుదిటి ముఖంలో దాదాపు 1/3 వంతు ఉంది, ఇది ఆరోగ్యకరమైన పెద్దలకు సహజం.",
  },
  symmetryLabel: {
    en: "Left vs. Right Corner Symmetry",
    hi: "दाएं और बाएं कोने की समानता",
    te: "ఎడమ & కుడి మూలల సమతుల్యత",
  },
  symmetryValue: {
    en: "96% Even & Symmetric",
    hi: "96% एक समान और बराबर",
    te: "96% సమానంగా ఉంది",
  },
  symmetryDesc: {
    en: "Both sides of your hairline match each other very evenly.",
    hi: "आपके बालों के दोनों कोने लगभग एक जैसे और संतुलित हैं।",
    te: "మీ హెయిర్‌లైన్ యొక్క రెండు వైపులా సమానంగా సరిపోలుతున్నాయి.",
  },
  leftTempleLabel: {
    en: "Left Corner Angle",
    hi: "बायां कोना (टेंपल)",
    te: "ఎడమ మూల కోణం",
  },
  rightTempleLabel: {
    en: "Right Corner Angle",
    hi: "दायां कोना (टेंपल)",
    te: "కుడి మూల కోణం",
  },
  naturalCurve: {
    en: "Natural Gentle Curve",
    hi: "स्वाभाविक हल्का घुमाव",
    te: "సహజమైన తేలికపాటి వంపు",
  },
  templeCheckTitle: {
    en: "Side Corners (Temples) Check",
    hi: "दोनों कोनों (कनपटी) की जांच",
    te: "రెండు మూలల (కణతల) తనిఖీ",
  },
  leftSide: {
    en: "Left Temple Corner",
    hi: "बायां कोना",
    te: "ఎడమ కణత మూల",
  },
  rightSide: {
    en: "Right Temple Corner",
    hi: "दायां कोना",
    te: "కుడి కణత మూల",
  },
  mildRecessionSimple: {
    en: "Mild mature corner dip (Normal for adults)",
    hi: "हल्का सामान्य घुमाव (वयस्कों के लिए सामान्य)",
    te: "తేలికపాటి సహజ వంపు (పెద్దలకు సాధారణం)",
  },
  leftSideSimpleNotes: {
    en: "Your left corner has a slight natural curve back. The hair roots nearby look healthy and full.",
    hi: "आपके बाएं कोने में हल्का सा प्राकृतिक घुमाव है। आसपास के बालों की जड़ें मजबूत और घनी दिखती हैं।",
    te: "మీ ఎడమ మూలలో కొద్దిగా సహజమైన వంపు ఉంది. సమీపంలోని జుట్టు మూలాలు బలంగా, ఒత్తుగా కనిపిస్తున్నాయి.",
  },
  rightSideSimpleNotes: {
    en: "Your right corner closely matches your left side with steady density along the border.",
    hi: "आपका दायां कोना बाएं कोने से काफी मिलता-जुलता है और किनारे पर बालों का घनत्व अच्छा है।",
    te: "మీ కుడి మూల ఎడమ వైపుతో సమానంగా ఉంది మరియు అంచున జుట్టు సాంద్రత బాగుంది.",
  },

  // Daily Habits
  dailyHabitsTitle: {
    en: "Simple Daily Tips for Stronger Hair",
    hi: "मजबूत बालों के लिए आसान दैनिक सुझाव",
    te: "బలమైన జుట్టు కోసం సులభమైన రోజువారీ చిట్కాలు",
  },
  habit1Title: {
    en: "Gentle Fingertip Scalp Massage",
    hi: "उंगलियों से हल्के हाथों से सिर की मालिश",
    te: "వేళ్ళతో సున్నితంగా మాడు మర్దన",
  },
  habit1Desc: {
    en: "Spend 3-4 minutes gently rubbing your temples in small circles with your fingertips. This boosts blood flow to your hair roots.",
    hi: "रोज 3-4 मिनट उंगलियों के पोरों से कनपटी और माथे के पास हल्के गोल-गोल मालिश करें। इससे बालों की जड़ों में खून का बहाव बढ़ता है।",
    te: "రోజుకు 3-4 నిమిషాలు వేళ్ళతో కణతలు, నుదిటి వద్ద సున్నితంగా వృత్తాకారంలో మర్దన చేయండి. ఇది జుట్టు మూలాలకు రక్తప్రసరణను పెంచుతుంది.",
  },
  habit1Freq: {
    en: "Daily (Before bed or in morning)",
    hi: "रोजाना (सोने से पहले या सुबह)",
    te: "రోజూ (పడుకునే ముందు లేదా ఉదయం)",
  },
  habit2Title: {
    en: "Avoid Pulling or Tight Hairstyles",
    hi: "बालों को कसकर न बांधें या पीछे न खींचें",
    te: "జుట్టును గట్టిగా లాగడం లేదా బిగుతుగా కట్టడం మానుకోండి",
  },
  habit2Desc: {
    en: "Avoid tight caps, hard combing backward, or tight rubber bands that pull on your front hairline roots.",
    hi: "बालों को बहुत कसकर पीछे खींचने, टाइट कैप पहनने या जोर से कंघी करने से बचें ताकि सामने की जड़ों पर खिंचाव न पड़े।",
    te: "ముందు జుట్టు మూలాలపై ఒత్తిడి పడకుండా బిగుతుగా ఉండే టోపీలు, గట్టిగా దువ్వడం లేదా బిగుతైన బ్యాండ్లు వాడకండి.",
  },
  habit2Freq: {
    en: "Everyday habit",
    hi: "हमेशा ध्यान रखें",
    te: "రోజూ పాటించాల్సిన అలవాటు",
  },
  habit3Title: {
    en: "Wash Gently with Lukewarm Water",
    hi: "हल्के गुनगुने पानी और सौम्य शैम्पू से धोएं",
    te: "గోరువెచ్చని నీటితో సున్నితంగా కడగండి",
  },
  habit3Desc: {
    en: "Do not use very hot water on your scalp. Pat dry with a soft towel instead of rough rubbing.",
    hi: "सिर पर बहुत गर्म पानी न डालें। बाल धोने के बाद तौलिये से जोर से रगड़ने के बजाय हल्के हाथ से सुखाएं।",
    te: "తలస్నానానికి వేడి నీటిని వాడకండి. తల తుడిచేటప్పుడు గట్టిగా రుద్దకుండా మెత్తని టవల్‌తో అద్దండి.",
  },
  habit3Freq: {
    en: "2-3 times a week",
    hi: "हफ्ते में 2-3 बार",
    te: "వారానికి 2-3 సార్లు",
  },

  // Home Remedies
  remediesTitle: {
    en: "Easy Kitchen & Natural Remedies (Do at Home)",
    hi: "आसान घरेलू और प्राकृतिक उपाय (घर पर बनाएं)",
    te: "సులభమైన సహజ & ఇంటి నివారణలు",
  },
  remediesSubtitle: {
    en: "Simple, safe traditional methods to nourish your roots without chemicals.",
    hi: "बिना किसी केमिकल के बालों की जड़ों को पोषण देने के आसान और सुरक्षित तरीके।",
    te: "రసాయనాలు లేకుండా జుట్టు మూలాలకు పోషణ అందించే సహజ పద్ధతులు.",
  },
  onionTitle: {
    en: "Fresh Onion Juice (Ulli Rasam)",
    hi: "ताजा प्याज का रस",
    te: "తాజా ఉల్లిపాయ రసం",
  },
  onionSub: {
    en: "Natural Sulfur to Wake Up Dormant Roots",
    hi: "जड़ों को सक्रिय करने के लिए प्राकृतिक सल्फर",
    te: "నిద్రాణమైన మూలాలను మేల్కొల్పే సహజ సల్ఫర్",
  },
  onionSteps: {
    en: "1. Grate or blend half an onion and squeeze out the juice. 2. Dab gently on your temple corners with cotton. 3. Leave for 20-30 minutes, then wash with mild shampoo.",
    hi: "1. आधा प्याज घिसकर या पीसकर रस निचोड़ लें। 2. रुई की मदद से माथे और कोनों पर लगाएं। 3. 20-30 मिनट रखें, फिर सौम्य शैम्पू से धो लें।",
    te: "1. సగం ఉల్లిపాయను తురిమి రసం తీయండి. 2. దూదితో కణతల వద్ద సున్నితంగా రాయండి. 3. 20-30 నిమిషాలు ఉంచి, తర్వాత మైల్డ్ షాంపూతో కడగండి.",
  },
  onionWhy: {
    en: "Onions are rich in natural sulfur which helps build keratin protein in hair strands.",
    hi: "प्याज में प्राकृतिक सल्फर होता है जो बालों की जड़ों को मजबूत और नया बनाने में मदद करता है।",
    te: "ఉల్లిపాయలో ఉండే సహజ సల్ఫర్ జుట్టు మూలాలను బలంగా మార్చడానికి సహాయపడుతుంది.",
  },
  oilTitle: {
    en: "Warm Coconut & Rosemary / Amla Oil",
    hi: "गुनगुना नारियल और आंवला / रोजमेरी तेल",
    te: "గోరువెచ్చని కొబ్బరి నూనె & ఉసిరి / రోజ్మేరీ",
  },
  oilSub: {
    en: "Deep Nourishment & Root Strength",
    hi: "जड़ों को गहराई से पोषण और मजबूती",
    te: "జుట్టు మూలాలకు లోతైన పోషణ",
  },
  oilSteps: {
    en: "1. Warm 2 spoons of pure coconut oil. 2. Add 2 drops of rosemary oil or pure amla. 3. Massage into hairline at bedtime and wash next morning.",
    hi: "1. दो चम्मच नारियल का तेल हल्का गुनगुना करें। 2. इसमें थोड़ा आंवला तेल या 2 बूंद रोजमेरी तेल मिलाएं। 3. रात को सोने से पहले हल्के हाथ से लगाएं और सुबह धो लें।",
    te: "1. రెండు చెంచాల కొబ్బరి నూనెను గోరువెచ్చగా చేయండి. 2. కొన్ని చుక్కల రోజ్మేరీ లేదా ఉసిరి నూనె కలపండి. 3. రాత్రి వేళ సున్నితంగా రాసి, మరుసటి రోజు ఉదయం కడగండి.",
  },
  oilWhy: {
    en: "Provides fatty acids and antioxidants to keep the scalp hydrated and protect roots.",
    hi: "यह स्कैल्प को नमी देता है और बालों की जड़ों को टूटने से बचाता है।",
    te: "ఇది మాడుకు తేమను ఇచ్చి, జుట్టు మూలాలు రాలిపోకుండా కాపాడుతుంది.",
  },
  fenugreekTitle: {
    en: "Menthulu (Fenugreek Seed) Paste",
    hi: "मेथी दाना पेस्ट (हेयर पैक)",
    te: "మెంతుల పేస్ట్ (హెయిర్ ప్యాక్)",
  },
  fenugreekSub: {
    en: "Natural Protein & Scalp Cooling",
    hi: "प्राकृतिक प्रोटीन और स्कैल्प को ठंडक",
    te: "సహజ ప్రొటీన్ & మాడుకు చలువ",
  },
  fenugreekSteps: {
    en: "1. Soak 2 tablespoons of fenugreek seeds overnight. 2. Grind into a smooth paste with 1 spoon curd. 3. Apply for 30 minutes once a week and rinse.",
    hi: "1. दो चम्मच मेथी दाना रात भर पानी में भिगोएं। 2. सुबह एक चम्मच दही के साथ पीसकर पेस्ट बनाएं। 3. हफ्ते में एक बार 30 मिनट लगाएं और धो लें।",
    te: "1. రెండు చెంచాల మెంతులను రాత్రంతా నానబెట్టండి. 2. ఉదయాన్నే చెంచా పెరుగుతో కలిపి మెత్తగా రుబ్బండి. 3. వారానికి ఒకసారి 30 నిమిషాలు రాసి కడిగేయండి.",
  },
  fenugreekWhy: {
    en: "Fenugreek is full of amino acids and lecithin that repair rough hair texture.",
    hi: "मेथी में अमीनो एसिड और प्राकृतिक प्रोटीन होता है जो बालों को घना और चिकना बनाता है।",
    te: "మెంతులలో ఉండే అమైనో ఆమ్లాలు జుట్టును ఒత్తుగా, మృదువుగా చేయడానికి సహాయపడతాయి.",
  },

  // Action Buttons on Results
  btnSaveReport: {
    en: "Save Report",
    hi: "रिपोर्ट सहेजें",
    te: "రిపోర్ట్ సేవ్ చేయండి",
  },
  btnSaved: {
    en: "Saved Locally ✓",
    hi: "सहेजा गया ✓",
    te: "సేవ్ అయింది ✓",
  },
  btnPrint: {
    en: "Print / PDF",
    hi: "प्रिंट / PDF",
    te: "ప్రింట్ / PDF",
  },
  btnReanalyze: {
    en: "Scan Again",
    hi: "दोबारा स्कैन करें",
    te: "మళ్లీ స్కాన్ చేయండి",
  },

  // Why Hair Lags Behind & How to Overcome It (Simple Matter)
  laggingTitle: {
    en: "Why Hair Lags Behind & How to Overcome It",
    hi: "बाल पीछे क्यों जाते हैं और इन्हें कैसे रोकें",
    te: "జుట్టు ఎందుకు వెనక్కి తగ్గుతుంది & దీన్ని ఎలా అధిగమించాలి",
  },
  laggingSubtitle: {
    en: "Simple, easy explanation without complicated medical terms",
    hi: "बिना किसी कठिन शब्दों के आसान और स्पष्ट समझ",
    te: "కష్టమైన వైద్య పదాలు లేకుండా సులభమైన వివరణ",
  },
  laggingCausesHeader: {
    en: "Why Hair Lags Behind (Recedes)",
    hi: "बाल पीछे क्यों हटने लगते हैं? (कारण)",
    te: "జుట్టు వెనక్కి తగ్గడానికి గల కారణాలు",
  },
  laggingCausesSub: {
    en: "The 4 real reasons front corners move back:",
    hi: "माथे और कोनों के बाल पीछे जाने की 4 मुख्य वजहें:",
    te: "నుదిటి కోణాల వద్ద జుట్టు తగ్గడానికి 4 ముఖ్య కారణాలు:",
  },
  cause1Title: {
    en: "1. Normal Adult Hairline Shift",
    hi: "1. स्वाभाविक वयस्क बदलाव (परिपक्वता)",
    te: "1. సహజమైన పెద్దల మార్పు (మెచ్యూరిటీ)",
  },
  cause1Desc: {
    en: "After teenage years, hair naturally moves back 1–2 cm at the corners into an adult M-shape. This is normal maturity, NOT baldness.",
    hi: "उम्र बढ़ने के साथ कोनों से 1-2 सेमी बाल स्वाभाविक रूप से पीछे होते हैं। यह वयस्क होने की सामान्य प्रक्रिया है, गंजापन नहीं।",
    te: "టీనేజ్ దాటిన తర్వాత నుదిటి మూలల వద్ద 1–2 సెం.మీ జుట్టు వెనక్కి వెళ్లడం సాధారణం. ఇది పెద్దలలో సహజమైన మార్పు, బట్టతల కాదు.",
  },
  cause2Title: {
    en: "2. Tired Hair Roots (Hormone DHT)",
    hi: "2. जड़ों का कमजोर होना (हार्मोन असर)",
    te: "2. మూలాలు బలహీనపడటం (హార్మోన్ ప్రభావం)",
  },
  cause2Desc: {
    en: "Corner roots are more sensitive to natural body hormones. Over time, roots get tired and produce thinner, shorter hair before resting.",
    hi: "माथे के कोनों की जड़ें हार्मोन्स के प्रति संवेदनशील होती हैं। समय के साथ जड़ें थक जाती हैं और बाल पतले होने लगते हैं।",
    te: "నుదిటి మూలల్లోని జుట్టు మూలాలు హార్మోన్ల ప్రభావానికి గురవుతాయి. కాలక్రమేణా మూలాలు బలహీనపడి సన్నని జుట్టును ఉత్పత్తి చేస్తాయి.",
  },
  cause3Title: {
    en: "3. Low Blood Flow & Scalp Tension",
    hi: "3. जड़ों तक खून का धीमा बहाव",
    te: "3. తక్కువ రక్తప్రసరణ & మానసిక ఒత్తిడి",
  },
  cause3Desc: {
    en: "Stress and tight scalp muscles slow down fresh blood flow. Without daily oxygen and nutrients, roots starve and shed early.",
    hi: "तनाव और सिर में खिंचाव के कारण जड़ों तक भरपूर खून और पोषण नहीं पहुंच पाता, जिससे बाल समय से पहले झड़ने लगते हैं।",
    te: "ఒత్తిడి వల్ల జుట్టు మూలాలకు అందే రక్తం, ఆక్సిజన్ మరియు పోషకాలు తగ్గుతాయి, దీనివల్ల జుట్టు త్వరగా రాలిపోతుంది.",
  },
  cause4Title: {
    en: "4. Pulling, Caps & Tight Hairstyles",
    hi: "4. बालों का खिंचाव और टाइट कैप",
    te: "4. జుట్టును లాగడం & బిగుతైన టోపీలు",
  },
  cause4Desc: {
    en: "Wearing tight caps for hours, hard backward combing, or rough towel rubbing pulls fragile front roots right out of their sockets.",
    hi: "लगातार टाइट टोपी पहनना, बालों को कसकर पीछे खींचना या तौलिये से जोर से रगड़ना सामने की कमजोर जड़ों को उखाड़ देता है।",
    te: "గంటల తరబడి బిగుతైన టోపీలు ధరించడం, గట్టిగా వెనక్కి దువ్వడం లేదా టవల్‌తో గట్టిగా రుద్దడం వల్ల ముందు జుట్టు రాలిపోతుంది.",
  },

  overcomeHeader: {
    en: "How to Overcome Hair Recession (Action Plan)",
    hi: "बालों को वापस मजबूत कैसे बनाएं (सरल उपाय)",
    te: "జుట్టు రాలడాన్ని ఎలా అరికట్టాలి (చర్యలు)",
  },
  overcomeSub: {
    en: "Simple everyday steps to protect and wake up your roots:",
    hi: "अपनी जड़ों को सुरक्षित और मजबूत रखने के 4 आसान कदम:",
    te: "మీ జుట్టును కాపాడుకోవడానికి 4 సులభమైన రోజువారీ చిట్కాలు:",
  },
  step1Title: {
    en: "1. Wake Up Roots (Daily 3-Min Massage)",
    hi: "1. जड़ों को जगाएं (3 मिनट हल्की मालिश)",
    te: "1. మూలాలను ఉత్తేజపరచండి (రోజూ 3 నిమిషాల మర్దన)",
  },
  step1Desc: {
    en: "Gently rub your temple corners in circles with your fingertips every night. This immediately sends fresh blood and oxygen to sleeping follicles.",
    hi: "हर रात उंगलियों के पोरों से कोनों पर हल्के गोल-गोल 3 मिनट मालिश करें। इससे सोई हुई जड़ों में खून और ऑक्सीजन पहुंचती है।",
    te: "ప్రతి రాత్రి వేళ్ళతో కణతల వద్ద 3 నిమిషాలు సున్నితంగా మర్దన చేయండి. ఇది నిద్రాణమైన మూలాలకు తక్షణ రక్తప్రసరణను అందిస్తుంది.",
  },
  step2Title: {
    en: "2. Feed Hair from Inside (Diet)",
    hi: "2. अंदर से पोषण दें (आहार)",
    te: "2. మంచి ఆహారం తీసుకోండి (పోషణ)",
  },
  step2Desc: {
    en: "Hair is made of protein. Eat lentils (dal), eggs, paneer/tofu, pumpkin seeds, and green vegetables. Drink plenty of water.",
    hi: "बाल प्रोटीन से बनते हैं। रोज दाल, अंडा, पनीर, कद्दू के बीज, हरी सब्जियां खाएं और पर्याप्त पानी पिएं।",
    te: "జుట్టుకు ప్రొటీన్ అవసరం. రోజూ పప్పులు, గుడ్లు, పనీర్, గుమ్మడి గింజలు మరియు ఆకుకూరలు తినండి. తగినంత నీరు త్రాగండి.",
  },
  step3Title: {
    en: "3. Wash with Lukewarm Water Only",
    hi: "3. गुनगुने या सामान्य पानी से धोएं",
    te: "3. గోరువెచ్చని నీటితో మాత్రమే కడగండి",
  },
  step3Desc: {
    en: "Never use steaming hot water on your scalp. Use gentle shampoo and pat dry softly with a towel—never rub aggressively.",
    hi: "सिर पर बहुत गर्म पानी कभी न डालें। सौम्य शैम्पू इस्तेमाल करें और तौलिये से जोर से रगड़ने के बजाय हल्के हाथ से थपथपाएं।",
    te: "తలస్నానానికి వేడి నీటిని వాడకండి. మైల్డ్ షాంపూని ఉపయోగించండి మరియు టవల్‌తో సున్నితంగా అద్దండి.",
  },
  step4Title: {
    en: "4. Give it 3 to 6 Months (Be Patient)",
    hi: "4. धैर्य रखें (3 से 6 महीने का समय दें)",
    te: "4. ఓపిక పట్టండి (3 నుండి 6 నెలలు సమయం ఇవ్వండి)",
  },
  step4Desc: {
    en: "Hair grows at about 1 cm per month. Consistently follow these habits for 90–180 days to see baby hairs and thicker root density.",
    hi: "बाल महीने में लगभग 1 सेमी ही बढ़ते हैं। इन आसान आदतों को 3 से 6 महीने लगातार अपनाएं, नए बाल और घनापन जरूर दिखेगा।",
    te: "జుట్టు నెలకు దాదాపు 1 సెం.మీ మాత్రమే పెరుగుతుంది. ఈ మంచి అలవాట్లను 90–180 రోజులు స్థిరంగా పాటిస్తే కొత్త జుట్టు మరియు ఒత్తుదనం కనిపిస్తుంది.",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("hair_lang") as Language | null;
    if (stored && (stored === "en" || stored === "hi" || stored === "te")) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("hair_lang", lang);
  };

  const t = (key: string): string => {
    if (TRANSLATIONS[key] && TRANSLATIONS[key][language]) {
      return TRANSLATIONS[key][language];
    }
    if (TRANSLATIONS[key] && TRANSLATIONS[key]["en"]) {
      return TRANSLATIONS[key]["en"];
    }
    return key;
  };

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: "en", setLanguage, t }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
