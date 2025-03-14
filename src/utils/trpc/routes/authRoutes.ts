
import { prisma } from "@/utils/prisma/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
import { authProcedure, publicProcedure, router } from "../procedures";

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
      })
    )
    .mutation(async ({ input, ctx }) => {        
        const { name, email, password } = input;

        // Verifica se o usuário já existe
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) throw new Error("Email já cadastrado");

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criação do usuário
        const newUser = await prisma.user.create({
            data: {
            name,
            email,
            password: hashedPassword,
            },
        });

        return { message: "Usuário criado com sucesso!", userId: newUser.id };
    }),    

  me: publicProcedure.query(async ({ ctx }) => {
    return ctx.session?.user ?? "Nao autenticado"
  })
});
