"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CursorLayer() {
  const pathname = usePathname();

  useEffect(() => {
    // Ensure any previous cursor-class is removed
    document.body.classList.remove("has-smooth-cursor");

    // Force-show the system cursor, overriding any global CSS that hid it
    const STYLE_ID = "cursor-restore-style";
    let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    const css = `
      html, body { cursor: auto !important; }
    `;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_ID;
      styleEl.textContent = css;
      document.head.appendChild(styleEl);
    } else {
      styleEl.textContent = css;
    }

    return () => {
      // keep the style to preserve default cursor across route changes
    };
  }, [pathname]);

  // Render nothing: no custom cursor, default system cursor will be used
  return null;
}
