// src/components/ProductCarousel.tsx
"use client";

import Slider from "react-slick";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/mock-data";

interface ProductCarouselProps {
    products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {products.map(product => (
                <div key={product.id} className="px-2">
                    <ProductCard product={product} />
                </div>
            ))}
        </Slider>
    );
}
