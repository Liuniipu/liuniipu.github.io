import { notFound } from 'next/navigation';

import { ContactSection } from '../components/ContactSection';
import { ExamplesSection } from '../components/ExamplesSection';
import { HeroSection } from '../components/HeroSection';
import { LanguageSection } from '../components/LanguageSection';
import { Navigation } from '../components/Navigation';
import { SiteFooter } from '../components/SiteFooter';
import {
  getDictionary,
  isLocale,
  localeOptions,
  locales,
  type Locale,
} from '../../lib/homeContent';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type LocalePageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function LocalePage({ params }: LocalePageProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const dictionary = getDictionary(locale);

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navigation
        brand={dictionary.navigation.brand}
        items={dictionary.navigation.items}
        localeOptions={localeOptions}
        currentLocale={locale}
        localeButtonAria={dictionary.navigation.localeButtonAria}
        menuLabels={dictionary.navigation.menu}
      />
      <HeroSection
        slides={dictionary.hero.slides}
        ctas={dictionary.hero.ctas}
        card={dictionary.hero.card}
        navigationLabels={dictionary.hero.navigationLabels}
        stats={dictionary.hero.stats}
        startHref={`/${locale}/contact`}
      />
      <ExamplesSection
        heading={dictionary.examples.heading}
        description={dictionary.examples.description}
        tryNowLabel={dictionary.examples.tryNowCta}
        exploreMoreLabel={dictionary.examples.exploreMoreCta}
        projects={dictionary.examples.projects}
        locale={locale}
      />
      <LanguageSection
        heading={dictionary.language.heading}
        description={dictionary.language.description}
        stacks={dictionary.language.stacks}
      />
      <ContactSection
        badge={dictionary.contact.badge}
        heading={dictionary.contact.heading}
        description={dictionary.contact.description}
        primaryCta={dictionary.contact.primaryCta}
        secondaryCta={dictionary.contact.secondaryCta}
        contacts={dictionary.contact.contacts}
      />
      <SiteFooter copy={dictionary.footer.copy} items={dictionary.navigation.items} />
    </main>
  );
}
