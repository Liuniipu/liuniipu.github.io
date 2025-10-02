import Link from 'next/link';

import type { ContactDetail } from '../../lib/homeContent';

type ContactSectionProps = {
  badge: string;
  heading: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  contacts: readonly ContactDetail[];
};

export function ContactSection({
  badge,
  heading,
  description,
  primaryCta,
  secondaryCta,
  contacts,
}: ContactSectionProps) {
  return (
    <section id="contact" className="bg-slate-950/95">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8">
        <div className="grid gap-10 rounded-3xl border border-slate-800 bg-slate-950/70 p-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              {badge}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
            <p className="text-base text-slate-300 sm:text-lg">{description}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="mailto:liuniipu@gmail.com?subject=Project%20Collaboration"
                className="rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
              >
                {primaryCta}
              </Link>
              <Link
                href="https://cal.com/"
                className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                {secondaryCta}
              </Link>
            </div>
          </div>
          <div className="space-y-6 rounded-3xl border border-slate-800/70 bg-slate-950/60 p-8">
            {contacts.map((item) => (
              <div key={item.id} className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                  {item.label}
                </p>
                <Link
                  href={item.href}
                  className="text-lg font-semibold text-slate-100 transition hover:text-sky-300"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {item.value}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
