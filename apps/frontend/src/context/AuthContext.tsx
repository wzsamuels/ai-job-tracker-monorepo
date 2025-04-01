'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { useApiMutation } from '@/hooks/useApiMutation';
import { UserSchema, type User } from '@/validators/user';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 🧠 Automatically fetches and validates the current user
  const { data, loading } = useApi<User>({
    path: '/api/auth/me',
    schema: UserSchema,
  });

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  // 🔐 Logout using mutation hook
  const { mutate: logoutMutation } = useApiMutation({
    path: '/api/auth/logout',
    method: 'POST',
  });

  const logout = async () => {
    await logoutMutation();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
