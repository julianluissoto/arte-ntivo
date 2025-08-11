// src/hooks/useAuth.tsx
'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { isUserAdmin } from '@/lib/data';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

const initialAuthState: AuthState = {
  user: null,
  isAdmin: false,
  loading: true,
};


const AuthContext = createContext<AuthState>(initialAuthState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
       
        const adminStatus = await isUserAdmin(user.uid);
    
        setAuthState({ user, isAdmin: adminStatus, loading: false });
      } else {
       
        setAuthState({ user: null, isAdmin: false, loading: false });
      }
    });

 
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
