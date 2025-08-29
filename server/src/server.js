import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config.js';
import { connectDB } from './db.js';

import authRoutes from './routes/auth.js';
import announcementRoutes from './routes/announcements.js';
import calendarRoutes from './routes/calendar.js';
import maintenanceRoutes from './routes/maintenance.js';
import postsRoutes from './routes/posts.js';

const app = express();

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(cors({ origin: config.corsOrigin, credentials: true }));

app.get('/api/healthz', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/calendar-events', calendarRoutes);
app.use('/api/maintenance-requests', maintenanceRoutes);
app.use('/api/posts', postsRoutes);

connectDB().then(() => {
  app.listen(config.port, () => console.log(`[API] running on :${config.port}`));
}).catch(err => {
  console.error('Failed to start API', err);
  process.exit(1);
});
