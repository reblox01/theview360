import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';

// Secret key for JWT - in production, use an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Path to store the content data
const contentFilePath = path.join(process.cwd(), 'data', 'hero-content.json');

// Ensure authenticated
async function isAuthenticated(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return false;
  }

  try {
    verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}

// Get current hero content
export async function GET() {
  try {
    // Check if file exists
    try {
      const data = await fs.readFile(contentFilePath, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    } catch (error) {
      // Return default data if file doesn't exist
      return NextResponse.json({
        title: 'The View 360',
        subtitle: 'Experience culinary perfection with breathtaking panoramic views.',
        buttonText: 'Book Your Table',
        buttonLink: '/reservation',
        backgroundVideo: '/videos/restaurant-ambience.mp4',
        backgroundImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
      });
    }
  } catch (error) {
    console.error('Error getting hero content:', error);
    return NextResponse.json(
      { error: 'Failed to get hero content' },
      { status: 500 }
    );
  }
}

// Save hero content
export async function POST(request: Request) {
  try {
    // Verify authentication
    const authenticated = await isAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.subtitle || !body.buttonText) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure the data directory exists
    try {
      await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    } catch (error) {
      // Directory already exists or another error
      console.error('Error creating directory:', error);
    }

    // Save content to file
    await fs.writeFile(contentFilePath, JSON.stringify(body, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving hero content:', error);
    return NextResponse.json(
      { error: 'Failed to save hero content' },
      { status: 500 }
    );
  }
} 