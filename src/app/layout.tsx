// app/layout.js
import '../../styles/globals.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Karmik Numeroloji | Sayıların Gücüyle Kendinizi Keşfedin',
  description: 'Doğum tarihiniz ve isminizle karmik enerjinizi keşfedin. Numeroloji hesaplamaları, ruhsal analiz ve kişisel gelişim rehberliği.',
  keywords: 'numeroloji, karmik sayılar, yaşam yolu, ruhsal gelişim, kader analizi',
  authors: [{ name: 'Karmik Numeroloji' }],
  openGraph: {
    title: 'Karmik Numeroloji',
    description: 'Sayıların gücüyle kendinizi keşfedin',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}