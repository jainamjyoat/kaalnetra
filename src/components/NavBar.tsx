"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartNoAxes } from "./Nav/Priduction";
import { HardDriveDownload } from "./Nav/Data";
import { Anchor } from "./Nav/Earth2.0";
import { Rocket } from "./Nav/Home";

const links = [
  { name: "Home", href: "/" },
  { name: "Map", href: "/map2" },
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
          {links.map(({ name, href }) => {
            const commonClasses = isActive(pathname, href) ? "text-white" : "text-white/80 hover:text-white";
            if (href === "/") {
              return (
                <Link
                  key={href}
                  href={href}
                  className={`${commonClasses} flex items-center gap-1`}
                >
                  <Rocket width={20} height={20} stroke="#ffffff" />
                  <span>{name}</span>
                </Link>
              );
            }
            if (href === "/prediction-analysis") {
              return (
                <Link
                  key={href}
                  href={href}
                  className={`${commonClasses} flex items-center gap-2`}
                >
                  <ChartNoAxes width={20} height={20} stroke="#ffffff" />
                  <span>{name}</span>
                </Link>
              );
            }
            if (href === "/dataportal") {
              return (
                <Link
                  key={href}
                  href={href}
                  className={`${commonClasses} flex items-center gap-1`}
                >
                  <HardDriveDownload width={20} height={20} stroke="#ffffff" />
                  <span>{name}</span>
                </Link>
              );
            }
            if (href === "/map2") {
              return (
                <Link
                  key={href}
                  href={href}
                  className={`${commonClasses} flex items-center gap-1`}
                >
                  <Anchor width={20} height={20} stroke="#ffffff" />
                  <span>{name}</span>
                </Link>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                className={commonClasses}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
