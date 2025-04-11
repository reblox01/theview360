import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Chip, Divider } from '@mui/material';

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

export default function MenuPage() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 6
          }}
        >
          Our Menu
        </Typography>

        {categories.map((category, index) => (
          <Box key={category} sx={{ mb: 8 }}>
            <Typography
              variant="h4"
              component="h2"
              align="center"
              sx={{
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '3px',
                  bgcolor: 'primary.main',
                },
                mb: 6,
              }}
            >
              {category}
            </Typography>

            <Grid container spacing={4}>
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <Grid item xs={12} md={6} key={item.id}>
                    <Card
                      elevation={0}
                      sx={{
                        display: 'flex',
                        height: '100%',
                        bgcolor: 'transparent',
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: 140,
                          height: 140,
                          objectFit: 'cover',
                          borderRadius: 2,
                        }}
                        image={item.image}
                        alt={item.name}
                      />
                      <CardContent sx={{ flex: 1, pl: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Box>
                            <Typography variant="h6" component="div" gutterBottom>
                              {item.name}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                              {item.isSpecial && (
                                <Chip label="Chef's Special" color="secondary" size="small" />
                              )}
                              {item.isVegetarian && (
                                <Chip label="Vegetarian" color="success" size="small" />
                              )}
                            </Box>
                          </Box>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              color: 'primary.main',
                              fontWeight: 600,
                            }}
                          >
                            ${item.price}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>

            {index < categories.length - 1 && (
              <Divider sx={{ mt: 8 }} />
            )}
          </Box>
        ))}
      </Container>
    </Box>
  );
} 