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

type TryNowIndexPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

type TryNowIndexCopy = {
  eyebrow: string;
  title: string;
  description: string;
  examplesButton: string;
  cardEyebrow: string;
  openDemo: string;
  highlightsHeading: string;
};

const pageCopy: Record<Locale, TryNowIndexCopy> = {
  en: {
    eyebrow: 'Try Now',
    title: 'Interactive prototype playground',
    description:
      'Browse four live demos to preview different interaction patterns, content structures, and UI directions before implementation.',
    examplesButton: 'Back to examples',
    cardEyebrow: 'Live demo',
    openDemo: 'Open demo',
    highlightsHeading: 'What to look for',
  },
  zh: {
    eyebrow: '\u7acb\u5373\u8a66\u7528',
    title: '\u4e92\u52d5\u539f\u578b\u8a66\u7528\u7e3d\u89bd',
    description:
      '\u9019\u88e1\u6574\u7406\u56db\u500b\u53ef\u76f4\u63a5\u64cd\u4f5c\u7684\u8a66\u7528\u9801\uff0c\u65b9\u4fbf\u5feb\u901f\u6aa2\u8996\u4e0d\u540c\u4e92\u52d5\u6d41\u7a0b\u3001\u5167\u5bb9\u5448\u73fe\u65b9\u5f0f\u8207\u7248\u9762\u65b9\u5411\u3002',
    examplesButton: '\u8fd4\u56de\u6848\u4f8b\u7e3d\u89bd',
    cardEyebrow: '\u8a66\u7528\u5340\u584a',
    openDemo: '\u9032\u5165\u8a66\u7528',
    highlightsHeading: '\u53ef\u89c0\u5bdf\u91cd\u9ede',
  },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const localizeNavItems = (locale: Locale, navItems: readonly NavItem[]): NavItem[] =>
  navItems.map((item) => {
    const href = item.href;
    const isHashLink = typeof href === 'string' && href.startsWith('#');
    const localizedHref = isHashLink ? `/${locale}${href}` : href;
    const children = item.children ? localizeNavItems(locale, item.children) : undefined;

    return {
      label: item.label,
      ...(localizedHref ? { href: localizedHref } : {}),
      ...(children ? { children } : {}),
    };
  });

export default async function TryNowIndexPage({ params }: TryNowIndexPageProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const dictionary = getDictionary(locale);
  const navItems = localizeNavItems(locale, dictionary.navigation.items);
  const copy = pageCopy[locale];

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
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">{copy.eyebrow}</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{copy.title}</h1>
          <p className="max-w-3xl text-base text-slate-300 sm:text-lg">{copy.description}</p>
          <div>
            <Link
              href={`/${locale}/examples`}
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-sky-400/60 hover:text-sky-300"
            >
              {copy.examplesButton}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-900 bg-slate-950/60">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:px-8 lg:grid-cols-2">
          {dictionary.examples.projects.map((project) => (
            <article
              key={project.id}
              className="flex h-full flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-950/70 p-6 transition hover:border-sky-400/60 hover:shadow-[0_24px_90px_-60px_rgba(56,189,248,0.55)]"
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{copy.cardEyebrow}</p>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-semibold text-slate-100">{project.title}</h2>
                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
                    {project.id}
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-300 sm:text-base">{project.description}</p>
              </div>

              <div className="rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">{copy.highlightsHeading}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {project.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Link
                  href={`/${locale}/try-now/${project.id}`}
                  className="inline-flex items-center justify-center rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
                >
                  {copy.openDemo}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter copy={dictionary.footer.copy} items={navItems} />
    </main>
  );
}
