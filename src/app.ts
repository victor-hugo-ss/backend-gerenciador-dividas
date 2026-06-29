import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { env } from "../src/config/env.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { registerErrorHandler } from "../src/shared/http/error.handler.js";
import { healthRoutes } from "../src/modules/health/health.routes.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, {
    origin: env.CORS_ORIGIN,
    credentials: true,
  });

  app.register(jwt, {
    secret: env.JWT_SECRET,
  });

  app.register(healthRoutes);
  app.register(authRoutes, { prefix: "/auth" });

  registerErrorHandler(app);

  return app;
}
