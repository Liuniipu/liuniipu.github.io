'use client';

import { useEffect, useState } from 'react';

import type { Locale } from '../../lib/homeContent';

type MarketOption = {
  id: string;
  label: Record<Locale, string>;
  price: number;
};

type MarketItem = {
  id: string;
  icon: string;
  name: Record<Locale, string>;
  category: Record<Locale, string>;
  summary: Record<Locale, string>;
  description: Record<Locale, string>;
  options: readonly MarketOption[];
};

type CartEntry = {
  key: string;
  item: MarketItem;
  option: MarketOption;
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
  optionLabel: string;
  optionHelp: string;
  selectOptionFirst: string;
  addedNotice: string;
  removedNotice: string;
  removeGuardTitle: string;
  removeGuardMessage: string;
  cancelLabel: string;
  confirmRemoveLabel: string;
};

type NoticeTone = 'success' | 'warning';

type Notice = {
  id: number;
  message: string;
  tone: NoticeTone;
};

type MarketCartDemoProps = {
  locale: Locale;
};

const rawItems: readonly MarketItem[] = [
  {
    id: 'clothes',
    icon: '👕',
    name: { en: 'Top', zh: '上衣' },
    category: { en: 'Apparel', zh: '服飾' },
    summary: {
      en: 'Daily wear tops in three sizes: S, M, and L.',
      zh: '日常穿搭上衣，提供 S、M、L 三種尺寸。',
    },
    description: {
      en: 'Comfort-first tops suitable for daily wear and office styling. Pick your size before adding to cart.',
      zh: '以舒適與好搭配為主的上衣，適合日常與通勤。加入購物車前可先選擇尺寸。',
    },
    options: [
      { id: 's', label: { en: 'Size S', zh: 'S 尺寸' }, price: 42 },
      { id: 'm', label: { en: 'Size M', zh: 'M 尺寸' }, price: 42 },
      { id: 'l', label: { en: 'Size L', zh: 'L 尺寸' }, price: 42 },
    ],
  },
  {
    id: 'toys',
    icon: '🧸',
    name: { en: 'Blind Box', zh: '盒玩' },
    category: { en: 'Collectibles', zh: '收藏玩具' },
    summary: {
      en: 'Choose one animal style or buy the full six-piece set.',
      zh: '可選單一動物款，或直接購買六款全套。',
    },
    description: {
      en: 'Single figure options include dog, cat, lion, elephant, whale, and chicken. Full set includes all six animals.',
      zh: '單款提供狗、貓、獅子、大象、鯨魚、雞；也可選擇一次購買六款完整套組。',
    },
    options: [
      { id: 'dog', label: { en: 'Dog', zh: '狗' }, price: 28 },
      { id: 'cat', label: { en: 'Cat', zh: '貓' }, price: 28 },
      { id: 'lion', label: { en: 'Lion', zh: '獅子' }, price: 28 },
      { id: 'elephant', label: { en: 'Elephant', zh: '大象' }, price: 28 },
      { id: 'whale', label: { en: 'Whale', zh: '鯨魚' }, price: 28 },
      { id: 'chicken', label: { en: 'Chicken', zh: '雞' }, price: 28 },
      { id: 'full-set', label: { en: 'Full Set (6)', zh: '六款全套' }, price: 149 },
    ],
  },
  {
    id: 'cabinet',
    icon: '🗄️',
    name: { en: 'Cabinet', zh: '櫃子' },
    category: { en: 'Furniture', zh: '家具' },
    summary: {
      en: 'Storage cabinet available in black, gray, and white.',
      zh: '收納櫃提供黑、灰、白三種顏色可選。',
    },
    description: {
      en: 'Compact multi-shelf cabinet for home office organization, with three color options for different interiors.',
      zh: '多層收納設計，適合居家與辦公空間。可依環境挑選黑色、灰色或白色。',
    },
    options: [
      { id: 'black', label: { en: 'Black', zh: '黑色' }, price: 189 },
      { id: 'gray', label: { en: 'Gray', zh: '灰色' }, price: 189 },
      { id: 'white', label: { en: 'White', zh: '白色' }, price: 189 },
    ],
  },
  {
    id: 'computer',
    icon: '💻',
    name: { en: 'Computer', zh: '電腦' },
    category: { en: 'Electronics', zh: '電子產品' },
    summary: {
      en: 'Three bundles: Basic, Standard, and Upgrade.',
      zh: '三種方案：簡單、標準、升級。',
    },
    description: {
      en: 'Basic includes laptop. Standard adds a bag. Upgrade includes laptop, bag, mouse, and cooling pad.',
      zh: '簡單版含筆電；標準版含筆電+包包；升級版含筆電+包包+滑鼠+散熱墊。',
    },
    options: [
      { id: 'basic', label: { en: 'Basic (Laptop)', zh: '簡單（筆電）' }, price: 899 },
      {
        id: 'standard',
        label: { en: 'Standard (Laptop + Bag)', zh: '標準（筆電+包包）' },
        price: 979,
      },
      {
        id: 'upgrade',
        label: {
          en: 'Upgrade (Laptop + Bag + Mouse + Cooling Pad)',
          zh: '升級（筆電+包包+滑鼠+散熱墊）',
        },
        price: 1069,
      },
    ],
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
    optionLabel: 'Option',
    optionHelp: 'Select a configuration before adding this item.',
    selectOptionFirst: 'Please choose an option before adding this item.',
    addedNotice: 'Added to cart.',
    removedNotice: 'Item removed from cart.',
    removeGuardTitle: 'Remove this item?',
    removeGuardMessage: 'This action will remove the selected option from your cart.',
    cancelLabel: 'Cancel',
    confirmRemoveLabel: 'Confirm remove',
  },
  zh: {
    heading: '市場貨組編排',
    subheading: '演示商品瀏覽、商品介紹 modal 與購物車互動流程。',
    cartLabel: '購物車概覽',
    cartButton: '查看購物車',
    emptyCart: '購物車目前為空。先新增項目即可查看預測總額。',
    removeLabel: '移除',
    closeLabel: '關閉',
    detailsLabel: '商品介紹',
    addLabel: '加入購物車',
    quantityLabel: '已加入',
    totalLabel: '預測總額',
    optionLabel: '方案',
    optionHelp: '加入商品前，請先選擇規格。',
    selectOptionFirst: '請先選擇規格，再加入購物車。',
    addedNotice: '已加入購物車。',
    removedNotice: '已從購物車移除。',
    removeGuardTitle: '確定要移除此項目？',
    removeGuardMessage: '此動作會將該規格商品從購物車中刪除。',
    cancelLabel: '取消',
    confirmRemoveLabel: '確認移除',
  },
};

const TWD_EXCHANGE_RATE = 32;

export function MarketCartDemo({ locale }: MarketCartDemoProps) {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<CartEntry | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(rawItems.map((item) => [item.id, ''])),
  );

  const copy = marketCopy[locale] ?? marketCopy.en;
  const currencyCode = locale === 'zh' ? 'TWD' : 'USD';

  let formatter: Intl.NumberFormat | null = null;
  try {
    formatter = new Intl.NumberFormat(locale === 'zh' ? 'zh-TW' : 'en-US', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    });
  } catch {
    formatter = null;
  }

  useEffect(() => {
    if (!notice) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setNotice((current) => (current?.id === notice.id ? null : current));
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const toDisplayPrice = (usdValue: number) =>
    locale === 'zh' ? Math.round(usdValue * TWD_EXCHANGE_RATE) : usdValue;

  const formatCurrency = (usdValue: number) => {
    const displayPrice = toDisplayPrice(usdValue);
    if (formatter) {
      return formatter.format(displayPrice);
    }
    const amount = Math.round(displayPrice).toLocaleString(locale === 'zh' ? 'zh-TW' : 'en-US');
    return locale === 'zh' ? `NT$${amount}` : `$${amount}`;
  };

  const pushNotice = (message: string, tone: NoticeTone) => {
    setNotice({
      id: Date.now(),
      message,
      tone,
    });
  };

  const getText = (value: Record<Locale, string>) => value[locale] ?? value.en;

  const getSelectedOption = (item: MarketItem) => {
    const optionId = selectedOptions[item.id];
    return item.options.find((option) => option.id === optionId);
  };

  const selectOption = (itemId: string, optionId: string) => {
    setSelectedOptions((previous) => ({ ...previous, [itemId]: optionId }));
  };

  const handleAdd = (item: MarketItem, option: MarketOption) => {
    const key = `${item.id}:${option.id}`;
    setCart((previous) => {
      const existing = previous.find((entry) => entry.key === key);
      if (existing) {
        return previous.map((entry) =>
          entry.key === key ? { ...entry, quantity: entry.quantity + 1 } : entry,
        );
      }
      return [...previous, { key, item, option, quantity: 1 }];
    });
    pushNotice(copy.addedNotice, 'success');
  };

  const handleQuickAdd = (item: MarketItem) => {
    const selectedOption = getSelectedOption(item);
    if (!selectedOption) {
      setActiveItemId(item.id);
      pushNotice(copy.selectOptionFirst, 'warning');
      return;
    }

    handleAdd(item, selectedOption);
  };

  const confirmRemoval = () => {
    if (!pendingRemoval) {
      return;
    }

    setCart((previous) => previous.filter((entry) => entry.key !== pendingRemoval.key));
    setPendingRemoval(null);
    pushNotice(copy.removedNotice, 'warning');
  };

  const getItemQuantity = (itemId: string) =>
    cart
      .filter((entry) => entry.item.id === itemId)
      .reduce((count, entry) => count + entry.quantity, 0);

  const total = cart.reduce((sum, entry) => sum + entry.option.price * entry.quantity, 0);
  const cartCount = cart.reduce((count, entry) => count + entry.quantity, 0);
  const activeItem = rawItems.find((item) => item.id === activeItemId) ?? null;
  const activeOption = activeItem ? getSelectedOption(activeItem) : null;

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
          const selectedOption = getSelectedOption(item);
          const displayPrice = selectedOption?.price ?? item.options[0]?.price ?? 0;

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
                    <p className="text-sm font-medium text-sky-300">{formatCurrency(displayPrice)}</p>
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
                  onClick={() => handleQuickAdd(item)}
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
                      key={entry.key}
                      className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-xl">
                          <span aria-hidden="true">{entry.item.icon}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-100">{getText(entry.item.name)}</p>
                          <p className="text-xs text-slate-400">{getText(entry.option.label)}</p>
                          <p className="text-xs text-slate-400">
                            {formatCurrency(entry.option.price)} x {entry.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-200">
                          {formatCurrency(entry.option.price * entry.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => setPendingRemoval(entry)}
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
                  <h3 className="text-lg font-semibold text-slate-100">{getText(activeItem.name)}</h3>
                  <p className="text-sm font-medium text-sky-300">
                    {activeOption ? formatCurrency(activeOption.price) : ''}
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

            <p className="mt-4 text-sm leading-6 text-slate-300">{getText(activeItem.description)}</p>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {copy.optionLabel}
              </p>
              <p className="mt-1 text-xs text-slate-500">{copy.optionHelp}</p>
              <div className="mt-3 grid gap-2">
                {activeItem.options.map((option) => {
                  const isSelected = activeOption?.id === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => selectOption(activeItem.id, option.id)}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
                        isSelected
                          ? 'border-sky-400/70 bg-sky-500/10 text-sky-100'
                          : 'border-slate-700 bg-slate-950/40 text-slate-200 hover:border-slate-500'
                      }`}
                    >
                      <span>{getText(option.label)}</span>
                      <span className="font-semibold">{formatCurrency(option.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {getItemQuantity(activeItem.id) > 0 ? (
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  {copy.quantityLabel} x{getItemQuantity(activeItem.id)}
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  if (!activeOption) {
                    pushNotice(copy.selectOptionFirst, 'warning');
                    return;
                  }
                  handleAdd(activeItem, activeOption);
                }}
                disabled={!activeOption}
                aria-disabled={!activeOption}
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
              >
                {copy.addLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {pendingRemoval ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={copy.removeGuardTitle}
          onClick={() => setPendingRemoval(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-100">{copy.removeGuardTitle}</h3>
            <p className="mt-2 text-sm text-slate-300">{copy.removeGuardMessage}</p>
            <p className="mt-2 text-xs text-slate-400">
              {getText(pendingRemoval.item.name)} - {getText(pendingRemoval.option.label)}
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setPendingRemoval(null)}
                className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
              >
                {copy.cancelLabel}
              </button>
              <button
                type="button"
                onClick={confirmRemoval}
                className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
              >
                {copy.confirmRemoveLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {notice ? (
        <div className="pointer-events-none fixed bottom-4 right-4 z-[70]">
          <div
            className={`rounded-xl border px-4 py-3 text-sm font-semibold shadow-xl ${
              notice.tone === 'success'
                ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-100'
                : 'border-amber-400/40 bg-amber-500/20 text-amber-100'
            }`}
            role="status"
            aria-live="polite"
          >
            {notice.message}
          </div>
        </div>
      ) : null}
    </section>
  );
}
