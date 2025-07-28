// src/hooks/useFavorites.tsx
'use client';

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface FavoritesContextType {
  favoriteIds: string[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => boolean; // Cambiado para retornar un booleano
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavoriteIds(new Set(JSON.parse(storedFavorites)));
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      setFavoriteIds(new Set());
    }
    setLoading(false);
  }, []);

  const persistFavorites = (ids: Set<string>) => {
    try {
      localStorage.setItem('favorites', JSON.stringify(Array.from(ids)));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  };

  const toggleFavorite = useCallback((productId: string) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: '¡Necesitas iniciar sesión!',
        description: 'Para guardar tus favoritos, por favor, inicia sesión.',
      });
      return false; // Retorna false si no hay usuario
    }

    let removed = false;
    setFavoriteIds(prev => {
      const newFavs = new Set(prev);
      let message = '';
      if (newFavs.has(productId)) {
        newFavs.delete(productId);
        message = 'Producto quitado de favoritos.';
        removed = true; // Se marcó como eliminado
      } else {
        newFavs.add(productId);
        message = '¡Producto añadido a favoritos!';
      }
      persistFavorites(newFavs);
      toast({
        title: message,
      });
      return newFavs;
    });
    return removed; // Retorna si fue eliminado o no
  }, [user, toast]);

  const isFavorite = useCallback(
    (productId: string) => favoriteIds.has(productId),
    [favoriteIds]
  );

  const value = {
    favoriteIds: Array.from(favoriteIds),
    isFavorite,
    toggleFavorite,
    loading
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};