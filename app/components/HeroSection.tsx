'use client';

import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(true);
  
  // Parallax effect values
  const titleY = useTransform(scrollY, [0, 500], [0, -100]);
  const subtitleY = useTransform(scrollY, [0, 500], [0, -50]);
  const buttonY = useTransform(scrollY, [0, 500], [0, -25]);
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);
  const backgroundScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // 3D hover effect for button
  const [buttonHovered, setButtonHovered] = useState(false);
  
  return (
    <Box 
      ref={containerRef}
      sx={{ 
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        color: 'white',
        perspective: '1000px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
      }}
    >
      {/* Video Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <motion.div
          style={{ 
            y: backgroundY, 
            scale: backgroundScale,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <video
              autoPlay
              loop
              muted={videoMuted}
              playsInline
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: videoPlaying ? 'block' : 'none',
              }}
              src="/videos/restaurant-ambience.mp4"
              onError={(e) => {
                console.error('Video failed to load:', e);
                setVideoPlaying(false);
              }}
            />
            
            {/* Fallback image if video doesn't play */}
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
              alt="Restaurant interior"
              fill
              priority
              style={{
                objectFit: 'cover',
                display: videoPlaying ? 'none' : 'block',
              }}
            />
          </Box>
        </motion.div>
      </Box>

      {/* Video controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 10,
          display: 'flex',
          gap: 1,
        }}
      >
        <IconButton
          size="small"
          onClick={() => setVideoPlaying(!videoPlaying)}
          sx={{ 
            bgcolor: 'rgba(0,0,0,0.5)', 
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
          }}
        >
          {videoPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton
          size="small"
          onClick={() => setVideoMuted(!videoMuted)}
          sx={{ 
            bgcolor: 'rgba(0,0,0,0.5)', 
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
          }}
        >
          {videoMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
      </Box>

      {/* 3D Floating particles with depth effect */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="glow-particle"
            initial={{
              opacity: 0.3,
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
              z: Math.random() * 100 - 50,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              z: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.5)',
              boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.3)',
              transform: `translateZ(${Math.random() * 100}px)`,
            }}
          />
        ))}
      </Box>

      {/* Content with 3D parallax effect */}
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          style={{ y: titleY, opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 700,
              mb: 2,
              textShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
              position: 'relative',
              display: 'inline-block',
              transform: 'perspective(1000px) rotateX(5deg)',
              '&::after': {
                content: '""',
                position: 'absolute',
                height: '4px',
                width: '60%',
                backgroundColor: 'secondary.main',
                bottom: '-10px',
                left: 0,
                borderRadius: '2px',
                boxShadow: '0 0 10px rgba(194, 24, 91, 0.5)',
              }
            }}
          >
            The View 360
          </Typography>
        </motion.div>

        <motion.div
          style={{ y: subtitleY, opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              maxWidth: '600px',
              textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              transform: 'perspective(1000px) rotateX(5deg)',
            }}
          >
            Experience culinary perfection with breathtaking panoramic views. 
            Our chef's artistry meets nature's beauty for an unforgettable dining journey.
          </Typography>
        </motion.div>

        <motion.div
          style={{ y: buttonY, opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              z: 50,
            }}
            onHoverStart={() => setButtonHovered(true)}
            onHoverEnd={() => setButtonHovered(false)}
            style={{ 
              display: 'inline-block',
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            <Button
              component={Link}
              href="/reservation"
              variant="contained"
              size="large"
              sx={{
                borderRadius: '28px',
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                letterSpacing: 1,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: buttonHovered 
                  ? '0 20px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(194, 24, 91, 0.4)' 
                  : '0 8px 25px rgba(0, 0, 0, 0.4)',
                transform: buttonHovered ? 'translateZ(20px)' : 'translateZ(0)',
                transition: 'all 0.3s ease-out',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                  opacity: 0,
                  transform: 'scale(0.5)',
                  transition: 'transform 0.5s, opacity 0.5s',
                },
                '&:hover::before': {
                  opacity: 1,
                  transform: 'scale(1)',
                }
              }}
            >
              Book Your Table
            </Button>
          </motion.div>
          
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            style={{ 
              position: 'absolute', 
              width: '10px', 
              height: '10px', 
              borderRadius: '50%', 
              background: 'white',
              boxShadow: '0 0 20px 10px rgba(255, 255, 255, 0.5)',
              marginLeft: '10px',
              marginTop: '15px',
              transform: 'translateZ(30px)',
            }}
          />
        </motion.div>
      </Container>

      {/* 3D Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity
        }}
      >
        <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
          Scroll to explore
        </Typography>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          whileHover={{ scale: 1.2, rotateX: 10 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Box sx={{
            width: '30px',
            height: '50px',
            border: '2px solid white',
            borderRadius: '15px',
            position: 'relative',
            boxShadow: '0 0 15px rgba(255,255,255,0.2)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '8px',
              left: '50%',
              width: '6px',
              height: '6px',
              backgroundColor: 'white',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              animation: 'scroll 1.5s infinite',
              boxShadow: '0 0 10px rgba(255,255,255,0.5)',
            },
            '@keyframes scroll': {
              '0%': { top: '8px', opacity: 1 },
              '100%': { top: '32px', opacity: 0 },
            },
          }} />
        </motion.div>
      </motion.div>
    </Box>
  );
} 