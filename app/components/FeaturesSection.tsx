'use client';

import { Box, Container, Typography, Grid, IconButton } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

// Enhanced features with videos and additional content
const features = [
  {
    title: 'Exquisite Cuisine',
    description: 'Savor our chef\'s carefully crafted dishes made with seasonal ingredients and artistic presentation.',
    icon: <RestaurantIcon sx={{ fontSize: 48 }} />,
    color: '#1a237e',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-person-cooking-vegetables-in-a-pan-8766-large.mp4',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Perfect Ambiance',
    description: 'Enjoy breathtaking views in our sophisticated dining environment designed for comfort and elegance.',
    icon: <EventSeatIcon sx={{ fontSize: 48 }} />,
    color: '#c2185b',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-high-end-dining-setting-in-soft-lighting-31109-large.mp4',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2074&auto=format&fit=crop',
  },
  {
    title: 'Premium Bar',
    description: 'Discover our extensive wine list and signature cocktails crafted by award-winning mixologists.',
    icon: <LocalBarIcon sx={{ fontSize: 48 }} />,
    color: '#00796b',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-bartender-serving-a-cocktail-in-a-smoky-bar-49345-large.mp4',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=2072&auto=format&fit=crop',
  },
];

// Interactive feature card component with video/image toggle
interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    video: string;
    image: string;
  };
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform values for 3D effect
  const rotateY = useTransform(x, [-100, 100], [5, -5]);
  const rotateX = useTransform(y, [-100, 100], [-5, 5]);
  
  // Handle mouse movement for 3D effect
  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }
  
  const toggleVideo = () => {
    if (!videoRef.current) return;
    
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.error('Error loading video:', feature.video);
    setIsVideoLoaded(false);
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateY: isHovered ? rotateY : 0,
        rotateX: isHovered ? rotateX : 0,
        z: isHovered ? 20 : 0,
      }}
    >
      <Box
        sx={{
          height: '100%',
          p: 4,
          pb: 0,
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: isHovered 
            ? '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.4)' 
            : '0 10px 30px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          transition: 'box-shadow 0.3s, transform 0.3s',
          transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Media Container */}
        <Box 
          sx={{ 
            position: 'relative',
            mb: 3,
            height: '220px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            transform: isHovered ? 'scale(1.02) translateZ(20px)' : 'scale(1) translateZ(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            style={{
              objectFit: 'cover',
              display: isVideoPlaying && isVideoLoaded ? 'none' : 'block',
            }}
          />
          
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            src={feature.video}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: isVideoPlaying && isVideoLoaded ? 'block' : 'none',
            }}
          />
          
          {isVideoLoaded && (
            <IconButton
              onClick={toggleVideo}
              size="small"
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                },
                transform: isHovered ? 'scale(1.1) translateZ(30px)' : 'scale(1)',
                transition: 'transform 0.3s ease',
              }}
            >
              {isVideoPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          )}
        </Box>
        
        {/* Content */}
        <Box 
          sx={{ 
            color: feature.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}40 100%)`,
              boxShadow: isHovered ? `0 10px 25px ${feature.color}40` : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {feature.icon}
          </Box>
        </Box>
        
        <Typography 
          variant="h5" 
          component="h3" 
          gutterBottom
          align="center"
          sx={{ 
            fontWeight: 600,
            transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease',
            color: isHovered ? feature.color : 'inherit',
          }}
        >
          {feature.title}
        </Typography>
        
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ 
            lineHeight: 1.7,
            mb: 3,
            transform: isHovered ? 'translateZ(10px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          {feature.description}
        </Typography>
      </Box>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  
  return (
    <Box 
      ref={ref}
      sx={{ 
        py: { xs: 8, md: 12 }, 
        position: 'relative',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Enhanced animated background elements */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.4 }}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 - 50 + '%', 
              y: Math.random() * 100 - 50 + '%', 
              scale: Math.random() * 0.6 + 0.2,
              rotate: Math.random() * 180,
            }}
            animate={{ 
              x: [null, Math.random() * 100 - 50 + '%', Math.random() * 100 - 50 + '%'],
              y: [null, Math.random() * 100 - 50 + '%', Math.random() * 100 - 50 + '%'],
              rotate: [0, Math.random() * 360],
              scale: [Math.random() * 0.6 + 0.2, Math.random() * 0.8 + 0.3, Math.random() * 0.6 + 0.2],
            }}
            transition={{ 
              duration: Math.random() * 60 + 30, 
              repeat: Infinity,
              ease: 'easeInOut' 
            }}
            style={{
              position: 'absolute',
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
              filter: 'blur(40px)',
            }}
          />
        ))}
        
        {/* 3D floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0.2,
              scale: Math.random() * 0.5 + 0.1,
            }}
            animate={{ 
              x: [null, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [null, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0.2, 0.5, 0.2],
              scale: [Math.random() * 0.5 + 0.1, Math.random() * 0.7 + 0.2, Math.random() * 0.5 + 0.1],
            }}
            transition={{ 
              duration: Math.random() * 20 + 10, 
              repeat: Infinity,
              ease: 'easeInOut' 
            }}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'white',
              boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.2)',
              zIndex: Math.floor(Math.random() * 5),
            }}
          />
        ))}
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
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(90deg, #1a237e 0%, #c2185b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            The View 360 Experience
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            color="text.secondary"
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              mb: 8,
              lineHeight: 1.6,
            }}
          >
            We pride ourselves on providing an exceptional dining experience that engages 
            all your senses with attention to every detail.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard feature={feature} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 