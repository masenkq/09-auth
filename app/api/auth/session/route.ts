import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('https://notehub-api.goit.study/auth/session', {
      credentials: 'include',
      headers: {
        Cookie: request.headers.get('cookie') || '',
      },
    });

    if (!response.ok) {
      return NextResponse.json(null);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(null);
  }
}