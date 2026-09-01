import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_ROUTES = new Set([
  '/manutencao',
  '/pt/sobre',
  '/pt/contato',
  '/en/studio',
  '/en/contact',
])

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

  if (PUBLIC_ROUTES.has(normalized) || normalized.startsWith('/api/contact')) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/manutencao', request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*[.].*).*)'],
}
