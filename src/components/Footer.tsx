// src/components/Footer.tsx
"use client";

import Link from 'next/link';
import { Facebook, Instagram, MessageCircle, Banknote, Landmark, CreditCard, Wallet, Share2 } from 'lucide-react';
import { Logo } from './Logo';
import { useShare } from '@/hooks/use-share'; // Importar el nuevo hook
import { Separator } from './ui/separator';

export default function Footer() {
  const { handleShare } = useShare(); // Usar el hook

  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Columna Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Logo className="h-auto w-36" />
            </Link>
          </div>

          {/* Columna Navegación */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-white">Navegación</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/crear" className="hover:text-primary">Personalizar</Link></li>
              <li><Link href="/favorites" className="hover:text-primary">Favoritos</Link></li>
              <li><Link href="/login" className="hover:text-primary">Login</Link></li>
            </ul>
          </div>

          {/* Columna Medios de Pago */}
           <div className="flex flex-col text-center md:text-left">
              <h3 className="font-bold text-lg mb-4 text-white">Medios de Pago</h3>
              <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center md:items-start text-white/80">
                      <Banknote className="h-8 w-8 mb-1"/>
                      <span className="text-xs">Efectivo</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start text-white/80">
                      <Landmark className="h-8 w-8 mb-1"/>
                      <span className="text-xs">Transferencia</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start text-white/80">
                      <CreditCard className="h-8 w-8 mb-1"/>
                      <span className="text-xs">Crédito</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start text-white/80">
                      <Wallet className="h-8 w-8 mb-1"/>
                      <span className="text-xs">Débito</span>
                  </div>
              </div>
          </div>

          {/* Columna Seguinos */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-white">Seguinos</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <Link href="#" aria-label="Facebook" className="text-white/80 hover:text-primary">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link target='_blank'
              rel="noopener noreferrer"
              href="https://www.instagram.com/artenativoremeras/?hl=es-la" aria-label="Instagram" className="text-white/80 hover:text-primary">
                <Instagram className="h-6 w-6" />
              </Link>
              <button onClick={() => handleShare()} aria-label="Share page" className="text-white/80 hover:text-primary">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20" />

        <div className="flex flex-col md:flex-row justify-between items-center text-center pt-8 text-sm text-white/60 space-y-4 md:space-y-0">
          <p>
            © {new Date().getFullYear()} Arte Nativo. Todos los derechos reservados.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
             <span>
                Creado por <a href="https://www.linkedin.com/in/julian-soto-dev/" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-primary underline">Julián Soto</a>
             </span>
             <a 
                href="https://wa.me/5493571680795" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="hover:text-primary underline flex items-center gap-1"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Contacto</span>
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
