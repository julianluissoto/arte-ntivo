// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Accede a las variables de entorno usando process.env
const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Puede ser undefined si está vacío
};

// Asegúrate de que las variables requeridas existan
if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
  console.error("❌ Error: Firebase environment variables are not properly configured.");
  // Puedes lanzar un error o manejarlo de otra manera si prefieres
  // throw new Error("Firebase environment variables are missing.");
}

// Initialize Firebase for SSR
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig as any); // 'as any' para evitar errores de tipo con undefined si measurementId es opcional

// Initialize Auth for SSR
const auth: Auth = getAuth(app);

// Initialize Firestore for SSR
const db: Firestore = getFirestore(app);

export { app, auth, db };