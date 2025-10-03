"use client";
import React, { useEffect, useRef, useState } from "react";

export interface ScrollStackCard {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  backgroundImage?: string;
  content?: React.ReactNode;
}

interface ScrollStackProps {
  cards: ScrollStackCard[];
  backgroundColor?: string;
  cardHeight?: string;
  animationDuration?: string;
  sectionHeightMultiplier?: number;
  intersectionThreshold?: number;
  className?: string;
}

const defaultBackgrounds = [
  "https://images.pexels.com/photos/6985136/pexels-photo-6985136.jpeg",
  "https://images.pexels.com/photos/6985128/pexels-photo-6985128.jpeg",
  "https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg",
];

const biosByTitle: Record<string, string> = {
  "Global Phenology":
    "Discover how flowering phases shift across regions and elevations. We combine satellite timelines with on-ground observations to surface what’s blooming now – and what’s next.",
  "Climate Signals":
    "See temperature, rainfall, and sunlight trends alongside bloom windows. Understand seasonal shifts, anomalies, and the subtle signals that guide flowering.",
  "Habitat Explorer":
    "Browse biomes and plant communities, from alpine meadows to tropical forests. Learn how soil, slope, and microclimate shape which species thrive together.",
};

function buildDescription(card: ScrollStackCard): string {
  if (card.description) return card.description;
  if (card.title in biosByTitle) return biosByTitle[card.title];
  if (card.subtitle) {
    return `${card.subtitle} – Explore species, patterns, and stories behind the landscapes.`;
  }
  return "Explore species, patterns, and stories behind the landscapes.";
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  cards,
  backgroundColor = "bg-transparent", // No background by default
  cardHeight = "60vh",
  animationDuration = "0.5s",
  sectionHeightMultiplier = 3,
  intersectionThreshold = 0.1,
  className = "",
}) => {
  const scrollableSectionRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);
  const cardCount = cards.length;

  const cardStyle = {
    height: cardHeight,
    maxHeight: "500px",
    borderRadius: "20px",
    transition: `transform ${animationDuration} cubic-bezier(0.19, 1, 0.22, 1), opacity ${animationDuration} cubic-bezier(0.19, 1, 0.22, 1)`,
    willChange: "transform, opacity",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: intersectionThreshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const sectionEl = sectionRef.current;
          if (!sectionEl || !cardsContainerRef.current) return;

          const rect = sectionEl.getBoundingClientRect();
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          const totalScrollable = Math.max(0, rect.height - viewportHeight);
          const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);
          const progress = totalScrollable > 0 ? scrolled / totalScrollable : 0;

          let newActiveIndex = 0;
          const progressPerCard = 1 / Math.max(cardCount, 1);
          for (let i = 0; i < cardCount; i++) {
            if (progress >= progressPerCard * (i + 1)) {
              newActiveIndex = i + 1;
            }
          }

          setActiveCardIndex(Math.min(newActiveIndex, Math.max(cardCount - 1, 0)));
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [cardCount, sectionHeightMultiplier, intersectionThreshold]);

  const getCardTransform = (index: number) => {
    const isVisible = activeCardIndex >= index;
    const scale = 0.9 + index * 0.05;
    let translateY = "100px";

    if (isVisible) {
      translateY = `${90 - index * 30}px`;
    }

    return {
      transform: `translateY(${translateY}) scale(${scale})`,
      opacity: isVisible ? (index === 0 ? 0.9 : 1) : 0,
      zIndex: 10 + index * 10,
      pointerEvents: isVisible ? "auto" : "none",
    };
  };

  return (
    <section
      ref={scrollableSectionRef}
      className="relative w-full lg:w-[100%]"
    >
      <div
        ref={sectionRef}
        className={`relative ${className}`}
        style={{ height: `${sectionHeightMultiplier * 100}vh` }}
      >
        <div
          className={`sticky top-0 w-full h-screen flex items-center 
            justify-center overflow-hidden ${backgroundColor}`} // Applied as a Tailwind class
        >
          <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col justify-center">
            <div
              ref={cardsContainerRef}
              className="relative w-full max-w-5xl mx-auto flex-shrink-0 transform-gpu -translate-y-6 md:-translate-y-10 lg:-translate-y-12"
              style={{ height: cardHeight }}
            >
              {cards.map((card, index) => {
                const cardTransform = getCardTransform(index);
                const backgroundImage =
                  card.backgroundImage ||
                  defaultBackgrounds[index % defaultBackgrounds.length];
                const isActive = activeCardIndex === index;

                return (
                  <div
                    key={index}
                    className={`absolute z-50 overflow-hidden shadow-xl 
                      transition-all duration-300`}
                    style={{
                      ...cardStyle,
                      top: 0,
                      left: "50%",
                      transform: `translateX(-50%) ${cardTransform.transform}`,
                      width: "100%",
                      maxWidth: "100%",
                      opacity: cardTransform.opacity,
                      zIndex: cardTransform.zIndex,
                      pointerEvents:
                        cardTransform.pointerEvents as React.CSSProperties["pointerEvents"],
                    }}
                  >
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        backgroundImage: `url('${backgroundImage}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

                    {card.badge && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                          <span className="text-sm font-medium">
                            {card.badge}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="relative z-20 p-5 sm:p-6 md:p-8 h-full flex items-center">
                      {card.content ? (
                        card.content
                      ) : (
                        <div className="max-w-lg space-y-3">
                          <h3
                            className={`text-white font-bold text-2xl sm:text-3xl md:text-4xl leading-tight will-change-transform transition-all duration-500 ${
                              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                            }`}
                            style={{ transitionDelay: isActive ? "0ms" : "0ms" }}
                          >
                            {card.title}
                          </h3>
                          {card.subtitle && (
                            <p
                              className={`text-white/85 text-lg will-change-transform transition-all duration-500 ${
                                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                              }`}
                              style={{ transitionDelay: isActive ? "120ms" : "0ms" }}
                            >
                              {card.subtitle}
                            </p>
                          )}
                          <p
                            className={`text-white/80 text-base leading-relaxed will-change-transform transition-all duration-500 ${
                              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                            }`}
                            style={{ transitionDelay: isActive ? "200ms" : "0ms" }}
                          >
                            {buildDescription(card as any)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollStack;
