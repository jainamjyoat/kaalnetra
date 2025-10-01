import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Map | Kaalnetra",
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div suppressHydrationWarning>
      {/* Force default cursor in map section from first paint */}
      <style>{`html, body { cursor: auto !important; }`}</style>
      {children}
    </div>
  );
}
