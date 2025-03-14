"use client"

import AuthProvider from "./AuthProvider"
import { TRPCProvider } from "./trpcProvider"


export function AppProvider({ children }: { children: React.ReactNode }) {    
    return (
        <AuthProvider>
            <TRPCProvider>
                {children}
            </TRPCProvider>
        </AuthProvider>
    )
}



  
  