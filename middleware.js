import { NextResponse } from 'next/server'

export function middleware(request) {
  console.log(`middleware  Entered middleware method=${request.method} url=${request.url}`);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  //matcher: '/((?!update).*)',
  matcher: '/(.*)',
}
