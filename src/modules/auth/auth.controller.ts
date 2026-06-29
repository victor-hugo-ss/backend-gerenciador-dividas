import type { FastifyReply, FastifyRequest } from "fastify";
import { loginBodySchema, registerOwnerBodySchema } from "./auth.schemas.js";
import { AuthService } from "./auth.service.js";

const authService = new AuthService();

export class AuthController {
  async registerOwner(request: FastifyRequest, reply: FastifyReply) {
    const body = registerOwnerBodySchema.parse(request.body);

    const user = await authService.registerOwner(body);

    return reply.status(201).send({
      message: "Usuário criado com sucesso",
    });
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const body = loginBodySchema.parse(request.body);

    const user = await authService.login(body);

    const token = await reply.jwtSign({
      sub: user.id,
      role: user.role,
      email: user.email,
    });

    return reply.send({
      accessToken: token,
      user,
    });
  }

  async me(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub;
    const user = await authService.getUserById(userId);

    return reply.send({ user });
  }
}
