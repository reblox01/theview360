import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  console.log('[API] /auth/me called');
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;

    console.log('[API] Auth token exists:', !!token);

    if (!token) {
      console.log('[API] No auth token found in cookies');
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Decode the base64 token
    try {
      const tokenData = JSON.parse(Buffer.from(token, 'base64').toString());
      console.log('[API] Token decoded successfully');
      
      // Check if token is expired
      if (tokenData.exp && tokenData.exp < Date.now()) {
        console.log('[API] Token is expired');
        return NextResponse.json(
          { error: 'Token expired' },
          { status: 401 }
        );
      }

      console.log('[API] Auth successful, returning user data');
      
      // Return user data
      return NextResponse.json({
        user: {
          id: tokenData.id,
          username: tokenData.username,
          name: tokenData.name,
          role: tokenData.role,
        },
      });
    } catch (parseError) {
      console.error('[API] Token parsing error:', parseError);
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('[API] Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
} 