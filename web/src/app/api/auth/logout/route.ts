import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const urlRedirect = new URL('/', request.url)

  return NextResponse.redirect(urlRedirect, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0;`,
    },
  })
}
