import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LanguageProvider } from "@/components/i18n/LanguageContext";
import { MotionObserver } from "@/components/ui/MotionObserver";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hair Line Detector — AI Hairline Analyzer & Contour Detection",
  description:
    "Detect hairline recession with red contour precision. Hair Line Detector analyzes temple recession, estimates Norwood stage, and tracks forehead ratios.",
  keywords: [
    "hair line detector",
    "hairline analyzer",
    "hair loss detector",
    "hairline scan",
    "red contour hairline",
    "temple recession",
    "Norwood scale",
  ],
  authors: [{ name: "Hair Line Detector Team" }],
  openGraph: {
    title: "Hair Line Detector — AI Hairline Analyzer",
    description:
      "Detect hairline recession with red contour precision. Calculate percentage loss and examine temple recession angles.",
    url: "https://hairlinedetector.com",
    siteName: "Hair Line Detector",
    images: [
      {
        url: "/images/sample-hairline-1.jpg",
        width: 1200,
        height: 630,
        alt: "Hair Line Detector Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hair Line Detector — AI Hairline Analyzer",
    description:
      "Detect visible hairline recession with red contour detection and normalized geometric analysis.",
    images: ["/images/sample-hairline-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors selection:bg-red-500 selection:text-white">
        <ThemeProvider>
          <LanguageProvider>
            <MotionObserver />
            <ScrollProgress />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
