import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Secret key for JWT - in production, use an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image', 'video'];
    if (!type || !validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Get the file extension
    const fileExtension = file.name.split('.').pop() || '';
    
    // Generate unique filename
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Determine the upload directory based on file type
    let uploadDir = '';
    if (type === 'image') {
      uploadDir = path.join(process.cwd(), 'public', 'uploads', 'images');
    } else if (type === 'video') {
      uploadDir = path.join(process.cwd(), 'public', 'videos');
    }
    
    // Convert the file to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Save the file
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    
    // Return the file path relative to the public directory
    const publicPath = type === 'image' 
      ? `/uploads/images/${fileName}` 
      : `/videos/${fileName}`;
    
    return NextResponse.json({ 
      success: true, 
      filePath: publicPath 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 