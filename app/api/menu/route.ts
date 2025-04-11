import { NextResponse } from 'next/server';

// Mock database - replace with your actual database
let menuItems = [
  {
    id: 1,
    name: 'Pan-Seared Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce, served with seasonal vegetables',
    price: 32.99,
    category: 'Main Course',
    image: '/menu/salmon.jpg',
    isSpecial: true,
  },
  {
    id: 2,
    name: 'Truffle Risotto',
    description: 'Creamy Arborio rice with wild mushrooms and black truffle',
    price: 28.99,
    category: 'Main Course',
    image: '/menu/risotto.jpg',
    isVegetarian: true,
  },
  {
    id: 3,
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla ice cream',
    price: 14.99,
    category: 'Dessert',
    image: '/menu/souffle.jpg',
  },
];

export async function GET() {
  try {
    return NextResponse.json(menuItems);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newItem = {
      id: menuItems.length + 1,
      ...body,
    };
    
    menuItems.push(newItem);
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    const index = menuItems.findIndex(item => item.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    menuItems[index] = { ...menuItems[index], ...updates };
    
    return NextResponse.json(menuItems[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update menu item' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');
    
    const index = menuItems.findIndex(item => item.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    menuItems = menuItems.filter(item => item.id !== id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
} 