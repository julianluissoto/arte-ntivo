// src/app/favorites/page.tsx
'use client';

import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { getProducts } from "@/lib/data";

const FavoritesSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
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


export default function FavoritesPage() {
    const { user, loading: authLoading } = useAuth();
    const { favoriteIds, loading: favoritesLoading } = useFavorites();
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true);
            const allProducts = await getProducts();
            setProducts(allProducts);
            setLoadingProducts(false);
        };
        fetchProducts();
    }, []);

    const isLoading = authLoading || favoritesLoading || loadingProducts;

    if (isLoading) {
        return (
             <div className="space-y-8">
                <section>
                    <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Mis Favoritos
                    </h1>
                    <p className="mt-4 text-lg text-foreground/80">
                    Cargando tus productos guardados...
                    </p>
                </section>
                <section>
                    <FavoritesSkeleton />
                </section>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="text-center py-20 bg-card rounded-lg border border-dashed">
                <h2 className="text-2xl font-bold font-headline text-primary">Inicia Sesión para Ver tus Favoritos</h2>
                <p className="text-muted-foreground mt-2 mb-6">Para guardar y ver los productos que te gustan, necesitas una cuenta.</p>
                <Button asChild>
                    <Link href="/login">Iniciar Sesión</Link>
                </Button>
            </div>
        )
    }
    
    const favoriteProducts = products.filter(p => favoriteIds.includes(p.id));

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Mis Favoritos
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Aquí encontrarás todos los productos que te han gustado.
        </p>
      </section>

      <section>
        {favoriteProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {favoriteProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-card rounded-lg border border-dashed">
                <p className="text-xl text-muted-foreground">Todavía no tienes favoritos.</p>
                <p className="text-muted-foreground mt-2">¡Empieza a explorar y guarda lo que más te guste!</p>
            </div>
        )}
      </section>
    </div>
  );
}
