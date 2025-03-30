import './globals.css';
import { ReactNode } from 'react';
import LayoutClient from '@/app/LayoutClient';

export const metadata = {
  title: 'AI Job Tracker',
  description: 'Track your job search with AI-powered tools',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
