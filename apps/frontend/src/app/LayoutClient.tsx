'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="flex-1 px-6 py-8"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </AuthProvider>
  );
}
