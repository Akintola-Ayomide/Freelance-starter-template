import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Health check endpoint.
 * Used by load balancers, uptime monitors, and deployment platforms.
 *
 * GET /api/health
 * Returns 200 if the app and DB are healthy, 503 otherwise.
 */
export async function GET() {
  try {
    // Test DB connectivity with a lightweight query
    await db.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        services: {
          database: "ok",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[health] Database check failed:", error);

    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        services: {
          database: "error",
        },
        error: "Database connectivity check failed",
      },
      { status: 503 },
    );
  }
}
