import { Router } from 'express';
import { z } from 'zod';
import MaintenanceRequest from '../models/MaintenanceRequest.js';
import { authRequired, requireRole } from '../middleware/auth.js';
const router = Router();
router.post('/', authRequired, async (req, res) => {
  const schema = z.object({ description: z.string().min(1), photoUrls: z.array(z.string().url()).optional() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const doc = await MaintenanceRequest.create({ submittedBy: req.user.id, description: parsed.data.description, photoUrls: parsed.data.photoUrls || [], status: 'pending', timeline: [{ status: 'pending', note: 'Created' }] });
  res.status(201).json(doc);
});
router.get('/', authRequired, async (req, res) => {
  const q = {};
  if (req.query.status) q.status = req.query.status;
  if (req.user.role !== 'trustee') q.submittedBy = req.user.id;
  const items = await MaintenanceRequest.find(q).sort({ createdAt: -1 });
  res.json({ items });
});
router.patch('/:id', authRequired, requireRole('trustee'), async (req, res) => {
  const schema = z.object({ status: z.enum(['pending','in_progress','completed']).optional(), assignedTo: z.string().optional(), note: z.string().optional() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const doc = await MaintenanceRequest.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'not found' });
  if (parsed.data.status) doc.status = parsed.data.status;
  if (parsed.data.assignedTo !== undefined) doc.assignedTo = parsed.data.assignedTo;
  const note = parsed.data.note || 'Updated';
  doc.timeline.push({ status: doc.status, note });
  await doc.save();
  res.json(doc);
});
export default router;
