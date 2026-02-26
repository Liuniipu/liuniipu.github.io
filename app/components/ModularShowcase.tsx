'use client';

import { useMemo, useState } from 'react';

import type { Locale } from '../../lib/homeContent';

type ModuleId = 'warehouse' | 'cost' | 'hr';
type ChartType = 'bar' | 'line';

type LocalizedText = Record<Locale, string>;

type ModuleTemplate = {
  id: ModuleId;
  icon: string;
  title: LocalizedText;
  summary: LocalizedText;
  effectLabel: LocalizedText;
  effectValue: LocalizedText;
  chartType: ChartType;
  chartLabels: readonly string[];
  chartValues: readonly number[];
  chartColor: string;
  tags: readonly string[];
};

type Copy = {
  heading: string;
  description: string;
  libraryTitle: string;
  libraryDescription: string;
  usageTitle: string;
  usageDescription: string;
  slotLabel: string;
  slotEmpty: string;
  dropHint: string;
  removeLabel: string;
  displayTitle: string;
  displayDescription: string;
  noSelection: string;
  chartTitle: string;
  selectedCount: string;
};

const MODULE_TEMPLATES: readonly ModuleTemplate[] = [
  {
    id: 'warehouse',
    icon: '\ud83c\udfed',
    title: { en: 'Warehouse Management', zh: '\u5009\u5eab\u7ba1\u7406' },
    summary: {
      en: 'Track inbound/outbound inventory, stock level alerts, and picking flow status.',
      zh: '\u8ffd\u8e64\u9032\u51fa\u8ca8\u5eab\u5b58\u3001\u5eab\u5b58\u9810\u8b66\u8207\u63c0\u8ca8\u6d41\u7a0b\u72c0\u614b\u3002',
    },
    effectLabel: { en: 'Picking efficiency', zh: '\u63c0\u8ca8\u6548\u7387' },
    effectValue: { en: '+18%', zh: '+18%' },
    chartType: 'bar',
    chartLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    chartValues: [52, 66, 61, 78, 84],
    chartColor: '#38bdf8',
    tags: ['Inventory', 'WMS', 'Alerts'],
  },
  {
    id: 'cost',
    icon: '\ud83d\udcb0',
    title: { en: 'Cost Management', zh: '\u6210\u672c\u7ba1\u7406' },
    summary: {
      en: 'Monitor operating cost trends, budget variance, and category-level spending.',
      zh: '\u76e3\u63a7\u71df\u904b\u6210\u672c\u8d70\u52e2\u3001\u9810\u7b97\u5dee\u7570\u8207\u5206\u985e\u652f\u51fa\u3002',
    },
    effectLabel: { en: 'Monthly variance', zh: '\u6708\u5ea6\u5dee\u7570' },
    effectValue: { en: '-12%', zh: '-12%' },
    chartType: 'line',
    chartLabels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
    chartValues: [82, 78, 76, 73, 75, 70],
    chartColor: '#22c55e',
    tags: ['Budget', 'Variance', 'Finance'],
  },
  {
    id: 'hr',
    icon: '\ud83d\udc65',
    title: { en: 'HR Management', zh: '\u4eba\u4e8b\u7ba1\u7406' },
    summary: {
      en: 'Manage staffing status, onboarding progress, and team capacity distribution.',
      zh: '\u7ba1\u7406\u4eba\u529b\u72c0\u614b\u3001\u5230\u8077\u9032\u5ea6\u8207\u5718\u968a\u5bb9\u91cf\u5206\u914d\u3002',
    },
    effectLabel: { en: 'Onboarding completion', zh: '\u5831\u5230\u5b8c\u6210\u7387' },
    effectValue: { en: '+24%', zh: '+24%' },
    chartType: 'bar',
    chartLabels: ['Ops', 'Sales', 'Support', 'R&D'],
    chartValues: [72, 58, 67, 81],
    chartColor: '#a78bfa',
    tags: ['People', 'Onboarding', 'Capacity'],
  },
];

const copy: Record<Locale, Copy> = {
  en: {
    heading: 'Modular workflow builder',
    description:
      'Drag functional blocks into usage slots to simulate a modular back-office dashboard. The preview area shows a chart and impact summary for each selected module.',
    libraryTitle: 'Function blocks',
    libraryDescription: 'Drag a block into any usage slot below.',
    usageTitle: 'Usage area',
    usageDescription: 'Arrange modules for the operational dashboard scenario you want to demo.',
    slotLabel: 'Slot',
    slotEmpty: 'Drop module here',
    dropHint: 'You can replace an existing module by dropping another block on the same slot.',
    removeLabel: 'Remove',
    displayTitle: 'Preview dashboard',
    displayDescription: 'Simulated results update as modules are assigned.',
    noSelection: 'No modules added yet. Drag warehouse, cost, or HR management into the usage area.',
    chartTitle: 'Simulated performance',
    selectedCount: 'Selected modules',
  },
  zh: {
    heading: '\u6a21\u7d44\u5316\u6d41\u7a0b\u914d\u7f6e\u5c55\u793a',
    description:
      '\u5c07\u529f\u80fd\u5340\u584a\u62d6\u66f3\u5230\u4f7f\u7528\u5340\u584a\uff0c\u6a21\u64ec\u6a21\u7d44\u5316\u5f8c\u53f0\u4ecb\u9762\u7684\u7d44\u5408\u65b9\u5f0f\u3002\u53f3\u5074\u5c55\u793a\u5340\u6703\u986f\u793a\u5c0d\u61c9\u7684\u6210\u6548\u6307\u6a19\u8207\u9577\u689d\u5716 / \u6298\u7dda\u5716\u3002',
    libraryTitle: '\u529f\u80fd\u5340\u584a',
    libraryDescription: '\u5c07\u5340\u584a\u62d6\u66f3\u81f3\u4e0b\u65b9\u4efb\u4e00\u4f7f\u7528\u69fd\u4f4d\u3002',
    usageTitle: '\u4f7f\u7528\u5340\u584a',
    usageDescription: '\u4f9d\u7167\u60f3\u6f14\u793a\u7684\u71df\u904b\u60c5\u5883\u6392\u5217\u6a21\u7d44\u3002',
    slotLabel: '\u69fd\u4f4d',
    slotEmpty: '\u62d6\u66f3\u6a21\u7d44\u5230\u9019\u88e1',
    dropHint: '\u53ef\u4ee5\u76f4\u63a5\u5c07\u5176\u4ed6\u5340\u584a\u62d6\u5230\u540c\u4e00\u69fd\u4f4d\u4ee5\u53d6\u4ee3\u65e2\u6709\u6a21\u7d44\u3002',
    removeLabel: '\u79fb\u9664',
    displayTitle: '\u6210\u6548\u5c55\u793a\u5340',
    displayDescription: '\u65b0\u589e\u6216\u66ff\u63db\u6a21\u7d44\u5f8c\uff0c\u6703\u540c\u6b65\u66f4\u65b0\u6a21\u64ec\u7d50\u679c\u3002',
    noSelection: '\u5c1a\u672a\u65b0\u589e\u4efb\u4f55\u6a21\u7d44\u3002\u8acb\u5c07\u5009\u5eab\u7ba1\u7406\u3001\u6210\u672c\u7ba1\u7406\u6216\u4eba\u4e8b\u7ba1\u7406\u62d6\u66f3\u5230\u4f7f\u7528\u5340\u584a\u3002',
    chartTitle: '\u6a21\u64ec\u6210\u6548\u8da8\u52e2',
    selectedCount: '\u5df2\u9078\u6a21\u7d44',
  },
};

function getText(locale: Locale, value: LocalizedText) {
  return value[locale] ?? value.en;
}

function BarChart({ labels, values, color }: { labels: readonly string[]; values: readonly number[]; color: string }) {
  const max = Math.max(...values, 1);

  return (
    <div className="space-y-3">
      <div className="flex h-36 items-end gap-2 rounded-xl border border-slate-800/70 bg-slate-950/40 p-3">
        {values.map((value, index) => {
          const height = Math.max(12, Math.round((value / max) * 100));
          return (
            <div key={`${labels[index]}-${value}`} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
              <span className="text-[10px] font-semibold text-slate-400">{value}</span>
              <div className="w-full rounded-md" style={{ height: `${height}%`, backgroundColor: color }} />
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-2 text-[11px] text-slate-400 sm:grid-cols-6">
        {labels.map((label) => (
          <span key={label} className="truncate">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function LineChart({ labels, values, color }: { labels: readonly string[]; values: readonly number[]; color: string }) {
  const width = 320;
  const height = 150;
  const padding = 14;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = Math.max(max - min, 1);

  const points = values
    .map((value, index) => {
      const x = padding + (index * (width - padding * 2)) / Math.max(values.length - 1, 1);
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-800/70 bg-slate-950/40 p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-36 w-full" aria-hidden="true">
          {[0.25, 0.5, 0.75].map((step) => (
            <line
              key={step}
              x1={padding}
              x2={width - padding}
              y1={padding + (height - padding * 2) * step}
              y2={padding + (height - padding * 2) * step}
              stroke="rgba(148,163,184,0.18)"
              strokeWidth="1"
            />
          ))}
          <polyline fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />
          {values.map((value, index) => {
            const x = padding + (index * (width - padding * 2)) / Math.max(values.length - 1, 1);
            const y = height - padding - ((value - min) / range) * (height - padding * 2);
            return (
              <g key={`${labels[index]}-${value}`}>
                <circle cx={x} cy={y} r="3.5" fill={color} />
                <text x={x} y={y - 8} fill="rgba(226,232,240,0.85)" fontSize="10" textAnchor="middle">
                  {value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="grid grid-cols-4 gap-2 text-[11px] text-slate-400 sm:grid-cols-6">
        {labels.map((label) => (
          <span key={label} className="truncate">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ChartPreview({ module }: { module: ModuleTemplate }) {
  if (module.chartType === 'bar') {
    return <BarChart labels={module.chartLabels} values={module.chartValues} color={module.chartColor} />;
  }

  return <LineChart labels={module.chartLabels} values={module.chartValues} color={module.chartColor} />;
}

export function ModularShowcase({ locale }: { locale: Locale }) {
  const [slots, setSlots] = useState<Array<ModuleId | null>>([null, null, null]);
  const [draggingId, setDraggingId] = useState<ModuleId | null>(null);
  const text = copy[locale] ?? copy.en;

  const moduleMap = useMemo(
    () => Object.fromEntries(MODULE_TEMPLATES.map((module) => [module.id, module])) as Record<ModuleId, ModuleTemplate>,
    [],
  );

  const selectedModules = slots
    .map((id, index) => (id ? { slotIndex: index, module: moduleMap[id] } : null))
    .filter((item): item is { slotIndex: number; module: ModuleTemplate } => item !== null);

  const handleDropToSlot = (slotIndex: number, moduleId: ModuleId) => {
    setSlots((previous) => {
      const next = [...previous];
      const existingIndex = previous.findIndex((id) => id === moduleId);

      if (existingIndex >= 0) {
        next[existingIndex] = null;
      }

      next[slotIndex] = moduleId;
      return next;
    });
  };

  const handleRemoveSlot = (slotIndex: number) => {
    setSlots((previous) => previous.map((id, index) => (index === slotIndex ? null : id)));
  };

  return (
    <section className="rounded-3xl border border-slate-800/60 bg-slate-950/50 p-6 sm:p-10">
      <div className="space-y-8">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">{text.heading}</p>
          <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">{text.description}</h2>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_1.3fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
              <div className="mb-4 space-y-2">
                <h3 className="text-lg font-semibold text-slate-100">{text.libraryTitle}</h3>
                <p className="text-sm text-slate-400">{text.libraryDescription}</p>
              </div>

              <div className="grid gap-4">
                {MODULE_TEMPLATES.map((module) => {
                  const assignedSlot = slots.findIndex((id) => id === module.id);
                  const isAssigned = assignedSlot >= 0;

                  return (
                    <div
                      key={module.id}
                      draggable
                      onDragStart={(event) => {
                        event.dataTransfer.setData('text/module-id', module.id);
                        event.dataTransfer.effectAllowed = 'move';
                        setDraggingId(module.id);
                      }}
                      onDragEnd={() => setDraggingId(null)}
                      className={`cursor-grab rounded-2xl border p-4 transition active:cursor-grabbing ${
                        draggingId === module.id
                          ? 'border-sky-400/70 bg-sky-500/10'
                          : isAssigned
                            ? 'border-emerald-500/30 bg-emerald-500/5'
                            : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-xl">
                          <span aria-hidden="true">{module.icon}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-semibold text-slate-100">{getText(locale, module.title)}</h4>
                            {isAssigned ? (
                              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200">
                                {text.slotLabel} {assignedSlot + 1}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm text-slate-400">{getText(locale, module.summary)}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {module.tags.map((tag) => (
                              <span key={`${module.id}-${tag}`} className="rounded-full border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-xs text-slate-400">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
              <div className="mb-4 space-y-2">
                <h3 className="text-lg font-semibold text-slate-100">{text.usageTitle}</h3>
                <p className="text-sm text-slate-400">{text.usageDescription}</p>
              </div>

              <div className="grid gap-4">
                {slots.map((moduleId, slotIndex) => {
                  const module = moduleId ? moduleMap[moduleId] : null;

                  return (
                    <div
                      key={`slot-${slotIndex}`}
                      onDragOver={(event) => {
                        event.preventDefault();
                        event.dataTransfer.dropEffect = 'move';
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        const droppedId = event.dataTransfer.getData('text/module-id') as ModuleId;
                        if (!droppedId || !(droppedId in moduleMap)) return;
                        handleDropToSlot(slotIndex, droppedId);
                        setDraggingId(null);
                      }}
                      className={`rounded-2xl border p-4 transition ${
                        module
                          ? 'border-sky-400/30 bg-slate-900/40'
                          : 'border-dashed border-slate-700 bg-slate-950/40'
                      }`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-300">
                            {slotIndex + 1}
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                              {text.slotLabel} {slotIndex + 1}
                            </p>
                            {module ? (
                              <>
                                <p className="mt-1 text-sm font-semibold text-slate-100">{getText(locale, module.title)}</p>
                                <p className="mt-1 text-sm text-slate-400">{getText(locale, module.summary)}</p>
                              </>
                            ) : (
                              <p className="mt-1 text-sm text-slate-500">{text.slotEmpty}</p>
                            )}
                          </div>
                        </div>
                        {module ? (
                          <button
                            type="button"
                            onClick={() => handleRemoveSlot(slotIndex)}
                            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-rose-500/60 hover:text-rose-200"
                          >
                            {text.removeLabel}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 text-xs text-slate-500">{text.dropHint}</p>
            </section>
          </div>

          <aside className="rounded-3xl border border-slate-800 bg-slate-950/40 p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-100">{text.displayTitle}</h3>
                <p className="text-sm text-slate-400">{text.displayDescription}</p>
              </div>
              <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
                {text.selectedCount}: {selectedModules.length}
              </span>
            </div>

            {selectedModules.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-6 text-sm text-slate-400">
                {text.noSelection}
              </div>
            ) : (
              <div className="space-y-5">
                {selectedModules.map(({ slotIndex, module }) => (
                  <section key={`preview-${slotIndex}-${module.id}`} className="rounded-2xl border border-slate-800 bg-slate-950/65 p-5">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                          {text.slotLabel} {slotIndex + 1}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-lg" aria-hidden="true">{module.icon}</span>
                          <h4 className="text-base font-semibold text-slate-100">{getText(locale, module.title)}</h4>
                        </div>
                      </div>
                      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-right">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{getText(locale, module.effectLabel)}</p>
                        <p className="text-sm font-semibold" style={{ color: module.chartColor }}>
                          {getText(locale, module.effectValue)}
                        </p>
                      </div>
                    </div>

                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-200">{text.chartTitle}</p>
                      <span className="text-xs text-slate-500">{module.chartType === 'bar' ? 'Bar' : 'Line'}</span>
                    </div>

                    <ChartPreview module={module} />
                  </section>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
