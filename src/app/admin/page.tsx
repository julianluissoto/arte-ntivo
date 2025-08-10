// src/app/admin/page.tsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Loader2, PlusCircle, Trash2, ShieldAlert } from 'lucide-react';
import type { Category } from '@/lib/types';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

const categories: Category[] = [
    "Indumentaria",
    "Cerámica",
    "Plástico",
    "Acrílico",
    "MDF",
    "Metal",
    "Varios",
    "Papel",
    "Goma",
];

const AdminSkeleton = () => (
    <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <div className="grid grid-cols-2 gap-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
    </div>
);


export default function AdminPage() {
    const { user, isAdmin, loading: authLoading } = useAuth();
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState<Category | ''>('');
    const [imageUrls, setImageUrls] = useState(['']); // State for multiple image URLs
    const [hint, setHint] = useState('');
    const [isAvailable, setIsAvailable] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleImageChange = (index: number, value: string) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };

    const addImageField = () => {
        setImageUrls([...imageUrls, '']);
    };

    const removeImageField = (index: number) => {
        const newImageUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newImageUrls);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalImageUrls = imageUrls.map(url => url.trim()).filter(url => url !== '');

        if (!productName || !price || !category || finalImageUrls.length === 0 || !hint) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Por favor, completa todos los campos obligatorios, incluyendo al menos una URL de imagen.',
            });
            return;
        }
        
        setIsLoading(true);

        try {
            const newProduct = {
                title: productName,
                price: `$${price}`,
                category,
                description,
                images: finalImageUrls,
                hint,
                disponible: isAvailable,
                isFeatured,
            };
            
            const docRef = await addDoc(collection(db, 'products'), newProduct);
            
            toast({
                title: '¡Producto Guardado!',
                description: `El producto "${productName}" ha sido agregado con el ID: ${docRef.id}.`,
            });
            
            // Reset form
            setProductName('');
            setDescription('');
            setPrice('');
            setCategory('');
            setImageUrls(['']);
            setHint('');
            setIsAvailable(true);
            setIsFeatured(false);

            router.refresh();
            
        } catch (error) {
            console.error("Error adding document: ", error);
            toast({
                variant: 'destructive',
                title: 'Error al Guardar',
                description: 'No se pudo guardar el producto en la base de datos.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (authLoading) {
        return <AdminSkeleton />;
    }

    if (!user || !isAdmin) {
        return (
            <div className="text-center py-20 bg-card rounded-lg border border-dashed">
                <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
                <h2 className="text-2xl font-bold font-headline text-destructive">Acceso Denegado</h2>
                <p className="text-muted-foreground mt-2 mb-6">No tienes permiso para ver esta página.</p>
                <Button onClick={() => router.push('/')}>Volver al Inicio</Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Panel de Administración
                </h1>
                <p className="mt-4 text-lg text-foreground/80">
                    Añade nuevos productos a tu tienda.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Nuevo Producto</CardTitle>
                    <CardDescription>Completa los detalles para agregar un nuevo artículo.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="product-name">Nombre del Producto</Label>
                            <Input 
                                id="product-name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="Ej: Taza de Cerámica"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe el producto, sus materiales, etc."
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="price">Precio</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Ej: 6000"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Categoría</Label>
                                <Select onValueChange={(value: Category) => setCategory(value)} value={category} required>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Selecciona una categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label>URLs de las Imágenes</Label>
                            {imageUrls.map((url, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        value={url}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                        placeholder={`https://ejemplo.com/imagen${index + 1}.jpg`}
                                        required={index === 0}
                                    />
                                    {imageUrls.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => removeImageField(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addImageField}
                            >
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Añadir otra imagen
                            </Button>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="hint">AI Hint (para imágenes)</Label>
                            <Input 
                                id="hint"
                                value={hint}
                                onChange={(e) => setHint(e.target.value)}
                                placeholder="Ej: taza blanca"
                                required
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is-available"
                                    checked={isAvailable}
                                    onCheckedChange={(checked) => setIsAvailable(checked as boolean)}
                                />
                                <Label htmlFor="is-available">Disponible</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is-featured"
                                    checked={isFeatured}
                                    onCheckedChange={(checked) => setIsFeatured(checked as boolean)}
                                />
                                <Label htmlFor="is-featured">Destacado</Label>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud className="mr-2 h-4 w-4" />
                                        Guardar Producto
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}