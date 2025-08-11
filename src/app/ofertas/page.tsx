
// src/app/ofertas/page.tsx
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function OfertasPage() {
  const allProducts: Product[] = await getProducts();
  const offerProducts = allProducts.filter(p => p.salePrice && p.disponible);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          🔥 Ofertas Imperdibles 🔥
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          ¡Aprovecha nuestros descuentos especiales! Encuentra productos increíbles a precios que no podrás resistir.
        </p>
      </section>

      <section>
        {offerProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {offerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-lg border border-dashed">
            <p className="text-xl text-muted-foreground">¡Vaya! Parece que no hay ofertas en este momento.</p>
            <p className="text-muted-foreground mt-2">Vuelve a visitarnos pronto para encontrar grandes descuentos.</p>
          </div>
        )}
      </section>
    </div>
  );
}
