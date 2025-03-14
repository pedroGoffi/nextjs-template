import { NextResponse } from "next/server";
import { MiddlewareFunction, MiddlewarePipeline } from "./MiddlewarePipeline";
import createMiddleware from 'next-intl/middleware';
import { routing } from "@i18n/routing";



const middleware = createMiddleware(routing)
const intlMiddleware: MiddlewareFunction = async (req) => middleware(req)


// Middlewares concorrentes (executados em paralelo)
const concurrentMiddlewares: Readonly<MiddlewareFunction[]> = [
    intlMiddleware
];

// Middlewares ordenados (executados em sequência)
const orderedMiddlewares: Readonly<MiddlewareFunction[]> = [
];

// Criando a pipeline de segurança
export const intlPipeline: MiddlewarePipeline<NextResponse | null> = new MiddlewarePipeline<NextResponse | null>(
    "Internationalization",
    concurrentMiddlewares,
    orderedMiddlewares,
    false
);