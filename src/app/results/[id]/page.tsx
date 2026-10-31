"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HairlineAnalysisResult } from "@/types/analysis";
import { HairlineCanvasViewer } from "@/components/analysis/HairlineCanvasViewer";
import { FollicleStorage } from "@/lib/storage";
import { SAMPLE_ANALYSIS, SAMPLE_PRODUCTS } from "@/lib/mock-data";
import { useLanguage } from "@/components/i18n/LanguageContext";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import {
  ShieldAlert,
  Calendar,
  Printer,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  Leaf,
  Info,
  Sliders,
  Heart,
  Droplets,
  HelpCircle,
  ShieldCheck,
  Star,
  ShoppingBag,
  Sparkle,
} from "lucide-react";

export default function ResultsPage() {
  const params = useParams();
  const { t, language } = useLanguage();
  const [analysis, setAnalysis] = useState<HairlineAnalysisResult | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const normalizeResult = (res: HairlineAnalysisResult): HairlineAnalysisResult => {
      const copy = { ...res };
      if (
        !copy.imageUrl ||
        copy.imageUrl.includes("sample-hairline-hero") ||
        copy.imageUrl.includes("sample-scan") ||
        (!copy.imageUrl.startsWith("data:") &&
          !copy.imageUrl.includes("sample-hairline-1.jpg") &&
          !copy.imageUrl.includes("sample-hairline-2.jpg"))
      ) {
        copy.imageUrl = "/images/sample-hairline-1.jpg";
      }
      return copy;
    };

    const id = params?.id as string;
    const latest = FollicleStorage.getLatestAnalysis();

    if (latest && (latest.id === id || id === "demo-assessment-01")) {
      setAnalysis(normalizeResult(latest));
    } else {
      const all = FollicleStorage.getAllAnalyses();
      const found = all.find((a) => a.id === id);
      setAnalysis(normalizeResult(found || SAMPLE_ANALYSIS));
    }
  }, [params]);

  const recommendedProducts = React.useMemo(() => {
    if (!analysis) return [];
    const slugs = analysis?.carePlan?.suggestedProductSlugs || [];
    const matched = SAMPLE_PRODUCTS.filter((product) => slugs.includes(product.slug));
    if (matched.length > 0) {
      const rest = SAMPLE_PRODUCTS.filter((product) => !slugs.includes(product.slug));
      return [...matched, ...rest].slice(0, 8);
    }
    const templeFriendly = SAMPLE_PRODUCTS.filter((product) =>
      product.suitedFor.some((tag) => tag.includes("temple"))
    );
    const remaining = SAMPLE_PRODUCTS.filter((product) => !templeFriendly.includes(product));
    return [...templeFriendly, ...remaining].slice(0, 8);
  }, [analysis]);

  if (!analysis) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-pulse text-sm text-zinc-500 font-medium">
          Loading your hairline findings...
        </div>
      </div>
    );
  }

  const handleSaveReport = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const getProblemText = () => {
    if (!analysis) return { status: "", title: "", explanation: "", meaning: "", fixes: [] };
    
    const leftStatus = analysis.leftTemple?.status || "mild-recession";
    const rightStatus = analysis.rightTemple?.status || "mild-recession";
    const leftDepth = analysis.leftTemple?.recessionDepthPct || 0;
    const rightDepth = analysis.rightTemple?.recessionDepthPct || 0;
    const isModerate = leftStatus.includes("moderate") || rightStatus.includes("moderate") || leftDepth >= 15 || rightDepth >= 15;
    const isAsymmetric = Math.abs(leftDepth - rightDepth) >= 3;
    const pattern = analysis.visiblePattern?.category || "";
    
    if (language === "hi") {
      if (isModerate) {
        return {
          status: "मध्यम चरण • निगरानी आवश्यक",
          title: isAsymmetric ? "दोनों मंदिरों में मध्यम असमान रिसेशन" : "दोनों मंदिरों में मध्यम रिसेशन",
          explanation: `आपकी फोटो में दोनों मंदिरों के कोनों पर ${isAsymmetric ? 'असमान रूप से' : ''} पीछे खिसकाव दिख रहा है। ${analysis.leftTemple?.notes || analysis.rightTemple?.notes || 'हेयरलाइन के कोने प्रभावित हैं।'}`,
          meaning:
            "यह मध्यम स्तर का अग्र-मंदिर रिसेशन हो सकता है (आनुवंशिक/एंड्रोजेनेटिक पैटर्न)। मध्य भाग अभी संरक्षित हो सकता है, लेकिन मंदिर क्षेत्रों पर ध्यान देना जरूरी है।",
          fixes: [
            "वास्तविक प्रभाव के लिए चिकित्सकीय सलाह लें (ट्राइकोलॉजिस्ट/चर्मरोग विशेषज्ञ)।",
            "रोज़ मंदिर कोनों पर प्रमाणित सीरम/उपचार का उपयोग करें जैसा विशेषज्ञ सुझाएं।",
            "टाइट हेयरस्टाइल, खिंचाव और अत्यधिक गर्म पानी से बचें।",
            "हर 4-6 सप्ताह में फोटो लेकर प्रगति ट्रैक करें।",
          ],
        };
      }
      return {
        status: "शुरुआती चरण • नियंत्रण में",
        title: isAsymmetric ? "मंदिरों में हल्का असमान रिसेशन" : "मंदिरों के दोनों कोनों पर हल्का रिसेशन (शुरुआती चरण)",
        explanation: `आपकी हेयरलाइन के मंदिर कोनों में हल्का पीछे खिसकाव दिख रहा है। ${isAsymmetric ? `बायाँ ~${leftDepth}%, दायाँ ~${rightDepth}% गहराई का अंतर दिख रहा है।` : ''} मध्य की हेयरलाइन अभी मजबूत है।`,
        meaning:
          "यह शुरुआती और सामान्य पैटर्न हो सकता है। आनुवंशिकता (DHT), कम रक्त प्रवाह और कसकर बांधे बाल धीरे-धीरे प्रभाव डाल सकते हैं। अभी कार्रवाई करने से स्थिर रखने में मदद मिल सकती है।",
        fixes: [
          "हर रात दोनों मंदिर कोनों पर Redensyl या पेप्टाइड हेयर सीरम लगाएं।",
          "रोज 3–4 मिनट हेयरलाइन की हल्की मालिश करें ताकि रक्त प्रवाह बढ़े।",
          "टाइट कैप, बालों को पीछे खींचना और बहुत गर्म पानी से बचें।",
          "हर महीने फोटो लें ताकि बदलाव आसानी से पता चले।",
        ],
      };
    }
    if (language === "te") {
      if (isModerate) {
        return {
          status: "మధ్యస్థ దశ • పర్యవేక్షణ అవసరం",
          title: isAsymmetric ? "రెండు ఆలకాలలో మధ్యస్థ అసమాన రిసెషన్" : "రెండు ఆలకాలలో మధ్యస్థ రిసెషన్",
          explanation: `మీ ఫోటోలో రెండు ఆలకాల మూలలలో ${isAsymmetric ? 'అసమానంగా' : ''} వెనుకకు జరడం కనిపిస్తుంది. ${analysis.leftTemple?.notes || analysis.rightTemple?.notes || ''}`,
          meaning:
            "ఇది మధ్యస్థ స్థాయి ముందు-ఆలక రిసెషన్ కావచ్చు. మధ్య భాగం ఇప్పటికీ కాపాడబడవచ్చు, కానీ ఆలక ప్రాంతాలపై శ్రద్ధ అవసరం.",
          fixes: [
            "నిపుణుడైన ట్రైకోలాజిస్ట్ లేదా చర్మవ్యాధి నిపుణుడిని సంప్రదించండి.",
            "నిపుణుడు సూచించిన సీరమ్‌లు/చికిత్సలను నిరంతరం ఉపయోగించండి.",
            "బిగుతైన హేమ్ స్టైల్స్, లాగడం, చాలా వేడి నీరు నివారించండి.",
            "4-6 వారాలకు ఒకసారి ఫోటోలు తీసి పురోగతిని పర్యవేక్షించండి.",
          ],
        };
      }
      return {
        status: "ప్రారంభ దశ • నియంత్రణలో",
        title: isAsymmetric ? "ఆలకాలలో తేలికపాటి అసమాన రిసెషన్" : "రెండు ఆలక మూలల్లో తేలికపాటి రిసెషన్ (ప్రారంభ దశ)",
        explanation: `మీ హెయిర్‌లైన్ ఆలక మూలలు కొద్దిగా వెనక్కి జరిగాయి. ${isAsymmetric ? `ఎడమ ~${leftDepth}%, కుడి ~${rightDepth}% లోతు వ్యత్యాసం కనిపిస్తోంది.` : ''} మధ్య హెయిర్‌లైన్ ఇంకా బలంగా ఉంది.`,
        meaning:
          "ఇది ప్రారంభ, సాధారణ ప్యాటర్న్ కావచ్చు. జన్యువులు (DHT), తక్కువ రక్తప్రసరణ, బిగుతైన జుట్టు కట్టడం ప్రభావం చూపవచ్చు. ఇప్పుడే చర్య తీసుకుంటే స్థిరంగా ఉంచవచ్చు.",
        fixes: [
          "ప్రతి రాత్రి రెండు ఆలక మూలలపై Redensyl లేదా పెప్టైడ్ హెయిర్ సీరమ్ అప్లై చేయండి.",
          "రోజూ 3–4 నిమిషాలు సున్నితంగా మర్దన చేయండి.",
          "బిగుతైన టోపీలు, జుట్టును వెనక్కి లాగడం, చాలా వేడి నీరు వాడకండి.",
          "ప్రతి నెలా ఫోటో తీసి మార్పును గమనించండి.",
        ],
      };
    }
    if (isModerate) {
      return {
        status: "Moderate stage • Needs attention",
        title: isAsymmetric ? "Moderate asymmetric temple recession" : "Moderate temple recession at both corners",
        explanation: `Your photo shows ${isAsymmetric ? 'uneven' : ''} recession at the temple corners. ${analysis.leftTemple?.notes || analysis.rightTemple?.notes || ''} ${pattern ? `Pattern noted: ${pattern}.` : ''}`,
        meaning:
          "This appears to be a more noticeable fronto-temporal recession. The midline may still be present, but the temples are more affected. Early medical evaluation is recommended to discuss evidence-based options.",
        fixes: [
          "Consider a consultation with a dermatologist/trichologist for assessment.",
          "Follow an evidence-based regimen (as advised) consistently.",
          "Avoid tight hairstyles, traction, and very hot water.",
          "Track with photos every 4-6 weeks to monitor progression.",
        ],
      };
    }
    return {
      status: "Early stage • Manageable",
      title: isAsymmetric ? "Mild asymmetric temple recession" : "Mild temple recession at both corners (early stage)",
      explanation: `The temple corners show mild backward movement${isAsymmetric ? ` (left ~${leftDepth}% depth, right ~${rightDepth}% depth)` : ''}. The middle of the hairline remains relatively strong and nearby roots appear healthier.`,
      meaning:
        "This is an early, common pattern—not necessarily severe hair loss. Genetics (DHT), reduced blood flow at the temple corners, and tight hairstyles can contribute over time. Acting now gives the best chance to keep your hairline stable.",
      fixes: [
        "Apply a Redensyl or peptide hair serum on both temple corners every night.",
        "Massage the hairline gently for 3–4 minutes daily to improve blood flow.",
        "Avoid tight caps, pulling hair back, and very hot water on the scalp.",
        "Take a front photo every month to track any change.",
      ],
    };
  };

  const simpleStage = getProblemText();

  return (
    <div className="hero-surface relative min-h-screen py-8 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob aurora-blob--red" />
        <div className="aurora-blob aurora-blob--rose" />
      </div>
      {/* Top Header & Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-red-500 uppercase tracking-wider mb-1 font-mono">
            <span>{t("brandName")}</span>
            <span>•</span>
            <span className="text-zinc-500 font-normal">
              {new Date(analysis.createdAt).toLocaleDateString(language === "hi" ? "hi-IN" : language === "te" ? "te-IN" : "en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-zinc-950 dark:text-white">
            {t("resultsTitle")}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            {t("resultsSubtitle")}
          </p>
        </div>

        {/* Header Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Language Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <span className="text-xs text-zinc-500 pl-2 hidden sm:inline">{t("languageLabel")}:</span>
            <LanguageSelector />
          </div>

          <button
            onClick={handleSaveReport}
            className={`px-4 py-2 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
              isSaved
                ? "bg-green-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isSaved ? t("btnSaved") : t("btnSaveReport")}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 inline-flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t("btnPrint")}</span>
          </button>

          <Link
            href="/analyze"
            className="px-3.5 py-2 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 inline-flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t("btnReanalyze")}</span>
          </Link>
        </div>
      </div>

      {/* 1. SIMPLE FRIENDLY NOTICE */}
      <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/25 flex items-start gap-3.5 text-xs text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-semibold text-sm block">
            {t("easyNoticeTitle")}
          </strong>
          <p className="leading-relaxed opacity-90">
            {t("easyNoticeText")}
          </p>
        </div>
      </div>

      {/* 2. MAIN GRID: PHOTO VIEWER & STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Hairline Photo with Red Contour Viewer (7 cols) */}
        <div className="lg:col-span-7 p-6 premium-card space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2 className="text-lg font-bold text-zinc-950 dark:text-white">
                {t("hairlineViewerTitle")}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {t("hairlineViewerDesc")}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
              {t("confidenceLabel")}: {analysis.confidenceScore}%
            </span>
          </div>

          <HairlineCanvasViewer analysis={analysis} />

          {/* Photo Quality feedback in simple words */}
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
            <span>{t("photoQualityGood")}</span>
          </div>
        </div>

        {/* Right Column: Status & Simple Measurements (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Status Box */}
          <div className="p-6 premium-card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-red-500 font-semibold">
                {t("overallStatusTitle")}
              </span>
              <span className="text-xs font-mono font-medium text-zinc-400">
                {analysis.visiblePattern?.norwoodEquivalent || analysis.visiblePattern?.category || "Norwood Type 2"}
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">
                {simpleStage.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
                {simpleStage.explanation}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-xs space-y-1">
              <strong className="text-zinc-900 dark:text-zinc-100 font-semibold block">
                {t("simpleSummaryHeader")}
              </strong>
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                {simpleStage.meaning}
              </p>
            </div>
          </div>

          {/* Measurements in Plain Words */}
          <div className="p-6 premium-card space-y-4">
            <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
              {t("measurementsSectionTitle")}
            </h3>

            <div className="space-y-3">
              {/* Forehead Balance */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">{t("foreheadBalanceLabel")}</span>
                  <strong className="text-green-600 dark:text-green-400 font-semibold">
                    {t("foreheadBalanceValue")}
                  </strong>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal">
                  {t("foreheadBalanceDesc")}
                </p>
              </div>

              {/* Side to Side Symmetry */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">{t("symmetryLabel")}</span>
                  <strong className="text-zinc-900 dark:text-white font-semibold">
                    {t("symmetryValue")}
                  </strong>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal">
                  {t("symmetryDesc")}
                </p>
              </div>

              {/* Left and Right Corners */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 text-xs">
                  <span className="text-[11px] text-zinc-500 block">{t("leftTempleLabel")}</span>
                  <strong className="text-zinc-900 dark:text-white font-medium block mt-0.5">
                    {t("naturalCurve")}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 text-xs">
                  <span className="text-[11px] text-zinc-500 block">{t("rightTempleLabel")}</span>
                  <strong className="text-zinc-900 dark:text-white font-medium block mt-0.5">
                    {t("naturalCurve")}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TEMPLE CORNER CHECK */}
      <div className="p-6 premium-card space-y-4">
        <h3 className="text-base font-bold text-zinc-950 dark:text-white">
          {t("templeCheckTitle")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Temple */}
          <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-red-500 font-mono uppercase">{t("leftSide")}</span>
              <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                {analysis.leftTemple?.status === "moderate-recession" 
                  ? (language === "hi" ? "मध्यम रिसेशन" : language === "te" ? "మధ్యస్థ రిసెషన్" : "Moderate recession")
                  : (language === "hi" ? "हल्का रिसेशन" : language === "te" ? "తేలికపాటి రిసెషన్" : "Mild recession")}
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {analysis.leftTemple?.notes || t("leftSideSimpleNotes")}
            </p>
            {analysis.leftTemple?.recessionDepthPct !== undefined && (
              <p className="text-[11px] text-zinc-500">
                {language === "hi" ? "अनुमानित गहराई:" : language === "te" ? "అంచనా లోతు:" : "Estimated depth:"} {analysis.leftTemple.recessionDepthPct}%
              </p>
            )}
          </div>

          {/* Right Temple */}
          <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-red-500 font-mono uppercase">{t("rightSide")}</span>
              <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                {analysis.rightTemple?.status === "moderate-recession" 
                  ? (language === "hi" ? "मध्यम रिसेशन" : language === "te" ? "మధ్యస్థ రిసెషన్" : "Moderate recession")
                  : (language === "hi" ? "हल्का रिसेशन" : language === "te" ? "తేలికపాటి రిసెషన్" : "Mild recession")}
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {analysis.rightTemple?.notes || t("rightSideSimpleNotes")}
            </p>
            {analysis.rightTemple?.recessionDepthPct !== undefined && (
              <p className="text-[11px] text-zinc-500">
                {language === "hi" ? "अनुमानित गहराई:" : language === "te" ? "అంచనా లోతు:" : "Estimated depth:"} {analysis.rightTemple.recessionDepthPct}%
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 4. WHY HAIR LAGS BEHIND & HOW TO OVERCOME IT (SIMPLE MATTER) */}
      <div className="p-6 sm:p-8 premium-card space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-500 font-semibold mb-1">
            <span>{t("brandName")}</span>
            <span>•</span>
            <span className="text-zinc-500 font-normal">SIMPLE GUIDE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">
            {t("laggingTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            {t("laggingSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: WHY HAIR LAGS BEHIND */}
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-red-500/20 dark:border-red-500/20 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
                  {t("laggingCausesHeader")}
                </h3>
                <p className="text-xs text-zinc-500">
                  {t("laggingCausesSub")}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Cause 1 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/60 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {t("cause1Title")}
                  </h4>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    Normal
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t("cause1Desc")}
                </p>
              </div>

              {/* Cause 2 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/60 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {t("cause2Title")}
                  </h4>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    Hormones
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t("cause2Desc")}
                </p>
              </div>

              {/* Cause 3 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/60 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {t("cause3Title")}
                  </h4>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400">
                    Blood Flow
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t("cause3Desc")}
                </p>
              </div>

              {/* Cause 4 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/60 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {t("cause4Title")}
                  </h4>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    External Strain
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t("cause4Desc")}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: HOW TO OVERCOME IT */}
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-green-500/20 dark:border-green-500/20 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
                  {t("overcomeHeader")}
                </h3>
                <p className="text-xs text-zinc-500">
                  {t("overcomeSub")}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/60 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {t("step1Title")}
                  </h4>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-green-500/10 text-green-700 dark:text-green-400">
                    Nightly Habit
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t("step1Desc")}
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/60 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {t("step2Title")}
                  </h4>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-green-500/10 text-green-700 dark:text-green-400">
                    Daily Food
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t("step2Desc")}
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/60 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {t("step3Title")}
                  </h4>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-green-500/10 text-green-700 dark:text-green-400">
                    Gentle Care
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t("step3Desc")}
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/60 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {t("step4Title")}
                  </h4>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-green-500/10 text-green-700 dark:text-green-400">
                    Patience
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t("step4Desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SIMPLE DAILY HABITS */}
      <div className="p-6 sm:p-8 premium-card space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-red-500 font-semibold">
            {t("brandName")}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white mt-1">
            {t("dailyHabitsTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <span className="text-xs font-semibold text-red-500 font-mono">{t("habit1Freq")}</span>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {t("habit1Title")}
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t("habit1Desc")}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <span className="text-xs font-semibold text-zinc-500 font-mono">{t("habit2Freq")}</span>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {t("habit2Title")}
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t("habit2Desc")}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <span className="text-xs font-semibold text-zinc-500 font-mono">{t("habit3Freq")}</span>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {t("habit3Title")}
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t("habit3Desc")}
            </p>
          </div>
        </div>
      </div>

      {/* 5. EASY KITCHEN & NATURAL HOME REMEDIES */}
      <div className="p-6 sm:p-8 premium-card space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-green-600 dark:text-green-400 font-semibold">
            <Leaf className="w-3.5 h-3.5" />
            <span>NATURAL & SAFE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white mt-1">
            {t("remediesTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            {t("remediesSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Onion Juice */}
          <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-green-500/10 text-green-700 dark:text-green-400 font-medium">
                2x Weekly
              </span>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {t("onionTitle")}
              </h3>
              <p className="text-xs text-zinc-500 font-medium">
                {t("onionSub")}
              </p>
              <div className="p-3 rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/60 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {t("onionSteps")}
              </div>
            </div>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500">
              <strong className="text-zinc-700 dark:text-zinc-300">Why it works: </strong>
              {t("onionWhy")}
            </div>
          </div>

          {/* 2. Warm Oil */}
          <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-green-500/10 text-green-700 dark:text-green-400 font-medium">
                3x Weekly
              </span>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {t("oilTitle")}
              </h3>
              <p className="text-xs text-zinc-500 font-medium">
                {t("oilSub")}
              </p>
              <div className="p-3 rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/60 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {t("oilSteps")}
              </div>
            </div>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500">
              <strong className="text-zinc-700 dark:text-zinc-300">Why it works: </strong>
              {t("oilWhy")}
            </div>
          </div>

          {/* 3. Fenugreek */}
          <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-green-500/10 text-green-700 dark:text-green-400 font-medium">
                1x Weekly
              </span>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {t("fenugreekTitle")}
              </h3>
              <p className="text-xs text-zinc-500 font-medium">
                {t("fenugreekSub")}
              </p>
              <div className="p-3 rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/60 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {t("fenugreekSteps")}
              </div>
            </div>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500">
              <strong className="text-zinc-700 dark:text-zinc-300">Why it works: </strong>
              {t("fenugreekWhy")}
            </div>
          </div>
        </div>
      </div>

      {/* 6. NATURAL PRODUCTS RECOMMENDED FOR YOU */}
      <div className="p-6 sm:p-8 premium-card space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-red-500 font-semibold">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>NATURAL PRODUCTS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white mt-1">
            {language === "hi" ? "प्राकृतिक उत्पाद जो आपके लिए उपयुक्त हो सकते हैं" : language === "te" ? "మీకు అనుకూలమైన సహజ ఉత్పత్తులు" : "Natural Products Recommended For You"}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            {language === "hi" ? "प्राकृतिक सामग्री पर आधारित उत्पाद जो बालों के झड़ने को कम करने में मदद कर सकते हैं" : language === "te" ? "జుట్టు రాలడాన్ని తగ్గించడంలో సహాయపడే సహజ పదార్థాలపై ఆధారపడిన ఉత్పత్తులు" : "Product recommendations based on your hairline analysis - natural & effective options"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-red-400/50 hover:shadow-lg transition-all overflow-hidden flex flex-col">
              <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-white/90 dark:bg-black/80 text-zinc-900 dark:text-white font-medium">
                    {product.brand}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3 flex flex-col flex-grow">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-zinc-500 mt-1 line-clamp-1">
                    {product.tagline}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-base font-bold text-zinc-900 dark:text-white">₹{product.price}</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-[10px] text-zinc-500">{product.rating}</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {product.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {product.badges.slice(0, 2).map((badge, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {badge}
                    </span>
                  ))}
                </div>
                {product.whyItSuitsYou && (
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-[10px] text-green-700 dark:text-green-400 line-clamp-2">
                    <strong>Fit: </strong>{product.whyItSuitsYou}
                  </div>
                )}
                <button className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors">
                  {language === "hi" ? "खरीदें" : "View Product"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-zinc-500 text-center">
          {language === "hi" ? "* ये सुझाव सामान्य जानकारी हैं। गंभीर समस्या होने पर डॉक्टर से सलाह लें।" : "* These are general recommendations. Consult a doctor if you have severe hair loss concerns."}
        </p>
      </div>
    </div>
  );
}
