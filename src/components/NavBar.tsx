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
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-neutral-900/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-white text-lg sm:text-xl font-semibold">
          Kaalnetra
        </Link>
        <nav className="flex items-center gap-6 text-sm sm:text-base text-neutral-200">
          {links.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className={isActive(pathname, href) ? "text-white" : "hover:text-white/90"}
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
