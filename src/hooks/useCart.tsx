// src/hooks/useCart.tsx
'use client';

import { useState, useEffect, useCallback, createContext, useContext, ReactNode, useRef } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { useAuth } from './useAuth';
import { getUserCart, saveUserCart } from '@/lib/data';
import { useToast } from './use-toast';
import { cartLineKey, unitPrice } from '@/lib/cart-utils';

const GUEST_CART_KEY = 'guest-cart';

interface AddToCartOptions {
  color?: string;
  size?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  /** Cantidad total de unidades en el carrito. */
  itemCount: number;
  addToCart: (product: Product, quantity: number, options?: AddToCartOptions) => void;
  removeFromCart: (lineKey: string) => void;
  updateQuantity: (lineKey: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/** Carritos viejos guardados sin lineKey: lo completamos con el id. */
const normalize = (items: CartItem[] | null | undefined): CartItem[] =>
  (items ?? []).map((it) => ({
    ...it,
    lineKey: it.lineKey ?? cartLineKey(it.id, it.selectedColor, it.selectedSize),
  }));

const mergeCarts = (base: CartItem[], extra: CartItem[]): CartItem[] => {
  const result = [...base];
  for (const item of extra) {
    const existing = result.find((r) => r.lineKey === item.lineKey);
    if (existing) existing.quantity += item.quantity;
    else result.push(item);
  }
  return result;
};

const readGuestCart = (): CartItem[] => {
  try {
    return normalize(JSON.parse(localStorage.getItem(GUEST_CART_KEY) || '[]'));
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  // Para no pisar el carrito guardado antes de terminar de cargarlo.
  const ready = useRef(false);

  // Carga: usuario logueado → Firestore (+ lo que haya agregado como invitado); invitado → localStorage.
  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;
    ready.current = false;

    const load = async () => {
      setLoading(true);
      const guestItems = readGuestCart();
      let items: CartItem[];
      if (user) {
        const remote = normalize(await getUserCart(user.uid));
        items = mergeCarts(remote, guestItems);
        if (guestItems.length) {
          localStorage.removeItem(GUEST_CART_KEY);
          saveUserCart(user.uid, items);
        }
      } else {
        items = guestItems;
      }
      if (!cancelled) {
        setCartItems(items);
        ready.current = true;
        setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  const persist = useCallback(
    (items: CartItem[]) => {
      if (!ready.current) return;
      if (user) saveUserCart(user.uid, items);
      else localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
    },
    [user]
  );

  const updateAndSaveCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    persist(newItems);
  };

  const addToCart = (product: Product, quantity: number, options: AddToCartOptions = {}) => {
    const lineKey = cartLineKey(product.id, options.color, options.size);
    const existing = cartItems.find((item) => item.lineKey === lineKey);

    const newItems = existing
      ? cartItems.map((item) =>
          item.lineKey === lineKey ? { ...item, quantity: item.quantity + quantity } : item
        )
      : [
          ...cartItems,
          {
            ...product,
            quantity,
            lineKey,
            ...(options.color ? { selectedColor: options.color } : {}),
            ...(options.size ? { selectedSize: options.size } : {}),
          },
        ];

    updateAndSaveCart(newItems);

    toast({
      title: '¡Producto agregado!',
      description: `${product.title} (x${quantity}) se agregó a tu carrito.`,
    });
  };

  const removeFromCart = (lineKey: string) => {
    updateAndSaveCart(cartItems.filter((item) => item.lineKey !== lineKey));
  };

  const updateQuantity = (lineKey: string, quantity: number) => {
    const newItems =
      quantity <= 0
        ? cartItems.filter((item) => item.lineKey !== lineKey)
        : cartItems.map((item) => (item.lineKey === lineKey ? { ...item, quantity } : item));
    updateAndSaveCart(newItems);
  };

  const clearCart = () => updateAndSaveCart([]);

  const getCartTotal = useCallback(
    () => cartItems.reduce((total, item) => total + unitPrice(item) * item.quantity, 0),
    [cartItems]
  );

  const itemCount = cartItems.reduce((n, item) => n + item.quantity, 0);

  const value = {
    cartItems,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    loading: authLoading || loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
