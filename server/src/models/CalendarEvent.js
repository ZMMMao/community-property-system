import mongoose from 'mongoose';
const CalendarEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  type: { type: String, enum: ['reservation','activity','maintenance'], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
CalendarEventSchema.index({ start: 1, end: 1, type: 1 });
export default mongoose.model('CalendarEvent', CalendarEventSchema);
