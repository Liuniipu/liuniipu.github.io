"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { HeroStat, Slide } from '../../lib/homeContent';

type HeroSectionProps = {
  slides: readonly Slide[];
  ctas: {
    explore: string;
    start: string;
  };
  card: {
    indicatorTemplate: string;
    title: string;
    description: string;
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

export function HeroSection({
  slides,
  ctas,
  card,
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
  const indicator = card.indicatorTemplate
    .replace('{current}', String(activeSlide + 1))
    .replace('{total}', String(slides.length));

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
                  href={exploreHref}
                  className="rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow transition hover:bg-sky-300"
                >
                  {ctas.explore}
                </Link>
                <Link
                  href={startHref}
                  className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
                >
                  {ctas.start}
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-8 rounded-3xl border border-slate-800/60 bg-slate-950/60 p-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                  {indicator}
                </p>
                <p className="text-lg font-semibold text-slate-100">{card.title}</p>
                <p className="text-sm text-slate-400">{card.description}</p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlide((index) => (index === 0 ? slides.length - 1 : index - 1))
                  }
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-lg text-slate-100 transition hover:border-sky-400 hover:text-sky-300"
                  aria-label={navigationLabels.previous}
                >
                  &lt;
                </button>
                <div className="flex flex-1 justify-center gap-2">
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
                <button
                  type="button"
                  onClick={() => setActiveSlide((index) => (index + 1) % slides.length)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-lg text-slate-100 transition hover:border-sky-400 hover:text-sky-300"
                  aria-label={navigationLabels.next}
                >
                  &gt;
                </button>
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
