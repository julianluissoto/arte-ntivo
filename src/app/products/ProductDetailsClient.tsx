// src/app/products/[id]/ProductDetailsClient.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brush, Minus, Plus, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import EditProductForm from '@/components/EditProductForm';

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.options?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.options?.sizes?.[0]);
  
  const imageUrls = Array.isArray(product.images) ? product.images : (product.images ? [product.images] : []);
  
  const [selectedImage, setSelectedImage] = useState<string>(imageUrls[0] ?? '');

  useEffect(() => {
    const newImageUrls = Array.isArray(product.images) ? product.images : (product.images ? [product.images] : []);
    setSelectedImage(newImageUrls[0] ?? '');
    setSelectedColor(product.options?.colors?.[0]);
    setSelectedSize(product.options?.sizes?.[0]);
  }, [product]);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Product Image Gallery */}
        <div className="flex flex-col-reverse md:grid md:grid-cols-[80px_1fr] gap-4 items-start overflow-hidden">
            <div className="w-full md:w-auto flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar py-2 md:py-0 md:max-h-[480px]">
                {imageUrls.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={cn(
                            "relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                            selectedImage === image ? 'border-primary' : 'border-transparent hover:border-primary/50'
                        )}
                    >
                        <Image
                            src={image}
                            alt={`${product.title} thumbnail ${index + 1}`}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                        />
                    </button>
                ))}
            </div>
            <div className="aspect-square w-full relative bg-card border rounded-lg overflow-hidden">
                {selectedImage ? (
                    <Image
                        src={selectedImage}
                        alt={product.title}
                        fill
                        className="object-contain"
                        data-ai-hint={product.hint}
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">No hay imagen</span>
                    </div>
                )}
            </div>
        </div>


        {/* Product Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-primary">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.title}</h1>
            </div>
            {user && (
              <Sheet>
                <SheetTrigger asChild>
                   <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                   </Button>
                </SheetTrigger>
                <SheetContent className="w-full md:w-[500px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Editar Producto</SheetTitle>
                      <SheetDescription>
                        Realiza cambios en los detalles del producto. Haz clic en guardar cuando termines.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-4">
                       <EditProductForm product={product} />
                    </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
          
          <p className="text-muted-foreground">{product.description}</p>
          
          <p className={cn("text-4xl font-bold", !product.disponible ? 'text-red-600' : 'text-primary')}>
            {product.disponible === false ? 'Sin Stock' : product.price}
          </p>

          <div className="space-y-4">
            {/* Color Options */}
            {product.options?.colors && product.options.colors.length > 0 && (
              <div className="space-y-2">
                <Label>Color</Label>
                <RadioGroup 
                    value={selectedColor} 
                    onValueChange={setSelectedColor}
                    className="flex items-center gap-2"
                >
                    {product.options.colors.map(color => (
                        <RadioGroupItem 
                            key={color} 
                            value={color}
                            id={`color-${color}`}
                            className="h-8 w-8 rounded-full border-2 border-transparent"
                            style={{backgroundColor: color}}
                            aria-label={`Color ${color}`}
                        >
                           <span className={cn(
                               "h-full w-full rounded-full ring-2 ring-offset-2 ring-transparent",
                               selectedColor === color && "ring-primary"
                           )}></span>
                        </RadioGroupItem>
                    ))}
                </RadioGroup>
              </div>
            )}

            {/* Size Options */}
            {product.options?.sizes && product.options.sizes.length > 0 && (
              <div className="space-y-2 max-w-[200px]">
                <Label htmlFor="size-select">Talle</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger id="size-select">
                    <SelectValue placeholder="Selecciona un talle" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.options.sizes.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Label>Cantidad</Label>
            <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)}>
                    <Minus className="h-4 w-4" />
                </Button>
                <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-x border-y-0 focus-visible:ring-0"
                />
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button size="lg" className="w-full" disabled={product.disponible === false}>Agregar al Carrito</Button>
            {product.disponible !== false && (
                <Button size="lg" variant="outline" className="w-full" asChild>
                    <Link href="/crear">
                        <Brush className="mr-2 h-5 w-5" />
                        Personalizar
                    </Link>
                </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
