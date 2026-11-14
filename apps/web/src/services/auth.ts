'use client';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  adminRole?: string;
  avatar?: string;
}

const AUTH_STORAGE_KEY = 'talknex_user_session';
const AUTH_EVENT_KEY = 'talknex_user_auth_changed';

/**
 * Returns the currently signed-in user, or null if guest.
 */
export function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.user && parsed.user.name) {
      return parsed.user;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Derives user initials from their full name (e.g. "Karan Makwana" -> "KM").
 */
export function getUserInitials(name: string): string {
  if (!name || !name.trim()) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Sets the active authenticated user session.
 */
export function setAuthSession(user: AuthUser, token = 'user_session_token') {
  if (typeof window === 'undefined') return;
  try {
    const userWithAvatar: AuthUser = {
      ...user,
      avatar: user.avatar || getUserInitials(user.name)
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        token,
        user: userWithAvatar,
        timestamp: Date.now()
      })
    );
    document.cookie = `talknex_user=${encodeURIComponent(userWithAvatar.name)}; path=/; max-age=604800; SameSite=Lax`;
    window.dispatchEvent(new Event(AUTH_EVENT_KEY));
  } catch (e) {
    console.error('Failed to save user session:', e);
  }
}

/**
 * Clears the active user session and returns to guest state.
 */
export function clearAuthSession() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    document.cookie = 'talknex_user=; path=/; max-age=0; SameSite=Lax';
    window.dispatchEvent(new Event(AUTH_EVENT_KEY));
  } catch (e) {
    console.error('Failed to clear user session:', e);
  }
}

/**
 * Subscribes to authentication state changes across the application.
 */
export function subscribeAuth(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(AUTH_EVENT_KEY, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(AUTH_EVENT_KEY, callback);
    window.removeEventListener('storage', callback);
  };
}
