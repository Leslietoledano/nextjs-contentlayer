import type { ReactNode } from 'react';
import {Lexend, Inter} from 'next/font/google';
const lexend = Lexend({ subsets: ['latin'], variable: '--font-header', display: 'swap',});
const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap',});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
