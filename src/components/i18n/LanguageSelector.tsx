"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage, LANGUAGES, Language } from "./LanguageContext";
import { Globe, Check, ChevronDown } from "lucide-react";

interface LanguageSelectorProps {
  variant?: "minimal" | "compact" | "full";
  className?: string;
}

export function LanguageSelector({ variant = "compact", className = "" }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100/80 hover:bg-zinc-200/80 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 backdrop-blur-sm transition-all"
        aria-label="Select language"
      >
        <span className="text-sm leading-none">{currentOption.flag}</span>
        <span className="hidden sm:inline font-medium">{currentOption.label}</span>
        <ChevronDown className="w-3 h-3 text-zinc-500 transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-52 rounded-2xl bg-white/95 dark:bg-[#0E1117]/95 backdrop-blur-xl shadow-2xl border border-zinc-200 dark:border-white/10 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-white/5 mb-1 font-mono">
            Language / భాష / भाषा
          </div>
          {LANGUAGES.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => {
                setLanguage(opt.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60 transition-colors ${language === opt.code
                ? "text-red-600 dark:text-red-400 font-semibold bg-red-500/10 dark:bg-red-500/15"
                : "text-zinc-700 dark:text-zinc-300"
                }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{opt.flag}</span>
                <span>{opt.nativeLabel}</span>
              </div>
              {language === opt.code && <Check className="w-3.5 h-3.5 text-red-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
