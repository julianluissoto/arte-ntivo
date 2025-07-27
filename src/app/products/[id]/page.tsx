'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brush, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = products.find(p => p.id.toString() === params.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.options?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.options?.sizes?.[0]);
  const [selectedImage, setSelectedImage] = useState<string>(product?.images?.[0] ?? '');

  if (!product) {
    notFound();
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Galería de imágenes */}
        <div className="flex gap-4">
          {/* Miniaturas verticales al lado izquierdo */}
          <div className="flex flex-col gap-2 overflow-auto max-h-[400px] w-20">
            {product.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={cn(
                  "relative w-20 h-20 border rounded overflow-hidden",
                  selectedImage === img ? "ring-2 ring-primary" : ""
                )}
              >
                <Image src={img} alt={`Miniatura ${index}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Imagen principal */}
          <div className="relative flex-1 aspect-square bg-card border rounded-lg overflow-hidden">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-contain"
              data-ai-hint={product.hint}
            />
          </div>
        </div>

        {/* Detalles del producto */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-primary">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.title}</h1>
          </div>

          <p className="text-muted-foreground">{product.description}</p>
          <p className="text-4xl font-bold text-primary">{product.price}</p>

          <div className="space-y-4">
            {/* Color */}
            {product.options?.colors && (
              <div className="space-y-2">
                <Label>Color</Label>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="flex items-center gap-2"
                >
                  {product.options.colors.map((color) => (
                    <RadioGroupItem
                      key={color}
                      value={color}
                      id={`color-${color}`}
                      className="h-8 w-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Talle */}
            {product.options?.sizes && (
              <div className="space-y-2 max-w-[200px]">
                <Label htmlFor="size-select">Talle</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger id="size-select">
                    <SelectValue placeholder="Selecciona un talle" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.options.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Cantidad */}
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

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button size="lg" className="w-full">
              Agregar al Carrito
            </Button>
            <Button size="lg" variant="outline" className="w-full" asChild>
              <Link href="/crear">
                <Brush className="mr-2 h-5 w-5" />
                Personalizar
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
