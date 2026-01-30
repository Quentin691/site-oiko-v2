import { NextRequest, NextResponse } from "next/server";

// Configuration par type de route
export const RATE_LIMIT_CONFIG = {
  // Route de login : très restrictive (protection brute force)
  login: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 tentatives max
  },
  // Routes API générales
  api: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requêtes/minute
  },
  // Routes admin
  admin: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30, // 30 requêtes/minute
  },
} as const;

type RateLimitType = keyof typeof RATE_LIMIT_CONFIG;

// Stockage en mémoire des requêtes par IP
const requestCounts: Map<
  string,
  { count: number; resetTime: number }
> = new Map();

// Nettoyage périodique des entrées expirées
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute

function cleanupExpiredEntries(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  for (const [key, value] of requestCounts.entries()) {
    if (now > value.resetTime) {
      requestCounts.delete(key);
    }
  }
  lastCleanup = now;
}

// Extraire l'IP de la requête
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return "unknown";
}

// Vérifier et appliquer le rate limiting
export function checkRateLimit(
  request: NextRequest,
  type: RateLimitType = "api"
): { allowed: boolean; remaining: number; resetIn: number } {
  cleanupExpiredEntries();

  const config = RATE_LIMIT_CONFIG[type];
  const ip = getClientIp(request);
  const key = `${type}:${ip}`;
  const now = Date.now();

  const current = requestCounts.get(key);

  if (!current || now > current.resetTime) {
    // Nouvelle fenêtre
    requestCounts.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetIn: config.windowMs,
    };
  }

  // Fenêtre existante
  current.count++;
  const remaining = Math.max(0, config.maxRequests - current.count);
  const resetIn = current.resetTime - now;

  if (current.count > config.maxRequests) {
    return { allowed: false, remaining: 0, resetIn };
  }

  return { allowed: true, remaining, resetIn };
}

// Wrapper pour protéger une route API
export function withRateLimit<T>(
  handler: (request: NextRequest) => Promise<NextResponse<T>>,
  type: RateLimitType = "api"
): (request: NextRequest) => Promise<NextResponse<T | { error: string }>> {
  return async (request: NextRequest) => {
    const { allowed, remaining, resetIn } = checkRateLimit(request, type);

    if (!allowed) {
      const response = NextResponse.json(
        {
          error: "Trop de requêtes. Veuillez réessayer plus tard.",
        },
        { status: 429 }
      );

      response.headers.set("X-RateLimit-Remaining", "0");
      response.headers.set(
        "X-RateLimit-Reset",
        Math.ceil(resetIn / 1000).toString()
      );
      response.headers.set("Retry-After", Math.ceil(resetIn / 1000).toString());

      return response;
    }

    const response = await handler(request);
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set(
      "X-RateLimit-Reset",
      Math.ceil(resetIn / 1000).toString()
    );

    return response;
  };
}

// Statistiques pour le monitoring (admin)
export function getRateLimitStats(): {
  activeEntries: number;
  entriesByType: Record<string, number>;
} {
  const entriesByType: Record<string, number> = {};

  for (const key of requestCounts.keys()) {
    const type = key.split(":")[0];
    entriesByType[type] = (entriesByType[type] || 0) + 1;
  }

  return {
    activeEntries: requestCounts.size,
    entriesByType,
  };
}
