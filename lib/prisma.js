import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = globalThis;

function createClient() {
  return new PrismaClient({ accelerateUrl: process.env.PRISMA_ACCELERATE_URL }).$extends(withAccelerate());
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
