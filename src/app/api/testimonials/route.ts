// lib/data.ts (o un nuevo archivo como lib/testimonials.ts)
import { Testimonial } from "@/lib/types";

export async function getTestimonials(): Promise<Testimonial[]> {
  // Aquí es donde harías tu llamada a la API o base de datos
  // Por ahora, simulamos algunos datos:
  return [
    {
      id: "1",
      author: "Ana García",
      text: "¡Absolutamente encantada con mi compra! La calidad es muy buena y la atención aun mejor. Recomiendo Art nativo.",
      rating: 5,
      avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: "2",
      author: "Juan Garcia",
      text: "Excelente servicio al cliente y productos muy innovadores. La calidad de las remeras es excepcional.",
      rating: 4,
      avatarUrl: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      id: "3",
      author: "María López",
      text: "Me sorprendió la durabilidad del producto. Es exactamente lo que necesitaba y a un precio justo. ¡Volveré a comprar aquí!",
      rating: 5,
      avatarUrl: "https://randomuser.me/api/portraits/women/23.jpg",
    },
    {
      id: "4",
      author: "Carlos Ruiz",
      text: "EL pedido fue excatamente como lo esperaba. La atención  muy amable y resolvió todas mis dudas rápidamente.",
      rating: 4,
      avatarUrl: "https://randomuser.me/api/portraits/men/78.jpg",
    },
    {
      id: "5",
      author: "Sofía Martínez",
      text: "Realmente aprecio la atención al detalle en los empaques. ¡Se nota que se preocupan por sus clientes!",
      rating: 5,
      avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ];
}