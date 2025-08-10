// src/app/cart/page.tsx
'use client';

import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingCart, MessageCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { phoneNumber } from '@/components/WhatsAppButton';
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

export default function CartPage() {
  const { user, loading: authLoading } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, loading: cartLoading } = useCart();

  const handleConfirmCheckout = () => {
    const productTitles = cartItems.map(item => `${item.title} (x${item.quantity})`).join(', ');
    const message = `¡Hola! Me gustaría hacer un pedido de los siguientes productos: ${productTitles}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Clear the cart after redirecting
    clearCart();
  };

  const isLoading = authLoading || cartLoading;
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-20 bg-card rounded-lg border border-dashed">
        <h2 className="text-2xl font-bold font-headline text-primary">Inicia Sesión para Ver tu Carrito</h2>
        <p className="text-muted-foreground mt-2 mb-6">Para añadir productos y ver tu carrito, necesitas una cuenta.</p>
        <Button asChild>
          <Link href="/login">Iniciar Sesión</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Mi Carrito
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Revisa tus productos y finaliza tu pedido.
        </p>
      </div>

      {cartItems.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Resumen del Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted">
                        <Image src={Array.isArray(item.images) ? item.images[0] : item.images} alt={item.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-12 text-center border-x border-y-0 focus-visible:ring-0"
                            min="1"
                        />
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-4 pt-6 border-t">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${getCartTotal()}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="lg" className="w-full">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Finalizar por WhatsApp
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Estás a punto de ir a WhatsApp</AlertDialogTitle>
                      <AlertDialogDescription>
                        Nos enviarás un mensaje por WhatsApp con los productos seleccionados para acordar el pago y la entrega directamente con nosotros.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleConfirmCheckout}>
                        Continuar y Enviar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button size="lg" variant="destructive" className="w-full" onClick={clearCart}>
                    <Trash2 className="mr-2 h-5 w-5" />
                    Vaciar Carrito
                </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <div className="text-center py-20 bg-card rounded-lg border border-dashed flex flex-col items-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">Tu carrito está vacío.</p>
            <p className="text-muted-foreground mt-2">¡Empieza a explorar y añade productos!</p>
            <Button asChild variant="outline" className="mt-4">
                <Link href="/">Explorar productos</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
