
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
  description: string;
  isFeatured?: boolean;
  options?: {
    colors?: string[];
    sizes?: string[];
  }
}

export const products: Product[] = [
  {
    id: 1,
    title: "Mochila Lisa",
    price: "$10.928",
    image: "https://placehold.co/600x400",
    hint: "yellow backpack",
    category: "Indumentaria",
    description: "Una mochila resistente y espaciosa, ideal para el día a día. Fabricada con materiales de alta calidad para mayor durabilidad.",
    isFeatured: true,
    options: {
      colors: ["#fde047", "#3b82f6", "#ef4444", "#22c55e"],
    }
  },
  {
    id: 2,
    title: "Cooler Antartida",
    price: "$14.997",
    image: "https://placehold.co/600x400",
    hint: "blue cooler",
    category: "Plástico",
    description: "Mantén tus bebidas frías durante horas con este cooler de gran capacidad. Perfecto para picnics, playa o cualquier salida al aire libre.",
  },
  {
    id: 3,
    title: "Botella Jim",
    price: "$7.852",
    image: "https://placehold.co/600x400",
    hint: "pokemon bottle",
    category: "Plástico",
    description: "Botella reutilizable de plástico resistente, con un diseño divertido y práctico. Llévala contigo al gimnasio, la oficina o donde quieras.",
  },
  {
    id: 4,
    title: "Termo Grabado",
    price: "$25.00",
    image: "https://placehold.co/600x400",
    hint: "engraved thermos",
    category: "Metal",
    description: "Termo de acero inoxidable con doble pared para una conservación óptima de la temperatura. Personalízalo con un grabado láser.",
    isFeatured: true,
  },
  {
    id: 5,
    title: "Taza Sublimada",
    price: "$10.00",
    image: "https://placehold.co/600x400",
    hint: "custom mug",
    category: "Cerámica",
    description: "Taza de cerámica de alta calidad, perfecta para sublimar con tus fotos, logos o diseños favoritos. Apta para microondas y lavavajillas.",
    isFeatured: true,
  },
  {
    id: 6,
    title: "Llavero de Acrílico",
    price: "$5.00",
    image: "https://placehold.co/600x400",
    hint: "acrylic keychain",
    category: "Acrílico",
    description: "Llavero de acrílico transparente, cortado con precisión láser. Un detalle único y personalizable.",
  },
  {
    id: 7,
    title: "Corte Láser en MDF",
    price: "$20.00",
    image: "https://placehold.co/600x400",
    hint: "laser cut",
    category: "MDF",
    description: "Servicio de corte láser en madera MDF para tus proyectos de maquetaría, decoración o artesanía. Alta precisión y acabados limpios.",
  },
  {
    id: 8,
    title: "Stickers de Vinilo",
    price: "$8.00",
    image: "https://placehold.co/600x400",
    hint: "vinyl stickers",
    category: "Varios",
    description: "Stickers de vinilo troquelados y resistentes al agua. Pégalos en tu laptop, botella, auto o donde prefieras.",
  },
  {
    id: 9,
    title: "Mochila Urbana",
    price: "$40.00",
    image: "https://placehold.co/600x400",
    hint: "urban backpack",
    category: "Indumentaria",
    description: "Una mochila con estilo y funcionalidad para la ciudad. Múltiples compartimentos y un diseño moderno que combina con todo.",
    isFeatured: true,
    options: {
      colors: ["#1f2937", "#9ca3af", "#4b5563"],
    }
  },
  {
    id: 10,
    title: "Botella Deportiva",
    price: "$18.00",
    image: "https://placehold.co/600x400",
    hint: "sports bottle",
    category: "Plástico",
    description: "Botella deportiva ergonómica con tapa segura para evitar derrames. Tu compañera ideal para cualquier actividad física.",
  },
  {
    id: 11,
    title: "Agenda Ecológica",
    price: "$22.00",
    image: "https://placehold.co/600x400",
    hint: "eco notebook",
    category: "Varios",
    description: "Agenda con tapas de cartón reciclado y hojas de papel ecológico. Organiza tus días de una manera sostenible.",
  },
   {
    id: 12,
    title: "Kit de Asado",
    price: "$55.00",
    image: "https://placehold.co/600x400",
    hint: "bbq kit",
    category: "Varios",
    description: "Completo kit de asado con utensilios de acero inoxidable y mango de madera, presentado en un práctico estuche.",
  },
  {
    id: 13,
    title: "Chomba pique lisa",
    price: "$15.00",
    image: "https://acdn-us.mitiendanube.com/stores/003/588/275/products/diseno-sin-titulo-49-20e1e7e1b38a868d1e16986916345035-1024-1024.webp",
    hint: "t-shirt",
    category: "Indumentaria",
    description: "Chomba pique, disponible en varios colores y talles. Ideal para estampar tus diseños con serigrafía, DTF o vinilo.",
    isFeatured: true,
    options: {
      colors: ["#ffffff", "#000000", "#3b82f6", "#ef4444"],
      sizes: ["S", "M", "L", "XL", "XXL"],
    }
  },
  {
    id: 14,
    title: "Gorra Bordada",
    price: "$12.50",
    image: "https://placehold.co/600x400",
    hint: "embroidered cap",
    category: "Indumentaria",
    description: "Gorra de gabardina con cierre ajustable. Personalízala con tu logo o diseño bordado para un acabado premium.",
    options: {
      colors: ["#000000", "#1e40af", "#b91c1c", "#15803d"],
    }
  },
  {
    id: 15,
    title: "Buso con Capucha",
    price: "$30.00",
    image: "https://placehold.co/600x400",
    hint: "hoodie design",
    category: "Indumentaria",
    description: "Buso de frisa invisible con capucha y bolsillo canguro. Cómodo, abrigado y perfecto para personalizar.",
    isFeatured: false,
    options: {
        colors: ["#374151", "#9ca3af", "#d1d5db"],
        sizes: ["S", "M", "L", "XL"],
    }
  },
  {
    id: 16,
    title: 'Mochila Antirrobo',
    price: '$75.00',
    image: 'https://placehold.co/600x400',
    hint: 'anti-theft backpack',
    category: 'Indumentaria',
    description: 'Viaja seguro con esta mochila de diseño antirrobo, con cierres ocultos y material resistente a cortes. Incluye puerto de carga USB.',
  },
  {
    id: 17,
    title: 'Set de Regalo Gourmet',
    price: '$120.00',
    image: 'https://placehold.co/600x400',
    hint: 'gourmet gift set',
    category: 'Varios',
    description: 'Un set de regalo exclusivo que incluye una selección de productos gourmet y accesorios de alta calidad. Ideal para ocasiones especiales.',
  },
  {
    id: 18,
    title: 'Power Bank de Bambú',
    price: '$45.00',
    image: 'https://placehold.co/600x400',
    hint: 'bamboo power bank',
    category: 'Varios',
    description: 'Cargador portátil con carcasa de bambú sostenible. Un regalo tecnológico y ecológico que puedes personalizar con tu logo.',
  },
  {
    id: 19,
    title: 'Vaso Térmico de Acero',
    price: '$28.00',
    image: 'https://placehold.co/600x400',
    hint: 'steel tumbler',
    category: 'Metal',
    description: 'Vaso térmico de acero inoxidable con tapa hermética. Mantiene tus bebidas frías o calientes por más tiempo. Perfecto para grabado láser.',
    isFeatured: true,
  },
  {
    id: 20,
    title: 'Kit de Oficina Completo',
    price: '$90.00',
    image: 'https://placehold.co/600x400',
    hint: 'office kit',
    category: 'Varios',
    description: 'Un kit completo para la oficina que incluye libreta, bolígrafo, taza y más, todo personalizable con la identidad de tu marca.',
  },
];
