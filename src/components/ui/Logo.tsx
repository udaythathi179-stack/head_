import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export function Logo({ className = "", size = "md", withText = true }: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Follicle Minimalist Icon: an elegant follicle root turning into an upward rising curved hair strand */}
      <div className={`relative ${iconSizes[size]} rounded-xl bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center p-1.5 border border-red-500/25 dark:border-red-500/35 group-hover:border-red-500/60 shadow-[0_0_15px_-3px_rgba(255,51,102,0.35)] transition-all duration-300`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-red-600 dark:text-red-400 transform group-hover:scale-105 transition-transform duration-300"
        >
          {/* Subtle curved hairline baseline */}
          <path
            d="M 6 27 C 12 18, 24 18, 30 27"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="1 2.5"
            opacity="0.45"
          />
          {/* Main Follicle & Hair Strand Wave */}
          <path
            d="M 18 30 C 14 30, 11 26, 13 21 C 15 16, 23 14, 21 7 C 20 4.5, 18 4, 18 4"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Precision AI anchor dot (at follicle bulb) */}
          <circle cx="18" cy="30" r="2.2" fill="#FF3366" />
          {/* Vitality node */}
          <circle cx="21" cy="7" r="1.5" fill="currentColor" opacity="0.8" />
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col">
          <span className={`font-display font-bold tracking-tight text-charcoal-900 dark:text-white ${textSizes[size]}`}>
            Hair Line <span className="text-red-500 font-medium">Detector</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-charcoal-400 dark:text-gray-400 -mt-1 hidden sm:block">
            Hairline Analyzer
          </span>
        </div>
      )}
    </Link>
  );
}
