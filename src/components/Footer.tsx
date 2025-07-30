import Link from 'next/link';
import { Facebook, Instagram, MessageCircle, Banknote, Landmark, CreditCard, Wallet } from 'lucide-react';
import { Logo } from './LogoSvg';


export default function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground mt-auto">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
          {/* Columna Logo y Creado por */}
          <div className="flex flex-col items-center md:items-center text-center md:text-left md:col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Logo className="h-10 w-auto text-primary mb-10" />
            </div>
            
            <p className="text-sm mt-4 text-white/80">
              © {new Date().getFullYear()} Arte Nativo. All rights reserved.
            </p>

            <div className="mt-4 text-sm text-white/60">
              <p>
                Creado por <span className="font-semibold text-white">Julián Soto</span>
              </p>
              <div className="flex gap-4 mt-2">
                <Link 
                  href="https://www.linkedin.com/in/julian-soto-dev/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Conectar en LinkedIn"
                  className="hover:text-secondary underline flex items-center gap-1"
                >
                  LinkedIn
                </Link>
                <Link 
                  href="https://wa.me/5493571680795" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar por WhatsApp"
                  className="hover:text-secondary underline flex items-center gap-1"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </Link>
              </div>
            </div>
          </div>

          {/* Columna Navegación */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-white">Navegación</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/" className="hover:text-secondary">Home</Link></li>
              <li><Link href="/crear" className="hover:text-secondary">Personalizar</Link></li>
              <li><Link href="/favorites" className="hover:text-secondary">Favoritos</Link></li>
              <li><Link href="/login" className="hover:text-secondary">Login</Link></li>
            </ul>
          </div>

          {/* Columna Medios de Pago */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-white">Medios de Pago</h3>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-start text-center text-white/80">
                    <Banknote className="h-8 w-8 mb-1"/>
                    <span className="text-xs">Efectivo</span>
                </div>
                <div className="flex flex-col items-start text-center text-white/80">
                    <Landmark className="h-8 w-8 mb-1"/>
                    <span className="text-xs">Transferencia</span>
                </div>
                <div className="flex flex-col items-start text-center text-white/80">
                    <CreditCard className="h-8 w-8 mb-1"/>
                    <span className="text-xs">Crédito/Débito</span>
                </div>
                <div className="flex flex-col items-start text-center text-white/80">
                    <Wallet className="h-8 w-8 mb-1"/>
                    <span className="text-xs">Billetera Virtual</span>
                </div>
            </div>
          </div>

          {/* Columna Seguinos */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-white">Seguinos</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <Link href="#" aria-label="Facebook" className="text-white/80 hover:text-secondary">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link target='_blank'
              rel="noopener noreferrer"
              href="https://www.instagram.com/artenativoremeras/?hl=es-la" aria-label="Instagram" className="text-white/80 hover:text-secondary">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}