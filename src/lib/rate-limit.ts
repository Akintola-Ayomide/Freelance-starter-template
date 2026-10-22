/**
 * Simple in-memory rate limiter for auth endpoints.
 *
 * ⚠️  This is an in-memory implementation suitable for single-server deployments
 * or development. In production with multiple instances, switch to a shared store:
 *
 * Recommended alternatives:
 * - Upstash Rate Limit: https://github.com/upstash/ratelimit
 * - Redis with ioredis: implement a sliding window counter
 * - Vercel KV + @vercel/kv
 *
 * Usage:
 *   const limiter = rateLimit({ limit: 5, windowMs: 60_000 });
 *   const result = await limiter.check(request, "user-identifier");
 *   if (!result.success) return Response.json({ error: "Too many requests" }, { status: 429 });
 */

interface RateLimitOptions {
  /** Max requests per window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number; // Unix timestamp when the window resets
}

interface WindowData {
  count: number;
  resetAt: number;
}

export function rateLimit({ limit, windowMs }: RateLimitOptions) {
  // Map of identifier → window data
  const windows = new Map<string, WindowData>();

  // Clean up expired entries every 5 minutes to prevent memory leaks
  setInterval(
    () => {
      const now = Date.now();
      for (const [key, data] of windows.entries()) {
        if (data.resetAt < now) {
          windows.delete(key);
        }
      }
    },
    5 * 60 * 1000,
  );

  return {
    check(identifier: string): RateLimitResult {
      const now = Date.now();
      const existing = windows.get(identifier);

      if (!existing || existing.resetAt < now) {
        // Start a new window
        const newWindow: WindowData = {
          count: 1,
          resetAt: now + windowMs,
        };
        windows.set(identifier, newWindow);
        return {
          success: true,
          remaining: limit - 1,
          reset: newWindow.resetAt,
        };
      }

      if (existing.count >= limit) {
        return {
          success: false,
          remaining: 0,
          reset: existing.resetAt,
        };
      }

      existing.count++;
      return {
        success: true,
        remaining: limit - existing.count,
        reset: existing.resetAt,
      };
    },
  };
}

/**
 * Pre-configured limiters for common auth endpoints.
 *
 * Adjust limits based on your security requirements:
 * - signIn: 5 attempts per 15 minutes (per IP)
 * - signUp: 3 attempts per 60 minutes (per IP)
 * - passwordReset: 3 attempts per 60 minutes (per email)
 */
export const authLimiters = {
  signIn: rateLimit({ limit: 10, windowMs: 15 * 60 * 1000 }),
  signUp: rateLimit({ limit: 5, windowMs: 60 * 60 * 1000 }),
  passwordReset: rateLimit({ limit: 3, windowMs: 60 * 60 * 1000 }),
};
