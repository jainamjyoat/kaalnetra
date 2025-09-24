"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.defaultPlaybackRate = 0.5;
    v.playbackRate = 0.5;
    const p = v.play?.();
    if (p && typeof (p as any).catch === "function") {
      (p as Promise<void>).catch(() => {});
    }
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-overlay", { opacity: 0, duration: 0.6 })
      .from(".hero-title", { y: 24, opacity: 0, duration: 0.8 }, "-=0.3")
      .from(".hero-copy", { y: 16, opacity: 0, duration: 0.6 }, "-=0.35")
      .fromTo(".hero-cta", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.35");

    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { scale: 1 },
        { scale: 1.05, duration: 12, ease: "none" }
      );
    }

    // Ensure CTA ends fully visible after entrance
    tl.add(() => {
      gsap.set(".hero-cta", { clearProps: "opacity,visibility" });
    });

    // Subtle attention loop for the "Get Started" button (respects reduced motion)
    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      // Start the loop after the entrance timeline completes to avoid overlap/jitter
      const loopDelay = tl.duration() + 0.2;
      gsap.set(".hero-cta", { transformOrigin: "50% 50%", y: 0, scale: 1 });
      gsap.to(".hero-cta", {
        y: -2,
        scale: 1.03,
        duration: 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: loopDelay,
      });
    }
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden text-white"
          >
      {/* Background video */}
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 h-full w-full object-cover z-0 object-[50%_40%] md:object-[50%_35%]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        {/* Local project video */}
        <source src="/Video/Earth.mp4" type="video/mp4" />
        {/* Remote fallbacks */}
        <source src="https://cdn.coverr.co/videos/coverr-planet-earth-rotating-2906/1080p.mp4" type="video/mp4" />
        <source src="https://cdn.coverr.co/videos/coverr-planet-earth-rotating-2906/720p.mp4" type="video/mp4" />
      </video>

      
      {/* Dark overlay for readability */}
      <div className="hero-overlay absolute inset-0 bg-black/50 z-20" />

      {/* Content */}
      <main className="relative z-30 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="hero-title mb-4 text-4xl font-semibold tracking-tight sm:text-6xl">Kaalnetra Flora Atlas</h1>
        <p className="hero-copy mx-auto mb-8 max-w-2xl text-base text-white/90 sm:text-lg">
          Explore real-time flowering and plant phenology across the globe. Discover what blooms where, when, and why —
          powered by interactive maps and rich environmental context.
        </p>
        <div className="flex gap-4">
          <Link
            href="/map"
            className="hero-cta inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 transform-gpu will-change-transform"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}
