"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type FocusEvent } from 'react';

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

const sanitizeForId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, '-');
const DROPDOWN_CLOSE_DELAY = 180;

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
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const desktopCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (desktopCloseTimeout.current) {
        clearTimeout(desktopCloseTimeout.current);
      }
    };
  }, []);

  const clearDesktopCloseTimeout = () => {
    if (desktopCloseTimeout.current) {
      clearTimeout(desktopCloseTimeout.current);
      desktopCloseTimeout.current = null;
    }
  };

  const scheduleDesktopClose = () => {
    clearDesktopCloseTimeout();
    desktopCloseTimeout.current = setTimeout(() => {
      setOpenDesktopDropdown(null);
      desktopCloseTimeout.current = null;
    }, DROPDOWN_CLOSE_DELAY);
  };

  const openDesktopMenu = (itemKey: string) => {
    clearDesktopCloseTimeout();
    setOpenDesktopDropdown(itemKey);
  };

  const closeDesktopMenuImmediate = () => {
    clearDesktopCloseTimeout();
    setOpenDesktopDropdown(null);
  };

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
    closeDesktopMenuImmediate();
    setOpenMobileDropdown(null);
    setIsMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen((open) => {
      const next = !open;
      if (!next) {
        setOpenMobileDropdown(null);
      }
      return next;
    });
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  const handleDesktopDropdownBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      scheduleDesktopClose();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-900 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-8">
        <Link href={`/${currentLocale}`} className="text-lg font-semibold tracking-tight">
          {brand}
        </Link>
        <nav className="hidden gap-8 text-sm font-medium lg:flex">
          {items.map((item) => {
            const itemKey = item.href ?? item.label;
            const dropdownId = `desktop-submenu-${sanitizeForId(itemKey)}`;

            if (item.children && item.children.length > 0) {
              const isOpen = openDesktopDropdown === itemKey;

              return (
                <div
                  key={itemKey}
                  className="relative"
                  onMouseEnter={() => openDesktopMenu(itemKey)}
                  onMouseLeave={scheduleDesktopClose}
                  onFocus={() => openDesktopMenu(itemKey)}
                  onBlur={handleDesktopDropdownBlur}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 transition hover:text-sky-300"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    aria-controls={dropdownId}
                    onClick={() => {
                      if (openDesktopDropdown === itemKey) {
                        closeDesktopMenuImmediate();
                      } else {
                        openDesktopMenu(itemKey);
                      }
                    }}
                  >
                    {item.label}
                    <svg
                      className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 12 8"
                      aria-hidden
                    >
                      <path
                        d="M6 8a1 1 0 0 1-.707-.293l-5-5A1 1 0 0 1 1.707.293L6 4.586 10.293.293a1 1 0 1 1 1.414 1.414l-5 5A1 1 0 0 1 6 8Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  <div
                    id={dropdownId}
                    className={`absolute left-1/2 top-full z-50 mt-2 w-48 -translate-x-1/2 rounded-2xl border border-slate-800 bg-slate-950/95 p-2 shadow-xl transition ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}
                  >
                    {item.children.map((child) => {
                      if (!child.href) {
                        return null;
                      }

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-3 py-2 text-left text-sm transition hover:bg-slate-900 hover:text-sky-300"
                          onClick={closeDesktopMenuImmediate}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (!item.href) {
              return (
                <span key={itemKey} className="text-slate-500">
                  {item.label}
                </span>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-sky-300"
                onClick={closeDesktopMenuImmediate}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLocaleToggle}
            className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-sm font-semibold text-slate-200 shadow-sm transition hover:border-sky-400 hover:text-sky-300 hover:shadow-md"
            aria-label={localeButtonAria}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 text-sky-300">
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M12 21c4.971 0 9-4.029 9-9s-4.029-9-9-9-9 4.029-9 9 4.029 9 9 9Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.778 3.75 5.556 3.75 9S14.5 18.222 12 21c-2.5-2.778-3.75-5.556-3.75-9S9.5 5.778 12 3Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="uppercase tracking-wide">{activeLocale.label}</span>
          </button>
          <button
            type="button"
            onClick={toggleMobileMenu}
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
          {items.map((item) => {
            const itemKey = item.href ?? item.label;
            const submenuId = `mobile-submenu-${sanitizeForId(itemKey)}`;

            if (item.children && item.children.length > 0) {
              const isOpen = openMobileDropdown === itemKey;

              return (
                <div
                  key={`mobile-${itemKey}`}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between text-left text-slate-200"
                    aria-expanded={isOpen}
                    aria-controls={submenuId}
                    onClick={() =>
                      setOpenMobileDropdown((current) =>
                        current === itemKey ? null : itemKey,
                      )
                    }
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 12 8"
                      aria-hidden
                    >
                      <path
                        d="M6 8a1 1 0 0 1-.707-.293l-5-5A1 1 0 0 1 1.707.293L6 4.586 10.293.293a1 1 0 1 1 1.414 1.414l-5 5A1 1 0 0 1 6 8Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  {isOpen ? (
                    <div id={submenuId} className="mt-3 flex flex-col gap-2">
                      {item.children.map((child) => {
                        if (!child.href) {
                          return null;
                        }

                        return (
                          <Link
                            key={`mobile-${child.href}`}
                            href={child.href}
                            className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm transition hover:border-sky-400/60 hover:text-sky-300"
                            onClick={closeMobileMenu}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            }

            if (!item.href) {
              return (
                <div
                  key={`mobile-${itemKey}`}
                  className="rounded-full border border-slate-800 bg-slate-950/70 px-4 py-2 text-slate-400"
                >
                  {item.label}
                </div>
              );
            }

            return (
              <Link
                key={`mobile-${item.href}`}
                href={item.href}
                className="rounded-full border border-slate-800 bg-slate-950/70 px-4 py-2 transition hover:border-sky-400/60 hover:text-sky-300"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
