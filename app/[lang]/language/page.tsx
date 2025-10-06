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

type LanguageRoutePageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const localizeNavItems = (locale: Locale, items: readonly NavItem[]): NavItem[] =>
  items.map((item) => {
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

export default async function LanguageRoutePage({ params }: LanguageRoutePageProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const dictionary = getDictionary(locale);
  const navItems = localizeNavItems(locale, dictionary.navigation.items);
  const hero = dictionary.languagePage.hero;
  const sections = dictionary.languagePage.sections;

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
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-16 md:px-8">
          <Link
            href={hero.backHref}
            className="w-fit rounded-full border border-slate-800 bg-slate-950/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300 transition hover:border-sky-400/60 hover:text-sky-300"
          >
            {hero.backLabel}
          </Link>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">{hero.eyebrow}</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{hero.title}</h1>
            <p className="text-base text-slate-300 sm:text-lg">{hero.description}</p>
          </div>
        </div>
      </section>
      <section className="border-b border-slate-900 bg-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-8">
          <div className="grid gap-10">
            {sections.map((section) => (
              <article
                key={section.id}
                className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 sm:p-8"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {section.focus}
                </span>
                <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <h2 className="text-3xl font-semibold text-slate-100 sm:w-1/2">{section.name}</h2>
                  <p className="text-sm text-slate-300 sm:w-1/2 sm:text-base">{section.description}</p>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-slate-300 sm:text-base">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter copy={dictionary.footer.copy} items={navItems} />
    </main>
  );
}
