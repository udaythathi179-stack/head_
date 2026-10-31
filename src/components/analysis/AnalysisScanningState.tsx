"use client";

import React, { useEffect, useState } from "react";
import { Check, Loader2, X } from "lucide-react";

interface AnalysisScanningStateProps {
  imageUrl: string;
  onComplete: () => void;
  onCancel: () => void;
}

const STAGES = [
  { label: "Validating photo resolution and lighting", duration: 700 },
  { label: "Locating glabella and mid-frontal apex", duration: 800 },
  { label: "Tracing visible hairline contour with red marker", duration: 900 },
  { label: "Measuring temporal recession and facial thirds", duration: 800 },
  { label: "Compiling hair loss remedies & product matches", duration: 600 },
];

export function AnalysisScanningState({
  imageUrl,
  onComplete,
  onCancel,
}: AnalysisScanningStateProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const current = STAGES[currentStageIndex];

    if (currentStageIndex < STAGES.length - 1) {
      timeout = setTimeout(() => {
        setCurrentStageIndex((prev) => prev + 1);
        setProgress(Math.round(((currentStageIndex + 2) / STAGES.length) * 100));
      }, current.duration);
    } else {
      timeout = setTimeout(() => {
        setProgress(100);
        onComplete();
      }, current.duration);
    }

    return () => clearTimeout(timeout);
  }, [currentStageIndex, onComplete]);

  return (
    <div className="max-w-xl mx-auto w-full">
      <div className="premium-card p-6 sm:p-8 text-center">
        {/* Photo Container */}
        <div className="relative w-56 h-64 mx-auto rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 mb-6 bg-zinc-950 shadow-2xl laser-reticle group">
          {/* Viewfinder corner brackets */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-red-500 z-10 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-red-500 z-10 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-red-500 z-10 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-red-500 z-10 pointer-events-none" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Processing hairline photo"
            className="w-full h-full object-cover"
          />

          {/* Clean Red Scanning Indicator Line */}
          <div className="absolute left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_12px_#FF3366,0_0_24px_rgba(239,68,68,0.8)] animate-scan-line pointer-events-none" />

          {/* Status badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/85 backdrop-blur-md border border-red-500/30 text-[10px] text-red-400 font-mono tracking-widest flex items-center gap-1.5 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>AI SCANNING</span>
          </div>
        </div>

        {/* Headline */}
        <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-1">
          Processing Hairline Photo
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 font-mono">
          Detecting hairline boundary coordinates and temporal depth...
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-sm mx-auto mb-6">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-mono mb-1.5">
            <span>Progress</span>
            <span className="text-zinc-900 dark:text-white font-semibold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Multi-Stage List */}
        <div className="max-w-sm mx-auto space-y-2 text-left mb-6 font-mono text-xs">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={idx}
                className={`flex items-center gap-2.5 py-1 px-2 rounded ${
                  isCurrent
                    ? "text-zinc-950 dark:text-white font-medium bg-zinc-100 dark:bg-zinc-800"
                    : isCompleted
                    ? "text-zinc-600 dark:text-zinc-400"
                    : "text-zinc-400 dark:text-zinc-600"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 text-red-500 animate-spin shrink-0" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-zinc-300 dark:border-zinc-700 shrink-0 inline-block" />
                )}
                <span className="truncate text-[11px]">{stage.label}</span>
              </div>
            );
          })}
        </div>

        {/* Cancel button */}
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-mono inline-flex items-center gap-1"
        >
          <X className="w-3.5 h-3.5" />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
}
