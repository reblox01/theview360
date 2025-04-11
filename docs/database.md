# Database Setup with Prisma

This project uses Prisma ORM to interact with a PostgreSQL database. This document explains how to set up and use the database.

## Initial Setup

1. Make sure PostgreSQL is installed and running on your system
2. Create a database called `restaurant_db`
3. Update the `.env` file with your PostgreSQL credentials
4. Run the database setup script:

```bash
npm run setup-db
```

This script will:
- Create all necessary database tables based on the Prisma schema
- Generate the Prisma client for TypeScript type safety

## Database Models

The following models are defined in `prisma/schema.prisma`:

- **User**: Admin users who can access the dashboard
- **MenuItem**: Restaurant menu items
- **Table**: Restaurant tables for reservations
- **Reservation**: Customer reservations
- **Order**: Customer orders
- **OrderItem**: Items within an order
- **Staff**: Restaurant staff members

## Using the Database in Your Code

Database operations are handled through utility functions in `lib/db.ts`. Here's how to use them:

```typescript
// Import the functions you need
import { getReservations, createReservation } from '@/lib/db';

// Example: Get all reservations
async function fetchReservations() {
  const { data, error } = await getReservations();
  
  if (error) {
    console.error('Failed to fetch reservations:', error);
    return [];
  }
  
  return data;
}

// Example: Create a new reservation
async function addReservation(reservationData) {
  const { data, error } = await createReservation(reservationData);
  
  if (error) {
    console.error('Failed to create reservation:', error);
    return null;
  }
  
  return data;
}
```

## Direct Prisma Client Usage

For more complex queries, you can use the Prisma client directly:

```typescript
import { prisma } from '@/lib/prisma';

// Example: Complex query with relations
async function getReservationsWithDetails() {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        status: 'confirmed',
        reservationDate: {
          gte: new Date()
        }
      },
      include: {
        table: true
      },
      orderBy: {
        reservationDate: 'asc'
      }
    });
    
    return reservations;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
}
```

## Schema Modifications

If you need to modify the database schema:

1. Edit the `prisma/schema.prisma` file
2. Run `npx prisma db push` to update the database
3. Run `npx prisma generate` to update the Prisma client

## Environment Variables

The following environment variables are used for database connection:

```
DATABASE_URL="postgresql://username:password@localhost:5432/restaurant_db?schema=public"
```

Make sure to update this with your actual database credentials. 