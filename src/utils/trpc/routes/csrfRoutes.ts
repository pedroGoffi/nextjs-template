import { router, publicProcedure } from "../procedures";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";

// Função para gerar um token CSRF aleatório
function generateCSRFToken(): string {
  return crypto.randomUUID(); // Gera um token único
}

export const csrfRoutes = router({
  getToken: publicProcedure.query(async () => {
    const csrfToken = generateCSRFToken();
    (await cookies()).set("csrf-token", csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return { csrfToken };
  }),
});
