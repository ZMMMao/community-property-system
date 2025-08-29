import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import User from '../models/User.js';
import { authRequired, issueSession, meFromDb } from '../middleware/auth.js';
const router = Router();
const RegisterSchema = z.object({ name: z.string().min(1), email: z.string().email(), password: z.string().min(6) });
router.post('/register', async (req, res) => {
  const parsed = RegisterSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { name, email, password } = parsed.data;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: 'email already exists' });
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash, role: 'resident' });
  await issueSession(res, user);
  res.status(201).json({ user: await meFromDb(user.id) });
});
const LoginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
router.post('/login', async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  await issueSession(res, user);
  res.json({ user: await meFromDb(user.id) });
});
router.get('/me', authRequired, async (req, res) => {
  const me = await meFromDb(req.user.id);
  if (!me) return res.status(401).json({ error: 'unauthenticated' });
  res.json({ user: me });
});
router.post('/logout', authRequired, async (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME || 'community_session');
  res.status(204).end();
});
export default router;
