"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function GlowCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Main glowing cursor */}
      <div
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-purple-400/80 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out z-[1000]"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      />
      {/* Outer trailing ring */}
      <div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-purple-400/60 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out z-[999]"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      />
    </>
  );
}

export default function CursorLayer() {
  const pathname = usePathname();
  const isMap = pathname?.startsWith("/map");

  useEffect(() => {
    if (!isMap) {
      document.body.classList.add("has-smooth-cursor");
    } else {
      document.body.classList.remove("has-smooth-cursor");
    }
    return () => {
      document.body.classList.remove("has-smooth-cursor");
    };
  }, [isMap]);

  if (isMap) return null;
  return <GlowCursor />;
}
