'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { Locale } from '../../lib/homeContent';

type IntroShowcaseProps = {
  locale: Locale;
};

type ParallaxItem = {
  id: string;
  speed: number;
  className: string;
  top: number;
  left?: string;
  right?: string;
  rotate?: string;
};

type SectionState = Record<string, boolean>;

const MIN_VIEWPORT = 360;
const MAX_VIEWPORT = 1160;

const copy = {
  en: {
    heading: 'Immersive intro microsite',
    description:
      'Scroll through a single-page story built for launches: layered hero, staggered chapters, and responsive controls on the fly.',
    controlsTitle: 'Live controls',
    controlsHeading: 'Preview breakpoints',
    controlsDescription:
      'Adjust the frame width to demonstrate how the layout reflows across desktop, tablet, and phone widths.',
    sliderLabel: 'Viewport width',
    currentWidth: 'Current width',
    presetsLabel: 'Jump to preset',
    presetDesktop: 'Desktop',
    presetTablet: 'Tablet',
    presetMobile: 'Phone',
    sliderHelp: 'Drag or pick a preset to change the preview frame.',
    heroEyebrow: 'Launch chapter',
    heroTitle: 'Balance narrative copy with kinetic visuals.',
    heroBody:
      'Pin striking headlines while parallax illustrations drift at varying speeds. CTA stays visible as the story opens.',
    heroCta: 'Play launch track',
    timelineEyebrow: 'Chapter stack',
    timelineTitle: 'Release milestones stay anchored.',
    timelineBody:
      'As teams scroll, staggered cards fade in with supporting imagery, keeping metric callouts within view.',
    galleryEyebrow: 'Media gallery',
    galleryTitle: 'Blend long-form imagery with interactive hotspots.',
    galleryBody:
      'Each card animates into view to highlight product differentiators, soundtrack, and backstage footage.',
    closerEyebrow: 'Final fold',
    closerTitle: 'Invite deeper exploration with a layered sign-off.',
    closerBody:
      'Sticky contact bar and localized footer keep conversion routes available without breaking the flow.',
    ariaSlider: 'Adjust showcase viewport width',
  },
  zh: {
    heading: '\u55e8\u4f86\u4e00\u9801\u5f0f\u5c55\u793a',
    description:
      '\u6f38\u9032\u700f\u89bd\u5f9e\u958b\u5c55\u5230\u6536\u5c3e\uff0c\u540c\u6b65\u5c55\u793a\u6f14\u51fa\u98a8\u6a23\u3001\u6ce2\u5f62\u5716\u50cf\u9006\u5411\u651d\u52d5\u53ca\u5373\u6642 RWD \u63a7\u5236\u3002',
    controlsTitle: '\u5373\u6642\u8abf\u6574',
    controlsHeading: '\u9810\u89bd\u65b7\u9ede',
    controlsDescription:
      '\u4fee\u6539\u9810\u89bd\u6846\u7684\u5bec\u5ea6\uff0c\u5373\u53ef\u5feb\u901f\u5207\u63db\u684c\u6a5f\u3001\u5e73\u677f\u8207\u624b\u6a5f\u4ea4\u4e92\u5f0f\u3002',
    sliderLabel: '\u9801\u9762\u5bec\u5ea6',
    currentWidth: '\u76ee\u524d\u5bec\u5ea6',
    presetsLabel: '\u5feb\u901f\u908a\u7de3',
    presetDesktop: '\u684c\u6a5f',
    presetTablet: '\u5e73\u677f',
    presetMobile: '\u624b\u6a5f',
    sliderHelp: '\u62d6\u62c9\u6216\u9078\u64c7\u9810\u8a2d\u8abf\u6574\u9810\u89bd\u6846\u3002',
    heroEyebrow: '\u958b\u5834\u7bc0\u594f',
    heroTitle: '\u4fdd\u6301\u6587\u6848\u53ca\u52d5\u614b\u7684\u4f73\u5b8c\u7d04\u3002',
    heroBody:
      '\u5927\u6284\u5b57\u6301\u7dca\u8996\u7a97\u3001\u6f14\u7e79\u67b6\u8a2d\u4f5c\u70ba\u914d\u540c\u3002CTA \u7b49\u529f\u80fd\u4fdd\u6301\u7ad9\u5b88\u6703\u773e\u3002',
    heroCta: '\u555f\u52d5\u8072\u97f3\u6a21\u5f0f',
    timelineEyebrow: '\u7ae0\u7bc0\u5206\u5c64',
    timelineTitle: '\u91cd\u8981\u6642\u7a0b\u5149\u901f\u88ab\u986f\u793a\u3002',
    timelineBody:
      '\u700f\u89bd\u9032\u7a0b\u9593\uff0c\u652f\u6490\u5716\u50cf\u8207\u7d71\u8a08\u7d50\u5408\u900f\u51fa\u73fe\u3001\u78ba\u4fdd\u6301\u7dca\u8cbc\u4eba\u5fc3\u7684\u8aaa\u660e\u3002',
    galleryEyebrow: '\u8996\u89ba\u5c55\u793a',
    galleryTitle: '\u4ea4\u7e54\u5f71\u7247\u3001\u6a21\u64ec\u64cd\u4f5c\u8207\u58f9\u5206\u5716\u7247\u3002',
    galleryBody:
      '\u6bcf\u500b\u5361\u7247\u8f49\u5834\u4f34\u96a8\u8996\u7a97\u51f8\u986f\u91cf\u8abf\u4e2d\u5fc3\u5448\u73fe\u3002',
    closerEyebrow: '\u6536\u5c3e\u63a8\u9032',
    closerTitle: '\u7528\u5f8c\u8ddf\u6d3e\u7279\u793a\u4fdd\u6301\u53ef\u9023\u7d61\u6027\u3002',
    closerBody:
      '\u975c\u614b\u9023\u7dda\u6b04\u3001\u672c\u5730\u5316\u8173\u6b65\u8207\u5192\u6ce1\u52a0\u5f37\u80fd\u898b\u5ba2\u6f5b\u5728\u7dda\u4e0a\u6d88\u606f\u3002',
    ariaSlider: '\u8abf\u6574\u9810\u89bd\u6846\u5bec\u5ea6',
  },
};

const viewportPresets = [
  { id: 'desktop', width: 1080 },
  { id: 'tablet', width: 820 },
  { id: 'mobile', width: 420 },
];

const parallaxItems: ParallaxItem[] = [
  {
    id: 'glow-left',
    speed: -0.18,
    className:
      'pointer-events-none hidden md:block absolute h-64 w-64 rounded-full bg-sky-500/20 blur-3xl',
    top: 120,
    left: '-6%',
  },
  {
    id: 'glow-right',
    speed: -0.12,
    className:
      'pointer-events-none hidden lg:block absolute h-72 w-72 rounded-full bg-violet-500/10 blur-3xl',
    top: 360,
    right: '-10%',
  },
  {
    id: 'card-stack',
    speed: -0.26,
    className:
      'pointer-events-none hidden xl:flex absolute right-[-6%] top-48 h-56 w-40 flex-col gap-3',
    top: 300,
    right: '-6%',
  },
  {
    id: 'ticker-line',
    speed: -0.08,
    className:
      'pointer-events-none absolute left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-sky-500/40 to-transparent md:block',
    top: 0,
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function IntroShowcase({ locale }: IntroShowcaseProps) {
  const [viewportWidth, setViewportWidth] = useState(980);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleSections, setVisibleSections] = useState<SectionState>({ hero: true });
  const [maxPreviewWidth, setMaxPreviewWidth] = useState<number | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const container = frameRef.current;
    if (!container) {
      return undefined;
    }

    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      requestAnimationFrame(() => {
        setScrollPosition(container.scrollTop);
        ticking = false;
      });
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const container = frameRef.current;
    if (!container) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections((previous) => {
          const next: SectionState = { ...previous };
          for (const entry of entries) {
            const id = entry.target.getAttribute('data-section-id');
            if (id) {
              next[id] = entry.isIntersecting;
            }
          }
          return next;
        });
      },
      {
        root: container,
        rootMargin: '0px 0px -20% 0px',
        threshold: 0.35,
      },
    );

    const nodes = Object.values(sectionRefs.current);
    for (const node of nodes) {
      if (node) {
        observer.observe(node);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const updateMaxWidth = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(section);
      const paddingRight = Number.parseFloat(computedStyle.paddingRight) || 0;

      const available = window.innerWidth - rect.left - paddingRight;
      const safeAvailable = Math.max(0, available);
      const clamped = Math.max(MIN_VIEWPORT, Math.min(MAX_VIEWPORT, safeAvailable));

      setMaxPreviewWidth(Number.isFinite(clamped) ? clamped : null);
    };

    updateMaxWidth();

    window.addEventListener('resize', updateMaxWidth);

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(updateMaxWidth);
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
      return () => {
        window.removeEventListener('resize', updateMaxWidth);
        observer.disconnect();
      };
    }

    return () => {
      window.removeEventListener('resize', updateMaxWidth);
    };
  }, []);

  const parallax = useMemo(
    () =>
      parallaxItems.map((item) => {
        const translateY = scrollPosition * item.speed;
        if (item.id === 'card-stack') {
          return (
            <div
              key={item.id}
              className={item.className}
              style={{
                top: item.top,
                right: item.right,
                transform: `translate3d(0, ${translateY}px, 0)`
              }}
            >
              <div className="h-28 rounded-2xl border border-slate-800 bg-slate-900/70 shadow-[0_15px_30px_-20px_rgba(56,189,248,0.55)]"></div>
              <div className="h-20 rounded-2xl border border-slate-800 bg-slate-900/50 shadow-[0_12px_24px_-18px_rgba(129,140,248,0.5)]"></div>
            </div>
          );
        }

        if (item.id === 'ticker-line') {
          return (
            <span
              key={item.id}
              className={item.className}
              style={{
                height: '140%',
                top: item.top,
                transform: `translate3d(0, ${translateY}px, 0)`
              }}
            />
          );
        }

        return (
          <span
            key={item.id}
            className={item.className}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              transform: `translate3d(0, ${translateY}px, 0)`
            }}
          />
        );
      }),
    [scrollPosition],
  );

  const content = copy[locale];
  const desiredWidth = clamp(viewportWidth, MIN_VIEWPORT, MAX_VIEWPORT);
  const frameWidth =
    maxPreviewWidth != null ? Math.min(desiredWidth, maxPreviewWidth) : desiredWidth;

  const assignSectionRef = (id: string) => (node: HTMLDivElement | null) => {
    sectionRefs.current[id] = node;
  };

  return (
    <section ref={sectionRef} className="relative rounded-3xl border border-slate-800/60 bg-slate-950/50 p-6 sm:p-10">
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
        <div className="relative">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              {content.heading}
            </p>
            <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
              {content.description}
            </h2>
          </div>
          <div className="mt-8 flex items-stretch justify-center">
            <div className="relative flex w-full max-w-[1160px] justify-center overflow-x-auto lg:overflow-visible">
              <div
                className="relative flex max-w-full flex-shrink-0 flex-col overflow-hidden rounded-[32px] border border-slate-800/70 bg-slate-950/70 shadow-[0_40px_120px_-60px_rgba(14,116,144,0.7)] backdrop-blur"
                style={{
                  width: `${frameWidth}px`,
                  transition: 'width 200ms ease-out',
                }}
              >
                <div className="flex items-center justify-between border-b border-slate-800/70 bg-slate-900/60 px-6 py-4 text-xs uppercase tracking-[0.25em] text-slate-500">
                  <span>Linea Stories</span>
                  <span>Intro Launch</span>
                </div>
                <div className="relative h-[600px] overflow-y-auto scroll-smooth" ref={frameRef}>
                  <div className="relative space-y-12 px-8 pb-12 pt-10 sm:px-10">
                    <div className="pointer-events-none" aria-hidden>
                      {parallax}
                    </div>
                    <div
                      ref={assignSectionRef('hero')}
                      data-section-id="hero"
                      className={`relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-8 py-12 shadow-[0_20px_80px_-50px_rgba(56,189,248,0.7)] transition-all duration-700 ease-out ${
                        visibleSections.hero ? 'opacity-100 translate-y-0' : 'translate-y-6 opacity-0'
                      }`}
                    >
                      <div className="flex flex-col gap-4 text-slate-100 sm:max-w-xl">
                        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-400">
                          {content.heroEyebrow}
                        </span>
                        <h3 className="text-3xl font-semibold sm:text-4xl">{content.heroTitle}</h3>
                        <p className="text-sm text-slate-300 sm:text-base">{content.heroBody}</p>
                        <button
                          type="button"
                          className="mt-2 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
                        >
                          <span className="h-2 w-2 rounded-full bg-slate-900" />
                          {content.heroCta}
                        </button>
                      </div>
                      <div className="pointer-events-none absolute -right-16 bottom-0 hidden h-56 w-56 rounded-full bg-sky-500/10 blur-3xl lg:block" />
                    </div>

                    <div
                      ref={assignSectionRef('timeline')}
                      data-section-id="timeline"
                      className={`grid gap-6 rounded-3xl border border-slate-800/60 bg-slate-900/60 p-8 shadow-[0_24px_90px_-60px_rgba(56,189,248,0.5)] transition-all duration-700 ease-out md:grid-cols-[1.2fr,1fr] ${
                        visibleSections.timeline ? 'opacity-100 translate-y-0' : 'translate-y-6 opacity-0'
                      }`}
                    >
                      <div className="space-y-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
                          {content.timelineEyebrow}
                        </span>
                        <h3 className="text-2xl font-semibold text-slate-50">{content.timelineTitle}</h3>
                        <p className="text-sm text-slate-300 sm:text-base">{content.timelineBody}</p>
                        <ul className="space-y-3 text-sm text-slate-300">
                          <li className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-sky-400" />
                            <span>00:12 - Product lineup reveal</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-sky-400" />
                            <span>00:36 - Metrics ticker pins</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-sky-400" />
                            <span>01:05 - Region-specific CTA</span>
                          </li>
                        </ul>
                      </div>
                      <div className="relative flex flex-col gap-4">
                        {[0, 1, 2].map((index) => (
                          <div
                            key={index}
                            className={`h-32 rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-800/70 via-slate-900/40 to-slate-950/80 shadow-[0_12px_30px_-18px_rgba(129,140,248,0.6)] transition-opacity duration-700 ease-out ${
                              visibleSections.timeline ? 'opacity-100' : index === 0 ? 'opacity-0 delay-150' : 'opacity-0'
                            }`}
                          />
                        ))}
                        <span className="pointer-events-none absolute -right-6 top-8 hidden h-24 w-24 rounded-full bg-violet-500/10 blur-2xl xl:block" />
                      </div>
                    </div>

                    <div
                      ref={assignSectionRef('gallery')}
                      data-section-id="gallery"
                      className={`rounded-3xl border border-slate-800/60 bg-slate-900/50 p-8 shadow-[0_24px_90px_-60px_rgba(2,132,199,0.45)] transition-all duration-700 ease-out ${
                        visibleSections.gallery ? 'opacity-100 translate-y-0' : 'translate-y-6 opacity-0'
                      }`}
                    >
                      <div className="space-y-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
                          {content.galleryEyebrow}
                        </span>
                        <h3 className="text-2xl font-semibold text-slate-50">{content.galleryTitle}</h3>
                        <p className="text-sm text-slate-300 sm:text-base">{content.galleryBody}</p>
                      </div>
                      <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        {['Aurora Studio', 'Launch Score', 'Field Notes'].map((label, index) => (
                          <div
                            key={label}
                            className={`group relative flex h-36 items-end overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 transition-all duration-700 ease-out ${
                              visibleSections.gallery
                                ? 'translate-y-0 opacity-100'
                                : index > 0
                                  ? 'translate-y-6 opacity-0'
                                  : 'translate-y-3 opacity-0'
                            }`}
                          >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <p className="relative text-sm font-semibold text-slate-100">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      ref={assignSectionRef('closer')}
                      data-section-id="closer"
                      className={`rounded-3xl border border-slate-800/60 bg-gradient-to-r from-slate-900/70 via-slate-950/80 to-slate-900/70 px-8 py-10 transition-all duration-700 ease-out ${
                        visibleSections.closer ? 'opacity-100 translate-y-0' : 'translate-y-6 opacity-0'
                      }`}
                    >
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-xl space-y-3">
                          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
                            {content.closerEyebrow}
                          </span>
                          <h3 className="text-2xl font-semibold text-slate-50">{content.closerTitle}</h3>
                          <p className="text-sm text-slate-300 sm:text-base">{content.closerBody}</p>
                        </div>
                        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/50 p-4 text-sm text-slate-200">
                          <div className="flex items-center justify-between gap-4">
                            <span>contact@lineastories.com</span>
                            <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-200">
                              24h reply
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span>Localized footer</span>
                            <span className="text-slate-400">EN / JP / ZH</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="flex flex-col gap-6 rounded-3xl border border-slate-800/60 bg-slate-950/60 p-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
              {content.controlsTitle}
            </p>
            <h3 className="text-xl font-semibold text-slate-50">{content.controlsHeading}</h3>
            <p className="text-sm text-slate-400">{content.controlsDescription}</p>
          </div>
          <label className="text-sm font-medium text-slate-200" htmlFor="intro-viewport-slider">
            {content.sliderLabel}
          </label>
          <input
            id="intro-viewport-slider"
            type="range"
            min={MIN_VIEWPORT}
            max={MAX_VIEWPORT}
            value={clamp(viewportWidth, MIN_VIEWPORT, MAX_VIEWPORT)}
            aria-label={content.ariaSlider}
            onChange={(event) => setViewportWidth(Number(event.target.value))}
            className="accent-sky-400"
          />
          <p className="text-xs text-slate-500">{content.sliderHelp}</p>
          <div className="flex flex-wrap gap-2">
            {viewportPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setViewportWidth(preset.width)}
                className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  viewportWidth === preset.width
                    ? 'border-sky-400/60 bg-sky-500/20 text-sky-100'
                    : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-slate-100'
                }`}
              >
                {preset.id === 'desktop'
                  ? content.presetDesktop
                  : preset.id === 'tablet'
                    ? content.presetTablet
                    : content.presetMobile}
              </button>
            ))}
          </div>
          <dl className="mt-2 space-y-2 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <dt>{content.currentWidth}</dt>
              <dd className="font-semibold text-slate-100">
                {Math.round(frameWidth)}px
              </dd>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <dt>Min / Max</dt>
              <dd>
                {MIN_VIEWPORT}px - {MAX_VIEWPORT}px
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
