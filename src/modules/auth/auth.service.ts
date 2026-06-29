import bcrypt from "bcrypt";
import { prisma } from "../../infra/prisma/prisma.client.js";
import { AppError } from "../../shared/errors/app-error.js";
import type { AuthUser } from "./auth.types.js";
import type { LoginBody, RegisterOwnerBody } from "./auth.schemas.js";

export class AuthService {
  async registerOwner(data: RegisterOwnerBody): Promise<AuthUser> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError("CONFLICT", "Já existe um usuário com esse e-mail");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        role: "OWNER",
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    };
  }

  async login(data: LoginBody): Promise<AuthUser> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError("UNAUTHORIZED", "Credenciais inválidas");
    }

    const passwordMatches = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new AppError("UNAUTHORIZED", "Credenciais inválidas");
    }

    if (!user.isActive) {
      throw new AppError("FORBIDDEN", "Usuário inativo");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    };
  }

  async getUserById(userId: string): Promise<AuthUser> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("NOT_FOUND", "Usuário não encontrado");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
