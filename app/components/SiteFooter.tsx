import Link from 'next/link';

import type { NavItem } from '../../lib/homeContent';

type SiteFooterProps = {
  copy: string;
  items: readonly NavItem[];
};

const collectLinks = (items: readonly NavItem[]): Array<{ label: string; href: string }> => {
  const links: Array<{ label: string; href: string }> = [];

  items.forEach((item) => {
    if (item.href) {
      links.push({ label: item.label, href: item.href });
    }

    if (item.children && item.children.length > 0) {
      links.push(...collectLinks(item.children));
    }
  });

  return links;
};

export function SiteFooter({ copy, items }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();
  const footerLinks = collectLinks(items);

  return (
    <footer className="border-t border-slate-900 bg-slate-950/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
        <p>&copy; {currentYear} {copy}</p>
        <div className="flex gap-6">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-sky-300">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
