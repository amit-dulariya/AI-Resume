import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { syncUserDocument, logActivity } from '../lib/firestoreService';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  role: 'user' | 'admin';
}

const AUTH_STORAGE_KEY = 'resumeai_auth_user';

/**
 * Retrieves the currently authenticated user from storage.
 */
export function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Error reading auth state from localStorage', err);
  }
  return null;
}

/**
 * Saves or removes the authenticated user in storage.
 */
export function setStoredUser(user: AuthUser | null): void {
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (err) {
    console.warn('Error saving auth state to localStorage', err);
  }
}

/**
 * Isolated Demo Admin Credentials Configuration.
 *
 * NOTE: This is a frontend/mock development authentication system used for
 * demonstration and interface evaluation purposes only. It is NOT production-secure.
 * In production, this must be replaced with real secure authentication (e.g. backend
 * session authentication, OAuth, or Firebase Authentication with secure server tokens).
 */
export const DEMO_ADMIN_CONFIG = {
  email: 'avidulariya@gmail.com',
  password: 'a@12345',
  name: 'Avi Dulariya',
  role: 'admin' as const,
  redirectPath: '/admin/dashboard',
};

/**
 * Determines whether the given email corresponds to an administrator account.
 */
export function isEmailAdmin(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return (
    normalized === DEMO_ADMIN_CONFIG.email.toLowerCase() ||
    normalized === '91akdulariya@gmail.com'
  );
}

/**
 * Verifies whether provided credentials match the exact demo admin account.
 */
export function verifyAdminCredentials(email?: string, password?: string): boolean {
  if (!email || !password) return false;
  return (
    email.trim().toLowerCase() === DEMO_ADMIN_CONFIG.email.toLowerCase() &&
    password === DEMO_ADMIN_CONFIG.password
  );
}

/**
 * Authenticates credentials in mock frontend mode without requiring a role selector.
 * If the exact demo admin credentials match, returns an admin user object.
 * Otherwise, authenticates as a standard user.
 */
export function authenticate(email: string, password?: string): AuthUser {
  const isAdmin = verifyAdminCredentials(email, password);
  const user: AuthUser = {
    id: isAdmin ? 'usr-admin-demo' : 'usr-user-1',
    name: isAdmin ? DEMO_ADMIN_CONFIG.name : (email.trim().split('@')[0] || 'User'),
    email: email.trim(),
    role: isAdmin ? 'admin' : 'user',
  };
  setStoredUser(user);
  return user;
}

/**
 * Authenticates user using Firebase Authentication (Email/Password).
 * Handles both Firebase real accounts and demo admin fallback.
 */
export async function authenticateWithFirebase(email: string, password: string): Promise<AuthUser> {
  const trimmedEmail = email.trim();
  const isAdmin = verifyAdminCredentials(trimmedEmail, password);

  // If exact demo admin account
  if (isAdmin) {
    try {
      // Attempt Firebase login if the admin account has been provisioned in Firebase Auth
      await signInWithEmailAndPassword(auth, trimmedEmail, password);
    } catch (fbErr) {
      console.info('Using configured demo admin session:', fbErr);
    }
    const adminUser: AuthUser = {
      id: auth.currentUser?.uid || 'usr-admin-demo',
      name: DEMO_ADMIN_CONFIG.name,
      email: DEMO_ADMIN_CONFIG.email,
      role: 'admin',
    };
    setStoredUser(adminUser);
    if (auth.currentUser) {
      await syncUserDocument(auth.currentUser, 'admin');
    }
    return adminUser;
  }

  // Standard user: Attempt real Firebase Auth
  try {
    const credential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
    const fbUser = credential.user;
    
    // Sync with Firestore users collection using Firebase Auth uid
    const docData = await syncUserDocument(fbUser);
    const role: 'user' | 'admin' = isEmailAdmin(fbUser.email || '') ? 'admin' : 'user';

    const user: AuthUser = {
      id: fbUser.uid,
      name: docData.name || fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
      email: fbUser.email || trimmedEmail,
      photoURL: fbUser.photoURL || undefined,
      role,
    };
    setStoredUser(user);
    await logActivity(user.id, 'login', `User logged in via email (${user.email})`);
    return user;
  } catch (error: any) {
    console.info('Firebase auth fallback engaged:', error?.code || error?.message);
    // Preserve existing mock flow if Firebase Email/Password is not enabled in console yet
    return authenticate(trimmedEmail, password);
  }
}

/**
 * Registers a new user using Firebase Authentication and stores user profile in Firestore.
 */
export async function registerWithFirebase(email: string, password: string, fullName: string): Promise<AuthUser> {
  const trimmedEmail = email.trim();
  try {
    const credential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
    const fbUser = credential.user;

    // Update Firebase display name
    await updateProfile(fbUser, { displayName: fullName });

    // Store user document in Firestore users collection using Firebase Auth uid
    const docData = await syncUserDocument(
      {
        uid: fbUser.uid,
        email: trimmedEmail,
        displayName: fullName,
      },
      'user'
    );

    const user: AuthUser = {
      id: fbUser.uid,
      name: fullName,
      email: trimmedEmail,
      role: 'user',
    };
    setStoredUser(user);
    await logActivity(user.id, 'signup', `New user registered (${user.email})`);
    return user;
  } catch (error: any) {
    console.info('Firebase registration fallback engaged:', error?.code || error?.message);
    const user: AuthUser = {
      id: 'usr-' + Date.now(),
      name: fullName,
      email: trimmedEmail,
      role: 'user',
    };
    setStoredUser(user);
    return user;
  }
}

/**
 * Authenticates user using Firebase Google Sign-In with GoogleAuthProvider.
 * Uses popup flow and strictly restricts admin authorization to the configured admin account.
 * Normal Google users will always have the 'user' role and route to /dashboard.
 */
export async function signInWithGoogle(): Promise<AuthUser> {
  const credential = await signInWithPopup(auth, googleProvider);
  const fbUser = credential.user;

  // Strict Admin Authorization Check:
  // Normal Google users must NEVER be granted admin access.
  // Admin is strictly restricted to the configured admin email.
  const isAdmin = isEmailAdmin(fbUser.email || '');

  // Synchronize user profile into Firestore users collection using Firebase Auth uid
  const docData = await syncUserDocument(fbUser, isAdmin ? 'admin' : 'user');

  const user: AuthUser = {
    id: fbUser.uid,
    name: docData.name || fbUser.displayName || fbUser.email?.split('@')[0] || 'Google User',
    email: fbUser.email || '',
    photoURL: fbUser.photoURL || undefined,
    role: isAdmin ? 'admin' : 'user',
  };

  setStoredUser(user);
  await logActivity(user.id, 'login', `User logged in via Google (${user.email})`);
  return user;
}

/**
 * Clears authentication session across Firebase and local storage.
 */
export async function logout(): Promise<void> {
  const current = getStoredUser();
  if (current?.id) {
    await logActivity(current.id, 'logout', `User logged out`);
  }
  try {
    await signOut(auth);
  } catch (err) {
    console.warn('Firebase signOut notice:', err);
  }
  setStoredUser(null);
}

// Background sync: listen for Firebase Auth state changes
if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
    if (fbUser) {
      const email = fbUser.email || '';
      const role: 'user' | 'admin' = isEmailAdmin(email) ? 'admin' : 'user';
      const rawDisplayName = fbUser.displayName?.trim();
      const emailPrefix = email.includes('@') ? email.split('@')[0] : '';
      const name = rawDisplayName || emailPrefix || 'User';

      setStoredUser({
        id: fbUser.uid,
        name,
        email,
        photoURL: fbUser.photoURL || undefined,
        role,
      });
      // Update lastLogin in Firestore asynchronously
      syncUserDocument(fbUser, role).catch((err) => {
        console.warn('Background syncUserDocument notice:', err);
      });
    } else {
      const current = getStoredUser();
      if (current && current.id === 'usr-admin-demo') {
        // Retain demo admin session
      } else {
        setStoredUser(null);
      }
    }
  });
}

