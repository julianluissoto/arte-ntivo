// src/components/HeroSection.tsx
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { phoneNumber } from './WhatsAppButton';

const highlights = ['Estampado y sublimación', 'Grabado láser', 'Envíos a todo el país'];

export default function HeroSection() {
  const quoteUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    'Hola! Quiero pedir una cotización para productos personalizados.'
  )}`;

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-secondary text-secondary-foreground">
      <div className="absolute inset-0 bg-grain opacity-40" aria-hidden />
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/30 blur-3xl" aria-hidden />

      <div className="relative grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14">
        {/* Texto */}
        <div className="order-2 lg:order-1">
          <span className="eyebrow text-primary">Productos personalizados · +12 años</span>

          <h1 className="mt-5 font-headline text-5xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-6xl xl:text-7xl">
            Tu idea.
            <br />
            <span className="text-primary">Nosotros</span>
            <br />
            la hacemos real.
          </h1>

          <p className="mt-6 max-w-lg text-base text-secondary-foreground/75 md:text-lg">
            Estampamos, sublimamos y grabamos con láser todo tipo de productos. Ideales para
            colegios, instituciones, empresas, eventos o simplemente para regalar.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="group">
              <a href={quoteUrl} target="_blank" rel="noopener noreferrer">
                Pedir cotización
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-secondary-foreground/25 bg-transparent text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
            >
              <Link href="/#all-products">Ver productos</Link>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-secondary-foreground/15 bg-secondary-foreground/5 px-3 py-1.5 text-xs font-medium text-secondary-foreground/85"
              >
                <Check className="h-3.5 w-3.5 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Imagen */}
        <div className="relative order-1 lg:order-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 lg:aspect-[4/5]">
            <ImageWithSkeleton
              src="https://res.cloudinary.com/julian-soto/image/upload/v1754782637/arte-nativo-web/ChatGPT_Image_9_ago_2025_08_35_29_p.m._gdujym.png"
              alt="Taller de estampado con diversas máquinas y productos"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              skeletonClassName="bg-secondary-foreground/10"
              priority
            />
          </div>
          <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-card px-4 py-3 text-card-foreground shadow-xl sm:left-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold">Diseño a medida</p>
              <p className="text-xs text-muted-foreground">Te ayudamos con tu idea</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
