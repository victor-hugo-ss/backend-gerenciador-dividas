import { z } from "zod";

export const registerOwnerBodySchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const loginBodySchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type RegisterOwnerBody = z.infer<typeof registerOwnerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
