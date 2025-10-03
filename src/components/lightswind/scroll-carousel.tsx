// "use client";

// import React, { useEffect, useRef, useState, forwardRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { LucideIcon } from "lucide-react";
// import { cn } from "../lib/utils";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export interface FeatureItem {
//   icon: LucideIcon;
//   title: string;
//   description: string;
//   image: string;
// }

// export interface ScrollCarouselProps {
//   features: FeatureItem[];
//   className?: string;
//   maxScrollHeight?: number;
// }

// const initFeatureAnimations = (
//   containerRef: React.MutableRefObject<HTMLDivElement | null>,
//   scrollContainerRef: React.MutableRefObject<HTMLDivElement | null>,
//   progressBarRef: React.MutableRefObject<HTMLDivElement | null>,
//   cardRefs: React.MutableRefObject<HTMLDivElement[]>,
//   isDesktop: boolean,
//   maxScrollHeight?: number
// ) => {
//   if (typeof window === "undefined") return () => {};
//   const ctx = gsap.context(() => {
//     if (isDesktop) {
//       const setup = () => {
//         const scrollWidth = scrollContainerRef.current?.scrollWidth || 0;
//         const containerWidth = containerRef.current?.offsetWidth || 0;
//         const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
//         const viewportOffset = (containerWidth - cardWidth) / 2;

//         const finalOffset = Math.max(0, scrollWidth - containerWidth + viewportOffset);
//         const scrollDistance = maxScrollHeight ?? finalOffset;

//         gsap
//           .timeline({
//             scrollTrigger: {
//               trigger: containerRef.current,
//               start: "top top",
//               end: () => `+=${scrollDistance}`,
//               scrub: 1,
//               pin: true,
//             },
//           })
//           .fromTo(
//             scrollContainerRef.current,
//             { x: viewportOffset },
//             { x: -finalOffset + viewportOffset, ease: "none" }
//           );

//         gsap.to(progressBarRef.current, {
//           width: "100%",
//           ease: "none",
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: "top top",
//             end: () => `+=${scrollDistance}`,
//             scrub: true,
//           },
//         });
//         gsap.delayedCall(0.1, () => { try { ScrollTrigger.refresh(); } catch {} });
//       };

//       const imgs = Array.from(
//         scrollContainerRef.current?.querySelectorAll('img') ?? []
//       ) as HTMLImageElement[];
//       const allLoaded = imgs.every((img) => img.complete);
//       if (allLoaded) {
//         setup();
//       } else {
//         let loaded = 0;
//         const onLoad = () => {
//           loaded += 1;
//           if (loaded >= imgs.length) {
//             setup();
//             imgs.forEach((im) => im.removeEventListener('load', onLoad));
//           }
//         };
//         imgs.forEach((im) => im.addEventListener('load', onLoad));
//         // Fallback in case some images are cached but not reporting complete immediately
//         setTimeout(() => {
//           try { setup(); } catch {}
//           imgs.forEach((im) => im.removeEventListener('load', onLoad));
//         }, 800);
//       }
//     } else {
//       // Mobile fade/slide-in for each card
//       const allCards = [...cardRefs.current];
//       allCards.forEach((card, index) => {
//         if (card) {
//           gsap.fromTo(
//             card,
//             { opacity: 0, x: index % 2 === 0 ? -200 : 200 },
//             {
//               opacity: 1,
//               x: 0,
//               duration: 1,
//               ease: "power2.out",
//               scrollTrigger: {
//                 trigger: card,
//                 start: "top 0%",
//                 toggleActions: "play none none none",
//                 once: true,
//               },
//             }
//           );
//         }
//       });
//     }
//   }, containerRef);

//   return () => {
//     ctx.revert();
//   };
// };

// export const ScrollCarousel = forwardRef<HTMLDivElement, ScrollCarouselProps>(
//   ({ features, className, maxScrollHeight }, ref) => {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const scrollContainerRef = useRef<HTMLDivElement>(null);
//     const progressBarRef = useRef<HTMLDivElement>(null);
//     const cardRefs = useRef<HTMLDivElement[]>([]);
//     const [isDesktop, setIsDesktop] = useState(false);

//     useEffect(() => {
//       const checkDesktop = () => {
//         setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
//       };
//       checkDesktop();
//       window.addEventListener("resize", checkDesktop);
//       return () => window.removeEventListener("resize", checkDesktop);
//     }, []);

//     useEffect(() => {
//       const cleanup = initFeatureAnimations(
//         containerRef,
//         scrollContainerRef,
//         progressBarRef,
//         cardRefs,
//         isDesktop,
//         maxScrollHeight
//       );
//       return cleanup;
//     }, [isDesktop, maxScrollHeight]);

//     const renderFeatureCards = (
//       featureSet: FeatureItem[],
//       refs: React.MutableRefObject<HTMLDivElement[]>
//     ) =>
//       featureSet.map((feature, index) => (
//         <div
//           key={feature.title}
//           ref={(el: HTMLDivElement | null) => {
//             if (el) refs.current[index] = el;
//           }}
//           className="feature-card flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[420px] lg:w-[520px] h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px] z-10 gap-4 group relative transition-all duration-300 ease-in-out"
//         >
//           <div
//             className={cn(
//               `relative h-full p-4 lg:p-8 rounded-3xl backdrop-blur-sm 
//               flex items-center justify-center z-10 
//               transition-all duration-300 my-4`,
//               `backdrop-blur-lg border text-black dark:text-white`,
//               "group-hover:scale-105 centered:scale-105"
//             )}
//           >
//             <img
//               src={
//                 feature.image ||
//                 "https://images.pexels.com/photos/9934462/pexels-photo-9934462.jpeg"
//               }
//               alt=""
//               className="absolute inset-0 w-full h-full object-cover z-[-1] rounded-3xl"
//             />
//             <div className="absolute bottom-4 z-10 w-full px-4">
//               <div
//                 className={cn(
//                   `flex flex-col justify-end h-full opacity-100 translate-y-4 transition-all duration-300 ease-out text-center`
//                 )}
//               >
//                 <h3 className="text-2xl mb-0 font-bold text-white transition-all duration-300">
//                   {feature.title}
//                 </h3>
//                 <p className="text-white text-xs mb-4 opacity-60">
//                   {feature.description}
//                 </p>
//               </div>
//             </div>
//             <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/5 dark:group-hover:bg-white/5 centered:bg-black/5 dark:centered:bg-white/5 rounded-2xl group-hover:blur-md" />
//           </div>
//         </div>
//       ));

//     return (
//       <section
//         className={cn(
//           "bg-transparent text-foreground relative overflow-hidden",
//           className
//         )}
//         ref={ref}
//       >
//         <div
//           ref={containerRef}
//           className="relative overflow-hidden md:h-[460px] py-8 md:py-10 flex flex-col gap-0 z-10 lg:[mask-image:_linear-gradient(to_right,transparent_0,_black_5%,_black_95%,transparent_100%)]"
//         >
//           <div
//             ref={scrollContainerRef}
//             className="flex flex-col md:flex-row md:flex-nowrap gap-8 items-center h-full px-6 md:px-0"
//           >
//             {renderFeatureCards(features, cardRefs)}
//           </div>

//           {isDesktop && (
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-2 bg-white/30 dark:bg-black/30 z-50 overflow-hidden rounded-full">
//               <div
//                 ref={progressBarRef}
//                 className="h-full rounded-full relative overflow-hidden transition-all duration-100"
//                 style={{ width: "0%" }}
//               >
//                 <div className="absolute inset-0 animated-water" />
//               </div>
//             </div>
//           )}
//         </div>
//         <style jsx>{`
//           .animated-water {
//             background: repeating-linear-gradient(
//               -45deg,
//               rgba(255, 255, 255, 0.9) 0%,
//               rgba(255, 255, 255, 0.9) 25%,
//               rgba(255, 255, 255, 0.9) 50%
//             );
//             background-size: 40px 40px;
//             animation: waveMove 2s linear infinite;
//           }
//           :global(.dark) .animated-water {
//             background: repeating-linear-gradient(
//               -45deg,
//               rgba(255, 255, 255, 0.9) 0%,
//               rgba(255, 255, 255, 0.9) 25%,
//               rgba(255, 255, 255, 0.9) 50%
//             );
//           }
//           @keyframes waveMove {
//             from {
//               background-position: 0 0;
//             }
//             to {
//               background-position: 40px 40px;
//             }
//           }
//         `}</style>
//       </section>
//     );
//   }
// );

// ScrollCarousel.displayName = "ScrollCarousel";

// export default ScrollCarousel;
