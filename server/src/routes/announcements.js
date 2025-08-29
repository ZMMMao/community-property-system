import { Router } from 'express';
import { z } from 'zod';
import Announcement from '../models/Announcement.js';
import { authRequired, requireRole } from '../middleware/auth.js';
const router = Router();
router.get('/', authRequired, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit || '10', 10)));
  const query = {};
  if (req.query.visibility) query.visibility = req.query.visibility;
  const [items, total] = await Promise.all([
    Announcement.find(query).sort({ pinned: -1, createdAt: -1 }).skip((page-1)*limit).limit(limit),
    Announcement.countDocuments(query)
  ]);
  res.json({ items, total, page, limit });
});
const CreateSchema = z.object({ title: z.string().min(1), body: z.string().min(1), pinned: z.boolean().optional(), visibility: z.enum(['all','residents','trustees']).optional() });
router.post('/', authRequired, requireRole('trustee'), async (req, res) => {
  const parsed = CreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const doc = await Announcement.create({ ...parsed.data, createdBy: req.user.id });
  res.status(201).json(doc);
});
export default router;
