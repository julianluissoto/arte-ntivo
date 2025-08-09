// src/components/HeroSection.tsx
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-white overflow-hidden rounded-lg">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/julian-soto/image/upload/v1754782637/arte-nativo-web/ChatGPT_Image_9_ago_2025_08_35_29_p.m._gdujym.png"
          alt="Taller de estampado con diversas máquinas y productos"
          fill
          className="object-cover"
          priority
          data-ai-hint="craft workshop"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center p-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary-foreground drop-shadow-lg">
          Bienvenido a Arte Nativo Estampados
        </h1>
        <p className="mt-4 text-lg md:text-xl text-primary-foreground/90 drop-shadow-md">
          Donde puedes personalizar todo tipo de productos, ideales para colegios, instituciones, academias o simplemente para regalar. Con más de 10 años en el rubro, brindamos calidad y responsabilidad.
        </p>
        <Button asChild size="lg" className="mt-8 group">
          <Link href="/#all-products">
            Explorar Productos
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
