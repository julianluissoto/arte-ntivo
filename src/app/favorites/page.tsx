// src/app/favorites/page.tsx
'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, LogIn } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { SectionHeading } from "@/components/HomeSections";
import { EmptyState, ProductGridSkeleton, productGridClass } from "@/components/PageStates";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { getProducts } from "@/lib/data";
import type { Product } from "@/lib/types";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const { favoriteIds, loading: favoritesLoading } = useFavorites();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    getProducts().then((products) => {
      setAllProducts(products);
      setLoadingProducts(false);
    });
  }, []);

  const favoriteProducts = allProducts.filter((p) => favoriteIds.includes(p.id));
  const isLoading = authLoading || favoritesLoading || loadingProducts;

  return (
    <div>
      <SectionHeading
        as="h1"
        eyebrow="Tu selección"
        title="Mis favoritos."
        subtitle={
          !isLoading && user && favoriteProducts.length > 0
            ? `${favoriteProducts.length} ${favoriteProducts.length === 1 ? "producto guardado" : "productos guardados"}.`
            : undefined
        }
      />

      {isLoading ? (
        <ProductGridSkeleton count={4} />
      ) : !user ? (
        <EmptyState
          icon={LogIn}
          title="Ingresá para ver tus favoritos"
          text="Con tu cuenta podés guardar los productos que te gustan y encontrarlos rápido."
          action={
            <Button asChild size="lg">
              <Link href="/login">Ingresar</Link>
            </Button>
          }
        />
      ) : favoriteProducts.length > 0 ? (
        <div className={productGridClass}>
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="Todavía no tenés favoritos"
          text="Tocá el corazón en cualquier producto para guardarlo acá."
          action={
            <Button asChild size="lg" className="group">
              <Link href="/#all-products">
                Explorar productos
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
