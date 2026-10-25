"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Scan,
  ArrowRight,
  Check,
  Sparkles,
  UploadCloud,
  Camera,
  Activity,
  Ruler,
  ShieldCheck,
  ScanLine,
} from "lucide-react";
import { HairlineDemoHero } from "@/components/analysis/HairlineDemoHero";
import { useLanguage } from "@/components/i18n/LanguageContext";

export default function HomePage() {
  const { t, language } = useLanguage();

  const getFeatures = () => {
    if (language === "hi") {
      return [
        {
          title: "लाल रेखा से हेयरलाइन की पहचान",
          badge: "कंप्यूटर विजन",
          description:
            "आपके माथे पर बाल कहाँ से शुरू होते हैं, यह लाल रेखा से साफ दिखाता है ताकि आप कोनों के फैलाव को आसानी से समझ सकें।",
          icon: ScanLine,
        },
        {
          title: "नॉरवुड स्केल की सरल जांच",
          badge: "पैटर्न मैपिंग",
          description:
            "मानक चरणों (जैसे सामान्य वयस्क हेयरलाइन, स्टेज 2 या 3) के अनुसार आपकी हेयरलाइन का सरल विश्लेषण करता है।",
          icon: Activity,
        },
        {
          title: "माथे और कोनों का संतुलन",
          badge: "सरल माप",
          description:
            "माथे की ऊंचाई और दोनों कोनों (दाएं और बाएं) की समानता को मापता है ताकि कोई भी अंतर समय रहते पता चल सके।",
          icon: Ruler,
        },
        {
          title: "100% सुरक्षित और गोपनीय",
          badge: "सुरक्षित",
          description:
            "आपकी फोटो सिर्फ आपके फोन या कंप्यूटर के ब्राउज़र में प्रोसेस होती है। कोई अकाउंट या फोन नंबर देने की जरूरत नहीं।",
          icon: ShieldCheck,
        },
      ];
    }
    if (language === "te") {
      return [
        {
          title: "ఎరుపు లైన్ తో హెయిర్‌లైన్ గుర్తింపు",
          badge: "కంప్యూటర్ విజన్",
          description:
            "మీ నుదిటిపై జుట్టు ఎక్కడ మొదలవుతుందో ఎరుపు గీతతో స్పష్టంగా చూపిస్తుంది, దీని ద్వారా హెయిర్‌లైన్ మార్పులను సులభంగా తెలుసుకోవచ్చు.",
          icon: ScanLine,
        },
        {
          title: "నార్వుడ్ స్కేల్ సాధారణ వర్గీకరణ",
          badge: "ప్యాటర్న్ మ్యాపింగ్",
          description:
            "సాధారణ పెద్దల హెయిర్‌లైన్ లేదా స్టేజ్ 2 వంటి ప్రామాణిక దశలతో మీ జుట్టును సులభమైన పదాలలో విశ్లేషిస్తుంది.",
          icon: Activity,
        },
        {
          title: "నుదిటి సమతుల్యత & కోణాల కొలత",
          badge: "సులభమైన కొలతలు",
          description:
            "మీ నుదిటి ఎత్తు మరియు కుడి-ఎడమ కోణాల సమతుల్యతను కొలుస్తుంది, రెండు వైపులా సమానంగా ఉందో లేదో తెలియజేస్తుంది.",
          icon: Ruler,
        },
        {
          title: "100% గోప్యమైనది మరియు సురక్షితమైనది",
          badge: "ఖాతా అవసరం లేదు",
          description:
            "మీ ఫోటోలు మీ స్వంత బ్రౌజర్‌లో మాత్రమే ప్రాసెస్ చేయబడతాయి. ఎటువంటి ఖాతా లేదా వ్యక్తిగత సమాచారం నమోదు చేయవలసిన అవసరం లేదు.",
          icon: ShieldCheck,
        },
      ];
    }
    return [
      {
        title: "Red Line Contour Detection",
        badge: "Computer Vision",
        description:
          "Highlights exactly where your front hairline begins with a clear red line so you can easily spot any corner changes.",
        icon: ScanLine,
      },
      {
        title: "Norwood Scale Classification",
        badge: "Pattern Mapping",
        description:
          "Checks your hairline against standard stages (Mature Hairline, Stage 2, or Stage 3) in simple everyday words.",
        icon: Activity,
      },
      {
        title: "Forehead Balance & Temple Angles",
        badge: "Simple Metrics",
        description:
          "Measures your forehead height and left-to-right corner symmetry so you know if both sides match evenly.",
        icon: Ruler,
      },
      {
        title: "100% Private (Runs in Browser)",
        badge: "Zero Sign-up",
        description:
          "Your photos are processed privately right inside your browser session without storing personal files or requiring accounts.",
        icon: ShieldCheck,
      },
    ];
  };

  const analyzerFeatures = getFeatures();

  const heroTitle = t("heroTitle");
  const heroTitleSplit = heroTitle.lastIndexOf(" ");
  const heroTitleLead = heroTitleSplit > 0 ? heroTitle.slice(0, heroTitleSplit + 1) : heroTitle;
  const heroTitleAccent = heroTitleSplit > 0 ? heroTitle.slice(heroTitleSplit + 1) : "";

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const cameraInputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleDirectUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          localStorage.setItem("hairline_direct_upload", result);
          router.push("/analyze");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const steps = [
    {
      badge: "01",
      label: "QUESTIONS",
      title: t("step1Title"),
      desc: t("step1Desc"),
    },
    {
      badge: "02",
      label: "PHOTO",
      title: t("step2Title"),
      desc: t("step2Desc"),
    },
    {
      badge: "03",
      label: "REVIEW",
      title: t("step3Title"),
      desc: t("step3Desc"),
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleDirectUpload}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleDirectUpload}
        className="hidden"
      />

      <section className="hero-surface relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 w-full">
        <div className="aurora" aria-hidden="true">
          <div className="aurora-blob aurora-blob--red" />
          <div className="aurora-blob aurora-blob--rose" />
          <div className="aurora-blob aurora-blob--amber" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative">
          <div className="lg:col-span-6 space-y-7">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>{t("heroBadge")}</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.45rem] font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.08] text-balance">
                {heroTitleLead}
                <span className="text-gradient-brand">{heroTitleAccent}</span>
              </h1>
              <div className="h-1 w-24 rounded-full bg-gradient-to-r from-red-500 via-rose-400 to-amber-400" />
            </div>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
              {t("heroDescription")}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-brand px-6 py-3.5 rounded-xl text-sm font-semibold"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{t("btnDirectUpload")}</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="btn-ghost-glass px-5 py-3.5 rounded-xl text-sm font-semibold"
              >
                <Camera className="w-4 h-4 text-red-500" />
                <span>{t("btnTakePhoto")}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-500" />
                </span>
                <span>{t("privacyPill1")}</span>
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-500" />
                </span>
                <span>{t("privacyPill2")}</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md pt-2">
              <div className="stat-pill">
                <strong className="text-gradient-brand">30s</strong>
                <span>Avg. scan</span>
              </div>
              <div className="stat-pill">
                <strong>100%</strong>
                <span>Private</span>
              </div>
              <div className="stat-pill">
                <strong>4</strong>
                <span>Remedies</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div
              className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-red-500/15 via-rose-400/10 to-amber-300/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative float-slow">
              <HairlineDemoHero />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-14 md:py-16 border-t border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-950/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-9 text-center max-w-2xl mx-auto space-y-3">
            <div className="section-eyebrow justify-center mx-auto">EASY &amp; QUICK</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white tracking-tight">
              {t("howItWorksTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step) => (
              <div key={step.badge} data-step={step.badge} className="step-card">
                <div className="flex items-center justify-between mb-4">
                  <span className="step-badge">{step.badge}</span>
                  <span className="text-[10px] font-mono font-semibold tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                    {step.label}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1.5">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div className="space-y-3 max-w-2xl">
            <div className="section-eyebrow">HAIR LINE DETECTOR</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 dark:text-white tracking-tight">
              {language === "hi"
                ? "स्पष्ट और आसान परिणाम"
                : (language as string) === "es"
                ? "Resultados Claros y Sencillos"
                : "Clear & Simple Hairline Insights"}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
              {language === "hi"
                ? "बिना किसी कठिन तकनीकी शब्दों के अपनी हेयरलाइन को समझें।"
                : (language as string) === "es"
                ? "Comprende tu cabello sin términos médicos complicados."
                : "Understand your hairline clearly without complicated medical jargon."}
            </p>
          </div>

          <Link
            href="/analyze"
            className="btn-ghost-glass px-4 py-2.5 rounded-xl text-xs font-semibold self-start sm:self-auto group"
          >
            <span>{t("launchAnalyzer")}</span>
            <ArrowRight className="w-3.5 h-3.5 text-red-500 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {analyzerFeatures.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="premium-card p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <span className="icon-tile">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-100/80 dark:bg-white/5 text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 border border-zinc-200/70 dark:border-white/10">
                    {feat.badge}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold text-zinc-950 dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="cta-panel p-8 sm:p-12 md:p-14">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-red-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>{t("brandName")}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                {language === "hi"
                  ? "क्या आप अपनी हेयरलाइन जांचने के लिए तैयार हैं?"
                  : (language as string) === "es"
                  ? "¿Listo para revisar tu línea del cabello?"
                  : "Ready to check your hairline?"}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {language === "hi"
                  ? "अपनी फोटो अपलोड करें, लाल रेखा देखें और आसान सुझाव तुरंत पाएं।"
                  : (language as string) === "es"
                  ? "Sube tu foto, revisa el contorno rojo y obtén consejos sencillos al instante."
                  : "Upload your photo, inspect the red hairline mark, and get clear tips instantly."}
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-500 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>No account required • Runs entirely in your browser</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-brand px-6 py-3.5 rounded-xl text-sm font-semibold"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{t("btnDirectUpload")}</span>
              </button>
              <Link
                href="/analyze"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-white/5 text-zinc-200 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors inline-flex items-center gap-2"
              >
                <Scan className="w-4 h-4" />
                <span>{t("launchAnalyzer")}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
