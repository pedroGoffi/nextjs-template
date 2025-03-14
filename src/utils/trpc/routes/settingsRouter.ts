import { z } from "zod";
import { authProcedure, router } from "../procedures";
import { prisma } from "@/utils/prisma/prisma";
import { User } from "@prisma/client";





const settingsUpdateitemSchema = z.object({

})

const settingsSchema = z.object({
    // update="NAME|PASSWORD|UWU|NYA"
    update: settingsUpdateitemSchema
})


export const settingsRouter = router({
    settings: 
        authProcedure
        .input(settingsSchema)
        .mutation(async ({ input, ctx }) => {            
        }),


    mySettings:
        authProcedure
        .query(async ({ ctx }) => {            
            const user: User | null = await prisma.user.findFirst({
                where: {
                    id: ctx.session?.user.id
                }
            })


            return {
                user
            }
        })
})