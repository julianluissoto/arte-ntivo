// src/app/customize/page.tsx
"use client";

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import Image from 'next/image';
import { products } from '@/lib/mock-data';
import type { Product } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash2, Move } from 'lucide-react';

export default function CustomizePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
  const [imageSize, setImageSize] = useState(100);
  const previewRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleProductChange = (productId: string) => {
    const product = products.find(p => p.id.toString() === productId);
    setSelectedProduct(product || null);
    // Reset image when product changes
    setUploadedImage(null);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setImagePosition({ x: 50, y: 50 });
        setImageSize(100);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if(!previewRef.current) return;
    isDragging.current = true;
    const previewRect = previewRef.current.getBoundingClientRect();
    const imageRect = e.currentTarget.getBoundingClientRect();
    
    dragStart.current = {
      x: e.clientX - imageRect.left + previewRect.left,
      y: e.clientY - imageRect.top + previewRect.top,
    };
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    if (isDragging.current && previewRef.current && e.clientX !== 0 && e.clientY !== 0) {
        e.preventDefault();
        const previewRect = previewRef.current.getBoundingClientRect();
        
        const newX = ((e.clientX - previewRect.left) / previewRect.width) * 100;
        const newY = ((e.clientY - previewRect.top) / previewRect.height) * 100;

        // Clamp values between 0 and 100
        const clampedX = Math.max(0, Math.min(100, newX));
        const clampedY = Math.max(0, Math.min(100, newY));

        setImagePosition({ x: clampedX, y: clampedY });
    }
  };
  
  const handleDragEnd = () => {
    isDragging.current = false;
  };


  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Personaliza tu Producto
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Elige un producto, sube tu diseño y mira cómo queda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Controles</CardTitle>
            <CardDescription>Configura tu producto aquí.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="product-select">1. Elige un producto</Label>
              <Select onValueChange={handleProductChange} defaultValue={selectedProduct?.id.toString()}>
                <SelectTrigger id="product-select">
                  <SelectValue placeholder="Selecciona un producto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(product => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-upload">2. Sube tu diseño</Label>
              <Input id="image-upload" type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
            </div>

            {uploadedImage && (
              <div className="space-y-4 pt-4 border-t">
                 <Label>3. Ajusta tu diseño</Label>
                 <div className="space-y-2">
                    <Label htmlFor="size-slider">Tamaño: {imageSize}px</Label>
                    <Input 
                        id="size-slider"
                        type="range"
                        min="20"
                        max="300"
                        value={imageSize}
                        onChange={(e) => setImageSize(parseInt(e.target.value))}
                        className="w-full"
                    />
                 </div>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Move className="h-4 w-4" />
                    <span>Arrastra la imagen en el preview para posicionarla.</span>
                 </div>
                 <div className="flex gap-2 pt-4">
                    <Button variant="destructive" className="w-full" size="sm" onClick={() => setUploadedImage(null)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Quitar Imagen
                    </Button>
                 </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Vista Previa</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              ref={previewRef}
              className="relative w-full aspect-square bg-muted/30 rounded-lg overflow-hidden border border-dashed flex items-center justify-center"
              onDragOver={(e) => e.preventDefault()} // Necessary to allow dropping
              onDrop={handleDrag}
            >
              {selectedProduct ? (
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  style={{objectFit: 'contain'}}
                  data-ai-hint={selectedProduct.hint}
                />
              ) : (
                <p className="text-muted-foreground">Selecciona un producto para empezar.</p>
              )}
              {uploadedImage && (
                <div
                  className="absolute cursor-move"
                  style={{
                    left: `${imagePosition.x}%`,
                    top: `${imagePosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${imageSize}px`,
                    height: 'auto',
                  }}
                  draggable
                  onDragStart={handleDragStart}
                  onDrag={handleDrag}
                  onDragEnd={handleDragEnd}
                >
                  <Image
                    src={uploadedImage}
                    alt="Uploaded design"
                    width={imageSize}
                    height={imageSize}
                    className="pointer-events-none"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
