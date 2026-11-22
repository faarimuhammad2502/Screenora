const crypto = require('crypto');

// Rate limiter per IP to block brute-force guessing (max 8 failed attempts per 5 minutes)
const RATE_WINDOW_MS = 5 * 60 * 1000;
const MAX_FAILS = 8;
const failedAttempts = new Map();

// Default SHA-256 hash fallback when SCREENORA_ACCESS_CODES env var is not yet configured in Vercel
const DEFAULT_CODE_SHA256 = '6272efa34ec38f6e05a69c5cb273eb315d8788605cd397d35b24b08cf861d64c';

function getClientIp(req) {
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
  return process.env.SCREENORA_TOKEN_SECRET || process.env.VERCEL_PROJECT_ID || 'screenora-default-hmac-key-v1';
}

function sha256Hex(str) {
  return crypto.createHash('sha256').update(String(str)).digest('hex');
}

function safeEqualHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) {
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'));
}

function verifyAccessCode(rawCode) {
  const normalized = String(rawCode || '').trim().toUpperCase();
  if (!normalized || normalized.length > 64) return false;

  const envCodes = process.env.SCREENORA_ACCESS_CODES;
  if (envCodes && envCodes.trim().length > 0) {
    const validHashes = envCodes
      .split(',')
      .map(c => c.trim().toUpperCase())
      .filter(Boolean)
      .map(c => sha256Hex(c));
    const inputHash = sha256Hex(normalized);
    return validHashes.some(h => safeEqualHex(inputHash, h));
  }

  const targetHash = (process.env.SCREENORA_ACCESS_HASH || DEFAULT_CODE_SHA256).trim().toLowerCase();
  return safeEqualHex(sha256Hex(normalized), targetHash);
}

function signSessionToken() {
  const payload = Buffer.from(
    JSON.stringify({
      exp: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
      nonce: crypto.randomBytes(8).toString('hex')
    }),
    'utf8'
  ).toString('base64url');
  const sig = crypto.createHmac('sha256', getSigningSecret()).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifySessionToken(token) {
  if (typeof token !== 'string' || !token.includes('.')) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', getSigningSecret()).update(payload).digest('base64url');
  if (!safeEqualHex(sig, expectedSig)) return false;

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof decoded.exp === 'number' && decoded.exp > Date.now();
  } catch (_) {
    return false;
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      ok: false,
      error: 'Too many failed attempts. Please wait 5 minutes before trying again.'
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (_) {
      return res.status(400).json({ ok: false, error: 'Invalid JSON body' });
    }
  }
  body = body || {};

  // 1. Re-verify existing session token
  if (body.token) {
    if (verifySessionToken(body.token)) {
      return res.status(200).json({ ok: true, token: body.token });
    }
    return res.status(401).json({ ok: false, error: 'Session token expired or invalid' });
  }

  // 2. Verify submitted access code
  if (body.code) {
    if (verifyAccessCode(body.code)) {
      clearFailures(ip);
      const token = signSessionToken();
      return res.status(200).json({ ok: true, token });
    }
    recordFailure(ip);
    return res.status(401).json({ ok: false, error: 'Invalid access code' });
  }

  return res.status(400).json({ ok: false, error: 'Missing verification payload' });
};
