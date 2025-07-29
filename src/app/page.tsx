
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import { getProducts } from "@/lib/data";
import type { Category, Product, Testimonial } from "@/lib/types";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getTestimonials } from "./api/testimonials/route";
import TestimonialCarousel from "@/components/TestimonialCarousel";

interface HomeProps {
  searchParams?: {
    category?: Category;
    page?: string;
  };
}

const PRODUCTS_PER_PAGE = 8;

export default async function Home({ searchParams }: HomeProps) {
  const selectedCategory = searchParams?.category ?? "Todos";
  const currentPage = Number(searchParams?.page ?? 1);

  const allProducts: Product[] = await getProducts();
  const testimonials: Testimonial[] = await getTestimonials(); // Obtén los comentarios

  const filteredProductsByCategory =
    selectedCategory === "Todos"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProductsByCategory.length / PRODUCTS_PER_PAGE);
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const productsForCurrentPage = filteredProductsByCategory.slice(offset, offset + PRODUCTS_PER_PAGE);

  const featuredProducts = allProducts.filter((p) => p.isFeatured);
  
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/?${params.toString()}`;
  };

  return (
    <div className="space-y-8">
      {selectedCategory === 'Todos' && featuredProducts.length > 0 && currentPage === 1 && (
        <section className="mb-12">
            <h2 className="text-3xl font-bold font-headline mb-6 text-center text-primary">
                Productos Destacados
            </h2>
            <div className="overflow-hidden">
              <ProductCarousel products={featuredProducts} />
            </div>
        </section>
      )}

      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <h2 className="text-3xl font-bold font-headline text-primary">
            {selectedCategory === 'Todos' ? 'Todos los Productos' : selectedCategory}
          </h2>
        </div>

        {productsForCurrentPage.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productsForCurrentPage.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-lg border border-dashed">
            <p className="text-xl text-muted-foreground">No hay productos en esta categoría.</p>
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <section className="pt-8">
           <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href={createPageURL(currentPage - 1)} />
                    </PaginationItem>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                        <PaginationLink href={createPageURL(page)} isActive={currentPage === page}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext href={createPageURL(currentPage + 1)} />
                    </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
        </section>
      )}
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
