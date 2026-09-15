import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import {
  AuthUser,
  getStoredUser,
  setStoredUser,
  isEmailAdmin,
  logout as authLogout,
  signInWithGoogle as authSignInWithGoogle,
  authenticateWithFirebase as authAuthenticateWithFirebase,
  registerWithFirebase as authRegisterWithFirebase,
} from '../utils/auth';
import { syncUserDocument } from '../lib/firestoreService';

export interface AuthContextType {
  user: AuthUser | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<AuthUser>;
  authenticateWithFirebase: (email: string, password: string) => Promise<AuthUser>;
  registerWithFirebase: (email: string, password: string, fullName: string) => Promise<AuthUser>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  isLoading: true,
  logout: async () => {},
  signInWithGoogle: async () => ({} as AuthUser),
  authenticateWithFirebase: async () => ({} as AuthUser),
  registerWithFirebase: async () => ({} as AuthUser),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(() => auth.currentUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Single source of truth: Firebase Auth onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        setFirebaseUser(fbUser);
        const email = fbUser.email || '';
        const role: 'user' | 'admin' = isEmailAdmin(email) ? 'admin' : 'user';

        // Derive clean display name:
        // 1. Firebase displayName
        // 2. Email username (prefix before @)
        // 3. 'User'
        const rawDisplayName = fbUser.displayName?.trim();
        const emailPrefix = email.includes('@') ? email.split('@')[0] : '';
        const name = rawDisplayName || emailPrefix || 'User';

        const authUser: AuthUser = {
          id: fbUser.uid,
          name,
          email,
          photoURL: fbUser.photoURL || undefined,
          role,
        };

        setUser(authUser);
        setStoredUser(authUser);
        setIsLoading(false);

        // Update Firestore profile and lastLogin asynchronously
        syncUserDocument(fbUser, role).catch((err) => {
          console.warn('Background syncUserDocument notice:', err);
        });
      } else {
        setFirebaseUser(null);
        // If an explicit demo admin session exists
        const stored = getStoredUser();
        if (stored && stored.id === 'usr-admin-demo') {
          setUser(stored);
        } else {
          setUser(null);
          setStoredUser(null);
        }
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await authLogout();
    setUser(null);
    setFirebaseUser(null);
  };

  const handleGoogleSignIn = async () => {
    const signedInUser = await authSignInWithGoogle();
    setUser(signedInUser);
    setFirebaseUser(auth.currentUser);
    return signedInUser;
  };

  const handleEmailAuth = async (email: string, pass: string) => {
    const authenticated = await authAuthenticateWithFirebase(email, pass);
    setUser(authenticated);
    setFirebaseUser(auth.currentUser);
    return authenticated;
  };

  const handleEmailRegister = async (email: string, pass: string, name: string) => {
    const registered = await authRegisterWithFirebase(email, pass, name);
    setUser(registered);
    setFirebaseUser(auth.currentUser);
    return registered;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        isLoading,
        logout: handleLogout,
        signInWithGoogle: handleGoogleSignIn,
        authenticateWithFirebase: handleEmailAuth,
        registerWithFirebase: handleEmailRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
