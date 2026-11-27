// src/app/ofertas/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { SectionHeading, ClosingCTA } from "@/components/HomeSections";
import { EmptyState, productGridClass } from "@/components/PageStates";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import { baseOpenGraph } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Ofertas en productos personalizados",
  description:
    "Descuentos en remeras, tazas, mates, llaveros y más productos personalizados. Aprovechá las ofertas de Arte Nativo Estampados.",
  alternates: { canonical: "/ofertas" },
  openGraph: {
    ...baseOpenGraph,
    url: "/ofertas",
    title: "Ofertas en productos personalizados | Arte Nativo Estampados",
    description: "Descuentos en remeras, tazas, mates, llaveros y más productos personalizados.",
  },
};

export default async function OfertasPage() {
  const allProducts: Product[] = await getProducts();
  const offerProducts = allProducts.filter((p) => p.salePrice && p.disponible);

  return (
    <div className="space-y-16 md:space-y-24">
      <section>
        <SectionHeading
          as="h1"
          eyebrow="Ofertas"
          title="Precios que no se repiten."
          subtitle={
            offerProducts.length > 0
              ? `${offerProducts.length} ${offerProducts.length === 1 ? "producto" : "productos"} con descuento por tiempo limitado.`
              : "Descuentos especiales por tiempo limitado."
          }
        />

        {offerProducts.length > 0 ? (
          <div className={productGridClass}>
            {offerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Flame}
            title="No hay ofertas por ahora"
            text="Volvé pronto: cada tanto sumamos descuentos especiales. Mientras, mirá todo el catálogo."
            action={
              <Button asChild size="lg" className="group">
                <Link href="/#all-products">
                  Ver catálogo
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            }
          />
        )}
      </section>

      <ClosingCTA />
    </div>
  );
}
