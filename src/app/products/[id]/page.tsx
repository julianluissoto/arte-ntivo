// src/app/products/[id]/page.tsx
import { getProductById } from '@/lib/data';
import { notFound } from 'next/navigation';
;
import { Skeleton } from '@/components/ui/skeleton';
import ProductDetailsClient from '../ProductDetailsClient';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailSkeleton = () => (
    <div className="max-w-6xl mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
             <div className="grid grid-cols-[80px_1fr] gap-4 items-start">
                <div className="flex flex-col gap-3 items-center">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-20 w-20 rounded-lg" />
                    <Skeleton className="h-20 w-20 rounded-lg" />
                    <Skeleton className="h-20 w-20 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="aspect-square w-full rounded-lg" />
             </div>
             <div className="space-y-6">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-12 w-1/3" />
                <div className="space-y-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-8 w-1/2" />
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-24" />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
             </div>
        </div>
    </div>
);

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
