"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  RefreshCw,
  Camera,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageContext";

interface PhotoUploadZoneProps {
  onPhotoSelected: (imageDataUrl: string) => void;
  onCancel?: () => void;
}

const SAMPLE_PHOTOS = [
  {
    id: "sample-1",
    label: "Sample 1 (Norwood II)",
    sub: "Clear front hairline with temple corners",
    url: "/images/sample-hairline-1.jpg",
  },
  {
    id: "sample-2",
    label: "Sample 2 (Reference)",
    sub: "Even lighting, visible frontal hair roots",
    url: "/images/sample-hairline-2.jpg",
  },
];

export function PhotoUploadZone({ onPhotoSelected, onCancel }: PhotoUploadZoneProps) {
  const { t, language } = useLanguage();
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setErrorMessage(null);

    // Validate format
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage(
        language === "hi"
          ? "कृपया एक वैध फोटो चुनें (JPG, PNG या WebP)।"
          : language === "te"
          ? "దయచేసి సరైన ఫోటోను ఎంచుకోండి (JPG, PNG లేదా WebP)."
          : "Please select a valid image file (JPG, PNG, or WebP)."
      );
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage(
        language === "hi"
          ? "फोटो का साइज 10MB से कम होना चाहिए।"
          : language === "te"
          ? "ఫోటో పరిమాణం 10MB కంటే తక్కువగా ఉండాలి."
          : "Image file exceeds 10MB limit. Please upload a smaller image."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      setFileDetails({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleSelectSample = (url: string, label: string) => {
    setErrorMessage(null);
    setPreviewUrl(url);
    setFileDetails({
      name: `${label}.jpg`,
      size: language === "hi" ? "नमूना प्रदर्शन फोटो" : "Demo Sample Image",
    });
  };

  const handleClear = () => {
    setPreviewUrl(null);
    setFileDetails(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleStartAnalysis = () => {
    if (!previewUrl) {
      setErrorMessage(
        language === "hi"
          ? "कृपया पहले अपनी एक फोटो अपलोड करें या चुनें।"
          : (language as string) === "es"
          ? "Por favor sube o selecciona una foto primero."
          : "Please select or upload a photograph first."
      );
      return;
    }
    onPhotoSelected(previewUrl);
  };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      {/* Upload Box */}
      <div className="premium-card p-6 sm:p-9 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-mono font-semibold mb-1">
              <UploadCloud className="w-3.5 h-3.5" />
              <span>{t("directUploadTitle")}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">
              {language === "hi"
                ? "माथे की फोटो सीधे अपलोड करें"
                : (language as string) === "es"
                ? "Sube la Foto de tu Frente Directamente"
                : "Upload Your Front Hairline Photo Directly"}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {t("directUploadDesc")}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-800/80 px-3 py-1.5 rounded-full self-start sm:self-auto font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
            <span>{t("privacyPill1")}</span>
          </div>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-600 dark:text-red-400 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Upload Zone or Preview */}
        {!previewUrl ? (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
              dragActive
                ? "border-red-500 bg-red-500/5 dark:bg-red-950/20"
                : "border-zinc-300 dark:border-zinc-700 hover:border-red-400 bg-zinc-50/50 dark:bg-zinc-900/30"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleFileInput}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="user"
              onChange={handleFileInput}
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4 border border-red-500/20">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white mb-1">
              {t("dragOrClick")}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mb-6 leading-relaxed">
              {language === "hi"
                ? "सीधे कैमरे की तरफ देखें। सामने का माथा और दोनों कोने साफ दिखें।"
                : (language as string) === "es"
                ? "Mirada frontal hacia la cámara con la frente y sienes visibles."
                : "Front-facing eye-level view showing forehead and temple corners."}
            </p>

            {/* Direct Action Buttons */}
            <div
              className="flex flex-wrap items-center justify-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-brand px-5 py-3 rounded-lg text-xs font-semibold inline-flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>{t("btnDirectUpload")}</span>
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="btn-ghost-glass px-5 py-3 rounded-lg text-xs font-semibold inline-flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>{t("btnTakePhoto")}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Image Preview State */
          <div className="space-y-4">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Hairline uploaded preview"
                className="w-full h-full object-contain object-center"
              />
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-900 text-white shadow-md transition-colors"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs">
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="font-semibold">{fileDetails?.name}</span>
                <span className="text-zinc-400">({fileDetails?.size})</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{language === "hi" ? "दूसरी फोटो चुनें" : "Replace Photo"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Sample Selector for Instant Demo Testing */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
              {language === "hi" ? "या डेमो फोटो से तुरंत जांचें" : "Or Try With a Demo Sample Photo"}
            </span>
            <span className="text-[11px] text-red-500 font-semibold font-mono">
              {language === "hi" ? "त्वरित जांच" : "Instant demo"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SAMPLE_PHOTOS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample.url, sample.label)}
                className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 hover:border-red-400 hover:bg-white dark:hover:bg-zinc-800 text-left transition-all flex items-center gap-3 group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sample.url}
                  alt={sample.label}
                  className="w-12 h-12 rounded-lg object-cover shrink-0 border border-zinc-200 dark:border-zinc-700"
                />
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white truncate group-hover:text-red-500">
                    {sample.label}
                  </p>
                  <p className="text-[11px] text-zinc-500 truncate">{sample.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 rounded-md text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            {language === "hi" ? "हटाएं / रीसेट करें" : "Clear / Reset"}
          </button>

          <button
            type="button"
            onClick={handleStartAnalysis}
            disabled={!previewUrl}
            className={`btn-brand inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold ${
              previewUrl ? "" : "opacity-40 cursor-not-allowed"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {language === "hi"
                ? "हेयरलाइन स्कैन और विश्लेषण शुरू करें"
                : (language as string) === "es"
                ? "Iniciar Análisis Capilar"
                : "Analyze Hairline Now"}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Guidelines in Plain English */}
      <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs">
        <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">
          {language === "hi" ? "अच्छे परिणाम के लिए आसान टिप्स:" : "Tips for Best Scan Results:"}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-600 dark:text-zinc-400">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span>{language === "hi" ? "सीधे कैमरे के सामने देखें (माथा बिल्कुल सीधा रहे)।" : "Look straight at the camera at eye-level."}</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span>{language === "hi" ? "बालों को थोड़ा पीछे रखें ताकि माथा और कोने साफ दिखें।" : "Pull hair back so forehead and corners are clear."}</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span>{language === "hi" ? "कमरे की सामान्य रोशनी में फोटो लें (ज्यादा तेज परछाई न हो)।" : "Use normal room lighting without harsh shadows."}</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span>{language === "hi" ? "चेहरे को शांत और सामान्य रखें।" : "Keep a neutral, relaxed facial expression."}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
