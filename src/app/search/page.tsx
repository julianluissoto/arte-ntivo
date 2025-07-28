// src/app/search/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { useEffect, useState, Suspense } from 'react';
import { Product } from '@/lib/types';
import { getProducts } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

const SearchSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
             <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                </div>
            </div>
        ))}
    </div>
);

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const allProducts = await getProducts();
      setProducts(allProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

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
        {loading ? (
            <SearchSkeleton />
        ) : filteredProducts.length > 0 ? (
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

export default function SearchPage() {
    return (
        <Suspense fallback={<SearchSkeleton />}>
            <SearchResults />
        </Suspense>
    );
}
