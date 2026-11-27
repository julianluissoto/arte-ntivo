// src/components/NewsCard.tsx
"use client";

import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import type { News } from "@/lib/types";

interface NewsCardProps {
    news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
    const imageUrl = news.image;

    return (
        <article className="group flex w-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-video overflow-hidden bg-muted">
                {imageUrl ? (
                    <ImageWithSkeleton
                        src={imageUrl}
                        alt={news.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={news.hint}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <span className="text-sm text-muted-foreground">Sin imagen</span>
                    </div>
                )}
            </div>
            <div className="flex flex-grow flex-col p-5">
                <h3 className="text-xl font-bold leading-tight">{news.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{news.description}</p>
            </div>
        </article>
    );
}
