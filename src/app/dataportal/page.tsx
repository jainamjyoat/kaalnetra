"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import PlantButton from "@/components/Buttons/Plant";

export default function DataPortalPage() {
  const features = [
    "NASA Landsat & MODIS satellite imagery",
    "Historical bloom event datasets",
    "Climate correlation data",
    "RESTful API access",
    "Custom data exports",
  ];

  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(scope);

    // Nav entrance
    gsap.from(q("header"), { y: -20, opacity: 0, duration: 0.6, ease: "power2.out" });

    // Header text/icon entrance
    gsap.from([q("[data-icon]"), q("[data-title]"), q("[data-subtitle]")], {
      y: 20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
    });

    // Features list stagger
    gsap.from(q("[data-feature]"), {
      y: 16,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.06,
      delay: 0.1,
    });

    // CTAs
    gsap.from(q("[data-cta]"), {
      y: 16,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.08,
    });

    // Section reveal on scroll
    const sections = gsap.utils.toArray(q("[data-section]")) as HTMLElement[];
    sections.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope });

  return (
    <div ref={scope} className="min-h-screen bg-neutral-950 text-neutral-100 p-6 pt-24 sm:pt-28">

      <main className="mx-auto max-w-4xl">
        

        {/* Card */}
        <section data-section className="rounded-xl border border-white/10 bg-neutral-900">
          <header className="px-6 pt-8 pb-4 text-center">
            <div className="mb-4 flex justify-center">
              {/* Database icon (inline SVG to avoid extra deps) */}
              <svg
                data-icon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-12 w-12 text-emerald-400"
              >
                <ellipse cx="12" cy="6" rx="8" ry="3" />
                <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
                <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
              </svg>
            </div>

            <h1 data-title className="text-3xl font-semibold text-emerald-300 mb-2">Data Portal</h1>
            <p data-subtitle className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Access raw satellite data, APIs, and research datasets from NASA Earth observations. Download historical
              bloom data and integrate with your own research projects.
            </p>
          </header>

          <div className="px-6 pb-8 space-y-8">
            {/* Coming soon */}
            <div className="rounded-lg bg-neutral-800/60 p-6">
              <h3 className="text-xl font-medium text-neutral-100 mb-4">Download Now</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div data-feature key={i} className="flex items-center gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-neutral-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PlantButton
                data-cta
                href="https://drive.google.com/file/d/1Fe4TQx9ZgJEa2y5aZOYzlw_-DRCsIBdz/view?usp=sharing"
                className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600 transition-colors"
              >
                Download Now
              </PlantButton>
              <Link
                data-cta
                href="/prediction-analysis"
                className="inline-flex items-center justify-center rounded-md border border-emerald-400/40 text-emerald-300 px-4 py-2 hover:bg-emerald-400/10 transition-colors"
              >
                View Dashboard
              </Link>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-neutral-400 text-center">
                This page is currently under development. Visit our main features in the meantime!
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
