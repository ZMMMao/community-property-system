import mongoose from 'mongoose';
const TimelineEntry = new mongoose.Schema(
  { status: String, note: String, at: { type: Date, default: Date.now }, photos: [String] },
  { _id: false }
);
const MaintenanceRequestSchema = new mongoose.Schema({
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  photoUrls: [String],
  status: { type: String, enum: ['pending','in_progress','completed'], default: 'pending' },
  assignedTo: { type: String },
  timeline: [TimelineEntry]
}, { timestamps: true });
MaintenanceRequestSchema.index({ status: 1, createdAt: -1 });
export default mongoose.model('MaintenanceRequest', MaintenanceRequestSchema);
