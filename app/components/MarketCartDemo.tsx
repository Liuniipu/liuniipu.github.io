'use client';

import { useState } from 'react';

import type { Locale } from '../../lib/homeContent';

type MarketItem = {
  id: string;
  icon: string;
  name: Record<Locale, string>;
  category: Record<Locale, string>;
  summary: Record<Locale, string>;
  description: Record<Locale, string>;
  price: number;
};

type CartEntry = {
  item: MarketItem;
  quantity: number;
};

type Copy = {
  heading: string;
  subheading: string;
  cartLabel: string;
  cartButton: string;
  emptyCart: string;
  removeLabel: string;
  closeLabel: string;
  detailsLabel: string;
  addLabel: string;
  quantityLabel: string;
  totalLabel: string;
};

type MarketCartDemoProps = {
  locale: Locale;
};

const rawItems: readonly MarketItem[] = [
  {
    id: 'clothes',
    icon: '👕',
    name: { en: 'Clothes', zh: '\u8863\u670d' },
    category: { en: 'Apparel', zh: '\u670d\u98fe' },
    summary: {
      en: 'Daily wear picks for casual and office use.',
      zh: '\u9069\u5408\u65e5\u5e38\u8207\u4e0a\u73ed\u7a7f\u642d\u7684\u57fa\u790e\u6b3e\u3002',
    },
    description: {
      en: 'Soft, easy-care clothing set focused on comfort, fit, and repeat wear. Ideal for quick styling suggestions in a shopping flow demo.',
      zh: '\u4ee5\u8212\u9069\u3001\u597d\u642d\u914d\u8207\u6613\u65bc\u6e05\u6f54\u70ba\u91cd\u9ede\u7684\u8863\u7269\u7d44\u5408\uff0c\u9069\u5408\u7528\u65bc\u6f14\u793a\u8cfc\u7269\u6d41\u7a0b\u4e2d\u7684\u7a7f\u642d\u63a8\u85a6\u3002',
    },
    price: 42,
  },
  {
    id: 'toys',
    icon: '🧸',
    name: { en: 'Toys', zh: '\u73a9\u5177' },
    category: { en: 'Kids & fun', zh: '\u5152\u7ae5\u8207\u5a1b\u6a02' },
    summary: {
      en: 'Gift-ready toys for playtime and early learning.',
      zh: '\u9069\u5408\u9001\u79ae\u8207\u89aa\u5b50\u4e92\u52d5\u7684\u73a9\u5177\u9078\u54c1\u3002',
    },
    description: {
      en: 'A curated toy category covering plush, blocks, and educational play items. Designed to demonstrate browsing and cart actions with clear product cues.',
      zh: '\u7cbe\u9078\u6bdb\u7d68\u3001\u7a4d\u6728\u8207\u76ca\u667a\u985e\u73a9\u5177\uff0c\u9069\u5408\u6f14\u793a\u5206\u985e\u700f\u89bd\u8207\u52a0\u5165\u8cfc\u7269\u8eca\u4e92\u52d5\u3002',
    },
    price: 28,
  },
  {
    id: 'cabinet',
    icon: '🗄️',
    name: { en: 'Cabinet', zh: '\u6ac3\u5b50' },
    category: { en: 'Furniture', zh: '\u5bb6\u5177' },
    summary: {
      en: 'Compact storage cabinet for home office organization.',
      zh: '\u9069\u5408\u5bb6\u4e2d\u6216\u8fa6\u516c\u7a7a\u9593\u7684\u6536\u7d0d\u6ac3\u3002',
    },
    description: {
      en: 'A practical cabinet option with multi-shelf storage and a clean silhouette. Useful for showcasing higher-value items in the cart experience.',
      zh: '\u63d0\u4f9b\u591a\u5c64\u6536\u7d0d\u8207\u7c21\u6f54\u5916\u89c0\u7684\u6ac3\u9ad4\uff0c\u9069\u5408\u5728\u8cfc\u7269\u8eca\u9ad4\u9a57\u4e2d\u6f14\u793a\u8f03\u9ad8\u55ae\u50f9\u5546\u54c1\u3002',
    },
    price: 189,
  },
  {
    id: 'computer',
    icon: '💻',
    name: { en: 'Computer', zh: '\u96fb\u8166' },
    category: { en: 'Electronics', zh: '\u96fb\u5b50\u7522\u54c1' },
    summary: {
      en: 'Performance-focused desktop setup for work and creation.',
      zh: '\u9069\u5408\u5de5\u4f5c\u8207\u5275\u4f5c\u7684\u6548\u80fd\u578b\u96fb\u8166\u9078\u9805\u3002',
    },
    description: {
      en: 'A computer bundle positioned for productivity tasks and creative software. This gives the demo a premium category with distinct pricing behavior.',
      zh: '\u4ee5\u751f\u7522\u529b\u8207\u5275\u4f5c\u8edf\u9ad4\u4f7f\u7528\u60c5\u5883\u70ba\u5c0e\u5411\u7684\u96fb\u8166\u7d44\u5408\uff0c\u8b93\u7bc4\u4f8b\u5305\u542b\u9ad8\u55ae\u50f9\u985e\u5225\u3002',
    },
    price: 899,
  },
];

const marketCopy: Record<Locale, Copy> = {
  en: {
    heading: 'Market basket builder',
    subheading: 'Test product browsing, detail modals, and cart actions in one flow.',
    cartLabel: 'Cart overview',
    cartButton: 'View cart',
    emptyCart: 'Your cart is empty. Add an item to see projected totals.',
    removeLabel: 'Remove',
    closeLabel: 'Close',
    detailsLabel: 'Details',
    addLabel: 'Add to cart',
    quantityLabel: 'In cart',
    totalLabel: 'Projected total',
  },
  zh: {
    heading: '\u5e02\u5834\u8ca8\u7d44\u7de8\u6392',
    subheading: '\u6f14\u793a\u5546\u54c1\u700f\u89bd\u3001\u5546\u54c1\u4ecb\u7d39 modal \u8207\u8cfc\u7269\u8eca\u4e92\u52d5\u6d41\u7a0b\u3002',
    cartLabel: '\u8cfc\u7269\u8eca\u6982\u89bd',
    cartButton: '\u67e5\u770b\u8cfc\u7269\u8eca',
    emptyCart: '\u8cfc\u7269\u8eca\u76ee\u524d\u70ba\u7a7a\u3002\u5148\u65b0\u589e\u9805\u76ee\u5373\u53ef\u67e5\u770b\u9810\u6e2c\u7e3d\u984d\u3002',
    removeLabel: '\u79fb\u9664',
    closeLabel: '\u95dc\u9589',
    detailsLabel: '\u5546\u54c1\u4ecb\u7d39',
    addLabel: '\u52a0\u5165\u8cfc\u7269\u8eca',
    quantityLabel: '\u5df2\u52a0\u5165',
    totalLabel: '\u9810\u6e2c\u7e3d\u984d',
  },
};

export function MarketCartDemo({ locale }: MarketCartDemoProps) {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const copy = marketCopy[locale] ?? marketCopy.en;

  let formatter: Intl.NumberFormat | null = null;
  try {
    formatter = new Intl.NumberFormat(locale === 'zh' ? 'zh-TW' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  } catch {
    formatter = null;
  }

  const formatCurrency = (value: number) => {
    if (formatter) {
      return formatter.format(value);
    }
    const amount = Math.round(value).toLocaleString(locale === 'zh' ? 'zh-TW' : 'en-US');
    return locale === 'zh' ? `US$${amount}` : `$${amount}`;
  };

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

  const getItemQuantity = (id: string) =>
    cart.find((entry) => entry.item.id === id)?.quantity ?? 0;

  const getText = (value: Record<Locale, string>) => value[locale] ?? value.en;

  const total = cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  const cartCount = cart.reduce((count, entry) => count + entry.quantity, 0);
  const activeItem = rawItems.find((item) => item.id === activeItemId) ?? null;

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-[0_20px_80px_-40px_rgba(14,116,144,0.65)] sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">{copy.heading}</h2>
          <p className="text-sm text-slate-300 sm:text-base">{copy.subheading}</p>
        </div>
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="inline-flex items-center gap-2 self-start rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-sky-400/60 hover:text-sky-300"
        >
          <span>{copy.cartButton}</span>
          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-200">
            {cartCount}
          </span>
        </button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {rawItems.map((item) => {
          const quantity = getItemQuantity(item.id);

          return (
            <article
              key={item.id}
              className="relative flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-sky-500/40 hover:bg-slate-900/60"
            >
              {quantity > 0 ? (
                <span className="absolute right-4 top-4 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  {copy.quantityLabel} x{quantity}
                </span>
              ) : null}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-3xl">
                    <span aria-hidden="true">{item.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {getText(item.category)}
                    </p>
                    <h3 className="text-lg font-semibold text-slate-100">{getText(item.name)}</h3>
                    <p className="text-sm font-medium text-sky-300">{formatCurrency(item.price)}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">{getText(item.summary)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveItemId(item.id)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
                >
                  {copy.detailsLabel}
                </button>
                <button
                  type="button"
                  onClick={() => handleAdd(item)}
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                  {copy.addLabel}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {isCartOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={copy.cartLabel}
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-slate-100">{copy.cartLabel}</h3>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                  {cartCount}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-slate-500"
              >
                {copy.closeLabel}
              </button>
            </div>

            <div className="mt-4 min-h-[120px] flex-1 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <p className="text-sm text-slate-400">{copy.emptyCart}</p>
              ) : (
                <ul className="space-y-3">
                  {cart.map((entry) => (
                    <li
                      key={entry.item.id}
                      className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-xl">
                          <span aria-hidden="true">{entry.item.icon}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-100">
                            {getText(entry.item.name)}
                          </p>
                          <p className="text-xs text-slate-400">
                            {formatCurrency(entry.item.price)} x {entry.quantity}
                          </p>
                        </div>
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
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3 text-sm font-semibold text-slate-200">
              <span>{copy.totalLabel}</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      ) : null}

      {activeItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={getText(activeItem.name)}
          onClick={() => setActiveItemId(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-3xl">
                  <span aria-hidden="true">{activeItem.icon}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {getText(activeItem.category)}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-100">
                    {getText(activeItem.name)}
                  </h3>
                  <p className="text-sm font-medium text-sky-300">
                    {formatCurrency(activeItem.price)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveItemId(null)}
                className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-slate-500"
              >
                {copy.closeLabel}
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              {getText(activeItem.description)}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {getItemQuantity(activeItem.id) > 0 ? (
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  {copy.quantityLabel} x{getItemQuantity(activeItem.id)}
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => handleAdd(activeItem)}
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                {copy.addLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
