// src/lib/types.ts

export type Category =
  | "Indumentaria"
  | "Cerámica"
  | "Plástico"
  | "Acrílico"
  | "MDF"
  | "Metal"
  | "Varios"
  | "Papel"
  | "Goma"
  | "Todos";

export interface Product {
  id: string; // Changed from number to string to match Firestore document ID
  title: string;
  price: string;
  images: string[];
  hint: string;
  category: Category;
  description: string;
  isFeatured?: boolean;
  options?: {
    colors?: string[];
    sizes?: string[];
  }
  disponible?: boolean;
}
// lib/types.ts
export interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating?: number; // Opcional, si quieres estrellas u otra valoración
  avatarUrl?: string; // Opcional, para la imagen del usuario
}
