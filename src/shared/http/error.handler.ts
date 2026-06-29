import type { FastifyInstance } from "fastify";
import { AppError } from "../errors/app-error.js";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    // Erro de negócio (controlado)
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        code: error.code,
        message: error.message,
      });
    }

    // Erro inesperado (não controlado)
    request.log.error({ err: error }, "Erro inesperado");
    return reply.status(500).send({
      code: "INTERNAL",
      message: "Erro interno do servidor",
    });
  });
}
