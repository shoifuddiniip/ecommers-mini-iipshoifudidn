
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/userSlice';
import { Link } from 'react-router-dom';
import { Box, Button, IconButton, InputBase, Menu, MenuItem, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [onUserOpen, setOnUserOpen] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ maxWidth: '100vw', bgcolor: '#fff', borderBottom: '1px solid #eee', px: 4, py: 0, height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Left: Logo & Menu */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Typography variant="h5" fontWeight={900} sx={{ letterSpacing: 1, mr: 3 }}>
          SHOP.CO
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleMenu}>
            <Typography sx={{ fontWeight: 500, fontSize: 16 }}>Shop</Typography>
            <ExpandMoreIcon fontSize="small" />
          </Box>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ sx: { minWidth: 140 } }}>
            <MenuItem onClick={handleClose}>Men</MenuItem>
            <MenuItem onClick={handleClose}>Women</MenuItem>
            <MenuItem onClick={handleClose}>Kids</MenuItem>
          </Menu>
          <Typography sx={{ fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>On Sale</Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>New Arrivals</Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Brands</Typography>
        </Box>
      </Box>
      {/* Center: Search */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mx: 4 }}>
        <Box sx={{ width: 400, maxWidth: '100%', bgcolor: '#f4f4f4', borderRadius: 99, display: 'flex', alignItems: 'center', px: 2, py: 0.5 }}>
          <SearchIcon sx={{ color: '#aaa', mr: 1 }} />
          <InputBase placeholder="Search for products..." sx={{ flex: 1, fontSize: 16, color: '#222' }} inputProps={{ 'aria-label': 'search' }} />
        </Box>
      </Box>
      {/* Right: Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton size="large" sx={{ color: '#222' }}>
          <ShoppingCartOutlinedIcon fontSize="medium" />
        </IconButton>
        <Box>
          <IconButton size="large" sx={{ color: '#222' }} onClick={e => setOnUserOpen(e.currentTarget)}>
            <AccountCircleOutlinedIcon fontSize="medium" />
          </IconButton>
          <Menu anchorEl={onUserOpen} open={Boolean(onUserOpen)} onClose={() => setOnUserOpen(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <MenuItem disabled>{user.username}</MenuItem>
            <MenuItem onClick={() => { dispatch(logout()); handleClose(); }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
