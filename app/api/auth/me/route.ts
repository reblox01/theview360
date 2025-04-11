import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

// Secret key for JWT - in production, use an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify and decode the token
    const decoded = verify(token, JWT_SECRET) as {
      id: number;
      username: string;
      name: string;
      role: string;
    };

    // Return user data without sensitive information
    return NextResponse.json({
      user: {
        id: decoded.id,
        username: decoded.username,
        name: decoded.name,
        role: decoded.role,
      },
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
} 