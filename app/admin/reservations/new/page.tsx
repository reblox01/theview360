'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Stepper,
  Step,
  StepLabel,
  Alert,
  Divider,
  Chip,
  IconButton,
  Card,
  CardContent,
  CircularProgress,
  Tooltip,
  FormHelperText,
  useTheme
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import dayjs from 'dayjs';
import Link from 'next/link';

// Mock data - in a real app, this would come from your API/database
const tables = [
  { id: 1, number: 1, capacity: 2, location: 'Window', status: 'available' },
  { id: 2, number: 2, capacity: 2, location: 'Window', status: 'available' },
  { id: 3, number: 3, capacity: 4, location: 'Center', status: 'available' },
  { id: 4, number: 4, capacity: 4, location: 'Center', status: 'available' },
  { id: 5, number: 5, capacity: 6, location: 'Patio', status: 'available' },
  { id: 6, number: 6, capacity: 6, location: 'Patio', status: 'available' },
  { id: 7, number: 7, capacity: 8, location: 'Private', status: 'available' },
  { id: 8, number: 8, capacity: 8, location: 'Private', status: 'available' },
];

// Table location colors for better visual distinction
const locationColors = {
  'Window': '#1a237e', // deep blue
  'Center': '#00796b', // teal
  'Patio': '#689f38',  // green
  'Private': '#7b1fa2', // purple
};

const steps = ['Customer Information', 'Date & Time', 'Table Selection', 'Confirmation'];

interface FormErrors {
  customerName?: string;
  phoneNumber?: string;
  reservationDate?: string;
  reservationTime?: string;
  guestCount?: string;
  tableId?: string;
}

export default function NewReservationPage() {
  const theme = useTheme();
  
  // Form state
  const [activeStep, setActiveStep] = useState(0);
  const [reservationDate, setReservationDate] = useState<dayjs.Dayjs | null>(null);
  const [reservationTime, setReservationTime] = useState<dayjs.Dayjs | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [tableId, setTableId] = useState<string | number>('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Filter tables based on guest count
  const availableTables = tables.filter(
    table => table.capacity >= guestCount && table.status === 'available'
  );

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (step === 0) {
      if (!customerName.trim()) newErrors.customerName = 'Name is required';
      if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (phoneNumber && !phoneRegex.test(phoneNumber.replace(/[\s-]/g, ''))) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }
    } 
    else if (step === 1) {
      if (!reservationDate) newErrors.reservationDate = 'Please select a date';
      if (!reservationTime) newErrors.reservationTime = 'Please select a time';
      
      // Check if date is in the future
      if (reservationDate && reservationDate.isBefore(dayjs().startOf('day'))) {
        newErrors.reservationDate = 'Please select a future date';
      }
      
      // Check if time is within opening hours (e.g., 11 AM to 10 PM)
      if (reservationTime) {
        const hour = reservationTime.hour();
        if (hour < 11 || hour >= 22) {
          newErrors.reservationTime = 'Please select a time between 11:00 AM and 10:00 PM';
        }
      }
    }
    else if (step === 2) {
      if (!tableId) newErrors.tableId = 'Please select a table';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (activeStep !== steps.length - 1) {
      handleNext();
      return;
    }
    
    // Final submission
    setIsSubmitting(true);
    
    try {
      // In a real app, you would submit this data to your API
      // const response = await fetch('/api/reservations', { method: 'POST', ... });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      console.log({
        customerName,
        phoneNumber,
        email,
        reservationDate: reservationDate?.format('YYYY-MM-DD'),
        reservationTime: reservationTime?.format('HH:mm'),
        guestCount,
        tableId,
        specialRequests
      });
    } catch (error) {
      console.error('Error submitting reservation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get the color for a table location
  const getLocationColor = (location: string) => {
    return locationColors[location as keyof typeof locationColors] || theme.palette.primary.main;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          href="/admin/reservations"
          startIcon={<ArrowBackIcon />}
          sx={{ mr: 2 }}
          color="inherit"
        >
          Back
        </Button>
        <Typography 
          variant="h4"
          sx={{
            background: 'linear-gradient(45deg, #1a237e 30%, #7b1fa2 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          New Reservation
        </Typography>
      </Box>

      <Paper 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          mb: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderRadius: '16px',
          backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel 
          sx={{ 
            mb: 4,
            '& .MuiStepLabel-root .Mui-completed': {
              color: theme.palette.secondary.main,
            },
            '& .MuiStepLabel-root .Mui-active': {
              color: theme.palette.primary.main,
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {submitSuccess ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                color: theme.palette.success.dark,
                fontWeight: 'bold'
              }}
            >
              Reservation Confirmed!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              A confirmation has been sent to the customer.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                component={Link}
                href="/admin/reservations"
                sx={{
                  background: 'linear-gradient(45deg, #1a237e 30%, #7b1fa2 90%)',
                  boxShadow: '0 3px 5px 2px rgba(123, 31, 162, .3)',
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #0d1642 30%, #6a1b8c 90%)',
                  }
                }}
              >
                View All Reservations
              </Button>
            </Box>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            {activeStep === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2,
                      color: theme.palette.primary.main,
                      fontWeight: 'bold'
                    }}
                  >
                    <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Customer Details
                  </Typography>
                  <Divider sx={{ mb: 3, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Customer Name"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    error={!!errors.customerName}
                    helperText={errors.customerName}
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    placeholder="+1 (555) 123-4567"
                    InputProps={{
                      startAdornment: <PhoneIcon sx={{ mr: 1, color: theme.palette.primary.main }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    helperText="Optional - for sending confirmation"
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ mr: 1, color: theme.palette.primary.main }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            )}

            {activeStep === 1 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2,
                      color: theme.palette.primary.main,
                      fontWeight: 'bold'
                    }}
                  >
                    <CalendarMonthIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Reservation Time
                  </Typography>
                  <Divider sx={{ mb: 3, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      value={reservationDate}
                      onChange={(newValue) => setReservationDate(newValue)}
                      sx={{ 
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                      }}
                      disablePast
                      slotProps={{
                        textField: {
                          error: !!errors.reservationDate,
                          helperText: errors.reservationDate,
                          required: true,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Time"
                      value={reservationTime}
                      onChange={(newValue) => setReservationTime(newValue)}
                      sx={{ 
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                      }}
                      slotProps={{
                        textField: {
                          error: !!errors.reservationTime,
                          helperText: errors.reservationTime || 'We serve from 11:00 AM to 10:00 PM',
                          required: true,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Number of Guests"
                    type="number"
                    required
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                    InputProps={{ 
                      inputProps: { min: 1, max: 20 },
                      startAdornment: <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />,
                    }}
                    helperText={`Select tables that can accommodate ${guestCount} guests`}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            )}

            {activeStep === 2 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2,
                      color: theme.palette.primary.main,
                      fontWeight: 'bold'
                    }}
                  >
                    <TableRestaurantIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Table Selection
                  </Typography>
                  <Divider sx={{ mb: 3, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
                </Grid>
                
                {availableTables.length === 0 ? (
                  <Grid item xs={12}>
                    <Alert 
                      severity="warning" 
                      sx={{ 
                        mb: 2,
                        borderRadius: '8px',
                      }}
                    >
                      No tables available for {guestCount} guests. Please adjust the number of guests or select a different date/time.
                    </Alert>
                    <Button 
                      variant="outlined" 
                      onClick={handleBack}
                      startIcon={<ArrowBackIcon />}
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          borderColor: theme.palette.primary.dark,
                          backgroundColor: 'rgba(26, 35, 126, 0.04)',
                        }
                      }}
                    >
                      Go Back
                    </Button>
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <FormControl fullWidth error={!!errors.tableId}>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            mb: 2,
                            fontWeight: 'medium',
                            color: theme.palette.text.secondary
                          }}
                        >
                          Select a table for {guestCount} guests:
                        </Typography>
                        <Grid container spacing={2}>
                          {availableTables.map((table) => (
                            <Grid item xs={12} sm={6} md={4} key={table.id}>
                              <Card 
                                sx={{ 
                                  cursor: 'pointer',
                                  border: tableId === table.id ? '2px solid' : '1px solid',
                                  borderColor: tableId === table.id ? theme.palette.primary.main : 'divider',
                                  borderRadius: '12px',
                                  transition: 'all 0.2s',
                                  '&:hover': {
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                    transform: 'translateY(-4px)',
                                    borderColor: theme.palette.primary.main,
                                  },
                                  ...(tableId === table.id && {
                                    boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                                  }),
                                }}
                                onClick={() => setTableId(table.id)}
                              >
                                <CardContent sx={{ p: 2.5 }}>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography 
                                      variant="h6"
                                      sx={{
                                        fontWeight: 'bold',
                                        color: tableId === table.id ? theme.palette.primary.main : 'inherit',
                                      }}
                                    >
                                      Table {table.number}
                                    </Typography>
                                    {tableId === table.id && (
                                      <CheckCircleIcon color="primary" />
                                    )}
                                  </Box>
                                  <Box sx={{ mt: 2 }}>
                                    <Chip 
                                      icon={<EventSeatIcon />} 
                                      label={`${table.capacity} seats`} 
                                      size="small" 
                                      sx={{ mr: 1, mb: 1 }} 
                                      color="primary"
                                      variant={tableId === table.id ? "filled" : "outlined"}
                                    />
                                    <Chip 
                                      label={table.location} 
                                      size="small" 
                                      sx={{ 
                                        mb: 1,
                                        backgroundColor: tableId === table.id ? getLocationColor(table.location) : 'transparent',
                                        color: tableId === table.id ? '#fff' : getLocationColor(table.location),
                                        borderColor: getLocationColor(table.location)
                                      }}
                                      variant={tableId === table.id ? "filled" : "outlined"}
                                    />
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                        {errors.tableId && (
                          <FormHelperText sx={{ mt: 1, ml: 1 }}>{errors.tableId}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Special Requests"
                        multiline
                        rows={3}
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        helperText="Allergies, accessibility needs, special occasions, etc."
                        InputProps={{
                          startAdornment: <RoomServiceIcon sx={{ mr: 1, mt: 1.5, color: theme.palette.primary.main }} />,
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            )}

            {activeStep === 3 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2,
                      color: theme.palette.primary.main,
                      fontWeight: 'bold'
                    }}
                  >
                    <CheckCircleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Reservation Summary
                  </Typography>
                  <Divider sx={{ mb: 3, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ 
                    bgcolor: 'rgba(0, 0, 0, 0.02)', 
                    p: 3, 
                    borderRadius: '12px',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                  }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography 
                          variant="subtitle2" 
                          color="primary"
                          sx={{ 
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1
                          }}
                        >
                          <PersonIcon sx={{ mr: 1, fontSize: '1rem' }} />
                          Customer
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{customerName}</Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <PhoneIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
                          {phoneNumber}
                        </Typography>
                        {email && (
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <EmailIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
                            {email}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography 
                          variant="subtitle2" 
                          color="primary"
                          sx={{ 
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1
                          }}
                        >
                          <CalendarMonthIcon sx={{ mr: 1, fontSize: '1rem' }} />
                          Reservation
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          {reservationDate?.format('dddd, MMMM D, YYYY')}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                          {reservationTime?.format('h:mm A')}
                        </Typography>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <PersonIcon sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
                          {guestCount} {guestCount === 1 ? 'person' : 'people'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography 
                          variant="subtitle2" 
                          color="primary"
                          sx={{ 
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1
                          }}
                        >
                          <TableRestaurantIcon sx={{ mr: 1, fontSize: '1rem' }} />
                          Table
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          Table {tables.find(t => t.id === tableId)?.number}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Chip 
                            size="small"
                            label={tables.find(t => t.id === tableId)?.location}
                            sx={{ 
                              backgroundColor: getLocationColor(tables.find(t => t.id === tableId)?.location || ''),
                              color: '#fff',
                              fontWeight: 'medium'
                            }}
                          />
                        </Box>
                      </Grid>
                      {specialRequests && (
                        <Grid item xs={12}>
                          <Typography 
                            variant="subtitle2" 
                            color="primary"
                            sx={{ 
                              fontWeight: 'bold',
                              display: 'flex',
                              alignItems: 'center',
                              mb: 1
                            }}
                          >
                            <RoomServiceIcon sx={{ mr: 1, fontSize: '1rem' }} />
                            Special Requests
                          </Typography>
                          <Typography 
                            variant="body2"
                            sx={{
                              p: 1.5,
                              borderRadius: '8px',
                              bgcolor: 'rgba(0, 0, 0, 0.03)',
                              fontStyle: 'italic'
                            }}
                          >
                            "{specialRequests}"
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ 
                  mr: 1,
                  borderRadius: '8px',
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.05)',
                  }
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting || (activeStep === 2 && availableTables.length === 0)}
                sx={{
                  background: 'linear-gradient(45deg, #1a237e 30%, #7b1fa2 90%)',
                  boxShadow: '0 3px 5px 2px rgba(123, 31, 162, .3)',
                  borderRadius: '8px',
                  color: 'white',
                  px: 4,
                  py: isSubmitting ? 1.3 : 1.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #0d1642 30%, #6a1b8c 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 10px 2px rgba(123, 31, 162, .3)',
                  }
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : activeStep === steps.length - 1 ? (
                  'Confirm Reservation'
                ) : (
                  'Continue'
                )}
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Box>
  );
} 