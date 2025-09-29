"use client";

import { useEffect, useRef, useState, useLayoutEffect, forwardRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import dynamic from "next/dynamic";
import Shuffle from "@/components/Shuffle";
import { Map, Flower2, Pencil, Globe, Moon, Search, LucideIcon } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/components/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const StartButon1 = dynamic(() => import("@/components/Buttons/StartButon1"), { ssr: false });

// --- ScrollCarousel Types ---
export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

export interface ScrollCarouselProps {
  features: FeatureItem[];
  className?: string;
  maxScrollHeight?: number;
}

// --- Hook for animations ---
const useFeatureAnimations = (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>,
  progressBarRef: React.MutableRefObject<HTMLDivElement | null>,
  cardRefs: React.MutableRefObject<HTMLDivElement[]>,
  isDesktop: boolean,
  maxScrollHeight?: number
) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isDesktop) {
        const scrollWidth1 = scrollContainerRef.current?.scrollWidth || 0;
                const containerWidth = containerRef.current?.offsetWidth || 0;
        const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
        const viewportOffset = (containerWidth - cardWidth) / 2;

        const finalOffset1 = scrollWidth1 - containerWidth + viewportOffset;
        
        const scrollDistance = maxScrollHeight || finalOffset1;

        
        gsap
          .timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${scrollDistance}`,
              scrub: 1,
              pin: true,
            },
          })
          .fromTo(
            scrollContainerRef.current,
            { x: viewportOffset },
            { x: -finalOffset1 + viewportOffset, ease: "none" }
          );

        
        gsap.to(progressBarRef.current, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: true,
          },
        });
      } else {
        const allCards = [...cardRefs.current];
        allCards.forEach((card, index) => {
          if (card) {
            gsap.fromTo(
              card,
              { opacity: 0, x: index % 2 === 0 ? -200 : 200 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 0%",
                  toggleActions: "play none none none",
                  once: true,
                },
              }
            );
          }
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isDesktop, maxScrollHeight]);
};

// --- ScrollCarousel Component ---
export const ScrollCarousel = forwardRef<HTMLDivElement, ScrollCarouselProps>(
  ({ features, className, maxScrollHeight }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
        const progressBarRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);
        const [isDesktop, setIsDesktop] = useState(false);

    
    
    useEffect(() => {
      const checkDesktop = () => {
        setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
      };
      checkDesktop();
      window.addEventListener("resize", checkDesktop);
      return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    useFeatureAnimations(
      containerRef,
      scrollContainerRef,
      progressBarRef,
      cardRefs,
      isDesktop,
      maxScrollHeight
    );

    const renderFeatureCards = (
      featureSet: FeatureItem[],
      refs: React.MutableRefObject<HTMLDivElement[]>
    ) =>
      featureSet.map((feature, index) => (
        <div
          key={feature.title}
          ref={(el: HTMLDivElement | null) => {
            if (el) refs.current[index] = el;
          }}
          className="feature-card flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[420px] lg:w-[520px] h-[240px] sm:h-[280px] md:h-[340px] lg:h-[380px] z-10 gap-4 group relative transition-all duration-300 ease-in-out"
        >
          <div
            className={cn(
              `relative h-full p-4 lg:p-8 rounded-3xl backdrop-blur-sm flex items-center justify-center z-10 transition-all duration-300 my-4`,
              `backdrop-blur-lg border text-black dark:text-white`,
              "group-hover:scale-105 centered:scale-105"
            )}
          >
            <img
              src={
                feature.image ||
                "https://images.pexels.com/photos/9934462/pexels-photo-9934462.jpeg"
              }
              alt=""
              className="absolute inset-0 w-full h-full object-cover z-[-1] rounded-3xl"
            />
            <div className="absolute bottom-4 z-10 w-full px-4">
              <div
                className={cn(
                  `flex flex-col justify-end h-full opacity-100 translate-y-4 transition-all duration-300 ease-out text-center`
                )}
              >
                <h3 className="text-2xl mb-0 font-bold text-white transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-white text-xs mb-4 opacity-60">
                  {feature.description}
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/5 dark:group-hover:bg-white/5 centered:bg-black/5 dark:centered:bg-white/5 rounded-2xl group-hover:blur-md" />
          </div>
        </div>
      ));

    return (
      <section
        className={cn(
          "bg-transparent text-foreground relative overflow-hidden",
          className
        )}
        ref={ref}
      >
        <div
          ref={containerRef}
          className="relative overflow-hidden md:h-screen md:py-20 flex flex-col gap-0 z-10 lg:[mask-image:_linear-gradient(to_right,transparent_0,_black_5%,_black_95%,transparent_100%)]"
        >
          <div
            ref={scrollContainerRef}
            className="flex flex-col md:flex-row gap-8 items-center h-full px-6 md:px-0"
          >
            {renderFeatureCards(features, cardRefs)}
          </div>

          
          {isDesktop && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-2 bg-white/30 dark:bg-black/30 z-50 overflow-hidden rounded-full">
              <div
                ref={progressBarRef}
                className="h-full rounded-full relative overflow-hidden transition-all duration-100"
                style={{ width: "0%" }}
              >
                <div className="absolute inset-0 animated-water" />
              </div>
            </div>
          )}
        </div>
        <style jsx>{`
          .animated-water {
            background: repeating-linear-gradient(
              -45deg,
              rgba(255, 255, 255, 0.9) 0%,
              rgba(255, 255, 255, 0.6) 25%,
              rgba(255, 255, 255, 0.9) 50%
            );
            background-size: 40px 40px;
            animation: waveMove 2s linear infinite;
          }
          :global(.dark) .animated-water {
            background: repeating-linear-gradient(
              -45deg,
              rgba(0, 0, 0, 0.7) 0%,
              rgba(0, 0, 0, 0.5) 25%,
              rgba(0, 0, 0, 0.7) 50%
            );
          }
          @keyframes waveMove {
            from { background-position: 0 0; }
            to { background-position: 40px 40px; }
          }
        `}</style>
      </section>
    );
  }
);

(ScrollCarousel as any).displayName = "ScrollCarousel";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [syncTick, setSyncTick] = useState(0);

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
    const id = setInterval(() => setSyncTick(t => t + 1), 4000);
    return () => clearInterval(id);
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

    tl.add(() => {
      gsap.set(".hero-cta", { clearProps: "opacity,visibility" });
    });

    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  }, { scope: containerRef });

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
              <Link href="/map"><StartButon1 /></Link>
            </div>
          </div>
        </main>
      </div>

      <section className="w-full bg-neutral-950 text-white py-16 sm:py-20 md:py-24">
        <div className="w-full max-w-6xl mx-auto px-6">
          <ScrollCarousel
            className="w-full"
            features={[
              { icon: Map, title: "Global Map Exploration", description: "Pan, zoom, and discover flowers anywhere on Earth with animated bloom cycles.", image: "Pictures/wallpaperflare.com_wallpaper.jpg" },
              { icon: Flower2, title: "Live Flower Snapshots", description: "Open a marker to view phenology details, climate info, and seasonal windows.", image: "Pictures/wallpaperflare.com_wallpaper (1).jpg" },
              { icon: Pencil, title: "Drawing & Analysis", description: "Draw regions, filter data, and analyze local flowering phenomena.", image: "Pictures/wallpaperflare.com_wallpaper (4).jpg" },
              { icon: Globe, title: "Environmental Context", description: "Understand how climate and geography influence blooming periods.", image: "Pictures/wallpaperflare.com_wallpaper (5).jpg" },
              { icon: Moon, title: "Dark Mode Aesthetics", description: "Readable, elegant visuals optimized for nighttime viewing.", image: "Pictures/wallpaperflare.com_wallpaper (6).jpg" },
              { icon: Search, title: "Discover & Compare", description: "Find rare, seasonal, and diverse species and compare across regions.", image: "Pictures/wallpaperflare.com_wallpaper (2).jpg" }
            ]}
            maxScrollHeight={2000}
          />
        </div>
      </section>
    </>
  );
}
