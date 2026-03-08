import type { Metadata } from 'next';
import { AuthProvider } from '@/components/layout/AuthProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'BeautyShare Pro — Launch & Scale Your Hair Business',
  description:
    'The all-in-one platform for hair entrepreneurs. Get premium hair at wholesale, your own branded store, and automated fulfillment.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
          <AuthProvider>{children}</AuthProvider>
        </body>
    </html>
  );
}
