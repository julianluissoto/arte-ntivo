
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
import { AuthProvider } from '@/hooks/useAuth'; // Import AuthProvider
import CategorySidebarSuspense from '@/components/CategorySidebarSuspense';

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
      <body className="font-body antialiased">
        <AuthProvider>
          <div className="flex min-h-screen bg-background">
            <CategorySidebarSuspense/>
            <div className="flex flex-col w-full">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </div>
          <WhatsAppButton />
          <ScrollToTopButton />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
