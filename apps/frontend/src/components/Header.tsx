'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="p-4 border-b flex justify-between items-center">
      <h1 className="font-bold text-lg"><Link href='/'>AI Job Tracker</Link></h1>
      {!loading && (
        user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={logout}
              className="text-sm text-blue-600 underline"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link href="/signup" className="text-blue-600 font-medium hover:underline">Sign Up</Link>
            <Link href="/login" className="text-gray-700 hover:underline">Log In</Link>
          </div>
        )
      )}
    </header>
  );
}