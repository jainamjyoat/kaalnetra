"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Map", href: "/map" },
  { name: "Data Portal", href: "/dataportal" },
  { name: "Prediction Analysis", href: "/prediction-analysis" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function NavBar() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/25 backdrop-blur-md">
      <div className="relative mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-white text-lg sm:text-xl font-semibold">
          Kaalnetra
        </Link>
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8 sm:gap-10 text-sm sm:text-base text-white">
          {links.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className={isActive(pathname, href) ? "text-white" : "text-white/80 hover:text-white"}
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
