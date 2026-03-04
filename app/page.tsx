import { redirect } from 'next/navigation';

import { defaultLocale } from '../lib/homeContent';

export default function HomePage() {
  redirect(`/${defaultLocale}`);
}
