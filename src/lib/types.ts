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
