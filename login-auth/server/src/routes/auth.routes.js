import { Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { authRequired, requireRole } from "../middleware/auth.js";

const router = Router();

const signToken = (user) =>
  jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      roles: user.roles,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );

// 注册
router.post(
  "/register",
  body("name").trim().notEmpty(),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    const token = signToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      })
      .status(201)
      .json({ user: user.toJSON(), token });
  }
);

// 登录
router.post(
  "/login",
  body("email").isEmail(),
  body("password").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      })
      .json({ user: user.toJSON(), token });
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

// 当前用户
router.get("/me", authRequired, async (req, res) => {
  const user = await User.findById(req.user.sub);
  res.json({ user });
});

// 管理员：分配角色
router.post(
  "/admin/assign-role",
  authRequired,
  requireRole("admin"),
  body("userId").notEmpty(),
  body("roles")
    .isArray()
    .custom((arr) => arr.length > 0),
  async (req, res) => {
    const { userId, roles } = req.body;
    const allowed = ["resident", "trustee", "admin"];
    const sanitized = roles.filter((r) => allowed.includes(r));
    const user = await User.findByIdAndUpdate(
      userId,
      { roles: sanitized },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  }
);

// 管理员：查看用户列表（便于赋权）
router.get(
  "/admin/users",
  authRequired,
  requireRole("admin"),
  async (req, res) => {
    const users = await User.find().select("-passwordHash");
    res.json({ users });
  }
);

export default router;
