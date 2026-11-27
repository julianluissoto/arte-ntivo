// src/app/cart/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Loader2, Minus, Plus, ShoppingBag, Store, Trash2, Truck } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SectionHeading } from '@/components/HomeSections';
import { phoneNumber } from '@/components/WhatsAppButton';
import { cn } from '@/lib/utils';
import {
  buildWhatsAppOrderMessage,
  colorName,
  formatPrice,
  parsePrice,
  unitPrice,
  type DeliveryMethod,
} from '@/lib/cart-utils';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.43-9.43 2.52 0 4.89.98 6.67 2.77a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.44 9.42m8.03-17.45A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.28l5.67-1.49a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.02" />
  </svg>
);

export default function CartPage() {
  const { user } = useAuth();
  const { cartItems, itemCount, removeFromCart, updateQuantity, clearCart, getCartTotal, loading } = useCart();

  const [name, setName] = useState('');
  const [delivery, setDelivery] = useState<DeliveryMethod>('retiro');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);

  // Prellenamos el nombre con el de la cuenta.
  useEffect(() => {
    if (user?.displayName && !name) setName(user.displayName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const total = getCartTotal();

  const handleSendOrder = () => {
    const message = buildWhatsAppOrderMessage(cartItems, { name, delivery, city, notes });
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    // No vaciamos el carrito automáticamente: si WhatsApp no abrió, el pedido no se pierde.
    setSent(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-xl rounded-[2rem] border bg-card px-6 py-14 text-center sm:px-10">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <h1 className="mt-5 font-headline text-3xl font-extrabold uppercase md:text-4xl">¡Pedido enviado!</h1>
        <p className="mt-3 text-muted-foreground">
          Te abrimos WhatsApp con el detalle del pedido. Envianos el mensaje y te respondemos con la cotización final y los
          tiempos de entrega.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            onClick={() => {
              clearCart();
              setSent(false);
            }}
          >
            Listo, vaciar carrito
          </Button>
          <Button size="lg" variant="outline" onClick={() => setSent(false)}>
            Volver al carrito
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionHeading
        eyebrow="Tu pedido"
        title="Mi carrito."
        subtitle={
          cartItems.length > 0
            ? `${itemCount} ${itemCount === 1 ? 'unidad' : 'unidades'} · Armá tu pedido y envialo por WhatsApp.`
            : undefined
        }
      />

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center rounded-[2rem] bg-muted px-6 py-20 text-center">
          <ShoppingBag className="h-14 w-14 text-primary" />
          <p className="mt-4 font-headline text-2xl font-extrabold uppercase">Tu carrito está vacío</p>
          <p className="mt-2 text-muted-foreground">Recorré el catálogo y sumá los productos que quieras personalizar.</p>
          <Button asChild size="lg" className="group mt-6">
            <Link href="/#all-products">
              Ver productos
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          {/* Lista de productos */}
          <div className="space-y-3">
            {cartItems.map((item) => {
              const price = unitPrice(item);
              const onSale = parsePrice(item.salePrice) > 0;
              const image = Array.isArray(item.images) ? item.images[0] : (item.images as unknown as string);
              return (
                <div key={item.lineKey} className="flex gap-4 rounded-2xl border bg-card p-3 sm:p-4">
                  <Link
                    href={`/products/${item.id}`}
                    className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28"
                  >
                    {image && (
                      <ImageWithSkeleton src={image} alt={item.title} fill sizes="112px" className="object-cover" />
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">{item.category}</p>
                        <Link href={`/products/${item.id}`} className="font-bold leading-tight hover:text-primary">
                          {item.title}
                        </Link>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="-mr-2 -mt-2 h-9 w-9 flex-shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.lineKey)}
                        aria-label={`Quitar ${item.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {(item.selectedSize || item.selectedColor) && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {item.selectedSize && (
                          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                            Talle {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                            <span
                              className="h-3 w-3 rounded-full border"
                              style={{ backgroundColor: item.selectedColor }}
                            />
                            {colorName(item.selectedColor)}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                      <div className="flex items-center rounded-full border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.lineKey, item.quantity - 1)}
                          aria-label="Restar uno"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <Input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.lineKey, Math.max(1, parseInt(e.target.value) || 1))}
                          className="h-8 w-12 border-0 bg-transparent p-0 text-center focus-visible:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                          aria-label="Cantidad"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.lineKey, item.quantity + 1)}
                          aria-label="Sumar uno"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(price)} c/u
                          {onSale && <span className="ml-1 line-through">{formatPrice(parsePrice(item.price))}</span>}
                        </p>
                        <p className="font-headline text-lg font-extrabold">{formatPrice(price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-between pt-2">
              <Button asChild variant="ghost" className="group">
                <Link href="/#all-products">Seguir comprando</Link>
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={clearCart}>
                <Trash2 className="h-4 w-4" />
                Vaciar carrito
              </Button>
            </div>
          </div>

          {/* Resumen + datos del pedido */}
          <aside className="space-y-5 rounded-2xl border bg-card p-5 sm:p-6 lg:sticky lg:top-40">
            <h2 className="font-headline text-xl font-extrabold uppercase">Resumen</h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="order-name">Tu nombre</Label>
                <Input id="order-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre y apellido" />
              </div>

              <div className="space-y-1.5">
                <Label>Entrega</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { value: 'retiro', label: 'Retiro', icon: Store },
                      { value: 'envio', label: 'Envío', icon: Truck },
                    ] as const
                  ).map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setDelivery(value)}
                      className={cn(
                        'flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors',
                        delivery === value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'hover:border-primary/40'
                      )}
                      aria-pressed={delivery === value}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {delivery === 'envio' && (
                <div className="space-y-1.5">
                  <Label htmlFor="order-city">Localidad</Label>
                  <Input id="order-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ciudad, provincia" />
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="order-notes">Notas (opcional)</Label>
                <Textarea
                  id="order-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Fecha que lo necesitás, ubicación del logo, textos…"
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">Total estimado</span>
                <span className="font-headline text-3xl font-extrabold">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                El precio final puede variar según el diseño y la cantidad. Te confirmamos todo por WhatsApp.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5b]"
              onClick={handleSendOrder}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Enviar pedido por WhatsApp
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
