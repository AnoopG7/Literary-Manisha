import type { Metadata } from 'next';
import { Inter, Noto_Sans_Devanagari, Lora } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { siteConfig } from '@/lib/config';
import './globals.css';

const inter = Inter({
  variable: '--font-sans-family',
  subsets: ['latin'],
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: '--font-hindi-family',
  subsets: ['devanagari'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const lora = Lora({
  variable: '--font-serif-family',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'poetry',
    'Hindi poetry',
    'कविता',
    'stories',
    'author',
    'writer',
    'books',
    'literary',
    siteConfig.name,
  ],
  authors: [{ name: siteConfig.author.name }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSansDevanagari.variable} ${lora.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
