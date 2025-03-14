import { redirect } from "@i18n/navigation";
import Jwt from "jsonwebtoken"; 

import { NextRequest, NextResponse } from "next/server";
import { logIfDev } from "../utils.middleware";
import { routing } from "@i18n/routing";



export type     SupportedLanguages_t                        = 'ptBr' | 'en';
export const    SupportedLanguages: SupportedLanguages_t[]  = ["en", "ptBr"]; // Teste com valores fixos


// Rotas públicas e privadas
/** @TODO rewrite the trpc client */
const sitePrivateRoutes:    string[]    = []
const siteRoutes:           string[]    = ["/"];
const nextRoutes:           string[]    = ["/api/", "/auth/", "/_next/static/", "/_next/image/", "/favicon.ico"];


// Definição de rotas privadas dentro de cada idioma
const privateRoutes = SupportedLanguages.flatMap(lang => 
    sitePrivateRoutes.map(route => `/${lang}${route}`)
);



// Criamos um Set para armazenar as rotas públicas (melhora a performance)
const publicRoutes = new Set([
    ...nextRoutes,
    ...SupportedLanguages.flatMap(lang => siteRoutes.map(route => `/${lang}${route}`))
]);

export function isNextRoute(pathname: string): boolean {
    return nextRoutes.some(route => pathname.startsWith(route))
}
// Função para verificar se a rota é pública
function isPublicRoute(pathname: string): boolean {
    return publicRoutes.has(pathname) || isNextRoute(pathname);
}

// Função para verificar se a rota é privada
function isPrivateRoute(pathname: string): boolean {    
    return privateRoutes.some(route => pathname.startsWith(route));
}



export async function CheckRouteProtection(req: NextRequest): Promise<NextResponse | null> {
    // Se for uma rota pública, permitir acesso sem autenticação
        if (isPublicRoute(req.nextUrl.pathname)) {        
            return null
        }
    
        // Se for uma rota privada, exigir autenticação
        if (isPrivateRoute(req.nextUrl.pathname)) {        
            let token = req.cookies.get("auth-token")?.value;    
            
            if (!token) {                                    
                const authHeader = req.headers.get("Authorization")
                if(authHeader && authHeader?.startsWith("Bearer ")) {
                    token = authHeader.split(" ")[1]
                }            
            }
                    
            if(!token) {            
                return NextResponse.redirect(redirect({
                    href: "/",
                    locale: "pt"
                }));
            }
    
            try {
                if(!token) 
                    throw Error("Token not found")            

                const jwt_secret: string | undefined = process.env.JWT_SECRET;
                if(jwt_secret) {
                    Jwt.verify(token, jwt_secret);
                } else {
                    logIfDev(`[WARN]: JWT_SECRET is not set!`);
                }
                

                return null
                
            } catch {            
                return NextResponse.redirect(redirect({
                    href:   "/",
                    locale: routing.defaultLocale
                }));
            }
        }
    
        return null
}