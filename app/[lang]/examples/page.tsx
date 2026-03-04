import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import { Navigation } from '../../components/Navigation';
import { SiteFooter } from '../../components/SiteFooter';
import {
  getDictionary,
  isLocale,
  localeOptions,
  locales,
  type Locale,
  type NavItem,
} from '../../../lib/homeContent';

const SocialIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <circle cx="6" cy="7" r="2" />
    <circle cx="18" cy="7" r="2" />
    <circle cx="12" cy="17" r="2" />
    <path d="M7.8 8.2 10.2 15M16.2 8.2 13.8 15M8 7h8" />
  </svg>
);

const ResourceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <path d="M4 4h16v16H4z" />
    <path d="M4 9h16M9 4v16" />
    <circle cx="14.5" cy="14.5" r="2.5" />
  </svg>
);

const BrandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <path d="M4 18V6l8-3 8 3v12l-8 3-8-3Z" />
    <path d="M12 3v18M4 6l8 3 8-3" />
  </svg>
);

const MobileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M10 5.5h4M12 18.5h.01" />
    <path d="M5 14c2-1.5 3-2 4-2M19 14c-2-1.5-3-2-4-2" />
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-full w-full">
    <path d="M10 7H6l-2 4v6h6v-6H7.5" />
    <path d="M20 7h-4l-2 4v6h6v-6h-2.5" />
  </svg>
);

const brandCardDecor: Record<string, { icon: ReactElement; animationClass: string }> = {
  'social-platform': { icon: <SocialIcon />, animationClass: 'example-anim-flip example-delay-0' },
  'resource-admin': { icon: <ResourceIcon />, animationClass: 'example-anim-flip example-delay-1' },
  'branding-site': { icon: <BrandIcon />, animationClass: 'example-anim-flip example-delay-2' },
  'mobile-app': { icon: <MobileIcon />, animationClass: 'example-anim-flip example-delay-3' },
};

const testimonialDecor: Record<string, string> = {
  'pm-collab': 'example-anim-float-y example-delay-1',
  'pm-delivery': 'example-anim-float-y example-delay-3',
};

type ExamplesLibraryPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const localizeNavItems = (locale: Locale, navItems: readonly NavItem[]): NavItem[] =>
  navItems.map((item) => {
    const { href } = item;
    const isHashLink = typeof href === 'string' && href.startsWith('#');
    const localizedHref = isHashLink ? `/${locale}${href}` : href;
    const children = item.children ? localizeNavItems(locale, item.children) : undefined;

    return {
      label: item.label,
      ...(localizedHref ? { href: localizedHref } : {}),
      ...(children ? { children } : {}),
    };
  });

export default async function ExamplesLibraryPage({ params }: ExamplesLibraryPageProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const dictionary = getDictionary(locale);
  const navItems = localizeNavItems(locale, dictionary.navigation.items);
  const hero = dictionary.examplesPage.hero;
  const brands = dictionary.examplesPage.brands;
  const categories = dictionary.examplesPage.categories;
  const testimonials = dictionary.examplesPage.testimonials;

  const heroCtaHref = hero.ctaHref.startsWith('#') ? `/${locale}${hero.ctaHref}` : hero.ctaHref;
  const duplicatedCategories = [...categories.items, ...categories.items];

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navigation
        brand={dictionary.navigation.brand}
        items={navItems}
        localeOptions={localeOptions}
        currentLocale={locale}
        localeButtonAria={dictionary.navigation.localeButtonAria}
        menuLabels={dictionary.navigation.menu}
      />
      <section className="border-b border-slate-900 bg-slate-950/80">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-16 text-center md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">{hero.eyebrow}</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{hero.title}</h1>
          <p className="text-base text-slate-300 sm:text-lg">{hero.description}</p>
          <div className="mt-4 flex justify-center">
            <Link
              href={heroCtaHref}
              className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
            >
              {hero.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
      <section className="border-b border-slate-900 bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{brands.heading}</h2>
            <p className="mt-4 text-base text-slate-300 sm:text-lg">{brands.description}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {brands.items.map((brand) => {
              const decor = brandCardDecor[brand.id] ?? { icon: <BrandIcon />, animationClass: 'example-anim-flip' };

              return (
                <article
                  key={brand.id}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-6 backdrop-blur transition hover:border-sky-400/60 hover:shadow-[0_25px_90px_-60px_rgba(56,189,248,0.65)]"
                >
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        {brand.sector}
                      </span>
                      <h3 className="mt-3 text-2xl font-semibold text-slate-100">{brand.name}</h3>
                      <p className="mt-2 text-sm font-medium text-sky-300">{brand.headline}</p>
                    </div>
                    <div className="col-span-1 flex items-start justify-end">
                      <span
                        className={`example-icon ${decor.animationClass} inline-flex h-24 w-24 rounded-2xl border border-slate-700 p-4 text-sky-300 sm:h-28 sm:w-28`}
                      >
                        {decor.icon}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 sm:text-base">{brand.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="border-b border-slate-900 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{categories.heading}</h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">{categories.label}</p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 py-6">
            <div className="examples-marquee-track flex items-center gap-8 text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
              {duplicatedCategories.map((item, index) => (
                <span key={`${item}-${index}`} className="whitespace-nowrap">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-slate-900 bg-slate-950/80">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{testimonials.heading}</h2>
            <p className="mt-3 text-base text-slate-300 sm:text-lg">{testimonials.description}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.items.map((testimonial) => (
              <blockquote
                key={testimonial.id}
                className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-slate-800 bg-slate-950/70 p-6"
              >
                <div className="grid grid-cols-3 gap-4">
                  <p className="col-span-2 text-base italic text-slate-200 sm:text-lg">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="col-span-1 flex items-start justify-end">
                    <span
                      className={`example-icon ${testimonialDecor[testimonial.id] ?? 'example-anim-float-y'} inline-flex h-20 w-20 rounded-2xl border border-slate-700 p-4 text-sky-300 sm:h-24 sm:w-24`}
                    >
                      <QuoteIcon />
                    </span>
                  </div>
                </div>
                <footer className="text-sm text-slate-400">
                  <div className="font-semibold text-slate-100">{testimonial.author}</div>
                  <div>
                    {testimonial.role}, {testimonial.company}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter copy={dictionary.footer.copy} items={navItems} />
    </main>
  );
}
