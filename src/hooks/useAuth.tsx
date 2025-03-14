"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    session,
    isLoading: status === "loading",
    login: async (email: string, password: string) => {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) throw new Error(result.error);
    },
    logout: async () => signOut(),
  };
}
