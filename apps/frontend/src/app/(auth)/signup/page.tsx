'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useApiMutation } from '@/hooks/useApiMutation';
import { UserSchema, type User } from '@/validators/user';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // ✅ Signup mutation hook with output validation
  const { mutate: signup, loading } = useApiMutation<User, { email: string; password: string }>({
    path: '/api/auth/signup',
    method: 'POST',
    schema: UserSchema, // optional, validates returned user
  });

  const handleSignup = async () => {
    setError('');
    const result = await signup({ email, password });

    if (result) {
      router.push('/dashboard'); // ✅ redirect on success
    } else {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Create Your Account</h2>

      <input
        className="w-full p-2 border rounded mb-3"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={loading}
        className={`w-full p-2 rounded font-semibold transition ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'
        }`}
        onClick={handleSignup}
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </motion.button>
    </motion.div>
  );
}
