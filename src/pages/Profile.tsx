import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div>
      <h2>Profil Pengguna</h2>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Token:</b> {user.token ? 'Tersimpan' : 'Tidak ada'}</p>
    </div>
  );
};

export default Profile;
