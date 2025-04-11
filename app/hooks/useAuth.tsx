'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: number;
  username: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // For debugging - log when pathname changes
  useEffect(() => {
    console.log('Current path:', pathname);
  }, [pathname]);

  useEffect(() => {
    // Check if user is logged in
    async function loadUserFromSession() {
      try {
        console.log('Checking authentication...');
        const response = await fetch('/api/auth/me');
        
        console.log('Auth response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Auth data received:', !!data.user);
          setUser(data.user);
        } else {
          console.log('Not authenticated, status:', response.status);
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to load user session:', err);
        setUser(null);
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    }

    loadUserFromSession();
  }, []);

  // Protect admin routes
  useEffect(() => {
    if (
      authChecked && 
      !loading && 
      !user && 
      pathname?.startsWith('/admin') && 
      pathname !== '/admin/login'
    ) {
      console.log('Not authenticated, redirecting to login...');
      router.push('/admin/login');
    }
  }, [loading, user, pathname, router, authChecked]);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Important for cookies
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful, user data:', !!data.user);
      setUser(data.user);
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include' // Important for cookies
      });
      setUser(null);
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    user,
    loading,
    login,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 