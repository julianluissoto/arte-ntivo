// components/TestimonialCard.tsx
import { Testimonial } from "@/lib/types";
import Image from "next/image";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-border flex flex-col items-center text-center h-full mx-2">
      {testimonial.avatarUrl && (
        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary">
          <Image
            src={testimonial.avatarUrl}
            alt={testimonial.author}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <p className="text-lg italic text-foreground mb-4">"{testimonial.text}"</p>
      {testimonial.rating && (
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.rating! ? "text-yellow-500 fill-current" : "text-muted"
              }`}
            />
          ))}
        </div>
      )}
      <p className="font-semibold text-primary">- {testimonial.author}</p>
    </div>
  );
}