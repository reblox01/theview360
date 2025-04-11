import { prisma } from '@/lib/prisma';
import type { Reservation, MenuItem } from '@/lib/generated/prisma';

// Reservation methods
export async function getReservations() {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: [
        { reservationDate: 'desc' },
        { reservationTime: 'desc' }
      ],
      include: {
        table: true
      }
    });
    return { data: reservations, error: null };
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return { data: null, error };
  }
}

export async function getReservationById(id: string) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        table: true
      }
    });
    return { data: reservation, error: null };
  } catch (error) {
    console.error('Error fetching reservation:', error);
    return { data: null, error };
  }
}

export async function createReservation(reservationData: {
  customerName: string;
  email: string;
  phone: string;
  partySize: number;
  reservationDate: Date;
  reservationTime: string;
  tableId: string;
  specialRequests?: string;
}) {
  try {
    const reservation = await prisma.reservation.create({
      data: {
        customerName: reservationData.customerName,
        email: reservationData.email,
        phone: reservationData.phone,
        partySize: reservationData.partySize,
        reservationDate: reservationData.reservationDate,
        reservationTime: reservationData.reservationTime,
        tableId: reservationData.tableId,
        specialRequests: reservationData.specialRequests,
      },
      include: {
        table: true
      }
    });
    return { data: reservation, error: null };
  } catch (error) {
    console.error('Error creating reservation:', error);
    return { data: null, error };
  }
}

export async function updateReservation(id: string, reservationData: Partial<Reservation>) {
  try {
    const reservation = await prisma.reservation.update({
      where: { id },
      data: reservationData,
      include: {
        table: true
      }
    });
    return { data: reservation, error: null };
  } catch (error) {
    console.error('Error updating reservation:', error);
    return { data: null, error };
  }
}

export async function deleteReservation(id: string) {
  try {
    await prisma.reservation.delete({
      where: { id }
    });
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return { success: false, error };
  }
}

// Table methods
export async function getTables() {
  try {
    const tables = await prisma.table.findMany({
      where: { isActive: true },
      orderBy: { number: 'asc' }
    });
    return { data: tables, error: null };
  } catch (error) {
    console.error('Error fetching tables:', error);
    return { data: null, error };
  }
}

// Menu item methods
export async function getMenuItems() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    });
    return { data: menuItems, error: null };
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return { data: null, error };
  }
}

export async function getMenuItemById(id: string) {
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id }
    });
    return { data: menuItem, error: null };
  } catch (error) {
    console.error('Error fetching menu item:', error);
    return { data: null, error };
  }
}

export async function createMenuItem(menuItemData: {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}) {
  try {
    const menuItem = await prisma.menuItem.create({
      data: {
        name: menuItemData.name,
        description: menuItemData.description,
        price: menuItemData.price,
        category: menuItemData.category,
        imageUrl: menuItemData.imageUrl,
      }
    });
    return { data: menuItem, error: null };
  } catch (error) {
    console.error('Error creating menu item:', error);
    return { data: null, error };
  }
}

export async function updateMenuItem(id: string, menuItemData: Partial<MenuItem>) {
  try {
    const menuItem = await prisma.menuItem.update({
      where: { id },
      data: menuItemData
    });
    return { data: menuItem, error: null };
  } catch (error) {
    console.error('Error updating menu item:', error);
    return { data: null, error };
  }
}

export async function deleteMenuItem(id: string) {
  try {
    await prisma.menuItem.delete({
      where: { id }
    });
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return { success: false, error };
  }
}

// Staff methods
export async function getStaff() {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: { name: 'asc' }
    });
    return { data: staff, error: null };
  } catch (error) {
    console.error('Error fetching staff:', error);
    return { data: null, error };
  }
}

// Analytics methods
export async function getDashboardStats() {
  try {
    // Get today's reservations count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayReservations = await prisma.reservation.count({
      where: {
        reservationDate: {
          gte: today,
          lt: tomorrow
        }
      }
    });
    
    // Get active menu items count
    const activeMenuItems = await prisma.menuItem.count({
      where: { isActive: true }
    });
    
    // Get active staff count
    const staffCount = await prisma.staff.count({
      where: { isActive: true }
    });
    
    // Get upcoming reservations count (next 7 days)
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const upcomingReservations = await prisma.reservation.count({
      where: {
        reservationDate: {
          gte: today,
          lt: nextWeek
        }
      }
    });
    
    return { 
      data: {
        todayReservations,
        activeMenuItems,
        staffCount,
        upcomingReservations,
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return { data: null, error };
  }
} 