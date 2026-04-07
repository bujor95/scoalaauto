import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Școala Auto Bujor',
  description: 'Cursuri auto categoriile B, A, C. Înscrieri online.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
            <Link href="/" className="text-xl font-bold text-blue-700">
              Școala Auto Bujor
            </Link>
            <ul className="flex gap-6 text-sm font-medium">
              <li><Link href="/">Acasă</Link></li>
              <li><Link href="/despre">Despre</Link></li>
              <li><Link href="/cursuri">Cursuri</Link></li>
              <li><Link href="/programare">Programare</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl p-6">{children}</main>
        <footer className="mt-16 border-t bg-white py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Școala Auto Bujor
        </footer>
      </body>
    </html>
  );
}
