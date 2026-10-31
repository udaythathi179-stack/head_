"use client";

import React, { useState, useRef } from "react";
import { HairlineAnalysisResult, BoundaryPoint } from "@/types/analysis";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sliders,
  Layers,
  Info,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface HairlineCanvasViewerProps {
  analysis: HairlineAnalysisResult;
  showControls?: boolean;
  className?: string;
}

export function HairlineCanvasViewer({
  analysis,
  showControls = true,
  className = "",
}: HairlineCanvasViewerProps) {
  const [mode, setMode] = useState<"overlay" | "slider" | "original">("overlay");
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Layer toggles
  const [showBoundary, setShowBoundary] = useState<boolean>(true);
  const [showZones, setShowZones] = useState<boolean>(true);
  const [showBaseline, setShowBaseline] = useState<boolean>(false);
  const [showLandmarks, setShowLandmarks] = useState<boolean>(true);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // SVG smooth Bézier path generator
  const createSmoothPath = (points: BoundaryPoint[]): string => {
    if (!points || points.length === 0) return "";
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i < points.length - 2 ? points[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const createPolygon = (points: BoundaryPoint[]): string => {
    return points.map((p) => `${p.x},${p.y}`).join(" ");
  };

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.8));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Slider drag handler
  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {/* Top Developer Toolbar */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-2.5 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          {/* View Mode Toggle Pill Switch */}
          <div className="inline-flex items-center p-0.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs">
            <button
              onClick={() => setMode("overlay")}
              className={`px-3 py-1 rounded transition-colors text-xs font-medium ${
                mode === "overlay"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              Overlay View
            </button>
            <button
              onClick={() => setMode("slider")}
              className={`px-3 py-1 rounded transition-colors text-xs font-medium flex items-center gap-1 ${
                mode === "slider"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              <Sliders className="w-3 h-3" />
              <span>Split Slider</span>
            </button>
            <button
              onClick={() => setMode("original")}
              className={`px-3 py-1 rounded transition-colors text-xs font-medium ${
                mode === "original"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              Original Only
            </button>
          </div>

          {/* Quick Zoom & Layer Toggles */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300">
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-1" />

            {/* Quick Layer Toggles */}
            <button
              onClick={() => setShowBoundary(!showBoundary)}
              className={`px-2 py-1 rounded-md border text-[11px] font-mono flex items-center gap-1.5 transition-colors ${
                showBoundary
                  ? "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                  : "border-zinc-200 dark:border-zinc-700 text-zinc-400"
              }`}
              title="Toggle detected hairline line"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Red Hairline</span>
            </button>

            <button
              onClick={() => setShowZones(!showZones)}
              className={`px-2 py-1 rounded-md border text-[11px] font-mono flex items-center gap-1.5 transition-colors ${
                showZones
                  ? "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                  : "border-zinc-200 dark:border-zinc-700 text-zinc-400"
              }`}
              title="Toggle recession highlight shading"
            >
              <span className="w-2 h-1.5 rounded-sm bg-red-500/40" />
              <span>Loss Zones</span>
            </button>

            <button
              onClick={() => setShowBaseline(!showBaseline)}
              className={`px-2 py-1 rounded-md border text-[11px] font-mono flex items-center gap-1.5 transition-colors ${
                showBaseline
                  ? "bg-zinc-200 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100"
                  : "border-zinc-200 dark:border-zinc-700 text-zinc-400"
              }`}
              title="Show estimated baseline"
            >
              <span className="w-2 h-0.5 border-t border-dashed border-zinc-400" />
              <span>Baseline</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseMove={(e) => {
          if (mode === "slider") handleSliderMove(e);
        }}
        onTouchMove={(e) => {
          if (mode === "slider") handleSliderMove(e);
        }}
        className="relative w-full aspect-[4/5] sm:aspect-[4/4.5] md:aspect-[4/4] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 shadow-2xl select-none cursor-crosshair group laser-reticle"
      >
        {/* Workstation Viewfinder Corner Reticles */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-red-500/70 z-20 pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-red-500/70 z-20 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-red-500/70 z-20 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-red-500/70 z-20 pointer-events-none" />

        {/* Transform wrapper for Zoom & Pan */}
        <div
          className="relative w-full h-full transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          }}
        >
          {/* Base Layer: Original Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={analysis.imageUrl}
            alt="Hairline subject photograph"
            className="w-full h-full object-cover object-center pointer-events-none filter brightness-95 contrast-105"
          />

          {/* Overlay Layer (Contour & SVG annotations) */}
          {mode !== "original" && (
            <div
              className="absolute inset-0 pointer-events-auto"
              style={{
                clipPath:
                  mode === "slider"
                    ? `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
                    : undefined,
              }}
            >
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full absolute inset-0 overflow-visible"
              >
                {/* 1. Recession zones (shaded translucent coral red) */}
                {showZones &&
                  analysis.recessionZones?.map((zone) => (
                    <polygon
                      key={zone.id}
                      points={createPolygon(zone.points)}
                      fill="#E84D4D"
                      fillOpacity="0.24"
                      stroke="#E84D4D"
                      strokeWidth="0.45"
                      strokeDasharray="1.2 1.2"
                      className="transition-all hover:fill-opacity-35 cursor-pointer"
                      onClick={() => setActiveTooltip(`Zone: ${zone.name} (${zone.confidencePct}% match)`)}
                    />
                  ))}

                {/* 2. Hypothetical juvenile baseline (dashed green line) */}
                {showBaseline && analysis.originalEstimatedBoundary && (
                  <path
                    d={createSmoothPath(analysis.originalEstimatedBoundary)}
                    fill="none"
                    stroke="#2C5743"
                    strokeWidth="0.9"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                )}

                {/* 3. Detected Primary Hairline Boundary (Luminous Coral Red Line) */}
                {showBoundary && (
                  <path
                    d={createSmoothPath(analysis.hairlineBoundary)}
                    fill="none"
                    stroke="#E84D4D"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_8px_rgba(232,77,77,0.95)]"
                  />
                )}

                {/* 4. Landmark Points & Measurement Anchors */}
                {showLandmarks &&
                  analysis.hairlineBoundary.map((pt, idx) => {
                    const isLeftTemple = idx === 2;
                    const isRightTemple = idx === 6;
                    const isMidCenter = idx === 4;
                    const isKeyPoint = isLeftTemple || isRightTemple || isMidCenter;

                    if (!isKeyPoint) return null;

                    return (
                      <g key={idx} className="cursor-pointer group/dot">
                        {/* Outer pulse circle */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="2.2"
                          fill="#E84D4D"
                          fillOpacity="0.3"
                          className="animate-ping"
                        />
                        {/* Center core point with bright contrast ring */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="1.3"
                          fill="#FFFFFF"
                          stroke="#E84D4D"
                          strokeWidth="0.8"
                          onClick={() => {
                            if (isLeftTemple)
                              setActiveTooltip(`Left Temple Notch: ${analysis.leftTemple.depthEstimateLabel}`);
                            else if (isRightTemple)
                              setActiveTooltip(`Right Temple Notch: ${analysis.rightTemple.depthEstimateLabel}`);
                            else if (isMidCenter)
                              setActiveTooltip(`Mid-Frontal Apex: Forehead ratio ${analysis.measurements.foreheadRatio}`);
                          }}
                        />
                      </g>
                    );
                  })}
              </svg>
            </div>
          )}

          {/* Interactive Split Slider Handle with Metallic Glass Styling */}
          {mode === "slider" && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)] cursor-ew-resize z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white dark:bg-charcoal-900 text-charcoal-900 dark:text-white shadow-2xl flex items-center justify-center border-2 border-forest-500 pointer-events-auto">
                <Sliders className="w-4 h-4 rotate-90 text-forest-600 dark:text-forest-400" />
              </div>
              <div className="absolute top-4 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[10px] font-mono pointer-events-none">
                AI Overlay
              </div>
              <div className="absolute top-4 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[10px] font-mono pointer-events-none">
                Original
              </div>
            </div>
          )}
        </div>

        {/* Floating Active Tooltip Notification */}
        {activeTooltip && (
          <div className="absolute bottom-5 left-5 right-5 z-30 p-3 rounded-2xl bg-charcoal-950/90 backdrop-blur-md text-white text-xs border border-coral-500/40 flex items-center justify-between shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-coral-400 shrink-0" />
              <span>{activeTooltip}</span>
            </div>
            <button
              onClick={() => setActiveTooltip(null)}
              className="text-gray-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-white/10"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Sample Demonstration Watermark Badge */}
        {analysis.isDemo && (
          <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-charcoal-950/85 backdrop-blur-md border border-forest-500/30 text-forest-300 text-[11px] font-mono flex items-center gap-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulse" />
            <span>SAMPLE DEMONSTRATION OVERLAY</span>
          </div>
        )}
      </div>

      {/* Modern Annotation Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-charcoal-600 dark:text-gray-400 pt-1">
        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-surface-muted/60 dark:bg-white/[0.04] border border-surface-border">
          <span className="w-3.5 h-1 rounded-full bg-coral-500 shadow-sm" />
          <span className="font-semibold text-charcoal-800 dark:text-gray-200">Hairline Boundary</span>
        </div>
        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-surface-muted/60 dark:bg-white/[0.04] border border-surface-border">
          <span className="w-3.5 h-2.5 rounded-sm bg-coral-500/30 border border-coral-500/50" />
          <span className="font-semibold text-charcoal-800 dark:text-gray-200">Recession Zone</span>
        </div>
        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-surface-muted/60 dark:bg-white/[0.04] border border-surface-border">
          <span className="w-2.5 h-2.5 rounded-full border border-coral-500 bg-white" />
          <span className="font-semibold text-charcoal-800 dark:text-gray-200">Temple Landmark</span>
        </div>
        <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-surface-muted/60 dark:bg-white/[0.04] border border-surface-border">
          <span className="w-3.5 h-0.5 border-t border-dashed border-forest-600 dark:border-forest-400" />
          <span className="font-semibold text-charcoal-800 dark:text-gray-200">Juvenile Baseline</span>
        </div>
      </div>
    </div>
  );
}
