// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/data";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("❌ Error al obtener los productos desde la API:", error);
    return NextResponse.json(
      { message: "Error al obtener los productos" },
      { status: 500 }
    );
  }
}
