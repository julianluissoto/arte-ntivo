// src/app/admin/news/page.tsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Loader2 } from 'lucide-react';
import { addNews } from '@/lib/data';
import { useRouter } from 'next/navigation';

export default function AdminNewsPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [hint, setHint] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !imageUrl || !hint) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Por favor, completa todos los campos.',
            });
            return;
        }
        
        setIsLoading(true);

        try {
            const newNewsItem = {
                title,
                description,
                image: imageUrl,
                hint,
            };
            
            await addNews(newNewsItem);
            
            toast({
                title: '¡Novedad Guardada!',
                description: `La novedad "${title}" ha sido agregada con éxito.`,
            });
            
            // Reset form
            setTitle('');
            setDescription('');
            setImageUrl('');
            setHint('');

            router.refresh(); // Refreshes server components, like the homepage news section
            router.push('/'); // Redirect to home to see the new item
            
        } catch (error) {
            console.error("Error adding news document: ", error);
            toast({
                variant: 'destructive',
                title: 'Error al Guardar',
                description: 'No se pudo guardar la novedad en la base de datos.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Panel de Novedades
                </h1>
                <p className="mt-4 text-lg text-foreground/80">
                    Añade nuevas noticias o anuncios a tu tienda.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Nueva Novedad</CardTitle>
                    <CardDescription>Completa los detalles para agregar un nuevo anuncio.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="news-title">Título</Label>
                            <Input 
                                id="news-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ej: ¡Nuevos diseños de verano!"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe la novedad o el anuncio."
                                required
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="image-url">URL de la Imagen</Label>
                            <Input
                                id="image-url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://ejemplo.com/novedad.jpg"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="hint">AI Hint (para la imagen)</Label>
                            <Input 
                                id="hint"
                                value={hint}
                                onChange={(e) => setHint(e.target.value)}
                                placeholder="Ej: playa soleada"
                                required
                            />
                        </div>

                        <div className="pt-4 border-t">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud className="mr-2 h-4 w-4" />
                                        Guardar Novedad
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
