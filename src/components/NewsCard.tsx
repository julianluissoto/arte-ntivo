// src/components/NewsCard.tsx
"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { News } from "@/lib/types";

interface NewsCardProps {
    news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
    const imageUrl = news.image;

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col group w-full">
            <div className="flex flex-col flex-grow">
                 <div className="relative aspect-video">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={news.title}
                            fill
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={news.hint}
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-sm text-muted-foreground">No Image</span>
                        </div>
                    )}
                </div>
                <CardHeader className="p-4">
                    <CardTitle className="text-xl font-bold font-headline">{news.title}</CardTitle>
                </CardHeader>
                <CardFooter className="p-4  flex-grow bg-secondary">
                    <CardDescription className="text-sm  text-white">
                        {news.description}
                    </CardDescription>
                </CardFooter>
            </div>
        </Card>
    );
}
