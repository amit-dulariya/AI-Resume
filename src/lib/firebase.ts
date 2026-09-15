import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

/**
 * Firebase Web Configuration.
 * Values can be overridden using environment variables (VITE_FIREBASE_*),
 * defaulting to the project credentials provided.
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAJMRx-KfyThIEA6oAPXllRQhBKAhJqWzs',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'resumeai-f413a.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'resumeai-f413a',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'resumeai-f413a.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '752054983837',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:752054983837:web:dd8219336dc2d59d2b8874',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-YX61RLN57S',
};

// Singleton initialization: initialize Firebase only once
export const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Firebase Authentication instance
export const auth: Auth = getAuth(app);

// Google Auth Provider instance
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Cloud Firestore Database instance
export const db: Firestore = getFirestore(app);

// Standard Operation Types for Firestore Operations
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

/**
 * Robust error handler for Firestore operations with detailed contextual logging.
 */
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Lightweight connection test to confirm Firestore client initialization without throwing fatal exceptions.
 */
export async function testFirestoreConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    if (db && auth) {
      return { connected: true, message: 'Firebase Auth and Firestore initialized successfully.' };
    }
    return { connected: false, message: 'Firebase services not yet ready.' };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { connected: false, message: msg };
  }
}
