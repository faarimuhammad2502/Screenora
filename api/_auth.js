const crypto = require('crypto');

// Rate limiter per IP to block brute-force guessing (max 8 failed attempts per 5 minutes)
const RATE_WINDOW_MS = 5 * 60 * 1000;
const MAX_FAILS = 8;
const failedAttempts = new Map();

function applyApiHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
}

function getClientIp(req) {
  // Prioritize Vercel edge-set header before potentially spoofable forwarding headers
  const vercelIp = req.headers['x-vercel-forwarded-for'];
  if (typeof vercelIp === 'string' && vercelIp.length > 0) {
    return vercelIp.split(',')[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp.split(',')[0].trim();
  }
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) {
    return fwd.split(',')[0].trim();
  }
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const record = failedAttempts.get(ip);
  if (!record) return false;
  if (now - record.firstAt > RATE_WINDOW_MS) {
    failedAttempts.delete(ip);
    return false;
  }
  return record.count >= MAX_FAILS;
}

function recordFailure(ip) {
  const now = Date.now();
  if (failedAttempts.size > 1000) {
    for (const [key, val] of failedAttempts.entries()) {
      if (now - val.firstAt > RATE_WINDOW_MS) {
        failedAttempts.delete(key);
      }
    }
  }
  if (failedAttempts.size >= 2000 && !failedAttempts.has(ip)) {
    const oldestKey = failedAttempts.keys().next().value;
    if (oldestKey !== undefined) failedAttempts.delete(oldestKey);
  }
  const record = failedAttempts.get(ip);
  if (!record || now - record.firstAt > RATE_WINDOW_MS) {
    failedAttempts.set(ip, { count: 1, firstAt: now });
  } else {
    record.count += 1;
  }
}

function clearFailures(ip) {
  failedAttempts.delete(ip);
}

function getSigningSecret() {
  const secret = typeof process.env.SCREENORA_TOKEN_SECRET === 'string'
    ? process.env.SCREENORA_TOKEN_SECRET.trim()
    : '';
  return secret.length >= 16 ? secret : '';
}

function hasConfiguredCodes() {
  const codes = typeof process.env.SCREENORA_ACCESS_CODES === 'string' ? process.env.SCREENORA_ACCESS_CODES.trim() : '';
  const hash = typeof process.env.SCREENORA_ACCESS_HASH === 'string' ? process.env.SCREENORA_ACCESS_HASH.trim() : '';
  return codes.length > 0 || hash.length === 64;
}

function sha256Hex(str) {
  return crypto.createHash('sha256').update(String(str)).digest('hex');
}

function safeEqualStr(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) {
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'));
}

function verifyAccessCode(rawCode) {
  const normalized = String(rawCode || '').trim().toUpperCase();
  if (!normalized || normalized.length > 64) return false;

  const envCodes = process.env.SCREENORA_ACCESS_CODES;
  if (typeof envCodes === 'string' && envCodes.trim().length > 0) {
    const validHashes = envCodes
      .split(',')
      .map(c => c.trim().toUpperCase())
      .filter(Boolean)
      .map(c => sha256Hex(c));
    const inputHash = sha256Hex(normalized);
    return validHashes.some(h => safeEqualStr(inputHash, h));
  }

  const envHash = typeof process.env.SCREENORA_ACCESS_HASH === 'string'
    ? process.env.SCREENORA_ACCESS_HASH.trim().toLowerCase()
    : '';
  if (envHash.length === 64) {
    return safeEqualStr(sha256Hex(normalized), envHash);
  }

  // Fail closed when neither SCREENORA_ACCESS_CODES nor SCREENORA_ACCESS_HASH is configured
  return false;
}

function signSessionToken() {
  const secret = getSigningSecret();
  if (!secret) {
    throw new Error('SCREENORA_TOKEN_SECRET is not configured');
  }
  const payload = Buffer.from(
    JSON.stringify({
      exp: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
      nonce: crypto.randomBytes(8).toString('hex')
    }),
    'utf8'
  ).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifySessionToken(token) {
  const secret = getSigningSecret();
  if (!secret) return false;
  if (typeof token !== 'string' || !token.includes('.')) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  if (!safeEqualStr(sig, expectedSig)) return false;

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof decoded.exp === 'number' && decoded.exp > Date.now();
  } catch (_) {
    return false;
  }
}

function parseJsonRequest(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return null;
  }

  const contentType = String(req.headers['content-type'] || '').toLowerCase();
  if (!contentType.includes('application/json')) {
    res.status(415).json({ ok: false, error: 'Content-Type must be application/json' });
    return null;
  }

  let body = req.body;
  if (typeof body === 'string') {
    if (body.length > 2048) {
      res.status(413).json({ ok: false, error: 'Payload too large' });
      return null;
    }
    try {
      body = JSON.parse(body);
    } catch (_) {
      res.status(400).json({ ok: false, error: 'Invalid JSON body' });
      return null;
    }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    res.status(400).json({ ok: false, error: 'Invalid request payload' });
    return null;
  }

  return body;
}

module.exports = {
  applyApiHeaders,
  getClientIp,
  isRateLimited,
  recordFailure,
  clearFailures,
  getSigningSecret,
  hasConfiguredCodes,
  verifyAccessCode,
  signSessionToken,
  verifySessionToken,
  parseJsonRequest
};
