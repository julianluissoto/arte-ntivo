import { products } from "@/lib/mock-data";
import ProductCard from "@/components/ProductCard";

export default function FavoritesPage() {
    // Mock: show a few "liked" products
    const favoriteProducts = products.slice(0, 3);

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
