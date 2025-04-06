'use client';

import { createContext, useContext } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type AuthContextType = {
  user: ReturnType<typeof useCurrentUser>['data'];
  loading: boolean;
  logout: () => void;
  refetchUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, refetch } = useCurrentUser();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });

  const logout = async () => {
    await logoutMutation.mutateAsync(); // this does the fetch
    queryClient.setQueryData(['currentUser'], null); 
  };
  
  const refetchUser = () => refetch();

  return (
    <AuthContext.Provider value={{ user, loading: isLoading, logout, refetchUser  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
