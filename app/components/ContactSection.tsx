'use client';

import { Box, Container, Typography, Grid, TextField, Button, Paper } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

export default function ContactSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box 
      ref={ref}
      sx={{ 
        py: { xs: 8, md: 12 }, 
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        color: 'white',
      }}
    >
      {/* Parallax Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{ y, position: 'absolute', width: '100%', height: '200%', top: '-50%', zIndex: -1 }}
        >
          {[...Array(20)].map((_, i) => (
            <Box
              key={i}
              component="span"
              sx={{
                position: 'absolute',
                display: 'block',
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                filter: 'blur(8px)',
              }}
            />
          ))}
        </motion.div>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h2" 
              component="h2"
              sx={{ 
                fontWeight: 700,
                mb: 2,
              }}
            >
              Get in Touch
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                fontSize: '1.1rem',
                mb: 4,
                opacity: 0.9,
              }}
            >
              Whether you're planning a special event, have questions about our menu, 
              or simply want to make a reservation, we're here to assist you.
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 2, fontSize: '1.8rem', color: 'secondary.main' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Address
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    123 Skyline Avenue, New York, NY 10001
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ mr: 2, fontSize: '1.8rem', color: 'secondary.main' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Phone
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    (555) 123-4567
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2, fontSize: '1.8rem', color: 'secondary.main' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    info@theview360.com
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WatchLaterIcon sx={{ mr: 2, fontSize: '1.8rem', color: 'secondary.main' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Hours
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Mon-Fri: 11:00 AM - 11:00 PM<br />
                    Sat-Sun: 10:00 AM - 12:00 AM
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={formVariants}
            >
              <Paper 
                elevation={24}
                sx={{ 
                  p: 4, 
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Box component="form" noValidate>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <motion.div variants={itemVariants}>
                        <TextField
                          fullWidth
                          label="Name"
                          variant="outlined"
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'rgba(255, 255, 255, 0.7)',
                            },
                            '& .MuiInputBase-input': {
                              color: 'white',
                            },
                          }}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <motion.div variants={itemVariants}>
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          required
                          type="email"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'rgba(255, 255, 255, 0.7)',
                            },
                            '& .MuiInputBase-input': {
                              color: 'white',
                            },
                          }}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div variants={itemVariants}>
                        <TextField
                          fullWidth
                          label="Phone"
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'rgba(255, 255, 255, 0.7)',
                            },
                            '& .MuiInputBase-input': {
                              color: 'white',
                            },
                          }}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div variants={itemVariants}>
                        <TextField
                          fullWidth
                          label="Message"
                          variant="outlined"
                          multiline
                          rows={4}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'rgba(255, 255, 255, 0.7)',
                            },
                            '& .MuiInputBase-input': {
                              color: 'white',
                            },
                          }}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div variants={itemVariants}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="secondary"
                          size="large"
                          sx={{
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            letterSpacing: 1,
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                              boxShadow: '0 12px 20px rgba(0, 0, 0, 0.3)',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s',
                          }}
                        >
                          Send Message
                        </Button>
                      </motion.div>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 