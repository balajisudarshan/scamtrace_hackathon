import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper: get user role via raw SQL (role column added after Prisma generate)
const getUserRole = async (userId) => {
  try {
    const rows = await prisma.$queryRawUnsafe(`SELECT role FROM "User" WHERE id=$1`, userId);
    return rows[0]?.role ?? "PUBLIC";
  } catch (_) { return "PUBLIC"; }
};

// ─── Google OAuth ─────────────────────────────────────────────
export const googleLogin = async (credential) => {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload || !payload.email) {
    throw new Error("Invalid Google token");
  }

  let user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        avatarUrl: payload.picture,
        googleId: payload.sub,
      },
    });
  } else if (!user.googleId) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        googleId: payload.sub,
        avatarUrl: payload.picture,
        firstName: payload.given_name,
        lastName: payload.family_name,
      },
    });
  }

  const role = await getUserRole(user.id);

  const accessToken = jwt.sign(
    { userId: user.id, id: user.id, email: user.email, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      role,
    },
    accessToken,
    token: accessToken,
  };
};

// ─── Register ─────────────────────────────────────────────────
export const register = async (email, password, firstName, lastName) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName: firstName || "",
      lastName: lastName || "",
    },
  });

  const role = await getUserRole(user.id);

  const accessToken = jwt.sign(
    { userId: user.id, id: user.id, email: user.email, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      role,
    },
    accessToken,
    token: accessToken,
  };
};

// ─── Login ────────────────────────────────────────────────────
export const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.password) {
    throw new Error("This account uses Google OAuth. Please use Google Login.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const role = await getUserRole(user.id);

  const accessToken = jwt.sign(
    { userId: user.id, id: user.id, email: user.email, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      role,
    },
    accessToken,
    token: accessToken,
  };
};
