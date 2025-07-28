"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { products } from "@/lib/mock-data";

const CATEGORIES = ["Indumentaria", "Accesorios", "Calzado", "Cerámica", "Plástico", "Acrílico", "MDF", "Metal", "Goma", "Varios"];
const COLORS = [
  { name: "Amarillo", value: "#fde047" },
  { name: "Negro", value: "#000000" },
  { name: "Rojo", value: "#dc2626" },
  { name: "Blanco", value: "#ffffff" }
];
const SIZES = ["XS", "S", "M", "L", "XL"];

// Aquí toda tu lista de productos para subir:
const productosParaSubir = [
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
  // ... Agregá aquí el resto de tus productos completos como los pasaste.
];

export default function ProductForm() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    stock: "",
    category: "",
    colors: [] as string[],
    sizes: [] as string[],
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const product = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      };
      await addDoc(collection(db, "products"), product);
      alert("Producto creado correctamente");
      setForm({
        title: "",
        price: "",
        stock: "",
        category: "",
        colors: [],
        sizes: [],
        image: "",
      });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Hubo un error al guardar el producto");
    }
  };

  // Nueva función para subir todos los productos del arreglo
  const subirTodosProductos = async () => {
    try {
      for (const producto of products) {
        // Si tu precio viene con "$" puedes limpiarlo así para convertir a número, opcional
        let precioNum = parseFloat(producto.price.toString().replace(/[^0-9.-]+/g, ""));
        // Asegúrate de que el campo 'price' sea number
        const productoAEnviar = { ...producto, price: precioNum };
        await addDoc(collection(db, "products"), productoAEnviar);
        console.log(`Producto ${producto.title} subido.`);
      }
      alert("Todos los productos fueron subidos a Firestore.");
    } catch (error) {
      console.error("Error subiendo productos:", error);
      alert("Hubo un error al subir los productos.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4"
      >
        <div>
          <Label>Título</Label>
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Título del producto"
            required
          />
        </div>

        <div>
          <Label>Precio</Label>
          <Input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Precio en ARS"
            required
          />
        </div>

        <div>
          <Label>Stock</Label>
          <Input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Cantidad disponible"
            required
          />
        </div>

        <div>
          <Label>Categoría</Label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Seleccionar...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Colores</Label>
          <select
            name="colors"
            multiple
            value={form.colors}
            onChange={(e) =>
              setForm({
                ...form,
                colors: Array.from(e.target.selectedOptions, (opt) => opt.value),
              })
            }
            className="w-full p-2 border border-gray-300 rounded"
          >
            {COLORS.map((color) => (
              <option key={color.value} value={color.value}>
                {color.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Talles</Label>
          <select
            name="sizes"
            multiple
            value={form.sizes}
            onChange={(e) =>
              setForm({
                ...form,
                sizes: Array.from(e.target.selectedOptions, (opt) => opt.value),
              })
            }
            className="w-full p-2 border border-gray-300 rounded"
          >
            {SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Imagen (URL)</Label>
          <Input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <Button type="submit" className="w-full mt-4">
          Crear producto
        </Button>
      </form>

      {/* Botón extra para subir todos los productos masivamente */}
      <div className="max-w-xl mx-auto p-6">
        <Button onClick={subirTodosProductos} className="w-full mt-6 bg-green-600 hover:bg-green-700">
          Subir todos los productos de prueba
        </Button>
      </div>
    </>
  );
}
