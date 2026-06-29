import type { FastifyInstance } from "fastify";
import { authenticate } from "../../shared/http/authenticate.js";
import { AuthController } from "./auth.controller.js";

const authController = new AuthController();

export async function authRoutes(app: FastifyInstance) {
  app.post("/register-owner", authController.registerOwner);
  app.post("/login", authController.login);
  app.get("/me", { preHandler: [authenticate] }, authController.me);
}
