'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AuthSchema, type AuthInput } from '@/validators/auth';
import { UserSchema, type User } from '@/validators/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, loading } = useAuth();

  const [form, setForm] = useState<AuthInput>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof AuthInput, string>>>({});

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const loginMutation = useMutation({
    mutationFn: async (input: AuthInput): Promise<User> => {
      console.log('🔐 Sending login request...');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      console.log('📡 Login response status:', res.status);
      const json = await res.json().catch(() => ({}));
      console.log('📦 Login response JSON:', json);

      if (!res.ok) {
        throw new Error(json?.error || `Login failed with status ${res.status}`);
      }

      return UserSchema.parse(json);
    },

    onSuccess: async () => {
      toast.success('Login successful!');
      console.log('✅ Login succeeded, waiting 100ms for cookie...');
      await new Promise((resolve) => setTimeout(resolve, 100));

      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      const updatedUser = queryClient.getQueryData<User>(['currentUser']);

      if (!updatedUser) {
        console.warn('⚠️ Could not find user after login — possible cookie issue.');
        toast.error('Login succeeded, but session could not be verified. Try refreshing.');
        return;
      }

      router.push('/dashboard');
    },

    onError: (err: unknown) => {
      console.error('❌ Login failed:', err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Unexpected login error');
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = AuthSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    loginMutation.mutate(form);
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loginMutation.isPending}
          className={`w-full p-2 rounded font-semibold transition ${
            loginMutation.isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'
          }`}
        >
          {loginMutation.isPending ? 'Logging in...' : 'Log In'}
        </motion.button>
      </form>
    </motion.div>
  );
}
