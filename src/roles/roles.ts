export type UserRole = "user" | "admin" | "superadmin";

export const ROLES: Record<Uppercase<UserRole>, UserRole> = {
  USER: "user",
  ADMIN: "admin",
  SUPERADMIN: "superadmin",
};
