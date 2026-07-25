import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Paper, TextField, Button, Typography, Alert } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { isConfigured } from '../../firebase';

const AdminLogin = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/admin';

  if (user) {
    navigate(from, { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper sx={{ p: 5, width: '100%', maxWidth: 420, backgroundColor: '#1E293B', border: '1px solid #334155' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
          DreamsBhoomi Admin
        </Typography>
        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 4 }}>
          Sign in to manage projects, enquiries, and testimonials.
        </Typography>

        {!isConfigured && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Firebase is not configured — admin login is unavailable until .env is set up.
          </Alert>
        )}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            color="secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2, input: { color: '#fff' }, label: { color: '#94A3B8' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' } }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            color="secondary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3, input: { color: '#fff' }, label: { color: '#94A3B8' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={submitting || !isConfigured}
            sx={{ backgroundColor: 'secondary.main', py: 1.3, '&:hover': { backgroundColor: 'secondary.dark' } }}
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
