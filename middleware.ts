import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
const secret = 'secret'

export async function middleware(req: any) {
  const token = await getToken({ req, secret, raw: true });
  // console.log(token)
  if (req.nextUrl.pathname === '/') {
    //console.log(99, 'yes')
    return NextResponse.redirect(new URL('/App', req.url));
  }
  if (req.nextUrl.pathname === '/App') {
    if (!token) {
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
      }
  }
 
  return NextResponse.next();
}
