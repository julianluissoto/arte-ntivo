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
  salePrice?: string;
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

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage?: string | null;
  rating: number;
  comment: string;
  createdAt: string; // Changed to string to be serializable
}

export interface Customer {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL?: string | null;
}

export interface News {
  id: string;
  title: string;
  description: string;
  image: string;
  hint: string;
  createdAt: string; // Changed to string to be serializable
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}
