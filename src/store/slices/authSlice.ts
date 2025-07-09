import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
export interface User {
  email: string;
  role: 'ADMIN' | 'EMPLOYEE';
  // Add any other fields you want from the token
}

interface AuthState {
  isAuthenticated: boolean;
  user: {
    role: 'EMPLOYEE' | 'ADMIN';
    email: string;
    // any other user fields
  } | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;


      localStorage.setItem('token', action.payload.token); 
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
