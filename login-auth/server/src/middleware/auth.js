import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const bearer = req.headers.authorization;
  const token =
    req.cookies?.token ||
    (bearer?.startsWith("Bearer ") ? bearer.split(" ")[1] : null);
  if (!token) return res.status(401).json({ message: "Not authenticated" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { sub, email, roles, name }
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const requireRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ message: "Not authenticated" });
    const has = req.user.roles?.some((r) => roles.includes(r));
    if (!has) return res.status(403).json({ message: "Forbidden" });
    next();
  };
