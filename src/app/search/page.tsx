// src/app/search/page.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SearchX, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { SectionHeading } from '@/components/HomeSections';
import { EmptyState, ProductGridSkeleton, productGridClass } from '@/components/PageStates';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';

/** Minúsculas y sin acentos, para que "ceramica" encuentre "Cerámica". */
const normalize = (s?: string) =>
  (s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function SearchResults() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Si se busca desde el header estando ya en /search, actualizamos el término.
  useEffect(() => setSearchTerm(initialQuery), [initialQuery]);

  useEffect(() => {
    getProducts().then((all) => {
      setProducts(all);
      setLoading(false);
    });
  }, []);

  const q = normalize(debouncedSearchTerm.trim());
  const filteredProducts = q
    ? products.filter((p) => [p.title, p.description, p.category].some((field) => normalize(field).includes(q)))
    : products;

  return (
    <div>
      <SectionHeading
        as="h1"
        eyebrow="Buscar"
        title={q ? `Resultados para "${debouncedSearchTerm.trim()}".` : 'Buscá tu producto.'}
        subtitle={loading ? undefined : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'producto' : 'productos'}`}
      />

      <div className="relative mb-8 md:mb-10">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscá por nombre, descripción o categoría…"
          className="h-14 rounded-full pl-14 pr-14 text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full"
            onClick={() => setSearchTerm('')}
            aria-label="Borrar búsqueda"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </Button>
        )}
      </div>

      {loading ? (
        <ProductGridSkeleton />
      ) : filteredProducts.length > 0 ? (
        <div className={productGridClass}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={SearchX}
          title="Sin resultados"
          text={`No encontramos productos para "${debouncedSearchTerm.trim()}". Probá con otra palabra o consultanos por WhatsApp: hacemos muchos productos a pedido.`}
        />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <SearchResults />
    </Suspense>
  );
}
