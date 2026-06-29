export type JwtPayload = {
  sub: string;
  role: "OWNER" | "FRIEND";
  email: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  role: "OWNER" | "FRIEND";
  isActive: boolean;
};
