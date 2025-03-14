import { TRPCError } from "@trpc/server";
import t from "./context";

export const router = t.router;
export const publicProcedure = t.procedure;
export const authProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
        code:       "UNAUTHORIZED",
        message:    "Não autenticado"
    })
  }
  return next({ ctx });
});
