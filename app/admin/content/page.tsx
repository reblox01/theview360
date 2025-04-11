'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Button, 
  TextField, 
  Tab, 
  Tabs, 
  CircularProgress, 
  Alert, 
  Snackbar,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PhoneIcon from '@mui/icons-material/Phone';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface HeroContent {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundVideo: string;
  backgroundImage: string;
}

interface FeatureContent {
  title: string;
  description: string;
  image: string;
  video: string;
}

export default function ContentManagementPage() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Hero section content
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: 'The View 360',
    subtitle: 'Experience culinary perfection with breathtaking panoramic views.',
    buttonText: 'Book Your Table',
    buttonLink: '/reservation',
    backgroundVideo: '/videos/restaurant-ambience.mp4',
    backgroundImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
  });
  
  // Features section content
  const [features, setFeatures] = useState<FeatureContent[]>([
    {
      title: 'Exquisite Cuisine',
      description: 'Savor our chef\'s carefully crafted dishes made with seasonal ingredients and artistic presentation.',
      image: '/menu/salmon.jpg',
      video: '/videos/cooking.mp4'
    },
    {
      title: 'Perfect Ambiance',
      description: 'Enjoy breathtaking views in our sophisticated dining environment designed for comfort and elegance.',
      image: '/menu/ambiance.jpg',
      video: '/videos/ambiance.mp4'
    },
    {
      title: 'Premium Bar',
      description: 'Discover our extensive wine list and signature cocktails crafted by award-winning mixologists.',
      image: '/menu/bar.jpg',
      video: '/videos/bar.mp4'
    }
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  const saveHeroContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real application, this would save to a database via an API
      const response = await fetch('/api/content/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroContent),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save hero content');
      }
      
      setSuccess('Hero content saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const saveFeatures = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real application, this would save to a database via an API
      const response = await fetch('/api/content/features', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(features),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save features content');
      }
      
      setSuccess('Features content saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Content Management
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
        message={success}
      />
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={value} 
          onChange={handleTabChange}
          aria-label="content management tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<HomeIcon />} label="Hero Section" />
          <Tab icon={<RestaurantIcon />} label="Features" />
          <Tab icon={<RateReviewIcon />} label="Testimonials" />
          <Tab icon={<PhoneIcon />} label="Contact" />
        </Tabs>
      </Box>
      
      {/* Hero Section Tab */}
      <TabPanel value={value} index={0}>
        <Card sx={{ mb: 4 }}>
          <CardMedia
            component="img"
            height="200"
            image={heroContent.backgroundImage}
            alt="Hero background"
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Hero Title"
                  fullWidth
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Hero Subtitle"
                  fullWidth
                  multiline
                  rows={3}
                  value={heroContent.subtitle}
                  onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Button Text"
                  fullWidth
                  value={heroContent.buttonText}
                  onChange={(e) => setHeroContent({...heroContent, buttonText: e.target.value})}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Button Link"
                  fullWidth
                  value={heroContent.buttonLink}
                  onChange={(e) => setHeroContent({...heroContent, buttonLink: e.target.value})}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Background Video URL"
                  fullWidth
                  value={heroContent.backgroundVideo}
                  onChange={(e) => setHeroContent({...heroContent, backgroundVideo: e.target.value})}
                  margin="normal"
                  variant="outlined"
                  helperText="Video should be in MP4 format and placed in the /public/videos/ folder"
                />
                <TextField
                  label="Background Image URL"
                  fullWidth
                  value={heroContent.backgroundImage}
                  onChange={(e) => setHeroContent({...heroContent, backgroundImage: e.target.value})}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={saveHeroContent}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>
      
      {/* Features Tab */}
      <TabPanel value={value} index={1}>
        {features.map((feature, index) => (
          <Accordion key={index} defaultExpanded={index === 0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`feature-${index}-content`}
              id={`feature-${index}-header`}
            >
              <Typography variant="h6">{feature.title || `Feature ${index + 1}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={feature.image}
                      alt={feature.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardActions>
                      <Button size="small" startIcon={<AddPhotoAlternateIcon />}>
                        Change Image
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    label="Feature Title"
                    fullWidth
                    value={feature.title}
                    onChange={(e) => {
                      const newFeatures = [...features];
                      newFeatures[index].title = e.target.value;
                      setFeatures(newFeatures);
                    }}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Feature Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={feature.description}
                    onChange={(e) => {
                      const newFeatures = [...features];
                      newFeatures[index].description = e.target.value;
                      setFeatures(newFeatures);
                    }}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Feature Video URL"
                    fullWidth
                    value={feature.video}
                    onChange={(e) => {
                      const newFeatures = [...features];
                      newFeatures[index].video = e.target.value;
                      setFeatures(newFeatures);
                    }}
                    margin="normal"
                    variant="outlined"
                    helperText="Video should be in MP4 format"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setFeatures([...features, { title: '', description: '', image: '/placeholder.jpg', video: '' }])}
          >
            Add Feature
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveFeatures}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save All Features'}
          </Button>
        </Box>
      </TabPanel>
      
      {/* Testimonials Tab */}
      <TabPanel value={value} index={2}>
        <Typography>Testimonials content management coming soon...</Typography>
      </TabPanel>
      
      {/* Contact Tab */}
      <TabPanel value={value} index={3}>
        <Typography>Contact content management coming soon...</Typography>
      </TabPanel>
      
    </Box>
  );
} 