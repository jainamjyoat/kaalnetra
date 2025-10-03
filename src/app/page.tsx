"use client";

import { useEffect, useRef, useState, useLayoutEffect, forwardRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import dynamic from "next/dynamic";
import Shuffle from "@/components/Shuffle";
import { Map, Flower2, Pencil, Globe, Moon, Search, LucideIcon } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/components/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Lenis from "lenis";

// import type { FeatureItem } from "@/components/lightswind/scroll-carousel";
// import ScrollVelocity from "@/components/ScrollVelocity";
import ScrollStack, { type ScrollStackCard } from "@/components/lightswind/scroll-stack";
import { SeasonalHoverCards, type SeasonCardProps } from "@/components/lightswind/seasonal-hover-cards";
import BackToTop from "@/components/Buttons/BackToTop";

gsap.registerPlugin(ScrollTrigger);

const StartButon1 = dynamic(() => import("@/components/Buttons/StartButon1"), { ssr: false });
// const ScrollCarousel = dynamic(
//   () => import("@/components/lightswind/scroll-carousel"),
//   { ssr: false }
// );

// // Feature cards used by ScrollCarousel
// const features: FeatureItem[] = [
//   {
//     icon: Flower2,
//     title: "Lavender",
//     description: "Calming scent with purple spikes and silvery foliage.",
//     image: "/Pictures/wallpaperflare.com_wallpaper.jpg",
//   },
//   {
//     icon: Globe,
//     title: "Dahlia",
//     description: "Layered petals with striking symmetry and vivid colors.",
//     image: "/Pictures/wallpaperflare.com_wallpaper (1).jpg",
//   },
//   {
//     icon: Map,
//     title: "Hydrangea",
//     description: "Globes of clustered blossoms that shift color with soil pH.",
//     image: "/Pictures/wallpaperflare.com_wallpaper (4).jpg",
//   },
//   {
//     icon: Moon,
//     title: "Orchid",
//     description: "Exotic forms and diverse patterns across thousands of species.",
//     image: "/Pictures/wallpaperflare.com_wallpaper (5).jpg",
//   },
//   {
//     icon: Search,
//     title: "Sunflower",
//     description: "Heliotropic heads that follow the sun across the sky.",
//     image: "/Pictures/wallpaperflare.com_wallpaper (6).jpg",
//   },
//   {
//     icon: Pencil,
//     title: "Rose",
//     description: "Classic petals with layered fragrance and timeless charm.",
//     image: "/Pictures/wallpaperflare.com_wallpaper (2).jpg",
//   },
// ];

const defaultStackCards: ScrollStackCard[] = [
  {
    title: "Global Phenology",
    subtitle: "Track flowering cycles around the world in real-time.",
    badge: "Live",
  },
  {
    title: "Climate Signals",
    subtitle: "See how temperature and rainfall shift bloom windows.",
    badge: "Climate",
  },
  {
    title: "Habitat Explorer",
    subtitle: "Browse biomes and their characteristic flora.",
    badge: "Biome",
  },
];


const seasonalCards: SeasonCardProps[] = [
  {
    title: "Spring",
    subtitle: "Fresh blooms and new growth",
    description: "Cherry blossoms, tulips, and new life returning across temperate regions.",
    imageSrc: "/Pictures/wallpaperflare.com_wallpaper.jpg",
    imageAlt: "Spring blossoms",
  },
  {
    title: "Summer",
    subtitle: "Peak color and pollinators",
    description: "Sunflowers, lavender fields, and vibrant pollinator activity.",
    imageSrc: "/Pictures/wallpaperflare.com_wallpaper (6).jpg",
    imageAlt: "Summer field",
  },
  {
    title: "Autumn",
    subtitle: "Fruiting and warm hues",
    description: "Dahlias and late-season flowers as leaves turn amber and crimson.",
    imageSrc: "/Pictures/wallpaperflare.com_wallpaper (1).jpg",
    imageAlt: "Autumn flowers",
  },
  {
    title: "Winter",
    subtitle: "Subtle structure and evergreens",
    description: "Hellebores and evergreen textures bring calm to dormant landscapes.",
    imageSrc: "/Pictures/wallpaperflare.com_wallpaper (2).jpg",
    imageAlt: "Winter evergreens",
  },
];

// --- BoldTitle Block ---
function BoldTitleBlock() {
  const boldTitle = useRef<HTMLDivElement | null>(null);
  const boldTitleLeft = useRef<HTMLSpanElement | null>(null);
  const boldTitleRight = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: boldTitle.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(boldTitleLeft.current, { xPercent: -50 }, { xPercent: -10 }, 0);
      tl.fromTo(boldTitleRight.current, { xPercent: 50 }, { xPercent: 10 }, 0);
    },
    { scope: boldTitle }
  );

  return (
    <section className="relative bg-neutral-950 text-white pt-8 pb-6 sm:pt-10 sm:pb-8 md:pt-10 md:pb-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={boldTitle}
          className="grid grid-cols-12 md:grid-rows-3 gap-y-8 md:gap-y-10 md:gap-x-12 gap-x-6 items-center mt-6 md:mt-10"
        >
          {/* Left half of the sentence (columns 1-4) */}
          <div className="hidden md:block md:col-start-1 md:col-span-4 md:row-span-3 justify-self-end self-center pr-8">
            <ScrollReveal
              size="sm"
              align="right"
              variant="default"
              containerClassName="max-w-[26ch]"
              textClassName="text-white/90 font-bold text-right leading-snug"
              baseOpacity={0.15}
              blurStrength={6}
              staggerDelay={0.05}
              threshold={0.3}
            >
              A living atlas that reveals when and where flowers bloom
            </ScrollReveal>
          </div>

          {/* Center animated title (columns 5-8) */}
          <span
            ref={boldTitleLeft}
            className="col-span-12 md:col-start-5 md:col-span-4 md:row-start-1 text-center font-extrabold leading-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl will-change-transform"
          >
            Kaalnetra
          </span>
          <span className="col-span-12 md:col-start-5 md:col-span-4 md:row-start-2 text-center italic font-extrabold leading-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Flora
          </span>
          <span
            ref={boldTitleRight}
            className="col-span-12 md:col-start-5 md:col-span-4 md:row-start-3 text-center font-extrabold leading-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl will-change-transform"
          >
            Atlas
          </span>

          {/* Right half of the sentence (columns 9-12) */}
          <div className="hidden md:block md:col-start-9 md:col-span-4 md:row-span-3 justify-self-start self-center pl-8">
            <ScrollReveal
              size="sm"
              align="left"
              variant="default"
              containerClassName="max-w-[26ch]"
              textClassName="text-white/85 font-semibold text-left leading-snug"
              baseOpacity={0.15}
              blurStrength={6}
              staggerDelay={0.05}
              threshold={0.3}
            >
              blending satellite context, climate patterns, and rich regional stories you can explore.
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [syncTick, setSyncTick] = useState(0);

  const items = [
    {
      image: "Pictures/wallpaperflare.com_wallpaper.jpg",
      title: "Lavender",
      description: "Calming scent with purple spikes and silvery foliage.",
      features: ["Bloom: Late Spring", "Color: Purple", "Habitat: Mediterranean"],
    },
    {
      image: "Pictures/wallpaperflare.com_wallpaper (1).jpg",
      title: "Dahlia",
      description: "Layered petals with striking symmetry and vivid colors.",
      features: ["Bloom: Summer/Fall", "Color: Various", "Habitat: Temperate gardens"],
    },
    {
      image: "Pictures/wallpaperflare.com_wallpaper (4).jpg",
      title: "Hydrangea",
      description: "Globes of clustered blossoms that shift color with soil pH.",
      features: ["Bloom: Summer", "Color: Blue/Pink/White", "Habitat: Woodland edges"],
    },
    {
      image: "Pictures/wallpaperflare.com_wallpaper (5).jpg",
      title: "Orchid",
      description: "Exotic forms and diverse patterns across thousands of species.",
      features: ["Bloom: Varies", "Color: Diverse", "Habitat: Tropical"],
    },
    {
      image: "Pictures/wallpaperflare.com_wallpaper (6).jpg",
      title: "Sunflower",
      description: "Heliotropic heads that follow the sun across the sky.",
      features: ["Bloom: Summer", "Color: Yellow", "Habitat: Fields and prairies"],
    },
    {
      image: "Pictures/wallpaperflare.com_wallpaper (2).jpg",
      title: "Rose",
      description: "Classic petals with layered fragrance and timeless charm.",
      features: ["Bloom: Spring/Summer", "Color: Various", "Habitat: Gardens"],
    },
  ];

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

  useEffect(() => {
    const id = setInterval(() => setSyncTick((t) => t + 1), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", () => {
      try {
        ScrollTrigger.update();
      } catch {}
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl
        .from(".hero-overlay", { opacity: 0, duration: 0.6 })
        .from(".hero-title", { y: 24, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".hero-copy", { y: 16, opacity: 0, duration: 0.6 }, "-=0.35")
        .fromTo(
          ".hero-cta",
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5 },
          "-=0.35"
        );

      if (videoRef.current) {
        gsap.fromTo(videoRef.current, { scale: 1 }, { scale: 1.05, duration: 12, ease: "none" });
      }

      tl.add(() => {
        gsap.set(".hero-cta", { clearProps: "opacity,visibility" });
      });

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReduced) {
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
    },
    { scope: containerRef }
  );

  return (
    <>
      <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden text-white">
        <video
          ref={videoRef}
          className="hero-video absolute inset-0 h-full w-full object-cover z-0 object-[50%_40%] md:object-[50%_35%]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/Video/Earth.mp4" type="video/mp4" />
          <source src="https://cdn.coverr.co/videos/coverr-planet-earth-rotating-2906/1080p.mp4" type="video/mp4" />
          <source src="https://cdn.coverr.co/videos/coverr-planet-earth-rotating-2906/720p.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay absolute inset-0 bg-black/50 z-20" />

        <main className="relative z-30 flex flex-col items-center justify-center px-6 text-center min-h-screen w-full">
          <div className="flex flex-col w-full items-center justify-center max-w-5xl mx-auto mt-30 sm:mt-34">
            <h1 className="hero-title mb-8 sm:mb-10 text-4xl sm:text-6xl font-semibold tracking-tight">
              <Shuffle
                key={`title-sync-${syncTick}-k`}
                text="Kaalnetra"
                tag="span"
                className="normal-case"
                style={{ fontSize: "inherit", lineHeight: "inherit" }}
                triggerOnce
                triggerOnHover={false}
              />
              <span className="mx-4 sm:mx-6" />
              <Shuffle
                key={`title-sync-${syncTick}-f`}
                text="Flora"
                tag="span"
                className="normal-case text-emerald-400"
                style={{ fontSize: "inherit", lineHeight: "inherit" }}
                triggerOnce
                triggerOnHover={false}
              />
              <span className="mx-4 sm:mx-6" />
              <Shuffle
                key={`title-sync-${syncTick}-a`}
                text="Atlas"
                tag="span"
                className="normal-case text-white-400"
                style={{ fontSize: "inherit", lineHeight: "inherit" }}
                triggerOnce
                triggerOnHover={false}
              />
            </h1>
            <p className="hero-copy mx-auto mb-8 max-w-2xl text-base text-white/90 sm:text-lg">
              Explore real-time flowering and plant phenology across the globe. Discover what blooms where, when, and why — powered by interactive maps and rich environmental context.
            </p>
            <div className="flex gap-4 mb-10 hero-cta">
              <Link href="/map2"><StartButon1 /></Link>
            </div>
          </div>
        </main>
      </div>

      {/* Bold title animation block */}
      <BoldTitleBlock />

      {/* <section className="bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <ScrollCarousel features={features} />
        </div>
      </section> */}

      {/* <section className="bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
          <ScrollVelocity texts={features.map((f) => f.title)} velocity={100} />
        </div>
      </section> */}

      <section className="bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
          <ScrollStack cards={defaultStackCards} />
        </div>
      </section>

      <section className="bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-10 md:pt-8 md:pb-12">
          <h1 className="text-4xl font-bold text-center p-6 mt-2">
  Seasonal Flower Gallery
</h1>

          <SeasonalHoverCards cards={seasonalCards} />
        </div>
      </section>

      <BackToTop />
                </>
  );
}
