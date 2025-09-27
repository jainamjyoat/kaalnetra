"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [open, setOpen] = useState(false);

  // Close the mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
<<<<<<< HEAD
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/25 backdrop-blur-md">
      <div className="relative mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-white text-lg sm:text-xl font-semibold">
          Kaalnetra
        </Link>
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8 sm:gap-10 text-sm sm:text-base text-white">
=======
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-neutral-900/50 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="text-white text-base sm:text-xl font-semibold select-none">
          Kaalnetra
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-sm sm:text-base text-neutral-200">
>>>>>>> 7e778a00997cc23f35c5ad688bbf72bb5e0da3e8
          {links.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
<<<<<<< HEAD
              className={isActive(pathname, href) ? "text-white" : "text-white/80 hover:text-white"}
=======
              className={
                (isActive(pathname, href) ? "text-white" : "text-neutral-200 hover:text-white/90") +
                " transition-colors"
              }
>>>>>>> 7e778a00997cc23f35c5ad688bbf72bb5e0da3e8
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden inline-flex items-center justify-center rounded-md border border-white/10 text-neutral-200 hover:text-white hover:bg-white/5 h-9 w-9 transition"
          onClick={() => setOpen((p) => !p)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-5 bg-current transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 pb-3 flex flex-col gap-1.5">
          {links.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className={`block rounded-md px-3 py-2 text-sm ${
                isActive(pathname, href)
                  ? "bg-white/10 text-white"
                  : "text-neutral-200 hover:bg-white/5 hover:text-white"
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
