
"use client";

import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import Link from "next/link";
import { Heart, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { useFavorites } from "@/hooks/useFavorites";
import { Skeleton } from "./ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { deleteProduct } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Badge } from "./ui/badge";


interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { isFavorite, toggleFavorite, loading: favLoading } = useFavorites();
    const { user, loading: authLoading, isAdmin } = useAuth(); // Use isAdmin from hook
    const { toast } = useToast();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const isLiked = isFavorite(product.id);
    const imageUrl = Array.isArray(product.images) ? product.images[0] : product.images;

    const handleDelete = async () => {
        if (!isAdmin) {
            toast({
                variant: 'destructive',
                title: 'No autorizado',
                description: 'No tienes permiso para eliminar productos.',
            });
            return;
        }
        setIsDeleting(true);
        try {
            await deleteProduct(product.id);
            toast({
                title: "¡Producto Eliminado!",
                description: `El producto "${product.title}" ha sido eliminado.`,
            });
            router.refresh();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error al Eliminar',
                description: 'No se pudo eliminar el producto de la base de datos.',
            });
        } finally {
            setIsDeleting(false);
        }
    };
    

    return (
        <Card className="overflow-hidden border-0 bg-transparent shadow-none flex flex-col group w-full">
            <CardHeader className="p-0 relative aspect-square overflow-hidden rounded-2xl bg-muted space-y-0">
                 <Link href={`/products/${product.id}`} className="absolute inset-0 z-0">
                    {imageUrl ? (
                        <ImageWithSkeleton
                            src={imageUrl}
                            alt={product.title}
                            fill
                            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            data-ai-hint={product.hint}
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-sm text-muted-foreground">No Image</span>
                        </div>
                    )}
                 </Link>

                <span className="pointer-events-none absolute inset-x-3 bottom-3 z-10 hidden translate-y-2 items-center justify-center rounded-full bg-background/95 py-2 text-xs font-semibold text-foreground opacity-0 shadow-md backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
                    Ver producto →
                </span>

                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                    {authLoading ? (
                        <Skeleton className="h-8 w-8 rounded-full" />
                    ) : (
                        <>
                            {user && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className={cn(
                                                "rounded-full h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white",
                                                { "text-red-500": isLiked }
                                            )}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                // Only add to favorites directly. 
                                                // Removal is handled by the AlertDialog.
                                                if (!isLiked) {
                                                    toggleFavorite(product.id);
                                                }
                                            }}
                                            aria-label="Like product"
                                            disabled={favLoading}
                                        >
                                            <Heart className={cn("h-4 w-4", { "fill-current": isLiked })} />
                                        </Button>
                                    </AlertDialogTrigger>
                                     {isLiked && (
                                        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Quitar de favoritos?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta acción eliminará
                                                    <span className="font-bold"> {product.title} </span>
                                                    de tu lista de productos favoritos.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => toggleFavorite(product.id)}>
                                                    Quitar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    )}
                                </AlertDialog>
                            )}

                             {isAdmin && (
                                 <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="rounded-full h-8 w-8 bg-destructive/80 text-destructive-foreground backdrop-blur-sm hover:bg-destructive"
                                            onClick={(e) => e.stopPropagation()}
                                            aria-label="Delete product"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción no se puede deshacer. Esto eliminará permanentemente el producto
                                            <span className="font-bold"> {product.title} </span>
                                            de la base de datos.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                                            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Eliminar
                                        </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                        </>
                    )}
                </div>
                 {product.salePrice && (
                    <Badge className="absolute top-3 left-3 z-10 rounded-full bg-primary px-2.5 uppercase tracking-wider hover:bg-primary">Oferta</Badge>
                )}
                 {!product.disponible && (
                     <Badge variant="secondary" className="absolute top-3 left-3 z-10 rounded-full px-2.5 uppercase tracking-wider" style={product.salePrice ? { top: '2.5rem' } : undefined}>Sin stock</Badge>
                )}
            </CardHeader>
             <Link href={`/products/${product.id}`} className="flex flex-col flex-grow">
                <CardContent className="px-1 pt-3 pb-0 flex flex-col flex-grow">
                    <CardDescription className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">{product.category}</CardDescription>
                    <CardTitle className="mt-1 font-body text-sm md:text-base font-semibold leading-snug tracking-normal line-clamp-2 group-hover:text-primary transition-colors">
                        {product.title}
                    </CardTitle>
                    <div className="mt-2 flex items-baseline gap-2">
                        {product.salePrice ? (
                            <>
                                <p className="text-base md:text-lg font-bold text-foreground">
                                    {product.salePrice}
                                </p>
                                <p className="text-sm text-muted-foreground line-through">
                                    {product.price}
                                </p>
                            </>
                        ) : (
                            <p className="text-base md:text-lg font-bold text-foreground">
                                {product.price}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
}
