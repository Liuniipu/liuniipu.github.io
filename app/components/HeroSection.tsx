"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { HeroStat, Slide } from '../../lib/homeContent';

type HeroSectionProps = {
  slides: readonly Slide[];
  ctas: {
    explore: string;
    start: string;
    exploreBySlide?: Record<string, string>;
  };
  navigationLabels: {
    previous: string;
    next: string;
    dotTemplate: string;
  };
  stats: readonly HeroStat[];
  exploreHref?: string;
  startHref?: string;
};

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <circle cx="12" cy="7" r="3" />
    <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
  </svg>
);

const LaptopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <rect x="5" y="6" width="14" height="10" rx="1.8" />
    <path d="M3 19h18" />
  </svg>
);

const MobileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M10 5.5h4M12 18.5h.01" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <circle cx="10" cy="19" r="1.7" />
    <circle cx="17" cy="19" r="1.7" />
    <path d="M3 4h2l2.1 10.2h10.6l2.1-7.2H6.2" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <path d="M5 6.5h14v9H9l-4 3v-12Z" />
    <path d="M8 10h8M8 13h5" />
  </svg>
);

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2h.1a1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1v.1a1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
    <circle cx="12" cy="10" r="2.2" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <path d="M12 3l7 3v5c0 5-3.4 8.7-7 10-3.6-1.3-7-5-7-10V6l7-3Z" />
    <path d="m9.5 11.8 1.8 1.8 3.3-3.5" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4.5 7 7.5 5.5L19.5 7" />
  </svg>
);

const HeroScene = ({ slideId }: { slideId: string }) => {
  if (slideId === 'experience') {
    return (
      <div className="hero-scene relative h-56 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80">
        <span className="hero-icon hero-person-left absolute left-1/2 top-1/2 h-16 w-16 rounded-2xl border border-slate-700 p-3 text-sky-300">
          <PersonIcon />
        </span>
        <span className="hero-icon hero-person-right absolute left-1/2 top-1/2 h-16 w-16 rounded-2xl border border-slate-700 p-3 text-cyan-300">
          <PersonIcon />
        </span>
      </div>
    );
  }

  if (slideId === 'collaboration') {
    return (
      <div className="hero-scene relative h-56 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80">
        <span className="hero-icon absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-700 p-3 text-sky-300">
          <LaptopIcon />
        </span>
        <span className="hero-icon hero-orbit hero-orbit-a absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-700 p-2 text-cyan-300">
          <PersonIcon />
        </span>
        <span className="hero-icon hero-orbit hero-orbit-b absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-700 p-2 text-emerald-300">
          <CartIcon />
        </span>
        <span className="hero-icon hero-orbit hero-orbit-c absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-700 p-2 text-amber-300">
          <ChatIcon />
        </span>
        <span className="hero-icon hero-orbit hero-orbit-d absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-700 p-2 text-fuchsia-300">
          <GearIcon />
        </span>
      </div>
    );
  }

  if (slideId === 'delivery') {
    return (
      <div className="hero-scene relative h-56 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80">
        <span className="hero-icon absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-700 p-3 text-sky-300">
          <MobileIcon />
        </span>
        <span className="hero-icon hero-float-1 absolute left-8 top-8 h-10 w-10 rounded-xl border border-slate-700 p-2 text-cyan-300">
          <CartIcon />
        </span>
        <span className="hero-icon hero-float-2 absolute right-7 top-10 h-10 w-10 rounded-xl border border-slate-700 p-2 text-emerald-300">
          <ChatIcon />
        </span>
        <span className="hero-icon hero-float-3 absolute bottom-6 right-12 h-10 w-10 rounded-xl border border-slate-700 p-2 text-violet-300">
          <LaptopIcon />
        </span>
        <span className="hero-icon hero-float-4 absolute bottom-10 left-12 h-10 w-10 rounded-xl border border-slate-700 p-2 text-rose-300">
          <MapPinIcon />
        </span>
      </div>
    );
  }

  return (
    <div className="hero-scene relative h-56 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80">
      <span className="hero-icon absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-700 p-3 text-sky-300">
        <MailIcon />
      </span>
      <span className="hero-icon hero-mail-run-a absolute left-2 top-8 h-10 w-10 rounded-xl border border-slate-700 p-2 text-cyan-300">
        <PersonIcon />
      </span>
      <span className="hero-icon hero-mail-run-b absolute left-4 bottom-8 h-10 w-10 rounded-xl border border-slate-700 p-2 text-emerald-300">
        <LaptopIcon />
      </span>
      <span className="hero-icon hero-mail-run-c absolute right-2 top-10 h-10 w-10 rounded-xl border border-slate-700 p-2 text-violet-300">
        <ChatIcon />
      </span>
      <span className="hero-icon hero-mail-run-d absolute right-4 bottom-9 h-10 w-10 rounded-xl border border-slate-700 p-2 text-amber-300">
        <ShieldIcon />
      </span>
    </div>
  );
};

export function HeroSection({
  slides,
  ctas,
  navigationLabels,
  stats,
  exploreHref = '#example',
  startHref = '#contact',
}: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((index) => (index + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const slide = slides[activeSlide];
  const exploreCtaLabel = ctas.exploreBySlide?.[slide.id] ?? ctas.explore;
  const exploreCtaHref = slide.id === 'contact' ? startHref : exploreHref;

  return (
    <section
      id="home"
      className="border-b border-slate-900 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 py-20 md:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-[0_35px_120px_-45px_rgba(14,165,233,0.35)]">
          <div className="absolute inset-y-0 right-0 h-full w-1/2 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.25),transparent_60%)] blur-3xl" />
          <div className="relative grid gap-10 px-8 py-14 md:grid-cols-[1.35fr_1fr] md:px-12 md:py-16">
            <div className="space-y-8">
              <span className="inline-flex items-center rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
                {slide.label}
              </span>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                {slide.title}
              </h1>
              <p className="max-w-xl text-base text-slate-300 sm:text-lg">
                {slide.description}
              </p>
              <ul className="space-y-3 text-sm text-slate-300 sm:text-base">
                {slide.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={exploreCtaHref}
                  className="rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow transition hover:bg-sky-300"
                >
                  {exploreCtaLabel}
                </Link>
                <Link
                  href={startHref}
                  className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
                >
                  {ctas.start}
                </Link>
              </div>
            </div>
            <div className="relative flex min-h-[24rem] flex-col gap-6 rounded-3xl border border-slate-800/60 bg-slate-950/60 p-8 pb-16">
              <div className="space-y-4">
                <div className="min-h-[18rem]">
                  <HeroScene slideId={slide.id} />
                </div>
              </div>
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 justify-center gap-2">
                {slides.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSlide(itemIndex)}
                    className={`h-2 w-9 rounded-full transition ${
                      itemIndex === activeSlide
                        ? 'bg-sky-400'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    aria-label={navigationLabels.dotTemplate.replace(
                      '{index}',
                      String(itemIndex + 1),
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-950/60 p-8 text-sm text-slate-400 sm:grid-cols-3 sm:text-base">
          {stats.map((stat) => (
            <div key={stat.value}>
              <p className="text-xl font-semibold text-slate-100">{stat.value}</p>
              <p className="mt-2 text-slate-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
