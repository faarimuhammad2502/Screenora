const {
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
} = require('./_auth');

module.exports = async function handler(req, res) {
  applyApiHeaders(res);

  if (!getSigningSecret() || !hasConfiguredCodes()) {
    return res.status(503).json({
      ok: false,
      error: 'Verification service is not configured'
    });
  }

  const body = parseJsonRequest(req, res);
  if (!body) return;

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      ok: false,
      error: 'Too many failed attempts. Please wait 5 minutes before trying again.'
    });
  }

  // 1. Re-verify existing session token
  if (typeof body.token === 'string' && body.token.length > 0 && body.token.length <= 512) {
    if (verifySessionToken(body.token)) {
      clearFailures(ip);
      return res.status(200).json({ ok: true, token: body.token });
    }
    recordFailure(ip);
    return res.status(401).json({ ok: false, error: 'Session token expired or invalid' });
  }

  // 2. Verify submitted access code
  if (typeof body.code === 'string' && body.code.length > 0 && body.code.length <= 64) {
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
