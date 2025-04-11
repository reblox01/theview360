import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from 'next/link';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              THE VIEW 360
            </Typography>
            <Typography variant="body2">
              Experience exceptional dining with panoramic views. Our restaurant offers a unique blend of flavors and atmosphere.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              123 Skyline Avenue<br />
              New York, NY 10001<br />
              Phone: (555) 123-4567<br />
              Email: info@theview360.com
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Opening Hours
            </Typography>
            <Typography variant="body2">
              Monday - Friday: 11:00 AM - 11:00 PM<br />
              Saturday - Sunday: 10:00 AM - 12:00 AM
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" component="a" href="https://facebook.com" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://instagram.com" target="_blank">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://twitter.com" target="_blank">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} The View 360. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 