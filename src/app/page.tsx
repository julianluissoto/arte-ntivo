
import { products } from "@/lib/mock-data";
import ProductCard from "@/components/ProductCard";
import type { Category } from "@/lib/mock-data";
import ProductCarousel from "@/components/ProductCarousel";

interface HomeProps {
  searchParams?: {
    category?: Category;
  };
}

export default function Home({ searchParams }: HomeProps) {
  const selectedCategory = searchParams?.category ?? "Todos";

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="space-y-8">
      {selectedCategory === 'Todos' && (
        <section className="mb-12">
            <h2 className="text-3xl font-bold font-headline mb-6 text-center text-primary">
                Productos Destacados
            </h2>
            <ProductCarousel products={featuredProducts} />
        </section>
      )}

      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <h2 className="text-3xl font-bold font-headline text-primary">
            {selectedCategory === 'Todos' ? 'Todos los Productos' : selectedCategory}
          </h2>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-lg border border-dashed">
            <p className="text-xl text-muted-foreground">No hay productos en esta categoría.</p>
          </div>
        )}
      </section>
    </div>
  );
}
