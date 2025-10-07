'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type React from 'react';
import type { Locale } from '../../lib/homeContent';

type ChatSimulatorProps = {
  locale: Locale;
};

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type Copy = {
  heading: string;
  subheading: string;
  inputPlaceholder: string;
  send: string;
  typing: string;
};

const copyMap: Record<Locale, Copy> = {
  en: {
    heading: 'Simulated chat panel',
    subheading: 'Test a simple chat flow with mock assistant replies.',
    inputPlaceholder: 'Type a message…',
    send: 'Send',
    typing: 'Assistant is typing…',
  },
  zh: {
    heading: '模擬聊天室',
    subheading: '用簡單對話流程體驗模擬助理回覆。',
    inputPlaceholder: '輸入訊息…',
    send: '送出',
    typing: '助理正在輸入…',
  },
};

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function ChatSimulator({ locale }: ChatSimulatorProps) {
  const copy = useMemo(() => copyMap[locale] ?? copyMap.en, [locale]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: makeId(),
      role: 'assistant',
      content:
        locale === 'zh'
          ? '嗨！這裡是模擬聊天室，輸入訊息開始體驗。'
          : 'Hi! This is a simulated chat. Type a message to start.',
    },
  ]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, pending]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || pending) return;
    const userMsg: ChatMessage = { id: makeId(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setPending(true);

    // Simple mock assistant behavior
    const reply = (() => {
      const lower = text.toLowerCase();
      const isZh = /[\u4e00-\u9fff]/.test(text);
      if (isZh) {
        if (text.includes('你好') || text.includes('嗨')) return '你好！有什麼我可以幫忙的？';
        if (text.includes('幫') || text.includes('如何') || text.includes('怎麼'))
          return '我可以示範：總結、產生想法、或製作待辦清單。你想試哪個？';
        return `你說：「${text}」。要我幫你延伸這個想法嗎？`;
      }
      if (lower.includes('hello') || lower.includes('hi')) return 'Hello! How can I help today?';
      if (lower.includes('help') || lower.includes('how'))
        return 'I can demo summarizing, brainstorming, or making a todo list. Which one?';
      return `You said: "${text}". Want me to build on that?`;
    })();

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: 'assistant', content: reply },
      ]);
      setPending(false);
    }, 700);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 sm:p-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">{copy.heading}</h2>
        <p className="text-sm text-slate-300 sm:text-base">{copy.subheading}</p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="flex min-h-[320px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === 'user'
                    ? 'ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-sky-500/20 px-4 py-2 text-sky-100'
                    : 'mr-auto max-w-[80%] rounded-2xl rounded-tl-md bg-slate-800/80 px-4 py-2 text-slate-100'
                }
              >
                {m.content}
              </div>
            ))}
            {pending && (
              <div className="mr-auto inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-300">
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0.2s]" />
                <span className="ml-2">{copy.typing}</span>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="flex items-center gap-2 border-t border-slate-800 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={copy.inputPlaceholder}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-slate-100 placeholder-slate-500 outline-none transition focus:border-sky-500/60"
              aria-label={copy.inputPlaceholder}
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={pending || input.trim().length === 0}
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition enabled:hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {copy.send}
            </button>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">
          <p className="font-semibold text-slate-200">
            {locale === 'zh' ? '說明' : 'Notes'}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              {locale === 'zh'
                ? '這是前端模擬，不會連線或儲存任何內容。'
                : 'Frontend-only simulation — no network or storage.'}
            </li>
            <li>
              {locale === 'zh'
                ? '支援 Enter 送出、邏輯規則產生簡單回覆。'
                : 'Supports Enter to send and simple rule-based replies.'}
            </li>
            <li>
              {locale === 'zh'
                ? '可用於展示互動樣式與可用性。'
                : 'Good for showcasing interaction styling and UX.'}
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

export default ChatSimulator;
