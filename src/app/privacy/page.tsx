import React from "react";
import Link from "next/link";
import { Lock, ShieldCheck, ArrowLeft, EyeOff, Server, FileText, CheckCircle2 } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-12">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-forest-500/10 dark:bg-forest-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-coral-500/5 dark:bg-coral-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-forest-700 dark:hover:text-forest-400 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-forest-50 dark:bg-forest-950/40 text-forest-700 dark:text-forest-300 border border-forest-500/20 font-display">
          <Lock className="w-3.5 h-3.5" />
          <span>DATA ETHICS & PRIVACY ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal-900 dark:text-white font-display tracking-tight">
          FollicleAI Privacy Policy
        </h1>
        <p className="text-xs text-charcoal-400 font-mono">
          Last Calibrated: October 2026 • Specification Version 2.4
        </p>
      </div>

      <div className="space-y-8 text-charcoal-700 dark:text-gray-300 leading-relaxed">
        {/* Core Privacy Commitments Glass Card */}
        <div className="p-8 rounded-4xl luxury-card border border-forest-500/20 dark:border-forest-500/30 space-y-4">
          <div className="flex items-center gap-2 text-forest-700 dark:text-forest-300">
            <ShieldCheck className="w-5 h-5 text-forest-600 dark:text-forest-400" />
            <h2 className="text-lg font-bold font-display m-0">
              Our Core Privacy Commitments
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl luxury-glass border border-white/60 dark:border-white/5 space-y-1">
              <span className="text-xs font-bold text-charcoal-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" />
                Zero Data Monetization
              </span>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                We never sell photographs or health assessments to advertisers or data brokers.
              </p>
            </div>
            <div className="p-4 rounded-2xl luxury-glass border border-white/60 dark:border-white/5 space-y-1">
              <span className="text-xs font-bold text-charcoal-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" />
                No Model Training
              </span>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                User images are strictly prohibited from training general AI or third-party models.
              </p>
            </div>
            <div className="p-4 rounded-2xl luxury-glass border border-white/60 dark:border-white/5 space-y-1">
              <span className="text-xs font-bold text-charcoal-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" />
                Isolated Guest Mode
              </span>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                Photos remain sandboxed in your browser’s local storage without compulsory accounts.
              </p>
            </div>
            <div className="p-4 rounded-2xl luxury-glass border border-white/60 dark:border-white/5 space-y-1">
              <span className="text-xs font-bold text-charcoal-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" />
                One-Click Complete Wipe
              </span>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                Purge all saved scans, overlays, and journals instantly from the User Dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <section className="p-6 rounded-3xl luxury-glass border border-surface-border dark:border-white/5 space-y-2">
          <h2 className="text-lg font-bold text-charcoal-900 dark:text-white font-display">
            1. What Data We Process
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-gray-300 leading-relaxed">
            To generate hairline contour maps, FollicleAI processes front-facing photographs showing the forehead and frontal hairline boundary. We also process optional questionnaire items regarding hair texture, duration of changes, family history, and scalp sensations to personalize hair care regimens.
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-6 rounded-3xl luxury-glass border border-surface-border dark:border-white/5 space-y-2">
          <h2 className="text-lg font-bold text-charcoal-900 dark:text-white font-display">
            2. Biometric Data Clarification
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-gray-300 leading-relaxed">
            FollicleAI extracts relative spatial geometric coordinates (such as the ratio between forehead height and facial length, and temple contour angles). We do not generate, store, or sell biometric identification templates or facial recognition embeddings capable of identifying individuals in public databases.
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-6 rounded-3xl luxury-glass border border-surface-border dark:border-white/5 space-y-2">
          <h2 className="text-lg font-bold text-charcoal-900 dark:text-white font-display">
            3. Client-Side Processing & Storage Controls
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-gray-300 leading-relaxed">
            By default, photo analysis can be performed in guest mode with results and journal timelines held in your web browser&apos;s isolated <code>localStorage</code>. When you delete your history from the User Dashboard, the records are wiped immediately from your browser storage.
          </p>
        </section>

        {/* Section 4 */}
        <section className="p-6 rounded-3xl luxury-glass border border-surface-border dark:border-white/5 space-y-2">
          <h2 className="text-lg font-bold text-charcoal-900 dark:text-white font-display">
            4. Security Standards & Contact
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-gray-300 leading-relaxed">
            All network communications utilize TLS 1.3 encryption in transit. Where private cloud persistence is configured by authenticated accounts, photographs are stored in private object buckets protected by short-lived signed URLs. For questions or data requests, contact <code>privacy@follicleai.com</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
