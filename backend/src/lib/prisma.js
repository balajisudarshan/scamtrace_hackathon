import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/index.js";

const connectionString = process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
  log: ["warn", "error"],
});

export { prisma };
