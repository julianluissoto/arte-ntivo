// src/app/products/[id]/page.tsx
import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/data';
import { parsePrice } from '@/lib/cart-utils';
import { baseOpenGraph, siteName, siteUrl, truncate } from '@/lib/site';
import ProductDetailsClient from '../ProductDetailsClient';

interface ProductDetailPageProps {
  params: { id: string };
}

// generateMetadata y la página piden el mismo producto: lo cacheamos por request.
const getProduct = cache(getProductById);

const imagesOf = (images: unknown): string[] =>
  Array.isArray(images) ? images : typeof images === 'string' && images ? [images] : [];

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) return { title: 'Producto no encontrado', robots: { index: false } };

  const description = truncate(
    product.description ||
      `${product.title} personalizado en Arte Nativo. ${product.category}: hacé tu pedido y consultanos por WhatsApp.`
  );
  const images = imagesOf(product.images);
  const url = `/products/${product.id}`;

  return {
    title: product.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...baseOpenGraph,
      url,
      title: `${product.title} | ${siteName}`,
      description,
      ...(images.length > 0 && { images: images.slice(0, 4).map((src) => ({ url: src, alt: product.title })) }),
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description,
      images: images.slice(0, 1),
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const price = parsePrice(product.salePrice) || parsePrice(product.price);
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: imagesOf(product.images),
    category: product.category,
    brand: { '@type': 'Brand', name: siteName },
    ...(price > 0 && {
      offers: {
        '@type': 'Offer',
        url: `${siteUrl}/products/${product.id}`,
        priceCurrency: 'ARS',
        price,
        availability:
          product.disponible === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, '\\u003c') }}
      />
      <ProductDetailsClient product={product} />
    </>
  );
}
