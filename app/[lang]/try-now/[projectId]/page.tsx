import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Navigation } from '../../../components/Navigation';
import { SiteFooter } from '../../../components/SiteFooter';
import { MarketCartDemo } from '../../../components/MarketCartDemo';
import { ChatSimulator } from '../../../components/ChatSimulator';
import { IntroShowcase } from '../../../components/IntroShowcase';
import { ModularShowcase } from '../../../components/ModularShowcase';
import {
  getDictionary,
  isLocale,
  localeOptions,
  locales,
  type Locale,
  type NavItem,
} from '../../../../lib/homeContent';

const detailCopy: Record<
  Locale,
  {
    backLabel: string;
    highlightsHeading: string;
    exploreExamples: string;
    exploreButton: string;
    contactCta: string;
  }
> = {
  en: {
    backLabel: 'Back to examples',
    highlightsHeading: 'What to look for',
    exploreExamples: 'Discover other try-now prototypes',
    exploreButton: 'Return to examples',
    contactCta: 'Start a project conversation',
  },
  zh: {
    backLabel: '\u8fd4\u56de\u6848\u4f8b\u7e3d\u89bd',
    highlightsHeading: '\u53ef\u89c0\u5bdf\u91cd\u9ede',
    exploreExamples: '\u63a2\u7d22\u66f4\u591a\u9ad4\u9a57\u65b9\u6848',
    exploreButton: '\u56de\u5230\u6848\u4f8b\u7e3d\u89bd',
    contactCta: '\u958b\u59cb\u5408\u4f5c\u6d3d\u8a62',
  },
};

type TryNowPageProps = {
  params: Promise<{
    lang: string;
    projectId: string;
  }>;
};

export function generateStaticParams() {
  return locales.flatMap((lang) => {
    const dictionary = getDictionary(lang);

    return dictionary.examples.projects.map((project) => ({
      lang,
      projectId: project.id,
    }));
  });
}

export default async function TryNowProjectPage({ params }: TryNowPageProps) {
  const { lang, projectId } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const dictionary = getDictionary(locale);
  const project = dictionary.examples.projects.find((item) => item.id === projectId);

  if (!project) {
    notFound();
  }

  const localizeNavItems = (navItems: readonly NavItem[]): NavItem[] =>
    navItems.map((item) => {
      const href = item.href;
      const isHashLink = typeof href === 'string' && href.startsWith('#');
      const localizedHref = isHashLink ? `/${locale}${href}` : href;
      const children = item.children ? localizeNavItems(item.children) : undefined;

      return {
        label: item.label,
        ...(localizedHref ? { href: localizedHref } : {}),
        ...(children ? { children } : {}),
      };
    });

  const navItems = localizeNavItems(dictionary.navigation.items);

  const copy = detailCopy[locale];
  const exampleHref = `/${locale}#example`;
  const contactHref = `/${locale}/contact`;
  const otherProjects = dictionary.examples.projects.filter((item) => item.id !== project.id);

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
        <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-16 md:px-8">
          <Link
            href={exampleHref}
            className="w-fit rounded-full border border-slate-800 bg-slate-950/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300 transition hover:border-sky-400/60 hover:text-sky-300"
          >
            {copy.backLabel}
          </Link>
          <div className="space-y-6">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
              {project.id}
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="text-base text-slate-300 sm:text-lg">
              {project.description}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-100 sm:text-xl">
              {copy.highlightsHeading}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300 sm:text-base">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-400" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          {project.id === 'market' ? <MarketCartDemo locale={locale} /> : null}
          {project.id === 'intro' ? <IntroShowcase locale={locale} /> : null}
          {project.id === 'modular' ? <ModularShowcase locale={locale} /> : null}
          {project.id === 'app' ? <ChatSimulator locale={locale} /> : null}
          {otherProjects.length > 0 ? (
            <div className="rounded-3xl border border-slate-800/60 bg-slate-950/40 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                {copy.exploreExamples}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {otherProjects.map((item) => (
                  <Link
                    key={item.id}
                    href={`/${locale}/try-now/${item.id}`}
                    className="rounded-full border border-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-400/60 hover:text-sky-300"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
            >
              {copy.contactCta}
            </Link>
            <Link
              href={exampleHref}
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              {copy.exploreButton}
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter copy={dictionary.footer.copy} items={navItems} />
    </main>
  );
}
