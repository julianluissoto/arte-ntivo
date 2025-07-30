
// src/hooks/useShare.ts
'use client';

import { useToast } from './use-toast';

export const useShare = () => {
  const { toast } = useToast();

  const handleShare = async (shareData?: { title?: string; text?: string; url?: string }) => {
    const defaultShareData = {
      title: 'Arte Nativo Estampados',
      text: '¡Descubre productos personalizados únicos en Arte Nativo!',
      url: typeof window !== 'undefined' ? window.location.origin : '',
    };

    const dataToShare = { ...defaultShareData, ...shareData };

    try {
      if (navigator.share) {
        await navigator.share(dataToShare);
      } else {
        // Fallback for browsers that don't support navigator.share
        throw new Error('Web Share API not supported');
      }
    } catch (err) {
      // Fallback to clipboard if sharing fails or is not supported
      try {
        await navigator.clipboard.writeText(dataToShare.url);
        toast({
          title: '¡Enlace Copiado!',
          description: 'El enlace ha sido copiado a tu portapapeles.',
        });
      } catch (copyErr) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No se pudo compartir ni copiar el enlace.',
        });
      }
    }
  };

  return { handleShare };
};
