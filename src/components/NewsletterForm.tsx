// src/components/NewsletterForm.tsx
"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail } from 'lucide-react';
import { addSubscriber } from '@/lib/data';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        variant: 'destructive',
        title: 'Correo Inválido',
        description: 'Por favor, ingresa una dirección de correo electrónico válida.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await addSubscriber(email);
      if (result.success) {
        toast({
          title: '¡Suscripción Exitosa!',
          description: 'Gracias por suscribirte a nuestras novedades.',
        });
        setEmail('');
      } else {
        toast({
          variant: 'destructive',
          title: 'Error de Suscripción',
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Ocurrió un problema. Inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-card py-12">
      <div className="container mx-auto text-center max-w-2xl">
        <Mail className="mx-auto h-12 w-12 text-primary" />
        <h2 className="text-3xl font-bold font-headline mt-4">
          Suscríbete a nuestras Novedades
        </h2>
        <p className="text-muted-foreground mt-2 mb-6">
          Recibe ofertas exclusivas y sé el primero en conocer nuestros nuevos productos.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
            className="text-base"
          />
          <Button type="submit" disabled={isLoading} className="sm:w-auto">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Suscribirme
          </Button>
        </form>
      </div>
    </section>
  );
}
