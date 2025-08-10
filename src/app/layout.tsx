
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
import CategorySidebar, { CategorySidebarSkeleton } from '@/components/CategorySidebar';
import { AuthProvider } from '@/hooks/useAuth';
import { FavoritesProvider } from '@/hooks/useFavorites';
import { CartProvider } from '@/hooks/useCart';
import { Suspense } from 'react';
import ChatPopup from '@/components/ChatPopup';

export const metadata: Metadata = {
  title: 'Arte Nativo Estampados',
  description: 'Personalized products crafted with care.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-muted">
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <div className="max-w-screen-2xl mx-auto border-x shadow-2xl">
                <div className="flex min-h-screen bg-background">
                  <Suspense fallback={<CategorySidebarSkeleton />}>
                    <CategorySidebar />
                  </Suspense>
                  <div className="flex flex-col flex-1 min-w-0">
                    <Header />
                    <main className="flex-grow p-4 md:p-8">
                      {children}
                    </main>
                    <Footer />
                  </div>
                </div>
              </div>
              <WhatsAppButton />
              <ChatPopup />
              <ScrollToTopButton />
              <Toaster />
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
