import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  role: { type: String, enum: ['resident', 'trustee'], default: 'resident' },
  passwordHash: { type: String, required: true }
}, { timestamps: true });
export default mongoose.model('User', UserSchema);
