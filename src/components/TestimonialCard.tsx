import { Review } from "@/lib/types";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface TestimonialCardProps {
  review: Review;
}

export default function TestimonialCard({ review }: TestimonialCardProps) {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div
      className="bg-secondary p-4 rounded-lg shadow-md border border-border flex flex-col items-center text-center h-full mx-2
                 [box-shadow:5px_5px_0px_0px_var(--primary)] // Constant shadow for initial lift
                 transform translate-x-[-3px] translate-y-[-3px] // Constant slight upward and left shift
                "
    >
      {/* Avatar */}
      <Avatar className="w-16 h-16 mb-3 border-2 border-primary">
        <AvatarImage src={review.userImage ?? ''} alt={review.userName} />
        <AvatarFallback className="text-xl">
          {getInitials(review.userName)}
        </AvatarFallback>
      </Avatar>

      {/* Comentario */}
      <p className="text-base italic text-card-foreground/90 mb-3 flex-grow min-h-[80px] flex items-center justify-center">
        "{review.comment}"
      </p>

      {/* Estrellas de Calificación */}
      {review.rating && (
        <div className="flex justify-center mb-2 flex-shrink-0">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating! ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* Nombre del Usuario */}
      <p className="font-semibold text-primary text-sm flex-shrink-0">- {review.userName}</p>
    </div>
  );
}