import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export async function createContext({ req }: FetchCreateContextFnOptions) {    
  const session = await getServerSession(authConfig)
  return { req, session };
}

export type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC
  .context<Context>()
  .create({ transformer: SuperJSON });

export default t
