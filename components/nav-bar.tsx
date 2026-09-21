"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/copy";

interface NavBarProps {
  /**
   * True when the page opens with a full-bleed hero/banner underneath the
   * nav (Home, Contact). Transparent + white type until scrolled, then solid.
   * False renders the solid cream bar immediately (no hero to overlay).
   */
  overHero?: boolean;
}

/**
 * 3-zone nav: left wordmark / center links / right CTA + hamburger under
 * 768px. Scroll listener (no GSAP — Stage 4 owns scroll animation) flips the
 * transparent-over-hero treatment to the solid cream bar.
 */
export default function NavBar({ overHero = true }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  const solid = !overHero || scrolled;

  return (
    <header
      data-nav="root"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        solid
          ? "border-mist bg-warm-cream text-obsidian"
          : "border-transparent bg-transparent text-pure-white"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-64 w-full max-w-[var(--page-max-width)] items-center justify-between px-16 md:px-24"
      >
        <Link
          href="/"
          data-nav="wordmark"
          className="text-body font-bold tracking-tight"
        >
          {nav.brand}
        </Link>

        <ul className="hidden items-center gap-24 md:flex">
          {nav.links.map((link) => (
            <li key={link.href + link.label}>
              <Link
                href={link.href}
                data-nav-link={link.label}
                className="rounded-full text-body-sm hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-12">
          <Link
            href={nav.ctaHref}
            data-nav="cta"
            className="hidden rounded-full border border-obsidian bg-obsidian px-20 py-8 text-body-sm text-pure-white transition-colors hover:bg-pure-white hover:text-obsidian hover:underline md:inline-block"
          >
            {nav.cta}
          </Link>
          <button
            type="button"
            data-nav="menu-trigger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full p-12 md:hidden"
          >
            {menuOpen ? <X size={24} strokeWidth={2} aria-hidden="true" /> : <Menu size={24} strokeWidth={2} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          data-nav="menu"
          className="mx-16 mb-16 rounded-2xl border border-mist bg-warm-cream p-24 text-obsidian md:hidden"
        >
          <ul className="flex flex-col gap-16">
            {nav.links.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  data-nav-link={link.label}
                  onClick={() => setMenuOpen(false)}
                  className="text-body"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={nav.ctaHref}
                onClick={() => setMenuOpen(false)}
                className="inline-block rounded-full border border-obsidian bg-obsidian px-20 py-8 text-body-sm text-pure-white transition-colors hover:bg-pure-white hover:text-obsidian"
              >
                {nav.cta}
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
