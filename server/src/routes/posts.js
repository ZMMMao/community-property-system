import { Router } from 'express';
import { z } from 'zod';
import Post from '../models/Post.js';
import { authRequired } from '../middleware/auth.js';
const router = Router();
router.get('/', authRequired, async (_req, res) => {
  const items = await Post.find({}).sort({ createdAt: -1 });
  res.json({ items });
});
const CreateSchema = z.object({ title: z.string().min(1), body: z.string().min(1) });
router.post('/', authRequired, async (req, res) => {
  const parsed = CreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const doc = await Post.create({ ...parsed.data, createdBy: req.user.id });
  res.status(201).json(doc);
});
export default router;
