'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { Locale } from '../../lib/homeContent';

type ChatSimulatorProps = {
  locale: Locale;
};

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type QuickMessage = {
  id: string;
  label: string;
  reply: string;
};

type Copy = {
  heading: string;
  subheading: string;
  typing: string;
  optionsTitle: string;
  notesTitle: string;
  notes: string[];
};

const copyMap: Record<Locale, Copy> = {
  en: {
    heading: 'Simulated chat panel',
    subheading: 'Click a preset message to preview fixed chatbot responses.',
    typing: 'Assistant is typing...',
    optionsTitle: 'Message options',
    notesTitle: 'Notes',
    notes: [
      'Preset-message simulation without network requests.',
      'Click any option to send instantly.',
      'Useful for UI and flow demos.',
    ],
  },
  zh: {
    heading: '聊天室模擬',
    subheading: '點擊預設訊息，展示固定回覆流程。',
    typing: '正在輸入...',
    optionsTitle: '訊息選擇',
    notesTitle: '說明',
    notes: [
      '前端模擬，不連線後端服務。',
      '點擊選項即可送出訊息。',
      '展示互動流程與介面樣式。',
    ],
  },
};

const quickMessageMap: Record<Locale, readonly QuickMessage[]> = {
  en: [
    {
      id: 'hello',
      label: 'Hello!',
      reply: 'Hello! I am HY. Welcome to my website!',
    },
    {
      id: 'mail',
      label: 'I want to send an email!',
      reply: 'My email is chuanren54.gmail.com',
    },
    {
      id: 'experience',
      label: 'What web projects have you built?',
      reply:
        'I have built different website types, including social platforms, e-commerce sites, and management systems. Features include chatrooms, shopping carts, forms, QRCode, and more.',
    },
    {
      id: 'bye',
      label: 'Goodbye!',
      reply: 'Goodbye, and you are always welcome back!',
    },
  ],
  zh: [
    {
      id: 'hello',
      label: '你好!',
      reply: '您好!我是HY，歡迎來到我的網站!',
    },
    {
      id: 'mail',
      label: '我想寄信!',
      reply: '我的信箱是chuanren54.gmail.com',
    },
    {
      id: 'experience',
      label: '網頁製作經驗為何?',
      reply:
        '製作過不同類網站，例如：社群、購物、管理，其中功能包含但不限於聊天室、購物車、表單、QRCode，也樂於挑戰開發新功能',
    },
    {
      id: 'bye',
      label: '再會!',
      reply: '再見，歡迎再來!',
    },
  ],
};

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function ChatSimulator({ locale }: ChatSimulatorProps) {
  const copy = useMemo(() => copyMap[locale] ?? copyMap.en, [locale]);
  const quickMessages = useMemo(() => quickMessageMap[locale] ?? quickMessageMap.en, [locale]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);
  const [typingProgress, setTypingProgress] = useState<Record<string, number>>({});
  const [activeTypingId, setActiveTypingId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const typingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setMessages([
      {
        id: makeId(),
        role: 'assistant',
        content:
          locale === 'zh'
            ? '您好! 請從右側選擇一則訊息開始對話。'
            : 'Hello! Please choose one message option to start.',
      },
    ]);
    setTypingProgress({});
    setActiveTypingId(null);
  }, [locale]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, pending, typingProgress]);

  useEffect(() => {
    if (!activeTypingId) {
      return undefined;
    }

    const targetMessage = messages.find((message) => message.id === activeTypingId);
    if (!targetMessage) {
      setActiveTypingId(null);
      return undefined;
    }

    if (typingTimerRef.current) {
      window.clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    typingTimerRef.current = window.setInterval(() => {
      setTypingProgress((previous) => {
        const current = previous[activeTypingId] ?? 0;
        const next = Math.min(targetMessage.content.length, current + 1);

        if (next >= targetMessage.content.length) {
          if (typingTimerRef.current) {
            window.clearInterval(typingTimerRef.current);
            typingTimerRef.current = null;
          }
          setActiveTypingId(null);
        }

        return { ...previous, [activeTypingId]: next };
      });
    }, 35);

    return () => {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [activeTypingId, messages]);

  useEffect(
    () => () => {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
      }
    },
    [],
  );

  const handleSelectMessage = (item: QuickMessage) => {
    if (pending) {
      return;
    }

    setMessages((prev) => [...prev, { id: makeId(), role: 'user', content: item.label }]);
    setPending(true);

    window.setTimeout(() => {
      const assistantId = makeId();
      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: item.reply }]);
      setTypingProgress((prev) => ({ ...prev, [assistantId]: 0 }));
      setActiveTypingId(assistantId);
      setPending(false);
    }, 600);
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 sm:p-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">{copy.heading}</h2>
        <p className="text-sm text-slate-300 sm:text-base">{copy.subheading}</p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="flex h-[420px] min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === 'user'
                    ? 'ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-sky-500/20 px-4 py-2 text-sky-100'
                    : 'mr-auto max-w-[80%] rounded-2xl rounded-tl-md bg-slate-800/80 px-4 py-2 text-slate-100'
                }
              >
                {m.role === 'assistant' && typingProgress[m.id] !== undefined
                  ? m.content.slice(0, typingProgress[m.id])
                  : m.content}
              </div>
            ))}
            {pending ? (
              <div className="mr-auto inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-300">
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0.2s]" />
                <span className="ml-2">{copy.typing}</span>
              </div>
            ) : null}
            <div ref={endRef} />
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">
          <div>
            <p className="font-semibold text-slate-200">{copy.optionsTitle}</p>
            <div className="mt-3 grid gap-2">
              {quickMessages.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectMessage(item)}
                  disabled={pending}
                  className="rounded-xl border border-slate-700 bg-slate-950/50 px-3 py-2 text-left text-sm text-slate-100 transition hover:border-sky-400/60 hover:text-sky-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-slate-200">{copy.notesTitle}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {copy.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default ChatSimulator;
