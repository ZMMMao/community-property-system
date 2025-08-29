import { Router } from 'express';
import { z } from 'zod';
import CalendarEvent from '../models/CalendarEvent.js';
import { authRequired } from '../middleware/auth.js';
const router = Router();
router.get('/', authRequired, async (req, res) => {
  const { from, to, type } = req.query;
  const q = {};
  if (type) q.type = type;
  if (from || to) {
    q.$and = [];
    if (from) q.$and.push({ end: { $gt: new Date(from) } });
    if (to) q.$and.push({ start: { $lt: new Date(to) } });
  }
  const items = await CalendarEvent.find(q).sort({ start: 1 });
  res.json({ items });
});
const CreateSchema = z.object({ title: z.string().min(1), description: z.string().optional(), start: z.string().datetime(), end: z.string().datetime(), type: z.enum(['reservation','activity','maintenance']) });
router.post('/', authRequired, async (req, res) => {
  const parsed = CreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { title, description, start, end, type } = parsed.data;
  if (req.user.role !== 'trustee' && type !== 'reservation') return res.status(403).json({ error: 'only trustees can create non-reservation events' });
  if (type === 'reservation') {
    const overlap = await CalendarEvent.findOne({ type: 'reservation', start: { $lt: new Date(end) }, end: { $gt: new Date(start) } });
    if (overlap) return res.status(409).json({ error: 'time slot already reserved' });
  }
  const doc = await CalendarEvent.create({ title, description, start: new Date(start), end: new Date(end), type, createdBy: req.user.id });
  res.status(201).json(doc);
});
router.delete('/:id', authRequired, async (req, res) => {
  const ev = await CalendarEvent.findById(req.params.id);
  if (!ev) return res.status(404).json({ error: 'not found' });
  if (req.user.role !== 'trustee' && ev.createdBy.toString() !== req.user.id) return res.status(403).json({ error: 'forbidden' });
  await ev.deleteOne();
  res.status(204).end();
});
export default router;
