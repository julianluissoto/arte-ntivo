// src/hooks/useCart.tsx
'use client';

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { Product } from '@/lib/types';
import { useAuth } from './useAuth';
import { getUserCart, saveUserCart } from '@/lib/data';
import { useToast } from './use-toast';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Effect to load cart from Firestore for a logged-in user OR clear it for guests
  useEffect(() => {
    const manageCart = async () => {
      setLoading(true);
      if (user) {
        const firestoreCart = await getUserCart(user.uid);
        setCartItems(firestoreCart);
      } else {
        // User is a guest or logged out, clear cart state
        setCartItems([]);
      }
      setLoading(false);
    };

    // We run this effect only when the user's authentication state is confirmed.
    if (!authLoading) {
        manageCart();
    }
  }, [user, authLoading]);
  
  const updateAndSaveCart = (newItems: CartItem[]) => {
      setCartItems(newItems);
      if (user) {
        saveUserCart(user.uid, newItems);
      }
  };

  const addToCart = (product: Product, quantity: number) => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Debes iniciar sesión",
            description: "Para agregar productos al carrito, primero debes iniciar sesión.",
        });
        return;
    }
    
    let newItems: CartItem[];
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      newItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...cartItems, { ...product, quantity }];
    }
    
    updateAndSaveCart(newItems);

    toast({
        title: "¡Producto agregado!",
        description: `${product.title} (x${quantity}) se ha añadido a tu carrito.`,
    });
  };

  const removeFromCart = (productId: string) => {
    if (!user) return;
    const newItems = cartItems.filter(item => item.id !== productId);
    updateAndSaveCart(newItems);
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (!user) return;
    
    let newItems;
    if (quantity <= 0) {
        newItems = cartItems.filter(item => item.id !== productId);
    } else {
        newItems = cartItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
    }
    updateAndSaveCart(newItems);
  };

  const clearCart = () => {
    if (!user) return;
    updateAndSaveCart([]);
  };

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    loading: authLoading || loading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
