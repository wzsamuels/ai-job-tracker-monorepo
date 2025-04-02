'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // 🚀 Redirect if user is not logged in once loading is complete
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // ⏳ Show loading state
  if (loading) {
    return <p className="p-4 text-gray-500">Loading dashboard...</p>;
  }

  // 🔐 Return null temporarily while redirecting
  if (!user) return null;

  // ✅ Authenticated content
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome back, {user.email}</h1>
      <p className="text-gray-600">This is your AI-powered job dashboard.</p>
    </div>
  );
}
