import Navbar from '@/components/Navbar';
import './globals.css';
import Footer from '@/components/Footer';
import ScrollToTop from '../utils/ScrollToTop';
import { Montserrat } from 'next/font/google';
import Providers from '../utils/QueryProviders';
import Script from 'next/script';
import { SpeedInsights } from "@vercel/speed-insights/next"

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Sazin Construction Ltd',
  description: 'Leading construction & engineering solutions in Bangladesh.',
  icons: {
    icon: '/FavIcon.png',
    shortcut: '/FavIcon.png',
    apple: '/FavIcon.png',
  },
  openGraph: {
    title: 'Sazin Construction Ltd',
    description: 'Leading construction & engineering solutions in Bangladesh.',
    url: 'https://www.yourdomain.com',
    type: 'website',
    images: [
      {
        url: 'https://www.yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sazin Construction Ltd',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sazin Construction Ltd',
    description: 'Leading construction & engineering solutions in Bangladesh.',
    images: ['https://www.yourdomain.com/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.className} bg-gray-400  dark:bg-gray-800`}>
      <body>
        <Providers>
          <ScrollToTop />
          <Navbar />
          <div className='mt-25'>
                        {children}
          </div>
          <SpeedInsights />
          <Footer />

          {/* ✅ JSON-LD structured data for Organization */}
          <Script
            id="organization-structured-data"
            type="application/ld+json"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Sazin Construction Ltd",
                "url": "https://www.yourdomain.com",
                "logo": "https://www.yourdomain.com/logo.png",
                "sameAs": [
                  "https://www.facebook.com/yourpage",
                  "https://www.linkedin.com/company/yourcompany"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+880123456789",
                  "contactType": "customer service"
                }
              })
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
