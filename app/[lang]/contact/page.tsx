import { notFound } from 'next/navigation';

import { ContactSection } from '../../components/ContactSection';
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

type ContactPageProps = {
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

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale: Locale = lang;
  const dictionary = getDictionary(locale);
  const navItems = localizeNavItems(locale, dictionary.navigation.items);
  const contact = dictionary.contact;

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
      <ContactSection
        badge={contact.badge}
        heading={contact.heading}
        description={contact.description}
        primaryCta={contact.primaryCta}
        contacts={contact.contacts}
      />
      <SiteFooter copy={dictionary.footer.copy} items={navItems} />
    </main>
  );
}
