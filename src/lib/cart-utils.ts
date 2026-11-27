// src/lib/cart-utils.ts
// Utilidades del carrito: precios, nombres de color y armado del pedido por WhatsApp.
import type { CartItem, Product } from "./types";

/** Convierte "$13000", "$13.000" o "13.000,50" en número. */
export function parsePrice(value?: string | null): number {
  if (!value) return 0;
  let s = String(value).replace(/[^\d.,]/g, "");
  if (s.includes(",")) {
    // Formato argentino: punto de miles, coma decimal.
    s = s.replace(/\./g, "").replace(",", ".");
  } else if (/\.\d{3}(\.|$)/.test(s)) {
    // "13.000" → punto como separador de miles.
    s = s.replace(/\./g, "");
  }
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

export function formatPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

/** Precio unitario efectivo: el de oferta si existe. */
export function unitPrice(product: Pick<Product, "price" | "salePrice">): number {
  const sale = parsePrice(product.salePrice);
  return sale > 0 ? sale : parsePrice(product.price);
}

/** Clave única por producto + variante, para que "Remera M negra" y "Remera L blanca" sean líneas distintas. */
export function cartLineKey(id: string, color?: string, size?: string): string {
  return [id, color ?? "", size ?? ""].join("|");
}

const COLOR_NAMES: Record<string, string> = {
  "#ffffff": "Blanco",
  "#000000": "Negro",
  "#3b82f6": "Azul",
  "#1e40af": "Azul marino",
  "#ef4444": "Rojo",
  "#b91c1c": "Bordó",
  "#22c55e": "Verde",
  "#15803d": "Verde oscuro",
  "#fde047": "Amarillo",
  "#f97316": "Naranja",
  "#a855f7": "Violeta",
  "#ec4899": "Rosa",
  "#6b7280": "Gris",
  "#9ca3af": "Gris claro",
  "#78350f": "Marrón",
};

/** Nombre legible de un color guardado como hex (o el valor tal cual si ya es un nombre). */
export function colorName(color?: string): string | undefined {
  if (!color) return undefined;
  return COLOR_NAMES[color.toLowerCase()] ?? color;
}

export type DeliveryMethod = "retiro" | "envio";

export interface OrderDetails {
  name: string;
  delivery: DeliveryMethod;
  city?: string;
  notes?: string;
}

export function buildWhatsAppOrderMessage(items: CartItem[], details: OrderDetails): string {
  const lines: string[] = ["¡Hola Arte Nativo! 👋 Quiero hacer este pedido:", ""];

  items.forEach((item, i) => {
    const price = unitPrice(item);
    lines.push(`${i + 1}. *${item.title}* × ${item.quantity}`);
    const variant = [
      item.selectedSize && `Talle: ${item.selectedSize}`,
      item.selectedColor && `Color: ${colorName(item.selectedColor)}`,
    ].filter(Boolean);
    if (variant.length) lines.push(`   ${variant.join(" · ")}`);
    if (price > 0) {
      lines.push(`   ${formatPrice(price)} c/u → ${formatPrice(price * item.quantity)}`);
    }
  });

  const total = items.reduce((acc, it) => acc + unitPrice(it) * it.quantity, 0);
  lines.push("", `*Total estimado: ${formatPrice(total)}*`, "");

  if (details.name.trim()) lines.push(`Nombre: ${details.name.trim()}`);
  lines.push(
    details.delivery === "envio"
      ? `Entrega: Envío${details.city?.trim() ? ` a ${details.city.trim()}` : ""}`
      : "Entrega: Retiro en el local"
  );
  if (details.notes?.trim()) lines.push(`Notas: ${details.notes.trim()}`);

  lines.push("", "Les paso el diseño/logo por acá. ¡Gracias!");
  return lines.join("\n");
}
