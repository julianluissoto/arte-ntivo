"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import { products } from "@/lib/mock-data";
import type { Product } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Trash2, Move } from "lucide-react";
import html2canvas from "html2canvas";

export default function CustomizePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    products[0]
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePosition, setImagePosition] = useState({ x: 100, y: 100 }); // en px
  const [imageSize, setImageSize] = useState(100);
  const [imageLoaded, setImageLoaded] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleProductChange = (productId: string) => {
    const product = products.find((p) => p.id.toString() === productId);
    setSelectedProduct(product || null);
    setUploadedImage(null);
    setImagePosition({ x: 100, y: 100 });
    setImageSize(100);
    setImageLoaded(false);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setImagePosition({ x: 100, y: 100 });
        setImageSize(100);
        setImageLoaded(false);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    isDragging.current = true;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    if (
      isDragging.current &&
      previewRef.current &&
      e.clientX !== 0 &&
      e.clientY !== 0
    ) {
      e.preventDefault();
      const previewRect = previewRef.current.getBoundingClientRect();

      let newX = e.clientX - previewRect.left;
      let newY = e.clientY - previewRect.top;

      // Limitar para que la imagen no se salga del contenedor
      newX = Math.max(0, Math.min(previewRect.width - imageSize, newX));
      newY = Math.max(0, Math.min(previewRect.height - imageSize, newY));

      setImagePosition({ x: newX, y: newY });
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const handleSaveDesign = async () => {
    if (!previewRef.current) return;

    if (uploadedImage && !imageLoaded) {
      alert(
        "Por favor espera que la imagen termine de cargar antes de descargar."
      );
      return;
    }

    const canvas = await html2canvas(previewRef.current, {
      // Puedes probar con esta opción para mejorar calidad:
      // scale: 2,
      useCORS: true,
      backgroundColor: null,
    });
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "mi-diseño.png";
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Personaliza tu Producto
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Elige un producto, sube tu diseño y mira cómo queda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Controles</CardTitle>
            <CardDescription>Configura tu producto aquí.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="product-select">1. Elige un producto</Label>
              <Select
                onValueChange={handleProductChange}
                defaultValue={selectedProduct?.id.toString()}
              >
                <SelectTrigger id="product-select">
                  <SelectValue placeholder="Selecciona un producto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-upload">2. Sube tu diseño</Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageUpload}
              />
            </div>

            {uploadedImage && (
              <div className="space-y-4 pt-4 border-t">
                <Label>3. Ajusta tu diseño</Label>
                <div className="space-y-2">
                  <Label htmlFor="size-slider">Tamaño: {imageSize}px</Label>
                  <Input
                    id="size-slider"
                    type="range"
                    min="20"
                    max="300"
                    value={imageSize}
                    onChange={(e) => setImageSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Move className="h-4 w-4" />
                  <span>Arrastra la imagen en el preview para posicionarla.</span>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="destructive"
                    className="w-full"
                    size="sm"
                    onClick={() => {
                      setUploadedImage(null);
                      setImageLoaded(false);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Quitar Imagen
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Vista Previa</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              ref={previewRef}
              className="relative w-full aspect-square bg-muted/30 rounded-lg overflow-hidden border border-dashed flex items-center justify-center"
              style={{ maxWidth: 600, maxHeight: 600 }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrag}
            >
              {selectedProduct ? (
                <Image
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  fill
                  style={{ objectFit: "contain" }}
                  data-ai-hint={selectedProduct.hint}
                  draggable={false}
                />
              ) : (
                <p className="text-muted-foreground">
                  Selecciona un producto para empezar.
                </p>
              )}
              {uploadedImage && (
                <div
                  className="absolute cursor-move"
                  style={{
                    left: `${imagePosition.x}px`,
                    top: `${imagePosition.y}px`,
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                    position: "absolute",
                    userSelect: "none",
                    // quitamos transform
                  }}
                  draggable
                  onDragStart={handleDragStart}
                  onDrag={handleDrag}
                  onDragEnd={handleDragEnd}
                >
                  <Image
                    src={uploadedImage}
                    alt="Uploaded design"
                    width={imageSize}
                    height={imageSize}
                    className="pointer-events-none"
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button onClick={handleSaveDesign}>Descargar Diseño</Button>
      </div>
    </div>
  );
}
