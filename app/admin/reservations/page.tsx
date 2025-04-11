import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

// Mock data - in a real app, this would come from your API/database
const reservations = [
  {
    id: 1,
    customerName: 'John Smith',
    date: '2024-03-15',
    time: '19:00',
    guests: 4,
    tableNumber: 5,
    status: 'confirmed',
    phone: '+1 (555) 123-4567',
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    date: '2024-03-15',
    time: '20:00',
    guests: 2,
    tableNumber: 3,
    status: 'pending',
    phone: '+1 (555) 234-5678',
  },
  {
    id: 3,
    customerName: 'Michael Brown',
    date: '2024-03-16',
    time: '18:30',
    guests: 6,
    tableNumber: 8,
    status: 'confirmed',
    phone: '+1 (555) 345-6789',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

export default function ReservationsPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Reservations
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          href="/admin/reservations/new"
        >
          New Reservation
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Table</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.customerName}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.time}</TableCell>
                <TableCell>{reservation.guests}</TableCell>
                <TableCell>{reservation.tableNumber}</TableCell>
                <TableCell>{reservation.phone}</TableCell>
                <TableCell>
                  <Chip
                    label={reservation.status}
                    color={getStatusColor(reservation.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    component={Link}
                    href={`/admin/reservations/${reservation.id}`}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    sx={{ ml: 1 }}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 