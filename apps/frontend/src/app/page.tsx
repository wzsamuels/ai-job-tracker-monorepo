'use client';

// This page is the landing page for unauthenticated users

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const {user, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col">

      <motion.section
        className="flex flex-1 flex-col items-center justify-center text-center px-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Track Your Job Applications — Smarter
        </motion.h2>

        <motion.p
          className="text-lg max-w-xl mb-8 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          AI Job Tracker helps you manage your job search, set reminders, and generate tailored resume bullets — all in one private dashboard.
        </motion.p>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              Get Started
            </motion.button>
          </Link>
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-300 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
            >
              Log In
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      <motion.section
        className="px-6 py-12 bg-gray-50 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-4">What You Get</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          {[
            {
              title: '📋 Job Application Tracker',
              text: 'Track each application’s status, notes, deadlines, and more.',
            },
            {
              title: '⏰ Smart Reminders',
              text: 'Get reminders to follow up, prepare, and stay on top of deadlines.',
            },
            {
              title: '🤖 AI Resume Helper',
              text: 'Paste a job description and get a tailored resume bullet instantly.',
            },
          ].map(({ title, text }, i) => (
            <motion.div
              key={i}
              className="p-4 bg-white rounded-xl shadow"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <h4 className="font-semibold text-lg">{title}</h4>
              <p className="text-sm text-gray-600">{text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <footer className="py-6 text-center text-sm text-gray-400 border-t">
        &copy; {new Date().getFullYear()} AI Job Tracker. All rights reserved.
      </footer>
    </main>
  );
}
