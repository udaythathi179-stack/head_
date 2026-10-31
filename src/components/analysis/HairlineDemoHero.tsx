"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  SlidersHorizontal,
  Check,
} from "lucide-react";
import { SAMPLE_ANALYSIS } from "@/lib/mock-data";

export function HairlineDemoHero() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [showBaseline, setShowBaseline] = useState(true);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Main Developer Card Frame */}
      <div className="premium-card overflow-hidden">
        {/* Top Header Bar */}
        <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 font-mono text-[11px] tracking-wide">
              NATURAL_HAIRLINE_SCAN.v1
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                showOverlay
                  ? "bg-red-500/10 dark:bg-red-950/30 border-red-500/30 text-red-600 dark:text-red-400"
                  : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500"
              }`}
            >
              Red Hairline: {showOverlay ? "ON" : "OFF"}
            </button>
            <button
              onClick={() => setShowBaseline(!showBaseline)}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                showBaseline
                  ? "bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500"
              }`}
            >
              Baseline: {showBaseline ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        {/* Image & SVG Canvas */}
        <div className="relative aspect-[4/3.3] bg-zinc-950 overflow-hidden select-none laser-reticle group">
          {/* Animated Laser Scanning Line */}
          {showOverlay && (
            <div className="scan-glow scan-beam-animated pointer-events-none" />
          )}

          {/* Corner Viewfinder Reticles */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-red-500/70 z-10 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-red-500/70 z-10 pointer-events-none" />
          <div className="absolute bottom-10 left-3 w-4 h-4 border-b-2 border-l-2 border-red-500/70 z-10 pointer-events-none" />
          <div className="absolute bottom-10 right-3 w-4 h-4 border-b-2 border-r-2 border-red-500/70 z-10 pointer-events-none" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/sample-hairline-2.jpg"
            alt="Natural front hairline reference scan"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* SVG Overlay */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {/* Shaded Recession Areas (Difference between baseline and current) */}
            {showOverlay && (
              <>
                {/* Left Temple Recession Zone */}
                <polygon
                  points="33,32 35,25 39,21 37,28"
                  fill="#EF4444"
                  fillOpacity="0.32"
                  stroke="#EF4444"
                  strokeWidth="0.8"
                  strokeDasharray="2 1"
                />
                {/* Right Temple Recession Zone */}
                <polygon
                  points="67,32 65,25 61,21 63,28"
                  fill="#EF4444"
                  fillOpacity="0.32"
                  stroke="#EF4444"
                  strokeWidth="0.8"
                  strokeDasharray="2 1"
                />
              </>
            )}

            {/* Original / Ideal Baseline Hairline (Clean Gray Dashed Line) */}
            {showBaseline && (
              <path
                d="M 32 35 C 35 29, 42 23, 50 21 C 58 23, 65 29, 68 35"
                fill="none"
                stroke="#A1A1AA"
                strokeWidth="1.4"
                strokeDasharray="2 2"
              />
            )}

            {/* Current Visible Hairline (Clear Red Line Mark) */}
            {showOverlay && (
              <path
                d="M 32 35 C 34 26, 38 21, 50 18 C 62 21, 66 26, 68 35"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Legend Overlay at bottom */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-zinc-800 text-[10px] text-zinc-300 font-mono flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-red-500 rounded-full" />
              <span>Current Hairline</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-zinc-800 text-[10px] text-zinc-300 font-mono flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 border-t border-dashed border-zinc-400" />
              <span>Original Baseline</span>
            </span>
          </div>
        </div>

        {/* Clean Developer Metrics Grid */}
        <div className="p-4 grid grid-cols-3 gap-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121215]">
          <div className="space-y-0.5">
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
              Classification
            </span>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Norwood II
            </p>
            <p className="text-[11px] text-zinc-500">Adult mature line</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
              Hair Loss
            </span>
            <p className="text-sm font-semibold text-red-600 dark:text-red-400 font-mono">
              ~12% recession
            </p>
            <p className="text-[11px] text-zinc-500">Temples: 9mm depth</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
              Action Plan
            </span>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              4 Remedies
            </p>
            <p className="text-[11px] text-zinc-500">Serum & Massage</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
          <span className="text-zinc-500 text-[11px] font-mono">
            INPUT: Natural front hairline photo • High-Precision Red Contour Scan
          </span>
          <Link
            href="/analyze"
            className="text-zinc-900 dark:text-white font-medium hover:underline inline-flex items-center gap-1"
          >
            <span>Scan your photo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

