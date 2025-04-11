'use client';

import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, CardActions, IconButton, Chip, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { useMenu } from '@/app/hooks/useMenu';
import { useState } from 'react';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button as ShadcnButton } from '@/components/ui/button';

// Mock data - in a real app, this would come from your API/database
const menuItems = [
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

const categories = ['Starters', 'Main Course', 'Dessert', 'Beverages'];

export default function MenuManagementPage() {
  const { menuItems: apiMenuItems, loading, error, deleteMenuItem } = useMenu();
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      await deleteMenuItem(id);
      setDeleteError(null);
      setConfirmOpen(false);
      setItemToDelete(null);
    } catch (err) {
      setDeleteError('Failed to delete menu item. Please try again.');
    }
  };

  const openConfirmDialog = (id: number) => {
    setItemToDelete(id);
    setConfirmOpen(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {deleteError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {deleteError}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Menu Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          href="/admin/menu/new"
        >
          Add Menu Item
        </Button>
      </Box>

      {categories.map((category) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {category}
          </Typography>
          <Grid container spacing={3}>
            {apiMenuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          ${item.price}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {item.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {item.isSpecial && (
                          <Chip label="Special" color="secondary" size="small" />
                        )}
                        {item.isVegetarian && (
                          <Chip label="Vegetarian" color="success" size="small" />
                        )}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <IconButton
                        component={Link}
                        href={`/admin/menu/${item.id}/edit`}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <Dialog>
                        <DialogTrigger asChild>
                          <IconButton
                            color="error"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete "{item.name}"? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <ShadcnButton variant="outline" onClick={() => {}}>
                              Cancel
                            </ShadcnButton>
                            <ShadcnButton variant="destructive" onClick={() => handleDelete(item.id)}>
                              Delete
                            </ShadcnButton>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
} 