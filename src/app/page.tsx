"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
          >
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover z-0"
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
      <div className="absolute inset-0 bg-black/50 z-20" />

      {/* Content */}
      <main className="relative z-30 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-6xl">Kaalnetra Flora Atlas</h1>
        <p className="mx-auto mb-8 max-w-2xl text-base text-white/90 sm:text-lg">
          Explore real-time flowering and plant phenology across the globe. Discover what blooms where, when, and why —
          powered by interactive maps and rich environmental context.
        </p>
        <div className="flex gap-4">
          <Link
            href="/map"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}
