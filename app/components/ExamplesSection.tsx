import type { ExampleProject } from '../../lib/homeContent';

type ExamplesSectionProps = {
  heading: string;
  description: string;
  projects: readonly ExampleProject[];
};

export function ExamplesSection({ heading, description, projects }: ExamplesSectionProps) {
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
              className="flex flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-950/60 p-8 transition hover:border-sky-400/60 hover:shadow-[0_20px_80px_-50px_rgba(14,165,233,0.55)]"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                  {project.id}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-100">{project.title}</h3>
              </div>
              <p className="text-sm text-slate-300 sm:text-base">{project.description}</p>
              <ul className="mt-auto space-y-2 text-xs text-slate-400 sm:text-sm">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
