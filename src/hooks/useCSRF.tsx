import { trpc } from "@/utils/trpc/trpc";
import { useEffect } from "react";

export function useCSRF() {
  const csrfQuery = trpc.csrf.getToken.useQuery(undefined, {
    enabled: false, // Para evitar requisições automáticas no carregamento
    onSuccess: (data) => {
      if (data.csrfToken) {
        localStorage.setItem("csrf-token", data.csrfToken);
      }
    },
  });

  useEffect(() => {
    if (!localStorage.getItem("csrf-token")) {
      csrfQuery.refetch(); // Apenas busca se não houver um token salvo
    }
  }, []);

  return csrfQuery.isFetching;
}
