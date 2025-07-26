// src/components/CategorySidebarSuspense.tsx
"use client";

import { Suspense } from "react";
import CategorySidebar from "./CategorySidebar";

export default function CategorySidebarSuspense() {
  return (
    <Suspense fallback={<div className="p-4">Cargando menú...</div>}>
      <CategorySidebar />
    </Suspense>
  );
}
