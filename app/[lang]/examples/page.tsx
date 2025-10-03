import Link from 'next/link';
import { notFound } from 'next/navigation';

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
            {brands.items.map((brand) => (
              <article
                key={brand.id}
                className="flex h-full flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-6 backdrop-blur transition hover:border-sky-400/60 hover:shadow-[0_25px_90px_-60px_rgba(56,189,248,0.65)]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {brand.sector}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-100">{brand.name}</h3>
                  <p className="mt-2 text-sm font-medium text-sky-300">{brand.headline}</p>
                </div>
                <p className="text-sm text-slate-300 sm:text-base">{brand.description}</p>
              </article>
            ))}
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
                <p className="text-base italic text-slate-200 sm:text-lg">&ldquo;{testimonial.quote}&rdquo;</p>
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
