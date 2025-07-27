import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { LogoSvg } from './LogoSvg';


export default function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground mt-auto">
      <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2 mb-4">
                  <LogoSvg className="h-10 w-auto text-primary mb-10" />
              </div>
              
               <p className="text-sm mt-4 text-white/80">
                &copy; {new Date().getFullYear()} Arte Nativo. All rights reserved.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-4 text-white">Navegación</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link href="/" className="hover:text-primary">Home</Link></li>
                <li><Link href="/crear" className="hover:text-primary">Personalizar</Link></li>
                <li><Link href="/favorites" className="hover:text-primary">Favoritos</Link></li>
                <li><Link href="/login" className="hover:text-primary">Login</Link></li>
              </ul>
            </div>

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
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-4 text-white">Encontranos</h3>
               <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016888129802!2d-58.38157042337199!3d-34.6037388574883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4aa9f0a6da5edb%3A0x11be1d1524e434b!2sObelisco!5e0!3m2!1ses-419!2sar!4v1709159357539!5m2!1ses-419!2sar" 
                  width="100%" 
                  height="150" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-md"
                  >
                  </iframe>
              </div>
            </div>
          </div>
      </div>
    </footer>
  );
}
