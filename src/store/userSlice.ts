import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string;
  username: string;
}

const initialState: UserState = {
  token: '',
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string; username: string }>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.token = '';
      state.username = '';
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
