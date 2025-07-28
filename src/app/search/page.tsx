
// src/app/search/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { useEffect, useState, Suspense } from 'react';
import { Product } from '@/lib/types';
import { getProducts } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Search, XCircle } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '@/components/ui/button';

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
  const initialQuery = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const allProducts = await getProducts();
      setProducts(allProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = debouncedSearchTerm
    ? products.filter(product =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : products;

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Búsqueda de Productos
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Encuentra lo que necesitas escribiendo en el campo de abajo.
        </p>
      </section>

      <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por nombre, descripción, categoría..."
            className="w-full pl-12 pr-10 text-lg p-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
              <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-4 -translate-y-1/2 h-8 w-8 rounded-full"
                  onClick={() => setSearchTerm('')}
              >
                  <XCircle className="h-6 w-6 text-muted-foreground" />
              </Button>
          )}
      </div>

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
          debouncedSearchTerm && (
            <div className="text-center py-20 bg-card rounded-lg border border-dashed">
                <p className="text-xl text-muted-foreground">No se encontraron productos para "{debouncedSearchTerm}".</p>
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
