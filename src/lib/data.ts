// src/lib/data.ts
import { Product, Review, Customer, News, CartItem } from './types';
import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc, serverTimestamp, query, orderBy, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from 'firebase/auth';

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

// Functions for Customers and Reviews

export async function addUserToCustomers(user: User) {
    const customerRef = doc(db, 'customers', user.uid);
    const customerSnap = await getDoc(customerRef);

    if (!customerSnap.exists()) {
        const customerData: Customer = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || 'Usuario Anónimo',
            photoURL: user.photoURL,
        };
        await setDoc(customerRef, customerData);
    }
}

export async function addReview(review: Omit<Review, 'id' | 'createdAt'>) {
    try {
        await addDoc(collection(db, 'reviews'), {
            ...review,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("❌ Error al añadir la reseña:", error);
        throw new Error("No se pudo enviar la reseña");
    }
}

export async function getReviews(): Promise<Review[]> {
    try {
        const reviewsCollection = collection(db, "reviews");
        const q = query(reviewsCollection, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return [];
        }

        return snapshot.docs.map((doc) => {
            const data = doc.data();
            const createdAt = data.createdAt as Timestamp;

            return {
                id: doc.id,
                ...data,
                createdAt: createdAt ? createdAt.toDate().toISOString() : new Date().toISOString(),
            } as unknown as Review;
        });

    } catch (error) {
        console.error("❌ Error al obtener las reseñas:", error);
        return [];
    }
    
}

export async function addNews(news: Omit<News, 'id' | 'createdAt'>) {
    try {
        await addDoc(collection(db, 'news'), {
            ...news,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("❌ Error al añadir la novedad:", error);
        throw new Error("No se pudo enviar la novedad");
    }
}

export async function getNews(): Promise<News[]> {
    try {
        const newsCollection = collection(db, "news");
        const q = query(newsCollection, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return [];
        }

        return snapshot.docs.map((doc) => {
            const data = doc.data();
            const createdAt = data.createdAt as Timestamp;

            return {
                id: doc.id,
                ...data,
                createdAt: createdAt ? createdAt.toDate().toISOString() : new Date().toISOString(),
            } as News;
        });

    } catch (error) {
        console.error("❌ Error al obtener las novedades:", error);
        return [];
    }
    
}


export async function saveUserCart(userId: string, cartItems: CartItem[]) {
  try {
    const cartRef = doc(db, 'carts', userId);
    await setDoc(cartRef, { items: cartItems, updatedAt: serverTimestamp() }, { merge: true });
  } catch (error) {
    console.error('❌ Error saving user cart to Firestore:', error);
  }
}

export async function getUserCart(userId: string): Promise<CartItem[]> {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      return cartSnap.data().items as CartItem[];
    }
    return [];
  } catch (error) {
    console.error('❌ Error fetching user cart from Firestore:', error);
    return [];
  }
}

export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const adminDocRef = doc(db, 'admins', userId);
    const adminDocSnap = await getDoc(adminDocRef);
    // Returns true if the document exists, false otherwise
    return adminDocSnap.exists();
  } catch (error) {
    console.error('❌ Error checking admin status:', error);
    return false; // Default to false in case of error
  }
}
