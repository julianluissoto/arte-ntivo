// src/components/HomeSections.tsx
// Secciones de la home con estilo "tienda de personalizados":
// títulos grandes en mayúsculas, eyebrow, tarjetas con "Ver opciones →",
// pasos numerados y CTA final de cotización.
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Coffee,
  Gift,
  GraduationCap,
  MessageCircleMore,
  PackageCheck,
  Palette,
  PartyPopper,
  PenTool,
  Shirt,
  StickyNote,
  Zap,
} from "lucide-react";
import type { Category, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { phoneNumber } from "./WhatsAppButton";

const whatsappUrl = (text: string) =>
  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

/* ---------- Encabezado de sección reutilizable ---------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  className,
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  /** Usar "h1" cuando es el título principal de la página. */
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <span className="eyebrow">{eyebrow}</span>
        <Heading className="section-title mt-3">{title}</Heading>
        {subtitle && <p className="mt-3 text-muted-foreground md:text-lg">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* ---------- Servicios / técnicas ---------- */
const services = [
  {
    icon: Shirt,
    title: "Estampado textil",
    text: "Remeras, buzos, gorras y bolsas con serigrafía, DTF y vinilo textil.",
  },
  {
    icon: Coffee,
    title: "Sublimación",
    text: "Tazas, mates, botellas y textiles con colores vivos y duraderos.",
  },
  {
    icon: Zap,
    title: "Grabado láser",
    text: "Grabado y corte en MDF, acrílico, metal y cuero con terminación premium.",
  },
  {
    icon: StickyNote,
    title: "Stickers y vinilos",
    text: "Stickers personalizados con promos por cantidad para marcas y eventos.",
  },
];

export function ServicesSection() {
  return (
    <section>
      <SectionHeading
        eyebrow="Lo que hacemos"
        title="Técnicas para cada idea."
        subtitle="Combinamos distintas técnicas para lograr la mejor terminación en cada material."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Categorías con imagen ---------- */
const showcaseCategories: { name: Category; text: string }[] = [
  { name: "Indumentaria", text: "Remeras, buzos y gorras con tu diseño." },
  { name: "Cerámica", text: "Tazas y objetos sublimados." },
  { name: "MDF", text: "Cortes y grabados láser en madera." },
  { name: "Acrílico", text: "Llaveros, carteles y trofeos." },
  { name: "Metal", text: "Grabado láser en mates, termos y más." },
  { name: "Varios", text: "Stickers, bolsas y mucho más." },
];

export function CategoryShowcase({ products }: { products: Product[] }) {
  const imageFor = (category: Category) => {
    const p = products.find((x) => x.category === category && x.images?.length);
    if (!p) return null;
    return Array.isArray(p.images) ? p.images[0] : (p.images as unknown as string);
  };

  return (
    <section>
      <SectionHeading
        eyebrow="Productos personalizados"
        title="Elegí la base de tu idea."
        action={
          <Link
            href="/#all-products"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Ver todo el catálogo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {showcaseCategories.map(({ name, text }) => {
          const img = imageFor(name);
          return (
            <Link
              key={name}
              href={`/?category=${name}#all-products`}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-muted sm:aspect-[4/3]"
            >
              {img ? (
                <ImageWithSkeleton
                  src={img}
                  alt={name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-grain" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative p-4 text-white sm:p-6">
                <h3 className="font-headline text-xl font-extrabold uppercase sm:text-2xl">{name}</h3>
                <p className="mt-1 hidden text-sm text-white/80 sm:block">{text}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Ver opciones
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Para cada ocasión ---------- */
const occasions = [
  { icon: GraduationCap, title: "Colegios y egresados", text: "Buzos, remeras y recuerdos para toda la promo." },
  { icon: Briefcase, title: "Empresas y marcas", text: "Merchandising con la identidad de tu marca." },
  { icon: PartyPopper, title: "Eventos y fiestas", text: "15 años, casamientos, cumpleaños y despedidas." },
  { icon: Gift, title: "Regalos únicos", text: "Detalles personalizados para alguien especial." },
];

export function OccasionsSection() {
  return (
    <section className="rounded-[2rem] bg-muted p-6 sm:p-10 lg:p-14">
      <SectionHeading
        eyebrow="Para cada ocasión"
        title="Tu evento, con identidad."
        subtitle="Planes especiales para colegios, instituciones y pedidos por cantidad."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {occasions.map(({ icon: Icon, title, text }) => (
          <a
            key={title}
            href={whatsappUrl(`Hola! Quiero consultar por productos personalizados para: ${title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <Icon className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-1 flex-grow text-sm text-muted-foreground">{text}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Consultar
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------- Cómo comprar ---------- */
const steps = [
  { icon: Palette, title: "Elegí el producto", text: "Recorré el catálogo y elegí la base que más te guste." },
  { icon: PenTool, title: "Enviá tu diseño", text: "Mandanos tu logo, foto o idea y lo adaptamos al producto." },
  { icon: MessageCircleMore, title: "Cotizamos", text: "Te pasamos precio y tiempos por WhatsApp." },
  { icon: Zap, title: "Producimos", text: "Estampamos, sublimamos o grabamos con láser tu pedido." },
  { icon: PackageCheck, title: "Recibilo", text: "Retiralo o te lo enviamos a todo el país." },
];

export function HowToBuy() {
  return (
    <section>
      <SectionHeading
        eyebrow="Cómo comprar"
        title="De tu idea al pedido."
      />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="relative rounded-2xl border bg-card p-6">
            <span className="font-headline text-5xl font-extrabold text-primary/20">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Icon className="absolute right-6 top-7 h-6 w-6 text-primary" />
            <h3 className="mt-3 font-bold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- CTA final ---------- */
export function ClosingCTA() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-center text-primary-foreground sm:px-10 md:py-20">
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" aria-hidden />
      <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-black/10 blur-2xl" aria-hidden />
      <div className="relative mx-auto max-w-2xl">
        <h2 className="font-headline text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">
          ¿Tenés una idea?
          <br />
          Hagámosla real.
        </h2>
        <p className="mt-4 text-primary-foreground/85 md:text-lg">
          Contanos qué necesitás y te armamos una cotización sin compromiso.
        </p>
        <Button asChild size="lg" variant="secondary" className="group mt-8">
          <a
            href={whatsappUrl("Hola! Tengo una idea y quiero pedir una cotización.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pedir cotización por WhatsApp
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </section>
  );
}
