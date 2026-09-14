export interface AuthUser {
  id: string;
  name: string;
  email: string;
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
 * Determines whether the given email corresponds to an administrator account.
 * Handles admin emails like admin@resumeai.io, admin@example.com, or any admin handle.
 */
export function isEmailAdmin(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return (
    normalized.startsWith('admin@') ||
    normalized.includes('admin') ||
    normalized === 'admin@resumeai.io' ||
    normalized === 'admin@example.com'
  );
}

/**
 * Authenticates credentials in mock frontend mode.
 * Determines admin access from the account credentials without role-selection UI.
 */
export function authenticate(email: string, _password?: string): AuthUser {
  const isAdmin = isEmailAdmin(email);
  const user: AuthUser = {
    id: isAdmin ? 'usr-admin-1' : 'usr-user-1',
    name: isAdmin ? 'System Administrator' : (email.split('@')[0] || 'Alexander Wright'),
    email: email.trim(),
    role: isAdmin ? 'admin' : 'user',
  };
  setStoredUser(user);
  return user;
}

/**
 * Clears authentication session.
 */
export function logout(): void {
  setStoredUser(null);
}
