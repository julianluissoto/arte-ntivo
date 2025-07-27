
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
  images: string[];
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
    price: "$13000",
    images: ["https://http2.mlstatic.com/D_844317-MLA81922995879_012025-O.jpg"],
    hint: "black backpack",
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
    images: ["https://placehold.co/600x400"],
    hint: "blue cooler",
    category: "Plástico",
    description: "Mantén tus bebidas frías durante horas con este cooler de gran capacidad. Perfecto para picnics, playa o cualquier salida al aire libre.",
  },
  {
    id: 3,
    title: "Botella Jim",
    price: "$7.852",
    images: ["https://placehold.co/600x400"],
    hint: "pokemon bottle",
    category: "Plástico",
    description: "Botella reutilizable de plástico resistente, con un diseño divertido y práctico. Llévala contigo al gimnasio, la oficina o donde quieras.",
  },
  {
    id: 4,
    title: "Termo Grabado laser",
    price: "$12000.00",
    images: ["https://http2.mlstatic.com/D_NQ_NP_932377-MLA80537285225_112024-O.webp",
      "https://down-mx.img.susercontent.com/file/c2ad292ab357096c784f1d5cf7588973"
    ],
    hint: "engraved thermos",
    category: "Metal",
    description: "Termo de acero inoxidable con doble pared para una conservación óptima de la temperatura. Personalízalo con un grabado láser.",
    isFeatured: true,
  },
  {
    id: 5,
    title: "Taza Sublimada",
    price: "$6000.00",
    images: ["https://acdn-us.mitiendanube.com/stores/004/209/518/products/img_0439-8fbce0053039c0e9d917298847854731-1024-1024.jpeg"],
    hint: "custom mug",
    category: "Cerámica",
    description: "Taza de cerámica de alta calidad, perfecta para sublimar con tus fotos, logos o diseños favoritos. Apta para microondas y lavavajillas.",
    isFeatured: true,
  },
  {
    id: 6,
    title: "Llavero de Acrílico",
    price: "$5.00",
    images: ["https://placehold.co/600x400"],
    hint: "acrylic keychain",
    category: "Acrílico",
    description: "Llavero de acrílico transparente, cortado con precisión láser. Un detalle único y personalizable.",
  },
  {
    id: 7,
    title: "Corte Láser en MDF",
    price: "$20.00",
    images: ["https://placehold.co/600x400"],
    hint: "laser cut",
    category: "MDF",
    description: "Servicio de corte láser en madera MDF para tus proyectos de maquetaría, decoración o artesanía. Alta precisión y acabados limpios.",
  },
  {
    id: 8,
    title: "Stickers de Vinilo",
    price: "$8.00",
    images: ["https://placehold.co/600x400"],
    hint: "vinyl stickers",
    category: "Varios",
    description: "Stickers de vinilo troquelados y resistentes al agua. Pégalos en tu laptop, botella, auto o donde prefieras.",
  },
  {
    id: 9,
    title: "Remera Lisa",
    price: "$15000.00",
    images: ["https://acdn-us.mitiendanube.com/stores/003/588/275/products/captura-de-pantalla-2025-03-10-163449-f9c131701469251c4517416352898205-1024-1024.webp",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,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"
    ],
    hint: "remera lisa",
    category: "Indumentaria",
    description: "Remera lisa de algodón 100% con corte moderno. Ideal para personalizar con serigrafía, DTF o vinilo. Disponible en varios colores y talles.",
    isFeatured: true,
    options: {
      colors: ["#1f2937", "#9ca3af", "#4b5563"],
    }
  },
  {
    id: 10,
    title: "Botella Deportiva",
    price: "$18.00",
    images: ["https://placehold.co/600x400"],
    hint: "sports bottle",
    category: "Plástico",
    description: "Botella deportiva ergonómica con tapa segura para evitar derrames. Tu compañera ideal para cualquier actividad física.",
  },
  {
    id: 11,
    title: "Agenda Ecológica",
    price: "$22.00",
    images: ["https://placehold.co/600x400"],
    hint: "eco notebook",
    category: "Varios",
    description: "Agenda con tapas de cartón reciclado y hojas de papel ecológico. Organiza tus días de una manera sostenible.",
  },
   {
    id: 12,
    title: "Kit de Asado",
    price: "$55.00",
    images: ["https://placehold.co/600x400"],
    hint: "bbq kit",
    category: "Varios",
    description: "Completo kit de asado con utensilios de acero inoxidable y mango de madera, presentado en un práctico estuche.",
  },
  {
    id: 13,
    title: "Chomba pique lisa",
    price: "$25000.00",
    images: ["https://acdn-us.mitiendanube.com/stores/003/588/275/products/diseno-sin-titulo-49-20e1e7e1b38a868d1e16986916345035-1024-1024.webp"],
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
    images: ["https://placehold.co/600x400"],
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
    price: "$30000.00",
    images: [
        "https://acdn-us.mitiendanube.com/stores/001/642/173/products/buzo-hoodie-rojo-b2e6d774c33c3375fb17197766136403-1024-1024.png",
        "https://acdn-us.mitiendanube.com/stores/001/642/173/products/buzo-hoodie-francia-ce28b88acd1141bbed17197763128250-1024-1024.png",
        "https://http2.mlstatic.com/D_NQ_NP_605250-MLA54095883335_032023-O.webp",
        "https://placehold.co/600x400",
    ],
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
    images: ['https://placehold.co/600x400'],
    hint: 'anti-theft backpack',
    category: 'Indumentaria',
    description: 'Viaja seguro con esta mochila de diseño antirrobo, con cierres ocultos y material resistente a cortes. Incluye puerto de carga USB.',
  },
  {
    id: 17,
    title: 'Set de Regalo Gourmet',
    price: '$120.00',
    images: ['https://placehold.co/600x400'],
    hint: 'gourmet gift set',
    category: 'Varios',
    description: 'Un set de regalo exclusivo que incluye una selección de productos gourmet y accesorios de alta calidad. Ideal para ocasiones especiales.',
  },
  {
    id: 18,
    title: 'Power Bank de Bambú',
    price: '$45.00',
    images: ['https://placehold.co/600x400'],
    hint: 'bamboo power bank',
    category: 'Varios',
    description: 'Cargador portátil con carcasa de bambú sostenible. Un regalo tecnológico y ecológico que puedes personalizar con tu logo.',
  },
  {
    id: 19,
    title: 'Vaso Térmico de Acero',
    price: '$28.00',
    images: ['https://placehold.co/600x400'],
    hint: 'steel tumbler',
    category: 'Metal',
    description: 'Vaso térmico de acero inoxidable con tapa hermética. Mantiene tus bebidas frías o calientes por más tiempo. Perfecto para grabado láser.',
    isFeatured: true,
  },
  {
    id: 20,
    title: 'Kit de Oficina Completo',
    price: '$90.00',
    images: ['https://placehold.co/600x400'],
    hint: 'office kit',
    category: 'Varios',
    description: 'Un kit completo para la oficina que incluye libreta, bolígrafo, taza y más, todo personalizable con la identidad de tu marca.',
  },
];
