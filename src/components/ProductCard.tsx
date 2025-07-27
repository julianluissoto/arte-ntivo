
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/mock-data";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Link href={`/products/${product.id}`} className="flex">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col group w-full">
        <CardHeader className="p-0 relative aspect-square">
            <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.hint}
            />
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
                    setIsLiked(!isLiked)
                }}
                aria-label="Like product"
            >
                <Heart className={cn("h-4 w-4", { "fill-current": isLiked })} />
            </Button>
            <div className="absolute bottom-2 right-2 bg-primary/90 text-primary-foreground rounded-full h-20 w-20 flex flex-col items-center justify-center text-center p-1 shadow-lg z-10">
                <div className="text-xl font-bold leading-tight">{product.price}</div>
                <div className="text-[10px] leading-tight opacity-80">+IMPUESTOS</div>
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
