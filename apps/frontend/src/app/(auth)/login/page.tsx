'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AuthSchema, type AuthInput } from '@/validators/auth';
import { useApiMutation } from '@/hooks/useApiMutation';
import { UserSchema, type User } from '@/validators/user';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<AuthInput>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof AuthInput, string>>>({});
  const [generalError, setGeneralError] = useState('');

  // ✅ Login mutation using shared API hook
  const { mutate: login, loading } = useApiMutation<User, AuthInput>({
    path: '/api/auth/login',
    method: 'POST',
    schema: UserSchema,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
    setGeneralError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    const user = await login(form);
    if (user) {
      router.push('/dashboard');
    } else {
      setGeneralError('Invalid credentials or server error');
    }
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

        {generalError && <p className="text-sm text-red-600">{generalError}</p>}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className={`w-full p-2 rounded font-semibold transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'
          }`}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </motion.button>
      </form>
    </motion.div>
  );
}
