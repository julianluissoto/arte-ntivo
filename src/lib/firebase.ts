// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "arte-nativo-web",
  appId: "1:85303509430:web:f755cac3777c438d040117",
  storageBucket: "arte-nativo-web.firebasestorage.app",
  apiKey: "AIzaSyBk_6sf1AY5Q3jF7tOd_vt5NQ0YJGVWTx0",
  authDomain: "arte-nativo-web.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "85303509430"
};

// Initialize Firebase for SSR
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth for SSR
const auth: Auth = getAuth(app);

// Initialize Firestore for SSR
const db: Firestore = getFirestore(app);

export { app, auth, db };
