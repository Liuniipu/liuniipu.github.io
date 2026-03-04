'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { defaultLocale } from '../lib/homeContent';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <p className="text-center text-base text-slate-300">
        Redirecting to homepage...
        {' '}
        <Link href={`/${defaultLocale}`} className="text-sky-300 underline underline-offset-4">
          Continue
        </Link>
      </p>
    </main>
  );
}
