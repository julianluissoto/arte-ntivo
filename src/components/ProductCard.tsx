// src/components/ProductCard.tsx
"use client";

import Image from "next/image";
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


interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { isFavorite, toggleFavorite, loading: favLoading } = useFavorites();
    const { user, loading: authLoading } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    // Estado para controlar la apertura del AlertDialog de favoritos
    const [showRemoveFromFavDialog, setShowRemoveFromFavDialog] = useState(false);

    const isLiked = isFavorite(product.id);
    const imageUrl = Array.isArray(product.images) ? product.images[0] : product.images;

    const handleDelete = async () => {
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

    // Manejador para el click del botón de favorito
    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLiked) {
            // Si ya es favorito, abrimos el AlertDialog para confirmar la eliminación
            setShowRemoveFromFavDialog(true);
        } else {
            // Si no es favorito, lo añadimos directamente
            toggleFavorite(product.id);
        }
    };

    // Función para confirmar la eliminación desde el AlertDialog
    const confirmRemoveFavorite = () => {
        toggleFavorite(product.id); // Llama a toggleFavorite para eliminarlo
        setShowRemoveFromFavDialog(false); // Cierra el diálogo
    };


    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col group w-full">
            <CardHeader className="p-0 relative aspect-square">
                <Link href={`/products/${product.id}`} className="absolute inset-0 z-0">
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
                </Link>

                <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
                    {authLoading ? (
                        <Skeleton className="h-8 w-8 rounded-full" />
                    ) : (
                        <>
                            {user && (
                                <AlertDialog open={showRemoveFromFavDialog} onOpenChange={setShowRemoveFromFavDialog}>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className={cn(
                                                "rounded-full h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-black",
                                                { "text-red-500": isLiked }
                                            )}
                                            onClick={handleToggleFavorite} // Usa el nuevo manejador
                                            aria-label="Like product"
                                            disabled={favLoading}
                                        >
                                            <Heart className={cn("h-4 w-4", { "fill-current": isLiked })} />
                                        </Button>
                                    </AlertDialogTrigger>
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
                                            <AlertDialogAction onClick={confirmRemoveFavorite}> {/* Llama a la función de confirmación */}
                                                Quitar
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}

                            {user && (
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

                <div
                    className={cn(
                       "absolute bottom-2 right-2 rounded-full flex flex-col items-center justify-center text-center p-1 shadow-lg z-10",
                        "h-16 w-16 md:h-24 md:w-24", // Smaller on mobile, larger on desktop
                        product.disponible === false ? 'bg-red-600 text-primary-foreground' : 'bg-primary/90 text-primary-foreground'
                    )}
                >
                    {product.disponible === false ? (
                        <>
                        <span className="text-sm md:text-md font-semibold leading-tight">Sin</span>
                         <span className="text-sm md:text-md font-semibold leading-tight">Stock</span>
                        </>
                    ) : (
                        <>
                            <div className="text-l md:text-2xl font-bold leading-tight">{product.price}</div>
                        </>
                    )}
                </div>
            </CardHeader>
            <Link href={`/products/${product.id}`} className="flex flex-col flex-grow">
                <CardContent className="p-4 flex-grow flex flex-col">
                    <CardTitle className="text-lg font-medium">{product.title}</CardTitle>
                </CardContent>
            </Link>
        </Card>
    );
}