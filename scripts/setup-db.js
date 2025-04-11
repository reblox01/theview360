#!/usr/bin/env node

/**
 * Database Setup Script
 * 
 * This script initializes the database tables for the restaurant application.
 * Run this script after setting up your PostgreSQL database:
 * 
 * npm run setup-db
 */

const { execSync } = require('child_process');
const path = require('path');

async function main() {
  try {
    console.log('🔄 Setting up database...');
    
    // Push the schema to the database
    console.log('📊 Creating database tables...');
    execSync('npx prisma db push', { stdio: 'inherit' });
    
    // Generate the Prisma client
    console.log('⚙️ Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Seed the database with initial data (optional)
    console.log('🌱 Seeding database with initial data...');
    
    // You can uncomment the following line if you have a seed script
    // execSync('npx prisma db seed', { stdio: 'inherit' });
    
    console.log('✅ Database setup complete!');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

main(); 