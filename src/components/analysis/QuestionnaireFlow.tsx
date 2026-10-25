"use client";

import React, { useState } from "react";
import { QuestionnaireAnswers } from "@/types/analysis";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  HelpCircle,
  Shield,
  Sparkles,
  AlertCircle,
} from "lucide-react";

interface QuestionnaireFlowProps {
  onComplete: (answers: QuestionnaireAnswers) => void;
  initialAnswers?: Partial<QuestionnaireAnswers>;
}

export function QuestionnaireFlow({ onComplete, initialAnswers }: QuestionnaireFlowProps) {
  const [step, setStep] = useState<number>(0);

  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    ageRange: initialAnswers?.ageRange || "25–34",
    hairType: initialAnswers?.hairType || "Wavy (Type 2)",
    duration: initialAnswers?.duration || "6–12 months",
    primaryConcern: initialAnswers?.primaryConcern || "Temple recession (widening M/V shape)",
    familyHistory: initialAnswers?.familyHistory || "Maternal side",
    scalpSymptoms: initialAnswers?.scalpSymptoms || ["None"],
    currentRoutine: initialAnswers?.currentRoutine || "Sulfate-free / gentle wash",
    healthContext: initialAnswers?.healthContext || "None",
    consentGiven: initialAnswers?.consentGiven ?? true,
  });

  const questions = [
    {
      id: "ageRange",
      title: "How old are you?",
      subtitle: "Your age helps us understand if your hairline is naturally maturing.",
      options: ["18–24", "25–34", "35–44", "45–54", "55+"],
      field: "ageRange" as keyof QuestionnaireAnswers,
      multi: false,
    },
    {
      id: "hairType",
      title: "What is your natural hair type?",
      subtitle: "Knowing your hair texture helps our scanner check scalp visibility properly.",
      options: [
        "Straight (Type 1)",
        "Wavy (Type 2)",
        "Curly (Type 3)",
        "Coily / Tight Curls (Type 4)",
      ],
      field: "hairType" as keyof QuestionnaireAnswers,
      multi: false,
    },
    {
      id: "duration",
      title: "When did you first notice changes in your hairline?",
      subtitle: "Tells us if changes happened recently or gradually over time.",
      options: [
        "Recently (< 6 months)",
        "6–12 months ago",
        "1–3 years ago",
        "More than 3 years ago",
        "Just checking / No changes noticed",
      ],
      field: "duration" as keyof QuestionnaireAnswers,
      multi: false,
    },
    {
      id: "primaryConcern",
      title: "What area do you want to check most?",
      subtitle: "Choose what you want the hairline scanner to focus on.",
      options: [
        "Side corners / Temple recession (M-shape)",
        "Front center hairline",
        "Top / Crown thinning",
        "Daily hair shedding",
        "General health check",
      ],
      field: "primaryConcern" as keyof QuestionnaireAnswers,
      multi: false,
    },
    {
      id: "familyHistory",
      title: "Does anyone in your family have hair thinning?",
      subtitle: "Hair patterns often run in families on either parent's side.",
      options: [
        "Mother's side (Grandfather, uncles)",
        "Father's side (Father, grandfather)",
        "Both mother's and father's sides",
        "No known family hair loss",
        "Not sure / Unaware",
      ],
      field: "familyHistory" as keyof QuestionnaireAnswers,
      multi: false,
    },
    {
      id: "scalpSymptoms",
      title: "Do you feel any discomfort on your scalp?",
      subtitle: "Choose any sensations you feel, or select None.",
      options: [
        "None",
        "Occasional itching",
        "Redness or sensitive skin",
        "Dandruff or flaking",
        "Tenderness around roots",
      ],
      field: "scalpSymptoms" as keyof QuestionnaireAnswers,
      multi: true,
    },
    {
      id: "currentRoutine",
      title: "How do you wash and care for your hair right now?",
      subtitle: "Helps us give practical advice that fits into your current routine.",
      options: [
        "Regular shampoo & conditioner",
        "Gentle or sulfate-free shampoo",
        "Hair oils and natural remedies (Coconut, Amla, Onion)",
        "Hair serums or doctor-recommended solutions",
        "Water only or infrequent washing",
      ],
      field: "currentRoutine" as keyof QuestionnaireAnswers,
      multi: false,
    },
    {
      id: "healthContext",
      title: "Any recent lifestyle or health factors?",
      subtitle: "Helps us understand temporary hair shedding causes.",
      options: [
        "None",
        "High stress in recent months",
        "Sudden diet change or weight loss",
        "Recent fever or illness recovery",
      ],
      field: "healthContext" as keyof QuestionnaireAnswers,
      multi: false,
    },
  ];

  const currentQ = questions[step];
  const progressPercent = Math.round(((step + 1) / questions.length) * 100);

  const handleSelectOption = (opt: string) => {
    if (currentQ.multi) {
      const currentList = (answers[currentQ.field] as string[]) || [];
      let updated: string[];
      if (opt === "None") {
        updated = ["None"];
      } else {
        const withoutNone = currentList.filter((item) => item !== "None");
        if (withoutNone.includes(opt)) {
          updated = withoutNone.filter((item) => item !== opt);
          if (updated.length === 0) updated = ["None"];
        } else {
          updated = [...withoutNone, opt];
        }
      }
      setAnswers({ ...answers, [currentQ.field]: updated });
    } else {
      setAnswers({ ...answers, [currentQ.field]: opt });
      if (step < questions.length - 1) {
        setStep(step + 1);
      }
    }
  };

  const isSelected = (opt: string) => {
    if (currentQ.multi) {
      const currentList = (answers[currentQ.field] as string[]) || [];
      return currentList.includes(opt);
    }
    return answers[currentQ.field] === opt;
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      if (!answers.consentGiven) {
        alert("Please acknowledge the consent and disclaimer to proceed.");
        return;
      }
      onComplete(answers);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="max-w-2xl mx-auto w-full space-y-6">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-charcoal-500 dark:text-gray-400 mb-2 font-display">
          <span>Question {step + 1} of {questions.length}</span>
          <span className="text-forest-600 dark:text-forest-400 font-mono">{progressPercent}% complete</span>
        </div>
        <div className="w-full h-2 rounded-full bg-surface-muted dark:bg-white/10 overflow-hidden p-0.5 border border-surface-border">
          <div
            className="h-full bg-gradient-to-r from-forest-600 to-forest-400 rounded-full transition-all duration-300 ease-out shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="luxury-glass rounded-4xl p-7 sm:p-11 shadow-soft-lg border border-white/80 dark:border-white/10">
        <div className="mb-7">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 dark:text-white font-display mb-2">
            {currentQ.title}
          </h2>
          <p className="text-sm text-charcoal-500 dark:text-gray-400 leading-relaxed font-normal">
            {currentQ.subtitle}
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-3 mb-8">
          {currentQ.options.map((option) => {
            const active = isSelected(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between group ${
                  active
                    ? "bg-forest-500/10 dark:bg-forest-950/50 border-forest-500 dark:border-forest-400 text-forest-950 dark:text-forest-100 shadow-soft-xs font-bold"
                    : "bg-surface-subtle/80 dark:bg-white/5 border-surface-border text-charcoal-800 dark:text-gray-200 hover:border-forest-400 hover:bg-white dark:hover:bg-white/10"
                }`}
              >
                <span className="text-sm sm:text-base leading-snug">{option}</span>
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ml-3 transition-all ${
                    active
                      ? "border-forest-600 bg-forest-600 dark:border-forest-400 dark:bg-forest-400 text-white shadow-soft-xs scale-105"
                      : "border-charcoal-300 dark:border-gray-600 group-hover:border-forest-400"
                  }`}
                >
                  {active && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Final Step Consent Box */}
        {step === questions.length - 1 && (
          <div className="mb-6 p-4 rounded-2xl bg-forest-500/10 dark:bg-forest-950/40 border border-forest-500/20">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={answers.consentGiven}
                onChange={(e) => setAnswers({ ...answers, consentGiven: e.target.checked })}
                className="mt-1 w-4 h-4 text-forest-600 rounded border-gray-300 focus:ring-forest-500"
              />
              <span className="text-xs text-charcoal-700 dark:text-gray-300 leading-relaxed">
                <strong className="text-charcoal-900 dark:text-white font-bold">Consent & Medical Notice:</strong> I understand that Hair Line Detector provides visible image-based hairline estimations and cosmetic recommendations. This is not a diagnosis of alopecia or medical advice.
              </span>
            </label>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-5 border-t border-surface-border">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 0}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              step === 0
                ? "opacity-0 pointer-events-none"
                : "text-charcoal-600 dark:text-gray-400 hover:bg-surface-muted"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="btn-primary-luxury inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold shadow-soft"
          >
            <span>{step === questions.length - 1 ? "Proceed to Photo Upload" : "Continue"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
