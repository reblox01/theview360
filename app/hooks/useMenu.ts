import { useState, useEffect } from 'react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isSpecial?: boolean;
  isVegetarian?: boolean;
}

interface UseMenuReturn {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
  createMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (item: MenuItem) => Promise<void>;
  deleteMenuItem: (id: number) => Promise<void>;
  refreshMenuItems: () => Promise<void>;
}

export function useMenu(): UseMenuReturn {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/menu');
      if (!response.ok) throw new Error('Failed to fetch menu items');
      const data = await response.json();
      setMenuItems(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshMenuItems();
  }, []);

  const createMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      setLoading(true);
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      
      if (!response.ok) throw new Error('Failed to create menu item');
      await refreshMenuItems();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateMenuItem = async (item: MenuItem) => {
    try {
      setLoading(true);
      const response = await fetch('/api/menu', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      
      if (!response.ok) throw new Error('Failed to update menu item');
      await refreshMenuItems();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteMenuItem = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/menu?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete menu item');
      await refreshMenuItems();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    menuItems,
    loading,
    error,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    refreshMenuItems,
  };
} 