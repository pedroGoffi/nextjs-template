"use client";

import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc/trpc";
import { motion } from "framer-motion";

export default function Home() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  // Hook para obter o CSRF Token
  const csrfQuery = trpc.csrf.getToken.useQuery(undefined, {
    onSuccess: (data) => {
      if (data?.csrfToken) {
        localStorage.setItem("csrf-token", data.csrfToken);
        setCsrfToken(data.csrfToken);
      }
    },
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("csrf-token");
    if (storedToken) {
      setCsrfToken(storedToken);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-2xl"
      >
        <motion.h1
          className="text-4xl font-extrabold mb-4 text-blue-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🚀 Template para Projetos Rápidos
        </motion.h1>
        <p className="text-gray-600 text-lg mb-6">Desenvolvido por <span className="font-semibold">Pedro Henrique Goffi de Paulo</span></p>

        <motion.div
          className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-lg shadow-sm"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          📞 WhatsApp: (54) 99707-9061
        </motion.div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">🔥 Principais Features</h2>
        <ul className="text-left space-y-3">
          <motion.li className="flex items-center" whileHover={{ scale: 1.05 }}>
            ✅ <span className="ml-2">Pipeline de segurança avançada</span>
          </motion.li>
          <motion.li className="flex items-center" whileHover={{ scale: 1.05 }}>
            🌍 <span className="ml-2">Internacionalização com Next-Intl</span>
          </motion.li>
          <motion.li className="flex items-center" whileHover={{ scale: 1.05 }}>
            🔐 <span className="ml-2">Autenticação segura com NextAuth</span>
          </motion.li>
          <motion.li className="flex items-center" whileHover={{ scale: 1.05 }}>
            💳 <span className="ml-2">Integração com pagamentos via Stripe</span>
          </motion.li>
          <motion.li className="flex items-center" whileHover={{ scale: 1.05 }}>
            🗄️ <span className="ml-2">Banco de dados gerenciado com Prisma ORM</span>
          </motion.li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">🛠️ Tecnologias Implementadas</h2>
        <motion.div
          className="text-left space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-4 bg-gray-200 rounded-lg shadow">
            <h3 className="font-semibold">🌍 Internacionalização (Intl)</h3>
            <p className="text-sm text-gray-700">Gerencia a tradução de conteúdo e redirecionamento de idiomas usando Next-Intl.</p>
          </div>

          <div className="p-4 bg-gray-200 rounded-lg shadow">
            <h3 className="font-semibold">🛡️ Segurança Avançada</h3>
            <p className="text-sm text-gray-700">
              Implementação robusta de segurança incluindo:
              <ul className="list-disc ml-5 mt-1">
                <li>Proteção contra CSRF</li>
                <li>Rate Limiting para proteção DDOS</li>
                <li>Filtragem de User-Agent para proteção de crawling ou scans</li>
                <li>Reforçamento de uso HTTPS</li>
              </ul>
            </p>
          </div>

          <div className="p-4 bg-gray-200 rounded-lg shadow">
            <h3 className="font-semibold">📊 Monitoramento</h3>
            <p className="text-sm text-gray-700">Analisa métricas de latência e desempenho para otimização contínua do site.</p>
          </div>
        </motion.div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">🔑 CSRF Token</h2>
        <motion.div
          className="p-3 bg-gray-200 text-gray-800 rounded-lg shadow"
          whileHover={{ scale: 1.05 }}
        >
          {csrfQuery.isFetching ? "Carregando..." : csrfToken || "Erro ao gerar CSRF Token"}
        </motion.div>

        <motion.div
          className="mt-10 bg-blue-600 text-white py-3 px-6 rounded-xl text-lg font-semibold shadow-lg cursor-pointer hover:bg-blue-700 transition"
          whileHover={{ scale: 1.1 }}          
        >
          <a 
            href="https://wa.me/+5554997079061"
            target="_blank"
          >
            🚀 Precisa de um desenvolvedor? Vamos trabalhar juntos!
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
