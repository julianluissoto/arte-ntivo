// app/page.tsx
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import { getProducts, getReviews } from "@/lib/data"; // Tus funciones de Firestore
import type { Category, Product, Review } from "@/lib/types"; // Importa Review
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import CustomerReviews from "@/components/CustomerReviews";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Ticker from "@/components/Ticker";

interface HomeProps {
  searchParams?: {
    category?: Category;
    page?: string;
  };
}

const PRODUCTS_PER_PAGE = 8;

export const revalidate = 60;


export default async function Home({ searchParams }: HomeProps) {
  const selectedCategory = searchParams?.category ?? "Todos";
  const currentPage = Number(searchParams?.page ?? 1);

  const allProducts: Product[] = await getProducts();
  const reviews: Review[] = await getReviews(); // Usando Review

  const filteredProductsByCategory =
    selectedCategory === "Todos"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProductsByCategory.length / PRODUCTS_PER_PAGE);
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const productsForCurrentPage = filteredProductsByCategory.slice(offset, offset + PRODUCTS_PER_PAGE);

  const featuredProducts = allProducts.filter((p) => p.isFeatured);
const tickerMessages = [
    "¡Aprovecha las promos por cantidad en stickers!",
    "Recibimos todos los medios de pago",
    "12 años de experiencia"
  ];
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/?${params.toString()}`;
  };

  return (
    <div className="space-y-12">
      <Ticker messages={tickerMessages} />
      {selectedCategory === 'Todos' && featuredProducts.length > 0 && currentPage === 1 && (
        <section>
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

      {selectedCategory === 'Todos' && (
        <section className="py-12 border-t space-y-12">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-8 text-center text-primary">
              Lo que dicen nuestros clientes
            </h2>
            {reviews.length > 0 ? (
              <TestimonialCarousel testimonials={reviews} />
            ) : (
              <p className="text-center text-muted-foreground">Todavía no hay reseñas. ¡Sé el primero!</p>
            )}
          </div>

          <CustomerReviews />

        </section>
      )}

    </div>
  );
}