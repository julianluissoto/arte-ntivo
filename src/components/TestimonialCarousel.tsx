// components/TestimonialCarousel.tsx
"use client";

import Slider from "react-slick";
import { Testimonial } from "@/lib/types";
import TestimonialCard from "./TestimonialCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

// Componente para el botón de flecha anterior personalizado
function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} !block !left-0 z-10`}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
      aria-label="Anterior"
    >
      <ChevronLeft size={40} className="text-primary hover:text-primary-foreground bg-primary-foreground hover:bg-primary rounded-full p-1 shadow-md transition-colors" />
    </button>
  );
}

// Componente para el botón de flecha siguiente personalizado
function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} !block !right-0 z-10`}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
      aria-label="Siguiente"
    >
      <ChevronRight size={40} className="text-primary hover:text-primary-foreground bg-primary-foreground hover:bg-primary rounded-full p-1 shadow-md transition-colors" />
    </button>
  );
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          // También aquí si quieres que las flechas aparezcan en estos breakpoints
          prevArrow: <PrevArrow />,
          nextArrow: <NextArrow />,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          // Y aquí si también las quieres en móvil
          prevArrow: <PrevArrow />,
          nextArrow: <NextArrow />,
        },
      },
    ],
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="testimonial-carousel-container relative px-8">
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </Slider>
    </div>
  );
}