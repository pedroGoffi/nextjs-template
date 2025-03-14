import { RunMiddlewarePipeline } from './security/CreatePipeline';
import { NextRequest, NextResponse } from 'next/server';
 

export const middleware = async (req: NextRequest): Promise<NextResponse> => await RunMiddlewarePipeline(req);


export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/', 
    '/(en|de|ja|pt)/:path*'
  ]
};