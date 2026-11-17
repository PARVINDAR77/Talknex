'use client';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  adminRole?: string;
  avatar?: string;
  company?: string;
  createdAt?: string;
}

export interface RegisteredAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  company?: string;
  role: string;
  createdAt: string;
}

const AUTH_STORAGE_KEY = 'talknex_user_session';
const AUTH_ACCOUNTS_KEY = 'talknex_registered_accounts';
const AUTH_EVENT_KEY = 'talknex_user_auth_changed';

const ADMIN_AUTH_STORAGE_KEY = 'talknex_admin_session';
const ADMIN_AUTH_EVENT_KEY = 'talknex_admin_auth_changed';

export const DEFAULT_ACCOUNTS: RegisteredAccount[] = [
  {
    id: 'usr_karan',
    name: 'Karan Makwana',
    email: 'karan@emperorsmartsolutions.com',
    password: 'Password@123',
    company: 'Emperor Smart Solutions',
    role: 'Enterprise Client',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'usr_admin',
    name: 'Platform Administrator',
    email: 'admin@talknex.com',
    password: 'Admin@123',
    company: 'TalkNex Enterprise',
    role: 'Super Admin',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'usr_demo',
    name: 'Demo Enterprise Account',
    email: 'demo@talknex.com',
    password: 'Demo@123',
    company: 'TalkNex Global',
    role: 'Super Admin',
    createdAt: '2026-01-01T00:00:00.000Z'
  }
];

/**
 * Retrieves all registered accounts from local storage, seeded with defaults.
 */
export function getRegisteredAccounts(): RegisteredAccount[] {
  if (typeof window === 'undefined') return DEFAULT_ACCOUNTS;
  try {
    const raw = localStorage.getItem(AUTH_ACCOUNTS_KEY);
    if (!raw) {
      localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      return DEFAULT_ACCOUNTS;
    }
    const accounts: RegisteredAccount[] = JSON.parse(raw);
    // Ensure default demo accounts are always included
    const missingDefaults = DEFAULT_ACCOUNTS.filter(
      (def) => !accounts.some((acc) => acc.email.toLowerCase() === def.email.toLowerCase())
    );
    if (missingDefaults.length > 0) {
      const merged = [...accounts, ...missingDefaults];
      localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(merged));
      return merged;
    }
    return accounts;
  } catch {
    return DEFAULT_ACCOUNTS;
  }
}

/**
 * Authenticates user credentials against the registered accounts database.
 */
export function authenticateUser(
  emailInput: string,
  passwordInput: string
): { success: boolean; error?: string; user?: AuthUser } {
  const email = emailInput?.trim().toLowerCase();
  const password = passwordInput?.trim();

  if (!email) {
    return { success: false, error: 'Please enter your work or personal email address.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please enter a valid email address (e.g. name@company.com).' };
  }
  if (!password) {
    return { success: false, error: 'Please enter your account password.' };
  }

  const accounts = getRegisteredAccounts();
  const foundAccount = accounts.find((acc) => acc.email.toLowerCase() === email);

  if (!foundAccount) {
    return {
      success: false,
      error: `No registered account found for "${email}". Please verify your email or click "Create Account" to register.`
    };
  }

  if (foundAccount.password !== password) {
    return {
      success: false,
      error: 'Incorrect password entered. Please check your credentials and try again.'
    };
  }

  // Create active session
  const user: AuthUser = {
    id: foundAccount.id,
    name: foundAccount.name,
    email: foundAccount.email,
    role: foundAccount.role,
    company: foundAccount.company,
    avatar: getUserInitials(foundAccount.name),
    createdAt: foundAccount.createdAt
  };

  setAuthSession(user);
  return { success: true, user };
}

/**
 * Registers a new user account and initiates an active authenticated session.
 */
export function registerNewUser(params: {
  name: string;
  email: string;
  password: string;
  company?: string;
}): { success: boolean; error?: string; user?: AuthUser } {
  const name = params.name?.trim();
  const email = params.email?.trim().toLowerCase();
  const password = params.password?.trim();
  const company = params.company?.trim() || 'TalkNex Enterprise';

  if (!name || name.length < 2) {
    return { success: false, error: 'Please enter your full name (at least 2 characters).' };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please enter a valid business or personal email address.' };
  }
  if (!password || password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  const accounts = getRegisteredAccounts();
  const exists = accounts.some((acc) => acc.email.toLowerCase() === email);

  if (exists) {
    return {
      success: false,
      error: `An account with email "${email}" is already registered. Please switch to Sign In.`
    };
  }

  const newAccount: RegisteredAccount = {
    id: 'usr_' + Date.now(),
    name,
    email,
    password,
    company,
    role: 'Customer',
    createdAt: new Date().toISOString()
  };

  const updatedAccounts = [...accounts, newAccount];
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
    }
  } catch (e) {
    console.error('Failed to save registered account:', e);
  }

  const user: AuthUser = {
    id: newAccount.id,
    name: newAccount.name,
    email: newAccount.email,
    role: newAccount.role,
    company: newAccount.company,
    avatar: getUserInitials(newAccount.name),
    createdAt: newAccount.createdAt
  };

  setAuthSession(user);
  return { success: true, user };
}

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

/**
 * Returns the currently signed-in platform administrator, or null.
 */
export function getAdminUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);
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
 * Sets the active authenticated super administrator session.
 */
export function setAdminSession(user: AuthUser, token = 'admin_session_token') {
  if (typeof window === 'undefined') return;
  try {
    const adminUser: AuthUser = {
      ...user,
      role: 'Super Admin',
      adminRole: 'SUPER_ADMIN',
      avatar: user.avatar || getUserInitials(user.name)
    };

    localStorage.setItem(
      ADMIN_AUTH_STORAGE_KEY,
      JSON.stringify({
        token,
        user: adminUser,
        timestamp: Date.now()
      })
    );
    document.cookie = `talknex_admin_auth=1; path=/; max-age=86400; SameSite=Lax`;
    window.dispatchEvent(new Event(ADMIN_AUTH_EVENT_KEY));
  } catch (e) {
    console.error('Failed to save admin session:', e);
  }
}

/**
 * Clears the administrator session and locks the console.
 */
export function clearAdminSession() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
    document.cookie = 'talknex_admin_auth=; path=/; max-age=0; SameSite=Lax';
    window.dispatchEvent(new Event(ADMIN_AUTH_EVENT_KEY));
  } catch (e) {
    console.error('Failed to clear admin session:', e);
  }
}

/**
 * Subscribes to administrator authentication state changes.
 */
export function subscribeAdminAuth(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(ADMIN_AUTH_EVENT_KEY, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(ADMIN_AUTH_EVENT_KEY, callback);
    window.removeEventListener('storage', callback);
  };
}

/**
 * Authenticates master administrator credentials.
 */
export function authenticateAdmin(
  emailInput: string,
  passwordInput: string
): { success: boolean; error?: string; user?: AuthUser } {
  const email = emailInput?.trim().toLowerCase();
  const password = passwordInput?.trim();

  if (!email) {
    return { success: false, error: 'Please enter your administrator work email address.' };
  }
  if (!password) {
    return { success: false, error: 'Please enter your administrator password.' };
  }

  // Pre-configured master admin accounts (case-insensitive password matching for high tolerance)
  const passLower = password.toLowerCase();
  const isMasterAdmin =
    (email === 'admin@talknex.com' && (passLower === 'admin@123' || password === 'TalkNexAdmin#2026')) ||
    (email === 'admin@emperorsmartsolutions.com' && (passLower === 'admin@123' || password === 'TalkNexAdmin#2026')) ||
    (email === 'karan@emperorsmartsolutions.com' && passLower === 'password@123') ||
    (email === 'demo@talknex.com' && (passLower === 'demo@123' || passLower === 'demo123' || passLower === 'admin@123'));

  if (isMasterAdmin) {
    const adminUser: AuthUser = {
      id: 'usr_super_admin',
      name: email.includes('karan')
        ? 'Karan Makwana'
        : email.includes('demo')
        ? 'Demo Super Admin'
        : 'Platform Administrator',
      email: email,
      role: 'Super Admin',
      adminRole: 'SUPER_ADMIN',
      company: 'Emperor Smart Solutions',
      avatar: email.includes('karan') ? 'KM' : email.includes('demo') ? 'DA' : 'PA',
      createdAt: new Date().toISOString()
    };
    setAdminSession(adminUser);
    return { success: true, user: adminUser };
  }

  // Check if account exists in registered accounts with admin privileges
  const accounts = getRegisteredAccounts();
  const matchingAccount = accounts.find((a) => a.email.toLowerCase() === email);

  if (!matchingAccount) {
    return {
      success: false,
      error: 'Access Denied: No administrator account found with this email address.'
    };
  }

  if (matchingAccount.password !== password && matchingAccount.password.toLowerCase() !== passLower) {
    return {
      success: false,
      error: 'Access Denied: Incorrect administrator password entered.'
    };
  }

  const roleLower = (matchingAccount.role || '').toLowerCase();
  if (!roleLower.includes('admin')) {
    return {
      success: false,
      error: 'Access Denied: This account does not possess Super Admin privileges.'
    };
  }

  const adminUser: AuthUser = {
    id: matchingAccount.id,
    name: matchingAccount.name,
    email: matchingAccount.email,
    role: 'Super Admin',
    adminRole: 'SUPER_ADMIN',
    company: matchingAccount.company,
    avatar: getUserInitials(matchingAccount.name),
    createdAt: matchingAccount.createdAt
  };

  setAdminSession(adminUser);
  return { success: true, user: adminUser };
}
