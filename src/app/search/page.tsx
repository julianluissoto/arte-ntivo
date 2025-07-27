// src/app/search/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/mock-data';
import ProductCard from '@/components/ProductCard';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const filteredProducts = query
    ? products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Resultados de Búsqueda
        </h1>
        {query ? (
            <p className="mt-4 text-lg text-foreground/80">
                Mostrando resultados para: <span className="font-semibold">{query}</span>
            </p>
        ) : (
            <p className="mt-4 text-lg text-foreground/80">
                Por favor, ingresa un término de búsqueda.
            </p>
        )}
      </section>

      <section>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          query && (
            <div className="text-center py-20 bg-card rounded-lg border border-dashed">
                <p className="text-xl text-muted-foreground">No se encontraron productos.</p>
                <p className="text-muted-foreground mt-2">Intenta con otro término de búsqueda.</p>
            </div>
          )
        )}
      </section>
    </div>
  );
}
