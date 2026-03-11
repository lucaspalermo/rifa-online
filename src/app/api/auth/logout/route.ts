import { NextResponse } from 'next/server'
import { removeAuthCookie } from '@/lib/auth'

export async function GET() {
  try {
    await removeAuthCookie()
    return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'))
  } catch {
    return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'))
  }
}
