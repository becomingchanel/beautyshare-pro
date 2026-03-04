import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BeautyShare Pro — Launch & Scale Your Hair Business',
  description: 'The all-in-one platform for hair entrepreneurs. Get your own branded store, premium hair catalog at wholesale prices, and start earning today.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
