import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserState {
  id: string;
  fullname: string;
  username: string;
  token: string;
}


const initialState: UserState = {
  id: localStorage.getItem('id') || '',
  fullname: localStorage.getItem('fullname') || '',
  username: localStorage.getItem('username') || '',
  token: localStorage.getItem('token') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; fullname: string; username: string; token: string }>) => {
      state.id = action.payload.id;
      state.fullname = action.payload.fullname;
      state.username = action.payload.username;
      state.token = action.payload.token;
      localStorage.setItem('id', action.payload.id);
      localStorage.setItem('fullname', action.payload.fullname);
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.id = '';
      state.fullname = '';
      state.username = '';
      state.token = '';
      localStorage.removeItem('id');
      localStorage.removeItem('fullname');
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
