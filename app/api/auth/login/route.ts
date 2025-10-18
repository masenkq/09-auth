import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch('https://notehub-api.goit.study/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (response.ok) {
      const result = NextResponse.json(data);
      
      // Копіюємо cookies з відповіді бекенду
      const setCookieHeader = response.headers.get('set-cookie');
      if (setCookieHeader) {
        result.headers.set('set-cookie', setCookieHeader);
      }
      
      return result;
    }
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}