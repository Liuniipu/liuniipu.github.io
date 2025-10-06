'use client';

import { useMemo, useState } from 'react';

import type { Locale } from '../../lib/homeContent';

type MarketItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  change: number;
  status: 'rising' | 'steady' | 'falling';
};

type CartEntry = {
  item: MarketItem;
  quantity: number;
};

type Copy = {
  heading: string;
  subheading: string;
  cartLabel: string;
  emptyCart: string;
  removeLabel: string;
};

type MarketCartDemoProps = {
  locale: Locale;
};

const rawItems: readonly MarketItem[] = [
  {
    id: 'aurora-staples',
    name: 'Aurora Staples',
    category: 'Grocery essentials',
    price: 124.5,
    change: 2.4,
    status: 'rising',
  },
  {
    id: 'coastal-bakery',
    name: 'Coastal Bakery',
    category: 'Beverages & snacks',
    price: 86.9,
    change: -1.1,
    status: 'falling',
  },
  {
    id: 'plaza-home',
    name: 'Plaza Home',
    category: 'Home & lifestyle',
    price: 209.25,
    change: 0.2,
    status: 'steady',
  },
  {
    id: 'kindred-market',
    name: 'Kindred Market',
    category: 'Regional flagship',
    price: 342.4,
    change: 3.1,
    status: 'rising',
  },
];

const marketCopy: Record<Locale, Copy> = {
  en: {
    heading: 'Market basket builder',
    subheading: 'Experiment with real-time cards to simulate a buyer workflow.',
    cartLabel: 'Cart overview',
    emptyCart: 'Your cart is empty. Add an item to see projected totals.',
    removeLabel: 'Remove',
  },
  zh: {
    heading: '\u5e02\u5834\u8ca8\u7d44\u7de8\u6392',
    subheading: '\u4f7f\u7528\u5373\u6642\u52d5\u614b\u5361\u7247\u6a21\u64ec\u63a1\u8cfc\u5de5\u4f5c\u6d41\u7a0b\u3002',
    cartLabel: '\u8cfc\u7269\u8eca\u6982\u89bd',
    emptyCart: '\u8cfc\u7269\u8eca\u76ee\u524d\u70ba\u7a7a\u3002\u5148\u65b0\u589e\u9805\u76ee\u5373\u53ef\u67e5\u770b\u9810\u6e2c\u7e3d\u984d\u3002',
    removeLabel: '\u79fb\u9664',
  },
};

const statusStyles: Record<MarketItem['status'], string> = {
  rising: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
  steady: 'text-sky-300 bg-sky-500/10 border-sky-500/20',
  falling: 'text-rose-300 bg-rose-500/10 border-rose-500/30',
};

export function MarketCartDemo({ locale }: MarketCartDemoProps) {
  const [cart, setCart] = useState<CartEntry[]>([]);

  const copy = useMemo(() => marketCopy[locale] ?? marketCopy.en, [locale]);

  const formatCurrency = useMemo(() => {
    try {
      const formatter = new Intl.NumberFormat(locale === 'zh' ? 'zh-TW' : 'en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      });

      return (value: number) => formatter.format(value);
    } catch (error) {
      // Fallback for environments missing Intl support. Keeps demo functional.
      return (value: number) => {
        const amount = Math.round(value).toLocaleString(locale === 'zh' ? 'zh-TW' : 'en-US');
        return locale === 'zh' ? `US$${amount}` : `$${amount}`;
      };
    }
  }, [locale]);

  const handleAdd = (item: MarketItem) => {
    setCart((previous) => {
      const existing = previous.find((entry) => entry.item.id === item.id);
      if (existing) {
        return previous.map((entry) =>
          entry.item.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry,
        );
      }
      return [...previous, { item, quantity: 1 }];
    });
  };

  const handleRemove = (id: string) => {
    setCart((previous) => previous.filter((entry) => entry.item.id !== id));
  };

  const total = cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-[0_20px_80px_-40px_rgba(14,116,144,0.65)] sm:p-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">{copy.heading}</h2>
        <p className="text-sm text-slate-300 sm:text-base">{copy.subheading}</p>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {rawItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-sky-500/40 hover:bg-slate-900/60"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                    {item.category}
                  </p>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${statusStyles[item.status]}`}
                  >
                    {item.status === 'rising'
                      ? locale === 'zh'
                        ? '\u4e0a\u5347'
                        : 'Rising'
                      : item.status === 'steady'
                        ? locale === 'zh'
                          ? '\u6301\u5e73'
                          : 'Steady'
                        : locale === 'zh'
                          ? '\u4e0b\u8dcc'
                          : 'Falling'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-100">{item.name}</h3>
                <p className="text-sm text-slate-400">{formatCurrency(item.price)}</p>
                <p
                  className={`text-sm font-medium ${
                    item.change > 0
                      ? 'text-emerald-300'
                      : item.change < 0
                        ? 'text-rose-300'
                        : 'text-slate-300'
                  }`}
                >
                  {item.change > 0 ? '+' : ''}
                  {item.change}% {locale === 'zh' ? '\u672c\u65e5\u8b8a\u5316' : 'today'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleAdd(item)}
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                {locale === 'zh' ? '\u52a0\u5165\u8cfc\u7269\u8eca' : 'Add to cart'}
              </button>
            </article>
          ))}
        </div>
        <aside className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-100">{copy.cartLabel}</h3>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
              {cart.reduce((count, entry) => count + entry.quantity, 0)}
            </span>
          </div>
          {cart.length === 0 ? (
            <p className="text-sm text-slate-400">{copy.emptyCart}</p>
          ) : (
            <ul className="space-y-3">
              {cart.map((entry) => (
                <li
                  key={entry.item.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{entry.item.name}</p>
                    <p className="text-xs text-slate-400">
                      {formatCurrency(entry.item.price)} x {entry.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-200">
                      {formatCurrency(entry.item.price * entry.quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemove(entry.item.id)}
                      className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-rose-500/60 hover:text-rose-200"
                    >
                      {copy.removeLabel}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-3 text-sm font-semibold text-slate-200">
            <span>{locale === 'zh' ? '\u9810\u6e2c\u7e3d\u984d' : 'Projected total'}</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
