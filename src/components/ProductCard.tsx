
"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { useFavorites } from "@/hooks/useFavorites";
import { Skeleton } from "./ui/skeleton";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { isFavorite, toggleFavorite, loading } = useFavorites();
    const isLiked = isFavorite(product.id);

    // Defensive check for images: handle both string and array of strings
    const imageUrl = Array.isArray(product.images) ? product.images[0] : product.images;

    return (
        <Link href={`/products/${product.id}`} className="flex">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col group w-full">
                <CardHeader className="p-0 relative aspect-square">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={product.title}
                            fill
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={product.hint}
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-sm text-muted-foreground">No Image</span>
                        </div>
                    )}
                    {loading ? (
                        <Skeleton className="absolute top-2 right-2 h-8 w-8 rounded-full" />
                    ) : (
                        <Button
                            size="icon"
                            variant="ghost"
                            className={cn(
                                "absolute top-2 right-2 rounded-full h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white z-10",
                                { "text-red-500": isLiked }
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(product.id);
                            }}
                            aria-label="Like product"
                        >
                            <Heart className={cn("h-4 w-4", { "fill-current": isLiked })} />
                        </Button>
                    )}
                    <div
                        className={cn(
                            "absolute bottom-2 right-2 rounded-full h-24 w-24 flex flex-col items-center justify-center text-center p-1 shadow-lg z-10",
                            product.disponible === false ? 'bg-red-600 text-primary-foreground' : 'bg-primary/90 text-primary-foreground'
                        )}
                    >
                        {product.disponible === false ? (
                           <>
                             <span className="text-md font-semibold leading-tight">Sin</span>
                             <span className="text-md font-semibold leading-tight">Stock</span>
                           </>
                        ) : (
                            <>
                                <div className="text-2xl font-bold leading-tight">{product.price}</div>
                            </>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow flex flex-col">
                    <CardTitle className="text-lg font-medium">{product.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">{product.category}</CardDescription>
                </CardContent>
            </Card>
        </Link>
    );
}
