'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type React from 'react';

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
    heading: '嗨來一頁式展示',
    description:
      '漸進瀏覽從開展到收尾，同步展示演出風樣、波形圖像逆向攝動及即時 RWD 控制。',
    controlsTitle: '即時調整',
    controlsHeading: '預覽斷點',
    controlsDescription:
      '修改預覽框的寬度，即可快速切換桌機、平板與手機互動式。',
    sliderLabel: '頁面寬度',
    currentWidth: '目前寬度',
    presetsLabel: '快速邊緣',
    presetDesktop: '桌機',
    presetTablet: '平板',
    presetMobile: '手機',
    sliderHelp: '拖拉或選擇預設調整預覽框。',
    heroEyebrow: '開場節奏',
    heroTitle: '保持文案及動態的佳完約。',
    heroBody:
      '大抄字持緊視窗、演繹架設作為配同。CTA 等功能保持站守會眾。',
    heroCta: '啟動聲音模式',
    timelineEyebrow: '章節分層',
    timelineTitle: '重要時程光速被顯示。',
    timelineBody:
      '瀏覽進程間，支撐圖像與統計結合透出現、確保保持緊貼人心的說明。',
    galleryEyebrow: '視覺展示',
    galleryTitle: '交織影片、模擬操作與壹分圖片。',
    galleryBody:
      '每個卡片轉場伴隨視窗凸顯量調中心呈現。',
    closerEyebrow: '收尾推進',
    closerTitle: '用後跟派特示保持可連絡性。',
    closerBody:
      '靜態連線欄、本地化腳步與泡泡加強能見客潛在線上消息。',
    ariaSlider: '調整預覽框寬度',
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
  const previewAreaRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragStateRef = useRef<{ startX: number; startWidth: number } | null>(null);

  useEffect(() => {
    const container = frameRef.current;
    if (!container) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrollPosition(container.scrollTop);
        ticking = false;
      });
    };
    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = frameRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections((previous) => {
          const next: SectionState = { ...previous };
          for (const entry of entries) {
            const id = entry.target.getAttribute('data-section-id');
            if (id) next[id] = entry.isIntersecting;
          }
          return next;
        });
      },
      { root: container, rootMargin: '0px 0px -20% 0px', threshold: 0.35 },
    );

    const nodes = Object.values(sectionRefs.current);
    for (const node of nodes) if (node) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateMaxWidth = () => {
      const preview = previewAreaRef.current;
      if (!preview) return;
      const rect = preview.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(preview);
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
      if (previewAreaRef.current) observer.observe(previewAreaRef.current);
      return () => {
        window.removeEventListener('resize', updateMaxWidth);
        observer.disconnect();
      };
    }

    return () => window.removeEventListener('resize', updateMaxWidth);
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
              style={{ top: item.top, right: item.right, transform: `translate3d(0, ${translateY}px, 0)` }}
            >
              <div className="h-28 rounded-2xl border border-slate-800 bg-slate-900/70 shadow-[0_15px_30px_-20px_rgba(56,189,248,0.55)]" />
              <div className="h-20 rounded-2xl border border-slate-800 bg-slate-900/50 shadow-[0_12px_24px_-18px_rgba(129,140,248,0.5)]" />
            </div>
          );
        }
        if (item.id === 'ticker-line') {
          return (
            <span
              key={item.id}
              className={item.className}
              style={{ height: '140%', top: item.top, transform: `translate3d(0, ${translateY}px, 0)` }}
            />
          );
        }
        return (
          <span
            key={item.id}
            className={item.className}
            style={{ top: item.top, left: item.left, right: item.right, transform: `translate3d(0, ${translateY}px, 0)` }}
          />
        );
      }),
    [scrollPosition],
  );

  const content = copy[locale];
  const desiredWidth = clamp(viewportWidth, MIN_VIEWPORT, MAX_VIEWPORT);
  const frameWidth = maxPreviewWidth != null ? Math.min(desiredWidth, maxPreviewWidth) : desiredWidth;

  const assignSectionRef = (id: string) => (node: HTMLDivElement | null) => {
    sectionRefs.current[id] = node;
  };

  const startResize = (event: React.MouseEvent | React.TouchEvent) => {
    const getClientX = (e: any) => (e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX);
    const clientX = getClientX(event);
    dragStateRef.current = { startX: clientX, startWidth: clamp(viewportWidth, MIN_VIEWPORT, MAX_VIEWPORT) };

    const onMove = (e: any) => {
      const cx = getClientX(e);
      if (dragStateRef.current == null) return;
      const delta = cx - dragStateRef.current.startX;
      const next = dragStateRef.current.startWidth + delta;
      setViewportWidth(clamp(next, MIN_VIEWPORT, MAX_VIEWPORT));
      if (e.cancelable) e.preventDefault();
    };

    const onEnd = () => {
      window.removeEventListener('mousemove', onMove as any);
      window.removeEventListener('mouseup', onEnd as any);
      window.removeEventListener('touchmove', onMove as any);
      window.removeEventListener('touchend', onEnd as any);
      dragStateRef.current = null;
    };

    window.addEventListener('mousemove', onMove as any);
    window.addEventListener('mouseup', onEnd as any);
    window.addEventListener('touchmove', onMove as any, { passive: false } as any);
    window.addEventListener('touchend', onEnd as any);
    if ((event as any).preventDefault) (event as any).preventDefault();
  };

  return (
    <section className="relative rounded-3xl border border-slate-800/60 bg-slate-950/50 p-6 sm:p-10">
      <div className="flex flex-col gap-8">
        {/* Heading */}
        <div className="relative">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">{content.heading}</p>
            <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">{content.description}</h2>
          </div>
        </div>

        {/* Preview Area (Resizable) */}
        <div className="relative" ref={previewAreaRef}>
          <div className="flex items-stretch justify-center">
            <div className="relative flex w-full max-w-[1160px] justify-center overflow-x-auto lg:overflow-visible">
              <div
                className="relative flex max-w-full flex-shrink-0 flex-col overflow-hidden rounded-[32px] border border-slate-800/70 bg-slate-950/70 shadow-[0_40px_120px_-60px_rgba(14,116,144,0.7)] backdrop-blur"
                style={{ width: `${frameWidth}px`, transition: 'width 200ms ease-out' }}
              >
                <div className="flex items-center justify-between border-b border-slate-800/70 bg-slate-900/60 px-6 py-4 text-xs uppercase tracking-[0.25em] text-slate-500">
                  <span>Linea Stories</span>
                  <span>Intro Launch</span>
                </div>
                <div
                  className="absolute right-0 top-0 z-10 h-full w-3 cursor-col-resize"
                  onMouseDown={startResize}
                  onTouchStart={startResize}
                  role="separator"
                  aria-label={content.ariaSlider}
                />
                <div className="relative h-[600px] overflow-y-auto no-scrollbar scroll-smooth" ref={frameRef}>
                  <div className="relative space-y-12 px-8 pb-12 pt-10 sm:px-10">
                    <div className="pointer-events-none" aria-hidden>
                      {parallax}
                    </div>

                    {/* Hero */}
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

                    {/* Timeline */}
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
                          <div key={index} className="rounded-2xl border border-slate-800/60 bg-slate-950/50 p-4">
                            <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                              <span>Milestone {index + 1}</span>
                              <span className="text-xs text-slate-500">00:{(index + 1) * 15}</span>
                            </div>
                            <div className="h-24 rounded-lg bg-gradient-to-r from-sky-500/20 via-violet-500/10 to-sky-500/20" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gallery */}
                    <div
                      ref={assignSectionRef('gallery')}
                      data-section-id="gallery"
                      className={`rounded-3xl border border-slate-800/60 bg-slate-900/50 p-8 shadow-[0_24px_90px_-60px_rgba(56,189,248,0.4)] transition-all duration-700 ease-out ${
                        visibleSections.gallery ? 'opacity-100 translate-y-0' : 'translate-y-6 opacity-0'
                      }`}
                    >
                      <div className="mb-6 space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
                          {content.galleryEyebrow}
                        </span>
                        <h3 className="text-2xl font-semibold text-slate-50">{content.galleryTitle}</h3>
                        <p className="text-sm text-slate-300 sm:text-base">{content.galleryBody}</p>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {['Kinetic hero', 'Waveform overlay', 'Hotspot cards', 'Backstage clips'].map((label, i) => (
                          <div key={i} className="group relative overflow-hidden rounded-xl border border-slate-800/60 bg-slate-900/50 p-4">
                            <div className="h-32 rounded-lg bg-gradient-to-tr from-sky-500/20 via-sky-500/10 to-violet-500/20" />
                            <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <p className="relative mt-3 text-sm font-semibold text-slate-100">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Closer */}
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
                            <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-200">24h reply</span>
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

        {/* Controls */}
        <aside className="flex flex-col gap-6 rounded-3xl border border-slate-800/60 bg-slate-950/60 p-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">{content.controlsTitle}</p>
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
              <dd className="font-semibold text-slate-100">{Math.round(frameWidth)}px</dd>
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

