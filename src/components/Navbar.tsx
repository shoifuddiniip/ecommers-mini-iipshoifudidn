import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/userSlice';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return (
    <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 32px',height:64,background:'#fff',borderBottom:'1px solid #eee'}}>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <div style={{width:28,height:28,background:'#7fffd4',borderRadius:4,marginRight:8}}></div>
        <span style={{fontWeight:700,fontSize:22}}>Stellar</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:24}}>
        <span style={{fontSize:20,cursor:'pointer'}}>🔍</span>
        <span style={{fontSize:20,cursor:'pointer'}}>🛒</span>
        <span style={{fontSize:20,cursor:'pointer'}}>📊</span>
        <span style={{fontSize:20,cursor:'pointer',position:'relative'}}>💬<span style={{position:'absolute',top:-8,right:-8,background:'red',color:'#fff',borderRadius:'50%',fontSize:10,padding:'2px 5px'}}>1</span></span>
        <div style={{borderLeft:'1px solid #eee',height:24,margin:'0 16px'}}></div>
        <span role="img" aria-label="us" style={{fontSize:18}}>🇺🇸</span>
        <span style={{marginLeft:4,marginRight:8}}>English ▼</span>
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" style={{width:32,height:32,borderRadius:'50%',objectFit:'cover',marginRight:8}} />
        <span style={{fontWeight:500}}>{user.username} ▼</span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            marginLeft: 2,
            borderRadius: 99,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
            '&:hover': {
              background: 'linear-gradient(90deg, #38f9d7 0%, #43e97b 100%)',
              boxShadow: 'none',
            },
          }}
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
