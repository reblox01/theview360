import { AppBar, Toolbar, Button, Container, Typography, Box } from '@mui/material';
import Link from 'next/link';

const Header = () => {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            THE VIEW 360
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                href={item.path}
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              component={Link}
              href="/reservation"
              variant="contained"
              color="primary"
              sx={{
                ml: 2,
                textTransform: 'none',
                borderRadius: '24px',
                px: 3,
              }}
            >
              Book a Table
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 