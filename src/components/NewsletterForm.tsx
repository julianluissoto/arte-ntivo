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
    <section className="rounded-[2rem] border bg-card px-6 py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Mail className="h-7 w-7" />
        </span>
        <h2 className="mt-5 font-headline text-3xl font-extrabold uppercase leading-none md:text-4xl">
          Sumate a la comunidad
        </h2>
        <p className="text-muted-foreground mt-3 mb-8">
          Recibí ofertas exclusivas y enterate primero de nuestros nuevos productos.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto sm:rounded-full sm:border sm:bg-background sm:p-1.5">
          <Input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
            className="h-11 rounded-full text-base sm:border-0 sm:bg-transparent sm:focus-visible:ring-0 sm:focus-visible:ring-offset-0"
          />
          <Button type="submit" disabled={isLoading} className="h-11 sm:w-auto">
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
