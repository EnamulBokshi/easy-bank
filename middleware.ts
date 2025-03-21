import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getLoggedUser } from './lib/actions/user.actions'
import next from 'next';
 
// This function can be marked `async` if using `await` inside
const publicRoute =['/sign-in','/sign-up','/forgot-password','/reset-password']
const privateRoute = ['/','/dashboard','/profile','/settings','/my-bank','/payment-transfer','/transaction-history']
export async function middleware(request: NextRequest) {
    const loggeduser = await getLoggedUser()
    const {pathname} = new URL(request.url)
    if (loggeduser && publicRoute.includes(pathname)){
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (!loggeduser && privateRoute.includes(pathname)){
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    return NextResponse.next()
    
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/:path*'
  ],
}