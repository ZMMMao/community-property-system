import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  passwordHash: { type: String, required: true },
  roles: {
    type: [String],
    enum: ["resident", "trustee", "admin"],
    default: ["resident"],
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

export const User = mongoose.model("User", userSchema);
