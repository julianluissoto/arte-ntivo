// src/components/EditProductForm.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, PlusCircle, Trash2 } from 'lucide-react';
import type { Category, Product } from '@/lib/types';
import { updateProduct } from '@/lib/data';

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

interface EditProductFormProps {
    product: Product;
}

export default function EditProductForm({ product }: EditProductFormProps) {
    const [productName, setProductName] = useState(product.title);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price.replace('$', ''));
    const [salePrice, setSalePrice] = useState(product.salePrice?.replace('$', '') || '');
    const [category, setCategory] = useState<Category>(product.category);
    const [imageUrls, setImageUrls] = useState<string[]>(Array.isArray(product.images) ? product.images : [product.images]);
    const [hint, setHint] = useState(product.hint);
    const [isAvailable, setIsAvailable] = useState(product.disponible ?? true);
    const [isFeatured, setIsFeatured] = useState(product.isFeatured ?? false);
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
                description: 'Por favor, completa todos los campos obligatorios.',
            });
            return;
        }
        
        setIsLoading(true);

        try {
            const updatedProduct: Partial<Product> = {
                title: productName,
                price: `$${price}`,
                category,
                description,
                images: finalImageUrls,
                hint,
                disponible: isAvailable,
                isFeatured,
                salePrice: salePrice ? `$${salePrice}` : '', // Add or clear sale price
            };
            
            await updateProduct(product.id, updatedProduct);
            
            toast({
                title: '¡Producto Actualizado!',
                description: `El producto "${productName}" ha sido actualizado correctamente.`,
            });

            router.refresh(); 
            
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error al Actualizar',
                description: 'No se pudo actualizar el producto en la base de datos.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                    <Label htmlFor="price">Precio Original</Label>
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
                    <Label htmlFor="sale-price">Precio de Oferta (Opcional)</Label>
                    <Input
                        id="sale-price"
                        type="number"
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                        placeholder="Dejar vacío si no está en oferta"
                    />
                </div>
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
                            Guardando Cambios...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Guardar Cambios
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
