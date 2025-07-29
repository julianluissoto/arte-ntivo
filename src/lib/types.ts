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
  id: string; 
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

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage?: string | null;
  rating: number;
  comment: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}



export interface Customer {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL?: string | null;
}
