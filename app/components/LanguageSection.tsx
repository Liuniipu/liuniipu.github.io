import type { LanguageStack } from '../../lib/homeContent';

type LanguageSectionProps = {
  heading: string;
  description: string;
  stacks: readonly LanguageStack[];
};

export function LanguageSection({ heading, description, stacks }: LanguageSectionProps) {
  return (
    <section
      id="language"
      className="border-b border-slate-900 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
          <p className="mt-4 text-base text-slate-300 sm:text-lg">{description}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {stacks.map((stack) => (
            <div
              key={stack.id}
              className="flex flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-950/60 p-8"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {stack.focus}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-100">{stack.name}</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                {stack.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
