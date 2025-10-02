"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import type { Locale, LocaleOption, NavItem } from '../../lib/homeContent';

type NavigationProps = {
  brand: string;
  items: readonly NavItem[];
  localeOptions: readonly LocaleOption[];
  currentLocale: Locale;
  localeButtonAria: string;
  menuLabels: {
    open: string;
    close: string;
  };
};

export function Navigation({
  brand,
  items,
  localeOptions,
  currentLocale,
  localeButtonAria,
  menuLabels,
}: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentIndex = Math.max(
    localeOptions.findIndex((option) => option.code === currentLocale),
    0,
  );
  const activeLocale = localeOptions[currentIndex] ?? localeOptions[0];

  const handleLocaleToggle = () => {
    const nextIndex = (currentIndex + 1) % localeOptions.length;
    const nextLocale = localeOptions[nextIndex];
    const hash = typeof window !== 'undefined' ? window.location.hash : '';

    // Always replace the first segment with the next locale code.
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      segments[0] = nextLocale.code;
    } else {
      segments.push(nextLocale.code);
    }

    const nextPath = `/${segments.join('/')}${hash}`;
    router.push(nextPath);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-900 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-8">
        <Link href={`/${currentLocale}`} className="text-lg font-semibold tracking-tight">
          {brand}
        </Link>
        <nav className="hidden gap-8 text-sm font-medium lg:flex">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-sky-300">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLocaleToggle}
            className="flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
            aria-label={localeButtonAria}
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[0.7rem] font-bold">
              i18n
            </span>
            {activeLocale.label}
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-full border border-slate-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-200 lg:hidden"
            aria-controls="mobile-nav"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? menuLabels.close : menuLabels.open}
          </button>
        </div>
      </div>
      {isMenuOpen ? (
        <nav
          id="mobile-nav"
          className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 pb-6 text-sm font-medium lg:hidden md:px-8"
        >
          {items.map((item) => (
            <Link
              key={`mobile-${item.href}`}
              href={item.href}
              className="rounded-full border border-slate-800 bg-slate-950/70 px-4 py-2 transition hover:border-sky-400/60 hover:text-sky-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
