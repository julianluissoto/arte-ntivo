// src/app/products/ProductDetailsClient.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight, Edit, MessageCircle, Minus, Plus, Share2, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import EditProductForm from '@/components/EditProductForm';
import { useShare } from '@/hooks/use-share';
import { phoneNumber } from '@/components/WhatsAppButton';
import { colorName, formatPrice, parsePrice } from '@/lib/cart-utils';

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { isAdmin } = useAuth();
  const { addToCart } = useCart();
  const { handleShare } = useShare();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.options?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.options?.sizes?.[0]);

  const imageUrls = Array.isArray(product.images) ? product.images : product.images ? [product.images as unknown as string] : [];
  const [selectedImage, setSelectedImage] = useState<string>(imageUrls[0] ?? '');

  useEffect(() => {
    const urls = Array.isArray(product.images) ? product.images : product.images ? [product.images as unknown as string] : [];
    setSelectedImage(urls[0] ?? '');
    setSelectedColor(product.options?.colors?.[0]);
    setSelectedSize(product.options?.sizes?.[0]);
  }, [product]);

  const outOfStock = product.disponible === false;
  const salePrice = parsePrice(product.salePrice);
  const price = parsePrice(product.price);

  const handleAddToCart = () => {
    addToCart(product, quantity, { color: selectedColor, size: selectedSize });
  };

  const whatsappHref = () => {
    const variant = [selectedSize && `talle ${selectedSize}`, selectedColor && `color ${colorName(selectedColor)}`]
      .filter(Boolean)
      .join(', ');
    const text = `¡Hola! Quiero consultar por "${product.title}"${variant ? ` (${variant})` : ''}, cantidad: ${quantity}.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleShareProduct = () => {
    handleShare({
      title: product.title,
      text: `¡Mirá este producto de Arte Nativo Estampados!: ${product.title}`,
      url: window.location.href,
    });
  };

  return (
    <div>
      {/* Migas de pan */}
      <nav aria-label="Ruta" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Inicio</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/?category=${product.category}#all-products`} className="hover:text-primary">
          {product.category}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate text-foreground">{product.title}</span>
      </nav>

      <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-14">
        {/* Galería */}
        <div className="flex flex-col-reverse gap-4 md:grid md:grid-cols-[80px_1fr] md:items-start">
          <div className="no-scrollbar flex gap-3 overflow-x-auto py-1 md:max-h-[520px] md:flex-col md:overflow-y-auto md:py-0">
            {imageUrls.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={cn(
                  'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-muted transition-all',
                  selectedImage === image ? 'border-primary' : 'border-transparent hover:border-primary/40'
                )}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <ImageWithSkeleton
                  src={image}
                  alt={`${product.title} - imagen ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-muted">
            {salePrice > 0 && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                Oferta
              </span>
            )}
            {selectedImage ? (
              <ImageWithSkeleton
                src={selectedImage}
                alt={product.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
                data-ai-hint={product.hint}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-sm text-muted-foreground">Sin imagen</span>
              </div>
            )}
          </div>
        </div>

        {/* Detalle */}
        <div className="space-y-7">
          <div>
            <div className="flex items-start justify-between gap-4">
              <span className="eyebrow">{product.category}</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="rounded-full" onClick={handleShareProduct} aria-label="Compartir">
                  <Share2 className="h-5 w-5 text-muted-foreground" />
                </Button>
                {isAdmin && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full" aria-label="Editar producto">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full overflow-y-auto md:w-[500px]">
                      <SheetHeader>
                        <SheetTitle>Editar producto</SheetTitle>
                        <SheetDescription>Hacé los cambios y guardá cuando termines.</SheetDescription>
                      </SheetHeader>
                      <div className="py-4">
                        <EditProductForm product={product} />
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
              </div>
            </div>
            <h1 className="mt-3 font-headline text-3xl font-extrabold uppercase leading-[0.95] md:text-5xl">
              {product.title}
            </h1>
          </div>

          <div className="flex items-baseline gap-3">
            {outOfStock ? (
              <p className="font-headline text-3xl font-extrabold text-destructive">Sin stock</p>
            ) : salePrice > 0 ? (
              <>
                <p className="font-headline text-4xl font-extrabold text-primary">{formatPrice(salePrice)}</p>
                <p className="text-xl text-muted-foreground line-through">{formatPrice(price)}</p>
              </>
            ) : (
              <p className="font-headline text-4xl font-extrabold">{formatPrice(price)}</p>
            )}
          </div>

          {product.description && (
            <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{product.description}</p>
          )}

          {/* Color */}
          {product.options?.colors && product.options.colors.length > 0 && (
            <div className="space-y-2.5">
              <Label>
                Color: <span className="font-normal text-muted-foreground">{colorName(selectedColor)}</span>
              </Label>
              <div className="flex flex-wrap items-center gap-2.5">
                {product.options.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      'h-9 w-9 rounded-full border ring-offset-2 ring-offset-background transition',
                      selectedColor === color ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary/30'
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${colorName(color)}`}
                    aria-pressed={selectedColor === color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Talle */}
          {product.options?.sizes && product.options.sizes.length > 0 && (
            <div className="space-y-2.5">
              <Label>Talle</Label>
              <div className="flex flex-wrap gap-2">
                {product.options.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'min-w-12 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors',
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'hover:border-primary/40'
                    )}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad + acciones */}
          <div className="space-y-3 border-t pt-6">
            <div className="flex items-center gap-4">
              <Label>Cantidad</Label>
              <div className="flex items-center rounded-full border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Restar uno"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 border-0 bg-transparent text-center focus-visible:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                  aria-label="Cantidad"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Sumar uno"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={outOfStock}>
                <ShoppingCart className="h-5 w-5" />
                Agregar al carrito
              </Button>
              <Button size="lg" variant="outline" className="w-full" asChild>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Consultar por WhatsApp
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              ¿Pedido por cantidad para colegios, empresas o eventos? Consultanos y te armamos un precio especial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
