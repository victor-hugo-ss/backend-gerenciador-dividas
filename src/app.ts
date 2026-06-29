import Fastify from "fastify";
import cors from "@fastify/cors";

import { env } from "../src/config/env.js";
import { registerErrorHandler } from "../src/shared/http/error.handler.js";
import { healthRoutes } from "../src/modules/health/health.routes.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, {
    origin: env.CORS_ORIGIN,
    credentials: true,
  });

  app.register(healthRoutes);

  registerErrorHandler(app);

  return app;
}
