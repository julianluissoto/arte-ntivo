// src/app/page.tsx
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import { getProducts, getReviews, getNews } from "@/lib/data"; // Tus funciones de Firestore
import type { Category, Product, Review, News } from "@/lib/types"; // Importa Review y News
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import CustomerReviews from "@/components/CustomerReviews";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Ticker from "@/components/Ticker";
import NewsCard from "@/components/NewsCard"; // Importar la nueva tarjeta
import HeroSection from "@/components/HeroSection"; // Importar el nuevo componente
import NewsletterForm from "@/components/NewsletterForm";
import {
  SectionHeading,
  ServicesSection,
  CategoryShowcase,
  OccasionsSection,
  HowToBuy,
  ClosingCTA,
} from "@/components/HomeSections";
import type { Metadata } from "next";
import { baseOpenGraph, categorySeo, siteName } from "@/lib/site";

interface HomeProps {
  searchParams?: {
    category?: Category;
    page?: string;
  };
}

const PRODUCTS_PER_PAGE = 8;

export const revalidate = 60;

export function generateMetadata({ searchParams }: HomeProps): Metadata {
  const category = searchParams?.category;
  const seo = category && category !== "Todos" ? categorySeo[category] : undefined;
  if (!seo) return { alternates: { canonical: "/" }, openGraph: { ...baseOpenGraph, url: "/" } };

  // Sin canonical ni og:url: Next 14 descarta el query string cuando la ruta es "/" y los
  // dejaría apuntando a la home. Sin la etiqueta, Google toma la URL de la categoría como propia.
  return {
    // "absolute" porque la plantilla "%s | Arte Nativo" no aplica al mismo segmento que el layout.
    title: { absolute: `${seo.title} | ${siteName}` },
    description: seo.description,
    openGraph: { ...baseOpenGraph, title: seo.title, description: seo.description },
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const selectedCategory = searchParams?.category ?? "Todos";
  const currentPage = Number(searchParams?.page ?? 1);

  const [allProducts, reviews, allNews]: [Product[], Review[], News[]] = await Promise.all([
    getProducts(),
    getReviews(),
    getNews(),
  ]);

  const filteredProductsByCategory =
    selectedCategory === "Todos"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProductsByCategory.length / PRODUCTS_PER_PAGE);
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const productsForCurrentPage = filteredProductsByCategory.slice(offset, offset + PRODUCTS_PER_PAGE);

  const featuredProducts = allProducts.filter((p) => p.isFeatured);
  
  const tickerMessages1 = [
    "Vos lo imaginás, nosotros lo personalizamos",
    "Promos por cantidad en stickers",
    "Todos los medios de pago",
    "12 años de experiencia"
  ];

  const tickerMessages2 = [
    "Estampado textil",
    "Sublimación",
    "Grabado láser",
    "Planes para colegios e instituciones"
  ];

  const isHome = selectedCategory === 'Todos' && currentPage === 1;


  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/?${params.toString()}`;
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {isHome && (
        <div className="space-y-6">
          <HeroSection />
          <Ticker messages={tickerMessages1} direccion="izq" />
        </div>
      )}

      {isHome && <CategoryShowcase products={allProducts} />}

      {isHome && featuredProducts.length > 0 && (
        <section>
          <SectionHeading
            eyebrow="Lo más pedido"
            title="Productos destacados."
          />
          <div className="overflow-hidden -mx-2 pb-8">
            <ProductCarousel products={featuredProducts} />
          </div>
        </section>
      )}

      {isHome && <ServicesSection />}

      {isHome && <Ticker messages={tickerMessages2} direccion="der" />}

      <section id="all-products" className="scroll-mt-24">
        <SectionHeading
          eyebrow={selectedCategory === 'Todos' ? 'Catálogo' : 'Categoría'}
          title={selectedCategory === 'Todos' ? 'Todos los productos.' : `${selectedCategory}.`}
          subtitle={`${filteredProductsByCategory.length} productos para personalizar`}
          as={isHome ? "h2" : "h1"}
        />

        {productsForCurrentPage.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {productsForCurrentPage.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted rounded-2xl border border-dashed">
            <p className="text-xl text-muted-foreground">No hay productos en esta categoría.</p>
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <section className="!mt-10">
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
        <>
          <OccasionsSection />

          <HowToBuy />

          <section className="space-y-12">
            <div>
              <SectionHeading
                eyebrow="Testimonios"
                title="Lo que dicen nuestros clientes."
              />
              {reviews.length > 0 ? (
                <TestimonialCarousel testimonials={reviews} />
              ) : (
                <p className="text-muted-foreground">Todavía no hay reseñas. ¡Sé el primero!</p>
              )}
            </div>

            <CustomerReviews />
          </section>

          {allNews.length > 0 && (
            <section>
              <SectionHeading eyebrow="Novedades" title="Trabajos y novedades." />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allNews.map((newsItem) => (
                  <NewsCard key={newsItem.id} news={newsItem} />
                ))}
              </div>
            </section>
          )}

          <ClosingCTA />

          <NewsletterForm />
        </>
      )}

    </div>
  );
}
