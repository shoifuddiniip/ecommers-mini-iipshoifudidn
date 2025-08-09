import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Navbar from '../components/Navbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div>
      {user.token && <Navbar />}
      <div style={{maxWidth:600,margin:'32px auto'}}>{children}</div>
    </div>
  );
};

export default MainLayout;
