import { Request, Response, NextFunction } from 'express'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

/**
 * Simple in-memory rate limiter
 * For production, use Redis or express-rate-limit middleware
 */
const store: RateLimitStore = {}

interface RateLimiterOptions {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
  keyGenerator?: (req: Request) => string
}

export function createRateLimiter(options: RateLimiterOptions) {
  const { windowMs, maxRequests, keyGenerator = (req) => req.ip || 'unknown' } = options

  return (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req)
    const now = Date.now()

    // Clean up expired entries
    if (store[key] && store[key].resetTime < now) {
      delete store[key]
    }

    // Initialize or get store entry
    if (!store[key]) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs,
      }
      return next()
    }

    // Increment counter
    store[key].count++

    // Check if limit exceeded
    if (store[key].count > maxRequests) {
      res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil((store[key].resetTime - now) / 1000),
      })
      return
    }

    // Add rate limit info to response headers
    res.set('X-RateLimit-Limit', String(maxRequests))
    res.set('X-RateLimit-Remaining', String(maxRequests - store[key].count))
    res.set('X-RateLimit-Reset', String(Math.ceil(store[key].resetTime / 1000)))

    next()
  }
}

/**
 * Specific rate limiters for different endpoints
 */
export const rateLimiters = {
  // General API: 100 requests per 15 minutes
  general: createRateLimiter({
    windowMs: 15 * 60 * 1000,
    maxRequests: 100,
  }),

  // Sync endpoints: 10 requests per minute
  sync: createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 10,
  }),

  // Auth endpoints: 5 requests per minute
  auth: createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 5,
  }),

  // Strict limit for sensitive endpoints: 3 per minute
  sensitive: createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 3,
  }),
}
