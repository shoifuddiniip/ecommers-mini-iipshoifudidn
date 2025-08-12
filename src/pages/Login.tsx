

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/authApi';
import {
  Box, Button, TextField, Typography, Alert, Paper, InputAdornment, IconButton, Divider, Link as MuiLink
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

const Login: React.FC = () => {
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginApi(username, password);
      dispatch(setUser({
        id: String(res.userId),
        fullname: res.fullname,
        username: res.username,
        token: res.token
      }));
      navigate('/');
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError('Login gagal!');
      } else {
        setError('Terjadi kesalahan jaringan: ' + err.message);
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #6dd5ed 0%, #c471f5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, minWidth: 350, maxWidth: 380 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Typography component="h1" variant="h4" fontWeight={700} mb={2}>
            Login
          </Typography>
        </Box>
        <Box component="form" display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username"
            placeholder="Type your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            placeholder="Type your password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <MuiLink href="#" underline="none" sx={{ fontSize: 12 }}>
                    Forgot password?
                  </MuiLink>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              mb: 1,
              py: 1.2,
              fontWeight: 700,
              background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
              color: '#fff',
              boxShadow: 'none',
              borderRadius: 99,
              '&:hover': {
                background: 'linear-gradient(90deg, #38f9d7 0%, #43e97b 100%)',
                boxShadow: 'none',
              },
            }}
            onClick={handleLogin}
          >
            LOGIN
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
        <Divider sx={{ my: 2 }}>Or Sign Up Using</Divider>
        <Box display="flex" justifyContent="center" gap={2} mb={2}>
          <IconButton color="primary"><FacebookIcon /></IconButton>
          <IconButton color="primary"><TwitterIcon /></IconButton>
          <IconButton color="error"><GoogleIcon /></IconButton>
        </Box>
        <Divider sx={{ my: 2 }}>
          Or Sign Up Using
        </Divider>
        <Box textAlign="center">
          <MuiLink href="#" underline="hover" sx={{ fontWeight: 700 }}>
            SIGN UP
          </MuiLink>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
