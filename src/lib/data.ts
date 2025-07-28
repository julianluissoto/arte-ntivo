// src/lib/data.ts
import { Product } from './types';
import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getProducts(): Promise<Product[]> {
  try {
    const productsCollection = collection(db, "products");
    const snapshot = await getDocs(productsCollection);
    
    if (snapshot.empty) {
      console.log("No se encontraron productos en Firestore.");
      return [];
    }

    const firestoreProducts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Product));

    return firestoreProducts;
    
  } catch (error) {
    console.error("❌ Error al obtener los productos:", error);
    // En caso de error, devolvemos un array vacío para que la app no se rompa
    return [];
  }
}


export async function getProductById(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    
    console.log(`No se encontró ningún producto con el id: ${id}`);
    return null;

  } catch(error) {
      console.error("❌ Error al obtener el producto:", error);
      return null;
  }
}

export async function updateProduct(id: string, data: Partial<Omit<Product, 'id'>>) {
  try {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, data);
  } catch(error) {
    console.error("❌ Error al actualizar el producto:", error);
    throw new Error("No se pudo actualizar el producto");
  }
}

export async function deleteProduct(id: string) {
    try {
        const docRef = doc(db, "products", id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("❌ Error al eliminar el producto:", error);
        throw new Error("No se pudo eliminar el producto");
    }
}