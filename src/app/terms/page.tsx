import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Stethoscope, AlertTriangle, FileText, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="relative min-h-screen py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-coral-500/10 dark:bg-coral-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-forest-500/5 dark:bg-forest-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-coral-600 dark:hover:text-coral-400 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-coral-50 dark:bg-coral-950/40 text-coral-700 dark:text-coral-400 border border-coral-500/20 font-display">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>LEGAL BOUNDARIES & CLINICAL NOTICE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal-900 dark:text-white font-display tracking-tight">
          Terms of Service & Medical Disclaimer
        </h1>
        <p className="text-xs text-charcoal-400 font-mono">
          Last Calibrated: October 2026 • Policy Version 2.4
        </p>
      </div>

      <div className="space-y-8 text-charcoal-700 dark:text-gray-300 leading-relaxed">
        {/* Core Medical Disclaimer Highlight */}
        <div className="p-8 rounded-4xl luxury-card border border-amber-500/30 dark:border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-300">
            <Stethoscope className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <h2 className="text-lg font-bold font-display m-0">
              Crucial Medical & Diagnostic Notice
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-amber-950/90 dark:text-amber-200/90 leading-relaxed m-0 pt-1">
            FollicleAI is an educational, computer-vision assisted hairline contour tracking software. It is <strong>NOT</strong> a certified medical device and does <strong>NOT</strong> provide medical diagnoses, treatment prescriptions, or definitive prognosis for alopecia, scarring alopecia, or other medical dermatological conditions.
          </p>
        </div>

        {/* Section 1 */}
        <section className="p-6 rounded-3xl luxury-glass border border-surface-border dark:border-white/5 space-y-2">
          <h2 className="text-lg font-bold text-charcoal-900 dark:text-white font-display">
            1. Nature of the Service
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-gray-300 leading-relaxed">
            All hairline boundaries, shaded potential recession zones, bitemporal depth approximations, and pattern classifications (such as Norwood Scale estimations) represent algorithmic visual interpretations of standard 2D photographs. They must not be interpreted as physical biopsies, dermoscopic trichoscopy, or clinical dermatological diagnoses.
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-6 rounded-3xl luxury-glass border border-surface-border dark:border-white/5 space-y-2">
          <h2 className="text-lg font-bold text-charcoal-900 dark:text-white font-display">
            2. Limitation of Single-Photograph Analysis
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-gray-300 leading-relaxed">
            A single photograph cannot verify whether hairline changes occurred recently or stabilized years ago, nor can it determine the exact number or density of miniaturized follicles. Always compare photographs over 3–6 month intervals under identical lighting and camera distance.
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-6 rounded-3xl luxury-glass border border-surface-border dark:border-white/5 space-y-2">
          <h2 className="text-lg font-bold text-charcoal-900 dark:text-white font-display">
            3. Treatment and Product Guidance
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-gray-300 leading-relaxed">
            Information regarding evidence-informed treatments (such as topical Minoxidil, low-level light therapy, or botanical extracts) is presented purely for general patient education. Any decision to start or stop medicinal treatments must be made in consultation with a qualified physician or board-certified dermatologist.
          </p>
        </section>

        {/* Section 4 */}
        <section className="p-6 rounded-3xl luxury-glass border border-coral-500/20 dark:border-coral-500/30 space-y-2">
          <div className="flex items-center gap-2 text-coral-600 dark:text-coral-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <h2 className="text-lg font-bold font-display">
              4. Emergency and Clinical Escalation
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-gray-300 leading-relaxed">
            If you experience sudden circular patchy hair loss, intense scalp burning, pain, purulence, or rapid progression over several weeks, discontinue platform tracking and seek urgent medical evaluation with a board-certified dermatologist.
          </p>
        </section>
      </div>
    </div>
  );
}
