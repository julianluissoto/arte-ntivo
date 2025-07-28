// app/page.tsx
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import TestimonialCarousel from "@/components/TestimonialCarousel"; // Importa el nuevo componente
import { getProducts } from "@/lib/data";
import { getTestimonials } from "./api/testimonials/route"; // Importa la nueva función para testimonios
import type { Category, Product, Testimonial } from "@/lib/types"; // Asegúrate de importar Testimonial

interface HomeProps {
  searchParams?: {
    category?: Category;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const selectedCategory = searchParams?.category ?? "Todos";

  const products: Product[] = await getProducts();
  const testimonials: Testimonial[] = await getTestimonials(); // Obtén los comentarios

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="space-y-8">
      {selectedCategory === "Todos" && featuredProducts.length > 0 && (
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
            {selectedCategory === "Todos" ? "Todos los Productos" : selectedCategory}
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
      {/* Sección del Carrusel de Comentarios de Usuarios */}
      {selectedCategory === "Todos" && testimonials.length > 0 && (
        <section className="mb-12 py-8 ">
          <h2 className="text-3xl font-bold font-headline mb-8 text-center text-primary">
            Lo que dicen nuestros clientes
          </h2>
          <TestimonialCarousel testimonials={testimonials} />
        </section>
      )}
    </div>
  );
}