import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3333),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default("7d"),

  DATABASE_URL: z.string().min(1),

  CORS_ORIGIN: z.string().min(1).default("http://localhost:5173"),
});

export const env = envSchema.parse(process.env);
