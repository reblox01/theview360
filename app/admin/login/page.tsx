'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setDebugInfo('Attempting login...');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Important for cookies
      });

      setDebugInfo(`Login response status: ${response.status}`);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setDebugInfo('Login successful, redirecting...');
      
      // Make a quick check to verify auth cookie is set
      const verifyResponse = await fetch('/api/auth/me', { 
        credentials: 'include'
      });
      
      if (verifyResponse.ok) {
        setDebugInfo('Auth verified, redirecting to admin...');
        // Wait a moment before redirecting to ensure UI updates
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } else {
        setDebugInfo('Auth verification failed!');
        setError('Login succeeded but authentication verification failed. Please try again.');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      setDebugInfo('Login error: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Box
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: 'primary.main',
            borderRadius: '50%',
            color: 'white',
          }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Box>
        <Typography component="h1" variant="h5" gutterBottom>
          Admin Login
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to access the restaurant management dashboard
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Always show debug info during development */}
        <Alert severity="info" sx={{ width: '100%', mb: 2 }}>
          {debugInfo || 'Enter your credentials to login'}
        </Alert>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          <Typography variant="caption" color="text.secondary" align="center" display="block">
            Default credentials: admin / admin123
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
} 