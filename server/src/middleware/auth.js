import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import User from '../models/User.js';

export function authRequired(req, res, next) {
  const token = req.cookies?.[config.cookieName];
  if (!token) return res.status(401).json({ error: 'unauthenticated' });
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: 'invalid token' });
  }
}
export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'unauthenticated' });
    if (req.user.role !== role) return res.status(403).json({ error: 'forbidden' });
    next();
  };
}
export async function issueSession(res, user) {
  const payload = { id: user._id.toString(), role: user.role, name: user.name, email: user.email };
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1d' });
  res.cookie(config.cookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: config.isProd,
    maxAge: 24 * 60 * 60 * 1000
  });
}
export async function meFromDb(userId) {
  const user = await User.findById(userId).select('name email role');
  return user ? { id: user.id, name: user.name, email: user.email, role: user.role } : null;
}
