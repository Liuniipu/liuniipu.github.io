import Link from 'next/link';

import type { ExampleProject, Locale } from '../../lib/homeContent';

type ExamplesSectionProps = {
  heading: string;
  description: string;
  tryNowLabel: string;
  exploreMoreLabel: string;
  projects: readonly ExampleProject[];
  locale: Locale;
};

export function ExamplesSection({
  heading,
  description,
  tryNowLabel,
  exploreMoreLabel,
  projects,
  locale,
}: ExamplesSectionProps) {
  return (
    <section id="example" className="border-b border-slate-900 bg-slate-950/80">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
          <p className="mt-4 text-base text-slate-300 sm:text-lg">{description}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              id={project.id}
              className="flex flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-950/60 p-8 transition hover:border-sky-400/60 hover:shadow-[0_20px_80px_-50px_rgba(14,165,233,0.55)]"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                  {project.id}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-100">{project.title}</h3>
              </div>
              <p className="text-sm text-slate-300 sm:text-base">{project.description}</p>
              <div className="mt-auto space-y-4">
                <ul className="space-y-2 text-xs text-slate-400 sm:text-sm">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-400" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/try-now/${project.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
                >
                  {tryNowLabel}
                  <span aria-hidden="true">&gt;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12">
          <Link
            href={`/${locale}/examples`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-sky-400/60 hover:text-sky-200"
          >
            {exploreMoreLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

