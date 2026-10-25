"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuestionnaireAnswers } from "@/types/analysis";
import { QuestionnaireFlow } from "@/components/analysis/QuestionnaireFlow";
import { PhotoUploadZone } from "@/components/analysis/PhotoUploadZone";
import { AnalysisScanningState } from "@/components/analysis/AnalysisScanningState";
import { analysisService } from "@/lib/analysis-service";
import { FollicleStorage } from "@/lib/storage";
import { ArrowLeft, Sparkles, SlidersHorizontal, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageContext";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";

type AnalysisStep = "upload" | "scanning" | "questionnaire";

const DEFAULT_ANSWERS: QuestionnaireAnswers = {
  ageRange: "25–34",
  hairType: "Wavy (Type 2)",
  duration: "6–12 months",
  primaryConcern: "Temple recession (widening M/V shape)",
  familyHistory: "Maternal side",
  scalpSymptoms: ["None"],
  currentRoutine: "Sulfate-free / gentle wash",
  healthContext: "None",
  consentGiven: true,
};

export default function AnalyzePage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  // Directly start on the photo upload step!
  const [currentStep, setCurrentStep] = useState<AnalysisStep>("upload");
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(DEFAULT_ANSWERS);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Check for direct upload from home page
  useEffect(() => {
    const directImage = localStorage.getItem("hairline_direct_upload");
    if (directImage) {
      localStorage.removeItem("hairline_direct_upload");
      setSelectedImage(directImage);
      setCurrentStep("scanning");
    }
  }, []);

  // When photo is selected or uploaded
  const handlePhotoSelected = (imageDataUrl: string) => {
    setSelectedImage(imageDataUrl);
    setCurrentStep("scanning");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Optional: If user wants to customize questionnaire answers
  const handleQuestionnaireComplete = (collectedAnswers: QuestionnaireAnswers) => {
    setAnswers(collectedAnswers);
    setCurrentStep("upload");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scanning simulation completed -> run real analysis pipeline
  const handleScanAnimationComplete = async () => {
    if (!selectedImage) return;

    try {
      setIsProcessing(true);
      const result = await analysisService.analyzeImage(selectedImage, answers);

      // Persist in localStorage for guest session
      FollicleStorage.saveAnalysis(result);

      // Navigate to results page
      router.push(`/results/${result.id}`);
    } catch (err) {
      console.error("Error analyzing image:", err);
      alert("An error occurred during analysis. Please try again.");
      setCurrentStep("upload");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="hero-surface relative min-h-screen py-8 md:py-14 px-4 sm:px-6 lg:px-8 w-full">
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob aurora-blob--red" />
        <div className="aurora-blob aurora-blob--rose" />
      </div>
      <div className="max-w-7xl mx-auto w-full">
      {/* Top Breadcrumb & Step Navigation */}
      <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-500">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "hi" ? "होम पर वापस जाएं" : (language as string) === "es" ? "Volver a Inicio" : "Back to Home"}</span>
        </Link>

        {/* Step indicator pills */}
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              currentStep === "upload"
                ? "bg-red-500 text-white font-semibold shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            1. {language === "hi" ? "फोटो अपलोड" : (language as string) === "es" ? "Subir Foto" : "Upload Photo"}
          </span>
          <span className="text-zinc-400">•</span>
          <span
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              currentStep === "scanning"
                ? "bg-red-500 text-white font-semibold shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            2. {language === "hi" ? "एआई स्कैन" : (language as string) === "es" ? "Escaneo IA" : "AI Red Line Scan"}
          </span>

          <div className="ml-2">
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Main Multi-Step Switch */}
      {currentStep === "upload" && (
        <div className="space-y-6">
          <PhotoUploadZone
            onPhotoSelected={handlePhotoSelected}
            onCancel={() => setCurrentStep("questionnaire")}
          />

          {/* Optional questions link if user wants to fine-tune */}
          <div className="max-w-3xl mx-auto text-center pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep("questionnaire")}
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white inline-flex items-center gap-1.5 transition-colors underline underline-offset-4"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>
                {language === "hi"
                  ? "वैकल्पिक: अपने बालों के बारे में अधिक विवरण भरें"
                  : (language as string) === "es"
                  ? "Opcional: Personalizar preguntas sobre tu cabello"
                  : "Optional: Customize hair texture & age questions"}
              </span>
            </button>
          </div>
        </div>
      )}

      {currentStep === "questionnaire" && (
        <div className="space-y-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between text-xs text-zinc-500 pb-2">
            <button
              onClick={() => setCurrentStep("upload")}
              className="text-red-500 hover:underline font-medium inline-flex items-center gap-1"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>
                {language === "hi"
                  ? "सवाल छोड़ें और सीधे फोटो अपलोड करें →"
                  : (language as string) === "es"
                  ? "Saltar preguntas y subir foto directamente →"
                  : "Skip questions and upload photo directly →"}
              </span>
            </button>
          </div>
          <QuestionnaireFlow onComplete={handleQuestionnaireComplete} initialAnswers={answers} />
        </div>
      )}

      {currentStep === "scanning" && selectedImage && (
        <AnalysisScanningState
          imageUrl={selectedImage}
          onComplete={handleScanAnimationComplete}
          onCancel={() => setCurrentStep("upload")}
        />
      )}
      </div>
    </div>
  );
}
