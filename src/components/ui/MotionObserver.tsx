"use client";

import { useEffect } from "react";

export function MotionObserver() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealAll = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
        .forEach((el) => el.classList.add("is-visible"));
    };

    if (prefersReduced || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -48px 0px" }
    );

    const observed = new WeakSet<Element>();

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (!observed.has(el) && !el.classList.contains("is-visible")) {
          observed.add(el);
          observer.observe(el);
        }
      });
    };

    observeAll();

    let frame = 0;
    const mutationObserver = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(observeAll);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}

export default MotionObserver;
