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
  disponible?: boolean;
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
    },
    disponible: true,
  },
  {
    id: 2,
    title: "Taza plástica",
    price: "$3800",
    images: ["https://res.cloudinary.com/julian-soto/image/upload/v1753635033/arte-nativo-web/unnamed_wdytdj.png"],
    hint: "taza polimero",
    category: "Plástico",
    description: "Taza plastic sublimada, ideal para personalizar con tus fotos, logos o diseños favoritos. Ideal para el jardín de infantes.",
    disponible: true,
  },
  {
    id: 3,
    title: "Botella Gim",
    price: "$10000",
    images: ["https://www.dataprint.com.ar/wp-content/uploads/2023/09/1.jpg",
              "https://www.dataprint.com.ar/wp-content/uploads/2024/09/botella_plastica_agua_400_01.jpg"],
    hint: "bottle",
    category: "Plástico",
    description: "Botella reutilizable de plástico resistente, con diseño a elección. Ideal para el gimnasio , 750ml.",
    disponible: false,
  },
  {
    id: 4,
    title: "Termo Grabado laser",
    price: "$12000",
    images: ["https://http2.mlstatic.com/D_NQ_NP_932377-MLA80537285225_112024-O.webp",
      "https://down-mx.img.susercontent.com/file/c2ad292ab357096c784f1d5cf7588973",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753639293/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.50.37_0aa6ed20_kqknyv.jpg"
    ],
    hint: "termo grabado",
    category: "Metal",
    description: "Termo de acero inoxidable con doble pared para una conservación óptima de la temperatura. Personalízalo con un grabado láser.",
    isFeatured: true,
    disponible: true,
  },
  {
    id: 5,
    title: "Taza Sublimada",
    price: "$6000",
    images: ["https://acdn-us.mitiendanube.com/stores/004/209/518/products/img_0439-8fbce0053039c0e9d917298847854731-1024-1024.jpeg",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753640174/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.53.12_ac70ce2d_xxzqtt.jpg"
    ],
    hint: "custom mug",
    category: "Cerámica",
    description: "Taza de cerámica de alta calidad, perfecta para sublimar con tus fotos, logos o diseños favoritos. Apta para microondas y lavavajillas.",
    isFeatured: true,
    disponible: true,
  },
  {
    id: 6,
    title: "Llavero de Acrílico",
    price: "$2500",
    images: ["https://http2.mlstatic.com/D_NQ_NP_2X_959860-MLA79450592120_102024-F.webp",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753638548/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.48.26_5eae24c5_haqnth.jpg",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753638795/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.48.30_462c995a_djhlv1.jpg",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753638795/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.48.30_462c995a_djhlv1.jpg"
    ],
    hint: "acrylic keychain",
    category: "Acrílico",
    description: "Llavero de acrílico transparente, cortado con precisión láser. Un detalle único y personalizable.",
    disponible: true,
  },
  {
    id: 7,
    title: "Grabado láser en MDF",
    price: "$1000",
    images: ["https://sinergiapublicitaria.com/1329-large_default/corte-laser-y-grabado-mdf.jpg",
      "https://i0.wp.com/bibliotecadecorte.com/wp-content/uploads/2022/05/super-papa.png?resize=430%2C323&ssl=1",
      "https://www.copiart.com.ar/img/36953/CL421-03.jpg"
    ],
    hint: "laser cut",
    category: "MDF",
    description: "Servicio de corte láser en madera MDF para tus proyectos de maquetaría, decoración o artesanía. Alta precisión y acabados limpios.",
    disponible: true,
  },
  {
    id: 8,
    title: "Stickers de Vinilo",
    price: "$400",
    images: ["https://res.cloudinary.com/julian-soto/image/upload/v1753638870/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.48.51_fbe84710_w2myfl.jpg",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753638972/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.48.52_c4d57ade_vgtdsn.jpg"
    ],
    hint: "vinyl stickers",
    category: "Varios",
    description: "Sticker resistentes al agua. Ideal para personalizar tus objetos, laptops, botellas y más.Consulte por mayor.",
    disponible: true,
  },
  {
    id: 9,
    title: "Remera Lisa",
    price: "$15000",
    images: ["https://acdn-us.mitiendanube.com/stores/003/588/275/products/captura-de-pantalla-2025-03-10-163449-f9c131701469251c4517416352898205-1024-1024.webp"
    ],
    hint: "remera lisa",
    category: "Indumentaria",
    description: "Remera lisa de algodón 100% con corte moderno. Ideal para personalizar con serigrafía, DTF o vinilo. Disponible en varios colores y talles.",
    isFeatured: true,
    options: {
      colors: ["#1f2937", "#9ca3af", "#4b5563"],
    },
    disponible: true,
  },
  {
    id: 10,
    title: "Botella Deportiva",
    price: "$9200",
    images: ["https://res.cloudinary.com/julian-soto/image/upload/v1753634761/arte-nativo-web/unnamed_ugy5ec.png"],
    hint: "sports bottle",
    category: "Plástico",
    description: "Botella deportiva, doble capa, ergonómica con tapa segura para evitar derrames. Tu compañera ideal para cualquier actividad física. 750ml",
    disponible: true,
  },
  {
    id: 11,
    title: "Tarjetas personales x 100u",
    price: "$10000",
    images: ["https://res.cloudinary.com/julian-soto/image/upload/v1753640422/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.53.14_4f8164d5_ohtamq.jpg",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753640423/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.53.14_8b603b7a_jd4o56.jpg"
    ],
    hint: "tarjetas personales",
    category: "Varios",
    description: "Tarjetas personales personalizadas con tu diseño. Impresión de alta calidad en papel mate o brillante. Ideal para networking.",
    disponible: true,
  },
  {
    id: 12,
    title: "Kit de Asado",
    price: "$1800",
    images: ["https://res.cloudinary.com/julian-soto/image/upload/v1753639348/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.51.01_9e4c2309_ejmqk0.jpg",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753639350/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.51.01_1bd6ff3e_v2l6ec.jpg",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753639347/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.51.00_4704acb8_uxwyhl.jpg",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753639833/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.53.13_7fef6a4a_breztz.jpg"
    ],
    hint: "asado kit",
    category: "Varios",
    description: "Completo kit de asado con utensilios de acero inoxidable y mango de madera, con tabla de madera personalizable. Ideal para los amantes del asado.",
    disponible: true,
  },
  {
    id: 13,
    title: "Chomba pique lisa",
    price: "$25000",
    images: ["https://acdn-us.mitiendanube.com/stores/003/588/275/products/diseno-sin-titulo-49-20e1e7e1b38a868d1e16986916345035-1024-1024.webp"],
    hint: "t-shirt",
    category: "Indumentaria",
    description: "Chomba pique, disponible en varios colores y talles. Ideal para estampar tus diseños con serigrafía, DTF o vinilo.",
    isFeatured: true,
    options: {
      colors: ["#ffffff", "#000000", "#3b82f6", "#ef4444"],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    disponible: true,
  },
  {
    id: 14,
    title: "GorraPersonalizada",
    price: "$6900",
    images: ["https://http2.mlstatic.com/D_NQ_NP_963783-MLA80391926769_112024-O.webp",
      "https://www.subli-star.com/wp-content/uploads/Cap-customization-1-1200x900-cropped.webp"
    ],
    hint: "gorra personalizada",
    category: "Indumentaria",
    description: "Gorra de poliester con cierre ajustable. Personalízala con tu logo o diseño para un acabado premium.",
    options: {
      colors: ["#000000", "#1e40af", "#b91c1c", "#15803d"],
    },
    disponible: true,
  },
  {
    id: 15,
    title: "Buso con Capucha",
    price: "$32000",
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
    },
    disponible: true,
  },
  {
    id: 16,
    title: 'Buso clasico',
    price: '$28000',
    images: ['https://http2.mlstatic.com/D_NQ_NP_763210-MLA78000071296_082024-O.webp',
      "https://i0.wp.com/juva.com.ar/wp-content/uploads/2024/07/buzo-clasico-personalizado-rojo.jpg?fit=1000%2C1000&ssl=1"
    ],
    hint: 'buso clasico',
    category: 'Indumentaria',
    description: 'Buso clasico de algodón peinado. Ideal para personalizar con vinilo o DTF. Disponible en varios colores y talles.',
    isFeatured: false,
    options: {
      colors: ["#374151", "#9ca3af", "#d1d5db", "#033d1aff", "#ee0b0bff"],
      sizes: ["S", "M", "L", "XL"],
    },
    disponible: true,
  },
  {
    id: 17,
    title: 'Set de Regalo Gourmet',
    price: '$120',
    images: ['https://placehold.co/600x400'],
    hint: 'gourmet gift set',
    category: 'Varios',
    description: 'Un set de regalo exclusivo que incluye una selección de productos gourmet y accesorios de alta calidad. Ideal para ocasiones especiales.',
    disponible: false,
  },
  {
    id: 18,
    title: 'Power Bank de Bambú',
    price: '$45',
    images: ['https://placehold.co/600x400'],
    hint: 'bamboo power bank',
    category: 'Varios',
    description: 'Cargador portátil con carcasa de bambú sostenible. Un regalo tecnológico y ecológico que puedes personalizar con tu logo.',
    disponible: false,
  },
  {
    id: 19,
    title: 'Chop aluminio',
    price: '$12000',
    images: ['https://http2.mlstatic.com/D_NQ_NP_643883-MLA69658037295_052023-O.webp'],
    hint: 'steel tumbler',
    category: 'Metal',
    description: 'Chop de aluminio de alta calidad, Personalizable con grabado láser o sublimado',
    isFeatured: true,
    disponible: true,
  },
  {
    id: 20,
    title: 'Kit de Oficina Completo',
    price: '$90',
    images: ['https://placehold.co/600x400'],
    hint: 'office kit',
    category: 'Varios',
    description: 'Un kit completo para la oficina que incluye libreta, bolígrafo, taza y más, todo personalizable con la identidad de tu marca.',
    disponible: false,
  },
  {
    id: 21,
    title: "Llavero plastico formas varias",
    price: "$2500",
    images: ["https://lomassublimado.com.ar/2719-thickbox_default/llaveros-pack-05-animal-print-vol-2.jpg"],
    hint: "llavero plástico",
    category: "Plástico",
    description: "LLavero plastico con formas varias, ideal para personalizar con tu logo o diseño. Disponible en varias formas. Consulte precio por mayor.",
    disponible: true,
  },
  {
    id: 22,
    title: "Sello automatizado",
    price: "$9500",
    images: ["https://villamitre.tecknicam3d.com.ar/wp-content/uploads/2025/06/Sello-De-Goma-Para-Sellos-Automaticos-Con-Goma-Laserable-1-1.webp"],
    hint: "Sello automatizado",
    category: "Goma",
    description: "Sello automatizado con goma grabada a láser. Ideal para personalizar documentos, tarjetas o cualquier material impreso.",
    disponible: true,
  },
  {
    id: 23,
    title: 'Pin metálico 3cm x 20u.',
    price: '$8800',
    images: ["https://res.cloudinary.com/julian-soto/image/upload/v1753639022/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.49.44_41f857fd_liuhhr.jpg",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753639020/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.49.43_e9a4e888_vdbzyr.jpg",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753639019/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.49.41_2b89b22f_b8tmnx.jpg",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753639257/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.49.45_46f26450_wjyg1t.jpg"
    ],
    hint: 'pin metalico',
    category: 'Metal',
    description: 'Pin metálico de 3cm, ideal para personalizar con tu logo o diseño. Perfecto para eventos, promociones o regalos corporativos.',
    isFeatured: true,
    disponible: true,
  },
  {
    id: 24,
    title: 'Imanes 10 x 8cm x 30u',
    price: '$7500',
    images: ['https://res.cloudinary.com/julian-soto/image/upload/v1753639484/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.51.31_5916d812_k7wtrb.jpg'],
    hint: 'imanes',
    category: 'Varios',
    description: 'Imanes personalizables para heladera o cualquier superficie metálica. Perfectos para promociones, eventos o regalos personalizados.',
    disponible: true,
  },
  {
    id: 25,
    title: 'Etiqueta cuero sintético',
    price: '$34000',
    images: ['https://res.cloudinary.com/julian-soto/image/upload/v1753639652/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.53.07_05d70d17_bocnor.jpg',
      "https://res.cloudinary.com/julian-soto/image/upload/v1753639718/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.51.31_7b5844db_ctbtnl.jpg",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753639801/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.53.11_b87ea119_rdu7b4.jpg"

    ],
    hint: 'imanes',
    category: 'Varios',
    description: '4 X 2cm x 100 unidades. Ideales para ropa, accesorios o productos artesanales. Agrega un toque de elegancia a tus creaciones.',
    disponible: true,
  },
  {
    id: 26,
    title: 'Encendedor Personalizado x 50u',
    price: '$34000',
    images: ['https://res.cloudinary.com/julian-soto/image/upload/v1753639935/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.53.15_da4d9234_rdsu15.jpg',
      "https://res.cloudinary.com/julian-soto/image/upload/v1753639935/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.53.15_da4d9234_rdsu15.jpg",
      "https://res.cloudinary.com/julian-soto/image/upload/v1753639883/arte-nativo-web/WhatsApp_Image_2025-07-27_at_14.53.14_1f8f0fda_vsoe0n.jpg"

    ],
    hint: 'encendedor',
    category: 'Varios',
    description: 'Personaliza tus encendedores con tu logo o diseño. Perfectos para promociones, eventos o regalos corporativos.',
    disponible: true,
  },
  {
    id: 27,
    title: 'Lapiz de bambú Personalizado x 12u',
    price: '$25000',
    images: ['https://res.cloudinary.com/julian-soto/image/upload/v1753640025/arte-nativo-web/WhatsApp_Image_2025-07-27_at_15.13.29_4ff00623_wa6vfy.jpg',

    ],
    hint: 'lapicera',
    category: 'Varios',
    description: 'Lapiz de bambú personalizado, ideal para eventos, promociones o regalos corporativos. Ecológico y elegante.',
    disponible: true,
  },
];
