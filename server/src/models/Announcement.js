import mongoose from 'mongoose';
const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  pinned: { type: Boolean, default: false },
  visibility: { type: String, enum: ['all','residents','trustees'], default: 'all' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  publishAt: { type: Date },
  expireAt: { type: Date }
}, { timestamps: true });
AnnouncementSchema.index({ pinned: -1, createdAt: -1 });
AnnouncementSchema.index({ publishAt: 1, expireAt: 1 });
export default mongoose.model('Announcement', AnnouncementSchema);
