import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    let token = null;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      token = req.cookies?.accessToken;
    }

    if (!token || token === "undefined" || token === "null" || !token.trim()) {
      return res.status(401).json({ success: false, message: "Access token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      ...decoded,
      id: decoded.id || decoded.userId,
      userId: decoded.userId || decoded.id,
    };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// Attaches user if token present, but does NOT fail if missing
export const optionalAuth = (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      token = req.cookies?.accessToken;
    }
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    }
  } catch (_) {}
  next();
};

// Must be ANALYST or ADMIN (use after authMiddleware)
export const requireAnalyst = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }
  if (!["ANALYST", "ADMIN"].includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "Analyst or Admin access required" });
  }
  next();
};

