import { PrismaClient } from './prisma/generated/client';
import type { JobApplication } from './prisma/generated/client'; 

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// ✅ This re-exports types like JobApplication cleanly for TypeScript
export type { JobApplication }; // ✅ type-safe export
export * from './prisma/generated/client';
