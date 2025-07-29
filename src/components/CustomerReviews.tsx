
// src/components/CustomerReviews.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { addReview, getReviews } from "@/lib/data";
import { Review } from "@/lib/types";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Star, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";

const StarRating = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void; }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={ratingValue}
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            className="transition-colors"
          >
            <Star
              className={ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"}
              fill={ratingValue <= (hover || rating) ? "currentColor" : "none"}
            />
          </button>
        );
      })}
    </div>
  );
};

const ReviewForm = ({ onReviewAdded }: { onReviewAdded: () => void }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0 || !user) return;

    setIsLoading(true);
    try {
      await addReview({
        userId: user.uid,
        userName: user.displayName || 'Usuario Anónimo',
        userImage: user.photoURL,
        rating,
        comment,
      });
      toast({ title: "¡Gracias!", description: "Tu reseña ha sido enviada." });
      setComment("");
      setRating(0);
      onReviewAdded();
    } catch (error) {
      toast({ variant: 'destructive', title: "Error", description: "No se pudo enviar tu reseña." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deja tu opinión</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <p className="font-medium">Calificación:</p>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Cuéntanos tu experiencia en Arte nativo."
            maxLength={140}
            required
          />
          <p className="text-sm text-right text-muted-foreground">{comment.length}/140</p>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading || !comment.trim() || rating === 0}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enviar Reseña
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default function CustomerReviews() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const handleReviewAdded = () => {
    
    router.refresh();
  };

  if (authLoading) {
    return (
        <div className="max-w-xl mx-auto">
            <Skeleton className="h-40 w-full" />
        </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
        {user ? (
            <ReviewForm onReviewAdded={handleReviewAdded} />
        ) : (
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold">¿Quieres dejar tu comentario?</h3>
                <p className="text-muted-foreground mt-2 mb-4">Inicia sesión o crea una cuenta para compartir tu opinión.</p>
                <Button asChild>
                    <Link href="/signup">Regístrate para comentar</Link>
                </Button>
            </div>
        )}
    </div>
  );
}
