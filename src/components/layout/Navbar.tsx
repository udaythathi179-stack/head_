"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useLanguage } from "@/components/i18n/LanguageContext";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import {
  Sun,
  Moon,
  Menu,
  X,
  Scan,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t("navHome"), href: "/" },
    { label: t("navProducts"), href: "/#products" },
    { label: t("navAnalyzer"), href: "/analyze" },
  ];

  return (
    <header className="nav-glass sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={isActive}
                className={`nav-link px-3 py-1.5 rounded-md text-xs font-medium ${
                  isActive
                    ? "text-zinc-950 dark:text-white bg-zinc-100/70 dark:bg-zinc-800/70"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-colors"
            aria-label="Toggle theme"
            title="Toggle light/dark theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-zinc-700" />
            ) : (
              <Sun className="w-4 h-4 text-zinc-300" />
            )}
          </button>

          {/* Primary Action Button */}
          <Link
            href="/analyze"
            className="btn-brand inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>{t("launchAnalyzer")}</span>
          </Link>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSelector />

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-zinc-300" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090B] px-4 py-4 space-y-2">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <Link
              href="/analyze"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-brand w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold"
            >
              <Scan className="w-4 h-4" />
              <span>{t("launchAnalyzer")}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
