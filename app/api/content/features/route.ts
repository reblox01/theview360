import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';

// Secret key for JWT - in production, use an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Path to store the content data
const contentFilePath = path.join(process.cwd(), 'data', 'features-content.json');

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

// Get current features content
export async function GET() {
  try {
    // Check if file exists
    try {
      const data = await fs.readFile(contentFilePath, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    } catch (error) {
      // Return default data if file doesn't exist
      return NextResponse.json([
        {
          title: 'Exquisite Cuisine',
          description: 'Savor our chef\'s carefully crafted dishes made with seasonal ingredients and artistic presentation.',
          image: '/menu/salmon.jpg',
          video: '/videos/cooking.mp4'
        },
        {
          title: 'Perfect Ambiance',
          description: 'Enjoy breathtaking views in our sophisticated dining environment designed for comfort and elegance.',
          image: '/menu/ambiance.jpg',
          video: '/videos/ambiance.mp4'
        },
        {
          title: 'Premium Bar',
          description: 'Discover our extensive wine list and signature cocktails crafted by award-winning mixologists.',
          image: '/menu/bar.jpg',
          video: '/videos/bar.mp4'
        }
      ]);
    }
  } catch (error) {
    console.error('Error getting features content:', error);
    return NextResponse.json(
      { error: 'Failed to get features content' },
      { status: 500 }
    );
  }
}

// Save features content
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
    
    // Validate that body is an array
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Features must be an array' },
        { status: 400 }
      );
    }
    
    // Validate each feature has required fields
    for (const feature of body) {
      if (!feature.title || !feature.description || !feature.image) {
        return NextResponse.json(
          { error: 'Each feature must have title, description, and image' },
          { status: 400 }
        );
      }
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
    console.error('Error saving features content:', error);
    return NextResponse.json(
      { error: 'Failed to save features content' },
      { status: 500 }
    );
  }
} 