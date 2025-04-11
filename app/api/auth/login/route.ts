import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// In a real application, you would store these credentials in a database
// and hash the passwords
const ADMIN_USERS = [
  {
    id: 1,
    username: 'admin',
    // In production, use hashed passwords
    password: 'admin123',
    name: 'Administrator',
    role: 'admin',
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Find user
    const user = ADMIN_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Create a simpler auth token (in production use JWT with proper signing)
    const authToken = Buffer.from(JSON.stringify({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 1 day expiration
    })).toString('base64');

    // Create the response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });

    // Set cookie directly on the response
    response.cookies.set({
      name: 'auth_token',
      value: authToken,
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 