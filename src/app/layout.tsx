
// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { AuthProvider } from '@/hooks/useAuth';
import { FavoritesProvider } from '@/hooks/useFavorites';
import { CartProvider } from '@/hooks/useCart';
import ChatPopup from '@/components/ChatPopup';
import { phoneNumber } from '@/components/WhatsAppButton';
import { baseOpenGraph, defaultOgImage, siteDescription, siteKeywords, siteName, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Productos personalizados`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  applicationName: siteName,
  // Sin canonical global: cada página define el suyo (si no, se heredaría "/" en todas).
  openGraph: {
    ...baseOpenGraph,
    title: `${siteName} | Productos personalizados`,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Productos personalizados`,
    description: siteDescription,
    images: [defaultOgImage],
  },
  robots: { index: true, follow: true },
};

// Datos estructurados de la empresa para Google.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/assets/logo.png`,
  image: defaultOgImage,
  description: siteDescription,
  telephone: `+${phoneNumber}`, // phoneNumber ya viene solo con dígitos
  areaServed: 'AR',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex-grow px-4 py-6 md:px-10 md:py-10">
                  <div className="mx-auto w-full max-w-7xl">
                    {children}
                  </div>
                </main>
                <Footer />
              </div>

              {/* Floating Action Buttons Container */}
              <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
                <ChatPopup />
                <WhatsAppButton />
              </div>

              <ScrollToTopButton />
              <Toaster />
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
