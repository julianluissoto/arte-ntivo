// src/hooks/useFavorites.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export const useFavorites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from a local source or API
    setLoading(true);
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        setFavoriteIds(new Set(JSON.parse(storedFavorites)));
    }
    setLoading(false);
  }, []);

  const isFavorite = useCallback(
    (productId: string) => {
      return favoriteIds.has(productId);
    },
    [favoriteIds]
  );

  const toggleFavorite = useCallback((productId: string) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: '¡Necesitas iniciar sesión!',
        description: 'Para guardar tus favoritos, por favor, inicia sesión.',
      });
      return;
    }
    
    setFavoriteIds(prev => {
        const newFavs = new Set(prev);
        if (newFavs.has(productId)) {
            newFavs.delete(productId);
        } else {
            newFavs.add(productId);
        }
        localStorage.setItem('favorites', JSON.stringify(Array.from(newFavs)));
        return newFavs;
    });

  }, [user, toast]);

  return { favoriteIds: Array.from(favoriteIds), isFavorite, toggleFavorite, loading };
};
