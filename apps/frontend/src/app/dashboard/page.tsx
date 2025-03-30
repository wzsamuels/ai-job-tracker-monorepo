'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p className="p-4 text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome back, {user.email}</h1>
      <p className="text-gray-600">This is your AI-powered job dashboard.</p>
    </div>
  );
}
