import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Next.js + Tailwind 初始化完成
      </h1>
      <p className="text-lg text-slate-300">
        接下來可以逐步將舊版靜態網站內容搬移到這個框架中。現有檔案仍然保留於專案根目錄中，方便參考比對。
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          className="rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-sky-400"
          href="/"
        >
          返回首頁
        </Link>
        <Link
          className="rounded-full border border-slate-700 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
          href="/index.html"
        >
          查看舊版頁面
        </Link>
      </div>
    </main>
  );
}
