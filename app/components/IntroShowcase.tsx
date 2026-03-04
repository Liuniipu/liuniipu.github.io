'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

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
type ViewportPresetId = 'desktop' | 'tablet' | 'mobile';

const MIN_VIEWPORT = 360;
const MAX_VIEWPORT = 1160;

const copy = {
  en: {
    heading: 'Immersive intro microsite',
    description:
      'Scroll through a single-page story built for launches: layered hero, staggered chapters, and responsive controls on the fly.',
    controlsTitle: 'Device preview',
    controlsHeading: 'Preview breakpoints',
    controlsDescription:
      'Switch between desktop, tablet, and phone presets to review layout behavior in a guided preview frame.',
    currentWidth: 'Current width',
    presetDesktop: 'Desktop',
    presetTablet: 'Tablet',
    presetMobile: 'Phone',
    deviceDesktop: 'Desktop preview',
    deviceTablet: 'Tablet preview',
    deviceMobile: 'Phone preview',
    heroEyebrow: 'Launch chapter',
    heroTitle: 'Balance narrative copy with kinetic visuals.',
    heroBody:
      'Pin striking headlines while parallax illustrations drift at varying speeds. CTA stays visible as the story opens.',
    heroCta: 'Get started now',
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
    timelineList: [
      '00:12 - Product lineup reveal',
      '00:36 - Metrics ticker pins',
      '01:05 - Region-specific CTA',
    ],
    milestoneLabel: 'Milestone',
    galleryCards: ['Kinetic hero', 'Waveform overlay', 'Hotspot cards', 'Backstage clips'],
    contactReply: '24h reply',
    localizedFooter: 'Languages: EN + TW-ZH',
    endOfShowcase: 'End of showcase',
  },
  zh: {
    heading: '\u6c89\u6d78\u5f0f\u958b\u5834\u5fae\u7db2\u7ad9',
    description:
      '\u4ee5\u55ae\u9801\u6545\u4e8b\u6d41\u65b9\u5f0f\u6f14\u793a\u54c1\u724c\u958b\u5834\uff1a\u5206\u5c64 hero\u3001\u7ae0\u7bc0\u5f0f\u5167\u5bb9\u8f49\u5834\uff0c\u4e26\u53ef\u5207\u63db\u88dd\u7f6e\u9810\u89bd\u6aa2\u8996\u7248\u578b\u3002',
    controlsTitle: '\u88dd\u7f6e\u9810\u89bd',
    controlsHeading: '\u5207\u63db\u756b\u9762\u5c3a\u5bf8',
    controlsDescription:
      '\u4f7f\u7528\u9810\u8a2d\u6309\u9215\u5feb\u901f\u5207\u63db\u684c\u6a5f\u3001\u5e73\u677f\u8207\u624b\u6a5f\u6a21\u5f0f\uff0c\u6aa2\u8996\u7248\u9762\u5728\u4e0d\u540c\u5bec\u5ea6\u4e0b\u7684\u5448\u73fe\u3002',
    currentWidth: '\u76ee\u524d\u5bec\u5ea6',
    presetDesktop: '\u684c\u6a5f',
    presetTablet: '\u5e73\u677f',
    presetMobile: '\u624b\u6a5f',
    deviceDesktop: '\u684c\u6a5f\u9810\u89bd',
    deviceTablet: '\u5e73\u677f\u9810\u89bd',
    deviceMobile: '\u624b\u6a5f\u9810\u89bd',
    heroEyebrow: '\u958b\u5834\u6bb5\u843d',
    heroTitle: '\u8b93\u6587\u6848\u8207\u52d5\u614b\u8996\u89ba\u4fdd\u6301\u5e73\u8861\u3002',
    heroBody:
      '\u4ee5\u5438\u775b\u6a19\u984c\u958b\u5834\uff0c\u642d\u914d\u5206\u5c64\u5149\u5f71\u79fb\u52d5\u8207\u7a69\u5b9a CTA\uff0c\u8b93\u4f7f\u7528\u8005\u5f9e\u7b2c\u4e00\u5c4f\u5c31\u638c\u63e1\u4e3b\u8981\u8a0a\u606f\u3002',
    heroCta: '\u7acb\u5373\u958b\u59cb',
    timelineEyebrow: '\u7ae0\u7bc0\u7bc0\u9ede',
    timelineTitle: '\u91cd\u8981\u91cc\u7a0b\u7891\u8207\u8a0a\u606f\u4f9d\u5e8f\u5c55\u958b\u3002',
    timelineBody:
      '\u96a8\u8457\u6372\u52d5\u9010\u6b65\u986f\u793a\u7ae0\u7bc0\u5361\u7247\uff0c\u5c07\u6642\u9593\u8ef8\u3001\u95dc\u9375\u6578\u64da\u8207\u914d\u5716\u6574\u7406\u5728\u540c\u4e00\u500b\u95b1\u8b80\u7bc0\u594f\u4e2d\u3002',
    galleryEyebrow: '\u5a92\u9ad4\u5c55\u793a',
    galleryTitle: '\u4ee5\u5716\u50cf\u5340\u584a\u7d50\u5408\u529f\u80fd\u4eae\u9ede\u63d0\u793a\u3002',
    galleryBody:
      '\u6bcf\u500b\u5361\u7247\u7528\u4f86\u7a81\u51fa\u7522\u54c1\u7279\u8272\u3001\u5f71\u7247\u7247\u6bb5\u6216\u4e92\u52d5\u71b1\u9ede\uff0c\u5728\u5bec\u756b\u9762\u8207\u7a84\u756b\u9762\u90fd\u80fd\u6e05\u695a\u95b1\u8b80\u3002',
    closerEyebrow: '\u6536\u5c3e\u6bb5\u843d',
    closerTitle: '\u7528\u5206\u5c64\u6536\u5c3e\u5f15\u5c0e\u5f8c\u7e8c\u884c\u52d5\u3002',
    closerBody:
      '\u5728\u4e0d\u6253\u65b7\u95b1\u8b80\u6d41\u7a0b\u7684\u524d\u63d0\u4e0b\uff0c\u4fdd\u7559\u806f\u7d61\u65b9\u5f0f\u3001\u672c\u5730\u5316\u8cc7\u8a0a\u8207\u8f49\u63db\u5165\u53e3\uff0c\u63d0\u9ad8\u5f8c\u7e8c\u6d3d\u8a62\u6a5f\u6703\u3002',
    timelineList: [
      '00:12 - \u7522\u54c1\u9663\u5bb9\u4eae\u76f8',
      '00:36 - \u95dc\u9375\u6578\u64da\u689d\u56fa\u5b9a\u986f\u793a',
      '01:05 - \u5206\u5730\u5340 CTA \u5207\u63db',
    ],
    milestoneLabel: '\u91cc\u7a0b\u7891',
    galleryCards: ['\u52d5\u614b\u958b\u5834', '\u6ce2\u5f62\u758a\u5716', '\u71b1\u9ede\u5361\u7247', '\u5e55\u5f8c\u7247\u6bb5'],
    contactReply: '24 \u5c0f\u6642\u56de\u8986',
    localizedFooter: '\u8a9e\u8a00\uff1aEN + TW-ZH',
    endOfShowcase: '\u5c55\u793a\u5230\u5e95\u4e86',
  },
};
const viewportPresets = [
  { id: 'desktop', width: 1080, iconId: 'monitor' },
  { id: 'tablet', width: 820, iconId: 'tabletDevice' },
  { id: 'mobile', width: 420, iconId: 'phoneDevice' },
] as const;

const timelineIconIds = ['rocket', 'chart', 'globe'] as const;
const galleryIconIds = ['spark', 'sliders', 'pin', 'film'] as const;

type IntroIconId =
  | (typeof timelineIconIds)[number]
  | (typeof galleryIconIds)[number]
  | 'megaphone'
  | 'compass'
  | 'monitor'
  | 'tabletDevice'
  | 'phoneDevice';
type ShowcaseIconProps = {
  id: IntroIconId;
  className?: string;
};

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

function ShowcaseIcon({ id, className = '' }: ShowcaseIconProps) {
  const baseClass = `h-6 w-6 text-sky-300 ${className}`.trim();
  switch (id) {
    case 'rocket':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-hidden="true">
          <path d="M14 4l6 6-5.5 5.5a6 6 0 01-8.5 0L4 14l5.5-5.5A6 6 0 0114 4z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 16l-1.5 3.5L10 18m6-10l1.5-3.5L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="13.5" cy="10.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-hidden="true">
          <path d="M4 19h16M7 16v-4m5 4V8m5 8v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 10l5-3 5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'globe':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 12h16M12 4a13 13 0 010 16M12 4a13 13 0 000 16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-hidden="true">
          <path d="M12 4l1.8 4.2L18 10l-4.2 1.8L12 16l-1.8-4.2L6 10l4.2-1.8L12 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M18.5 4.5v2M4.5 17.5v2M4.5 4.5v1.5M19.5 17v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'sliders':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="15" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="11" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'pin':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-hidden="true">
          <path d="M12 21s6-5.4 6-10a6 6 0 10-12 0c0 4.6 6 10 6 10z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'film':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-hidden="true">
          <rect x="5" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 6v12M15 6v12M5 10h4M15 10h4M5 14h4M15 14h4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'megaphone':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-hidden="true">
          <path d="M4 13v-2l9-4v10l-9-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M13 9h2a4 4 0 014 4 4 4 0 01-4 4h-2M7 15l1.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'compass':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case 'monitor':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-hidden="true">
          <rect x="3.5" y="5" width="17" height="11.5" rx="1.8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 19h6M12 16.5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'tabletDevice':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-hidden="true">
          <rect x="6.5" y="3.5" width="11" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="17.5" r="0.8" fill="currentColor" />
        </svg>
      );
    case 'phoneDevice':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-hidden="true">
          <rect x="8" y="2.5" width="8" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="18.3" r="0.8" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export function IntroShowcase({ locale }: IntroShowcaseProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<ViewportPresetId>('desktop');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleSections, setVisibleSections] = useState<SectionState>({ hero: true });
  const [previewWidth, setPreviewWidth] = useState<number>(MAX_VIEWPORT);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const previewAreaRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
            if (!id) {
              continue;
            }
            // Keep revealed sections visible to prevent flicker near trigger boundaries.
            if (entry.isIntersecting) {
              next[id] = true;
            }
          }
          return next;
        });
      },
      { root: container, rootMargin: '0px 0px -16% 0px', threshold: 0.4 },
    );

    const nodes = Object.values(sectionRefs.current);
    for (const node of nodes) if (node) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const preview = previewAreaRef.current;
    if (!preview) return;

    const updatePreviewWidth = () => {
      const measured = Math.max(0, preview.clientWidth);
      setPreviewWidth(Math.min(MAX_VIEWPORT, measured));
    };

    updatePreviewWidth();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        updatePreviewWidth();
      });
      observer.observe(preview);
      return () => observer.disconnect();
    }

    window.addEventListener('resize', updatePreviewWidth);
    return () => window.removeEventListener('resize', updatePreviewWidth);
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
  const selectedPreset = viewportPresets.find((preset) => preset.id === selectedPresetId) ?? viewportPresets[0];
  const isPhoneFrame = selectedPresetId === 'mobile';
  const isTabletFrame = selectedPresetId === 'tablet';
  const isDesktopFrame = selectedPresetId === 'desktop';
  const measuredPreviewWidth = previewWidth > 0 ? previewWidth : selectedPreset.width;
  const desktopTargetWidth = Math.round(measuredPreviewWidth * 0.9);
  const tabletTargetWidth = Math.min(selectedPreset.width, Math.round(measuredPreviewWidth * 0.96));
  const requestedWidth = isDesktopFrame ? desktopTargetWidth : isTabletFrame ? tabletTargetWidth : selectedPreset.width;
  const desiredWidth = clamp(requestedWidth, MIN_VIEWPORT, MAX_VIEWPORT);
  const availableWidth = measuredPreviewWidth;
  const layoutPreset: ViewportPresetId = desiredWidth <= 560 ? 'mobile' : desiredWidth <= 900 ? 'tablet' : 'desktop';
  const isPhoneLayout = layoutPreset === 'mobile';
  const isTabletLayout = layoutPreset === 'tablet';
  const isDesktopLayout = layoutPreset === 'desktop';
  const rawScale = desiredWidth > 0 ? Math.min(1, availableWidth / desiredWidth) : 1;
  const frameScale = Number.isFinite(rawScale) && rawScale > 0 ? rawScale : 1;
  const scaledWidth = Math.max(1, Math.round(desiredWidth * frameScale));
  const isScaledDown = frameScale < 0.999;
  const isNarrowTabletFrame = isTabletFrame && availableWidth < 620;
  const scalePercent = Math.round(frameScale * 100);
  const scaledMessage =
    locale === 'zh'
      ? `\u9810\u89bd\u7e2e\u653e\u70ba ${scalePercent}% \u4ee5\u9069\u61c9\u76ee\u524d\u7684\u87a2\u5e55\u3002`
      : `Preview scaled to ${scalePercent}% to fit the current screen.`;

  const assignSectionRef = (id: string) => (node: HTMLDivElement | null) => {
    sectionRefs.current[id] = node;
  };

  const isCompactFrame = desiredWidth <= 640;
  const frameHeight = isPhoneFrame
    ? 620
    : isDesktopFrame
      ? Math.round((desiredWidth * 9) / 16)
      : 600;
  const topBarClass = isPhoneLayout ? 'px-3 py-3 text-[10px]' : 'px-6 py-4 text-xs';
  const scrollContentClass = isPhoneLayout
    ? 'relative space-y-6 px-4 pb-0 pt-6'
    : isTabletLayout
      ? 'relative space-y-8 px-6 pb-0 pt-8'
      : 'relative space-y-12 px-8 pb-0 pt-10';
  const heroShellClass = isPhoneLayout
    ? 'rounded-2xl px-4 py-6'
    : isTabletLayout
      ? 'rounded-3xl px-6 py-8'
      : 'rounded-3xl px-8 py-12';
  const heroTitleClass = isPhoneLayout
    ? 'text-xl leading-tight'
    : isTabletLayout
      ? 'text-2xl leading-tight'
      : 'text-3xl leading-tight';
  const bodyTextClass = isPhoneLayout ? 'text-[13px] leading-6 text-slate-300' : 'text-sm leading-6 text-slate-300';
  const sectionPadClass = isPhoneLayout
    ? 'rounded-2xl p-4'
    : isTabletLayout
      ? 'rounded-3xl p-6'
      : 'rounded-3xl p-8';
  const sectionTitleClass = isPhoneLayout ? 'text-lg leading-snug' : 'text-2xl';
  const timelineGridClass = isDesktopLayout ? 'grid-cols-[1.2fr,1fr]' : 'grid-cols-1';
  const galleryGridClass = isPhoneLayout ? 'grid-cols-1' : isTabletLayout ? 'grid-cols-2' : 'grid-cols-4';
  const closerPadClass = isPhoneLayout
    ? 'rounded-2xl px-4 py-6'
    : isTabletLayout
      ? 'rounded-3xl px-6 py-8'
      : 'rounded-3xl px-8 py-10';
  const closerLayoutClass = isCompactFrame
    ? 'flex flex-col gap-4'
    : isTabletLayout
      ? 'flex flex-col gap-5'
      : 'flex items-center justify-between gap-6';
  const activePreset = selectedPresetId;
  const frameShellClass = isDesktopFrame
    ? 'rounded-[30px] border border-slate-700 bg-slate-900/70 p-2 pb-3 shadow-[0_28px_90px_-50px_rgba(15,23,42,0.9)]'
    : isTabletFrame
      ? isNarrowTabletFrame
        ? 'rounded-[30px] border-[6px] border-slate-700 bg-slate-900 p-1.5 shadow-[0_28px_90px_-55px_rgba(15,23,42,0.95)]'
        : 'rounded-[34px] border-[10px] border-slate-700 bg-slate-900 p-2 shadow-[0_28px_90px_-55px_rgba(15,23,42,0.95)]'
      : 'rounded-[38px] border-[8px] border-slate-700 bg-slate-900 p-2 shadow-[0_28px_90px_-55px_rgba(15,23,42,0.95)]';
  const screenRadiusClass = isDesktopFrame
    ? 'rounded-[22px]'
    : isTabletFrame
      ? isNarrowTabletFrame
        ? 'rounded-[18px]'
        : 'rounded-[24px]'
      : 'rounded-[30px]';

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

        {/* Preview Area */}
        <div className="relative" ref={previewAreaRef}>
          <div className="flex items-stretch justify-center">
            <div className="relative flex w-full max-w-[1160px] justify-center overflow-hidden">
              <div
                className="relative flex max-w-full flex-shrink-0 justify-center"
                style={{
                  width: `${scaledWidth}px`,
                  transition: 'width 200ms ease-out',
                }}
              >
                <div
                  className="relative flex max-w-full flex-shrink-0 flex-col"
                  style={{
                    width: `${desiredWidth}px`,
                    transform: `scale(${frameScale}) translateZ(0)`,
                    transformOrigin: 'top center',
                  }}
                >
                  <div className={`relative ${frameShellClass}`}>
                    {isPhoneFrame ? (
                      <div className="pointer-events-none absolute left-1/2 top-1.5 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-slate-800" />
                    ) : null}
                    {isTabletFrame ? (
                      <>
                        <span
                          className={`pointer-events-none absolute top-1/2 rounded-full bg-slate-700 ${
                            isNarrowTabletFrame
                              ? 'left-1 h-7 w-0.5 -translate-y-[135%]'
                              : 'left-1.5 h-10 w-1 -translate-y-[130%]'
                          }`}
                        />
                        <span
                          className={`pointer-events-none absolute top-1/2 rounded-full bg-slate-700 ${
                            isNarrowTabletFrame
                              ? 'left-1 h-10 w-0.5 -translate-y-[10%]'
                              : 'left-1.5 h-14 w-1 -translate-y-[10%]'
                          }`}
                        />
                        <span
                          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-slate-700 ${
                            isNarrowTabletFrame ? 'right-1 h-6 w-0.5' : 'right-1.5 h-8 w-1'
                          }`}
                        />
                      </>
                    ) : null}

                    <div
                      className={`relative flex flex-col overflow-hidden border border-slate-800/70 bg-slate-950/70 shadow-[0_40px_120px_-60px_rgba(14,116,144,0.7)] backdrop-blur ${screenRadiusClass}`}
                    >
                      <div
                        className={`flex items-center justify-between border-b border-slate-800/70 bg-slate-900/60 uppercase tracking-[0.25em] text-slate-500 ${topBarClass}`}
                      >
                        <span>Linea Stories</span>
                        <span>
                          {isDesktopFrame
                            ? content.deviceDesktop
                            : isTabletFrame
                              ? content.deviceTablet
                              : content.deviceMobile}
                        </span>
                      </div>
                      <div
                        className="relative overflow-y-auto overscroll-contain scroll-smooth no-scrollbar"
                        style={{ height: `${frameHeight}px` }}
                        ref={frameRef}
                      >
                    <div className={scrollContentClass}>
                      <div className="pointer-events-none" aria-hidden>
                        {parallax}
                      </div>

                    {/* Hero */}
                    <div
                      ref={assignSectionRef('hero')}
                      data-section-id="hero"
                      className={`relative overflow-hidden border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-[0_20px_80px_-50px_rgba(56,189,248,0.7)] transition-all duration-700 ease-out ${heroShellClass} ${
                        visibleSections.hero ? 'opacity-100 translate-y-0' : 'translate-y-6 opacity-0'
                      }`}
                    >
                      <div className={isDesktopLayout ? 'grid grid-cols-[1.15fr,0.85fr] gap-6' : 'block'}>
                        <div className={`flex flex-col gap-3 text-slate-100 ${isCompactFrame ? '' : 'max-w-xl'}`}>
                          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
                            {content.heroEyebrow}
                          </span>
                          <h3 className={`font-semibold text-slate-50 ${heroTitleClass}`}>{content.heroTitle}</h3>
                          <p className={bodyTextClass}>{content.heroBody}</p>
                          <button
                            type="button"
                            className="mt-1 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
                          >
                            <span className="h-2 w-2 rounded-full bg-slate-900" />
                            {content.heroCta}
                          </button>
                        </div>
                        {isDesktopLayout ? (
                          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                              Stage Layout
                            </p>
                            <div className="mt-3 space-y-3">
                              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                                <div className="mb-2 h-2 w-20 rounded-full bg-slate-700" />
                                <div className="flex h-14 items-center justify-center gap-3 rounded-lg bg-slate-900/40">
                                  <span className="intro-icon-split-left">
                                    <ShowcaseIcon id="film" />
                                  </span>
                                  <span className="intro-icon-breathe">
                                    <ShowcaseIcon id="compass" />
                                  </span>
                                  <span className="intro-icon-split-right">
                                    <ShowcaseIcon id="megaphone" />
                                  </span>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-300">
                                  KPI dock
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-300">
                                  CTA rail
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      {!isCompactFrame ? (
                        <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
                      ) : null}
                    </div>

                    {/* Timeline */}
                    <div
                      ref={assignSectionRef('timeline')}
                      data-section-id="timeline"
                      className={`grid gap-4 border border-slate-800/60 bg-slate-900/60 shadow-[0_24px_90px_-60px_rgba(56,189,248,0.5)] transition-all duration-700 ease-out ${sectionPadClass} ${timelineGridClass} ${
                        visibleSections.timeline ? 'opacity-100 translate-y-0' : 'translate-y-6 opacity-0'
                      }`}
                    >
                      <div className="space-y-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
                          {content.timelineEyebrow}
                        </span>
                        <h3 className={`font-semibold text-slate-50 ${sectionTitleClass}`}>{content.timelineTitle}</h3>
                        <p className={bodyTextClass}>{content.timelineBody}</p>
                        <ul className="space-y-2 text-sm leading-6 text-slate-300">
                          {content.timelineList.map((label) => (
                            <li key={label} className="flex items-start gap-3">
                              <span className="mt-2 h-2 w-2 rounded-full bg-sky-400" />
                              <span>{label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative flex flex-col gap-3">
                        {[0, 1, 2].map((index) => (
                          <div
                            key={index}
                            className={`rounded-2xl border border-slate-800/60 bg-slate-950/50 ${isPhoneLayout ? 'p-3' : 'p-4'}`}
                          >
                            <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                              <span>
                                {content.milestoneLabel} {index + 1}
                              </span>
                              <span className="text-xs text-slate-500">00:{(index + 1) * 15}</span>
                            </div>
                            <div
                              className={`flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-900/40 px-4 ${isPhoneLayout ? 'h-20' : 'h-24'}`}
                            >
                              <span className="intro-icon-bounce">
                                <ShowcaseIcon id={timelineIconIds[index] ?? 'rocket'} className="h-7 w-7" />
                              </span>
                              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Chapter {index + 1}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gallery */}
                    <div
                      ref={assignSectionRef('gallery')}
                      data-section-id="gallery"
                      className={`border border-slate-800/60 bg-slate-900/50 shadow-[0_24px_90px_-60px_rgba(56,189,248,0.4)] transition-all duration-700 ease-out ${sectionPadClass} ${
                        visibleSections.gallery ? 'opacity-100 translate-y-0' : 'translate-y-6 opacity-0'
                      }`}
                    >
                      <div className={isPhoneLayout ? 'mb-4 space-y-2' : 'mb-6 space-y-2'}>
                        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
                          {content.galleryEyebrow}
                        </span>
                        <h3 className={`font-semibold text-slate-50 ${sectionTitleClass}`}>{content.galleryTitle}</h3>
                        <p className={bodyTextClass}>{content.galleryBody}</p>
                      </div>
                      <div className={`grid gap-3 ${galleryGridClass}`}>
                        {content.galleryCards.map((label, index) => (
                          <div
                            key={label}
                            className={`group relative overflow-hidden rounded-xl border border-slate-800/60 bg-slate-900/50 ${isPhoneLayout ? 'p-3' : 'p-4'}`}
                          >
                            <div
                              className={`flex items-center justify-center rounded-lg border border-slate-800/60 bg-slate-900/35 ${isPhoneLayout ? 'h-24' : 'h-32'}`}
                            >
                              <span className={index % 2 === 0 ? 'intro-icon-slide-x' : 'intro-icon-slide-x-reverse'}>
                                <ShowcaseIcon
                                  id={galleryIconIds[index] ?? 'spark'}
                                  className={isPhoneLayout ? 'h-7 w-7' : 'h-8 w-8'}
                                />
                              </span>
                            </div>
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
                      className={`border border-slate-800/60 bg-gradient-to-r from-slate-900/70 via-slate-950/80 to-slate-900/70 transition-all duration-700 ease-out ${closerPadClass} ${
                        visibleSections.closer ? 'opacity-100 translate-y-0' : 'translate-y-6 opacity-0'
                      }`}
                    >
                      <div className={closerLayoutClass}>
                        <div className={`space-y-3 ${isCompactFrame ? '' : 'max-w-xl'}`}>
                          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
                            {content.closerEyebrow}
                          </span>
                          <h3 className={`font-semibold text-slate-50 ${sectionTitleClass}`}>{content.closerTitle}</h3>
                          <p className={bodyTextClass}>{content.closerBody}</p>
                        </div>
                        <div className="flex min-w-0 flex-col gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/50 p-4 text-sm text-slate-200">
                          <div className={`flex gap-2 ${isCompactFrame ? 'flex-col' : 'items-center justify-between'}`}>
                            <span className="min-w-0 break-words text-sm font-semibold text-slate-100">
                              chuanren54.gmail.com
                            </span>
                            <span className="w-fit rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-200">
                              {content.contactReply}
                            </span>
                          </div>
                          <div className={`flex gap-2 ${isCompactFrame ? 'flex-col' : 'items-center justify-between'}`}>
                            <span className="text-sm text-slate-200">{content.localizedFooter}</span>
                            <span className="w-fit rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                              EN / TW-ZH
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-full border border-slate-800/60 bg-slate-950/40 px-4 py-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-400">
                      {content.endOfShowcase}
                    </div>
                  </div>
                </div>
                    </div>
                  </div>
                  {isDesktopFrame ? (
                    <div className="pointer-events-none mt-1 flex flex-col items-center">
                      <div className="h-8 w-20 rounded-b-2xl border-x border-b border-slate-700 bg-slate-900/80" />
                      <div className="mt-1 h-2 w-40 rounded-full border border-slate-700 bg-slate-900/70" />
                    </div>
                  ) : null}
                  {isPhoneFrame ? (
                    <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 h-1.5 w-24 -translate-x-1/2 rounded-full bg-slate-700/90" />
                  ) : null}
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
          <div className="grid gap-3 sm:grid-cols-3">
            {viewportPresets.map((preset) => {
              const isActive = activePreset === preset.id;
              const label =
                preset.id === 'desktop'
                  ? content.presetDesktop
                  : preset.id === 'tablet'
                    ? content.presetTablet
                    : content.presetMobile;
              const subtitle =
                preset.id === 'desktop'
                  ? content.deviceDesktop
                  : preset.id === 'tablet'
                    ? content.deviceTablet
                    : content.deviceMobile;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedPresetId(preset.id)}
                  className={`flex min-h-[78px] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                    isActive
                      ? 'border-sky-400/70 bg-sky-500/15 text-sky-50 shadow-[0_12px_30px_-20px_rgba(56,189,248,0.8)]'
                      : 'border-slate-700 bg-slate-900/70 text-slate-200 hover:border-slate-500 hover:text-slate-50'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border text-xl ${
                      isActive
                        ? 'border-sky-300/40 bg-sky-400/10 text-sky-200'
                        : 'border-slate-700 bg-slate-950 text-slate-300'
                    }`}
                  >
                    <ShowcaseIcon id={preset.iconId} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{label}</span>
                    <span className={`block text-xs ${isActive ? 'text-sky-200/90' : 'text-slate-400'}`}>
                      {subtitle} · {preset.width}px
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          {isScaledDown ? (
            <p className="text-xs text-slate-500">{scaledMessage}</p>
          ) : null}
          <dl className="mt-2 space-y-2 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <dt>{content.currentWidth}</dt>
              <dd className="font-semibold text-slate-100">{Math.round(desiredWidth)}px</dd>
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
      <style jsx>{`
        .intro-icon-bounce {
          display: inline-flex;
          animation: intro-bounce 1.8s ease-in-out infinite;
        }
        .intro-icon-breathe {
          display: inline-flex;
          animation: intro-breathe 2.4s ease-in-out infinite;
        }
        .intro-icon-split-left {
          display: inline-flex;
          animation: intro-split-left 2.1s ease-in-out infinite;
        }
        .intro-icon-split-right {
          display: inline-flex;
          animation: intro-split-right 2.1s ease-in-out infinite;
        }
        .intro-icon-slide-x {
          display: inline-flex;
          animation: intro-slide-x 2.2s ease-in-out infinite;
        }
        .intro-icon-slide-x-reverse {
          display: inline-flex;
          animation: intro-slide-x-reverse 2.2s ease-in-out infinite;
        }
        @keyframes intro-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-5px);
          }
          65% {
            transform: translateY(2px);
          }
        }
        @keyframes intro-breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.12);
            opacity: 1;
          }
        }
        @keyframes intro-split-left {
          0%,
          100% {
            transform: translateX(0) scale(1);
          }
          50% {
            transform: translateX(-6px) scale(0.96);
          }
        }
        @keyframes intro-split-right {
          0%,
          100% {
            transform: translateX(0) scale(1);
          }
          50% {
            transform: translateX(6px) scale(0.96);
          }
        }
        @keyframes intro-slide-x {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(7px);
          }
        }
        @keyframes intro-slide-x-reverse {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-7px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .intro-icon-bounce,
          .intro-icon-breathe,
          .intro-icon-split-left,
          .intro-icon-split-right,
          .intro-icon-slide-x,
          .intro-icon-slide-x-reverse {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
