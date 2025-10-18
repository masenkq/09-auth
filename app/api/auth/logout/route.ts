import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = await fetch('https://notehub-api.goit.study/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    const result = NextResponse.json({ message: 'Logged out successfully' });
    
    // Видаляємо cookies
    result.cookies.delete('auth-token');
    
    return result;
  } catch (error) {
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}