'use client';

import { Box, Container, Typography, Avatar, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StarIcon from '@mui/icons-material/Star';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Michael Rodriguez',
    role: 'Food Critic',
    avatar: 'https://i.pravatar.cc/150?img=12', // Using external placeholder avatar
    quote: 'The View 360 redefines luxury dining in the city. Every dish tells a story of culinary excellence, matched only by the breathtaking panoramic views that surround you.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Regular Guest',
    avatar: 'https://i.pravatar.cc/150?img=21',
    quote: "I've celebrated all my special occasions here for the past five years. The attention to detail, impeccable service, and consistently excellent food make this my favorite restaurant.",
    rating: 5,
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'Travel Blogger',
    avatar: 'https://i.pravatar.cc/150?img=32',
    quote: 'Having dined at top restaurants around the world, I can confidently say The View 360 offers one of the most memorable dining experiences with its perfect balance of ambiance, flavor, and service.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <Box 
      ref={ref}
      sx={{ 
        py: { xs: 10, md: 15 }, 
        background: 'linear-gradient(135deg, #f6f9fc 0%, #eaf4fe 100%)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative elements */}
      <Box
        component="svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.1,
        }}
      >
        <path
          fill="#c2185b"
          fillOpacity="0.3"
          d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h2" 
            component="h2" 
            align="center" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: 'primary.main',
            }}
          >
            What Our Guests Say
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            color="text.secondary"
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              mb: 8,
              opacity: 0.8,
            }}
          >
            The true measure of our success is the satisfaction and joy of our guests.
          </Typography>
        </motion.div>

        <Box 
          sx={{ 
            position: 'relative',
            height: { xs: '400px', md: '300px' },
            mt: 4,
            mx: 'auto',
            maxWidth: '900px',
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box 
                sx={{ 
                  textAlign: 'center',
                  px: { xs: 2, md: 6 },
                  py: 4,
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 20px 80px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  position: 'relative',
                  width: '100%',
                }}
              >
                <FormatQuoteIcon 
                  sx={{ 
                    position: 'absolute',
                    top: -30,
                    left: { xs: 20, md: 50 },
                    fontSize: '4rem',
                    color: 'secondary.main',
                    opacity: 0.2,
                    transform: 'scaleX(-1)',
                  }} 
                />
                
                <Typography 
                  variant="body1" 
                  component="blockquote"
                  sx={{ 
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    fontStyle: 'italic',
                    lineHeight: 1.8,
                    mb: 4,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  "{testimonials[current].quote}"
                </Typography>
                
                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar 
                    src={testimonials[current].avatar} 
                    alt={testimonials[current].name}
                    sx={{ 
                      width: 64, 
                      height: 64,
                      mb: 1,
                      border: '2px solid',
                      borderColor: 'primary.main',
                    }}
                  />
                  
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {testimonials[current].name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {testimonials[current].role}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
                    ))}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: { xs: -15, md: -50 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
              },
              zIndex: 10,
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: { xs: -15, md: -50 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
              },
              zIndex: 10,
            }}
          >
            <ChevronRightIcon />
          </IconButton>
          
          {/* Indicators */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 4,
              position: 'absolute',
              bottom: -30,
              left: 0,
              right: 0,
            }}
          >
            {testimonials.map((_, i) => (
              <Box
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                sx={{
                  width: 12,
                  height: 12,
                  mx: 0.5,
                  borderRadius: '50%',
                  bgcolor: i === current ? 'primary.main' : 'grey.300',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: i === current ? 'primary.main' : 'grey.400',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 