"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/memories", label: "Memories" },
  { href: "/letters", label: "Letters" },
  { href: "/panda-roll", label: "Panda Roll" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-purple-500/20 bg-[#1a0a1e]/80 backdrop-blur-md" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Home"
        >
          <span className="text-pink-500 font-display text-xl font-bold tracking-tight">PT</span>
          <span className="font-display font-bold text-lg text-white tracking-tighter">potato-tomato</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${pathname === link.href ? "text-white" : "text-paper-200/70 hover:text-white"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
