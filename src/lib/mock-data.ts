
export type Category = 
  | "Indumentaria"
  | "Cerámica"
  | "Plástico"
  | "Acrílico"
  | "MDF"
  | "Metal"
  | "Varios"
  | "Todos";

export interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  hint: string;
  category: Category;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Mochila Lisa",
    price: "$10.928",
    image: "https://placehold.co/600x400",
    hint: "yellow backpack",
    category: "Indumentaria",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Cooler Antartida",
    price: "$14.997",
    image: "https://placehold.co/600x400",
    hint: "blue cooler",
    category: "Plástico",
  },
  {
    id: 3,
    title: "Botella Jim",
    price: "$7.852",
    image: "https://placehold.co/600x400",
    hint: "pokemon bottle",
    category: "Plástico",
  },
  {
    id: 4,
    title: "Termo Grabado",
    price: "$25.00",
    image: "https://placehold.co/600x400",
    hint: "engraved thermos",
    category: "Metal",
    isFeatured: true,
  },
  {
    id: 5,
    title: "Taza Sublimada",
    price: "$10.00",
    image: "https://placehold.co/600x400",
    hint: "custom mug",
    category: "Cerámica",
    isFeatured: true,
  },
  {
    id: 6,
    title: "Llavero de Acrílico",
    price: "$5.00",
    image: "https://placehold.co/600x400",
    hint: "acrylic keychain",
    category: "Acrílico",
  },
  {
    id: 7,
    title: "Corte Láser en MDF",
    price: "$20.00",
    image: "https://placehold.co/600x400",
    hint: "laser cut",
    category: "MDF",
  },
  {
    id: 8,
    title: "Stickers de Vinilo",
    price: "$8.00",
    image: "https://placehold.co/600x400",
    hint: "vinyl stickers",
    category: "Varios",
  },
  {
    id: 9,
    title: "Mochila Urbana",
    price: "$40.00",
    image: "https://placehold.co/600x400",
    hint: "urban backpack",
    category: "Indumentaria",
    isFeatured: true,
  },
  {
    id: 10,
    title: "Botella Deportiva",
    price: "$18.00",
    image: "https://placehold.co/600x400",
    hint: "sports bottle",
    category: "Plástico",
  },
  {
    id: 11,
    title: "Agenda Ecológica",
    price: "$22.00",
    image: "https://placehold.co/600x400",
    hint: "eco notebook",
    category: "Varios",
  },
   {
    id: 12,
    title: "Kit de Asado",
    price: "$55.00",
    image: "https://placehold.co/600x400",
    hint: "bbq kit",
    category: "Varios",
  },
  {
    id: 13,
    title: "Remera Personalizada",
    price: "$15.00",
    image: "https://placehold.co/600x400",
    hint: "custom t-shirt",
    category: "Indumentaria",
    isFeatured: true,
  },
  {
    id: 14,
    title: "Gorra Bordada",
    price: "$12.50",
    image: "https://placehold.co/600x400",
    hint: "embroidered cap",
    category: "Indumentaria",
  },
  {
    id: 15,
    title: "Buso con Capucha",
    price: "$30.00",
    image: "https://placehold.co/600x400",
    hint: "hoodie design",
    category: "Indumentaria",
  },
  {
    id: 16,
    title: 'Mochila Antirrobo',
    price: '$75.00',
    image: 'https://placehold.co/600x400',
    hint: 'anti-theft backpack',
    category: 'Indumentaria',
  },
  {
    id: 17,
    title: 'Set de Regalo Gourmet',
    price: '$120.00',
    image: 'https://placehold.co/600x400',
    hint: 'gourmet gift set',
    category: 'Varios',
  },
  {
    id: 18,
    title: 'Power Bank de Bambú',
    price: '$45.00',
    image: 'https://placehold.co/600x400',
    hint: 'bamboo power bank',
    category: 'Varios',
  },
  {
    id: 19,
    title: 'Vaso Térmico de Acero',
    price: '$28.00',
    image: 'https://placehold.co/600x400',
    hint: 'steel tumbler',
    category: 'Metal',
    isFeatured: true,
  },
  {
    id: 20,
    title: 'Kit de Oficina Completo',
    price: '$90.00',
    image: 'https://placehold.co/600x400',
    hint: 'office kit',
    category: 'Varios',
  },
];
