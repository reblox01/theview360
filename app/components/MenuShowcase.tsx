'use client';

import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';

// Enhanced featured menu items
const featuredItems = [
  {
    id: 1,
    name: 'Pan-Seared Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce, served with seasonal vegetables',
    price: '$32.99',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop',
    tags: ['Chef\'s Special'],
    modelImage: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Truffle Risotto',
    description: 'Creamy Arborio rice with wild mushrooms and black truffle',
    price: '$28.99',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop',
    tags: ['Vegetarian'],
    modelImage: 'https://images.unsplash.com/photo-1518449045497-22e273febe72?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla ice cream',
    price: '$14.99',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=2070&auto=format&fit=crop',
    tags: ['Dessert'],
    modelImage: 'https://images.unsplash.com/photo-1624633431713-a02ee10ef401?q=80&w=2070&auto=format&fit=crop',
  },
];

// 3D Card component for menu items
interface Menu3DCardProps {
  item: {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    modelImage: string;
    tags: string[];
  };
  index: number;
}

function Menu3DCard({ item, index }: Menu3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform values for 3D effect
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  
  // Handle mouse movement for 3D effect
  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
        transformPerspective: 1000,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          height: '500px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateZ(40px)' : 'translateZ(0)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
            zIndex: 1,
          },
        }}
      >
        {/* Front image */}
        <motion.div
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
        
        {/* 3D rotated image for hover effect */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            transform: 'translateZ(-50px)',
          }}
        >
          <Image
            src={item.modelImage}
            alt={`3D view of ${item.name}`}
            fill
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
        
        {/* Content that floats in 3D space */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            p: 4,
            zIndex: 2,
            transform: isHovered ? 'translateZ(60px)' : 'translateZ(20px)',
            transition: 'transform 0.3s ease-out',
            transformStyle: 'preserve-3d',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1, 
              mb: 2,
              transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
            }}
          >
            {item.tags.map((tag, i) => (
              <Box
                key={i}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  bgcolor: 'secondary.main',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.2)' : 'none',
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>
          
          <Typography 
            variant="h5" 
            gutterBottom 
            fontWeight={600}
            sx={{
              transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
              transition: 'transform 0.3s ease-out',
              textShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.4)' : 'none',
            }}
          >
            {item.name}
          </Typography>
          
          <Typography 
            variant="body1"
            sx={{ 
              mb: 2,
              opacity: 0.8,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
              transition: 'transform 0.3s ease-out',
            }}
          >
            {item.description}
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              transform: isHovered ? 'translateZ(40px)' : 'translateZ(0)',
              transition: 'transform 0.3s ease-out',
            }}
          >
            <Typography 
              variant="h6" 
              color="secondary.main" 
              fontWeight={600}
              sx={{
                textShadow: isHovered ? '0 0 10px rgba(194,24,91,0.3)' : 'none',
              }}
            >
              {item.price}
            </Typography>
            
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  bgcolor: 'white',
                  color: 'primary.main',
                  cursor: 'pointer',
                  boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                <span>+</span>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default function MenuShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  return (
    <Box 
      ref={ref}
      sx={{ 
        py: { xs: 8, md: 12 }, 
        backgroundColor: '#121212',
        color: 'white',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Enhanced background effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          opacity: 0.2,
          zIndex: 0,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient
              id="radialGradient"
              cx="50%"
              cy="50%"
              fx="50%"
              fy="50%"
              r="50%"
            >
              <stop offset="0%" stopColor="#c2185b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#121212" stopOpacity="0" />
            </radialGradient>
          </defs>
          <motion.circle
            cx="30%"
            cy="30%"
            r="300"
            fill="url(#radialGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, cx: ['30%', '70%', '30%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="70%"
            cy="70%"
            r="400"
            fill="url(#radialGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, cx: ['70%', '30%', '70%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
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
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                backgroundColor: 'secondary.main',
                borderRadius: '2px',
              }
            }}
          >
            Signature Dishes
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              mb: 8,
              mt: 4,
              opacity: 0.8,
            }}
          >
            Our culinary team creates memorable experiences through innovative flavors and
            masterful techniques with the finest seasonal ingredients.
          </Typography>
        </motion.div>

        <Grid container spacing={6}>
          {featuredItems.map((item, index) => (
            <Grid item xs={12} md={4} key={item.id}>
              <Menu3DCard item={item} index={index} />
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              component={Link}
              href="/menu"
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ 
                borderRadius: '30px',
                px: 5,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderWidth: '2px',
                '&:hover': {
                  borderWidth: '2px',
                },
              }}
            >
              View Full Menu
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
} 