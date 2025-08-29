import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const email = "trustee@example.com";
    const existing = await User.findOne({ email });
    if (!existing) {
      const hash = await bcrypt.hash("trustee123", 10);
      await User.create({
        name: "Seed Trustee",
        email,
        passwordHash: hash,
        role: "trustee",
      });
      console.log("✅ Seeded trustee: trustee@example.com / trustee123");
    } else {
      console.log("⚡ Trustee already exists, skipping");
    }
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
