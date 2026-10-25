import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ShieldAlert, Lock, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer-shell relative w-full text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="glow-divider absolute top-0 left-0" />
      {/* Medical Notice */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-start gap-3 text-xs">
          <ShieldAlert className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            <strong className="text-zinc-900 dark:text-zinc-200 font-medium">Notice: </strong>
            This tool provides photographic hairline tracking and general cosmetic guidance. It is not a medical device and does not diagnose alopecia or scalp conditions. Consult a board-certified dermatologist for medical diagnosis.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Logo size="md" />
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
              Front hairline analysis, red contour tracking, and objective temple recession measurements.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Client-side privacy mode</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-zinc-900 dark:text-white font-mono uppercase tracking-wider text-[11px]">
              Hair Line Analyzer
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/analyze" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Launch Hairline Analyzer
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Red Contour Calibration
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-zinc-900 dark:text-white font-mono uppercase tracking-wider text-[11px]">
              Privacy & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} Hair Line Detector. Built with precision.</p>
          <p>Light & Dark theme enabled</p>
        </div>
      </div>
    </footer>
  );
}
