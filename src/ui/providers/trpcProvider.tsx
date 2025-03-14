"use client";

import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SuperJSON from "superjson";
import { useState, useMemo } from "react";
import { trpc } from "../../utils/trpc/trpc";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: "/api/trpc",
            headers: () => {
              const authToken = localStorage.getItem("auth-token");
              const csrfToken = localStorage.getItem("csrf-token");
              return {
                ...(authToken && { Authorization: `Bearer ${authToken}` }),
                ...(csrfToken && { "X-CSRF-Token": csrfToken }),
              };
            },
          }),
        ],
        transformer: SuperJSON,
      }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}
