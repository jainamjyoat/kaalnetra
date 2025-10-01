"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

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
  return <SmoothCursor />;
}
