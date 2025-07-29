// src/components/TestimonialCard.tsx
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
   
    <div className="bg-secondary p-6 rounded-lg shadow-md border border-border flex flex-col items-center text-center h-full mx-2">
     
      <Avatar className="w-20 h-20 mb-4 border-2 border-primary">
        <AvatarImage src={review.userImage ?? ''} alt={review.userName} />
        <AvatarFallback className="text-2xl">
          {getInitials(review.userName)}
        </AvatarFallback>
      </Avatar>

    
      <p className="text-lg italic text-gray-800 mb-4 flex-grow min-h-[120px] flex items-center justify-center">
        "{review.comment}"
      </p>

    
      {review.rating && (
        <div className="flex justify-center mb-2 flex-shrink-0">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < review.rating! ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      
      <p className="font-semibold text-amber-800 flex-shrink-0">- {review.userName}</p>
    </div>
  );
}