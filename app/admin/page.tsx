import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Link from 'next/link';

export default function AdminDashboard() {
  // Mock data - in a real app, this would come from your API/database
  const stats = [
    {
      title: "Today's Reservations",
      value: '24',
      icon: <EventSeatIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      link: '/admin/reservations',
    },
    {
      title: 'Active Menu Items',
      value: '42',
      icon: <RestaurantIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      link: '/admin/menu',
    },
    {
      title: 'Staff Members',
      value: '15',
      icon: <GroupIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      link: '/admin/staff',
    },
    {
      title: 'Monthly Revenue',
      value: '$45,280',
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      link: '/admin/reports',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {stat.icon}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              component={Link}
              href="/admin/reservations/new"
            >
              New Reservation
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component={Link}
              href="/admin/menu/new"
            >
              Add Menu Item
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component={Link}
              href="/admin/staff/new"
            >
              Add Staff Member
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Recent Activity Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Card>
          <CardContent>
            <Typography color="text.secondary">
              • New reservation for Table 5 - Today at 7:00 PM
            </Typography>
            <Typography color="text.secondary">
              • Menu item "Grilled Salmon" updated - 2 hours ago
            </Typography>
            <Typography color="text.secondary">
              • New staff member John Doe added - Yesterday
            </Typography>
            <Typography color="text.secondary">
              • Table 3 reservation cancelled - Yesterday
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
} 