
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Box, IconButton, InputBase, Menu, MenuItem, Typography } from '@mui/material';
import Badge from './Badge';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const cartCount = useSelector((state: RootState) => Array.isArray(state.cart.items) ? state.cart.items.reduce((sum, item) => sum + item.qty, 0) : 0);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [onUserOpen, setOnUserOpen] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
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
        <Typography
          variant="h5"
          fontWeight={900}
          sx={{ letterSpacing: 1, mr: 3, cursor: 'pointer' }}
          onClick={() => navigate('/products')}
        >
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
        <form
          onSubmit={e => {
            e.preventDefault();
            if (search.trim()) {
              navigate(`/products?search=${encodeURIComponent(search.trim())}`);
            } else {
              navigate('/products');
            }
          }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Box sx={{ width: 400, maxWidth: '100%', bgcolor: '#f4f4f4', borderRadius: 99, display: 'flex', alignItems: 'center', px: 2, py: 0.5 }}>
            <SearchIcon sx={{ color: '#aaa', mr: 1 }} />
            <InputBase
              placeholder="Search for products..."
              sx={{ flex: 1, fontSize: 16, color: '#222' }}
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Box>
        </form>
      </Box>
      {/* Right: Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton size="large" sx={{ color: '#222' }} component={Link} to="/orders" title="Daftar Pesanan">
          <ListAltOutlinedIcon fontSize="medium" />
        </IconButton>
        <IconButton size="large" sx={{ color: '#222' }} component={Link} to="/cart">
          <Badge color="error" badgeContent={cartCount > 0 ? cartCount : undefined} invisible={cartCount === 0} overlap="circular">
            <ShoppingCartOutlinedIcon fontSize="medium" />
          </Badge>
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
