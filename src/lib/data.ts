// src/lib/data.ts
import { Product, Review, Customer, News, CartItem, Subscriber } from './types';
import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc, serverTimestamp, query, orderBy, setDoc, Timestamp, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from 'firebase/auth';

export async function addProduct(productData: Omit<Product, 'id'>): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, 'products'), productData);
        return docRef.id;
    } catch (error) {
        console.error("❌ Error al añadir el producto:", error);
        throw new Error("No se pudo añadir el producto");
    }
}

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
            } as Review;
        });

    } catch (error) {
        console.error("❌ Error al obtener las reseñas:", error);
        return [];
    }
}

// Functions for News

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

export async function getNewsById(id: string): Promise<News | null> {
    try {
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const createdAt = data.createdAt;
            return {
                id: docSnap.id,
                ...data,
                // Ensure createdAt is a string if it's a Timestamp
                createdAt: createdAt?.toDate ? createdAt.toDate().toISOString() : createdAt
            } as News;
        }

        console.log(`No se encontró ninguna noticia con el id: ${id}`);
        return null;

    } catch(error) {
        console.error("❌ Error al obtener la noticia:", error);
        return null;
    }
}

// Functions for Cart
export async function saveUserCart(userId: string, cartItems: CartItem[]) {
  try {
    // Use doc(db, 'carts', userId) to create a reference with the user's ID
    const cartRef = doc(db, 'carts', userId);
    // Use setDoc to create or overwrite the document with the specific ID.
    // { merge: true } is crucial to prevent overwriting existing data if we only want to update.
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

// Function to check if a user is an admin
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

// Functions for Newsletter Subscribers
export async function addSubscriber(email: string): Promise<{ success: boolean; message: string }> {
    try {
        const subscriberRef = doc(db, 'subscribers', email);
        
        // Directly write the document. If it exists, it will be overwritten.
        // This avoids the need for a read operation and solves the permission issue.
        await setDoc(subscriberRef, {
            email: email,
            subscribedAt: serverTimestamp(),
        });

        // Since we are not checking for existence first, we simply return a success message.
        // We can add a more specific message if we check existence, but this is safer for now.
        return { success: true, message: '¡Gracias por suscribirte!' };
    } catch (error) {
        console.error("❌ Error al añadir suscriptor:", error);
        return { success: false, message: 'No se pudo completar la suscripción.' };
    }
}

export async function getSubscribers(): Promise<Subscriber[]> {
    try {
        const subscribersCollection = collection(db, "subscribers");
        const q = query(subscribersCollection, orderBy("subscribedAt", "desc"));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return [];
        }

        return snapshot.docs.map((doc) => {
            const data = doc.data();
            const subscribedAt = data.subscribedAt as Timestamp;
            return {
                id: doc.id,
                email: data.email,
                subscribedAt: subscribedAt ? subscribedAt.toDate().toLocaleDateString() : '',
            } as Subscriber;
        });

    } catch (error) {
        console.error("❌ Error al obtener suscriptores:", error);
        return [];
    }
}
