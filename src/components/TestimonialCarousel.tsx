// components/TestimonialCarousel.tsx
"use client";

import Slider from "react-slick";
import { Review} from "@/lib/types";
import TestimonialCard from "./TestimonialCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialCarouselProps {
  testimonials: Review[];
}

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
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,  
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
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
            <TestimonialCard review={testimonial} />
          </div>
        ))}
      </Slider>
    </div>
  );
}