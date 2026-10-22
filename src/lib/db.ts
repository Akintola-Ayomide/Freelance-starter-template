import { PrismaClient } from "@prisma/client";

/**
 * Prisma singleton — safe for Next.js hot reload in development.
 *
 * In production, each module instance gets a fresh PrismaClient.
 * In development, we store the client on `globalThis` so hot reloads
 * don't create hundreds of connections.
 *
 * @see https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
